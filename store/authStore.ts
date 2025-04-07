import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  UserCredential, 
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '@services/firebase';

// Tipos
type UserProfile = {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: number;
  interests?: string[];
  learningGoals?: string[];
  lastActive?: number;
};

type AuthState = {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
};

type AuthActions = {
  signUp: (email: string, password: string, displayName?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  clearError: () => void;
  refreshUserProfile: () => Promise<void>;
};

// Criação da store de autenticação com persistência
export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,

      // Cadastro de usuário
      signUp: async (email, password, displayName) => {
        try {
          set({ isLoading: true, error: null });
          
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const { user } = userCredential;
          
          // Criar perfil do usuário no Firestore
          const userProfile: UserProfile = {
            id: user.uid,
            email: user.email || email,
            displayName: displayName || '',
            createdAt: Date.now(),
          };
          
          await setDoc(doc(firestore, 'users', user.uid), userProfile);
          
          set({ 
            user, 
            profile: userProfile, 
            isLoading: false, 
            isAuthenticated: true 
          });
          
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Erro no cadastro' 
          });
          throw error;
        }
      },
      
      // Login de usuário
      signIn: async (email, password) => {
        try {
          set({ isLoading: true, error: null });
          
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const { user } = userCredential;
          
          // Buscar perfil do usuário
          await get().refreshUserProfile();
          
          set({ 
            user,
            isLoading: false,
            isAuthenticated: true
          });
          
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Erro no login' 
          });
          throw error;
        }
      },
      
      // Logout
      signOut: async () => {
        try {
          set({ isLoading: true, error: null });
          
          await firebaseSignOut(auth);
          
          set({ 
            user: null, 
            profile: null, 
            isLoading: false, 
            isAuthenticated: false 
          });
          
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Erro ao fazer logout' 
          });
          throw error;
        }
      },
      
      // Atualizar perfil
      updateProfile: async (data) => {
        try {
          const { profile, user } = get();
          
          if (!profile || !user) {
            throw new Error('Usuário não autenticado');
          }
          
          set({ isLoading: true, error: null });
          
          const updatedProfile = { 
            ...profile, 
            ...data, 
            lastActive: Date.now()
          };
          
          await setDoc(doc(firestore, 'users', user.uid), updatedProfile, { merge: true });
          
          set({ 
            profile: updatedProfile, 
            isLoading: false 
          });
          
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Erro ao atualizar perfil'
          });
          throw error;
        }
      },
      
      // Atualizar perfil do usuário do Firestore
      refreshUserProfile: async () => {
        try {
          const { user } = get();
          
          if (!user) {
            return;
          }
          
          const userDoc = await getDoc(doc(firestore, 'users', user.uid));
          
          if (userDoc.exists()) {
            const userProfile = userDoc.data() as UserProfile;
            set({ profile: userProfile });
          }
          
        } catch (error) {
          console.error('Erro ao atualizar perfil:', error);
        }
      },
      
      // Limpar erro
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ 
        user: state.user,
        profile: state.profile,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
); 