import axiosClient from "@/utils/axiosClient";
import { createLocalizedError, SERVICE_ERROR_KEYS } from '@/utils/errorMessages';
import { getCurrentLang } from '@/utils/getCurrentLang';

export const login = async (item: any) => {
    try {
        const temp = await axiosClient.post(`/auth/login-email`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const getGoogleUserInfo = async () => {
    try {
        const temp = await axiosClient.get(`/auth/google-user-info`);
        return temp.data;
    } catch (e) {
        console.log(e)
        const currentLang = getCurrentLang();
        throw createLocalizedError(currentLang, SERVICE_ERROR_KEYS.ERROR_GET_GOOGLE_USER_INFO);
    }
} 