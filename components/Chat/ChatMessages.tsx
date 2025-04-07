import React, { useRef, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { useThemeContext } from '@theme/ThemeProvider';
import { useI18n } from '../../i18n';
import { MessageType } from '@services/openai';
import ChatBubble from './ChatBubble';
import Animated, { FadeIn } from 'react-native-reanimated';

type ChatMessagesProps = {
  messages: MessageType[];
  loading?: boolean;
  emptyMessage?: string;
};

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  loading = false,
  emptyMessage,
}) => {
  const { currentTheme } = useThemeContext();
  const { t } = useI18n();
  const flatListRef = useRef<FlatList>(null);
  
  // Filtrar mensagens do sistema (não mostradas ao usuário)
  const visibleMessages = messages.filter(msg => msg.role !== 'system');
  
  // Rola para a última mensagem quando novas mensagens são adicionadas
  useEffect(() => {
    if (visibleMessages.length > 0 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [visibleMessages.length]);
  
  // Renderização da mensagem individual
  const renderMessage = ({ item, index }: { item: MessageType; index: number }) => {
    // Timestamp fictício para demonstração (normalmente viria do backend)
    const timestamp = Date.now() - (visibleMessages.length - index) * 60000;
    
    return (
      <ChatBubble
        message={item.content}
        isUser={item.role === 'user'}
        timestamp={timestamp}
      />
    );
  };
  
  // Renderização do indicador de digitação
  const renderTypingIndicator = () => {
    if (!loading) return null;
    
    return (
      <Animated.View 
        entering={FadeIn.duration(300)}
        style={styles.typingContainer}
      >
        <Text style={[styles.typingText, { color: currentTheme.colors.onSurface + '80' }]}>
          {t('chat.conversation.typing')}
        </Text>
      </Animated.View>
    );
  };
  
  // Renderização para quando não há mensagens
  const renderEmptyComponent = () => {
    if (loading || visibleMessages.length > 0) return null;
    
    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyText, { color: currentTheme.colors.onSurface + '70' }]}>
          {emptyMessage || t('chat.conversation.emptyChat')}
        </Text>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={visibleMessages}
        renderItem={renderMessage}
        keyExtractor={(_, index) => `message-${index}`}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyComponent}
        ListFooterComponent={renderTypingIndicator}
        ListFooterComponentStyle={styles.footerContainer}
        automaticallyAdjustKeyboardInsets
        initialNumToRender={20}
        windowSize={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 8,
    paddingTop: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
  typingContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  typingText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  footerContainer: {
    marginBottom: 8,
  },
});

export default ChatMessages; 