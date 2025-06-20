"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Clock, ArrowUpDown, ArrowDown, Users, Shield } from "lucide-react"
import { Button } from "@/ui/button"
import { Card } from "@/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/dropdown-menu"
import { useAuth } from "@/hooks/useAuth"
import { ConnectWalletModal } from "@/components/ConnectWalletModal"
import { useQuery } from "@tanstack/react-query"
import { SwapService, TelegramWalletService } from "@/services/api"
import { createSwapOrder } from "@/services/api/SwapService"
import { Web3WalletService } from "@/services/api/Web3WalletService"
import notify from "@/components/notify"
import { useLang } from "@/lang/useLang"
import { useWsWalletBalance } from "@/hooks/useWsWalletBalance"

const tokens = [
  { symbol: "SOL", name: "Solana", color: "bg-green-500", icon: "/solana.png" },
  { symbol: "USDT", name: "Tether", color: "bg-green-600", icon: "/USDT.png" },
  { symbol: "USDC", name: "USDC", color: "bg-blue-500", icon: "/USDC.png" },
]

const tokenSwap = [
  { symbol: "MMP", name: "MMP", color: "bg-green-500", icon: "/mmp.png" },
  { symbol: "MPB", name: "MP", color: "bg-green-600", icon: "/mpb.png" },
]

export default function SwapInterface() {
  const { t, lang } = useLang()
  const [showHistory, setShowHistory] = useState(false)
  const [sellToken, setSellToken] = useState(tokens[0])
  const [sellTokenSwap, setSellTokenSwap] = useState(tokenSwap[0])
  const [buyToken, setBuyToken] = useState(tokens[1])
  const [sellAmount, setSellAmount] = useState("0")
  const [buyAmount, setBuyAmount] = useState("0.00")
  const [activeTab, setActiveTab] = useState("guild")
  const [showConnectModal, setShowConnectModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isWeb3Swap, setIsWeb3Swap] = useState(false)
  const [web3OrderId, setWeb3OrderId] = useState<number | null>(null)
  const [web3SerializedTx, setWeb3SerializedTx] = useState<string | null>(null)
  const [phantomBalance, setPhantomBalance] = useState<number | null>(null)
  const [activePolicyTab, setActivePolicyTab] = useState("mmp")
  const { isAuthenticated, loginMethod } = useAuth()

  // let gasPriceLanguage;
  // switch (lang) {
  //   case "vi":
  //     gasPriceLanguage = "~10k VNĐ";
  //     break;
  //   case "jp":
  //     gasPriceLanguage = "~58 ¥";
  //     break;
  //   case "kr":
  //     gasPriceLanguage = "~544 KRW";
  //     break;
  //   case "en":
  //     gasPriceLanguage = "~0.4$";
  //     break;
  //   default:
  //     gasPriceLanguage = "~0.4$";
  // }
  const { data: myWallet, refetch: refetchMyWallet } = useQuery({
    queryKey: ['myWallet'],
    queryFn: () => TelegramWalletService.getmyWallet(),
  })

  const { data: solPrice } = useQuery({
    queryKey: ['solPrice'],
    queryFn: () => SwapService.gerSolPrice(),
  })
  console.log("solPrice", solPrice)
  const { data: swapOrderHistory, refetch: refetchSwapOrderHistory } = useQuery({
    queryKey: ['swapOrder'],
    queryFn: () => SwapService.getSwapOrder(),
  })

  const { balances, isConnected, error } = useWsWalletBalance(myWallet?.sol_address);
  console.log(balances);
  console.log("balances", balances);

  // Format swap order history data for display
  const formatSwapHistory = () => {
    if (!swapOrderHistory || !Array.isArray(swapOrderHistory)) return []

    return swapOrderHistory.map(order => ({
      time: new Date(order.created_at).toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      sell: `${Number(order.input_amount).toFixed(6).replace(/\.?0+$/, '')} ${order.input_token}`,
      buy: `${Number(order.mmp_received ?? order.mpb_received).toFixed(4).replace(/\.?0+$/, '')} ${order.output_token ?? "MMP"}`,
      status: order.status,
      swap_rate: order.swap_rate,
      tx_hash_ref: order.tx_hash_ref,
      tx_hash_send: order.tx_hash_send
    }))
  }

  const swapHistoryData = formatSwapHistory();

  // Calculate token price in USD
  const getTokenPriceUSD = () => {
    if (!solPrice) return 0

    switch (sellToken.symbol) {
      case "SOL":
        return solPrice.price_usd || 0
      case "USDT":
      case "USDC":
        return 1 // USDT and USDC are pegged to USD
      default:
        return 0
    }
  }

  // Calculate USD value of sell amount
  const getUSDValue = () => {
    const tokenPrice = getTokenPriceUSD()
    return Number(sellAmount) * tokenPrice
  }

  // Calculate MMP amount based on sell amount and token
  const calculateMMPAmount = () => {
    const usdValue = getUSDValue()
    // 1 MMP = $0.001, so we convert USD value directly to MMP
    const mmpAmount = usdValue / 0.001

    return mmpAmount
  }

  const swapTokens = () => {
    const temp = sellToken
    setSellToken(buyToken)
    setBuyToken(temp)
    const tempAmount = sellAmount
    setSellAmount(buyAmount)
    setBuyAmount(tempAmount)
  }

  const listPolicy = [
    {
      icon: "/ethereum.png",
      title: t("swap.policyContent.seedRound.title"),

    },
    {
      icon: "/ethereum.png",
      title: t("swap.policyContent.communityRewards.title"),
    },
    {
      icon: "/ethereum.png",
      title: t("swap.policyContent.liquidityFund.title"),
    },
    {
      icon: "/ethereum.png",
      title: t("swap.policyContent.marketingPartnership.title"),
    },
    {
      icon: "/ethereum.png",
      title: t("swap.policyContent.operationalCosts.title"),
    },
    {
      icon: "/ethereum.png",
      title: t("swap.policyContent.reserveFund.title"),
    },
    {
      icon: "/ethereum.png",
      title: t("swap.policyContent.goalsLaunch.title"),
      content: t("swap.policyContent.goalsLaunch.content"),
    },
    {
      icon: "/ethereum.png",
      title: t("swap.policyContent.whyChooseMMP.title"),
      content: t("swap.policyContent.whyChooseMMP.content"),
    },
    {
      icon: "/ethereum.png",
      title: t("swap.policyContent.strongGrowth.title"),
      content: t("swap.policyContent.strongGrowth.content"),
    },
    {
      icon: "/ethereum.png",
      title: t("swap.policyContent.beginnerFriendly.title"),
      content: t("swap.policyContent.beginnerFriendly.content"),
    },
    {
      icon: "/ethereum.png",
      title: t("swap.policyContent.investmentBenefits.title"),
      content: t("swap.policyContent.investmentBenefits.content"),
    },
    {
      icon: "/ethereum.png",
      title: t("swap.policyContent.flexibleInvestment.title"),
      content: t("swap.policyContent.flexibleInvestment.content"),
    },
    {
      icon: "/ethereum.png",
      title: t("swap.policyContent.highGrowthPotential.title"),
      content: t("swap.policyContent.highGrowthPotential.content"),
    },
    {
      icon: "/ethereum.png",
      title: t("swap.policyContent.airdropBenefits.title"),
      content: t("swap.policyContent.airdropBenefits.content"),
    },
    {
      icon: "/ethereum.png",
      title: t("swap.policyContent.limitedOpportunity.title"),
      content: t("swap.policyContent.limitedOpportunity.content"),
    },
    {
      icon: "/ethereum.png",
      title: t("swap.policyContent.tokenValueAppreciation.title"),
      content: t("swap.policyContent.tokenValueAppreciation.content"),
    },
    {
      icon: "/ethereum.png",
      title: t("swap.policyContent.mmpInvestmentAdvantage.title"),
      content: t("swap.policyContent.mmpInvestmentAdvantage.content"),
    },
    {
      icon: "/ethereum.png",
      title: t("swap.policyContent.visionConclusion.title"),
      content: t("swap.policyContent.visionConclusion.content"),
    },
    {
      icon: "/ethereum.png",
      title: t("swap.policyContent.callToAction.title"),
    }
  ]

  const listPolicy2 = [
    {
      icon: "/ethereum.png",
      title: t("swap.mpbPolicyContent.projectOverview.title"),
      content: t("swap.mpbPolicyContent.projectOverview.content"),
    },
    {
      icon: "/ethereum.png",
      title: t("swap.mpbPolicyContent.marketPotential.title"),
      content: t("swap.mpbPolicyContent.marketPotential.content"),
    },
    {
      icon: "/ethereum.png",
      title: t("swap.mpbPolicyContent.projectOverview2.title"),
      content: t("swap.mpbPolicyContent.projectOverview2.content"),
    },

    {
      icon: "/ethereum.png",
      title: t("swap.mpbPolicyContent.growthOpportunities.title"),
      content: t("swap.mpbPolicyContent.growthOpportunities.content"),
    },
    {
      icon: "/ethereum.png",
      title: t("swap.mpbPolicyContent.investmentHolding.title"),
      content: t("swap.mpbPolicyContent.investmentHolding.content"),
    },
    {
      icon: "/ethereum.png",
      title: t("swap.mpbPolicyContent.limitedInvestmentOpportunity.title"),
      content: t("swap.mpbPolicyContent.limitedInvestmentOpportunity.content"),
    },
    {
      icon: "/ethereum.png",
      title: t("swap.mpbPolicyContent.riskWarning.title"),
      content: t("swap.mpbPolicyContent.riskWarning.content"),
    }
  ]

  const guild = [
    {
      icon: "/ethereum.png",
      title: t("swap.policyItems.0"),
    },
    {
      icon: "/ethereum.png",
      title: t("swap.policyItems.1"),
    },
    {
      icon: "/ethereum.png",
      title: t("swap.policyItems.2"),
    },
    {
      icon: "/ethereum.png",
      title: t("swap.policyItems.3"),
    },
    {
      icon: "/ethereum.png",
      title: t("swap.policyItems.4"),
    }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "swap":
        return (
          <div className="flex flex-col gap-3 lg:gap-4 justify-between h-full">
            <h2 className="bg-gradient-purple-cyan bg-clip-text text-xl lg:text-3xl font-bold leading-7  text-center mb-3 lg:mb-4">{t("swap.swapHistory")}</h2>

            <div className="overflow-hidden rounded-lg flex-1 flex flex-col">
              {/* Table Header */}
              <div className="px-2 lg:px-4 py-2 lg:py-3 grid grid-cols-3 gap-2 lg:gap-4 bg-dark-100">
                <div className="text-neutral font-medium text-xs lg:text-sm flex items-center gap-1">
                  {t("swap.time")}
                  <ChevronDown className="w-2 h-2 lg:w-3 lg:h-3" />
                </div>
                <div className="text-neutral font-medium text-xs lg:text-sm flex justify-center items-center gap-1">
                  {t("swap.sell")}
                  <ChevronDown className="w-2 h-2 lg:w-3 lg:h-3" />
                </div>
                <div className="text-neutral font-medium text-xs lg:text-sm flex justify-center items-center gap-1 text-right">
                  {t("swap.buy")}
                  <ChevronDown className="w-2 h-2 lg:w-3 lg:h-3" />
                </div>
              </div>

              {/* Table Body */}
              <div className="flex-1 overflow-y-auto custom-scroll min-h-0 max-h-[54.5vh]">
                {swapHistoryData.length > 0 ? (
                  swapHistoryData.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`hover:bg-[#737373] cursor-pointer px-2 lg:px-4 py-2 lg:py-3 grid grid-cols-3 gap-2 lg:gap-4 border-b border-[#d7d7d7]/10 transition-colors ${index % 2 === 0 ? "bg-black/20" : "bg-dark-100/60"}`}
                    >
                      <div className="text-[#fcfcfc] text-xs lg:text-sm">{item.time}</div>
                      <div className="text-[#fcfcfc] text-xs lg:text-sm flex justify-center">{item.sell}</div>
                      <div className="text-[#fcfcfc] text-xs lg:text-sm flex justify-center">{item.buy}</div>
                    </motion.div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full text-[#d7d7d7] text-sm lg:text-base mt-10">
                    {t("swap.noSwapHistory") || "No swap history available"}
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      case "guild":
        return (
          <div className="flex gap-2 flex-col justify-between flex-1">
            <h2 className="bg-gradient-purple-cyan bg-clip-text text-xl lg:text-3xl font-bold leading-7  text-center mb-6">{t("swap.swapGuide")}</h2>

            <div className="flex-1 flex flex-col justify-around ">
              <div className=" rounded-xl px-4 pb-4">
                <ul className=" leading-6 flex flex-col gap-3">
                  {guild.map((item, index) => (
                    <li key={index} className="text-neutral text-xs lg:text-sm flex items-start  gap-2">
                      <img src={item.icon} alt="ethereum" className="w-3 h-3 lg:w-4 lg:h-4" />
                      <span>{item.title}</span>
                    </li>
                  ))}
                </ul>

              </div>
              <div className="rounded-xl overflow-hidden">
                <img src="/ido.jpg" alt="swap-guide" className="w-full h-auto " />
              </div>
            </div>
          </div>
        )

      case "policyMmp":
        return (
          <div className="flex flex-col gap-3 h-full">
            <h2 className="bg-gradient-purple-cyan bg-clip-text text-xl lg:text-3xl font-bold leading-7  text-center mb-3">{t("swap.policy")}</h2>
            {/* Policy Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="h-[60vh] custom-scroll overflow-y-auto overflow-x-hidden"
              >
                <div className="flex flex-col gap-3 lg:gap-4">
                  <p className="text-neutral text-xs lg:text-sm leading-7 ">
                    {t("swap.projectDescriptions.mmpProjectIntro")}
                  </p>
                  <p className="text-neutral text-xs lg:text-sm leading-7" dangerouslySetInnerHTML={{ __html: t("swap.projectDescriptions.mmpProjectOverview") }} />

                  <span className="text-neutral text-sm lg:text-base leading-7">
                    {t("swap.projectDescriptions.mmpTokenDistribution")}
                  </span>
                  <ul className=" leading-7 flex flex-col gap-3 pb-3 lg:pb-5">
                    {listPolicy.map((item, index) => (
                      <li key={index} className="text-neutral text-xs lg:text-sm flex items-start gap-2">
                        <img src={item.icon} alt="ethereum" className="w-3 h-3 lg:w-4 lg:h-4" />
                        <div className="flex flex-col gap-1">
                          <span className="text-neutral text-xs lg:text-sm leading-7">{item.title}</span>
                          <span
                            className="text-neutral text-xs lg:text-sm leading-7"
                            dangerouslySetInnerHTML={{ __html: item.content }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )
      case "policyMpb":
        return (
          <div className="flex flex-col gap-3 h-full">
            <h2 className="bg-gradient-purple-cyan bg-clip-text text-xl lg:text-3xl font-bold leading-7  text-center mb-3">{t("swap.policy")}</h2>

            {/* Policy Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="h-[60vh] custom-scroll overflow-y-auto overflow-x-hidden"
              >
                <div className="flex flex-col gap-3 lg:gap-4">
                  <p className="text-neutral text-xs lg:text-sm leading-7">
                    {t("swap.projectDescriptions.mpbProjectIntro")}
                  </p>
                  <p className="text-neutral text-xs lg:text-sm leading-7">
                    {t("swap.projectDescriptions.mpbProjectDescription")}
                  </p>
                  <ul className="leading-7 flex flex-col gap-4   pb-3 lg:pb-5">
                    {listPolicy2.map((item, index) => (
                      <li key={index} className="text-neutral text-xs lg:text-sm flex items-start gap-2">
                        <img src={item.icon} alt="ethereum" className="w-3 h-3 lg:w-4 lg:h-4" />
                        <div className="flex flex-col gap-1">
                          <span className="text-neutral text-xs lg:text-sm leading-7">{item.title}</span>
                          <span
                            className="text-neutral text-xs lg:text-sm leading-7"
                            dangerouslySetInnerHTML={{ __html: item.content }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )

      default:
        return null
    }
  }

  // Handle swap order submission
  const handleSwapSubmit = async () => {
    // Validate input
    if (!sellAmount || Number(sellAmount) <= 0) {
      notify({ message: t("swap.errors.enterValidAmount"), type: "error" })
      return
    }

    if (!sellToken || !sellToken.symbol) {
      notify({ message: t("swap.errors.selectToken"), type: "error" })
      return
    }

    setIsSubmitting(true)

    try {
      // Check if user is using Web3 wallet (Phantom)
      if (loginMethod === 'phantom') {
        await handleWeb3Swap()
      } else {
        // Traditional wallet swap (Telegram, Google)
        await handleTraditionalSwap()
      }
    } catch (error: any) {
      console.error("Swap order error:", error)
      handleSwapError(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle traditional wallet swap
  const handleTraditionalSwap = async () => {
    const response = await createSwapOrder(sellToken.symbol, Number(sellAmount), sellTokenSwap.symbol)
    console.log("response", response);
    notify({
      message: t("swap.errors.swapSuccess"),
      type: "success"
    })
    // refetchMyWallet()
    refetchSwapOrderHistory()
    // Reset form
    setSellAmount("0")
  }

  // Handle Web3 wallet swap
  const handleWeb3Swap = async () => {
    try {
      const { solana } = window as any;

      if (!solana || !solana.isPhantom) {
        throw new Error('Phantom wallet is not installed');
      }

      // Get connected account
      const publicKey = myWallet?.sol_address;
      if (!publicKey) {
        throw new Error('Please connect your Phantom wallet');
      }

      // Step 1: Initialize Web3 swap and get unsigned transaction
      const { orderId, serializedTx } = await Web3WalletService.initWeb3Swap(
        publicKey,
        sellToken.symbol,
        Number(sellAmount),
        sellTokenSwap.symbol
      );

      setWeb3OrderId(orderId);
      setWeb3SerializedTx(serializedTx);

      // Step 2: Sign transaction using Phantom wallet
      const signature = await Web3WalletService.signAndSendTransaction(serializedTx);

      // Step 3: Complete swap by sending signature to API
      await Web3WalletService.completeWeb3Swap(orderId, signature);

      notify({
        message: t("swap.errors.swapSuccess"),
        type: "success"
      });

      refetchSwapOrderHistory();
      setSellAmount("0");
      setWeb3OrderId(null);
      setWeb3SerializedTx(null);

    } catch (error: any) {
      console.error("Web3 swap error:", error);
      throw error;
    }
  }

  // Handle swap errors
  const handleSwapError = (error: any) => {
    if (error.response) {
      // Server responded with error status
      const status = error.response.status
      const errorMessage = error.response.data?.message || error.response.data?.error

      // Check for specific API error messages
      if (errorMessage === "Insufficient SOL balance") {
        notify({
          message: t("swap.errors.insufficientSolBalance"),
          type: "error"
        })
        return
      }

      if (errorMessage === "ATA creation fee is 0.0025 SOL") {
        notify({
          message: t("swap.errors.ataCreationFee"),
          type: "error"
        })
        return
      }

      switch (status) {
        case 400:
          notify({
            message: t("swap.errors.insufficientBalance") || t("swap.errors.invalidRequest") || errorMessage,
            type: "error"
          })
          break
        case 401:
          notify({
            message: t("swap.errors.authenticationRequired"),
            type: "error"
          })
          break
        case 403:
          notify({
            message: t("swap.errors.insufficientBalance"),
            type: "error"
          })
          break
        case 404:
          notify({
            message: t("swap.errors.serviceUnavailable"),
            type: "error"
          })
          break
        case 429:
          notify({
            message: t("swap.errors.tooManyRequests"),
            type: "error"
          })
          break
        case 500:
          notify({
            message: t("swap.errors.serverError"),
            type: "error"
          })
          break
        default:
          notify({
            message: errorMessage || t("swap.errors.unexpectedError"),
            type: "error"
          })
      }
    } else if (error.request) {
      // Network error
      notify({
        message: t("swap.errors.networkError"),
        type: "error"
      })
    } else {
      // Other errors (including Web3 errors)
      notify({
        message: error.message || t("swap.errors.unexpectedError"),
        type: "error"
      })
    }
  }

  // Get Phantom wallet balance
  const getPhantomBalance = async () => {
    if (loginMethod === 'phantom' && Web3WalletService.isPhantomInstalled()) {
      try {
        const { solana } = window as any;
        const balance = await solana.connection.getBalance(solana.publicKey);
        setPhantomBalance(balance / 1e9); // Convert lamports to SOL
      } catch (error) {
        console.error('Error getting Phantom balance:', error);
        setPhantomBalance(null);
      }
    }
  };

  // Get current balance based on login method
  const getCurrentBalance = () => {
    if (loginMethod === 'phantom') {
      return phantomBalance !== null ? phantomBalance : 0;
    }
    return myWallet?.balance_sol || 0;
  };

  // Get balance for specific token
  const getTokenBalance = (tokenSymbol: string) => {
    if (!balances) return 0;

    switch (tokenSymbol) {
      case "SOL":
        return balances.sol || 0;
      case "USDT":
        return balances.usdt || 0;
      case "USDC":
        return balances.usdc || 0;
      default:
        return 0;
    }
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory)
  }

  // Fetch Phantom balance when login method is phantom
  useEffect(() => {
    if (loginMethod === 'phantom' && isAuthenticated) {
      getPhantomBalance();
    }
  }, [loginMethod, isAuthenticated]);


  return (
    <div className="flex-1 flex items-center justify-center p-4 md:p-4 z-20">

      <div className="relative flex flex-col lg:flex-row  items-start justify-center gap-4 lg:gap-8 w-full">
        {/* History Panel */}
        <div className="w-full lg:flex-1 flex lg:flex-col flex-col-reverse gap-4 lg:gap-8 rounded-xl order-2 lg:order-1"
        >
          <Card className="w-full border-[#d7d7d7]/20 p-3 md:p-6 bg-black/60 min-h-[400px] lg:min-h-[70.5vh] flex flex-col">
            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="flex-1 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </Card>
          <div className="flex lg:mb-6 border-b w-fit mx-auto bg-black/60 rounded-full border-[#d7d7d7]/20">
            <button
              onClick={() => setActiveTab("guild")}
              className={`flex min-w-[80px] lg:min-w-[100px] items-center cursor-pointer border-none text-neutral gap-1 lg:gap-2 px-2 lg:px-4 py-2 lg:py-3 justify-center text-xs lg:text-sm font-medium transition-colors ${activeTab === "guild"
                ? "bg-gradient-purple-cyan bg-clip-text"
                : "bg-transparent"
                }`}
            >
              {t("swap.guild")}
            </button>
            <button
              onClick={() => setActiveTab("swap")}
              className={`flex min-w-[80px] lg:min-w-[100px] items-center cursor-pointer border-none text-neutral gap-1 lg:gap-2 px-2 lg:px-4 py-2 lg:py-3 justify-center text-xs lg:text-sm font-medium transition-colors ${activeTab === "swap"
                ? "bg-gradient-purple-cyan bg-clip-text"
                : "bg-transparent"
                }`}
            >
              {t("swap.swapHistory")}
            </button>
            <button
              onClick={() => setActiveTab("policyMmp")}
              className={`flex min-w-[80px] lg:min-w-[100px] rounded-full items-center cursor-pointer border-none text-neutral gap-1 lg:gap-2 px-2 lg:px-5 kati-font py-2 justify-center text-xs lg:text-sm font-medium transition-colors ${activeTab === "policyMmp"
                ? "bg-gradient-purple-cyan bg-clip-text"
                : "bg-transparent"
                }`}
            >
              {t("swap.policy")} MMP
            </button>
            <button
              onClick={() => setActiveTab("policyMpb")}
              className={`flex min-w-[80px] lg:min-w-[100px] rounded-full items-center cursor-pointer border-none text-neutral gap-1 lg:gap-2 px-2 lg:px-5 kati-font py-2 justify-center text-xs lg:text-sm font-medium transition-colors ${activeTab === "policyMpb"
                ? "bg-gradient-purple-cyan bg-clip-text"
                : "bg-transparent"
                }`}
            >
              {t("swap.policy")} MPB
            </button>
          </div>
        </div>

        {/* Main Swap Interface */}
        <Card className="w-full lg:w-[600px] bg-black/6060 flex lg:flex-col flex-col-reverse gap-4 order-1 lg:order-2">
          <div className="flex gap-6 w-full">
            <div className="flex flex-col gap-4 bg-black/60 text-[#bf46d7] p-3 md:p-6 rounded-xl leading-6 text-xs lg:text-sm flex-1" dangerouslySetInnerHTML={{
              __html: t("swap.specialOpportunity.message")
            }} />
            <div className="bg-black/60 text-[#d961f1] p-3 md:p-6 rounded-xl leading-6 text-xs lg:text-sm gap-2 pt-4 flex-1">
              <span className="text-[#bf46d7] text-base ">(*) &ensp;</span>
              {t("swap.holdingBenefits.title")} <br />
              {t("swap.holdingBenefits.synergyProject")}&ensp;
              {t("swap.holdingBenefits.airdropDistribution")}<br />
              <span className="text-[#bf46d7] text-base ">(*) &ensp;</span>
              {t("swap.holdingBenefits.earlyParticipants")}
            </div>

          </div>
          <div className="flex flex-col gap-4">
            <div className=" bg-black/60  p-3 md:py-6 md:px-5 border-[1px] border-solid  rounded-xl">
              {/* Header */}
              <div className={`text-center ${!isAuthenticated ? 'pb-10' : 'pb-3'}`}>
                <h1 className="bg-gradient-purple-cyan bg-clip-text text-xl lg:text-3xl font-bold leading-7 ">{t("swap.instantExchange")}</h1>
              </div>

              <div className="text-neutral text-xs lg:text-sm text-right leading-5 gap-2">
                {sellToken && isAuthenticated && (
                  <div className="flex flex-col gap-[6px]">
                    <span className="text-xs lg:text-sm ">{t("swap.myBalance")}: <span className="bg-gradient-purple-cyan bg-clip-text">{getTokenBalance(sellToken.symbol)}</span>&ensp;{sellToken.symbol}</span>
                    <span className="text-xs lg:text-sm "> <span className="bg-gradient-purple-cyan bg-clip-text">{balances?.mmp}</span>&ensp;MMP</span>
                    <span className="text-xs lg:text-sm "> <span className="bg-gradient-purple-cyan bg-clip-text">{balances?.mpb}</span>&ensp;MPB</span>
                  </div>
                )}
              </div>
              {/* Sell Section */}
              <div className="space-y-2 lg:space-y-3 mb-3 lg:mb-5 mt-2">
                <div className="bg-dark-100 rounded-xl py-3 px-4">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[#fcfcfc] text-xs lg:text-sm font-medium">{t("swap.from")}</label>
                  </div>
                  <div className="flex items-start justify-between">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className="bg-transparent border-none text-xs lg:text-sm text-neutral cursor-pointer py-1 lg:py-2">
                        <button className="flex items-center gap-1 lg:gap-2 text-[#fcfcfc] hover:text-[#9747ff] transition-colors">
                          <div
                            className={`w-5 h-5 lg:w-6 lg:h-6 rounded-full flex items-center justify-center text-xs`}
                          >
                            <img src={sellToken.icon} alt={sellToken.name} width={20} height={20} className="lg:w-6 lg:h-6" />
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
                            className="text-[#fcfcfc] hover:bg-[#d7d7d7]/10 focus:bg-[#d7d7d7]/10 w-full p-2 hover:bg-gradient-violet-blue flex items-center gap-3 px-3"
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
                    <div className="text-right flex flex-col gap-1">
                      <input
                        type="number"
                        value={sellAmount}
                        onChange={(e) => setSellAmount(e.target.value)}
                        placeholder="0"
                        className="text-lg lg:text-2xl font-bold text-[#fcfcfc] bg-transparent pr-1 border-none outline-none w-24 lg:w-32 rounded-full min-w-[80px] lg:min-w-[100px] text-right appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <div className="text-right text-[#d7d7d7] text-xs lg:text-sm">~ {getUSDValue().toFixed(2)} USD</div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Buy Section */}
              <div className="mt-3">
                <div className="bg-dark-100 rounded-xl py-3 px-4">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[#fcfcfc] text-xs lg:text-sm font-medium">{t("swap.to")}</label>

                  </div>
                  <div className="flex items-center justify-between">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className="bg-transparent border-none text-xs lg:text-sm text-neutral cursor-pointer py-1 lg:py-2">
                        <button className="flex items-center gap-1 lg:gap-2 text-[#fcfcfc] hover:text-[#9747ff] transition-colors">
                          <div
                            className={`w-5 h-5 lg:w-6 lg:h-6 rounded-full flex items-center justify-center text-xs`}
                          >
                            <img src={sellTokenSwap.icon} alt={sellTokenSwap.name} width={30} height={30} className="lg:w-6 lg:h-6 rounded-full" />
                          </div>
                          <span className="font-medium text-xs lg:text-sm font-tektur">{sellTokenSwap.symbol}</span>
                          <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-dark-100 border-[#d7d7d7]/20 max-w-[150px] p-0">
                        {tokenSwap.map((token) => (
                          <DropdownMenuItem
                            key={`${token.symbol}-${token.name}`}
                            onClick={() => setSellTokenSwap(token)}
                            className="text-[#fcfcfc] hover:bg-[#d7d7d7]/10 focus:bg-[#d7d7d7]/10 w-full p-2 hover:bg-gradient-violet-blue flex items-center gap-3 px-3"
                          >
                            <div
                              className={`w-4 h-5 rounded-full flex items-center justify-center text-xs mr-2`}
                            >
                              <img src={token.icon} alt={token.name} width={30} height={30} className="lg:w-6 lg:h-6 rounded-full" />
                            </div>
                            <span className="text-xs lg:text-sm font-tektur">{token.symbol}</span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="text-right">
                      <div className="text-lg lg:text-2xl font-bold text-[#fcfcfc]">{calculateMMPAmount().toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-xs lg:text-sm text-right leading-5 gap-2 pt-4">
                <span className="text-primary text-base ">(*) &ensp;</span>
                <span className="text-yellow-500 text-sm" dangerouslySetInnerHTML={{
                  __html: t("swap.networkFee.firstTimeFee")
                }} />
              </div>
            </div>
            <div className="flex flex-col gap-3 lg:gap-4 bg-black/60 rounded-xl p-3 lg:p-5">
              {isAuthenticated ? (
                <Button
                  onClick={handleSwapSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-violet-blue cursor-pointer rounded-full border-none text-white font-bold py-2 lg:py-3 text-sm lg:text-base kati-font transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-3 h-3 lg:w-4 lg:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-xs lg:text-sm">{loginMethod === 'phantom' ? 'Signing Transaction...' : t("swap.processing")}</span>
                    </div>
                  ) : (
                    t("swap.swap")
                  )}
                </Button>
              ) : (
                <Button
                  onClick={() => setShowConnectModal(true)}
                  className="w-full bg-gradient-violet-blue cursor-pointer rounded-full text-white font-bold py-2 lg:py-3 text-sm lg:text-base kati-font transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 active:scale-95"
                >
                  {t("swap.connectWallet")}
                </Button>
              )}

              {/* Transaction Info */}
              <div className="bg-black/60 rounded-xl flex  items-center justify-between space-y-1  lg:space-y-2">
                <div className="flex  text-xs lg:text-sm gap-2 ">
                  <span className="text-[#d7d7d7]">1 MMP/ MPB</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" className="lg:w-4 lg:h-4" viewBox="0 0 14 15" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M1.74998 3.99992C1.67243 3.99842 1.59535 4.0124 1.52327 4.04104C1.45119 4.06968 1.38554 4.1124 1.33016 4.16672C1.27479 4.22103 1.2308 4.28584 1.20077 4.35735C1.17074 4.42887 1.15527 4.50566 1.15527 4.58322C1.15527 4.66079 1.17074 4.73757 1.20077 4.80909C1.2308 4.8806 1.27479 4.94541 1.33016 4.99973C1.38554 5.05404 1.45119 5.09676 1.52327 5.1254C1.59535 5.15404 1.67243 5.16802 1.74998 5.16652H10.8441L9.46748 6.44402C9.41277 6.49824 9.36935 6.56276 9.33972 6.63385C9.31009 6.70494 9.29483 6.7812 9.29483 6.85822C9.29483 6.93524 9.31009 7.0115 9.33972 7.08259C9.36935 7.15369 9.41277 7.2182 9.46748 7.27242C9.52171 7.32707 9.58622 7.37044 9.65729 7.40003C9.72836 7.42963 9.80458 7.44487 9.88157 7.44487C9.95856 7.44487 10.0348 7.42963 10.1059 7.40003C10.1769 7.37044 10.2414 7.32707 10.2957 7.27242L12.6291 4.93902C12.6779 4.88914 12.7157 4.82964 12.74 4.76402C12.7627 4.70649 12.7745 4.64524 12.775 4.58333V4.54833C12.7811 4.49989 12.7811 4.45087 12.775 4.40242C12.7782 4.38309 12.7782 4.36335 12.775 4.34402C12.7488 4.27953 12.7112 4.22026 12.6641 4.16902L10.3307 1.83583C10.2763 1.78145 10.2117 1.73831 10.1407 1.70888C10.0696 1.67945 9.99347 1.66431 9.91657 1.66431C9.83967 1.66431 9.76351 1.67945 9.69246 1.70888C9.62141 1.73831 9.55686 1.78145 9.50248 1.83583C9.4481 1.89021 9.40496 1.95477 9.37553 2.02582C9.3461 2.09687 9.33095 2.17302 9.33095 2.24992C9.33095 2.32683 9.3461 2.40298 9.37553 2.47403C9.40496 2.54508 9.4481 2.60964 9.50248 2.66402L10.8441 3.99992H1.74998ZM3.15566 9.83333H12.25C12.4027 9.83629 12.5482 9.89904 12.6552 10.0081C12.7622 10.1172 12.8221 10.2639 12.8221 10.4166C12.8221 10.5694 12.7622 10.7161 12.6552 10.8251C12.5482 10.9342 12.4027 10.997 12.25 10.9999H3.15566L4.50316 12.2774C4.55787 12.3316 4.60129 12.3962 4.63092 12.4673C4.66055 12.5383 4.67581 12.6146 4.67581 12.6916C4.67581 12.7686 4.66055 12.8449 4.63092 12.916C4.60129 12.9871 4.55787 13.0516 4.50316 13.1058C4.44895 13.1605 4.38444 13.2039 4.31337 13.2335C4.2423 13.2631 4.16607 13.2784 4.08907 13.2784C4.01208 13.2784 3.93584 13.2631 3.86477 13.2335C3.7937 13.2039 3.72919 13.1605 3.67498 13.1058L1.34157 10.7724C1.2927 10.7225 1.2549 10.6629 1.23066 10.5974C1.2078 10.5398 1.19593 10.4785 1.19566 10.4165V10.3815C1.19916 10.3319 1.20901 10.2831 1.22498 10.2358C1.2217 10.2165 1.2217 10.1968 1.22498 10.1774C1.25123 10.1129 1.28863 10.0536 1.33566 10.0024L3.66907 7.66902C3.72323 7.61356 3.78785 7.56941 3.8592 7.53912C3.93055 7.50882 4.00719 7.49299 4.08471 7.49253C4.16222 7.49207 4.23905 7.507 4.31075 7.53645C4.38244 7.5659 4.44759 7.60929 4.5024 7.6641C4.5572 7.71891 4.60059 7.78405 4.63004 7.85575C4.65949 7.92745 4.67442 8.00428 4.67397 8.08179C4.67351 8.1593 4.65767 8.23595 4.62738 8.30729C4.59708 8.37864 4.55293 8.44327 4.49748 8.49742L3.15566 9.83333Z" fill="url(#paint0_linear_86_186)" />
                    <defs>
                      <linearGradient id="paint0_linear_86_186" x1="6.98868" y1="1.66431" x2="6.98868" y2="13.2784" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#51BFFF" />
                        <stop offset="1" stopColor="#5558FF" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="text-[#d7d7d7]">0.001 USD</span>
                </div>
                <div className="flex  text-xs lg:text-sm gap-2 ">
                  <span className="text-[#d7d7d7]">1 SOL</span>
                  <span className="text-[#d7d7d7]">~ {solPrice?.price_usd.toFixed(3)} USD</span>
                </div>
              </div>
            </div>
          </div>

        </Card>
      </div>

      {/* Connect Wallet Modal */}
      <ConnectWalletModal
        open={showConnectModal}
        onOpenChange={setShowConnectModal}
      />
    </div>
  )
}
