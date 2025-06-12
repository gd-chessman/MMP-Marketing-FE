import axiosClient from "@/utils/axiosClient";

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
        throw new Error("Error Get Google User Info")
    }
} 