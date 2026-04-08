import type { I18n, I18nKey, Language } from "../types";
import en from "./language/en";
import zh from "./language/zh";

export const LanguageI18n = {
  zh: zh as I18n,
  en: en as I18n,
} as { [key in Language]: I18n };

// Client-side language detection
export function getCurrentLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'zh'; // Default for SSR
  }
  const browserLang = (navigator.language || navigator.languages[0] || 'zh').slice(0, 2) as Language;
  return browserLang in LanguageI18n ? browserLang : 'zh';
}
let defaultLanguage;
export function getTranslation(key: I18nKey, lang?: Language): string {
  const currentLang = lang || getCurrentLanguage();
  return LanguageI18n[currentLang][key];
}

export function getTranslations(lang?: Language): I18n {
  const currentLang = lang || getCurrentLanguage();
  return LanguageI18n[currentLang];
}
export function setLanguageForSSG(lang: Language) {
  defaultLanguage = lang;
}