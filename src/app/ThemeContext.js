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
const labelColor = '#EFEFEF';
const darkLabelColor = '#333333';
const buttonWaitingColor = '#FFA500';
const buttonWaitingHoverColor = '#FFD700';
const buttonWaitingTextColor = '#000000';
const nestLabelColor = '#FAFAFA';
const darkNestLabelColor = '#222222';
const randomColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#FFD700', '#FF6347', '#FF4500', '#FF8C00', '#FF7F50', '#FF1493', '#FF69B4', '#FFC0CB', '#FFB6C1'];
const darkRandomColors = ['#9932CC', '#8A2BE2', '#800080', '#4B0082', '#483D8B', '#6A5ACD', '#7B68EE', '#9370DB', '#8B008B', '#9400D3', '#9932CC', '#8A2BE2', '#800080', '#4B0082', '#483D8B', '#6A5ACD', '#7B68EE', '#9370DB', '#8B008B', '#9400D3'];


export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    mode: darkMode, 
    primaryColor: darkPrimaryColor, 
    secondaryColor: darkSecondaryColor, 
    accentColor: darkAccentColor,
    labelColor: darkLabelColor,
    buttonWaitingColor: buttonWaitingColor,
    buttonWaitingHoverColor: buttonWaitingHoverColor,
    buttonWaitingTextColor: buttonWaitingTextColor,
    nestLabelColor: darkNestLabelColor,
    randomColors: darkRandomColors,
  });

  const toggleTheme = () => {
    setTheme(currentTheme => ({
      mode: currentTheme.mode === mode ? darkMode : mode,
      primaryColor: currentTheme.primaryColor === primaryColor ? darkPrimaryColor : primaryColor,
      secondaryColor: currentTheme.secondaryColor === secondaryColor ? darkSecondaryColor : secondaryColor,
      accentColor: currentTheme.accentColor === accentColor ? darkAccentColor : accentColor,
      labelColor: currentTheme.labelColor === labelColor ? darkLabelColor : labelColor,
      nestLabelColor: currentTheme.nestLabelColor === nestLabelColor ? darkNestLabelColor : nestLabelColor,
      randomColors: currentTheme.randomColors === randomColors ? darkRandomColors : randomColors,

    }));
  };

  return (
    <ThemeContext.Provider value={{ ...theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
