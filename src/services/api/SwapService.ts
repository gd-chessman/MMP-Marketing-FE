import axiosClient from "@/utils/axiosClient";

export const createSwapOrder = async (input_token: string, input_amount: number, output_token: string) => {
    try {
        const temp = await axiosClient.post(`/swap-orders`, { input_token, input_amount, output_token },);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const getSwapOrder = async () => {
    try {
        const temp = await axiosClient.get(`/swap-orders`);
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
