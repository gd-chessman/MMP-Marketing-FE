"use client"

import { useState } from "react"
import StakeList from "./stake-list"
import DepositPanel from "./deposit-panel"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { useQuery } from "@tanstack/react-query"
import { getOverViewStaking } from "@/services/api/StakingService"
import { useLang } from "@/lang/useLang"
import { StakingProvider } from "@/contexts/StakingContext"

function StakingDashboardContent() {
    const [activeTab, setActiveTab] = useState<"stake-list" | "withdrawals" | "interest-rates">("stake-list")
    const { t } = useLang()

    const { data: overviewStaking } = useQuery({
        queryKey: ["overview-staking"],
        queryFn: getOverViewStaking,
    })

    return (
        <div className="flex-1 max-h-svh flex items-center justify-center p-2 sm:p-4 z-20">
            <div className="w-full px-2 sm:px-4 py-3 sm:py-6 flex-1 max-h-svh text-white gap-6 flex flex-col container mx-auto">
                {/* Mobile: Single column layout, Desktop: Two column layout */}
                <div className="flex flex-col lg:flex-row gap-3 sm:gap-6">
                    {/* Stake List Section */}
                    <div className="flex-1 order-2 lg:order-1">
                        <div className="bg-black/40 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-blue-500/20 ">
                            <h2 className="bg-gradient-purple-cyan bg-clip-text text-xl sm:text-2xl lg:text-3xl font-bold leading-7 kati-font text-center mb-4 sm:mb-8">{t("stake.currentStake")}</h2>
                            <StakeList />
                        </div>
                    </div>

                    {/* Deposit Panel & Stats Section */}
                    <div className="w-full lg:max-w-[450px] flex flex-col gap-3 sm:gap-6 order-1 lg:order-2">
                        <DepositPanel />
                        
                        {/* Stats Cards - Mobile: Stack vertically, Desktop: Keep current layout */}
                        <div className="flex flex-col gap-3 sm:gap-4">
                            <div className="bg-gradient-navy-purple rounded-xl sm:rounded-2xl py-3 sm:py-4 px-4 sm:px-6 border border-blue-500/20 flex justify-between items-center">
                                <div className="flex flex-col gap-1 sm:gap-[10px]">
                                    <span className="text-white text-sm sm:text-base font-semibold">{t("stake.totalMmpStaked")}</span>
                                    <span className="text-white text-xs font-normal">
                                        {overviewStaking?.total_staked_this_month - overviewStaking?.total_staked_last_month || 0} {t("stake.mmpFromLastMonth")}
                                    </span>
                                </div>
                                <span className="text-neutral text-lg sm:text-xl font-bold">{overviewStaking?.total_staked_mmp || 0} MMP</span>
                            </div>
                            <div className="bg-gradient-navy-purple rounded-xl sm:rounded-2xl py-3 sm:py-4 px-4 sm:px-6 border border-blue-500/20 flex justify-between items-center">
                                <div className="flex flex-col gap-1 sm:gap-[10px]">
                                    <span className="text-white text-sm sm:text-base font-semibold">{t("stake.totalInterestEarned")}</span>
                                    <span className="text-white text-xs font-normal">
                                        +{overviewStaking?.total_claimed_this_month || 0} {t("stake.mmpThisMonth")}
                                    </span>
                                </div>
                                <span className="text-neutral text-lg sm:text-xl font-bold">{overviewStaking?.total_claimed_this_month || 0} MMP</span>
                            </div>
                            <div className="bg-gradient-navy-purple rounded-xl sm:rounded-2xl py-3 sm:py-4 px-4 sm:px-6 border border-blue-500/20 flex justify-between items-center">
                                <div className="flex flex-col gap-1 sm:gap-[10px]">
                                    <span className="text-white text-sm sm:text-base font-semibold">{t("stake.peopleCurrentlyStaking")}</span>
                                    <span className="text-white text-xs font-normal">{t("stake.activeStakers")}</span>
                                </div>
                                <span className="text-neutral text-lg sm:text-xl font-bold">{overviewStaking?.active_stakers_count || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature Cards Section - Mobile: Stack vertically, Desktop: Grid */}
                {/* <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                    <div className="bg-gradient-purple-cyan-0deg rounded-xl py-3 sm:py-4 px-6 sm:px-10 flex-1 flex flex-col gap-2">
                        <h4 className="text-base sm:text-lg kati-font font-medium">{t("stake.friendReferralBonus")}</h4>
                        <span className="text-xs text-neutral">{t("stake.friendReferralDescription")}</span>
                    </div>
                    <div className="bg-gradient-purple-cyan-0deg rounded-xl p-3 sm:p-4 flex-1 flex flex-col gap-2">
                        <h4 className="text-base sm:text-lg kati-font font-medium">{t("stake.stakerLeaderboard")}</h4>
                        <span className="text-xs text-neutral">{t("stake.stakerLeaderboardDescription")}</span>
                    </div>
                    <div className="bg-gradient-purple-cyan-0deg rounded-xl p-3 sm:p-4 flex-1 flex flex-col gap-2">
                        <h4 className="text-base sm:text-lg kati-font font-medium">{t("stake.earlyStakingPromotion")}</h4>
                        <span className="text-xs text-neutral">{t("stake.earlyStakingDescription")}</span>
                    </div>
                    <div className="bg-gradient-purple-cyan-0deg rounded-xl p-3 sm:p-4 flex-1 flex flex-col gap-2">
                        <h4 className="text-base sm:text-lg kati-font font-medium">{t("stake.miniGameLuckySpin")}</h4>
                        <span className="text-xs text-neutral">{t("stake.miniGameDescription")}</span>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default function StakingDashboard() {
    return (
        <ProtectedRoute>
            <StakingProvider>
                <StakingDashboardContent />
            </StakingProvider>
        </ProtectedRoute>
    )
}
