import 'react-native-reanimated';
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '@theme/ThemeProvider';
import { useTheme } from '@hooks/useTheme';
import { useAuthStore } from '@store/authStore';
import { I18nProvider } from '../i18n';

export default function RootLayout() {
  const { currentTheme, isDarkMode } = useTheme();
  const { refreshUserProfile } = useAuthStore();
  
  // Carregar dados do usuário quando o app iniciar
  useEffect(() => {
    refreshUserProfile();
  }, [refreshUserProfile]);
  
  return (
    <I18nProvider>
      <ThemeProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar style={isDarkMode ? 'light' : 'dark'} />
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: currentTheme.colors.surface,
              },
              headerTintColor: currentTheme.colors.onSurface,
              headerShadowVisible: false,
              contentStyle: {
                backgroundColor: currentTheme.colors.background,
              },
              animation: 'slide_from_right',
              headerBackVisible: false,
              headerShown: false,
            }}
          />
        </GestureHandlerRootView>
      </ThemeProvider>
    </I18nProvider>
  );
} 