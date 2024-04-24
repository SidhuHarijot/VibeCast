import React from 'react';
import { useTheme } from '../ThemeContext';
import GitHubIcon from '@mui/icons-material/GitHub';  // Import GitHub icon from Material-UI

const Footer = () => {
  const { mode, primaryColor, secondaryColor, accentColor } = useTheme();
  const textColorClass = mode === 'light' ? 'text-gray-900' : 'text-white';

  return (
    <footer className={`${textColorClass} flex justify-between items-center p-4 border-t border-solid backdrop-blur-md`}
     style={{borderTopColor:accentColor,
            backgroundColor: secondaryColor}}>
      <div className="flex items-center text-center gap-4">
        <span>© {new Date().getFullYear()} Vibecast</span>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500">
          <GitHubIcon />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
