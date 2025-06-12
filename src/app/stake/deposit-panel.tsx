"use client"

import { useState } from "react"
import { Input } from "@/app/ui/input"
import { Button } from "@/app/ui/button"
import { Pencil } from "lucide-react"

export default function DepositPanel() {
  const [depositAmount, setDepositAmount] = useState<string>("0.00")
  const [stakeName, setStakeName] = useState<string>("")
  const [selectedRate, setSelectedRate] = useState<string>("5%")

  const rates = [
    { value: "2%", color: "bg-gray-600" },
    { value: "5%", color: "bg-cyan-500" },
    { value: "6%", color: "bg-gray-600" },
    { value: "7%", color: "bg-gray-600" },
  ]

  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20">
      <div className="text-center mb-6">
        <h2 className="bg-gradient-purple-cyan bg-clip-text text-3xl font-bold leading-7 kati-font text-center mb-4">Deposit MMP</h2>
        <h3 className="bg-gradient-purple-cyan bg-clip-text text-3xl font-bold leading-7 kati-font text-center mb-4">Earn Continuously</h3>
      </div>

      {/* Total MMP Stats */}
      <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl p-4 mb-4 border border-purple-500/30">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-300 mb-1">Total MMP Deposited</p>
            <p className="text-4xl font-bold text-white">2</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Projected MMP Yield</p>
            <p className="text-lg font-semibold text-cyan-400">0.12</p>
          </div>
        </div>
      </div>

      {/* Available Balance */}
      <div className="bg-black/50 rounded-xl p-4 mb-6 border border-gray-700/50">
        <p className="text-center text-gray-300">
          Available Balance: <span className="font-bold text-white">2 MMP</span>
        </p>
      </div>

      {/* Deposit Section */}
      <div className="space-y-4">
        <div className="bg-black/60 rounded-xl p-4 border border-gray-700/50">
          <p className="text-sm text-gray-400 mb-3">Deposit</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-cyan-400 rounded-full mr-3 flex items-center justify-center">
                <span className="text-black text-xs font-bold">X</span>
              </div>
              <span className="text-white font-medium">MMP</span>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-white">{depositAmount}</p>
              <p className="text-xs text-gray-400">≈ 0.00 USD</p>
            </div>
          </div>
        </div>

        {/* Name Stake Input */}
        <div className="relative">
          <Input
            placeholder="Name Stake"
            value={stakeName}
            onChange={(e) => setStakeName(e.target.value)}
            className="bg-black/60 border-gray-700/50 text-white placeholder:text-gray-500 pr-10 rounded-xl h-12"
          />
          <Pencil className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        {/* Interest Rate Selection */}
        <div className="grid grid-cols-4 gap-2">
          {rates.map((rate) => (
            <Button
              key={rate.value}
              variant="outline"
              className={`h-10 rounded-xl border-gray-600/50 text-white font-medium transition-all duration-200 ${
                selectedRate === rate.value
                  ? "bg-cyan-500 border-cyan-400 hover:bg-cyan-600"
                  : "bg-black/40 hover:bg-gray-700/50"
              }`}
              onClick={() => setSelectedRate(rate.value)}
            >
              {rate.value}
            </Button>
          ))}
        </div>

        {/* Stake Button */}
        <Button className="w-full h-12 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105">
          STAKE
        </Button>
      </div>
    </div>
  )
}
