
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import ProgressPieChart from '../components/charts/ProgressPieChart';
import ProgressBar from '../components/ProgressBar';

const HomeScreen: React.FC = () => {
  const { history, categories } = useAppContext();
  const navigate = useNavigate();

  const { total_answered, total_correct, total_study_time_minutes, category_stats } = history;

  const startRandomQuiz = () => {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    navigate(`/quiz/${encodeURIComponent(randomCategory)}`);
  };

  return (
    <div className="p-4 space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">学習ダッシュボード</h1>
        <p className="text-gray-500 dark:text-gray-400">FP3級合格に向けて頑張りましょう！</p>
      </header>
      
      <div className="bg-white p-4 rounded-lg shadow-md dark:bg-slate-800">
        <h2 className="text-lg font-semibold text-gray-700 mb-2 dark:text-gray-200">学習進捗</h2>
        <div className="flex items-center">
          <div className="w-1/2">
            <ProgressPieChart correct={total_correct} total={total_answered} />
          </div>
          <div className="w-1/2 space-y-3 pl-4">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">総解答数</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{total_answered}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">学習時間</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{total_study_time_minutes} <span className="text-base font-normal">分</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <button 
          onClick={startRandomQuiz}
          className="w-full bg-indigo-600 text-white font-bold py-4 px-4 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-300 text-lg"
        >
          今日の学習を始める
        </button>
        <div className="grid grid-cols-3 gap-2 text-center">
          <Link to="/quiz/苦手問題" className="bg-white p-3 rounded-lg shadow text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:bg-slate-700 dark:text-gray-200 dark:hover:bg-slate-600">苦手問題</Link>
          <Link to="/quiz/過去問" className="bg-white p-3 rounded-lg shadow text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:bg-slate-700 dark:text-gray-200 dark:hover:bg-slate-600">過去問チャレンジ</Link>
          <Link to="/quiz/お気に入り" className="bg-white p-3 rounded-lg shadow text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:bg-slate-700 dark:text-gray-200 dark:hover:bg-slate-600">お気に入り</Link>
        </div>
      </div>
      
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">分野別進捗</h2>
        {categories.map((cat) => {
          const stats = category_stats[cat] || { answered: 0, correct: 0 };
          const progress = stats.answered > 0 ? (stats.correct / stats.answered) * 100 : 0;
          return (
            <Link to={`/quiz/${encodeURIComponent(cat)}`} key={cat} className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow dark:bg-slate-800 dark:hover:shadow-indigo-500/20">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-800 dark:text-gray-100">{cat}</span>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{Math.round(progress)}%</span>
              </div>
              <ProgressBar value={progress} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomeScreen;