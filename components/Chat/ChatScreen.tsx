import React, { useEffect } from 'react';
import { StyleSheet, View, BackHandler, KeyboardAvoidingView, Platform } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useThemeContext } from '@theme/ThemeProvider';
import { useMentorStore } from '@store/mentorStore';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import Screen from '@components/Screen';

type ChatScreenProps = {
  conversationId?: string;
};

const ChatScreen: React.FC<ChatScreenProps> = ({ conversationId }) => {
  const navigation = useRouter();
  const { currentTheme } = useThemeContext();
  
  // Estado do mentor
  const {
    currentConversation,
    isLoading,
    sendMessage,
    createConversation,
    selectConversation,
  } = useMentorStore();
  
  // Inicializar ou selecionar conversa
  useEffect(() => {
    if (conversationId) {
      selectConversation(conversationId);
    } else if (!currentConversation) {
      createConversation('Nova conversa');
    }
  }, [conversationId, currentConversation, createConversation, selectConversation]);
  
  // Lidar com o botão de voltar
  useEffect(() => {
    const handleBackPress = () => {
      navigation.back();
      return true;
    };
    
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    
    return () => backHandler.remove();
  }, [navigation]);
  
  // Lidar com o envio de mensagem
  const handleSendMessage = (content: string) => {
    if (!isLoading) {
      sendMessage(content);
    }
  };
  
  // Renderizar o cabeçalho
  const renderHeader = () => (
    <Appbar.Header
      style={{
        backgroundColor: currentTheme.colors.surface,
        elevation: 0,
        borderBottomWidth: 1,
        borderBottomColor: currentTheme.colors.elevation.level2,
      }}
    >
      <Appbar.BackAction onPress={() => navigation.back()} />
      <Appbar.Content
        title={currentConversation?.title || 'Chat com Mentor'}
        titleStyle={{ fontSize: 18 }}
      />
    </Appbar.Header>
  );
  
  return (
    <Screen keyboardAvoiding={false} style={{ padding: 0 }}>
      {renderHeader()}
      
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.chatContainer}>
          <ChatMessages
            messages={currentConversation?.messages || []}
            loading={isLoading}
          />
          
          <ChatInput
            onSend={handleSendMessage}
            isLoading={isLoading}
            disabled={!currentConversation}
          />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    width: '100%',
  },
});

export default ChatScreen; 