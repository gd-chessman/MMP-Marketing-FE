"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Clock, ArrowUpDown, ArrowDown, Users, Shield } from "lucide-react"
import { Button } from "@/app/ui/button"
import { Card } from "@/app/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/ui/dropdown-menu"
import { useAuth } from "@/hooks/useAuth"
import { ConnectWalletModal } from "@/components/ConnectWalletModal"
import { useQuery } from "@tanstack/react-query"
import { SwapService, TelegramWalletService } from "@/services/api"
import { createSwapOrder } from "@/services/api/SwapService"
import notify from "@/components/notify"

// Mock data for swap history
const swapHistory = [
  { time: "22:00 12/05/2025", sell: "0.5 SOL", buy: "2 MMP" },
  { time: "22:00 12/05/2025", sell: "0.5 SOL", buy: "2 MMP" },
  { time: "22:00 12/05/2025", sell: "0.5 SOL", buy: "2 MMP" },
  { time: "22:00 12/05/2025", sell: "0.5 SOL", buy: "2 MMP" },
  { time: "22:00 12/05/2025", sell: "0.5 SOL", buy: "2 MMP" },
  { time: "22:00 12/05/2025", sell: "0.5 SOL", buy: "2 MMP" },
  { time: "22:00 12/05/2025", sell: "0.5 SOL", buy: "2 MMP" },
  { time: "22:00 12/05/2025", sell: "0.5 SOL", buy: "2 MMP" },
  { time: "22:00 12/05/2025", sell: "0.5 SOL", buy: "2 MMP" },
  { time: "22:00 12/05/2025", sell: "0.5 SOL", buy: "2 MMP" },
  { time: "22:00 12/05/2025", sell: "0.5 SOL", buy: "2 MMP" },
  { time: "22:00 12/05/2025", sell: "0.5 SOL", buy: "2 MMP" },
  { time: "22:00 12/05/2025", sell: "0.5 SOL", buy: "2 MMP" },
  { time: "22:00 12/05/2025", sell: "0.5 SOL", buy: "2 MMP" },
  { time: "22:00 12/05/2025", sell: "0.5 SOL", buy: "2 MMP" },
  { time: "22:00 12/05/2025", sell: "0.5 SOL", buy: "2 MMP" },
]

const tokens = [
  { symbol: "SOL", name: "Solana", color: "bg-green-500", icon: "/solana.png" },
  { symbol: "USDT", name: "Tether", color: "bg-green-600", icon: "/USDT.png" },
  { symbol: "USDC", name: "USDC", color: "bg-blue-500", icon: "/usdc.png" },
]

export default function SwapInterface() {
  const [showHistory, setShowHistory] = useState(false)
  const [sellToken, setSellToken] = useState(tokens[0])
  const [buyToken, setBuyToken] = useState(tokens[1])
  const [sellAmount, setSellAmount] = useState("0")
  const [buyAmount, setBuyAmount] = useState("0.00")
  const [activeTab, setActiveTab] = useState("swap")
  const [showConnectModal, setShowConnectModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { isAuthenticated } = useAuth()
  const toggleHistory = () => {
    setShowHistory(!showHistory)
  }

  const { data: myWallet } = useQuery({
    queryKey: ['myWallet'],
    queryFn: () => TelegramWalletService.getmyWallet(),
  })

  const { data: solPrice } = useQuery({
    queryKey: ['solPrice'],
    queryFn: () => SwapService.gerSolPrice(),
  })

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
      title: "Users can transfer SOL, USDT, or USDC directly from their personal wallets (Phantom) into their exchange wallet.",
    },
    {
      icon: "/ethereum.png",
      title: "They can use SOL, USDT, or USDC to swap for MMP tokens at the IDO price of $0.001.",
    },
    {
      icon: "/ethereum.png",
      title: "Users may stake MMP to earn periodic rewards (reward details are currently being updated).",
    },
    {
      icon: "/ethereum.png",
      title: "If they choose not to stake, they can withdraw MMP/MPB from their exchange wallet back to their personal wallet, paying only the network fee.s",
    },
    {
      icon: "/ethereum.png",
      title: "When withdrawing SOL, USDT, or USDC from the exchange wallet to a personal wallet, a flat $1 withdrawal fee applies.",
    }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "swap":
        return (
          <div className="space-y-4">
            <h2 className="bg-gradient-purple-cyan bg-clip-text text-3xl font-bold leading-7 kati-font text-center mb-4">Swap History</h2>

            <div className="overflow-hidden rounded-lg">
              {/* Table Header */}
              <div className="px-4 py-3 grid grid-cols-3 gap-4">
                <div className="text-neutral font-medium text-sm flex items-center gap-1">
                  Time
                  <ChevronDown className="w-3 h-3" />
                </div>
                <div className="text-neutral font-medium text-sm flex items-center gap-1">
                  Sell
                  <ChevronDown className="w-3 h-3" />
                </div>
                <div className="text-neutral font-medium text-sm flex items-center gap-1">
                  Buy
                  <ChevronDown className="w-3 h-3" />
                </div>
              </div>

              {/* Table Body */}
              <div className="h-[500px] overflow-y-auto custom-scroll">
                {swapHistory.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className=" hover:bg-[#d7d7d7]/5 px-4 py-3 grid grid-cols-3 gap-4 border-b border-[#d7d7d7]/10 transition-colors"
                  >
                    <div className="text-[#fcfcfc] text-sm">{item.time}</div>
                    <div className="text-[#fcfcfc] text-sm">{item.sell}</div>
                    <div className="text-[#fcfcfc] text-sm">{item.buy}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )

      case "guild":
        return (
          <div className="space-y-6">
            <h2 className="bg-gradient-purple-cyan bg-clip-text text-3xl font-bold leading-7 kati-font text-center mb-6">Swap Guide</h2>

            <div className="space-y-4">
              <div className=" rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-violet-blue rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-neutral bg-gradient-purple-cyan bg-clip-text" />
                  </div>
                  <h3 className="text-neutral text-xl font-bold">Guild Membership</h3>
                </div>
                <p className="text-neutral text-sm leading-relaxed">
                  Join our exclusive guild system to unlock premium features, earn rewards, and connect with other traders.
                  Guild members enjoy reduced fees, priority support, and exclusive trading opportunities.
                </p>
                <div className="mt-4 flex gap-2">
                  <Button className="bg-gradient-violet-blue text-neutral cursor-pointer text-sm px-4 py-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 active:scale-95">
                    Join Guild
                  </Button>
                  <Button variant="outline" className="border-[#d7d7d7]/20 text-black cursor-pointer text-sm px-4 py-2 transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:border-purple-500/50 active:scale-95">
                    View Benefits
                  </Button>
                </div>
              </div>


              <img src="/swap-guide.png" alt="swap-guide" className="w-full h-auto" />
            </div>
          </div>
        )

      case "policy":
        return (
          <div className="space-y-6">
            <h2 className="bg-gradient-purple-cyan bg-clip-text text-3xl font-bold leading-7 kati-font text-center mb-8">Policy</h2>

            <ul className="space-y-4 leading-6 flex flex-col gap-4 pb-5">
              {listPolicy.map((item, index) => (
                <li className="text-neutral text-sm flex items-start  gap-2">
                  <img src={item.icon} alt={item.icon} className="w-4 h-4" />
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
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
      notify({ message: "Please enter a valid amount swap", type: "error" })
      return
    }

    if (!sellToken || !sellToken.symbol) {
      notify({ message: "Please select a token to swap", type: "error" })
      return
    }

    // // Check minimum amount (e.g., 0.001 for any token)
    // const minAmount = 0.001
    // if (Number(sellAmount) < minAmount) {
    //   notify({ message: `Minimum swap amount is ${minAmount} ${sellToken.symbol}`, type: "error" })
    //   return
    // }

    setIsSubmitting(true)

    try {
      const response = await createSwapOrder(sellToken.symbol, Number(sellAmount))

      // Check if response has success status or specific status codes
      if (response && (response.success || response.status === 200 || response.status === 201)) {
        notify({
          message: "Swap order created successfully! You will receive your MMP tokens shortly.",
          type: "success"
        })
        // Reset form
        setSellAmount("0")
      } else {
        notify({
          message: response?.message || "Failed to create swap order. Please try again.",
          type: "error"
        })
      }
    } catch (error: any) {
      console.error("Swap order error:", error)

      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        const status = error.response.status
        const errorMessage = error.response.data?.message || error.response.data?.error

        switch (status) {
          case 400:
            notify({
              message: errorMessage || "Invalid request. Please check your input.",
              type: "error"
            })
            break
          case 401:
            notify({
              message: "Authentication required. Please connect your wallet.",
              type: "error"
            })
            break
          case 403:
            notify({
              message: "Insufficient balance or permission denied.",
              type: "error"
            })
            break
          case 404:
            notify({
              message: "Service not available. Please try again later.",
              type: "error"
            })
            break
          case 429:
            notify({
              message: "Too many requests. Please wait before trying again.",
              type: "error"
            })
            break
          case 500:
            notify({
              message: "Server error. Please try again later.",
              type: "error"
            })
            break
          default:
            notify({
              message: errorMessage || "An unexpected error occurred. Please try again.",
              type: "error"
            })
        }
      } else if (error.request) {
        // Network error
        notify({
          message: "Network error. Please check your connection and try again.",
          type: "error"
        })
      } else {
        // Other errors
        notify({
          message: "An unexpected error occurred. Please try again.",
          type: "error"
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4 z-20">

      <div className="relative flex items-center justify-center gap-8 w-full">
        {/* History Panel */}
        <div className=" flex-1 flex flex-col gap-8 rounded-xl"
        >
          <Card className="w-full border-[#d7d7d7]/20 p-6 bg-black/60 min-h-[530px]">
            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </Card>
          <div className="flex mb-6 border-b max-w-[400px] mx-auto bg-black/60 rounded-full border-[#d7d7d7]/20">
            <button
              onClick={() => setActiveTab("swap")}
              className={`flex min-w-[100px] items-center cursor-pointer border-none text-neutral gap-2 px-4 py-3 text-sm font-medium transition-colors ${activeTab === "swap"
                ? "bg-gradient-purple-cyan bg-clip-text"
                : "bg-transparent"
                }`}
            >

              Swap
            </button>
            <button
              onClick={() => setActiveTab("guild")}
              className={`flex min-w-[100px] items-center cursor-pointer border-none text-neutral gap-2 px-4 py-3 text-sm font-medium transition-colors ${activeTab === "guild"
                ? "bg-gradient-purple-cyan bg-clip-text"
                : "bg-transparent"
                }`}
            >
              Guild
            </button>
            <button
              onClick={() => setActiveTab("policy")}
              className={`flex min-w-[100px] items-center cursor-pointer border-none text-neutral gap-2 px-4 py-3 text-sm font-medium transition-colors ${activeTab === "policy"
                ? "bg-gradient-purple-cyan bg-clip-text"
                : "bg-transparent"
                }`}
            >
              Policy
            </button>
          </div>
        </div>

        {/* Main Swap Interface */}
        <Card className="w-[600px] bg-black/6060 flex flex-col gap-4" style={{ marginTop: '-5%' }}>
          <div className=" bg-black/60  p-6 border-[1px] border-solid  rounded-xl">
            {/* Header */}
            <div className="text-center mb-5">
              <h1 className="bg-gradient-purple-cyan bg-clip-text text-3xl font-bold leading-7 kati-font">Free Swap</h1>
              <h1 className="bg-gradient-purple-cyan bg-clip-text text-3xl font-bold leading-7 mt-2 kati-font">Instant Exchange</h1>
            </div>

            <div className="text-neutral text-sm text-right leading-5">My Balance: {myWallet?.balance_sol} SOL</div>
            {/* Sell Section */}
            <div className="space-y-3 mb-5 mt-2">
              <div className="bg-dark-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[#fcfcfc] text-sm font-medium">From</label>
                </div>
                <div className="flex items-start justify-between">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="bg-transparent border-none text-sm text-neutral cursor-pointer py-2">
                      <button className="flex items-center gap-2 text-[#fcfcfc] hover:text-[#9747ff] transition-colors">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs`}
                        >
                          <img src={sellToken.icon} alt={sellToken.name} width={24} height={24} />
                        </div>
                        <span className="font-medium">{sellToken.symbol}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-dark-100 border-[#d7d7d7]/20">
                      {tokens.map((token) => (
                        <DropdownMenuItem
                          key={`${token.symbol}-${token.name}`}
                          onClick={() => setSellToken(token)}
                          className="text-[#fcfcfc] hover:bg-[#d7d7d7]/10 focus:bg-[#d7d7d7]/10 w-fit p-2"
                        >
                          <div
                            className={`w-4 h-5 rounded-full flex items-center justify-center text-xs mr-2`}
                          >
                            <img src={token.icon} alt={token.name} width={24} height={24} />
                          </div>
                          <span>{token.symbol}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div className="text-right flex flex-col gap-2">
                    <input
                      type="number"
                      value={sellAmount}
                      onChange={(e) => setSellAmount(e.target.value)}
                      placeholder="0"
                      className="text-2xl font-bold text-[#fcfcfc] bg-transparent pr-1 border-none outline-none w-32 rounded-full min-w-[100px] text-right appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <div className="text-right text-[#d7d7d7] text-sm">~ {getUSDValue().toFixed(2)} USD</div>
                  </div>

                </div>
              </div>
            </div>

            {/* Swap Button */}
            {/* <div className="flex justify-center">
                <button
                  onClick={swapTokens}
                  className="bg-dark-100 hover:bg-[#d7d7d7]/10 p-2 rounded-full flex items-center justify-center"
                >
                  <ArrowDown className="w-5 h-5 text-[#fcfcfc] rotate-90" />
                </button>
              </div> */}

            {/* Buy Section */}
            <div className="">
              <div className="bg-dark-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[#fcfcfc] text-sm font-medium">To</label>

                </div>
                <div className="flex items-center justify-between">
                  <button className="flex items-center bg-transparent border-none gap-2 text-[#fcfcfc] hover:text-[#9747ff] transition-colors">
                    <div
                      className={`w-6 h-6 rounded-full bg-black/60 flex items-center justify-center text-xs`}
                    >
                      <img src={"/mmp-logo.png"} alt={"mmp"} width={24} height={24} />
                    </div>
                    <span className="font-medium">MMP</span>

                  </button>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#fcfcfc]">{calculateMMPAmount().toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Swap Button */}
          <div className="flex flex-col gap-4 bg-black/60 rounded-xl p-4">
            {isAuthenticated ? (
              <Button
                onClick={handleSwapSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-violet-blue cursor-pointer rounded-full border-none text-white font-bold py-3 text-base kati-font transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  "SWAP"
                )}
              </Button>
            ) : (
              <Button
                onClick={() => setShowConnectModal(true)}
                className="w-full bg-gradient-violet-blue cursor-pointer rounded-full text-white font-bold py-3 text-base kati-font transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 active:scale-95"
              >
                Connect Wallet
              </Button>
            )}

            {/* Transaction Info */}
            <div className="bg-black/60 rounded-xl flex items-center justify-between  space-y-2">
              <div className="flex justify-between text-sm gap-2">
                <span className="text-[#d7d7d7]">1 MMP</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
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
              <div className="flex justify-between text-sm gap-2">
                <span className="text-[#d7d7d7]">FEE</span>
                <span className="text-[#d7d7d7]">~ 1 USD</span>
              </div>
            </div>
          </div>

          {/* History Button */}
          {/* <div className="flex justify-between items-center pt-4 border-t border-[#d7d7d7]/20">
                <button className="text-[#d7d7d7] hover:text-[#9747ff] transition-colors">Policy</button>
                <button onClick={toggleHistory} className="text-[#9747ff] hover:text-[#fcfcfc] transition-colors">
                  Swap History
                </button>
              </div> */}

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
