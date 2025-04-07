import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { useThemeContext } from '@theme/ThemeProvider';
import { useI18n } from '../../i18n';
import { IconButton } from 'react-native-paper';
import Animated, { SlideInDown } from 'react-native-reanimated';

type ChatInputProps = {
  onSend: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  disabled?: boolean;
};

const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  isLoading = false,
  placeholder,
  disabled = false,
}) => {
  const { currentTheme } = useThemeContext();
  const { t } = useI18n();
  const [message, setMessage] = useState('');
  
  const defaultPlaceholder = t('chat.conversation.placeholder');
  
  const handleSend = () => {
    if (message.trim() && !isLoading && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };
  
  return (
    <Animated.View
      entering={SlideInDown.duration(300).springify()}
      style={[
        styles.container,
        {
          backgroundColor: currentTheme.colors.elevation.level1,
          borderTopColor: currentTheme.colors.elevation.level3,
        },
      ]}
    >
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: currentTheme.colors.surface,
          },
        ]}
      >
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder={placeholder || defaultPlaceholder}
          placeholderTextColor={currentTheme.colors.onSurface + '80'}
          style={[
            styles.input,
            {
              color: currentTheme.colors.onSurface,
            },
          ]}
          multiline
          numberOfLines={Platform.OS === 'ios' ? undefined : 1}
          maxLength={1000}
          editable={!disabled}
          onSubmitEditing={handleSend}
        />
        
        <TouchableOpacity
          onPress={handleSend}
          disabled={!message.trim() || isLoading || disabled}
          style={[
            styles.sendButton,
            {
              backgroundColor: !message.trim() || disabled
                ? currentTheme.colors.primary + '40'
                : currentTheme.colors.primary,
            },
          ]}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <IconButton
              icon="send"
              size={20}
              iconColor="#FFFFFF"
            />
          )}
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 8,
    borderTopWidth: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 8 : 0,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    fontSize: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});

export default ChatInput; 