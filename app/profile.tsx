import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Divider, Switch, IconButton, List } from 'react-native-paper';
import { Stack, router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeContext } from '@theme/ThemeProvider';
import { useAuthStore } from '@store/authStore';
import { useI18n } from '../i18n';
import Screen from '@components/Screen';
import Button from '@components/Button';
import LanguageSelector from '../components/LanguageSelector';

export default function ProfileScreen() {
  const { theme, setTheme, currentTheme, isDarkMode } = useThemeContext();
  const { profile, signOut } = useAuthStore();
  const { t } = useI18n();
  
  // Alternar entre tema claro e escuro
  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };
  
  // Alternar para o tema do sistema
  const toggleSystemTheme = () => {
    setTheme(theme === 'system' ? (isDarkMode ? 'dark' : 'light') : 'system');
  };
  
  // Fazer logout
  const handleLogout = () => {
    Alert.alert(
      t('profile.logout.confirmTitle'),
      t('profile.logout.confirmMessage'),
      [
        {
          text: t('profile.logout.cancel'),
          style: 'cancel',
        },
        {
          text: t('profile.logout.confirm'),
          onPress: async () => {
            await signOut();
            router.replace('/');
          },
        },
      ],
    );
  };
  
  return (
    <Screen scrollable>
      <Stack.Screen
        options={{
          title: t('profile.title'),
          headerShown: true,
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              onPress={() => router.back()}
              iconColor={currentTheme.colors.onSurface}
            />
          ),
        }}
      />
      
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <View
            style={[
              styles.avatar,
              { backgroundColor: currentTheme.colors.primary + '20' },
            ]}
          >
            <Text
              style={[styles.avatarText, { color: currentTheme.colors.primary }]}
              variant="headlineMedium"
            >
              {profile?.displayName?.[0]?.toUpperCase() || 'U'}
            </Text>
          </View>
          
          <Text
            style={[styles.displayName, { color: currentTheme.colors.primary }]}
            variant="headlineSmall"
          >
            {profile?.displayName || t('common.user')}
          </Text>
          
          <Text
            style={[styles.email, { color: currentTheme.colors.onSurface + '80' }]}
            variant="bodyMedium"
          >
            {profile?.email}
          </Text>
        </View>
        
        <Divider style={styles.divider} />
        
        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, { color: currentTheme.colors.primary }]}
            variant="titleMedium"
          >
            {t('profile.appearance.title')}
          </Text>
          
          <List.Item
            title={t('profile.appearance.darkMode')}
            description={t('profile.appearance.darkModeDesc')}
            left={props => (
              <List.Icon
                {...props}
                icon={isDarkMode ? 'weather-night' : 'white-balance-sunny'}
                color={currentTheme.colors.primary}
              />
            )}
            right={props => (
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                color={currentTheme.colors.primary}
              />
            )}
          />
          
          <List.Item
            title={t('profile.appearance.systemTheme')}
            description={t('profile.appearance.systemThemeDesc')}
            left={props => (
              <List.Icon
                {...props}
                icon="theme-light-dark"
                color={currentTheme.colors.primary}
              />
            )}
            right={props => (
              <Switch
                value={theme === 'system'}
                onValueChange={toggleSystemTheme}
                color={currentTheme.colors.primary}
              />
            )}
          />
        </View>
        
        <Divider style={styles.divider} />
        
        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, { color: currentTheme.colors.primary }]}
            variant="titleMedium"
          >
            {t('profile.account.title')}
          </Text>
          
          <List.Item
            title={t('profile.account.editProfile')}
            description={t('profile.account.editProfileDesc')}
            left={props => (
              <List.Icon
                {...props}
                icon="account-edit"
                color={currentTheme.colors.primary}
              />
            )}
            right={props => (
              <List.Icon
                {...props}
                icon="chevron-right"
                color={currentTheme.colors.onSurface}
              />
            )}
            onPress={() => router.push('/profile/edit')}
          />
          
          <List.Item
            title={t('profile.account.changePassword')}
            description={t('profile.account.changePasswordDesc')}
            left={props => (
              <List.Icon
                {...props}
                icon="lock"
                color={currentTheme.colors.primary}
              />
            )}
            right={props => (
              <List.Icon
                {...props}
                icon="chevron-right"
                color={currentTheme.colors.onSurface}
              />
            )}
            onPress={() => router.push('/profile/change-password')}
          />
          
          {/* Seletor de idioma */}
          <LanguageSelector />
        </View>
        
        <View style={styles.logoutSection}>
          <Button
            title={t('profile.logout.button')}
            onPress={handleLogout}
            variant="outline"
            fullWidth
            icon={<MaterialCommunityIcons name="logout" size={20} color={currentTheme.colors.primary} />}
          />
        </View>
        
        <Text
          style={[styles.versionText, { color: currentTheme.colors.onSurface + '60' }]}
          variant="bodySmall"
        >
          {t('profile.version', { version: '1.0.0' })}
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontWeight: 'bold',
  },
  displayName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    marginBottom: 8,
  },
  divider: {
    marginVertical: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 16,
  },
  logoutSection: {
    marginTop: 16,
    marginBottom: 24,
  },
  versionText: {
    textAlign: 'center',
  },
}); 