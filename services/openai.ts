import OpenAI from 'openai';

// Instância do cliente OpenAI - substitua com sua própria chave API
const openai = new OpenAI({
  apiKey: 'YOUR_OPENAI_API_KEY',
  dangerouslyAllowBrowser: true // Para uso em ambiente React Native
});

// Tipos para o serviço da IA
export type MessageType = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export type MentorRequest = {
  messages: MessageType[];
  maxTokens?: number;
  temperature?: number;
};

// Função para obter resposta do mentor virtual
export const getMentorResponse = async ({
  messages,
  maxTokens = 500,
  temperature = 0.7
}: MentorRequest): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: maxTokens,
      temperature,
    });

    return response.choices[0]?.message?.content || 'Desculpe, não consegui gerar uma resposta.';
  } catch (error) {
    console.error('Erro na API OpenAI:', error);
    throw new Error('Falha na comunicação com o mentor virtual. Por favor, tente novamente.');
  }
};

// Função para gerar sugestões personalizadas
export const generatePersonalizedSuggestions = async (userContext: string): Promise<string[]> => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Você é um mentor que gera sugestões personalizadas de aprendizado.' },
        { role: 'user', content: `Com base no seguinte contexto do usuário, gere 3 sugestões de aprendizado separadas por "|": ${userContext}` }
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const suggestions = response.choices[0]?.message?.content?.split('|') || [];
    return suggestions.map(suggestion => suggestion.trim()).filter(Boolean);
  } catch (error) {
    console.error('Erro ao gerar sugestões:', error);
    return ['Explore nossos conteúdos disponíveis', 'Pratique regularmente', 'Defina metas específicas'];
  }
}; 