import React, { createContext, useContext, useEffect, useState, ReactNode, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import i18n, { initializeLanguage, setLanguage, checkSystemLanguageChanged, getDeviceLanguage } from './i18n';
import { Language, AVAILABLE_LANGUAGES, LanguageOption } from './translations';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Chave para o AsyncStorage
const SYNC_WITH_SYSTEM_KEY = '@rosebudai:syncWithSystem';

interface I18nContextType {
  t: (scope: string, options?: any) => string;
  locale: Language;
  setLocale: (language: Language) => Promise<void>;
  isRTL: boolean;
  availableLanguages: LanguageOption[];
  loading: boolean;
  syncWithSystem: boolean;
  setSyncWithSystem: (sync: boolean) => Promise<void>;
  systemLanguage: Language;
}

// Criar o contexto
const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

// Componente Provider
export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [locale, setLocale] = useState<Language>(i18n.locale as Language);
  const [loading, setLoading] = useState<boolean>(true);
  const [syncWithSystem, setSyncWithSystemState] = useState<boolean>(false);
  const [systemLanguage, setSystemLanguage] = useState<Language>(getDeviceLanguage());
  const appState = useRef(AppState.currentState);

  // Inicializar idioma ao carregar o app
  useEffect(() => {
    const init = async () => {
      // Verificar a preferência de sincronização
      try {
        const syncValue = await AsyncStorage.getItem(SYNC_WITH_SYSTEM_KEY);
        const shouldSync = syncValue === 'true';
        setSyncWithSystemState(shouldSync);
        
        if (shouldSync) {
          // Se deve sincronizar, usar idioma do sistema
          const deviceLang = getDeviceLanguage();
          await setLanguage(deviceLang);
          setLocale(deviceLang);
        } else {
          // Senão, carregar o idioma salvo ou padrão
          const language = await initializeLanguage();
          setLocale(language);
        }
      } catch (error) {
        console.error('Failed to initialize language preferences:', error);
        const language = await initializeLanguage();
        setLocale(language);
      }
      
      setLoading(false);
    };

    init();
  }, []);

  // Monitorar mudanças no estado do app para detectar alterações de idioma
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        // App voltou para o primeiro plano
        const { changed, newLanguage } = checkSystemLanguageChanged();
        
        // Atualizar o idioma do sistema detectado
        setSystemLanguage(newLanguage);
        
        // Se estiver sincronizando com o sistema e o idioma mudou, atualizar
        if (syncWithSystem && changed) {
          handleSetLocale(newLanguage);
        }
      }
      
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [syncWithSystem]);

  // Função para traduzir
  const t = (scope: string, options?: any): string => {
    return i18n.t(scope, options);
  };

  // Definir novo idioma
  const handleSetLocale = async (language: Language): Promise<void> => {
    await setLanguage(language);
    setLocale(language);
  };

  // Definir preferência de sincronização
  const handleSetSyncWithSystem = async (sync: boolean): Promise<void> => {
    setSyncWithSystemState(sync);
    await AsyncStorage.setItem(SYNC_WITH_SYSTEM_KEY, sync ? 'true' : 'false');
    
    // Se ativar a sincronização, mudar para o idioma do sistema
    if (sync) {
      const deviceLang = getDeviceLanguage();
      setSystemLanguage(deviceLang);
      await handleSetLocale(deviceLang);
    }
  };

  // Verificar se o idioma é RTL (da direita para a esquerda)
  const isRTL = ['ar', 'he', 'fa'].includes(locale.substring(0, 2));

  // Valor do contexto
  const contextValue: I18nContextType = {
    t,
    locale,
    setLocale: handleSetLocale,
    isRTL,
    availableLanguages: AVAILABLE_LANGUAGES,
    loading,
    syncWithSystem,
    setSyncWithSystem: handleSetSyncWithSystem,
    systemLanguage
  };

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  
  return context;
}; 