import { useColorScheme } from 'react-native';
import { useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { lightTheme, darkTheme } from '@theme/theme';

type ThemeState = {
  theme: 'light' | 'dark' | 'system';
  currentTheme: typeof lightTheme;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
};

// Armazena a chave para o AsyncStorage
const THEME_STORAGE_KEY = '@rosebudai:theme';

// Cria a store Zustand para o tema
export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'system',
  currentTheme: lightTheme,
  setTheme: async (theme) => {
    set({ theme });
    await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
  },
}));

// Hook personalizado para usar o tema
export const useTheme = () => {
  const systemColorScheme = useColorScheme();
  const { theme, setTheme, currentTheme } = useThemeStore();
  
  // Determina o tema atual com base na preferência
  const getActiveTheme = useCallback(() => {
    if (theme === 'system') {
      return systemColorScheme === 'dark' ? darkTheme : lightTheme;
    }
    return theme === 'dark' ? darkTheme : lightTheme;
  }, [theme, systemColorScheme]);
  
  // Atualiza o tema quando houver mudanças
  useEffect(() => {
    const activeTheme = getActiveTheme();
    if (activeTheme !== currentTheme) {
      useThemeStore.setState({ currentTheme: activeTheme });
    }
  }, [theme, systemColorScheme, currentTheme, getActiveTheme]);
  
  // Carrega a preferência de tema ao iniciar
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
          setTheme(savedTheme as 'light' | 'dark' | 'system');
        }
      } catch (error) {
        console.error('Erro ao carregar preferência de tema:', error);
      }
    };
    
    loadThemePreference();
  }, [setTheme]);
  
  return {
    theme,
    setTheme,
    currentTheme,
    isDarkMode: theme === 'dark' || (theme === 'system' && systemColorScheme === 'dark'),
  };
}; 