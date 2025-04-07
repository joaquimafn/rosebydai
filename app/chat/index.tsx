import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, FAB, IconButton, ActivityIndicator, Divider } from 'react-native-paper';
import { Stack, router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeContext } from '@theme/ThemeProvider';
import { useMentorStore } from '@store/mentorStore';
import { useAuthStore } from '@store/authStore';
import { useI18n } from '../../i18n';
import Screen from '@components/Screen';

export default function ChatListScreen() {
  const { currentTheme } = useThemeContext();
  const { profile } = useAuthStore();
  const { 
    conversations, 
    isLoading, 
    fetchConversations, 
    createConversation, 
    deleteConversation 
  } = useMentorStore();
  const { t } = useI18n();
  
  // Carregar conversas ao iniciar
  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);
  
  // Iniciar nova conversa
  const handleNewChat = () => {
    createConversation();
    router.push('/chat/conversation');
  };
  
  // Abrir conversa existente
  const handleOpenChat = (id: string) => {
    router.push(`/chat/conversation?id=${id}`);
  };
  
  // Renderizar cabeçalho
  const renderHeader = () => (
    <View style={styles.headerContent}>
      <Text 
        style={[styles.greeting, { color: currentTheme.colors.onSurface }]}
        variant="titleMedium"
      >
        {t('chat.listScreen.greeting', { name: profile?.displayName || t('common.user') })}
      </Text>
      <Text 
        style={[styles.subtitle, { color: currentTheme.colors.primary }]}
        variant="headlineSmall"
      >
        {t('chat.listScreen.subtitle')}
      </Text>
    </View>
  );
  
  // Renderizar item de conversa
  const renderConversationItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.conversationItem,
        { backgroundColor: currentTheme.colors.surface }
      ]}
      onPress={() => handleOpenChat(item.id)}
    >
      <View style={styles.conversationIcon}>
        <MaterialCommunityIcons 
          name="chat-outline" 
          size={24}
          color={currentTheme.colors.primary} 
        />
      </View>
      
      <View style={styles.conversationInfo}>
        <Text 
          style={{ color: currentTheme.colors.onSurface }}
          variant="titleMedium"
          numberOfLines={1}
        >
          {item.title}
        </Text>
        
        <Text 
          style={{ color: currentTheme.colors.onSurface + '80' }}
          variant="bodySmall"
          numberOfLines={1}
        >
          {new Date(item.updatedAt).toLocaleDateString()}
        </Text>
      </View>
      
      <IconButton
        icon="delete"
        size={20}
        onPress={() => deleteConversation(item.id)}
        iconColor={currentTheme.colors.error}
      />
    </TouchableOpacity>
  );
  
  // Renderizar mensagem vazia
  const renderEmptyList = () => {
    if (isLoading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={currentTheme.colors.primary} />
          <Text style={{ color: currentTheme.colors.onSurface, marginTop: 16 }}>
            {t('chat.listScreen.loading')}
          </Text>
        </View>
      );
    }
    
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons 
          name="chat-question-outline" 
          size={64}
          color={currentTheme.colors.primary} 
        />
        <Text 
          style={[styles.emptyText, { color: currentTheme.colors.onSurface }]}
          variant="titleMedium"
        >
          {t('chat.listScreen.empty.title')}
        </Text>
        <Text 
          style={{ 
            color: currentTheme.colors.onSurface + '80',
            textAlign: 'center',
            marginTop: 8,
            marginBottom: 24,
          }}
        >
          {t('chat.listScreen.empty.subtitle')}
        </Text>
        
        <TouchableOpacity
          style={[
            styles.newChatButton,
            { backgroundColor: currentTheme.colors.primary }
          ]}
          onPress={handleNewChat}
        >
          <MaterialCommunityIcons name="plus" size={24} color="#FFFFFF" />
          <Text style={[styles.newChatText, { color: '#FFFFFF' }]}>
            {t('chat.listScreen.empty.button')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  return (
    <Screen>
      <Stack.Screen
        options={{
          title: t('chat.listScreen.title'),
          headerShown: true,
          headerRight: () => (
            <IconButton
              icon="cog"
              onPress={() => router.push('/profile')}
              iconColor={currentTheme.colors.onSurface}
            />
          ),
        }}
      />
      
      <View style={styles.container}>
        {renderHeader()}
        
        <Divider style={styles.divider} />
        
        <FlatList
          data={conversations}
          renderItem={renderConversationItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyList}
          showsVerticalScrollIndicator={false}
        />
        
        {conversations.length > 0 && (
          <FAB
            icon="plus"
            style={[
              styles.fab,
              { backgroundColor: currentTheme.colors.primary }
            ]}
            onPress={handleNewChat}
            color="#FFFFFF"
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContent: {
    padding: 24,
    paddingBottom: 16,
  },
  greeting: {
    marginBottom: 4,
  },
  subtitle: {
    fontWeight: 'bold',
  },
  divider: {
    marginBottom: 16,
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  conversationIcon: {
    marginRight: 16,
  },
  conversationInfo: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    marginTop: 16,
    fontWeight: '600',
  },
  newChatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  newChatText: {
    marginLeft: 8,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
}); 