import axiosClient from "@/utils/axiosClient";
import { createLocalizedError, SERVICE_ERROR_KEYS } from '@/utils/errorMessages';
import { getCurrentLang } from '@/utils/getCurrentLang';

export const login = async ({ signature, public_key, message }: { signature: number[], public_key: string, message: string }) => {
    try {
        const temp = await axiosClient.post(`/auth/login-phantom`, { signature, public_key, message },);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const getPhantomWallet = async () => {
    try {
        const temp = await axiosClient.get(`/wallets/me`);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

// Helper function to check if Phantom wallet is installed
export const isPhantomInstalled = () => {
    if (typeof window === 'undefined') {
        return false;
    }
    return 'solana' in window && window.solana?.isPhantom;
};

// Helper function to connect to Phantom wallet
export const connectPhantomWallet = async () => {
    if (!isPhantomInstalled()) {
        const currentLang = getCurrentLang();
        throw createLocalizedError(currentLang, SERVICE_ERROR_KEYS.PHANTOM_NOT_INSTALLED_WITH_LINK);
    }

    try {
        const response = await window.solana!.connect();
        return response.publicKey.toString();
    } catch (error: any) {
        const currentLang = getCurrentLang();
        if (error.code === 4001) {
            throw createLocalizedError(currentLang, SERVICE_ERROR_KEYS.PHANTOM_CONNECTION_REJECTED);
        }
        throw createLocalizedError(currentLang, SERVICE_ERROR_KEYS.PHANTOM_CONNECTION_FAILED, 'Failed to connect to Phantom wallet: ' + (error.message || 'Unknown error'));
    }
};

// Helper function to sign a message with Phantom wallet
export const signMessageWithPhantom = async (message: string) => {
    if (!isPhantomInstalled()) {
        const currentLang = getCurrentLang();
        throw createLocalizedError(currentLang, SERVICE_ERROR_KEYS.PHANTOM_NOT_INSTALLED_WITH_LINK);
    }

    if (!window.solana!.publicKey) {
        const currentLang = getCurrentLang();
        throw createLocalizedError(currentLang, SERVICE_ERROR_KEYS.PHANTOM_NOT_CONNECTED);
    }

    try {
        const encodedMessage = new TextEncoder().encode(message);
        const signedMessage = await window.solana!.signMessage(encodedMessage, 'utf8');
        return {
            signature: Array.from(signedMessage.signature)
        };
    } catch (error: any) {
        const currentLang = getCurrentLang();
        if (error.code === 4001) {
            throw createLocalizedError(currentLang, SERVICE_ERROR_KEYS.PHANTOM_SIGNATURE_REJECTED);
        }
        throw createLocalizedError(currentLang, SERVICE_ERROR_KEYS.PHANTOM_SIGNATURE_FAILED, 'Failed to sign message with Phantom wallet: ' + (error.message || 'Unknown error'));
    }
};

// Helper function to disconnect from Phantom wallet
export const disconnectPhantomWallet = async () => {
    if (isPhantomInstalled() && window.solana!.publicKey) {
        try {
            await window.solana!.disconnect();
        } catch (error) {
            console.error('Failed to disconnect from Phantom wallet:', error);
        }
    }
};

