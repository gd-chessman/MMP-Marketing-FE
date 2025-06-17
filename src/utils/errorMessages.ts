import { getTranslation, LangCodes } from '@/lang';

// Utility function to get localized error messages
export const getLocalizedErrorMessage = (lang: LangCodes, errorKey: string): string => {
  const t = getTranslation(lang);
  return t(`services.errors.${errorKey}`) || errorKey;
};

// Error message keys for services
export const SERVICE_ERROR_KEYS = {
  PHANTOM_NOT_INSTALLED: 'phantomNotInstalled',
  PHANTOM_NOT_INSTALLED_WITH_LINK: 'phantomNotInstalledWithLink',
  PHANTOM_NOT_CONNECTED: 'phantomNotConnected',
  PHANTOM_CONNECTION_REJECTED: 'phantomConnectionRejected',
  PHANTOM_CONNECTION_FAILED: 'phantomConnectionFailed',
  PHANTOM_SIGNATURE_REJECTED: 'phantomSignatureRejected',
  PHANTOM_SIGNATURE_FAILED: 'phantomSignatureFailed',
  PHANTOM_TRANSACTION_REJECTED: 'phantomTransactionRejected',
  PHANTOM_AUTH_FAILED: 'phantomAuthFailed',
  FAILED_TO_CREATE_TOKEN_ACCOUNT: 'failedToCreateTokenAccount',
  ERROR_GET_MY_WALLET: 'errorGetMyWallet',
  ERROR_GET_GOOGLE_USER_INFO: 'errorGetGoogleUserInfo'
} as const;

// Type for error message keys
export type ServiceErrorKey = typeof SERVICE_ERROR_KEYS[keyof typeof SERVICE_ERROR_KEYS];

// Function to create localized error with fallback
export const createLocalizedError = (lang: LangCodes, errorKey: ServiceErrorKey, fallbackMessage?: string): Error => {
  const localizedMessage = getLocalizedErrorMessage(lang, errorKey);
  return new Error(localizedMessage || fallbackMessage || errorKey);
}; 