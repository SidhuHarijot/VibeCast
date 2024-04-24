import { createContext, useContext, useState } from 'react';

export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const primaryColor = '#000000';
const darkPrimaryColor = '#ffffff';
const secondaryColor = '#ffffff';
const darkSecondaryColor = '#000000';
const accentColor = '#ffc107';
const darkAccentColor = '#9932CC';
const mode = 'light';
const darkMode = 'dark';

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    mode: darkMode, 
    primaryColor: darkPrimaryColor, 
    secondaryColor: darkSecondaryColor, 
    accentColor: darkAccentColor  ,
  });

  const toggleTheme = () => {
    setTheme(currentTheme => ({
      mode: currentTheme.mode === mode ? darkMode : mode,
      primaryColor: currentTheme.primaryColor === primaryColor ? darkPrimaryColor : primaryColor,
      secondaryColor: currentTheme.secondaryColor === secondaryColor ? darkSecondaryColor : secondaryColor,
      accentColor: currentTheme.accentColor === accentColor ? darkAccentColor : accentColor,
    }));
  };

  return (
    <ThemeContext.Provider value={{ ...theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
