
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useAppContext } from '../../contexts/AppContext';

interface ProgressPieChartProps {
  correct: number;
  total: number;
}

const ProgressPieChart: React.FC<ProgressPieChartProps> = ({ correct, total }) => {
  const { settings } = useAppContext();
  const isDarkMode = settings.theme === 'dark';

  const incorrect = total - correct;
  const data = [
    { name: '正解', value: correct },
    { name: '不正解', value: incorrect },
  ];
  
  if (total === 0) {
      data[1].value = 1; // Show a full grey circle if no questions answered
  }

  const COLORS = ['#10b981', '#ef4444'];
  const EMPTY_COLOR = ['#d1d5db'];

  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="w-full h-48 relative">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={total > 0 ? 5 : 0}
            dataKey="value"
          >
            {(total > 0 ? COLORS : EMPTY_COLOR).map((color, index) => (
              <Cell key={`cell-${index}`} fill={color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
                backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                borderColor: isDarkMode ? '#374151' : '#e5e7eb'
            }}
            labelStyle={{ color: isDarkMode ? '#f3f4f6' : '#1f2937' }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm text-gray-500 dark:text-gray-400">正答率</span>
        <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">{percentage}%</span>
      </div>
    </div>
  );
};

export default ProgressPieChart;