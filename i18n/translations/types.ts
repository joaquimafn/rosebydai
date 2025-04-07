import ptBR from './pt-BR';

export type TranslationKeys = typeof ptBR;
export type Language = 'en-US' | 'pt-BR' | 'es-ES';

export interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

export const AVAILABLE_LANGUAGES: LanguageOption[] = [
  { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
  { code: 'pt-BR', name: 'Português (Brasil)', flag: '🇧🇷' },
  { code: 'es-ES', name: 'Español (España)', flag: '🇪🇸' },
]; 