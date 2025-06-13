import axiosClient from "@/utils/axiosClient";

export const createSwapOrder = async (input_token: string, input_amount: number) => {
    try {
        const temp = await axiosClient.post(`/swap-orders`, { input_token, input_amount },);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const gerSolPrice = async () => {
    try {
        const temp = await axiosClient.get(`/swap-orders/sol-price`);
        return temp.data;
    } catch (e) {
        throw e;
    }
}
