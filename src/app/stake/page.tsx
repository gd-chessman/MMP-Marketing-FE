"use client"

import { useState } from "react"
import StakeList from "./stake-list"
import DepositPanel from "./deposit-panel"
import TabNavigation from "./tab-navigation"

export default function StakingDashboard() {
    const [activeTab, setActiveTab] = useState<"stake-list" | "withdrawals" | "interest-rates">("stake-list")

    return (
        <div className="h-full flex items-center justify-center p-4 z-20">
            <div className="container mx-auto px-4 py-6 text-white">
                <div className="flex gap-6 mt-8">
                    <div className="flex-1">
                        <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20">
                            <h2 className="bg-gradient-purple-cyan bg-clip-text text-3xl font-bold leading-7 kati-font text-center mb-8">Current Stake</h2>
                            <StakeList />
                        </div>
                    </div>

                    <div className="min-w-[450px]">
                        <DepositPanel />
                    </div>
                </div>

                {/* <div className="mt-8">
                    <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
                </div> */}
            </div>
        </div>
    )
}
