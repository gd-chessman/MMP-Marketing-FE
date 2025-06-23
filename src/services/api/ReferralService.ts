import axiosClient from "@/utils/axiosClient";

export const getReferralStatistics = async () => {
  try {
    const response = await axiosClient.get('/referral-rewards/statistics');
    return response.data;
  } catch (error) {
    throw error;
  }
};

