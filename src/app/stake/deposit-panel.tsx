"use client"

import { useState } from "react"
import { Input } from "@/app/ui/input"
import { Button } from "@/app/ui/button"
import { Pencil, ChevronDown, ChevronUp } from "lucide-react"

export default function DepositPanel() {
    const [depositAmount, setDepositAmount] = useState<string>("0.00")
    const [stakeName, setStakeName] = useState<string>("")
    const [selectedRate, setSelectedRate] = useState<string>("5%")
    const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false)
    const [selectedStake, setSelectedStake] = useState<string>("")

    const rates = [
        { value: "2%", color: "bg-gray-600" },
        { value: "5%", color: "bg-cyan-500" },
        { value: "6%", color: "bg-gray-600" },
        { value: "7%", color: "bg-gray-600" },
    ]

    const stakeOptions = [
        { value: "1", label: "Stake 1" },
        { value: "2", label: "Stake 2" },
        { value: "3", label: "Stake 3" },
    ]

    const handleStakeSelect = (value: string, label: string) => {
        setSelectedStake(value)
        setStakeName(label)
        setIsSelectOpen(false)
    }

    return (
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20  flex-1 flex flex-col justify-between">
            <div className="text-center mb-5">
                <h2 className="bg-gradient-purple-cyan bg-clip-text text-3xl font-bold leading-7 kati-font text-center mb-2">Deposit MMP</h2>
                <h3 className="bg-gradient-purple-cyan bg-clip-text text-3xl font-bold leading-7 kati-font text-center mb-2">Earn Continuously</h3>
            </div>

            <div className="flex-1 flex flex-col">
                {/* Available Balance */}
                <p className="text-center text-gray-300">
                    Available Balance: <span className="font-bold text-white">2 MMP</span>
                </p>

                {/* Deposit Section */}
                <div className="space-y-4 mt-4 mb-6 ">
                    <div className="bg-dark-100 rounded-xl flex justify-start flex-col p-4 border border-gray-700/50 ">
                        <p className="text-sm text-gray-400 mb-1">Deposit</p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <img src="/mmp-logo.png" alt="MMP" className="w-6 h-6 mr-2" />
                                <div className="text-white font-medium pt-1">MMP</div>
                            </div>
                            <div className="text-right">
                                <input type="number" className="bg-transparent text-lg border-none max-w-[100px] font-bold text-white outline-none appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-right" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
                                <p className="text-xs text-gray-400">≈ 0.00 USD</p>
                            </div>
                        </div>
                    </div>

                    {/* Interest Rate Selection */}
                    {/* <div className="grid grid-cols-4 gap-2">
                    {rates.map((rate) => (
                        <Button
                            key={rate.value}
                            variant="outline"
                            className={`h-10 rounded-xl border-gray-600/50 text-white font-medium transition-all duration-200 ${selectedRate === rate.value
                                ? "bg-cyan-500 border-cyan-400 hover:bg-cyan-600"
                                : "bg-black/40 hover:bg-gray-700/50"
                                }`}
                            onClick={() => setSelectedRate(rate.value)}
                        >
                            {rate.value}
                        </Button>
                    ))}
                </div> */}

                    {/* Custom Select */}
                    <div className="relative">
                        <p className="text-sm text-gray-400 mb-1">Deposit Term</p>
                        <div className="bg-gradient-purple-cyan rounded-xl p-[1px] ">
                            <div
                                className="bg-black rounded-xl px-4 py-2 cursor-pointer transition-all duration-200 hover:border-gray-600/70"
                                onClick={() => setIsSelectOpen(!isSelectOpen)}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-neutral font-medium kati-font text-sm">
                                            {selectedStake ? stakeName : "Select Stake Name"}
                                        </p>
                                    </div>
                                    <div className="text-gray-400">
                                        {isSelectOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isSelectOpen && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-black/90 backdrop-blur-xl rounded-xl border border-gray-700/50 z-10 max-h-48 overflow-y-auto">
                                {stakeOptions.map((option) => (
                                    <div
                                        key={option.value}
                                        className="p-3 cursor-pointer transition-all duration-200 hover:bg-gray-700/30 first:rounded-t-xl last:rounded-b-xl"
                                        onClick={() => handleStakeSelect(option.value, option.label)}
                                    >
                                        <p className="text-neutral font-medium kati-font text-sm">{option.label}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Total MMP Stats */}
                    {/* <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl p-4 border border-purple-500/30">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-300 mb-1">Total MMP Deposited</p>
                            <p className="text-lg font-bold text-white">2</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-400">Projected MMP Yield</p>
                            <p className="text-lg font-semibold text-cyan-400">0.12</p>
                        </div>
                    </div>
                </div> */}


                </div>
            </div>
            {/* Stake Button */}
            <Button className="w-full h-12 bg-gradient-to-r  from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white font-bold text-lg rounded-full transition-all duration-300 transform hover:scale-105">
                STAKE
            </Button>
        </div>
    )
}
