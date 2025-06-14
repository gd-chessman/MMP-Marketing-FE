import axiosClient from "@/utils/axiosClient";

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
        throw new Error("Error Get My Wallet")
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