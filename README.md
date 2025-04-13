# RosebydAI - Intelligent Virtual Mentor

A React Native app with Expo that implements an intelligent virtual mentor, using Expo Router for navigation and OpenAI integrations for personalized responses.

## Technologies Used

- **React Native** with **Expo**
- **TypeScript** for static typing
- **Expo Router** for advanced navigation with deep linking
- **Zustand** for optimized state management
- **React Native Reanimated** for smooth animations
- **React Native Async Storage** for local persistence
- **React Native Paper** for accessible and modern UI
- **Firebase** (Auth and Firestore) for authentication and storage
- **OpenAI** for dynamic and personalized responses
- **Expo Notifications** for push notifications

## Project Structure

```
RosebydAI/
├── app/                    # Expo Router routes
│   ├── _layout.tsx         # Root layout
│   ├── index.tsx           # Home page
│   ├── auth/               # Authentication routes
│   │   ├── login.tsx
│   │   └── signup.tsx
│   ├── chat/               # Chat routes
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   └── conversation.tsx
│   └── profile.tsx         # Profile page
│   ├── components/         # Reusable components
│   │   ├── Button.tsx
│   │   ├── Screen.tsx
│   │   ├── TextInput.tsx
│   │   └── Chat/
│   │       ├── ChatBubble.tsx
│   │       ├── ChatInput.tsx
│   │       ├── ChatMessages.tsx
│   │       └── ChatScreen.tsx
│   ├── hooks/              # Custom hooks
│   │   └── useTheme.ts
│   ├── services/           # External services
│   │   ├── firebase.ts
│   │   └── openai.ts
│   ├── store/              # Global state with Zustand
│   │   ├── authStore.ts
│   │   └── mentorStore.ts
│   └── theme/              # Theme configuration
│       ├── theme.ts
│       └── ThemeProvider.tsx
├── assets/                 # Static resources
├── babel.config.js         # Babel configuration
├── app.json                # Expo configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## Features

- **Complete Authentication**: Login, registration, and password recovery
- **Chat with AI Mentor**: Interactive chat interface with the virtual mentor
- **Conversation Persistence**: Conversation history saved in Firestore
- **Customizable Theme**: Support for light and dark themes, with option to follow system settings
- **User Profile**: Profile and preferences management
- **Fluid Animations**: Smooth transitions and animations throughout the application

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Configure your Firebase credentials in `src/services/firebase.ts`
4. Configure your OpenAI API key in `src/services/openai.ts`
5. Start the project: `npm start`

## Requirements

- Node.js 18 or higher
- Expo CLI installed globally: `npm install -g expo-cli`
- Firebase account (for authentication and Firestore)
- OpenAI API key 
