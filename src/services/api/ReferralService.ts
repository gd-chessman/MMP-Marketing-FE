import axiosClient from "@/utils/axiosClient";

export const getReferralStatistics = async () => {
  try {
    const response = await axiosClient.get('/referral-rewards/statistics');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getHistoryReferral = async () => {
  try {
    const response = await axiosClient.get('/referral-rewards');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReferralDetail = async (walletAddress: string) => {
  try {
    const response = await axiosClient.get(`/referral-rewards/by-address/${walletAddress}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

