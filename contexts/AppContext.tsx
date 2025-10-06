
import React, { createContext, useReducer, useContext, useEffect, ReactNode, useState } from 'react';
import { AppState, Action, UserLearningHistory, UserSettings, AppContextType, Question } from '../types';
import { questions as allQuestions } from '../data/questions';
import { CATEGORIES } from '../constants';
import useLocalStorage from '../hooks/useLocalStorage';

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialHistory: UserLearningHistory = {
  last_updated: new Date().toISOString(),
  total_answered: 0,
  total_correct: 0,
  total_study_time_minutes: 0,
  daily_study_time: {},
  daily_correct_rate: {},
  category_stats: CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat]: { answered: 0, correct: 0, wrong_ids: [] } }), {}),
  wrong_questions: [],
  favorites: [],
};

const initialSettings: UserSettings = {
  font_size_scale: 1,
  sound_effects_enabled: true,
  time_limit_mode_enabled: false,
  prioritize_wrong_questions: true,
};

const appReducer = (state: AppState, action: Action): AppState => {
  const today = new Date().toISOString().split('T')[0];

  switch (action.type) {
    case 'ANSWER_QUESTION': {
      const { questionId, isCorrect, category } = action.payload;
      const newState = { ...state };
      
      const catStats = newState.history.category_stats[category];
      const isAlreadyAnswered = catStats.answered > 0 && (catStats.wrong_ids.includes(questionId) || (isCorrect && !catStats.wrong_ids.includes(questionId)));

      if (!isAlreadyAnswered) {
        newState.history.total_answered += 1;
        catStats.answered += 1;
      }
      
      if (isCorrect) {
          if (!isAlreadyAnswered) {
            newState.history.total_correct += 1;
            catStats.correct += 1;
          }
          catStats.wrong_ids = catStats.wrong_ids.filter(id => id !== questionId);
          newState.history.wrong_questions = newState.history.wrong_questions.filter(id => id !== questionId);
      } else {
          if(!catStats.wrong_ids.includes(questionId)){
              catStats.wrong_ids.push(questionId);
          }
          if(!newState.history.wrong_questions.includes(questionId)){
              newState.history.wrong_questions.push(questionId);
          }
      }

      const totalCorrectToday = Object.values(newState.history.category_stats).reduce((sum, stats) => sum + stats.correct, 0);
      const totalAnsweredToday = Object.values(newState.history.category_stats).reduce((sum, stats) => sum + stats.answered, 0);
      newState.history.daily_correct_rate[today] = totalAnsweredToday > 0 ? (totalCorrectToday / totalAnsweredToday) * 100 : 0;
      
      newState.history.last_updated = new Date().toISOString();
      return newState;
    }
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };
    
    case 'ADD_STUDY_TIME': {
      const newHistory = { ...state.history };
      newHistory.total_study_time_minutes += action.payload.minutes;
      newHistory.daily_study_time[today] = (newHistory.daily_study_time[today] || 0) + action.payload.minutes;
      newHistory.last_updated = new Date().toISOString();
      return { ...state, history: newHistory };
    }

    case 'TOGGLE_FAVORITE': {
      const newHistory = { ...state.history };
      const { questionId } = action.payload;
      const isFavorite = newHistory.favorites.includes(questionId);
      if (isFavorite) {
        newHistory.favorites = newHistory.favorites.filter(id => id !== questionId);
      } else {
        newHistory.favorites.push(questionId);
      }
      return { ...state, history: newHistory };
    }

    case 'TOGGLE_HELP_MODAL':
        return { ...state, isHelpModalOpen: !state.isHelpModalOpen };
    
    case 'SET_UPDATE_AVAILABLE':
      return { ...state, isUpdateAvailable: action.payload };

    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [persistedHistory, setPersistedHistory] = useLocalStorage<UserLearningHistory>('fp3_history', initialHistory);
  const [persistedSettings, setPersistedSettings] = useLocalStorage<UserSettings>('fp3_settings', initialSettings);
  
  const initialState: AppState = {
    history: persistedHistory,
    settings: persistedSettings,
    isHelpModalOpen: false,
    isUpdateAvailable: false,
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  // Service Worker Update Handling
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(reg => {
        reg.onupdatefound = () => {
          const installingWorker = reg.installing;
          if (installingWorker) {
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (reg.waiting) {
                  console.log('New content is available and waiting to be installed!');
                  setWaitingWorker(reg.waiting);
                  dispatch({ type: 'SET_UPDATE_AVAILABLE', payload: true });
                }
              }
            };
          }
        };
      }).catch(error => {
        console.log('Service Worker registration failed:', error);
      });
      
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
            window.location.reload();
            refreshing = true;
        }
      });
    }
  }, []);

  const updateApp = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    }
  };


  useEffect(() => {
    setPersistedHistory(state.history);
  }, [state.history, setPersistedHistory]);

  useEffect(() => {
    setPersistedSettings(state.settings);
  }, [state.settings, setPersistedSettings]);
  
  useEffect(() => {
    document.documentElement.style.fontSize = `${16 * state.settings.font_size_scale}px`;
  }, [state.settings.font_size_scale]);

  const value = {
    ...state,
    dispatch,
    questions: allQuestions,
    categories: CATEGORIES,
    updateApp,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};