'use client'

import React, { useEffect, useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { cn } from '@/utils/cn'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TelegramWalletService } from '@/services/api'
import { useAuth } from '@/hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import { truncateString } from '@/utils/format'
import { ArrowDownIcon, ChevronDown, CopyIcon, LogOut } from 'lucide-react'

const Header = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [showDropdown, setShowDropdown] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated, loginMethod, logout } = useAuth();
  console.log("isAuthenticated", isAuthenticated)
  console.log("loginMethod", loginMethod)

  const tabs = [
    { id: 'overview', href: '/', label: 'Overview', icon: '📊' },
    { id: 'swap', href: '/swap', label: 'Swap', icon: '🔄' },
    { id: 'stake', href: '/stake', label: 'Stake', icon: '🔒' },
    { id: 'referral', href: '/referral', label: 'Referral', icon: '👥' },
  ]
  const { data: myWallet } = useQuery({
    queryKey: ['myWallet'],
    queryFn: () => TelegramWalletService.getmyWallet(),
  })
  console.log("myWallet", myWallet)
  const handleGoogleSignIn = async () => {
    window.open(`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=email%20profile&access_type=offline`)
    console.log("handleGoogleSignIn")
  }

  const handleLogout = () => {
    logout()
    setShowDropdown(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.user-dropdown')) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const getLoginMethodIcon = () => {
    switch (loginMethod) {
      case 'telegram':
        return <img src="/tele-icon.png" alt="telegram" className='w-4 h-4' />
      case 'google':
        return <img src="/gg-icon.png" alt="google" className='w-4 h-4' />
      default:
        return null
    }
  }

  const getLoginMethodText = () => {
    switch (loginMethod) {
      case 'telegram':
        return 'Telegram'
      case 'google':
        return 'Google'
      default:
        return 'Unknown'
    }
  }

  return (
    <header className="w-full bg-overlay backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="px-[16px] lg:px-[40px] flex flex-col gap-6 relative mx-auto z-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/mmp-logo.png"
              alt="MMP Logo"
              className="h-10 w-auto cursor-pointer"
            />
          </Link>

          {/* Navigation Tabs */}
          <nav className="flex-1 gap-[100px] flex justify-center items-center">
            {tabs.map((tab) => (
              <Link className={cn('text-sm text-neutral font-medium cursor-pointer', pathname === tab.href && 'bg-gradient-purple-cyan bg-clip-text')} href={tab.href} key={tab.id}>
                {tab.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative user-dropdown">
                <div
                  className='flex items-center gap-2 text-sm text-neutral font-medium cursor-pointer hover:opacity-80 transition-opacity'
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {getLoginMethodIcon()}
                  {truncateString(myWallet?.sol_address, 12)}
                  <ChevronDown className="w-4 h-4" />
                </div>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-72 bg-dark-100 rounded-xl shadow-lg border border-gray-200 py-1 z-50">
                    <div className="flex flex-col gap-2 px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                      <div className="font-medium flex items-center gap-2 text-neutral">
                        {getLoginMethodIcon()}
                        {getLoginMethodText()} Login
                      </div>
                      <div className='flex items-center gap-1 mt-1'>
                        <span className="text-xs text-neutral">Wallet Address: </span>
                        <span className="text-xs bg-gradient-purple-cyan bg-clip-text break-all">{truncateString(myWallet?.sol_address, 12)}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex border-t border-gray-100/50 rounded-b-xl cursor-pointer items-center gap-2 px-4 py-2 bg-dark-100 border-b-0 border-x-0 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <span className="text-sm text-neutral font-medium">Join us</span>
                <div className='w-6 h-6 cursor-pointer flex items-center justify-center bg-neutral rounded-full' onClick={() => window.open(`${process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL}=${sessionStorage.getItem('ref')}`, "_blank")} ><img src="/tele-icon.png" alt="tele-icon" className='w-3 h-3' style={{ marginLeft: '-3px' }} /></div>
                <div className='w-6 h-6 cursor-pointer flex items-center justify-center bg-neutral rounded-full' onClick={handleGoogleSignIn}><img src="/gg-icon.png" alt="gg-icon" className='w-3 h-3' /></div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
