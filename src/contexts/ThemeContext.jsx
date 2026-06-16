import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { darkColors, FONT_FAMILY, lightColors } from '../ds/utils/theme';

const STORAGE_KEY = 'skinxray-theme';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    return localStorage.getItem(STORAGE_KEY) || 'light';
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    setIsLoading(false);
  }, [theme]);

  const colors = theme === 'light' ? lightColors : darkColors;

  const value = useMemo(
    () => ({
      theme,
      colors,
      fontFamily: FONT_FAMILY,
      isLoading,
      toggleTheme: () => setThemeState((t) => (t === 'light' ? 'dark' : 'light')),
      setTheme: setThemeState,
    }),
    [theme, colors, isLoading]
  );

  const styledTheme = useMemo(
    () => ({
      mode: theme,
      colors,
      fontFamily: FONT_FAMILY,
    }),
    [theme, colors]
  );

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={styledTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
