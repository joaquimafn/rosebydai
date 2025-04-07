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

export default function SignUpScreen() {
  const { currentTheme } = useThemeContext();
  const { signUp, isLoading, error, clearError } = useAuthStore();
  const { t } = useI18n();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Lidar com a tentativa de cadastro
  const handleSignUp = async () => {
    if (name.trim() && email.trim() && password.trim()) {
      try {
        await signUp(email.trim(), password.trim(), name.trim());
        router.replace('/chat');
      } catch (err) {
        // Erro já é gerenciado pela store
      }
    }
  };
  
  // Navegar para a tela de login
  const handleLogin = () => {
    router.push('/auth/login');
  };
  
  // Alternar visualização da senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <Screen>
      <Stack.Screen
        options={{
          title: t('auth.signup.title'),
          headerShown: true,
        }}
      />
      
      <View style={styles.container}>
        <View style={styles.header}>
          <Text 
            style={[styles.title, { color: currentTheme.colors.primary }]}
            variant="headlineMedium"
          >
            {t('auth.signup.title')}
          </Text>
          <Text 
            style={[styles.subtitle, { color: currentTheme.colors.onSurface }]}
            variant="bodyLarge"
          >
            {t('auth.signup.subtitle')}
          </Text>
        </View>
        
        <View style={styles.form}>
          <TextInput
            label={t('auth.signup.nameLabel')}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            leftIcon={
              <MaterialCommunityIcons 
                name="account-outline" 
                size={24} 
                color={currentTheme.colors.primary} 
              />
            }
          />
          
          <TextInput
            label={t('auth.signup.emailLabel')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={error ? t('auth.signup.errorInUse') : ''}
            leftIcon={
              <MaterialCommunityIcons 
                name="email-outline" 
                size={24} 
                color={currentTheme.colors.primary} 
              />
            }
          />
          
          <TextInput
            label={t('auth.signup.passwordLabel')}
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
          
          <Text 
            style={[styles.passwordHint, { color: currentTheme.colors.onSurface + '80' }]}
            variant="bodySmall"
          >
            {t('auth.signup.passwordHint')}
          </Text>
          
          <Button
            title={t('auth.signup.signupButton')}
            onPress={handleSignUp}
            loading={isLoading}
            disabled={!name.trim() || !email.trim() || !password.trim() || isLoading}
            fullWidth
            style={styles.signUpButton}
          />
        </View>
        
        <View style={styles.loginContainer}>
          <Text style={{ color: currentTheme.colors.onSurface }}>
            {t('auth.signup.hasAccount')}
          </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text 
              style={[styles.loginText, { color: currentTheme.colors.primary }]}
              variant="bodyMedium"
            >
              {t('auth.signup.loginLink')}
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
  passwordHint: {
    marginTop: 4,
    marginBottom: 24,
  },
  signUpButton: {
    marginTop: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    fontWeight: '600',
    marginLeft: 4,
  },
}); 