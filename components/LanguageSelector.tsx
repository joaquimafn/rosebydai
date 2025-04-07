import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { RadioButton, List, Portal, Dialog, Text, Checkbox, Switch } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeContext } from '@theme/ThemeProvider';
import { useI18n } from '../i18n';
import { AVAILABLE_LANGUAGES, Language } from '../i18n/translations';

interface LanguageSelectorProps {
  modalTitle?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  modalTitle,
}) => {
  const { currentTheme } = useThemeContext();
  const { locale, setLocale, t, syncWithSystem, setSyncWithSystem, systemLanguage } = useI18n();
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleLanguageSelect = (languageCode: Language) => {
    setLocale(languageCode);
    hideModal();
  };

  const toggleSyncWithSystem = async () => {
    await setSyncWithSystem(!syncWithSystem);
    hideModal();
  };

  const selectedLanguage = AVAILABLE_LANGUAGES.find(lang => lang.code === locale);

  const systemLanguageOption = AVAILABLE_LANGUAGES.find(lang => lang.code === systemLanguage);

  return (
    <>
      <List.Item
        title={t('profile.account.language')}
        description={syncWithSystem 
          ? t('profile.account.languageSyncDesc', { language: systemLanguageOption?.name }) 
          : t('profile.account.languageDesc')}
        left={props => (
          <List.Icon
            {...props}
            icon="translate"
            color={currentTheme.colors.primary}
          />
        )}
        right={props => (
          <View style={styles.selectedLanguage}>
            <Text style={{ marginRight: 8, color: currentTheme.colors.onSurface }}>
              {selectedLanguage?.flag} {selectedLanguage?.name}
              {syncWithSystem && ' (Auto)'}
            </Text>
            <List.Icon
              {...props}
              icon="chevron-right"
              color={currentTheme.colors.onSurface}
            />
          </View>
        )}
        onPress={showModal}
      />

      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideModal}
          style={{ backgroundColor: currentTheme.colors.background }}
        >
          <Dialog.Title>{modalTitle || t('profile.account.language')}</Dialog.Title>
          
          <Dialog.Content>
            <TouchableOpacity
              style={[
                styles.syncOption,
                { borderBottomColor: currentTheme.colors.outline + '30' }
              ]}
              onPress={toggleSyncWithSystem}
            >
              <View style={styles.syncOptionInfo}>
                <MaterialCommunityIcons 
                  name="sync" 
                  size={24} 
                  color={currentTheme.colors.primary}
                  style={{ marginRight: 12 }}
                />
                <View>
                  <Text style={{ 
                    color: currentTheme.colors.onSurface,
                    fontWeight: syncWithSystem ? 'bold' : 'normal'
                  }}>
                    {t('profile.account.syncLanguage')}
                  </Text>
                  <Text style={{ 
                    color: currentTheme.colors.onSurface + '80',
                    fontSize: 12
                  }}>
                    {t('profile.account.syncLanguageDesc')}
                  </Text>
                </View>
              </View>
              <Switch
                value={syncWithSystem}
                onValueChange={toggleSyncWithSystem}
                color={currentTheme.colors.primary}
              />
            </TouchableOpacity>
            
            <Text style={[
              styles.languagesHeader, 
              { color: currentTheme.colors.onSurface,
                marginTop: 16,
                marginBottom: 8,
                opacity: syncWithSystem ? 0.5 : 1 
              }
            ]}>
              {t('profile.account.languagesList')}
            </Text>
            
            <FlatList
              data={AVAILABLE_LANGUAGES}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.languageItem,
                    { 
                      borderBottomColor: currentTheme.colors.outline + '30',
                      opacity: syncWithSystem ? 0.5 : 1
                    }
                  ]}
                  onPress={() => handleLanguageSelect(item.code)}
                  disabled={syncWithSystem}
                >
                  <View style={styles.languageInfo}>
                    <Text style={[styles.flag, { fontSize: 24 }]}>{item.flag}</Text>
                    <Text style={{ 
                      color: currentTheme.colors.onSurface,
                      fontWeight: locale === item.code ? 'bold' : 'normal'
                    }}>
                      {item.name}
                      {item.code === systemLanguage && syncWithSystem ? ` (${t('profile.account.systemLanguage')})` : ''}
                    </Text>
                  </View>
                  <RadioButton
                    value={item.code}
                    status={locale === item.code ? 'checked' : 'unchecked'}
                    color={currentTheme.colors.primary}
                    onPress={() => handleLanguageSelect(item.code)}
                    disabled={syncWithSystem}
                  />
                </TouchableOpacity>
              )}
            />
          </Dialog.Content>
          
          <Dialog.Actions>
            <TouchableOpacity
              style={[styles.cancelButton, { borderColor: currentTheme.colors.primary }]}
              onPress={hideModal}
            >
              <Text style={{ color: currentTheme.colors.primary }}>{t('common.cancel')}</Text>
            </TouchableOpacity>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  selectedLanguage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    marginRight: 12,
  },
  syncOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  syncOptionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  languagesHeader: {
    fontWeight: 'bold',
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    marginHorizontal: 8,
  },
});

export default LanguageSelector; 