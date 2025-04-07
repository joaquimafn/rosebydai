import enUS from './en-US';
import ptBR from './pt-BR';
import esES from './es-ES';
import { Language, TranslationKeys } from './types';

export * from './types';

const translations: Record<Language, TranslationKeys> = {
  'en-US': enUS,
  'pt-BR': ptBR,
  'es-ES': esES,
};

export default translations; 