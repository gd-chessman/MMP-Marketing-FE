'use client';
import { useContext, useMemo } from 'react';
import { LangContext } from './LangProvider';
import { getTranslation, LangCodes } from './index';

export const useLang = () => {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error('useLang must be used within a LangProvider');
  }
  
  const translation = useMemo(() => getTranslation(context.lang as LangCodes), [context.lang]);
  
  return {
    ...context,
    t: translation
  };
};