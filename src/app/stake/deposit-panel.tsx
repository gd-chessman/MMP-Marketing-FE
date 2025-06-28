"use client"

import { useState, useRef } from "react"
import { Input } from "@/ui/input"
import { Button } from "@/ui/button"
import { Pencil, ChevronDown, ChevronUp } from "lucide-react"
import { createStaking, createStakingPhantomConfirm, getStakingPlans, createStakingPhantomCompleted } from "@/services/api/StakingService"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { TelegramWalletService } from "@/services/api"
import { Web3WalletService } from "@/services/api/Web3WalletService"
import { useWsWalletBalance } from "@/hooks/useWsWalletBalance"
import { useLang } from "@/lang/useLang"
import { useStakingContext } from "@/contexts/StakingContext"
import { toast } from "react-toastify"
import { useAuth } from "@/hooks/useAuth"
import { Transaction } from "@solana/web3.js"

export default function DepositPanel() {
    const [depositAmount, setDepositAmount] = useState<string>("0")
    const [stakeMonths, setStakeMonths] = useState<string>("")
    const [stakeName, setStakeName] = useState<string>("")
    const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false)
    const [selectedStake, setSelectedStake] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const { t } = useLang()
    const queryClient = useQueryClient()
    const { refreshStakingData } = useStakingContext()
    const { loginMethod } = useAuth()
    console.log("depositAmount", depositAmount)
    const { data: stakingPlans } = useQuery({
        queryKey: ["staking-plans"],
        queryFn: getStakingPlans,
    })

    const { data: myWallet, refetch: refetchMyWallet } = useQuery({
        queryKey: ['myWallet'],
        queryFn: () => TelegramWalletService.getmyWallet(),
    })


    const { balances } = useWsWalletBalance(myWallet?.sol_address);
    // Transform stakingPlans to stakeOptions format
    const stakeOptions = stakingPlans ? stakingPlans.map((plan: any) => ({
        value: plan.id,
        label: `${plan.name} (${plan.period_days} days)`,
        period_days: plan.period_days,
        interest_rate: plan.interest_rate,
        name: plan.name
    })) : []

    const handleStakeSelect = (value: string, months: string, name: string) => {
        setSelectedStake(value)
        setStakeMonths(months)
        setStakeName(name)
        setIsSelectOpen(false)
    }

    const handleStake = async () => {
        // Validate required fields first
        if (!selectedStake) {
            toast.error(t("stake.pleaseSelectStakePlan") || "Please select a stake plan")
            return
        }

        if (!depositAmount || Number(depositAmount) <= 0) {
            toast.error(t("stake.pleaseEnterValidAmount") || "Please enter a valid amount")
            return
        }

        // Validate deposit amount format
        const amount = Number(depositAmount)
        if (isNaN(amount) || amount <= 0) {
            toast.error(t("stake.invalidAmount") || "Invalid amount")
            return
        }

        // Check if user has sufficient balance
        const availableBalance = Number(balances?.mmp || 0)
        if (amount > availableBalance) {
            toast.error(t("stake.insufficientBalance")?.replace("{balance}", availableBalance.toString()) || `Insufficient balance. Available: ${availableBalance} MMP`)
            return
        }

        // Check if user has sufficient SOL balance for transaction fees
        const solBalance = Number(balances?.sol || 0)
        if (solBalance < 0.002) {
            toast.error(t("stake.insufficientSolBalance") || "To create a stake, the minimum SOL balance in your wallet should be approximately 0.002 SOL")
            return
        }

        // Validate stake months
        if (!stakeMonths || Number(stakeMonths) <= 0) {
            toast.error(t("stake.invalidStakePeriod") || "Invalid stake period")
            return
        }

        setIsLoading(true)
        try {
            if (loginMethod == "phantom") {
                // Phantom wallet flow
                // Step 1: Prepare transaction
                const prepareResponse = await createStakingPhantomConfirm({
                    amount_staked: amount,
                    lock_months: Number(stakeMonths) / 30
                })

                if (!prepareResponse.transaction) {
                    throw new Error("Failed to prepare transaction")
                }

                // Step 2: Ký transaction và serialize lại
                const serializedSignedTransaction = await Web3WalletService.signTransactionAndSerialize(
                    prepareResponse.transaction
                )

                // Step 3: Gửi transaction đã ký lên backend (cần signedTransaction và staking_plan_id)
                const completedResponse = await createStakingPhantomCompleted({
                    signedTransaction: serializedSignedTransaction,
                    staking_plan_id: Number(selectedStake)
                })
            } else {
                // Regular flow for other login methods
                await createStaking({
                    staking_plan_id: Number(selectedStake),
                    amount_staked: amount,
                    lock_months: Number(stakeMonths) / 30
                })
            }

            // Invalidate và refetch các queries liên quan (React Query)
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["list-staking"] }),
                queryClient.invalidateQueries({ queryKey: ["staking-plans"] }),
                queryClient.invalidateQueries({ queryKey: ["myWallet"] }),
                refetchMyWallet()
            ])

            // Trigger refresh thông qua Context
            refreshStakingData()

            // Reset form
            setDepositAmount("0.00")
            setSelectedStake("")
            setStakeMonths("")
            setStakeName("")

            // Show success message
            toast.success(t("stake.stakeSuccess") || "Stake created successfully!")

        } catch (error) {
            console.error("Error creating staking:", error)

            // Handle specific Phantom wallet errors
            if (loginMethod === "phantom" && error instanceof Error) {
                if (error.message.includes('User rejected') || error.message.includes('User cancelled')) {
                    toast.error(t("services.errors.phantomTransactionRejected") || "Transaction was rejected by user")
                } else if (error.message.includes('Wallet not connected')) {
                    toast.error(t("services.errors.phantomNotConnected") || "Phantom wallet is not connected")
                } else {
                    toast.error(t("stake.stakeError") || "Failed to create stake. Please try again.")
                }
            } else {
                toast.error(t("stake.stakeError") || "Failed to create stake. Please try again.")
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="bg-black/40 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-purple-500/20 flex-1 flex flex-col justify-between">
            <div className="text-center mb-3 ">
                <h2 className="bg-gradient-purple-cyan bg-clip-text text-xl sm:text-2xl lg:text-3xl font-bold leading-7 text-center mb-1 font-tektur">{t("stake.depositMmp")}</h2>
                <h3 className="bg-gradient-purple-cyan bg-clip-text text-xl sm:text-2xl lg:text-2xl font-bold leading-7 font-tektur text-center mb-1">{t("stake.earnContinuously")}</h3>
            </div>

            <div className="flex-1 flex flex-col">
                {/* Available Balance */}
                <p className="text-center text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">
                    {t("stake.availableBalance")} <span className="font-bold text-sm sm:text-base bg-gradient-purple-cyan bg-clip-text">{balances?.mmp} MMP & {balances?.sol} SOL</span>
                </p>

                {/* Deposit Section */}
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    <div
                        className="bg-dark-100 rounded-xl flex justify-start flex-col p-3 border border-gray-700/50 cursor-text"
                        onClick={() => inputRef.current?.focus()}
                    >
                        <div className="flex justify-between"><p className="text-xs sm:text-sm text-gray-400 mb-1">{t("stake.deposit")}</p>
                            <button className="px-4 py-[1px] rounded-full h-[20px] text-xs bg-gray-600 cursor-pointer text-neutral border-none" onClick={() => setDepositAmount(balances?.mmp.toString() || "0")}>Max</button></div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <img src="/mmp.png" alt="MMP" className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                                <div className="text-white font-medium pt-1 text-sm sm:text-base">MMP</div>
                            </div>
                            <div className="text-right">
                                <input
                                    ref={inputRef}
                                    type="number"
                                    min={0}
                                    step="0.01"
                                    className="bg-transparent text-base sm:text-lg px-3 border border-transparent max-w-[200px] border-solid focus:border-2 focus:border-gray-700/50 rounded-xl font-bold text-white outline-none appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-right"
                                    value={depositAmount}
                                    onChange={(e) => {
                                        const value = e.target.value
                                        // Prevent negative values
                                        if (value.startsWith('-')) return
                                        // Allow empty string or valid numbers
                                        if (value === '' || /^\d*\.?\d*$/.test(value)) {
                                            setDepositAmount(value)
                                        }
                                    }}
                                    // onBlur={(e) => {
                                    //     // Format to 2 decimal places on blur
                                    //     const value = Number(e.target.value)
                                    //     if (!isNaN(value) && value >= 0) {
                                    //         setDepositAmount(value.toLocaleString())
                                    //     }
                                    // }}
                                />
                                <p className="text-xs text-gray-400">≈ {(Number(depositAmount) / 1000).toLocaleString()} USD</p>
                            </div>
                        </div>
                    </div>

                    {/* Custom Select */}
                    <div className="relative">
                        <p className="text-xs sm:text-sm text-gray-400 mb-1">{t("stake.depositTerm")}</p>
                        <div className="bg-gradient-purple-cyan rounded-xl p-[1px]">
                            <div
                                className="bg-black rounded-xl px-3 sm:px-4 py-2 cursor-pointer transition-all duration-200 hover:border-gray-600/70"
                                onClick={() => setIsSelectOpen(!isSelectOpen)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-neutral font-medium kati-font text-xs sm:text-sm truncate">
                                            {selectedStake ? stakeName : t("stake.selectStakeMonths")}
                                        </p>
                                    </div>
                                    <div className="text-gray-400 ml-2 flex-shrink-0">
                                        {isSelectOpen ? <ChevronUp size={18} className="sm:w-5 sm:h-5" /> : <ChevronDown size={18} className="sm:w-5 sm:h-5" />}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isSelectOpen && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-black/90 backdrop-blur-xl rounded-xl border border-gray-700/50 z-10 max-h-40 sm:max-h-48 overflow-y-auto">
                                {stakeOptions.map((option) => (
                                    <div
                                        key={option.value}
                                        className="p-2 sm:p-3 cursor-pointer transition-all duration-200 hover:bg-gray-700/30 first:rounded-t-xl last:rounded-b-xl"
                                        onClick={() => handleStakeSelect(option.value, option.period_days, option.name)}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-neutral font-medium kati-font text-xs sm:text-sm truncate">{t(`stake.${option.name}`)}</p>
                                                <p className="text-xs text-cyan-400">{option.period_days} {t("stake.days")}</p>
                                            </div>
                                            <div className="text-right ml-2 flex-shrink-0">
                                                <p className="text-xs sm:text-sm font-medium text-green-500">+{option.interest_rate}%</p>
                                                <p className="text-xs text-gray-400">{t("stake.apy")}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Stake Button */}
            <Button
                onClick={handleStake}
                className="w-full h-10 cursor-pointer bg-gradient-to-r from-purple-600 to-cyan-500 border-none hover:from-purple-700 hover:to-cyan-600 text-white font-bold text-base sm:text-lg rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            // disabled={isLoading || !selectedStake || !depositAmount || Number(depositAmount) <= 0 || Number(depositAmount) > Number(balances?.mmp || 0)}
            >
                {isLoading ? t("stake.stakeProcessing") : t("stake.stake")}
            </Button>
        </div>
    )
}
