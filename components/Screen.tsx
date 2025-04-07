import React, { ReactNode } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar } from 'react-native';
import { useThemeContext } from '@theme/ThemeProvider';

type ScreenProps = {
  children: ReactNode;
  scrollable?: boolean;
  keyboardAvoiding?: boolean;
  padding?: number;
  style?: object;
  statusBarStyle?: 'light-content' | 'dark-content';
};

const Screen: React.FC<ScreenProps> = ({
  children,
  scrollable = false,
  keyboardAvoiding = true,
  padding = 16,
  style = {},
  statusBarStyle,
}) => {
  const { currentTheme, isDarkMode } = useThemeContext();
  
  // Determina o estilo da barra de status com base no tema
  const barStyle = statusBarStyle || (isDarkMode ? 'light-content' : 'dark-content');
  
  // Container padrão do conteúdo
  const ContentContainer = ({ children }: { children: ReactNode }) => (
    <View 
      style={[
        styles.container, 
        { 
          padding, 
          backgroundColor: currentTheme.colors.background 
        },
        style
      ]}
    >
      {children}
    </View>
  );
  
  // Renderiza o conteúdo adequado com base nas props
  const renderContent = () => {
    // Conteúdo básico
    let content = <ContentContainer>{children}</ContentContainer>;
    
    // Adiciona ScrollView se necessário
    if (scrollable) {
      content = (
        <ScrollView 
          style={{ flex: 1, backgroundColor: currentTheme.colors.background }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {content}
        </ScrollView>
      );
    }
    
    // Adiciona KeyboardAvoidingView se necessário
    if (keyboardAvoiding) {
      content = (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
          {content}
        </KeyboardAvoidingView>
      );
    }
    
    return content;
  };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme.colors.background }}>
      <StatusBar 
        barStyle={barStyle}
        backgroundColor={currentTheme.colors.background}
      />
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Screen; 