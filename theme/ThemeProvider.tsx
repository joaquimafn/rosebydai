import React, { createContext, useContext, ReactNode } from 'react';
import { PaperProvider } from 'react-native-paper';
import { useTheme } from '@hooks/useTheme';
import { AppTheme } from './theme';

type ThemeContextType = {
  theme: 'light' | 'dark' | 'system';
  isDarkMode: boolean;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  currentTheme: AppTheme;
};

// Cria o contexto do tema
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Hook para acessar o contexto do tema
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext deve ser usado dentro de um ThemeProvider');
  }
  return context;
};

// Props do componente ThemeProvider
type ThemeProviderProps = {
  children: ReactNode;
};

// Componente provedor de tema
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const themeContext = useTheme();
  
  return (
    <ThemeContext.Provider value={themeContext}>
      <PaperProvider theme={themeContext.currentTheme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
}; 