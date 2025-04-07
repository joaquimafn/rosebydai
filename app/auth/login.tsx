import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { Stack, router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeContext } from '@theme/ThemeProvider';
import { useAuthStore } from '@store/authStore';
import { useI18n } from '../../i18n';
import Screen from '@components/Screen';
import TextInput from '@components/TextInput';
import Button from '@components/Button';

export default function LoginScreen() {
  const { currentTheme } = useThemeContext();
  const { signIn, isLoading, error, clearError } = useAuthStore();
  const { t } = useI18n();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Lidar com a tentativa de login
  const handleLogin = async () => {
    if (email.trim() && password.trim()) {
      try {
        await signIn(email.trim(), password.trim());
        router.replace('/chat');
      } catch (err) {
        // Erro já é gerenciado pela store
      }
    }
  };
  
  // Navegar para a tela de cadastro
  const handleSignUp = () => {
    router.push('/auth/signup');
  };
  
  // Alternar visualização da senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <Screen>
      <Stack.Screen
        options={{
          title: t('auth.login.title'),
          headerShown: true,
        }}
      />
      
      <View style={styles.container}>
        <View style={styles.header}>
          <Text 
            style={[styles.title, { color: currentTheme.colors.primary }]}
            variant="headlineMedium"
          >
            {t('auth.login.title')}
          </Text>
          <Text 
            style={[styles.subtitle, { color: currentTheme.colors.onSurface }]}
            variant="bodyLarge"
          >
            {t('auth.login.subtitle')}
          </Text>
        </View>
        
        <View style={styles.form}>
          <TextInput
            label={t('auth.login.emailLabel')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={error ? t('auth.login.errorInvalid') : ''}
            leftIcon={
              <MaterialCommunityIcons 
                name="email-outline" 
                size={24} 
                color={currentTheme.colors.primary} 
              />
            }
          />
          
          <TextInput
            label={t('auth.login.passwordLabel')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            leftIcon={
              <MaterialCommunityIcons 
                name="lock-outline" 
                size={24} 
                color={currentTheme.colors.primary} 
              />
            }
            rightIcon={
              <IconButton
                icon={showPassword ? 'eye-off' : 'eye'}
                size={24}
                onPress={togglePasswordVisibility}
                iconColor={currentTheme.colors.primary}
              />
            }
          />
          
          <TouchableOpacity 
            style={styles.forgotPassword}
            onPress={() => router.push('/auth/recovery')}
          >
            <Text 
              style={{ color: currentTheme.colors.primary }}
              variant="bodyMedium"
            >
              {t('auth.login.forgotPassword')}
            </Text>
          </TouchableOpacity>
          
          <Button
            title={t('auth.login.loginButton')}
            onPress={handleLogin}
            loading={isLoading}
            disabled={!email.trim() || !password.trim() || isLoading}
            fullWidth
            style={styles.loginButton}
          />
        </View>
        
        <View style={styles.signupContainer}>
          <Text style={{ color: currentTheme.colors.onSurface }}>
            {t('auth.login.noAccount')}
          </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text 
              style={[styles.signupText, { color: currentTheme.colors.primary }]}
              variant="bodyMedium"
            >
              {t('auth.login.signupLink')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  subtitle: {
    opacity: 0.8,
  },
  form: {
    marginBottom: 24,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 8,
    marginBottom: 24,
  },
  loginButton: {
    marginTop: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signupText: {
    fontWeight: '600',
    marginLeft: 4,
  },
}); 