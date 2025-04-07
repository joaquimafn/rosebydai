import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMentorResponse, MessageType } from '@services/openai';
import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { firestore } from '@services/firebase';
import { useAuthStore } from './authStore';

// Tipos
export type Conversation = {
  id: string;
  title: string;
  messages: MessageType[];
  createdAt: number;
  updatedAt: number;
  userId: string;
};

type MentorState = {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  isLoading: boolean;
  error: string | null;
};

type MentorActions = {
  createConversation: (title?: string) => void;
  selectConversation: (id: string) => void;
  sendMessage: (content: string) => Promise<void>;
  fetchConversations: () => Promise<void>;
  saveConversationToFirestore: (conversation: Conversation) => Promise<void>;
  deleteConversation: (id: string) => Promise<void>;
  clearError: () => void;
};

// Mensagem inicial do sistema
const SYSTEM_MESSAGE: MessageType = {
  role: 'system',
  content: 'Você é um mentor virtual inteligente, projetado para fornecer orientação personalizada, responder perguntas e ajudar o usuário a alcançar seus objetivos de aprendizado. Seja útil, claro e motivador em suas respostas.'
};

// Criação da store do mentor com persistência
export const useMentorStore = create<MentorState & MentorActions>()(
  persist(
    (set, get) => ({
      conversations: [],
      currentConversation: null,
      isLoading: false,
      error: null,

      // Criar nova conversa
      createConversation: (title = 'Nova Conversa') => {
        const user = useAuthStore.getState().user;
        
        if (!user) {
          set({ error: 'Usuário não autenticado' });
          return;
        }
        
        const newConversation: Conversation = {
          id: Date.now().toString(),
          title,
          messages: [SYSTEM_MESSAGE],
          createdAt: Date.now(),
          updatedAt: Date.now(),
          userId: user.uid,
        };
        
        set(state => ({
          conversations: [newConversation, ...state.conversations],
          currentConversation: newConversation,
        }));
      },
      
      // Selecionar conversa
      selectConversation: (id) => {
        const conversation = get().conversations.find(c => c.id === id);
        set({ currentConversation: conversation || null });
      },
      
      // Enviar mensagem para o mentor
      sendMessage: async (content) => {
        try {
          const { currentConversation } = get();
          
          if (!currentConversation) {
            throw new Error('Nenhuma conversa selecionada');
          }
          
          set({ isLoading: true, error: null });
          
          // Adicionar mensagem do usuário
          const userMessage: MessageType = { role: 'user', content };
          const updatedMessages = [...currentConversation.messages, userMessage];
          
          // Atualizar conversa com a mensagem do usuário
          const updatedConversation = {
            ...currentConversation,
            messages: updatedMessages,
            updatedAt: Date.now(),
          };
          
          set(state => ({
            currentConversation: updatedConversation,
            conversations: state.conversations.map(c => 
              c.id === updatedConversation.id ? updatedConversation : c
            ),
          }));
          
          // Obter resposta do mentor
          const response = await getMentorResponse({
            messages: updatedMessages,
          });
          
          // Adicionar resposta do assistente
          const assistantMessage: MessageType = { role: 'assistant', content: response };
          const finalMessages = [...updatedMessages, assistantMessage];
          
          // Atualizar conversa com a resposta
          const finalConversation = {
            ...updatedConversation,
            messages: finalMessages,
            updatedAt: Date.now(),
          };
          
          set(state => ({
            isLoading: false,
            currentConversation: finalConversation,
            conversations: state.conversations.map(c => 
              c.id === finalConversation.id ? finalConversation : c
            ),
          }));
          
          // Salvar no Firestore
          await get().saveConversationToFirestore(finalConversation);
          
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Erro ao enviar mensagem' 
          });
        }
      },
      
      // Buscar conversas do Firestore
      fetchConversations: async () => {
        try {
          const user = useAuthStore.getState().user;
          
          if (!user) {
            return;
          }
          
          set({ isLoading: true, error: null });
          
          const q = query(
            collection(firestore, 'conversations'),
            where('userId', '==', user.uid),
            orderBy('updatedAt', 'desc')
          );
          
          const querySnapshot = await getDocs(q);
          const conversations: Conversation[] = [];
          
          querySnapshot.forEach((doc) => {
            conversations.push({
              id: doc.id,
              ...(doc.data() as Omit<Conversation, 'id'>)
            });
          });
          
          set({ 
            conversations, 
            isLoading: false,
            currentConversation: conversations.length > 0 ? conversations[0] : null
          });
          
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Erro ao buscar conversas' 
          });
        }
      },
      
      // Salvar conversa no Firestore
      saveConversationToFirestore: async (conversation) => {
        try {
          const user = useAuthStore.getState().user;
          
          if (!user) {
            throw new Error('Usuário não autenticado');
          }
          
          // Remover o ID para não duplicar
          const { id, ...conversationData } = conversation;
          
          // Adicionar ou atualizar documento
          await addDoc(collection(firestore, 'conversations'), {
            ...conversationData,
            userId: user.uid,
          });
          
        } catch (error) {
          console.error('Erro ao salvar conversa:', error);
        }
      },
      
      // Excluir conversa
      deleteConversation: async (id) => {
        try {
          set({ isLoading: true, error: null });
          
          // Atualizar estado
          set(state => ({
            conversations: state.conversations.filter(c => c.id !== id),
            currentConversation: state.currentConversation?.id === id 
              ? (state.conversations.length > 1 
                ? state.conversations.find(c => c.id !== id) || null 
                : null) 
              : state.currentConversation,
          }));
          
          set({ isLoading: false });
          
          // TODO: Implementar exclusão no Firestore
          
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Erro ao excluir conversa' 
          });
        }
      },
      
      // Limpar erro
      clearError: () => set({ error: null }),
    }),
    {
      name: 'mentor-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ 
        conversations: state.conversations,
        currentConversation: state.currentConversation
      }),
    }
  )
); 