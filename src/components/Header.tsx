'use client'

import React, { useEffect, useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { cn } from '@/utils/cn'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TelegramWalletService, PhantomWalletService } from '@/services/api'
import { useAuth } from '@/hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import { truncateString } from '@/utils/format'
import { ArrowDownIcon, ChevronDown, CopyIcon, LogOut, Globe } from 'lucide-react'
import { useLang } from '@/lang/useLang'
import { toast } from 'react-toastify'

const Header = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [showDropdown, setShowDropdown] = useState(false)
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated, loginMethod, logout, login } = useAuth();
  const { t, lang, setLang, langConfig } = useLang();

  const tabs = [
    { id: 'overview', href: '/', label: t('header.overview'), icon: '📊' },
    { id: 'swap', href: '/swap', label: t('header.swap'), icon: '🔄' },
    { id: 'stake', href: '/stake', label: t('header.stake'), icon: '🔒' },
    { id: 'referral', href: '/referral', label: t('header.referral'), icon: '👥' },
  ]
  const { data: myWallet } = useQuery({
    queryKey: ['myWallet'],
    queryFn: () => TelegramWalletService.getmyWallet(),
    enabled: isAuthenticated && loginMethod === 'telegram',
  })

  const handleGoogleSignIn = async () => {
    window.open(`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=email%20profile&access_type=offline`)
    console.log("handleGoogleSignIn")
  }

  const handleLogout = () => {
    logout()
    setShowDropdown(false)
  }

  const handlePhantomSignIn = async () => {
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
      console.error('Phantom login error:', error);
      toast.error(error.message || t('connectWalletModal.phantomConnectionFailed'));
    }
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.user-dropdown')) {
        setShowDropdown(false)
      }
      if (!target.closest('.language-dropdown')) {
        setShowLanguageDropdown(false)
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
      case 'phantom':
        return <img src="/phantom.png" alt="phantom" className='w-4 h-4' />
      default:
        return null
    }
  }

  const getLoginMethodText = () => {
    switch (loginMethod) {
      case 'telegram':
        return t('header.telegramLogin')
      case 'google':
        return t('header.googleLogin')
      case 'phantom':
        return t('header.phantomLogin')
      default:
        return t('header.unknownLogin')
    }
  }

  const getCurrentLanguageName = () => {
    const currentLang = langConfig.listLangs.find(l => l.code === lang)
    return t(`lang.${lang}`) || 'Unknown'
  }

  const getLanguageFlag = (code: string) => {
    const flags: Record<string, string> = {
      'en': 'https://flagcdn.com/w40/gb.png',
      'vi': 'https://flagcdn.com/w40/vn.png',
      'jp': 'https://flagcdn.com/w40/jp.png',
      'kr': 'https://flagcdn.com/w40/kr.png'
    }
    return flags[code] || '🌐'
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
            {/* Language Selector */}
            <div className="relative language-dropdown">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center gap-2 bg-transparent border-none text-sm text-neutral font-medium cursor-pointer hover:opacity-80 transition-opacity px-3 py-2 rounded-lg hover:bg-gray-100/10"
              >
                <img src={getLanguageFlag(lang)} alt={lang} className="w-6 h-4" />
                <span>{getCurrentLanguageName()}</span>
                {/* {loginMethod === 'phantom' && <span className="text-xs text-neutral">({truncateString(localStorage.getItem('publicKey') || '', 12)})</span>} */}
                <ChevronDown className="w-4 h-4" />
              </button>

              {showLanguageDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-dark-100 rounded-xl shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-100">
                    {t('header.selectLanguage')}
                  </div>
                  {langConfig.listLangs.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        setLang(language.code)
                        setShowLanguageDropdown(false)
                      }}
                      className={`w-full flex items-center gap-3 bg-transparent border-none cursor-pointer px-3 py-2 text-sm hover:bg-gray-100/10 transition-colors ${
                        lang === language.code ? 'text-blue-600 bg-blue-50/10' : 'text-neutral'
                      }`}
                    >
                      <img src={getLanguageFlag(language.code)} alt={language.code} className="w-6 h-4" />
                      <span>{t(`lang.${language.code}`)}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

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
                        {getLoginMethodText()}
                      </div>
                      <div className='flex items-center gap-1 mt-1'>
                        <span className="text-xs text-neutral">{t('header.walletAddress')} </span>
                        <span className="text-xs bg-gradient-purple-cyan bg-clip-text break-all">{truncateString(myWallet?.sol_address, 12)}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex border-t border-gray-100/50 rounded-b-xl cursor-pointer items-center gap-2 px-4 py-2 bg-dark-100 border-b-0 border-x-0 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      {t('header.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <span className="text-sm text-neutral font-medium">{t('header.joinUs')}</span>
                <div className='w-6 h-6 cursor-pointer flex items-center justify-center bg-neutral rounded-full' onClick={() => window.open(`${process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL}=${sessionStorage.getItem('ref')}`, "_blank")} ><img src="/tele-icon.png" alt="tele-icon" className='w-3 h-3' style={{ marginLeft: '-3px' }} /></div>
                {/* <div className='w-6 h-6 cursor-pointer flex items-center justify-center bg-neutral rounded-full' onClick={handlePhantomSignIn}><img src="/phantom.png" alt="phantom-icon" className='w-4 h-4' /></div> */}
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
