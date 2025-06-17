"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Copy, X, HelpCircle } from "lucide-react"
import { toast } from "react-toastify"
import ReferralStructure from "./referral-structure"

interface ReferralStats {
  totalReferrals: number
  totalEarnings: number
  activeReferrals: number
}

export default function ReferralDashboard() {
  const [referralLink] = useState("https://memepump.vip/ref")
  const [activeLevel, setActiveLevel] = useState("All")
  const [stats] = useState<ReferralStats>({
    totalReferrals: 32,
    totalEarnings: 0.0,
    activeReferrals: 0,
  })

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
    toast.success("Copied!")
  }

  const levels = ["All", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6", "Level 7"]

  return (
    <div className="min-h-screen bg-black/60 relative overflow-hidden">

      <div className="relative z-10">
        <div className="container mx-auto p-6 space-y-6">
          {/* Referral Link Section */}
          <Card className="bg-black/60">
            <CardHeader>
              <CardTitle className="text-white">Your Referral Link</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  value={referralLink}
                  readOnly
                  className="bg-transparent border-slate-600 text-white font-mono"
                />
                <Button onClick={copyReferralLink} size="icon" className="bg-slate-700 hover:bg-slate-600 text-white">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border-blue-500/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div>
                  <p className="text-blue-200 text-sm mb-1">Total Referrals</p>
                  <p className="text-3xl font-bold text-white">{stats.totalReferrals} MMP</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border-blue-500/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm mb-1">Total Earnings</p>
                    <p className="text-3xl font-bold text-white">${stats.totalEarnings.toFixed(5)}</p>
                  </div>
                  <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-sm">Withdraw</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border-blue-500/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div>
                  <p className="text-blue-200 text-sm mb-1">Active Referrals</p>
                  <p className="text-3xl font-bold text-white">{stats.activeReferrals}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Referral Structure */}
          <Card className="bg-transparent border-slate-700 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Referral Structure</CardTitle>
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                <HelpCircle className="w-4 h-4 mr-2" />
                Help
              </Button>
            </CardHeader>
            <CardContent>
              <ReferralStructure />
            </CardContent>
          </Card>

          {/* Referrals Table */}
          <Card className="bg-transparent border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Your Referrals</CardTitle>
              <div className="flex gap-4 mt-4">
                <Button variant="outline" className="border-cyan-500 text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20">
                  Referred Users
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-400 hover:bg-slate-700">
                  Level Referral
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Level Filter Buttons */}
              <div className="flex flex-wrap gap-2 mb-6">
                {levels.map((level) => (
                  <Button
                    key={level}
                    variant={activeLevel === level ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveLevel(level)}
                    className={
                      activeLevel === level
                        ? "bg-cyan-500 text-white hover:bg-cyan-600"
                        : "border-slate-600 text-slate-400 hover:bg-slate-700"
                    }
                  >
                    {level}
                  </Button>
                ))}
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-4 gap-4 text-slate-400 text-sm font-medium border-b border-slate-700 pb-3 mb-4">
                <div>User</div>
                <div>Join Date</div>
                <div>Level</div>
                <div>Earnings</div>
              </div>

              {/* Empty State */}
              <div className="text-center py-12 text-slate-400">No referred users at this level.</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
