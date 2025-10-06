
// Fix: Import React to fix 'Cannot find namespace React' error for React.Dispatch type.
import React from 'react';

export interface Question {
  id: string;
  category: string;
  question: string;
  choices: string[];
  correct_answer_index: number;
  explanation: string;
  tags: string[];
}

export interface CategoryStats {
  answered: number;
  correct: number;
  wrong_ids: string[];
}

export interface UserLearningHistory {
  last_updated: string;
  total_answered: number;
  total_correct: number;
  total_study_time_minutes: number;
  daily_study_time: { [date: string]: number };
  daily_correct_rate: { [date: string]: number };
  category_stats: {
    [category: string]: CategoryStats;
  };
  wrong_questions: string[];
  favorites: string[];
}

export interface UserSettings {
  font_size_scale: number;
  sound_effects_enabled: boolean;
  time_limit_mode_enabled: boolean;
  prioritize_wrong_questions: boolean;
}

export interface AppState {
  history: UserLearningHistory;
  settings: UserSettings;
  isHelpModalOpen: boolean;
  isUpdateAvailable: boolean;
}

export type Action =
  | { type: 'ANSWER_QUESTION'; payload: { questionId: string; isCorrect: boolean; category: string } }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<UserSettings> }
  | { type: 'ADD_STUDY_TIME'; payload: { minutes: number } }
  | { type: 'TOGGLE_FAVORITE'; payload: { questionId: string } }
  | { type: 'TOGGLE_HELP_MODAL' }
  | { type: 'SET_UPDATE_AVAILABLE', payload: boolean };

export interface AppContextType extends AppState {
  dispatch: React.Dispatch<Action>;
  questions: Question[];
  categories: string[];
  updateApp: () => void;
}