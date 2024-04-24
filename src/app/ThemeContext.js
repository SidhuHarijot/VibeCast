import { createContext, useContext, useState } from 'react';

export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    mode: 'light', // 'light' or 'dark'
    primaryColor: '#007bff', // Example primary color
    secondaryColor: '#6c757d', // Example secondary color
    accentColor: '#ffc107', // Example accent color
  });

  const toggleTheme = () => {
    setTheme(currentTheme => ({
      ...currentTheme,
      mode: currentTheme.mode === 'light' ? 'dark' : 'light',
    }));
  };

  return (
    <ThemeContext.Provider value={{ ...theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
