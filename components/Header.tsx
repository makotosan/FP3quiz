
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-indigo-600 text-white shadow-md z-50">
      <div className="flex items-center justify-center h-16 max-w-lg mx-auto px-4">
        <h1 className="text-xl font-bold">FP３級学習クイズ</h1>
      </div>
    </header>
  );
};

export default Header;
