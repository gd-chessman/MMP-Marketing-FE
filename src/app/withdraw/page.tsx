"use client"

import { useState, useEffect, useMemo } from "react"
import { Check, ChevronDown, Copy } from "lucide-react"
import { toast } from 'react-toastify'
import React from "react";
import { truncateString, formatDateTime } from "@/utils/format";
import { useLang } from "@/lang/useLang";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/dropdown-menu"
import { useWsWalletBalance } from "@/hooks/useWsWalletBalance";
import { SwapService, TelegramWalletService } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { createWithdraw, getWithdraws } from "@/services/api/Withdraws";
import notify from "@/components/notify";

const tokens = [
    { symbol: "SOL", name: "Solana", color: "bg-green-500", icon: "/solana.png" },
    { symbol: "USDT", name: "Tether", color: "bg-green-600", icon: "/USDT.png" },
    { symbol: "USDC", name: "USDC", color: "bg-blue-500", icon: "/USDC.png" },
    { symbol: "MMP", name: "MMP", color: "bg-green-500", icon: "/mmp.png" },
    { symbol: "MPB", name: "MP", color: "bg-green-600", icon: "/mpb.png" },
]

export default function WithdrawWallet() {
    const { t } = useLang();
    const [amount, setAmount] = useState<string>("0")
    const [recipientWallet, setRecipientWallet] = useState<string>("")
    const [isSending, setIsSending] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [recipientError, setRecipientError] = useState<string>("")
    const [copied, setCopied] = useState(false);
    const [sellToken, setSellToken] = useState(tokens[0])

    const isDisabled = useMemo(() => ({
        input: isSending,
        send: isSending || !amount || parseFloat(amount) <= 0 || !!error || !!recipientError,
    }), [isSending, amount, error, recipientError]);

    const { data: myWallet, refetch: refetchMyWallet } = useQuery({
        queryKey: ['myWallet'],
        queryFn: () => TelegramWalletService.getmyWallet(),
    })

    const { data: withdraws, isLoading: isLoadingWithdraws, refetch: refetchWithdraws } = useQuery({
        queryKey: ['withdraws'],
        queryFn: () => getWithdraws(),
    })

    const { data: solPrice } = useQuery({
        queryKey: ['solPrice'],
        queryFn: () => SwapService.gerSolPrice(),
      })

    console.log("withdraws", withdraws)

    const { balances, isConnected, error: errorBalance } = useWsWalletBalance(myWallet?.sol_address);

    const getTokenBalance = (tokenSymbol: string) => {
        if (!balances) return 0;

        switch (tokenSymbol) {
            case "SOL":
                return balances.sol || 0;
            case "USDT":
                return balances.usdt || 0;
            case "USDC":
                return balances.usdc || 0;
            case "MMP":
                return balances.mmp || 0;
            case "MPB":
                return balances.mpb || 0;
            default:
                return 0;
        }
    };

    useEffect(() => {
        const numValue = parseFloat(amount);
        if (!amount || isNaN(numValue) || numValue <= 0) {
            setError("");
            return;
        }

        const minUsdValue = 0.1;

        switch (sellToken.symbol) {
            case 'USDT':
            case 'USDC':
                if (numValue != 0 && numValue < minUsdValue) {
                    const message = t('universal_account.minimum_withdrawal_amount').replace('{amount}', `${minUsdValue} ${sellToken.symbol}`);
                    setError(message);
                } else {
                    setError("");
                }
                break;
            case 'SOL':
                if (solPrice?.price_usd) {
                    const minSolAmount = minUsdValue / solPrice.price_usd;
                    console.log("minSolAmount", minSolAmount)
                    if (numValue != 0 && numValue < minSolAmount) {
                        const message = t('universal_account.minimum_withdrawal_amount_in_usd')
                            .replace('{amount}', (Math.ceil(minSolAmount * 100000) / 100000).toFixed(5))
                            .replace('{symbol}', sellToken.symbol)
                            .replace('{usd_value}', minUsdValue.toString());
                        setError(message);
                    } else {
                        setError("");
                    }
                } else {
                    setError("");
                }
                break;
            default:
                setError("");
                break;
        }

    }, [amount, sellToken, solPrice, t, balances]);

    useEffect(() => {
        if (recipientWallet?.length > 0) {
            setRecipientError("");
        }
    }, [recipientWallet]);
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value) || value === '') {
            setAmount(value);
        }
    };

    const handleSubmit = () => {
        if (recipientWallet.length === 0) {
            setRecipientError(t('universal_account.recipient_address_required'));
        }
        if (Number(amount) <= 0) {
            setError(t('universal_account.amount_must_be_positive'));
        }
        if(Number(amount) > 0 && recipientError.length !== 0){
            handleSend();
        }
        return;
    }
    const handleSend = async () => {
        if (isDisabled.send) return;
        setIsSending(true);
        try {
            const res = await createWithdraw("withdraw", Number(amount), sellToken.symbol, recipientWallet);
            notify({ message: t('withdraw_page.withdraw_successful'), type: 'success' });
            // Reset form or update UI as needed
            setAmount("0");
            setRecipientWallet("");
            refetchMyWallet();
            refetchWithdraws(); // Refetch wallet balance after successful withdrawal
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || t('withdraw_page.withdraw_failed');
            notify({ message: errorMessage, type: 'error' });
        } finally {
            setIsSending(false);
        }
    };

    console.log("balances", balances)

    return (
        <div className="flex-1 flex flex-col gap-6 justify-center h-full relative z-40">
            {/* Amount Input */}
            <div className="flex flex-col justify-center items-center gap-10 container mx-auto ">
                <div className={`p-[1px] rounded-xl bg-gradient-to-t from-theme-purple-100 to-theme-gradient-linear-end w-full max-w-[650px] group hover:from-theme-purple-200 hover:to-theme-gradient-linear-end transition-all duration-300 ${isDisabled.input ? ' cursor-not-allowed' : ''
                    }`}>
                    <div className="bg-black/50 border border-theme-gradient-linear-start p-4 sm:p-6 rounded-xl group-hover:border-theme-purple-200 transition-all duration-300 ">
                        <div className="w-full flex flex-col gap-4">
                            <div className="text-center mb-1 text-neutral">
                                <p className="text-sm text-neutral transition-colors duration-300">
                                    {t('withdraw_page.enter_amount_to_send')}
                                </p>
                            </div>
                            <div className="text-center flex items-center justify-center mb-2 relative">
                                <input
                                    type="text"
                                    inputMode="decimal"
                                    value={amount}
                                    onChange={handleAmountChange}
                                    disabled={isDisabled.input}
                                    className={`bg-transparent border-none text-center text-3xl max-w-[250px] font-bold w-full focus:outline-none text-neutral transition-colors duration-300 ${error ? 'text-red-500' : 'group-hover:text-white'
                                        } ${isDisabled.input ? 'cursor-not-allowed ' : ''}`}
                                />
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild className="bg-transparent border-none text-xs lg:text-sm text-neutral cursor-pointer py-1 lg:py-2 absolute right-0 top-0">
                                        <button className="flex items-center gap-1 lg:gap-2 text-[#fcfcfc] hover:text-[#9747ff] transition-colors"
                                            disabled={isDisabled.input}
                                        >
                                            <div
                                                className={`w-5 h-5 lg:w-6 lg:h-6 rounded-full flex items-center justify-center text-xs`}
                                            >
                                                <img src={sellToken.icon} alt={sellToken.name} width={20} height={20} className="lg:w-5 lg:h-5" />
                                            </div>
                                            <span className="font-medium text-xs lg:text-sm ">{sellToken.symbol}</span>
                                            <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="bg-dark-100 border-[#d7d7d7]/20 max-w-[150px] p-0">
                                        {tokens.map((token) => (
                                            <DropdownMenuItem
                                                key={`${token.symbol}-${token.name}`}
                                                onClick={() => setSellToken(token)}
                                                className="text-[#fcfcfc] hover:bg-[#d7d7d7]/10 focus:bg-[#d7d7d7]/10 w-full p-2 hover:bg-gradient-violet-blue flex items-center gap-3 px-3 cursor-pointer"
                                            >
                                                <div
                                                    className={`w-4 h-5 rounded-full flex items-center justify-center text-xs mr-2`}
                                                >
                                                    <img src={token.icon} alt={token.name} width={24} height={24} />
                                                </div>
                                                <span className="text-xs lg:text-sm ">{token.symbol}</span>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="text-center text-xs text-neutral mb-1  transition-colors duration-300">
                                {t('withdraw_page.available_balance')}: {getTokenBalance(sellToken.symbol)} {sellToken.symbol}
                            </div>
                            {error ? (
                                <div className="text-center text-xs text-red-500 mt-1">
                                    {error}
                                </div>
                            ) : (
                                <div className="text-center text-xs mt-1 pl-3 w-full h-4 bg-transparent" />
                            )}
                        </div>
                    </div>
                </div>

                {/* Recipient Address */}
                <div className="w-full  max-w-[650px]">
                    <label htmlFor="name" className={"block md:text-sm font-normal dark:text-neutral-100 text-black mb-2 text-xs"}>
                        {t('withdraw_page.recipient_wallet_address')} <span className="text-red-500">*</span>
                    </label>
                    <div className={`p-[1px] rounded-xl bg-gradient-to-t from-theme-purple-100 to-theme-gradient-linear-end w-full group hover:from-theme-purple-200 hover:to-theme-gradient-linear-end transition-all duration-300 ${isDisabled.input ? ' cursor-not-allowed' : ''}`}>
                        <div className="bg-black/60 dark:bg-theme-black-200 border-none  rounded-xl group-hover:border-theme-purple-200 transition-all duration-300">
                            <input
                                type="text"
                                value={recipientWallet}
                                onChange={(e) => setRecipientWallet(e.target.value)}
                                disabled={isDisabled.input}
                                className="w-full bg-transparent pl-5 h-10 border-none text-neutral placeholder:text-neutral/80 placeholder:text-xs rounded-xl text-sm font-normal focus:outline-none transition-colors duration-300"
                                placeholder={t('withdraw_page.enter_recipient_wallet_address')}
                            />
                        </div>
                        {recipientError ? (
                            <div className="text-xs text-red-500 mt-1 pl-3">
                                {recipientError}
                            </div>
                        ) : (
                            <div className="text-xs mt-1 pl-3 w-full 4 bg-transparent" />
                        )}
                    </div>
                </div>


                {/* Send Button */}
                <button
                    onClick={() => handleSubmit()}
                    className={`border-none max-w-[250px] inline-flex items-center justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  text-neutral hover:bg-primary/90 h-10 px-4 min-w-[150px] bg-gradient-violet-blue cursor-pointer rounded-full  font-bold py-2 lg:py-3 text-sm lg:text-base kati-font transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 active:scale-95`}
                >
                    {!isSending ? (
                        <span className="flex items-center gap-2">
                            {t('withdraw_page.send')}
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('universal_account.sending')}
                        </span>
                    )}
                </button>
                <div className="rounded-xl mt-10 max-w-[1200px] w-full">
                    <Table className="w-full  bg-black/60 rounded-xl">
                        <TableHeader className="">
                            <TableRow className=" rounded-xl border-b border-white border-solid">
                                <TableHead className="py-2 px-6 text-xs font-medium dark:text-gray-400 text-black border-b border-solid border-white border-t-0 border-x-0">{t('withdraw_page.table.time')}</TableHead>
                                <TableHead className="py-2 px-4 text-xs font-medium dark:text-gray-400 text-black border-b border-solid border-white border-t-0 border-x-0">{t('withdraw_page.table.type')}</TableHead>
                                <TableHead className="py-2 px-3 text-xs font-medium dark:text-gray-400 text-black border-b border-solid border-white border-t-0 border-x-0">{t('withdraw_page.table.status')}</TableHead>
                                <TableHead className="py-2 px-6 text-xs font-medium dark:text-gray-400 text-black border-b border-solid border-white border-t-0 border-x-0">{t('withdraw_page.table.amount')}</TableHead>
                                <TableHead className="py-2 px-6 text-xs font-medium dark:text-gray-400 text-black border-b border-solid border-white border-t-0 border-x-0">{t('withdraw_page.table.from_address')}</TableHead>
                                <TableHead className="py-2 px-6 text-xs font-medium dark:text-gray-400 text-black border-b border-solid border-white border-t-0 border-x-0">{t('withdraw_page.table.to_address')}</TableHead>
                                <TableHead className="py-2 px-6 text-xs font-medium dark:text-gray-400 text-black border-b border-solid border-white border-t-0 border-x-0">{t('withdraw_page.table.tx_id')}</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="">
                            {isLoadingWithdraws ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="py-8 text-center text-gray-400">
                                        {t('withdraw_page.loading')}
                                    </TableCell>
                                </TableRow>
                            ) : withdraws?.data && withdraws.data.length > 0 ? (
                                withdraws.data.map((w: any) => (
                                    <TableRow key={w.id} className="border-b border-white/20">
                                        <TableCell className="py-2 px-6 text-neutral text-xs">{formatDateTime(w.created_at)}</TableCell>
                                        <TableCell className="py-2 px-4 text-neutral text-xs">{t(`withdraw_page.table.${w.type}`)}</TableCell>
                                        <TableCell className="py-2 px-3 text-neutral text-xs">{t(`withdraw_page.table.${w.status}`)}</TableCell>
                                        <TableCell className="py-2 px-6 text-neutral text-xs ">{Number(w.amount).toFixed(4)} {w.symbol}</TableCell>
                                        <TableCell className="py-2 px-6 text-neutral text-xs">{truncateString(w.from_address, 10)}</TableCell>
                                        <TableCell className="py-2 px-6 text-neutral text-xs">{truncateString(w.to_address, 10)}</TableCell>
                                        <TableCell className="py-2 px-6 text-neutral text-xs">{truncateString(w.tx_hash, 10)}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="py-8 text-center  text-gray-400">
                                        {t('withdraw_page.no_withdrawal_history')}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>



        </div>
    )
}
