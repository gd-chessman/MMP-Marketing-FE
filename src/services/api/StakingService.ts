import axiosClient from "@/utils/axiosClient";

export const getStakingPlans = async () => {
    try {
        const temp = await axiosClient.get(`/staking-plans`);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const getListStaking = async () => {
    try {
        const temp = await axiosClient.get(`/user-stakes`);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const createStaking = async ({ staking_plan_id, amount_staked, lock_months }: { staking_plan_id: number, amount_staked: number, lock_months: number }) => {
    try {
        const temp = await axiosClient.post(`/user-stakes/stake-by-wallet`, {
            staking_plan_id,
            amount_staked,
            lock_months
        });
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const getOverViewStaking = async () => {
    try {
        const temp = await axiosClient.get(`/user-stakes/statistics`);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const createStakingPhantomConfirm = async ({amount_staked, lock_months}: {amount_staked: number, lock_months: number}) => {
    try {
        const temp = await axiosClient.post(`/user-stakes/prepare-stake-transaction`, {
            amount_staked,
            lock_months
        });
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const createStakingPhantomCompleted = async ({signedTransaction, staking_plan_id}: {signedTransaction: string, staking_plan_id: number}) => {
    try {
        const temp = await axiosClient.post(`/user-stakes/execute-stake-transaction`, {
            signedTransaction,
            staking_plan_id
        });
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const createStakingPhantomWithdrawConfirm = async ({staking_plan_id}: {staking_plan_id: number}) => {
    try {
        const temp = await axiosClient.post(`/user-stakes/prepare-unstake-transaction/${staking_plan_id}`);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const createStakingPhantomWithdrawCompleted = async ({signedTransaction, user_stake_id}: {signedTransaction: string, user_stake_id: number}) => {
    try {
        const temp = await axiosClient.post(`/user-stakes/execute-unstake-transaction`, {
            signedTransaction,
            user_stake_id
        });
        return temp.data;
    } catch (e) {
        throw e;
    }
}