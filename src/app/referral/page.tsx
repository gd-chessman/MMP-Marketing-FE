"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card"
import { Input } from "@/ui/input"
import { Copy, X, HelpCircle, ArrowUpRight, ArrowDown, MoveDownIcon, ChevronDown } from "lucide-react"
import { toast } from "react-toastify"
import ReferralStructure from "./referral-structure"
import { useLang } from "@/lang/useLang"

interface ReferralStats {
  totalReferrals: number
  totalEarnings: number
  activeReferrals: number
}

interface ReferralUser {
  id: string
  username: string
  joinDate: string
  level: number
  earnings: number
}
interface ReferralLevel {
  level: number
  referralCount: number
  claimableVolume: number
  lifetimeVolume: number
}

export default function ReferralDashboard() {
  const { t } = useLang()
  const [referralLink] = useState("https://memepump.vip/ref")
  const [activeLevel, setActiveLevel] = useState(t('referral.levels.all'))
  const [activeTab, setActiveTab] = useState("All")
  const [showReferralStructure, setShowReferralStructure] = useState(true)
  const [stats] = useState<ReferralStats>({
    totalReferrals: 32,
    totalEarnings: 0.0,
    activeReferrals: 0,
  })

  // Fake referral data
  const [referralUsers] = useState<ReferralUser[]>([
    {
      id: "1",
      username: "crypto_whale_2024",
      joinDate: "2024-01-15",
      level: 1,
      earnings: 1250.50
    },
    {
      id: "2",
      username: "meme_lord_69",
      joinDate: "2024-01-20",
      level: 2,
      earnings: 890.25
    },
    {
      id: "3",
      username: "pump_master",
      joinDate: "2024-02-01",
      level: 1,
      earnings: 2100.75
    },
    {
      id: "4",
      username: "diamond_hands",
      joinDate: "2024-02-10",
      level: 3,
      earnings: 450.00
    },
    {
      id: "5",
      username: "hodl_forever",
      joinDate: "2024-02-15",
      level: 1,
      earnings: 1750.30
    }
  ])
  const referralLevels: ReferralLevel[] = [
    { level: 1, referralCount: 0, claimableVolume: 0, lifetimeVolume: 0 },
    { level: 2, referralCount: 0, claimableVolume: 0, lifetimeVolume: 0 },
    { level: 3, referralCount: 0, claimableVolume: 0, lifetimeVolume: 0 },
    { level: 4, referralCount: 0, claimableVolume: 0, lifetimeVolume: 0 },
    { level: 5, referralCount: 0, claimableVolume: 0, lifetimeVolume: 0 },
    { level: 6, referralCount: 0, claimableVolume: 0, lifetimeVolume: 0 },
    { level: 7, referralCount: 0, claimableVolume: 0, lifetimeVolume: 0 },
  ]

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
    toast.success(t('referral.copied'))
  }

  const levels = [
    t('referral.levels.all'),
    t('referral.levels.level1'),
    t('referral.levels.level2'),
    t('referral.levels.level3'),
    t('referral.levels.level4'),
    t('referral.levels.level5'),
    t('referral.levels.level6'),
    t('referral.levels.level7')
  ]

  // Filter users based on active level
  const filteredUsers = activeLevel === t('referral.levels.all')
    ? referralUsers
    : referralUsers.filter(user => `${t('referral.level')} ${user.level}` === activeLevel)

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(4)}`
  }

  return (
    <div className="min-h-screen  relative overflow-hidden">

      <div className="relative z-10">
        <div className="container mx-auto p-6 gap-4 flex flex-col">
          {/* Referral Link Section */}
          <Card className="bg-dark-200 p-5 border-gray/30 border border-solid">
            <CardHeader className="px-0 pb-2 pt-0">
              <CardTitle className="text-neutral text-lg font-medium capitalize mb-1">{t('referral.yourReferralLink')}</CardTitle>
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
            <Card className="bg-gradient-purple-cyan-60 border-primary-100 border border-solid rounded-xl backdrop-blur-sm">
              <CardContent className="p-4 h-full flex flex-col  justify-center">
                <p className="text-neutral text-base mb-1">{t('referral.totalReferrals')}</p>
                <p className="text-xl font-bold text-white">{stats.totalReferrals} MMP</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-purple-cyan-60 border-primary-100 border border-solid rounded-xl backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral text-base mb-1">{t('referral.totalEarnings')}</p>
                    <p className="text-xl font-bold text-white">${stats.totalEarnings.toFixed(5)}</p>
                  </div>
                  <button className="group bg-gradient-to-t from-green to-green-light text-white border-none rounded-full py-2 px-6 text-sm flex items-center gap-2 font-bold cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 active:scale-95">
                    <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
                    {t('referral.withdraw')}
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-purple-cyan-60 border-primary-100 border border-solid rounded-xl backdrop-blur-sm">
              <CardContent className="p-6">
                <div>
                  <p className="text-neutral text-base mb-1">{t('referral.activeReferrals')}</p>
                  <p className="text-xl font-bold text-white">{stats.activeReferrals}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Referral Structure */}
          <Card className="bg-dark-200 p-5 border-gray/30 border border-solid">
            <CardHeader className="flex flex-row items-center justify-between px-0 pb-2 pt-0">
              <CardTitle className="text-neutral text-lg font-medium capitalize">{t('referral.referralStructure')}</CardTitle>
              <button onClick={() => setShowReferralStructure(!showReferralStructure)} className="border-none bg-gradient-to-t from-purple to-cyan text-slate-300 rounded-full px-4 py-1 text-sm flex items-center gap-2 font-medium cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 active:scale-95">
                <ChevronDown className="w-4 h-4" />
                {t('referral.hide')}
              </button>
            </CardHeader>
              <CardContent className={`${showReferralStructure ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"} overflow-hidden transition-all duration-200 ease-in-out`}>
                  <ReferralStructure />
                </CardContent>
          </Card>

          {/* Referrals Table */}
          <Card className="bg-dark-200 p-5 border-gray/30 border border-solid flex flex-col gap-5">
            <CardHeader className="px-0 pb-2 pt-0">
              <CardTitle className="text-neutral text-lg font-medium capitalize pb-4">{t('referral.yourReferrals')}</CardTitle>
              <div className="flex gap-4 mt-0">
                <button onClick={() => setActiveTab("All")} className={`  p-1 bg-transparent text-sm font-medium cursor-pointer  capitalize ${activeTab === "All"
                  ? "text-primary-100 boder-b border-primary border-solid border-t-0 border-x-0"
                  : "border-none text-gray-100"}`
                }>
                  {t('referral.referredUsers')}
                </button>
                <button onClick={() => setActiveTab("LevelReferral")} className={`  p-1 bg-transparent text-sm font-medium cursor-pointer  capitalize ${activeTab === "LevelReferral"
                  ? "text-primary-100 boder-b border-primary border-solid border-t-0 border-x-0"
                  : "border-none text-gray-100"}`
                }>
                  {t('referral.levelReferral')}
                </button>
              </div>
            </CardHeader>
            <CardContent>
              {activeTab === "All" ?
                <>
                  {/* Level Filter buttons */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {levels.map((level) => (
                      <button
                        key={level}
                        onClick={() => setActiveLevel(level)}
                        className={` border-none text-neutral px-4 py-1 rounded-lg text-sm font-medium cursor-pointer capitalize ${activeLevel === level
                          ? "bg-cyan-500  hover:bg-cyan-600"
                          : "bg-gray-200/25 hover:bg-slate-700"}`
                        }
                      >
                        {level}
                      </button>
                    ))}
                  </div>

                  {/* Table Header */}
                  <div className="flex flex-col border border-solid border-gray/30 rounded-xl p-4">
                    <div className="grid grid-cols-4 gap-4 text-slate-400 text-sm font-medium border-b border-t-0 border-l-0 border-r-0 border-solid border-gray/30 p-4 pt-0">
                      <div className="text-neutral">{t('referral.user')}</div>
                      <div className="text-neutral">{t('referral.joinDate')}</div>
                      <div className="text-neutral">{t('referral.level')}</div>
                      <div className="text-neutral">{t('referral.earnings')}</div>
                    </div>

                    {/* Table Data */}
                    {filteredUsers.length > 0 ? (
                      <div className="space-y-3">
                        {filteredUsers.map((user) => (
                          <div key={user.id} className="grid grid-cols-4 gap-4 text-white text-sm py-3 border-b border-slate-700/50 hover:bg-slate-700/20 rounded-lg px-2 transition-colors">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gradient-to-r from-purple to-cyan rounded-full flex items-center justify-center text-xs font-bold mr-3">
                                {user.username.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-medium">{user.username}</span>
                            </div>
                            <div className="flex items-center text-slate-300">
                              {new Date(user.joinDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </div>
                            <div className="flex items-center">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.level === 1 ? 'bg-green-500/20 text-green-400' :
                                user.level === 2 ? 'bg-blue-500/20 text-blue-400' :
                                  user.level === 3 ? 'bg-purple-500/20 text-purple-400' :
                                    'bg-gray-500/20 text-gray-400'
                                }`}>
                                {t('referral.level')} {user.level}
                              </span>
                            </div>
                            <div className="flex items-center font-medium text-green-400">
                              ${user.earnings.toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-slate-400">{t('referral.noReferredUsers')}</div>
                    )}
                  </div>
                </> :
                <div className="flex flex-col gap-4 px-10" >
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="bg-transparent rounded-lg px-4 py-3 text-neutral font-medium h-7"></div>
                    </div>
                    <div className="text-center">
                      <div className="bg-slate-700 rounded-lg px-4 py-2 text-neutral font-medium">{t('referral.referralCount')}</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-slate-700 rounded-lg px-4 py-2 text-neutral font-medium">{t('referral.claimableVolume')}</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-slate-700 rounded-lg px-4 py-2 text-neutral font-medium">{t('referral.lifetimeVolume')}</div>
                    </div>
                  </div>

                  {/* Table Rows */}
                  <div className="flex flex-col gap-4">
                    {referralLevels.map((level) => (
                      <div key={level.level} className="grid grid-cols-4 gap-4">
                        {/* Level Badge */}
                        <div className="text-center">
                          <div className="bg-blue-100 rounded-lg px-4 py-2 text-white font-medium shadow-lg">
                            {t('referral.levelReferralText')} {level.level}
                          </div>
                        </div>

                        {/* Referral Count */}
                        <div className="text-center">
                          <div className="bg-slate-700 rounded-lg px-4 py-2 text-white font-medium">{level.referralCount}</div>
                        </div>

                        {/* Claimable Volume */}
                        <div className="text-center">
                          <div className="bg-slate-700 rounded-lg px-4 py-2 text-green-100 font-medium">
                            {formatCurrency(level.claimableVolume)}
                          </div>
                        </div>

                        {/* Lifetime Volume */}
                        <div className="text-center">
                          <div className="bg-slate-700 rounded-lg px-4 py-2 text-green-100 font-medium">
                            {formatCurrency(level.lifetimeVolume)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              }
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
