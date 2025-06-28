"use client"

import { useState, useEffect, useMemo } from "react"
import { Check, ChevronDown, Copy, ExternalLink } from "lucide-react"
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
import { ProtectedRoute } from "@/components/ProtectedRoute";

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
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

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

    const isDisabled = useMemo(() => {
        const numAmount = parseFloat(amount);
        const tokenBalance = getTokenBalance(sellToken.symbol);
        const hasValidAmount = numAmount > 0 && numAmount <= tokenBalance;
        const hasValidRecipient = recipientWallet.length > 0;
        
        return {
            input: isSending,
            send: isSending || !hasValidAmount || !hasValidRecipient || !!error || !!recipientError,
        };
    }, [isSending, amount, recipientWallet, error, recipientError, sellToken.symbol, balances]);

    useEffect(() => {
        const numValue = parseFloat(amount);
        if (!amount || isNaN(numValue) || numValue <= 0) {
            setError("");
            return;
        }

        const minUsdValue = 10;
        const tokenBalance = getTokenBalance(sellToken.symbol);

        // Check if amount exceeds balance
        if (numValue > tokenBalance) {
            setError(t('withdraw_page.insufficient_balance'));
            return;
        }

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
        // Reset previous errors
        setRecipientError("");
        setError("");
        
        let hasError = false;
        
        // Validate recipient wallet
        if (recipientWallet.length === 0) {
            setRecipientError(t('universal_account.recipient_address_required'));
            hasError = true;
        }
        
        // Validate amount
        const numAmount = Number(amount);
        if (numAmount <= 0) {
            setError(t('universal_account.amount_must_be_positive'));
            hasError = true;
        }
        
        // Check if amount exceeds balance
        const tokenBalance = getTokenBalance(sellToken.symbol);
        if (numAmount > tokenBalance) {
            setError(t('withdraw_page.insufficient_balance'));
            hasError = true;
        }
        
        // If no errors, proceed with withdrawal
        if (!hasError) {
            handleSend();
        }
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
            const errorMessage = t('withdraw_page.withdraw_failed');
            notify({ message: errorMessage, type: 'error' });
        } finally {
            setIsSending(false);
        }
    };

    const toggleRowExpansion = (rowId: number) => {
        setExpandedRow(expandedRow === rowId ? null : rowId);
    };

    console.log("balances", balances)

    return (
        <ProtectedRoute>
            <div className="flex-1 flex flex-col gap-4 sm:gap-6 justify-center h-full relative z-40 container lg:mx-auto px-4 sm:px-6">
                {/* Amount Input */}
                <div className="flex flex-col justify-center items-center lg:gap-6 gap-3 sm:gap-10 container mx-auto">
                    <div className="flex flex-col gap-4 w-full items-center justify-center">
                    <div className={`p-[1px] rounded-xl bg-gradient-to-t from-theme-purple-100 to-theme-gradient-linear-end w-full max-w-[650px] group hover:from-theme-purple-200 hover:to-theme-gradient-linear-end transition-all duration-300 ${isDisabled.input ? ' cursor-not-allowed' : ''
                        }`}>
                        <div className="bg-black/50 border border-theme-gradient-linear-start p-3 sm:p-4 lg:p-6 rounded-xl group-hover:border-theme-purple-200 transition-all duration-300 ">
                            <div className="w-full flex flex-col gap-3 sm:gap-4">
                                <div className="text-center mb-1 text-neutral">
                                    <p className="text-xs sm:text-sm text-neutral transition-colors duration-300">
                                        {t('withdraw_page.enter_amount_to_send')}
                                    </p>
                                </div>
                                <div className="text-center flex items-center justify-center mb-2 ml-[10%] relative">
                                    <input
                                        type="text"
                                        inputMode="decimal"
                                        value={amount}
                                        onChange={handleAmountChange}
                                        disabled={isDisabled.input}
                                        className={`bg-transparent border-none text-center text-2xl sm:text-3xl max-w-[150px] sm:max-w-[250px] font-bold w-full focus:outline-none text-neutral transition-colors duration-300 ${error ? 'text-red-500' : 'group-hover:text-white'
                                            } ${isDisabled.input ? 'cursor-not-allowed ' : ''}`}
                                    />
                                    <button className="px-4 py-[2px] rounded-full text-xs bg-gray-600 cursor-pointer text-neutral border-none" onClick={() => setAmount(getTokenBalance(sellToken.symbol).toString())}>{t('swap.max')}</button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild className="bg-transparent border-none text-xs lg:text-sm text-neutral cursor-pointer py-1 lg:py-2 absolute right-0 top-0">
                                            <button className="flex items-center gap-1 lg:gap-2 text-[#fcfcfc] hover:text-[#9747ff] transition-colors min-h-[32px] min-w-[32px]"
                                                disabled={isDisabled.input}
                                            >
                                                <div
                                                    className={`w-5 h-5 lg:w-6 lg:h-6 rounded-full flex items-center justify-center text-xs`}
                                                >
                                                    <img src={sellToken.icon} alt={sellToken.name} width={20} height={20} className="lg:w-5 lg:h-5" />
                                                </div>
                                                <span className="font-medium text-xs lg:text-sm hidden sm:block">{sellToken.symbol}</span>
                                                <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="bg-dark-100 border-[#d7d7d7]/20 max-w-[150px] p-0">
                                            {tokens.map((token) => (
                                                <DropdownMenuItem
                                                    key={`${token.symbol}-${token.name}`}
                                                    onClick={() => { setSellToken(token); setAmount("0") }}
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
                                <div className="text-center text-xs text-neutral mb-1 transition-colors duration-300">
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
                    <div className="w-full max-w-[650px]">
                        <label htmlFor="name" className={"block text-xs sm:text-sm font-normal dark:text-neutral-100 text-black mb-2"}>
                            {t('withdraw_page.recipient_wallet_address')} <span className="text-red-500">*</span>
                        </label>
                        <div className={`p-[1px] rounded-xl bg-gradient-to-t from-theme-purple-100 to-theme-gradient-linear-end w-full group hover:from-theme-purple-200 hover:to-theme-gradient-linear-end transition-all duration-300 ${isDisabled.input ? ' cursor-not-allowed' : ''}`}>
                            <div className="bg-black/60 dark:bg-theme-black-200 border-none rounded-xl group-hover:border-theme-purple-200 transition-all duration-300">
                                <input
                                    type="text"
                                    value={recipientWallet}
                                    onChange={(e) => setRecipientWallet(e.target.value)}
                                    disabled={isDisabled.input}
                                    className="w-full bg-transparent pl-3 sm:pl-5 h-10 border-none text-neutral placeholder:text-neutral/80 placeholder:text-xs rounded-xl text-xs sm:text-sm font-normal focus:outline-none transition-colors duration-300"
                                    placeholder={t('withdraw_page.enter_recipient_wallet_address')}
                                />
                            </div>
                            {recipientError ? (
                                <div className="text-xs text-red-500 mt-1 pl-3">
                                    {recipientError}
                                </div>
                            ) : (
                                <div className="text-xs mt-1 pl-3 w-full h-4 bg-transparent" />
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="w-full bg-black/40 rounded-xl  py-4 px-8 border border-white/10">
                            <div className="flex flex-col gap-2">
                                <span className="text-xs text-neutral/80">{t('withdraw_page.withdraw_fee_description')} </span>
                                <div className="flex items-center justify-between text-xs text-neutral/80">
                                    <span>{t('withdraw_page.minimum_withdrawal')}: &ensp;</span>
                                    <span className="text-green-400 font-medium">$10</span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-neutral/80">
                                    <span>{t('withdraw_page.transaction_fee')}: &ensp;</span>
                                    <span className="text-red-400 font-medium">$1</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Send Button */}
                    <button
                        onClick={() => handleSubmit()}
                        className={`border-none max-w-[250px] inline-flex items-center justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-neutral hover:bg-primary/90 h-10 px-4 min-w-[150px] bg-gradient-violet-blue cursor-pointer rounded-full font-bold py-2 lg:py-3 text-sm lg:text-base kati-font transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 active:scale-95`}
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
                    </div>

                    {/* Transaction History */}
                    <div className="rounded-xl mt-0 max-w-[1200px] w-full pb-4">
                        <h3 className="text-sm sm:text-base font-semibold text-neutral mb-4 px-2">
                            {t('withdraw_page.transaction_history')}
                        </h3>
                        
                        {/* Mobile Card Layout */}
                        <div className="block lg:hidden space-y-3">
                            {isLoadingWithdraws ? (
                                <div className="bg-black/60 rounded-xl p-6 text-center text-gray-400">
                                    {t('withdraw_page.loading')}
                                </div>
                            ) : withdraws?.data && withdraws.data.length > 0 ? (
                                withdraws.data.map((w: any, index: number) => (
                                    <div key={w.id} className="bg-black/60 rounded-xl p-4 border border-white/10">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs text-neutral/70">{formatDateTime(w.created_at)}</span>
                                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                                        w.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                                        w.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                                        'bg-red-500/20 text-red-400'
                                                    }`}>
                                                        {t(`withdraw_page.table.${w.status}`)}
                                                    </span>
                                                </div>
                                                <span className="text-xs text-neutral/70 mt-1">
                                                    {t(`withdraw_page.table.${w.type}`)} : &ensp;
                                                </span>
                                                <span className="text-sm font-medium text-primary-light">
                                                    {Number(w.amount).toFixed(4)} {w.symbol}
                                                </span>
                                               
                                            </div>
                                            <button
                                                onClick={() => toggleRowExpansion(index)}
                                                className="text-neutral/70 hover:text-neutral transition-colors bg-transparent border-none"
                                            >
                                                <ChevronDown className={`w-4 h-4 transition-transform ${expandedRow === index ? 'rotate-180' : ''}`} />
                                            </button>
                                        </div>
                                        
                                        {expandedRow === index && (
                                            <div className="border-t border-white/10 pt-1 space-y-2">
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-neutral/70">{t('withdraw_page.table.from_address')}:</span>
                                                    <span className="text-neutral font-mono">{truncateString(w.from_address, 12)}</span>
                                                </div>
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-neutral/70">{t('withdraw_page.table.to_address')}:</span>
                                                    <span className="text-neutral font-mono">{truncateString(w.to_address, 12)}</span>
                                                </div>
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-neutral/70">{t('withdraw_page.table.tx_id')}:</span>
                                                    <span className="text-neutral font-mono">{truncateString(w.tx_hash, 12)}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="bg-black/60 rounded-xl p-6 text-center text-gray-400">
                                    {t('withdraw_page.no_withdrawal_history')}
                                </div>
                            )}
                        </div>

                        {/* Desktop Table Layout */}
                        <div className="hidden lg:block">
                            <Table className="w-full bg-black/60 rounded-xl">
                                <TableHeader>
                                    <TableRow className="rounded-xl border-b border-white border-solid">
                                        <TableHead className="py-3 px-6 text-xs font-medium dark:text-gray-400 text-black border-b border-solid border-white border-t-0 border-x-0">{t('withdraw_page.table.time')}</TableHead>
                                        <TableHead className="py-3 px-4 text-xs font-medium dark:text-gray-400 text-black border-b border-solid border-white border-t-0 border-x-0">{t('withdraw_page.table.type')}</TableHead>
                                        <TableHead className="py-3 px-3 text-xs font-medium dark:text-gray-400 text-black border-b border-solid border-white border-t-0 border-x-0">{t('withdraw_page.table.status')}</TableHead>
                                        <TableHead className="py-3 px-6 text-xs font-medium dark:text-gray-400 text-black border-b border-solid border-white border-t-0 border-x-0">{t('withdraw_page.table.amount')}</TableHead>
                                        <TableHead className="py-3 px-6 text-xs font-medium dark:text-gray-400 text-black border-b border-solid border-white border-t-0 border-x-0">{t('withdraw_page.table.from_address')}</TableHead>
                                        <TableHead className="py-3 px-6 text-xs font-medium dark:text-gray-400 text-black border-b border-solid border-white border-t-0 border-x-0">{t('withdraw_page.table.to_address')}</TableHead>
                                        <TableHead className="py-3 px-6 text-xs font-medium dark:text-gray-400 text-black border-b border-solid border-white border-t-0 border-x-0">{t('withdraw_page.table.tx_id')}</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {isLoadingWithdraws ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="py-8 text-center text-gray-400">
                                                {t('withdraw_page.loading')}
                                            </TableCell>
                                        </TableRow>
                                    ) : withdraws?.data && withdraws.data.length > 0 ? (
                                        withdraws.data.map((w: any) => (
                                            <TableRow key={w.id} className="border-b border-white/20 hover:bg-white/5 transition-colors">
                                                <TableCell className="py-3 px-6 text-neutral text-xs">{formatDateTime(w.created_at)}</TableCell>
                                                <TableCell className="py-3 px-4 text-neutral text-xs">{t(`withdraw_page.table.${w.type}`)}</TableCell>
                                                <TableCell className="py-3 px-3 text-neutral text-xs">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                                        w.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                                        w.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                                        'bg-red-500/20 text-red-400'
                                                    }`}>
                                                        {t(`withdraw_page.table.${w.status}`)}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="py-3 px-6 text-neutral text-xs font-medium">{Number(w.amount).toFixed(4)} {w.symbol}</TableCell>
                                                <TableCell className="py-3 px-6 text-neutral text-xs font-mono">{truncateString(w.from_address, 10)}</TableCell>
                                                <TableCell className="py-3 px-6 text-neutral text-xs font-mono">{truncateString(w.to_address, 10)}</TableCell>
                                                <TableCell className="py-3 px-6 text-neutral text-xs font-mono">{truncateString(w.tx_hash, 10)}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7} className="py-8 text-center text-gray-400">
                                                {t('withdraw_page.no_withdrawal_history')}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}
