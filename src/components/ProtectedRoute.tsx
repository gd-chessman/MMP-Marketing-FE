"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/useAuth"
import { ConnectWalletModal } from "@/components/ConnectWalletModal"
import { useLang } from "@/lang/useLang"
import { usePathname } from "next/navigation"

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth()
  const { t } = useLang()
  const [showConnectModal, setShowConnectModal] = useState(false)
  const pathname = usePathname()
  const isPublicPage = ["/swap", "/white-paper"].includes(pathname)
  if (!isAuthenticated && !isPublicPage) {
    return (
      <>
        {fallback || (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center bg-black/60 p-10 rounded-xl">
              <div className="mb-6">
                <img src="/mmp-logo.png" alt="MMP Logo" className="w-24 h-24 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-white mb-2">
                  {t('protectedRoute.welcome')}
                </h1>
                <p className="text-[#d7d7d7] text-sm">
                  {t('protectedRoute.connectWalletRequired')}
                </p>
              </div>
              <button
                onClick={() => setShowConnectModal(true)}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 cursor-pointer border-none hover:to-cyan-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                {t('protectedRoute.connectWallet')}
              </button>
            </div>
          </div>
        )}
        <ConnectWalletModal 
          open={showConnectModal} 
          onOpenChange={setShowConnectModal} 
        />
      </>
    )
  }

  return <>{children}</>
} 