'use client';
import { createContext, useContext, useState, useEffect } from 'react';

type Theme = string;

interface ThemeContextType {
  activeTheme: Theme;
  changeTheme: (newTheme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [activeTheme, setActiveTheme] = useState<Theme>('md-dark-indigo');

  useEffect(() => {
    import(`nextflex/themes/${activeTheme}/theme.css`)
      .catch(err => console.error('Error loading theme:', err));
  }, [activeTheme]);

  const changeTheme = (newTheme: string) => {
    setActiveTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ activeTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 