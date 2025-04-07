import React from 'react';
import { StyleSheet, TextInput as RNTextInput, TextInputProps as RNTextInputProps, View, Text } from 'react-native';
import { useThemeContext } from '@theme/ThemeProvider';
import { HelperText } from 'react-native-paper';

interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  style,
  ...props
}) => {
  const { currentTheme } = useThemeContext();
  
  const hasError = !!error;
  
  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: currentTheme.colors.onSurface }]}>
          {label}
        </Text>
      )}
      
      <View style={[
        styles.inputContainer,
        { backgroundColor: currentTheme.colors.surface },
        hasError && { borderColor: currentTheme.colors.error, borderWidth: 1 }
      ]}>
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
        
        <RNTextInput
          style={[
            styles.input,
            { color: currentTheme.colors.onSurface },
            leftIcon ? styles.inputWithLeftIcon : null,
            rightIcon ? styles.inputWithRightIcon : null,
            style
          ]}
          placeholderTextColor={currentTheme.colors.onSurface + '80'}
          {...props}
        />
        
        {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
      </View>
      
      {hasError && (
        <HelperText type="error" visible={hasError}>
          {error}
        </HelperText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    height: 48,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  inputWithLeftIcon: {
    paddingLeft: 8,
  },
  inputWithRightIcon: {
    paddingRight: 8,
  },
  iconContainer: {
    paddingHorizontal: 12,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TextInput; 