
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import HistoryLineChart from '../components/charts/HistoryLineChart';
import StudyBarChart from '../components/charts/StudyBarChart';
import ProgressBar from '../components/ProgressBar';

const HistoryScreen: React.FC = () => {
  const { history, categories } = useAppContext();
  const { total_answered, total_correct, total_study_time_minutes, category_stats } = history;
  
  const overallCorrectRate = total_answered > 0 ? Math.round((total_correct / total_answered) * 100) : 0;

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">学習履歴</h1>
      
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-white p-4 rounded-lg shadow dark:bg-slate-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">正答率</p>
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{overallCorrectRate}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow dark:bg-slate-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">解答数</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{total_answered}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow dark:bg-slate-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">学習時間</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{total_study_time_minutes}<span className="text-base font-normal">分</span></p>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow dark:bg-slate-800">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 dark:text-gray-200">正答率の推移 (過去30日)</h2>
        <HistoryLineChart />
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow dark:bg-slate-800">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 dark:text-gray-200">学習時間 (過去7日)</h2>
        <StudyBarChart />
      </div>

      <div className="bg-white p-4 rounded-lg shadow dark:bg-slate-800">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 dark:text-gray-200">分野別進捗</h2>
        <div className="space-y-4">
          {categories.map((cat) => {
            const stats = category_stats[cat] || { answered: 0, correct: 0 };
            const progress = stats.answered > 0 ? (stats.correct / stats.answered) * 100 : 0;
            return (
              <div key={cat}>
                <div className="flex justify-between mb-1">
                  <span className="text-base font-medium text-gray-700 dark:text-gray-200">{cat}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{stats.correct} / {stats.answered}問 ({Math.round(progress)}%)</span>
                </div>
                <ProgressBar value={progress} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HistoryScreen;