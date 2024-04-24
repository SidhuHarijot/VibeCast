import React from 'react';
import { useTheme } from '../ThemeContext'; 

const Navigation = () => {
  const { toggleTheme } = useTheme();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">vibecast</h1>
      <button
        onClick={toggleTheme}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Change Theme
      </button>
    </nav>
  );
};

export default Navigation;
