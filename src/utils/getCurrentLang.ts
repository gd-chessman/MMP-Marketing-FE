import { LangCodes } from '@/lang';

// Get current language from localStorage or default to English
export const getCurrentLang = (): LangCodes => {
  if (typeof window !== 'undefined') {
    const storedLang = localStorage.getItem('lang') as LangCodes;
    if (storedLang && ['en', 'vi', 'kr', 'jp'].includes(storedLang)) {
      return storedLang;
    }
  }
  return 'en'; // Default to English
}; 