export default {
  // Pantalla de inicio
  welcome: {
    title: 'RosebydAI',
    subtitle: 'Tu mentor virtual inteligente',
    startButton: 'Comenzar ahora',
    loginButton: 'Iniciar sesión',
    signupButton: 'Registrarse',
    features: {
      title: 'Aprende con un mentor virtual que:',
      item1: 'Se adapta a tu ritmo de aprendizaje',
      item2: 'Proporciona retroalimentación personalizada',
      item3: 'Sugiere recursos relevantes para tu progreso',
    },
  },

  // Autenticación
  auth: {
    login: {
      title: 'Bienvenido de nuevo',
      subtitle: 'Accede a tu cuenta para continuar',
      emailLabel: 'Correo electrónico',
      passwordLabel: 'Contraseña',
      forgotPassword: '¿Olvidaste tu contraseña?',
      loginButton: 'Iniciar sesión',
      noAccount: '¿No tienes una cuenta?',
      signupLink: 'Regístrate',
      errorInvalid: 'Correo o contraseña inválidos',
    },
    signup: {
      title: 'Crear una cuenta',
      subtitle: 'Regístrate para acceder a tu mentor virtual',
      nameLabel: 'Nombre',
      emailLabel: 'Correo electrónico',
      passwordLabel: 'Contraseña',
      passwordHint: 'La contraseña debe tener al menos 6 caracteres',
      signupButton: 'Registrarse',
      hasAccount: '¿Ya tienes una cuenta?',
      loginLink: 'Iniciar sesión',
      errorInUse: 'Correo electrónico ya en uso o inválido',
    },
    recovery: {
      title: 'Recuperar contraseña',
      subtitle: 'Te enviaremos un enlace para restablecer tu contraseña',
      emailLabel: 'Correo electrónico',
      sendButton: 'Enviar enlace',
      backToLogin: 'Volver al inicio de sesión',
    },
  },

  // Chat
  chat: {
    listScreen: {
      title: 'Conversaciones',
      greeting: 'Hola, {name}',
      subtitle: 'Conversa con tu mentor virtual',
      newChat: 'Nueva conversación',
      loading: 'Cargando conversaciones...',
      empty: {
        title: 'No hay conversaciones iniciadas',
        subtitle: 'Inicia una nueva conversación con tu mentor virtual para recibir orientación personalizada.',
        button: 'Nueva conversación',
      },
    },
    conversation: {
      title: 'Chat con Mentor',
      placeholder: 'Escribe tu mensaje...',
      typing: 'Mentor está escribiendo...',
      emptyChat: 'Comienza a conversar con tu mentor virtual...',
    },
  },

  // Perfil
  profile: {
    title: 'Perfil',
    appearance: {
      title: 'Apariencia',
      darkMode: 'Modo oscuro',
      darkModeDesc: 'Alternar entre tema claro y oscuro',
      systemTheme: 'Usar tema del sistema',
      systemThemeDesc: 'Seguir la configuración del dispositivo',
    },
    account: {
      title: 'Cuenta',
      editProfile: 'Editar perfil',
      editProfileDesc: 'Cambiar tu nombre y foto',
      changePassword: 'Cambiar contraseña',
      changePasswordDesc: 'Actualiza tu contraseña de acceso',
      language: 'Idioma',
      languageDesc: 'Cambiar idioma de la aplicación',
      languageSyncDesc: 'Usando el idioma del sistema: {language}',
      syncLanguage: 'Sincronizar con el sistema',
      syncLanguageDesc: 'Usar automáticamente el idioma de tu dispositivo',
      languagesList: 'Idiomas disponibles',
      systemLanguage: 'Sistema',
    },
    logout: {
      button: 'Cerrar sesión',
      confirmTitle: 'Cerrar sesión',
      confirmMessage: '¿Estás seguro de que deseas cerrar sesión?',
      cancel: 'Cancelar',
      confirm: 'Salir',
    },
    version: 'Versión {version}',
  },

  // Idiomas disponibles
  languages: {
    'en-US': 'Inglés (EE. UU.)',
    'pt-BR': 'Portugués (Brasil)',
    'es-ES': 'Español (España)',
  },

  // Componentes comunes
  common: {
    back: 'Volver',
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    edit: 'Editar',
    loading: 'Cargando...',
    error: 'Ha ocurrido un error',
    success: '¡Éxito!',
    user: 'Usuario',
  },
}; 