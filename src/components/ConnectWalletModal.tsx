"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/ui/dialog"
import { Button } from "@/app/ui/button"
import { useAuth } from "@/hooks/useAuth"

interface ConnectWalletModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ConnectWalletModal({ open, onOpenChange }: ConnectWalletModalProps) {
  const { login } = useAuth()
  const [isConnecting, setIsConnecting] = useState(false)

  const handleTelegramConnect = async () => {
    setIsConnecting(true)
    try {
      // Redirect to Telegram login
      const telegramBotUsername = "your_telegram_bot_username" // Replace with actual bot username
      const redirectUrl = encodeURIComponent(window.location.origin + "/tglogin")
      const telegramAuthUrl = `https://t.me/${telegramBotUsername}?start=${redirectUrl}`
      window.open(telegramAuthUrl, "_blank")
    } catch (error) {
      console.error("Telegram connection error:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleGoogleConnect = async () => {
    setIsConnecting(true)
    try {
      // Implement Google OAuth login
      // For now, just simulate the login
      setTimeout(() => {
        login('google')
        onOpenChange(false)
        setIsConnecting(false)
      }, 1000)
    } catch (error) {
      console.error("Google connection error:", error)
      setIsConnecting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent className="bg-black/60 border-[#d7d7d7]/20 text-white max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="bg-gradient-purple-cyan bg-clip-text text-2xl font-bold kati-font text-center">
            Connect Wallet
          </DialogTitle>
        </DialogHeader>
        <div className="text-center mt-4">
          <p className="text-[#d7d7d7] text-sm">
            Connect with us through multiple flexible login methods
          </p>
        </div>
        <div className="flex justify-around">
          {/* Telegram Connect Button */}
          <button
            onClick={handleTelegramConnect}
            disabled={isConnecting}
            className="bg-transparent group mt-0 cursor-pointer flex-col border-none font-medium py-4 text-base kati-font flex items-center justify-between  gap-3"
          >
            <img src="/tele-icon.png" alt="Telegram" className="w-10 h-10 p-1" />
            <span className="text-white group-hover:text-primary">Telegram</span>
          </button>

          {/* Google Connect Button */}
          <button
            onClick={handleGoogleConnect}
            disabled={isConnecting}
            className=" bg-transparent mt-0 cursor-pointer  border-none text-white font-medium py-4 text-base kati-font flex flex-col items-center justify-between gap-3"
          >
            <img src="/google-color-icon.png" alt="Google" className="w-10 h-10" />
            <span className="text-white group-hover:text-primary">Google</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 