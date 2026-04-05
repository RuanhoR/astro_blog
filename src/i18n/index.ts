import type { I18n, I18nKey, Language } from "../types";
import en from "./language/en";
import zh from "./language/zh";

export const LanguageI18n = {
  zh: zh as I18n,
  en: en as I18n,
} as { [key in Language]: I18n };

let defaultLanguage: Language = "zh";
export {
  defaultLanguage as currentLanguage,
}

export function getTranslation(key: I18nKey, lang: Language = defaultLanguage): string {
  // Handle server-side rendering
  if (typeof window === 'undefined') {
    return LanguageI18n[lang][key];
  }

  // Client-side language detection
  const _c = navigator.language || navigator.languages[0] || defaultLanguage;
  const browserLang = _c.slice(0, 2) as Language; // Extract language code (e.g., 'en' from 'en-US')

  if (browserLang in LanguageI18n) {
    lang = browserLang;
  }
  return LanguageI18n[lang][key];
}
export function setLanguageForSSG(lang: Language) {
  defaultLanguage = lang;
}