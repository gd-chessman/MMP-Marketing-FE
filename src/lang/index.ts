import en from './locales/en.json';
import vi from './locales/vi.json';
import kr from './locales/kr.json';
import jp from './locales/jp.json';
import { useLang } from '@/lang/useLang';
import { LangProvider } from '@/lang/LangProvider';

export type LangCodes = 'en' | 'vi' | 'kr' | 'jp';

// Updated type definition to support arrays of objects and nested structures
type Translations = { 
  [key: string]: string | string[] | { [key: string]: any }[] | Translations 
};

export const langConfig: { 
  listLangs: { id: number; name: string; code: LangCodes }[];
  langsApp: Partial<Record<LangCodes, Translations>>;
} = {
  listLangs: [
    { id: 1, name: "Korea", code: "kr" },
    { id: 2, name: "English", code: "en" },
    { id: 3, name: "Vietnamese", code: "vi" },
    { id: 4, name: "Japan", code: "jp" },
  ],
  langsApp: {
    en,
    vi,
    kr,
    jp,
  }
};

// Hàm hỗ trợ lấy dữ liệu từ object lồng nhau (chỉ trả về string)
const getNestedTranslation = (translations: Translations, key: string): string => {
  const result = key.split('.').reduce((obj: any, k) => {
    if (typeof obj === 'object' && obj !== null && k in obj) {
      return obj[k];
    }
    return undefined;
  }, translations as Translations);
  
  return typeof result === 'string' ? result : key;
};

// Hàm hỗ trợ lấy array từ object lồng nhau
const getNestedArray = (translations: Translations, key: string): string[] => {
  const result = key.split('.').reduce((obj: any, k) => {
    if (typeof obj === 'object' && obj !== null && k in obj) {
      return obj[k];
    }
    return undefined;
  }, translations as Translations);
  
  return Array.isArray(result) ? result : [];
};

// Export the translation function that takes language as a parameter
export const getTranslation = (lang: LangCodes) => (key: string) => {
  const translations = langConfig.langsApp[lang] || {};
  return getNestedTranslation(translations, key);
};

// Export the array translation function
export const getArrayTranslation = (lang: LangCodes) => (key: string) => {
  const translations = langConfig.langsApp[lang] || {};
  return getNestedArray(translations, key);
};

// Re-export useLang and LangProvider
export { useLang, LangProvider };