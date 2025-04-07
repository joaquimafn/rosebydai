import { I18n } from 'i18n-js';
import { NativeModules, Platform, NativeEventEmitter } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import translations, { Language } from './translations';

const LANGUAGE_STORAGE_KEY = '@rosebudai:language';

const i18n = new I18n(translations);

export const getDeviceLanguage = (): Language => {
  let deviceLanguage: string = 'en-US';

  try {
    if (Platform.OS === 'ios') {
      deviceLanguage = NativeModules.SettingsManager.settings.AppleLocale || 
                      NativeModules.SettingsManager.settings.AppleLanguages[0];
    } else if (Platform.OS === 'android') {
      deviceLanguage = NativeModules.I18nManager.localeIdentifier || 
                      NativeModules.I18nManager.locale ||
                      NativeModules.I18nManager.localeTag;
    }

    deviceLanguage = deviceLanguage.replace('_', '-');
    
    console.log('Device language detected:', deviceLanguage);
  } catch (error) {
    console.warn('Failed to get device language:', error);
  }

  if (deviceLanguage.startsWith('pt')) {
    return 'pt-BR';
  } else if (deviceLanguage.startsWith('es')) {
    return 'es-ES';
  } else {
    return 'en-US';
  }
};

i18n.defaultLocale = 'en-US';
i18n.enableFallback = true;
i18n.locale = getDeviceLanguage();

export const setLanguage = async (language: Language): Promise<void> => {
  try {
    i18n.locale = language;
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    console.error('Failed to set language:', error);
  }
};

export const getStoredLanguage = async (): Promise<Language | null> => {
  try {
    const language = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    return language as Language | null;
  } catch (error) {
    console.error('Failed to get stored language:', error);
    return null;
  }
};

export const initializeLanguage = async (): Promise<Language> => {
  try {
    const storedLanguage = await getStoredLanguage();
    if (storedLanguage && Object.keys(translations).includes(storedLanguage)) {
      i18n.locale = storedLanguage;
      return storedLanguage;
    }
  } catch (error) {
    console.error('Failed to initialize language:', error);
  }
  const deviceLanguage = getDeviceLanguage();
  i18n.locale = deviceLanguage;
  return deviceLanguage;
};

export const checkSystemLanguageChanged = (): { changed: boolean, newLanguage: Language } => {
  const systemLanguage = getDeviceLanguage();
  const changed = systemLanguage !== i18n.locale;
  return { changed, newLanguage: systemLanguage };
};

export default i18n; 