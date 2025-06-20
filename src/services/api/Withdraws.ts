import axiosClient from "@/utils/axiosClient";

export const createWithdraw = async (type: string, amount: number, symbol: string, to_address: string) => {
    try {
        const temp = await axiosClient.post(`/deposit-withdraws`, { type, amount, symbol, to_address },);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const getWithdraws = async () => {
    try {
        const temp = await axiosClient.get(`/deposit-withdraws`);
        return temp.data;
    } catch (e) {
        throw e;
    }
}
