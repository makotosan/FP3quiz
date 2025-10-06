
import React from 'react';

interface ProgressBarProps {
  value: number; // 0 to 100
  color?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, color = 'bg-indigo-500' }) => {
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        className={`${color} h-2.5 rounded-full transition-all duration-500`}
        style={{ width: `${clampedValue}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
