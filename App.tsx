
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';

import Header from './components/Header';
import HomeScreen from './pages/HomeScreen';
import CategoryScreen from './pages/CategoryScreen';
import QuizScreen from './pages/QuizScreen';
import HistoryScreen from './pages/HistoryScreen';
import SettingsScreen from './pages/SettingsScreen';
import BottomNav from './components/BottomNav';
import HelpModal from './components/HelpModal';

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <div className="min-h-screen flex flex-col font-sans">
          <Header />
          <main className="flex-grow pt-16 pb-20">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/categories" element={<CategoryScreen />} />
              <Route path="/quiz/:category" element={<QuizScreen />} />
              <Route path="/history" element={<HistoryScreen />} />
              <Route path="/settings" element={<SettingsScreen />} />
            </Routes>
          </main>
          <BottomNav />
          <HelpModal />
        </div>
      </HashRouter>
    </AppProvider>
  );
};

export default App;