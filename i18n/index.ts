import i18n from './i18n';
import { I18nProvider, useI18n } from './I18nProvider';
import translations, { AVAILABLE_LANGUAGES } from './translations';
import type { Language, LanguageOption } from './translations';

export {
  i18n,
  I18nProvider,
  useI18n,
  translations,
  AVAILABLE_LANGUAGES,
};

export type { Language, LanguageOption };

export default i18n; 