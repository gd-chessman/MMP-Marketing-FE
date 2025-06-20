"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card"
import { Input } from "@/ui/input"
import { Copy, ChevronDown, User, Star } from "lucide-react"
import { toast } from "react-toastify"
import ReferralStructure from "./referral-structure"
import { useLang } from "@/lang/useLang"
import { useQuery } from "@tanstack/react-query"
import { TelegramWalletService } from '@/services/api'
import { getReferralStatistics } from "@/services/api/ReferralService"
import { truncateString } from "@/utils/format"

interface ReferralUser {
  wallet_id: number;
  sol_address: string;
  created_at: Date;
  total_reward_sol: number;
  total_reward_mmp: number;
  total_reward_mpb: number;
}

export default function ReferralDashboard() {
  const { t } = useLang()
  const { data: myWallet, refetch: refetchMyWallet } = useQuery({
    queryKey: ['myWallet'],
    queryFn: () => TelegramWalletService.getmyWallet(),
  })
  const [referralLink, setReferralLink] = useState("")
  const [showReferralStructure, setShowReferralStructure] = useState(true)

  useEffect(() => {
    if (myWallet?.wallet_type) {
      setReferralLink(`${process.env.NEXT_PUBLIC_API_URL!}/ref?code=${myWallet?.referral_code}`)
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

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10">
        <div className="container mx-auto p-6 gap-4 flex flex-col">
          {/* Referral Link Section */}
          <Card className="bg-dark-200 p-5 border-gray/30 border border-solid">
            <CardHeader className="px-0 pb-2 pt-0">
              <div className="flex gap-4"><CardTitle className="text-neutral text-lg font-medium capitalize mb-1">{t('referral.yourReferralLink')}</CardTitle>
                {myWallet?.wallet_type && (
                  <span className={`text-white text-xs rounded-2xl max-h-7 items-center justify-center px-3 py-[1px] leading-6 capitalize ${myWallet?.wallet_type === "normal" ? "bg-green-500" : "bg-yellow-600"}`}>
                    {t(`referral.${myWallet?.wallet_type}`)}
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent className="bg-gradient-to-t from-purple to-cyan rounded-xl p-[1px] pt-[1px] mb-3">
              <div className="flex gap-2 bg-black rounded-xl px-2">
                <Input
                  value={referralLink}
                  readOnly
                  className="bg-transparent border-slate-600 text-white border-none outline-none"
                />
                <button onClick={copyReferralLink} className="bg-black hover:bg-slate-600 text-white rounded-xl border-none">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-purple-cyan-60 h-[110px] flex flex-col justify-around border-primary-100 border border-solid rounded-xl backdrop-blur-sm p-4">
                <p className="text-neutral text-base mb-1">{t('referral.totalReferrals')}</p>
                <p className="text-xl font-bold text-white">{referralStatistics?.total_referrals || 0}</p>
            </Card>

            <Card className="bg-gradient-purple-cyan-60 h-[110px] flex flex-col justify-around border-primary-100 border border-solid rounded-xl backdrop-blur-sm p-4">
              <p className="text-neutral text-base mb-1">{t('referral.totalEarnings')}</p>
              <div className="flex gap-2 justify-between">
                <p className="text-xl font-bold text-white">
                  MMP: {referralStatistics?.total_reward_mmp || 0}
                </p>
                <p className="text-xl font-bold text-white">
                MPB: {referralStatistics?.total_reward_mpb || 0}
              </p>
            </div>
            </Card>
            <Card className="bg-gradient-purple-cyan-60 h-[110px] flex flex-col justify-around border-primary-100 border border-solid rounded-xl backdrop-blur-sm p-4">
              <p className="text-neutral text-base mb-1">{t('referral.activeReferrals')}</p>
              <p className="text-xl font-bold text-white">
                {referralStatistics?.referred_wallets?.length || 0}
              </p>
            </Card>
          </div>

          {/* Referral Structure */}
          <Card className="bg-dark-200 p-5 border-gray/30 border border-solid">
            <CardHeader className="flex flex-row items-center justify-between px-0 pb-2 pt-0">
              <CardTitle className="text-neutral text-lg font-medium capitalize">{t('referral.referralStructure')}</CardTitle>
              <button onClick={() => setShowReferralStructure(!showReferralStructure)} className="border-none bg-gradient-to-t from-purple to-cyan text-slate-300 rounded-full px-4 py-1 text-sm flex items-center gap-2 font-medium cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 active:scale-95">
                <ChevronDown className={`w-4 h-4 transition-transform ${showReferralStructure ? 'rotate-180' : ''}`} />
                {showReferralStructure ? t('referral.hide') : t('referral.show')}
              </button>
            </CardHeader>
            <CardContent className={`${showReferralStructure ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"} overflow-hidden transition-all duration-300 ease-in-out px-0`}>
              <ReferralStructure type={myWallet?.wallet_type} />
            </CardContent>
          </Card>

          {/* Referrals Table */}
          <Card className="bg-dark-200 p-5 border-gray/30 border border-solid flex flex-col gap-5">
            <CardHeader className="px-0 pb-2 pt-0">
              <CardTitle className="text-neutral text-lg font-medium capitalize pb-4">{t('referral.yourReferrals')}</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              {/* Table Header */}
              <div className="flex flex-col border border-solid border-gray/30 rounded-xl p-4">
                <div className="grid grid-cols-5 gap-4 text-neutral text-sm font-medium border-b border-t-0 border-l-0 border-r-0 border-solid border-gray/30 p-4 pt-0">
                  <div className="text-neutral col-span-2">{t('referral.user')}</div>
                  <div className="text-neutral">{t('referral.joinDate')}</div>
                  <div className="text-neutral text-right">{t('referral.earnings')} (SOL)</div>
                  <div className="text-neutral text-right">{t('referral.earnings')} (MMP/MPB)</div>
                </div>

                {/* Table Data */}
                {isLoadingReferralStatistics ? (
                  <div className="text-center py-8 text-neutral">Loading...</div>
                ) : referralStatistics && referralStatistics.referred_wallets.length > 0 ? (
                  <div className="space-y-3">
                    {referralStatistics.referred_wallets.map((user: ReferralUser) => (
                      <div key={user.wallet_id} className="grid grid-cols-5 gap-4 text-white text-sm py-3 border-b border-slate-700/50 hover:bg-slate-700/20 rounded-lg px-2 transition-colors last:border-b-0">
                        <div className="flex items-center col-span-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple to-cyan rounded-full flex items-center justify-center text-xs font-bold mr-3 shrink-0">
                            {user.sol_address.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium truncate">{truncateString(user.sol_address, 12)}</span>
                        </div>
                        <div className="flex items-center text-slate-300">
                          {new Date(user.created_at).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center justify-end font-bold text-green-500">
                          {user.total_reward_sol.toFixed(2)}
                        </div>
                        <div className="flex flex-col items-end font-bold">
                          <div className="text-green-500">{user.total_reward_mmp} <span className="text-xs text-neutral">MMP</span></div>
                          <div className="text-green-500">{user.total_reward_mpb} <span className="text-xs text-neutral">MPB</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-neutral">
                    {t('referral.noReferredUsers')}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
