import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeContext } from '@theme/ThemeProvider';
import Animated, { FadeInUp } from 'react-native-reanimated';

type ChatBubbleProps = {
  message: string;
  isUser: boolean;
  timestamp?: number;
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isUser, timestamp }) => {
  const { currentTheme, isDarkMode } = useThemeContext();
  
  // Função auxiliar para formatar a data
  const formatTime = (timestamp?: number) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <Animated.View
      entering={FadeInUp.duration(300).springify()}
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.botContainer,
        {
          backgroundColor: isUser
            ? currentTheme.colors.primary
            : isDarkMode
              ? currentTheme.colors.surface
              : currentTheme.colors.surface,
        },
      ]}
    >
      <Text
        style={[
          styles.messageText,
          {
            color: isUser
              ? '#FFFFFF'
              : currentTheme.colors.onSurface,
          },
        ]}
      >
        {message}
      </Text>
      
      {timestamp && (
        <Text
          style={[
            styles.timestampText,
            {
              color: isUser
                ? '#FFFFFF80'
                : currentTheme.colors.onSurface + '80',
            },
          ]}
        >
          {formatTime(timestamp)}
        </Text>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  userContainer: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  botContainer: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  timestampText: {
    fontSize: 12,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
});

export default ChatBubble; 