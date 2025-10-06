
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';

import HomeScreen from './pages/HomeScreen';
import CategoryScreen from './pages/CategoryScreen';
import QuizScreen from './pages/QuizScreen';
import HistoryScreen from './pages/HistoryScreen';
import SettingsScreen from './pages/SettingsScreen';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <div className="min-h-screen flex flex-col font-sans">
          <main className="flex-grow pb-20">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/categories" element={<CategoryScreen />} />
              <Route path="/quiz/:category" element={<QuizScreen />} />
              <Route path="/history" element={<HistoryScreen />} />
              <Route path="/settings" element={<SettingsScreen />} />
            </Routes>
          </main>
          <BottomNav />
        </div>
      </HashRouter>
    </AppProvider>
  );
};

export default App;
