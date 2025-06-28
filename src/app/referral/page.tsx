"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card"
import { Input } from "@/ui/input"
import { Copy, ChevronDown, User, Star, X, Check } from "lucide-react"
import { toast } from "react-toastify"
import ReferralStructure from "./referral-structure"
import { useLang } from "@/lang/useLang"
import { useQuery } from "@tanstack/react-query"
import { TelegramWalletService } from '@/services/api'
import { getHistoryReferral, getReferralStatistics, getReferralDetail } from "@/services/api/ReferralService"
import { truncateString } from "@/utils/format"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog"
import { Button } from "@/ui/button"

// Loading Skeleton Components
const LoadingSkeleton = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-700/50 rounded ${className}`} />
)

const StatsCardSkeleton = () => (
  <Card className="bg-gradient-purple-cyan-60 h-auto min-h-[80px] sm:min-h-[90px] flex flex-col justify-around border-primary-100 border border-solid rounded-xl backdrop-blur-sm p-3 xl:p-4">
    <LoadingSkeleton className="h-4 w-24 mb-2" />
    <LoadingSkeleton className="h-6 w-16" />
  </Card>
)

const ReferralCardSkeleton = () => (
  <div className="bg-dark-300 rounded-lg border border-gray/30 p-3">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-1">
        <LoadingSkeleton className="w-8 h-8 rounded-full mr-3" />
        <LoadingSkeleton className="h-4 w-20" />
      </div>
      <LoadingSkeleton className="h-4 w-12" />
    </div>
    <div className="grid grid-cols-2 gap-2">
      <LoadingSkeleton className="h-3 w-16" />
      <LoadingSkeleton className="h-3 w-12" />
      <LoadingSkeleton className="h-3 w-14 col-span-2" />
    </div>
  </div>
)

const TableRowSkeleton = () => (
  <div className="grid grid-cols-6 gap-2 sm:gap-4 text-white text-xs sm:text-sm py-2 sm:py-3 border-b border-slate-700/50">
    <div className="flex items-center col-span-2">
      <LoadingSkeleton className="w-6 h-6 sm:w-8 sm:h-8 rounded-full mr-2 sm:mr-3" />
      <LoadingSkeleton className="h-4 w-20" />
    </div>
    <LoadingSkeleton className="h-4 w-16" />
    <LoadingSkeleton className="h-4 w-12" />
    <LoadingSkeleton className="h-4 w-16" />
    <LoadingSkeleton className="h-4 w-12" />
  </div>
)

const ReferralHistorySkeleton = () => (
  <div className="bg-gray-900/60 rounded-lg p-3 mb-3 border border-gray/20">
    <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
      <LoadingSkeleton className="h-3 w-12" />
      <LoadingSkeleton className="h-3 w-8" />
      <LoadingSkeleton className="h-3 w-10" />
      <LoadingSkeleton className="h-3 w-6" />
      <LoadingSkeleton className="h-3 w-16" />
      <LoadingSkeleton className="h-3 w-20" />
      <LoadingSkeleton className="h-3 w-8" />
      <LoadingSkeleton className="h-3 w-14" />
    </div>
  </div>
)

interface ReferralUser {
  wallet_id: number;
  sol_address: string;
  created_at: Date;
  total_reward_sol: number;
  total_reward_mmp: number;
  total_reward_mpb: number;
}

interface ReferralHistory {
  id: number;
  reward_amount: number;
  reward_token: string;
  status: string;
  tx_hash: string;
  created_at: Date;
  referred_wallet: {
    sol_address: string;
  };
}

interface ReferralHistoryResponse {
  data: ReferralHistory[];
  total: number;
  page: number;
  limit: number;
}

// Helper function to convert language code to locale
const getLocaleFromLang = (lang: string): string => {
  const localeMap: { [key: string]: string } = {
    'en': 'en-US',
    'vi': 'vi-VN',
    'kr': 'ko-KR',
    'jp': 'ja-JP'
  };
  return localeMap[lang] || 'en-US';
};

export default function ReferralDashboard() {
  const { t, lang } = useLang()
  const { data: myWallet, refetch: refetchMyWallet } = useQuery({
    queryKey: ['myWallet'],
    queryFn: () => TelegramWalletService.getmyWallet(),
  })
  const [referralLink, setReferralLink] = useState("")
  const [showReferralStructure, setShowReferralStructure] = useState(true)
  const [activeTab, setActiveTab] = useState<'refList' | 'history'>('refList')
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<ReferralUser | null>(null)
  const [copied, setCopied] = useState(false)
  const [copiedTxHash, setCopiedTxHash] = useState("")

  useEffect(() => {
    if (myWallet?.wallet_type) {
      setReferralLink(`${process.env.NEXT_PUBLIC_API_URL!}/?code=${myWallet?.referral_code}`)
    }
  }, [myWallet?.wallet_type, myWallet?.referral_code])

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
    toast.success(t('referral.copied'))
  }

  const { data: referralStatistics, isLoading: isLoadingReferralStatistics } = useQuery({
    queryKey: ['referralStatistics'],
    queryFn: () => getReferralStatistics(),
    enabled: !!myWallet?.wallet_type,
  })

  const { data: historyReferral, isLoading: isLoadingHistoryReferral } = useQuery({
    queryKey: ['historyReferral'],
    queryFn: () => getHistoryReferral(),
    enabled: !!myWallet?.wallet_type,
  })

  const { data: referralDetail, isLoading: isLoadingReferralDetail } = useQuery({
    queryKey: ['referralDetail', selectedUser?.sol_address],
    queryFn: () => getReferralDetail(selectedUser!.sol_address),
    enabled: !!selectedUser?.sol_address,
  })

  console.log("historyReferral", historyReferral)

  // Get locale for date formatting
  const currentLocale = getLocaleFromLang(lang);

  const openDetailModal = (user: ReferralUser) => {
    setSelectedUser(user)
    setIsDetailModalOpen(true)
  }

  const closeDetailModal = () => {
    setIsDetailModalOpen(false)
    setSelectedUser(null)
  }

  const handleCopyAddress = async (sol_address: string) => {
    if (!sol_address) return

    try {
      await navigator.clipboard.writeText(sol_address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error(t('deposit.failedToCopyAddress'))
    }
  }

  const handleCopyTxHash = async (tx_hash: string, id: number) => {

    try {
      await navigator.clipboard.writeText(tx_hash)
      setCopiedTxHash(id.toString())
      setTimeout(() => setCopiedTxHash(""), 2000)
    } catch (err) {
      toast.error(t('deposit.failedToCopyAddress'))
    }
  }

  return (
    <ProtectedRoute>
      <div className="h-svh relative xl:overflow-hidden flex flex-1 flex-col w-full justify-center">
        <div className="relative z-10">
          <div className="container mx-auto p-2 sm:p-3 md:p-4 xl:p-6 gap-2 sm:gap-3 md:gap-4 flex flex-col">
            {/* Referral Link Section */}
            <Card className="bg-dark-200 p-3 sm:p-4 xl:p-5 border-gray/30 border border-solid">
              <CardHeader className="px-0 pb-2 pt-0">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <CardTitle className="text-neutral text-base sm:text-lg font-medium capitalize mb-1">
                    {t('referral.yourReferralLink')}
                  </CardTitle>
                  {myWallet?.wallet_type && (
                    <span className={`text-white text-xs rounded-2xl max-h-7 items-center justify-center px-2 sm:px-3 py-[1px] leading-6 capitalize w-fit ${myWallet?.wallet_type === "normal" ? "bg-green-500" : "bg-yellow-600"}`}>
                      {t(`referral.${myWallet?.wallet_type}`)}
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="bg-gradient-to-t from-purple to-cyan rounded-xl p-[1px] pt-[1px] mb-3">
                {!myWallet?.wallet_type ? (
                  <div className="flex gap-1 sm:gap-2 bg-black rounded-xl px-2 py-2">
                    <LoadingSkeleton className="flex-1 h-6" />
                    <LoadingSkeleton className="w-8 h-8 rounded-xl" />
                  </div>
                ) : (
                  <div className="flex gap-1 sm:gap-2 bg-black rounded-xl px-2">
                    <Input
                      value={referralLink}
                      readOnly
                      className="bg-transparent border-slate-600 text-white border-none outline-none text-xs focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-sm"
                    />
                    <button onClick={copyReferralLink} className="bg-black hover:bg-slate-600 cursor-pointer text-white rounded-xl border-none p-2">
                      <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {isLoadingReferralStatistics ? (
                <>
                  <StatsCardSkeleton />
                  <StatsCardSkeleton />
                  <StatsCardSkeleton />
                </>
              ) : (
                <>
                  <Card className="bg-gradient-purple-cyan-60 h-auto min-h-[80px] sm:min-h-[90px]  flex flex-col justify-around border-primary-100 border border-solid rounded-xl backdrop-blur-sm p-3 xl:p-4">
                    <p className="text-neutral text-sm sm:text-base mb-1">{t('referral.totalReferrals')}</p>
                    <p className="text-lg sm:text-xl font-bold text-white">{referralStatistics?.total_referrals || 0}</p>
                  </Card>

                  <Card className="bg-gradient-purple-cyan-60 h-auto min-h-[80px] sm:min-h-[90px]  flex flex-col justify-around border-primary-100 border border-solid rounded-xl backdrop-blur-sm p-3 xl:p-4">
                    <p className="text-neutral text-sm sm:text-base mb-1">{t('referral.totalEarnings')}</p>
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 justify-around">
                      <p className="text-xs sm:text-sm xl:text-base font-medium text-white">
                        SOL: {referralStatistics?.total_reward_sol || 0}
                      </p>
                      <p className="text-xs sm:text-sm xl:text-base font-medium text-white">
                        MMP: {referralStatistics?.total_reward_mmp || 0}
                      </p>
                    </div>
                  </Card>
                  <Card className="bg-gradient-purple-cyan-60 h-auto min-h-[80px] sm:min-h-[90px]  flex flex-col justify-around border-primary-100 border border-solid rounded-xl backdrop-blur-sm p-3 xl:p-4 sm:col-span-2 lg:col-span-1">
                    <p className="text-neutral text-sm sm:text-base mb-1">{t('referral.activeReferrals')}</p>
                    <p className="text-lg sm:text-xl font-bold text-white">
                      {referralStatistics?.referred_wallets?.length || 0}
                    </p>
                  </Card>
                </>
              )}
            </div>

            {/* Referral Structure */}
            <Card className="bg-dark-200 p-3 sm:p-4 xl:p-5 border-gray/30 border border-solid">
              <CardHeader className="flex flex-row items-center justify-between px-0 pb-2 pt-0">
                <CardTitle className="text-neutral text-base sm:text-lg font-medium capitalize">{t('referral.referralStructure')}</CardTitle>
                <button onClick={() => setShowReferralStructure(!showReferralStructure)} className="border-none bg-gradient-to-t from-purple to-cyan text-slate-300 rounded-full px-2 sm:px-3 xl:px-4 py-1 text-xs sm:text-sm flex items-center gap-1 sm:gap-2 font-medium cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 active:scale-95">
                  <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${showReferralStructure ? 'rotate-180' : ''}`} />
                  {showReferralStructure ? t('referral.hide') : t('referral.show')}
                </button>
              </CardHeader>
              <CardContent className={`${showReferralStructure ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"} overflow-hidden transition-all duration-300 ease-in-out px-0`}>
                {isLoadingReferralStatistics ? (
                  <div className="space-y-4">
                    <LoadingSkeleton className="h-8 w-full" />
                    <LoadingSkeleton className="h-6 w-3/4" />
                    <LoadingSkeleton className="h-6 w-1/2" />
                  </div>
                ) : (
                  <ReferralStructure type={myWallet?.wallet_type} />
                )}
              </CardContent>
            </Card>

            {/* Referrals Table */}
            <Card className="bg-dark-200 p-3 sm:p-4 xl:p-5 border-gray/30 border border-solid flex flex-col gap-3 ">
              <CardHeader className="px-0 pb-0 pt-0">
                <CardTitle className="text-neutral text-base sm:text-lg font-medium capitalize pb-2">{t('referral.yourReferrals')}</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                {/* Mobile Table Layout */}
                <div className="block sm:hidden overflow-y-scroll">
                  {isLoadingReferralStatistics ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((index) => (
                        <ReferralCardSkeleton key={index} />
                      ))}
                    </div>
                  ) : referralStatistics && referralStatistics.referred_wallets.length > 0 ? (
                    <div className="overflow-y-scroll space-y-3">
                      {referralStatistics.referred_wallets.map((user: ReferralUser) => (
                        <div key={user.wallet_id} className="bg-dark-300 rounded-lg  border border-gray/30">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1"> <div className="w-8 h-8 bg-gradient-to-r from-purple to-cyan rounded-full flex items-center justify-center text-xs font-bold mr-3 shrink-0">
                              {user.sol_address.charAt(0).toUpperCase()}
                            </div>
                              <span className="font-medium text-sm truncate text-neutral">{truncateString(user.sol_address, 12)}</span></div>
                            <div className="flex flex-col items-end justify-center font-medium">
                              <div className="text-yellow-500 cursor-pointer hover:underline transition-colors" onClick={() => openDetailModal(user)}>{t('referral.detail')}</div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="text-slate-300">
                              <span className="text-neutral">Join: </span>
                              {new Date(user.created_at).toLocaleDateString(currentLocale, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </div>
                            <div className="text-right">
                              <span className="text-neutral">SOL: </span>
                              <span className="font-bold text-green-500">{user.total_reward_sol.toFixed(2)}</span>
                            </div>
                            <div className="text-right col-span-2">
                              <span className="text-neutral">MMP: </span>
                              <span className="font-bold text-green-500">{user.total_reward_mmp}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-neutral text-sm">
                      {t('referral.noReferredUsers')}
                    </div>
                  )}
                </div>

                {/* Desktop Table Layout */}
                <div className="hidden sm:flex flex-col border border-solid border-gray/30 rounded-xl p-2 sm:p-4">
                  <div className="grid grid-cols-6 gap-2 sm:gap-4 text-neutral text-xs sm:text-sm font-medium border-b border-t-0 border-l-0 border-r-0 border-solid border-gray/30 p-2 sm:p-4 pt-0">
                    <div className="text-neutral col-span-2">{t('referral.user')}</div>
                    <div className="text-neutral">{t('referral.joinDate')}</div>
                    <div className="text-neutral text-right">{t('referral.earnings')} (SOL)</div>
                    <div className="text-neutral text-right">{t('referral.earnings')} (MMP)</div>

                  </div>

                  {/* Table Data */}
                  {isLoadingReferralStatistics ? (
                    <div className="space-y-2 sm:space-y-3">
                      {[1, 2, 3, 4].map((index) => (
                        <TableRowSkeleton key={index} />
                      ))}
                    </div>
                  ) : referralStatistics && referralStatistics.referred_wallets.length > 0 ? (
                    <div className="space-y-2 sm:space-y-3">
                      {referralStatistics.referred_wallets.map((user: ReferralUser) => (
                        <div key={user.wallet_id} className="grid grid-cols-6 gap-2 sm:gap-4 text-white text-xs sm:text-sm py-2 sm:py-3 border-b border-slate-700/50 hover:bg-slate-700/20 rounded-lg px-1 sm:px-2 transition-colors last:border-b-0">
                          <div className="flex items-center col-span-2">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple to-cyan rounded-full flex items-center justify-center text-xs font-bold mr-2 sm:mr-3 shrink-0">
                              {user.sol_address.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium truncate">{truncateString(user.sol_address, 12)}</span> <Button
                              onClick={() => handleCopyAddress(user.sol_address)}
                              variant="ghost"
                              size="sm"
                              className="text-neutral hover:text-white bg-transparent border-none cursor-pointer p-1 sm:p-2 shrink-0"
                            >
                              {copied ? (
                                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                              ) : (
                                <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                              )}
                            </Button>
                          </div>
                          <div className="flex items-center text-slate-300">
                            {new Date(user.created_at).toLocaleDateString(currentLocale, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                          <div className="flex items-center justify-end lg:mr-[5%] font-bold text-green-500">
                            {user.total_reward_sol}
                          </div>
                          <div className="flex flex-col items-end justify-center font-bold">
                            <div className="text-green-500">{user.total_reward_mmp ?? 0} <span className="text-xs text-neutral">MMP</span></div>
                          </div>
                          <div className="flex flex-col items-end justify-center font-medium">
                            <div className="text-yellow-500 cursor-pointer hover:underline transition-colors" onClick={() => openDetailModal(user)}>{t('referral.detail')}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-neutral text-sm">
                      {t('referral.noReferredUsers')}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="bg-dark-200 border-gray/30 max-w-4xl max-h-[80vh] overflow-y-auto mx-2 sm:mx-auto">
          <DialogHeader>
            <DialogTitle className="text-neutral text-lg font-medium flex items-center justify-between">
              <span>{t('referral.referralDetail') || 'Referral Detail'}</span>
            </DialogTitle>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-4">
              {/* User Info */}
              <div className="bg-gray-900/60 rounded-lg p-3 sm:p-4 border border-gray/30">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r text-neutral from-purple to-cyan rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                      {selectedUser.sol_address.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="bg-gradient-purple-cyan bg-clip-text font-bold text-sm sm:text-base truncate">{truncateString(selectedUser.sol_address, 20)}</p>
                        <Button
                          onClick={() => handleCopyAddress(selectedUser.sol_address)}
                          variant="ghost"
                          size="sm"
                          className="text-neutral hover:text-white bg-transparent border-none cursor-pointer p-1 sm:p-2 shrink-0"
                        >
                          {copied ? (
                            <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          ) : (
                            <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                          )}
                        </Button>
                      </div>
                      <p className="text-neutral text-xs sm:text-sm italic font-normal mt-1">
                        {t('referral.joinDate')}: {new Date(selectedUser.created_at).toLocaleDateString(currentLocale, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Referral History */}
              <div className="bg-dark-300 rounded-lg py-3 sm:py-4 border border-gray/30">
                <h3 className="text-neutral font-medium mb-3 px-3 sm:px-0">{t('referral.referralHistory') || 'Referral History'}</h3>

                {isLoadingReferralDetail ? (
                  <div className="space-y-3 sm:space-y-0">
                    {/* Mobile Loading Layout */}
                    <div className="block sm:hidden px-3">
                      {[1, 2, 3].map((index) => (
                        <ReferralHistorySkeleton key={index} />
                      ))}
                    </div>

                    {/* Desktop Loading Layout */}
                    <div className="hidden sm:block overflow-x-auto bg-gray-900/60 rounded-lg p-2">
                      <div className="min-w-full">
                        <div className="grid grid-cols-4 gap-4 text-neutral text-sm border-b border-gray/30 p-2">
                          <LoadingSkeleton className="h-4 w-16" />
                          <LoadingSkeleton className="h-4 w-12" />
                          <LoadingSkeleton className="h-4 w-24" />
                          <LoadingSkeleton className="h-4 w-16" />
                        </div>
                        {[1, 2, 3].map((index) => (
                          <div key={index} className="grid grid-cols-4 gap-4 text-white text-sm py-2 border-b border-gray/20">
                            <LoadingSkeleton className="h-4 w-12" />
                            <LoadingSkeleton className="h-4 w-8" />
                            <LoadingSkeleton className="h-4 w-20" />
                            <LoadingSkeleton className="h-4 w-16" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : referralDetail?.data && referralDetail.data.length > 0 ? (
                  <div className="space-y-3 sm:space-y-0">
                    {/* Mobile Layout */}
                    <div className="block sm:hidden px-3">
                      {referralDetail.data.map((item: any) => (
                        <div key={item.id} className="bg-gray-900/60 rounded-lg p-3 mb-3 border border-gray/20">
                          <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                            <div className="text-neutral">{t('referral.reward') || 'Reward'}:</div>
                            <div className="text-white font-medium">{item.reward_amount}</div>

                            <div className="text-neutral">{t('referral.token') || 'Token'}:</div>
                            <div className={`text-white font-medium ${item.reward_token === 'SOL' ? 'text-purple-500' : 'text-primary-100'}`}>
                              {item.reward_token}
                            </div>

                            <div className="text-neutral">{t('referral.txHash') || 'Tx Hash'}:</div>
                            <div className="text-white font-mono text-xs break-all">
                              {truncateString(item.tx_hash, 20)}
                            </div>

                            <div className="text-neutral">{t('referral.date') || 'Date'}:</div>
                            <div className="text-neutral text-xs">
                              {new Date(item.created_at).toLocaleDateString(currentLocale, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden sm:block overflow-x-auto bg-gray-900/60 rounded-lg p-2">
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr className="text-neutral border-b border-gray/30">
                            <th className="py-2 px-3 text-left">{t('referral.reward') || 'Reward'}</th>
                            <th className="py-2 px-3 text-left">{t('referral.token') || 'Token'}</th>
                            <th className="py-2 px-3 text-left">{t('referral.txHash') || 'Transaction Hash'}</th>
                            <th className="py-2 px-3 text-left">{t('referral.date') || 'Date'}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {referralDetail.data.map((item: any) => (
                            <tr key={item.id} className="border-b border-gray/20 hover:bg-slate-700/10">
                              <td className="py-2 px-3 text-white">{item.reward_amount}</td>
                              <td className={`py-2 px-3 text-white ${item.reward_token === 'SOL' ? 'text-purple-500' : 'text-primary-100'}`}>{item.reward_token}</td>
                              <td className="py-2 px-3 text-white font-mono text-xs">
                                {truncateString(item.tx_hash, 15)}
                                <Button
                                  onClick={() => handleCopyTxHash(item.tx_hash, item.id)}
                                  variant="ghost"
                                  size="sm"
                                  className="text-neutral hover:text-white bg-transparent border-none cursor-pointer p-1 sm:p-2"
                                >
                                  {copiedTxHash === item.id.toString() ? (
                                    <Check className="w-3 h-3 text-green-500" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </Button>
                              </td>
                              <td className="py-2 px-3 text-neutral">
                                {new Date(item.created_at).toLocaleDateString(currentLocale, {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-neutral px-3 sm:px-0">
                    {t('referral.noHistory') || 'No referral history found'}
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </ProtectedRoute>
  )
}
