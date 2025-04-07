# RosebydAI - Mentor Virtual Inteligente

Um aplicativo React Native com Expo que implementa um mentor virtual inteligente, utilizando Expo Router para navegação e integrações com OpenAI para respostas personalizadas.

## Tecnologias Utilizadas

- **React Native** com **Expo**
- **TypeScript** para tipagem estática
- **Expo Router** para navegação avançada com deep linking
- **Zustand** para gerenciamento de estado otimizado
- **React Native Reanimated** para animações suaves
- **React Native Async Storage** para persistência local
- **React Native Paper** para UI acessível e moderna
- **Firebase** (Auth e Firestore) para autenticação e armazenamento
- **OpenAI** para respostas dinâmicas e personalizadas
- **Expo Notifications** para notificações push

## Estrutura do Projeto

```
RosebydAI/
├── app/                    # Rotas do Expo Router
│   ├── _layout.tsx         # Layout raiz
│   ├── index.tsx           # Página inicial
│   ├── auth/               # Rotas de autenticação
│   │   ├── login.tsx
│   │   └── signup.tsx
│   ├── chat/               # Rotas de chat
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   └── conversation.tsx
│   └── profile.tsx         # Página de perfil
├── src/
│   ├── components/         # Componentes reutilizáveis
│   │   ├── Button.tsx
│   │   ├── Screen.tsx
│   │   ├── TextInput.tsx
│   │   └── Chat/
│   │       ├── ChatBubble.tsx
│   │       ├── ChatInput.tsx
│   │       ├── ChatMessages.tsx
│   │       └── ChatScreen.tsx
│   ├── hooks/              # Hooks personalizados
│   │   └── useTheme.ts
│   ├── services/           # Serviços externos
│   │   ├── firebase.ts
│   │   └── openai.ts
│   ├── store/              # Estado global com Zustand
│   │   ├── authStore.ts
│   │   └── mentorStore.ts
│   └── theme/              # Configuração de temas
│       ├── theme.ts
│       └── ThemeProvider.tsx
├── assets/                 # Recursos estáticos
├── babel.config.js         # Configuração do Babel
├── app.json                # Configuração do Expo
├── tsconfig.json           # Configuração do TypeScript
└── package.json            # Dependências e scripts
```

## Funcionalidades

- **Autenticação Completa**: Login, cadastro e recuperação de senha
- **Chat com Mentor IA**: Interface de chat interativa com o mentor virtual
- **Persistência de Conversas**: Histórico de conversas salvo no Firestore
- **Tema Personalizável**: Suporte a temas claro e escuro, com opção para seguir o sistema
- **Perfil de Usuário**: Gestão de perfil e preferências
- **Animações Fluidas**: Transições e animações suaves em toda a aplicação

## Iniciando o Projeto

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Configure suas credenciais do Firebase em `src/services/firebase.ts`
4. Configure sua chave da API OpenAI em `src/services/openai.ts`
5. Inicie o projeto: `npm start`

## Requisitos

- Node.js 18 ou superior
- Expo CLI instalado globalmente: `npm install -g expo-cli`
- Conta no Firebase (para autenticação e Firestore)
- Chave de API da OpenAI 