import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { DefaultTheme as NavigationLightTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';

// Cores base do app
const colors = {
  primary: '#6200EE',
  primaryVariant: '#3700B3',
  secondary: '#03DAC6',
  secondaryVariant: '#018786',
  success: '#4CAF50',
  info: '#2196F3',
  warning: '#FFC107',
  error: '#F44336',
};

// Configurações de fonte personalizadas
const fonts = {
  regular: {
    fontFamily: 'System',
    fontWeight: 'normal',
  },
  medium: {
    fontFamily: 'System',
    fontWeight: '500',
  },
  bold: {
    fontFamily: 'System',
    fontWeight: 'bold',
  },
  heavy: {
    fontFamily: 'System',
    fontWeight: '900',
  },
};

// Tema claro personalizado
export const lightTheme = {
  ...MD3LightTheme,
  ...NavigationLightTheme,
  fonts: {
    ...MD3LightTheme.fonts,
    // Define as variantes de fonte necessárias
    headlineLarge: fonts.bold,
    headlineMedium: fonts.bold,
    headlineSmall: fonts.bold,
    titleLarge: fonts.medium,
    titleMedium: fonts.medium,
    titleSmall: fonts.medium,
    bodyLarge: fonts.regular,
    bodyMedium: fonts.regular,
    bodySmall: fonts.regular,
    labelLarge: fonts.medium,
    labelMedium: fonts.medium,
    labelSmall: fonts.medium,
  },
  colors: {
    ...MD3LightTheme.colors,
    ...NavigationLightTheme.colors,
    ...colors,
    background: '#F5F5F5',
    surface: '#FFFFFF',
    text: '#1A1A1A',
    accent: colors.secondary,
    onSurface: '#1A1A1A',
    elevation: {
      level0: 'transparent',
      level1: '#F5F5F5',
      level2: '#EEEEEE',
      level3: '#E0E0E0',
      level4: '#D6D6D6',
      level5: '#C2C2C2',
    },
  },
};

// Tema escuro personalizado
export const darkTheme = {
  ...MD3DarkTheme,
  ...NavigationDarkTheme,
  fonts: {
    ...MD3DarkTheme.fonts,
    // Define as variantes de fonte necessárias
    headlineLarge: fonts.bold,
    headlineMedium: fonts.bold,
    headlineSmall: fonts.bold,
    titleLarge: fonts.medium,
    titleMedium: fonts.medium,
    titleSmall: fonts.medium,
    bodyLarge: fonts.regular,
    bodyMedium: fonts.regular,
    bodySmall: fonts.regular,
    labelLarge: fonts.medium,
    labelMedium: fonts.medium,
    labelSmall: fonts.medium,
  },
  colors: {
    ...MD3DarkTheme.colors,
    ...NavigationDarkTheme.colors,
    ...colors,
    background: '#121212',
    surface: '#1E1E1E',
    text: '#FFFFFF',
    accent: colors.secondary,
    onSurface: '#FFFFFF',
    elevation: {
      level0: 'transparent',
      level1: '#1E1E1E',
      level2: '#232323',
      level3: '#252525',
      level4: '#272727',
      level5: '#2C2C2C',
    },
  },
};

export type AppTheme = typeof lightTheme; 