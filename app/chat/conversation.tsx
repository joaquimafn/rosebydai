import React, { useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { IconButton } from 'react-native-paper';
import { useThemeContext } from '@theme/ThemeProvider';
import { useMentorStore } from '@store/mentorStore';
import { useI18n } from '../../i18n';
import Screen from '@components/Screen';
import ChatMessages from '@components/Chat/ChatMessages';
import ChatInput from '@components/Chat/ChatInput';

export default function ConversationScreen() {
  const { id } = useLocalSearchParams();
  const conversationId = typeof id === 'string' ? id : undefined;
  
  const { currentTheme } = useThemeContext();
  const {
    currentConversation,
    isLoading,
    sendMessage,
    createConversation,
    selectConversation,
  } = useMentorStore();
  const { t } = useI18n();
  
  // Inicializar ou selecionar conversa
  useEffect(() => {
    if (conversationId) {
      selectConversation(conversationId);
    } else if (!currentConversation) {
      createConversation('Nova conversa');
    }
  }, [conversationId, currentConversation, createConversation, selectConversation]);
  
  // Lidar com o envio de mensagem
  const handleSendMessage = (content: string) => {
    if (!isLoading) {
      sendMessage(content);
    }
  };
  
  return (
    <Screen keyboardAvoiding={false} style={{ padding: 0 }}>
      <Stack.Screen
        options={{
          title: currentConversation?.title || t('chat.conversation.title'),
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    width: '100%',
  },
}); 