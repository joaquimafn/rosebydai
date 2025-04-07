export default {
  // Home screen
  welcome: {
    title: 'RosebydAI',
    subtitle: 'Your intelligent virtual mentor',
    startButton: 'Get Started',
    loginButton: 'Login',
    signupButton: 'Sign Up',
    features: {
      title: 'Learn with a virtual mentor that:',
      item1: 'Adapts to your learning pace',
      item2: 'Provides personalized feedback',
      item3: 'Suggests relevant resources for your progress',
    },
  },

  // Authentication
  auth: {
    login: {
      title: 'Welcome Back',
      subtitle: 'Access your account to continue',
      emailLabel: 'Email',
      passwordLabel: 'Password',
      forgotPassword: 'Forgot your password?',
      loginButton: 'Login',
      noAccount: 'Don\'t have an account?',
      signupLink: 'Sign Up',
      errorInvalid: 'Invalid email or password',
    },
    signup: {
      title: 'Create an Account',
      subtitle: 'Sign up to access your virtual mentor',
      nameLabel: 'Name',
      emailLabel: 'Email',
      passwordLabel: 'Password',
      passwordHint: 'Password must be at least 6 characters long',
      signupButton: 'Sign Up',
      hasAccount: 'Already have an account?',
      loginLink: 'Login',
      errorInUse: 'Email already in use or invalid',
    },
    recovery: {
      title: 'Recover Password',
      subtitle: 'We\'ll send you a link to reset your password',
      emailLabel: 'Email',
      sendButton: 'Send Link',
      backToLogin: 'Back to login',
    },
  },

  // Chat
  chat: {
    listScreen: {
      title: 'Conversations',
      greeting: 'Hi, {name}',
      subtitle: 'Chat with your virtual mentor',
      newChat: 'New Conversation',
      loading: 'Loading conversations...',
      empty: {
        title: 'No conversations yet',
        subtitle: 'Start a new conversation with your virtual mentor to receive personalized guidance.',
        button: 'New Conversation',
      },
    },
    conversation: {
      title: 'Chat with Mentor',
      placeholder: 'Type your message...',
      typing: 'Mentor is typing...',
      emptyChat: 'Start chatting with your virtual mentor...',
    },
  },

  // Profile
  profile: {
    title: 'Profile',
    appearance: {
      title: 'Appearance',
      darkMode: 'Dark Mode',
      darkModeDesc: 'Toggle between light and dark theme',
      systemTheme: 'Use system theme',
      systemThemeDesc: 'Follow device settings',
    },
    account: {
      title: 'Account',
      editProfile: 'Edit Profile',
      editProfileDesc: 'Change your name and photo',
      changePassword: 'Change Password',
      changePasswordDesc: 'Update your access password',
      language: 'Language',
      languageDesc: 'Change app language',
      languageSyncDesc: 'Using system language: {language}',
      syncLanguage: 'Sync with system',
      syncLanguageDesc: 'Automatically use your device language',
      languagesList: 'Available languages',
      systemLanguage: 'System',
    },
    logout: {
      button: 'Sign Out',
      confirmTitle: 'Sign Out',
      confirmMessage: 'Are you sure you want to sign out?',
      cancel: 'Cancel',
      confirm: 'Sign Out',
    },
    version: 'Version {version}',
  },

  // Available languages
  languages: {
    'en-US': 'English (US)',
    'pt-BR': 'Portuguese (Brazil)',
    'es-ES': 'Spanish (Spain)',
  },

  // Common components
  common: {
    back: 'Back',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    loading: 'Loading...',
    error: 'An error occurred',
    success: 'Success!',
    user: 'User',
  },
}; 