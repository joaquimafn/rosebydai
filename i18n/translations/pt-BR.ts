export default {
  // Tela inicial
  welcome: {
    title: 'RosebydAI',
    subtitle: 'Seu mentor virtual inteligente',
    startButton: 'Começar agora',
    loginButton: 'Entrar',
    signupButton: 'Cadastrar',
    features: {
      title: 'Aprenda com um mentor virtual que:',
      item1: 'Adapta-se ao seu ritmo de aprendizado',
      item2: 'Fornece feedback personalizado',
      item3: 'Sugere recursos relevantes para seu progresso',
    },
  },

  // Autenticação
  auth: {
    login: {
      title: 'Bem-vindo de volta',
      subtitle: 'Acesse sua conta para continuar',
      emailLabel: 'Email',
      passwordLabel: 'Senha',
      forgotPassword: 'Esqueceu sua senha?',
      loginButton: 'Entrar',
      noAccount: 'Não tem uma conta?',
      signupLink: 'Cadastre-se',
      errorInvalid: 'Email ou senha inválidos',
    },
    signup: {
      title: 'Criar uma conta',
      subtitle: 'Cadastre-se para acessar seu mentor virtual',
      nameLabel: 'Nome',
      emailLabel: 'Email',
      passwordLabel: 'Senha',
      passwordHint: 'A senha deve ter pelo menos 6 caracteres',
      signupButton: 'Cadastrar',
      hasAccount: 'Já tem uma conta?',
      loginLink: 'Entrar',
      errorInUse: 'Email já em uso ou inválido',
    },
    recovery: {
      title: 'Recuperar senha',
      subtitle: 'Enviaremos um link para redefinir sua senha',
      emailLabel: 'Email',
      sendButton: 'Enviar link',
      backToLogin: 'Voltar para o login',
    },
  },

  // Chat
  chat: {
    listScreen: {
      title: 'Conversas',
      greeting: 'Olá, {name}',
      subtitle: 'Converse com seu mentor virtual',
      newChat: 'Nova conversa',
      loading: 'Carregando conversas...',
      empty: {
        title: 'Nenhuma conversa iniciada',
        subtitle: 'Comece uma nova conversa com seu mentor virtual para receber orientações personalizadas.',
        button: 'Nova conversa',
      },
    },
    conversation: {
      title: 'Chat com Mentor',
      placeholder: 'Digite sua mensagem...',
      typing: 'Mentor está digitando...',
      emptyChat: 'Comece a conversar com seu mentor virtual...',
    },
  },

  // Perfil
  profile: {
    title: 'Perfil',
    appearance: {
      title: 'Aparência',
      darkMode: 'Tema escuro',
      darkModeDesc: 'Alternar entre tema claro e escuro',
      systemTheme: 'Usar tema do sistema',
      systemThemeDesc: 'Seguir as configurações do dispositivo',
    },
    account: {
      title: 'Conta',
      editProfile: 'Editar perfil',
      editProfileDesc: 'Alterar seu nome e foto',
      changePassword: 'Alterar senha',
      changePasswordDesc: 'Atualize sua senha de acesso',
      language: 'Idioma',
      languageDesc: 'Alterar idioma do aplicativo',
      languageSyncDesc: 'Usando idioma do sistema: {language}',
      syncLanguage: 'Sincronizar com o sistema',
      syncLanguageDesc: 'Usar automaticamente o idioma do seu dispositivo',
      languagesList: 'Idiomas disponíveis',
      systemLanguage: 'Sistema',
    },
    logout: {
      button: 'Sair da conta',
      confirmTitle: 'Sair da conta',
      confirmMessage: 'Tem certeza que deseja sair da sua conta?',
      cancel: 'Cancelar',
      confirm: 'Sair',
    },
    version: 'Versão {version}',
  },

  // Idiomas disponíveis
  languages: {
    'en-US': 'Inglês (EUA)',
    'pt-BR': 'Português (Brasil)',
    'es-ES': 'Espanhol (Espanha)',
  },

  // Componentes comuns
  common: {
    back: 'Voltar',
    save: 'Salvar',
    cancel: 'Cancelar',
    delete: 'Excluir',
    edit: 'Editar',
    loading: 'Carregando...',
    error: 'Ocorreu um erro',
    success: 'Sucesso!',
    user: 'Usuário',
  },
}; 