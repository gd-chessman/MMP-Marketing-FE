"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog"
import { Button } from "@/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { useLang } from "@/lang/useLang"
import { PhantomWalletService } from "@/services/api"
import { toast } from "react-toastify"

interface ConnectWalletModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ConnectWalletModal({ open, onOpenChange }: ConnectWalletModalProps) {
  const { login, isAuthenticated } = useAuth()
  const { t } = useLang()
  const [isConnecting, setIsConnecting] = useState(false)

  // Auto close modal when user is authenticated
  useEffect(() => {
    if (isAuthenticated && open) {
      onOpenChange(false)
    }
  }, [isAuthenticated, open, onOpenChange])

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
        setIsConnecting(false)
      }, 1000)
    } catch (error) {
      console.error("Google connection error:", error)
      setIsConnecting(false)
    }
  }

  const handlePhantomConnect = async () => {
    setIsConnecting(true)
    try {
      // Check if Phantom wallet is installed
      if (!PhantomWalletService.isPhantomInstalled()) {
        toast.error(t('connectWalletModal.phantomNotInstalled'));
        window.open('https://phantom.app/', '_blank');
        return;
      }

      // Redirect to phantom login page
      window.location.href = '/phantom-login';
    } catch (error: any) {
      console.error("Phantom connection error:", error)
      toast.error(error.message || t('connectWalletModal.phantomConnectionFailed'));
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent className="bg-black/80 border-[#d7d7d7]/20 text-white max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="bg-gradient-purple-cyan bg-clip-text text-2xl font-bold kati-font text-center">
            {t("connectWalletModal.title")}
          </DialogTitle>
        </DialogHeader>
        <div className="text-center mt-4">
          <p className="text-[#d7d7d7] text-sm">
            {t("connectWalletModal.description")}
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
            <span className="text-white group-hover:text-primary">{t("connectWalletModal.telegram")}</span>
          </button>

          {/* Phantom Connect Button */}
          <button
            onClick={handlePhantomConnect}
            disabled={isConnecting}
            className="bg-transparent group mt-0 cursor-pointer flex-col border-none font-medium py-4 text-base kati-font flex items-center justify-between  gap-3"
          >
            <img src="/phantom.png" alt="Phantom" className="w-10 h-10 p-1" />
            <span className="text-white group-hover:text-primary">{t("connectWalletModal.phantom")}</span>
          </button>

          {/* Google Connect Button */}
          <button
            onClick={handleGoogleConnect}
            disabled={isConnecting}
            className=" bg-transparent mt-0 cursor-pointer  border-none text-white font-medium py-4 text-base kati-font flex flex-col items-center justify-between gap-3"
          >
            <img src="/google-color-icon.png" alt="Google" className="w-10 h-10" />
            <span className="text-white group-hover:text-primary">{t("connectWalletModal.google")}</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 