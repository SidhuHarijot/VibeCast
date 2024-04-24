import React from 'react';
import { useTheme } from '../ThemeContext';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Navigation = () => {
  const { toggleTheme, mode, primaryColor, secondaryColor, accentColor } = useTheme();
  const iconColorClass = mode === 'light' ? `text-black` : `text-white`;

  return (
    <nav 
      className={`flex justify-between items-center p-4 relative bg-opacity-0 border-b border-solid border-${accentColor}50 backdrop-blur-sm`}
      style={{
        borderBottomColor: accentColor,
        backgroundColor: secondaryColor
      }}
    >
      <h1 className={`text-4xl font-bold ${iconColorClass}`}>Vibecast</h1>
      <IconButton onClick={toggleTheme}>
        <div className={iconColorClass}>
          {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </div>
      </IconButton>
    </nav>
  );
};

export default Navigation;
