import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button as PaperButton } from 'react-native-paper';
import { router } from 'expo-router';
import { useThemeContext } from '@theme/ThemeProvider';
import { useAuthStore } from '@store/authStore';
import { useI18n } from '../i18n';
import Screen from '@components/Screen';
import Button from '@components/Button';

export default function HomeScreen() {
  const { currentTheme } = useThemeContext();
  const { isAuthenticated } = useAuthStore();
  const { t } = useI18n();
  
  // Navegar para a tela de login
  const handleLoginPress = () => {
    router.push('/auth/login');
  };
  
  // Navegar para a tela de cadastro
  const handleSignUpPress = () => {
    router.push('/auth/signup');
  };
  
  // Navegar para a tela de chat se já estiver autenticado
  const handleStartPress = () => {
    if (isAuthenticated) {
      router.push('/chat');
    } else {
      router.push('/auth/login');
    }
  };
  
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text 
            style={[
              styles.title, 
              { color: currentTheme.colors.primary }
            ]}
            variant="headlineLarge"
          >
            {t('welcome.title')}
          </Text>
          <Text 
            style={[styles.subtitle, { color: currentTheme.colors.onSurface }]}
            variant="titleMedium"
          >
            {t('welcome.subtitle')}
          </Text>
        </View>
        
        <View style={styles.imageContainer}>
          {/* Placeholder para imagem/logo - substitua pelo seu asset */}
          <View 
            style={[
              styles.imagePlaceholder, 
              { backgroundColor: currentTheme.colors.primary + '20' }
            ]}
          >
            <Text style={{ color: currentTheme.colors.primary }}>AI</Text>
          </View>
        </View>
        
        <View style={styles.features}>
          <Text 
            style={[styles.featureTitle, { color: currentTheme.colors.onSurface }]}
            variant="titleMedium"
          >
            {t('welcome.features.title')}
          </Text>
          
          <View style={styles.featureItem}>
            <View style={[styles.bullet, { backgroundColor: currentTheme.colors.primary }]} />
            <Text style={{ color: currentTheme.colors.onSurface }}>
              {t('welcome.features.item1')}
            </Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={[styles.bullet, { backgroundColor: currentTheme.colors.primary }]} />
            <Text style={{ color: currentTheme.colors.onSurface }}>
              {t('welcome.features.item2')}
            </Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={[styles.bullet, { backgroundColor: currentTheme.colors.primary }]} />
            <Text style={{ color: currentTheme.colors.onSurface }}>
              {t('welcome.features.item3')}
            </Text>
          </View>
        </View>
        
        <View style={styles.actions}>
          <Button
            title={t('welcome.startButton')}
            onPress={handleStartPress}
            variant="primary"
            fullWidth
          />
          
          {!isAuthenticated && (
            <View style={styles.authActions}>
              <PaperButton onPress={handleLoginPress} mode="text">
                {t('welcome.loginButton')}
              </PaperButton>
              <PaperButton onPress={handleSignUpPress} mode="text">
                {t('welcome.signupButton')}
              </PaperButton>
            </View>
          )}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    opacity: 0.8,
  },
  imageContainer: {
    marginBottom: 40,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  features: {
    width: '100%',
    marginBottom: 40,
  },
  featureTitle: {
    marginBottom: 16,
    fontWeight: '600',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  actions: {
    width: '100%',
  },
  authActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
}); 