"use client";
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { langConfig as importedLangConfig } from "@/lang";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export interface LangContextProps {
  lang: string;
  setLang: (lang: string) => void;
  langConfig: typeof importedLangConfig;
}

export const LangContext = createContext<LangContextProps | undefined>(undefined);

interface LangProviderProps {
  children: React.ReactNode;
  initialLang?: string; // Nhận giá trị ngôn ngữ từ SSR
  langConfig?: typeof importedLangConfig;
}

export const LangProvider: React.FC<LangProviderProps> = ({ 
  children, 
  initialLang = 'kr', 
  langConfig 
}) => {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useLocalStorage<string>('appLang', initialLang);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = lang;
    }
  }, [lang, mounted]);

  const handleSetLang = useCallback((newLang: string) => {
    setLang(newLang);
  }, [setLang]);

  const config = langConfig || importedLangConfig;

  return (
    <LangContext.Provider value={{ lang, setLang: handleSetLang, langConfig: config }}>
      {children}
    </LangContext.Provider>
  );
};