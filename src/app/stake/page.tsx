"use client"

import { useState } from "react"
import StakeList from "./stake-list"
import DepositPanel from "./deposit-panel"
import TabNavigation from "./tab-navigation"

export default function StakingDashboard() {
    const [activeTab, setActiveTab] = useState<"stake-list" | "withdrawals" | "interest-rates">("stake-list")

    return (
        <div className="h-full flex items-center justify-center p-4 z-20">
            <div className="w-full px-4 py-6 h-full text-white">
                <div className="flex gap-6 mt-8">
                    <div className="flex-1">
                        <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20">
                            <h2 className="bg-gradient-purple-cyan bg-clip-text text-3xl font-bold leading-7 kati-font text-center mb-8">Current Stake</h2>
                            <StakeList />
                        </div>
                    </div>

                    <div className="min-w-[450px] flex flex-col gap-6">
                        <DepositPanel />
                        <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20">
                            <h2 className="bg-gradient-purple-cyan bg-clip-text text-3xl font-bold leading-7 kati-font text-center mb-8">Total MMP Staked</h2>
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-neutral">Total MMP Staked</p>
                                    <p className="text-sm text-neutral">2 MMP</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 
                <div className="mt-8">
                    <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
                </div> */}
                <div className="flex gap-6 mt-8">
                    <div className="bg-gradient-purple-cyan-0deg rounded-xl p-4 flex flex-col gap-2">
                        <h4 className="text-lg kati-font font-medium">Friend Referral Bonus:</h4>
                        <span className="text-sm text-neutral">Users who introduce friends to stake will earn an additional 5-10% of the referred user’s rewards. This approach expands the user network and promotes community engagement.</span>
                    </div>
                    <div className="bg-gradient-purple-cyan-0deg rounded-xl p-4 flex flex-col gap-2">
                        <h4 className="text-lg kati-font font-medium">Friend Referral Bonus:</h4>
                        <span className="text-sm text-neutral">Users who introduce friends to stake will earn an additional 5-10% of the referred user’s rewards. This approach expands the user network and promotes community engagement.</span>
                    </div>
                    <div className="bg-gradient-purple-cyan-0deg rounded-xl p-4 flex flex-col gap-2">
                        <h4 className="text-lg kati-font font-medium">Friend Referral Bonus:</h4>
                        <span className="text-sm text-neutral">Users who introduce friends to stake will earn an additional 5-10% of the referred user’s rewards. This approach expands the user network and promotes community engagement.</span>
                    </div>
                    <div className="bg-gradient-purple-cyan-0deg rounded-xl p-4 flex flex-col gap-2 ">
                        <h4 className="text-lg kati-font font-medium">Friend Referral Bonus:</h4>
                        <span className="text-sm text-neutral">Users who introduce friends to stake will earn an additional 5-10% of the referred user’s rewards. This approach expands the user network and promotes community engagement.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
