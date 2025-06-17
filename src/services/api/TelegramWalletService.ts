import axiosClient from "@/utils/axiosClient";
import { createLocalizedError, SERVICE_ERROR_KEYS } from '@/utils/errorMessages';
import { getCurrentLang } from '@/utils/getCurrentLang';

export const login = async (item: any) => {
    try {
        const temp = await axiosClient.post(`/auth/login-telegram`, item,);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const getmyWallet = async () => {
    try {
        const temp = await axiosClient.get(`/wallets/me`);
        return temp.data;
    } catch (e) {
        console.log(e)
        const currentLang = getCurrentLang();
        throw createLocalizedError(currentLang, SERVICE_ERROR_KEYS.ERROR_GET_MY_WALLET);
    }
}

export const logout = async () => {
    try {
        const temp = await axiosClient.post(`/auth/logout`);
        return temp.data;
    } catch (e) {
        throw e;
    }
}