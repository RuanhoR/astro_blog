export const LanguageList = ['en', 'zh'] as const;
export type Language = typeof LanguageList[number];
export const FooterLanguageKey = ["footerMdTip"] as const;
export const HomeLanguageKey = ["AllTextCout", "AllAlircleCout"] as const;
export const HeaderLanuageKey = [
  "Search",
  "Home",
  "Blog",
  "About"
] as const;
export const SearchLanguageKey = [
  "searchTitle",
  "searchPlaceholder",
  "searchHint",
  "noResults",
  "searching"
] as const;
export const AboutLanguageKey = ["aboutTitle", "aboutContent"] as const;
export type I18nKey = typeof FooterLanguageKey[number] | typeof HomeLanguageKey[number] | typeof HeaderLanuageKey[number] | typeof SearchLanguageKey[number] | typeof AboutLanguageKey[number];
export type I18n = {
  [key in I18nKey]: string;
};