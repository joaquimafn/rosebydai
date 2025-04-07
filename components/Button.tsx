import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { useThemeContext } from '@theme/ThemeProvider';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  style?: object;
  textStyle?: object;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const { currentTheme, isDarkMode } = useThemeContext();
  
  // Determina os estilos com base na variante e tema
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          container: {
            backgroundColor: disabled 
              ? currentTheme.colors.primary + '80' 
              : currentTheme.colors.primary,
          },
          text: {
            color: '#FFFFFF',
          },
          indicator: '#FFFFFF',
        };
      case 'secondary':
        return {
          container: {
            backgroundColor: disabled 
              ? currentTheme.colors.secondary + '80' 
              : currentTheme.colors.secondary,
          },
          text: {
            color: isDarkMode ? '#000000' : '#FFFFFF',
          },
          indicator: isDarkMode ? '#000000' : '#FFFFFF',
        };
      case 'outline':
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderColor: disabled 
              ? currentTheme.colors.primary + '80' 
              : currentTheme.colors.primary,
          },
          text: {
            color: disabled 
              ? currentTheme.colors.primary + '80' 
              : currentTheme.colors.primary,
          },
          indicator: currentTheme.colors.primary,
        };
      case 'text':
        return {
          container: {
            backgroundColor: 'transparent',
          },
          text: {
            color: disabled 
              ? currentTheme.colors.primary + '80' 
              : currentTheme.colors.primary,
          },
          indicator: currentTheme.colors.primary,
        };
      default:
        return {
          container: {},
          text: {},
          indicator: currentTheme.colors.primary,
        };
    }
  };
  
  const variantStyles = getVariantStyles();
  
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        styles.button,
        variantStyles.container,
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variantStyles.indicator} size="small" />
      ) : (
        <View style={styles.contentContainer}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text 
            style={[
              styles.text, 
              variantStyles.text,
              textStyle
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 48,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
});

export default Button; 