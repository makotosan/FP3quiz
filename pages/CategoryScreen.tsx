
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

const CategoryScreen: React.FC = () => {
  const { categories, history } = useAppContext();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">カテゴリ選択</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map(category => {
          const stats = history.category_stats[category] || { answered: 0, correct: 0 };
          const correctRate = stats.answered > 0 ? Math.round((stats.correct / stats.answered) * 100) : 0;
          
          return (
            <Link 
              key={category} 
              to={`/quiz/${encodeURIComponent(category)}`}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">{category}</h2>
                  <span className={`text-xl font-bold ${correctRate > 70 ? 'text-green-500' : 'text-gray-600'}`}>
                    {correctRate}%
                  </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                解答数: {stats.answered}問 / 正解数: {stats.correct}問
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryScreen;
