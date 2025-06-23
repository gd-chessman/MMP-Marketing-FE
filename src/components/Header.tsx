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
import { ArrowDownIcon, ChevronDown, CopyIcon, LogOut, Globe, Menu, X, ArrowDownUp } from 'lucide-react'
import { useLang } from '@/lang/useLang'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

const Header = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [showDropdown, setShowDropdown] = useState(false)
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated, loginMethod, logout, login } = useAuth();
  const { t, lang, setLang, langConfig } = useLang();

  const tabs = [
    // { id: 'overview', href: '/overview', label: t('header.overview'), icon: '📊', isActive: true },
    { id: 'swap', href: '/swap', label: t('header.swap'), icon: <ArrowDownUp className='w-3 h-3 sm:w-4 sm:h-4' />, isActive: true },
    { id: 'deposit', href: '/deposit', label: t('header.deposit'), icon: '💰', isActive: isAuthenticated },
    { id: 'withdraw', href: '/withdraw', label: t('header.withdraw'), icon: '💰', isActive: isAuthenticated },
    // { id: 'stake', href: '/stake', label: t('header.stake'), icon: '🔒' },
    { id: 'referral', href: '/referral', label: t('header.referral'), icon: '👥', isActive: isAuthenticated },
    { id: 'white-paper', href: '/white-paper', label: t('header.whitePaper'), icon: '📄', isActive: true },
  ]

  
  const { data: myWallet } = useQuery({
    queryKey: ['myWallet'],
    queryFn: () => TelegramWalletService.getmyWallet(),
    enabled: isAuthenticated,
  })
  console.log("myWallet", myWallet)

  const handleGoogleSignIn = async () => {
    window.open(`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=email%20profile&access_type=offline`)
    console.log("handleGoogleSignIn")
  }

  const handleLogout = () => {
    logout()
    TelegramWalletService.logout()
    setShowDropdown(false)
    setShowMobileMenu(false)
    loginMethod == "phantom" && localStorage.removeItem("publicKey")
    window.location.reload();
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
      if (!target.closest('.mobile-menu')) {
        setShowMobileMenu(false)
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
        return <img src="/tele-icon.png" alt="telegram" className='w-3 h-3 sm:w-4 sm:h-4' />
      case 'google':
        return <img src="/gg-icon.png" alt="google" className='w-3 h-3 sm:w-4 sm:h-4' />
      case 'phantom':
        return <img src="/phantom.png" alt="phantom" className='w-3 h-3 sm:w-4 sm:h-4' />
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
      <div className="px-3 sm:px-4 md:px-6 lg:px-[40px] flex flex-col gap-2 sm:gap-4 md:gap-6 relative mx-auto z-10">
        <div className="flex items-center justify-between h-12 sm:h-14 md:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/mmp-logo.png"
              alt="MMP Logo"
              className="h-6 w-auto sm:h-8 md:h-10 cursor-pointer"
            />
          </Link>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex flex-1 gap-4 lg:gap-8 xl:gap-[100px] justify-center items-center">
            {tabs.filter((tab) => tab.isActive).map((tab) => (
              <Link 
                className={cn(
                  'text-xs sm:text-sm text-neutral font-medium cursor-pointer hover:opacity-80 transition-opacity rounded-lg px-2 py-1', 
                  pathname === tab.href && 'bg-gradient-purple-cyan bg-clip-text'
                )} 
                href={tab.href} 
                key={tab.id}
              >
                {tab.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            {/* Language Selector - Hidden on mobile */}
            <div className="relative language-dropdown hidden sm:block">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center gap-1 sm:gap-2 bg-transparent border-none text-xs sm:text-sm text-neutral font-medium cursor-pointer hover:opacity-80 transition-opacity px-2 sm:px-3 py-1 sm:py-2 rounded-lg hover:bg-gray-100/10"
              >
                <img src={getLanguageFlag(lang)} alt={lang} className="w-4 h-3 sm:w-6 sm:h-4" />
                <span className="hidden lg:inline">{getCurrentLanguageName()}</span>
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>

              {showLanguageDropdown && (
                <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-dark-100 rounded-xl shadow-lg border border-gray-200 py-1 z-50">
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
                      className={`w-full flex items-center gap-2 sm:gap-3 bg-transparent border-none cursor-pointer px-3 py-2 text-xs sm:text-sm hover:bg-gray-100/10 transition-colors ${
                        lang === language.code ? 'text-blue-600 bg-blue-50/10' : 'text-neutral'
                      }`}
                    >
                      <img src={getLanguageFlag(language.code)} alt={language.code} className="w-4 h-3 sm:w-6 sm:h-4" />
                      <span>{t(`lang.${language.code}`)}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {isAuthenticated ? (
              <div className="relative user-dropdown">
                <div
                  className='flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-neutral font-medium cursor-pointer hover:opacity-80 transition-opacity'
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {getLoginMethodIcon()}
                  <span className="hidden sm:inline">{truncateString(myWallet?.sol_address, 12)}</span>
                  <span className="sm:hidden">{truncateString(myWallet?.sol_address, 8)}</span>
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-64 sm:w-72 bg-dark-100 rounded-xl shadow-lg border border-gray-200 py-1 z-50">
                    <div className="flex flex-col gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 border-b border-gray-100">
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
                      className="w-full flex border-t border-gray-100/50 rounded-b-xl cursor-pointer items-center gap-2 px-3 sm:px-4 py-2 bg-dark-100 border-b-0 border-x-0 text-xs sm:text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
                      {t('header.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className='lg:flex gap-3 hidden'>
                <span className="hidden sm:inline text-xs sm:text-sm text-neutral font-medium">{t('header.joinUs')}</span>
                <div className='w-5 h-5 sm:w-6 sm:h-6 cursor-pointer flex items-center justify-center bg-neutral rounded-full' onClick={() => window.open(`${process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL}=${Cookies.get("ref") || null}`, "_blank")} >
                  <img src="/tele-icon.png" alt="tele-icon" className='w-2.5 h-2.5 sm:w-3 sm:h-3' style={{ marginLeft: '-3px' }} />
                </div>
                <div className='w-5 h-5 sm:w-6 sm:h-6 cursor-pointer flex items-center justify-center bg-neutral rounded-full' onClick={handlePhantomSignIn}>
                  <img src="/phantom.png" alt="phantom-icon" className='w-3 h-3 sm:w-4 sm:h-4' />
                </div>
                <div className='w-5 h-5 sm:w-6 sm:h-6 cursor-pointer flex items-center justify-center bg-neutral rounded-full' onClick={handleGoogleSignIn}>
                  <img src="/gg-icon.png" alt="gg-icon" className='w-2.5 h-2.5 sm:w-3 sm:h-3' />
                </div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden ml-2 p-1 text-neutral hover:opacity-80 transition-opacity bg-transparent border-none"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {showMobileMenu && (
          <div className="md:hidden mobile-menu bg-dark-100 rounded-xl border border-gray-200 py-2 mb-2">
            {/* Mobile Language Selector */}
            <div className="px-4 py-2 border-b border-gray-100">
              <div className="text-xs text-neutral mb-2">{t('header.selectLanguage')}</div>
              <div className="flex gap-2 justify-between">
                {langConfig.listLangs.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => {
                      setLang(language.code)
                    }}
                    className={`flex items-center flex-wrap lg:flex-nowrap justify-center lg:justify-start border-none bg-black/40 gap-2 px-3 py-2 lg:py-[6px] rounded text-xs ${
                      lang === language.code ? 'text-primary' : 'text-neutral'
                    }`}
                  >
                    <img src={getLanguageFlag(language.code)} alt={language.code} className="w-4 h-3" />
                    <span>{t(`lang.${language.code}`)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Navigation Tabs */}
            <div className="px-4 py-2">
              {/* <div className="text-xs text-gray-500 mb-2">{t('header.navigation')}</div> */}
              <div className="flex flex-col gap-1">
                {tabs.map((tab) => (
                  <Link 
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-neutral hover:bg-gray-100/10 bg-black/40 transition-colors', 
                      pathname === tab.href && 'text-primary font-medium'
                    )} 
                    href={tab.href} 
                    key={tab.id}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <span>{tab.icon}</span>
                    {tab.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Login Options */}
            {!isAuthenticated && (
              <div className="px-4 py-2 border-t border-gray-100">
                <div className="text-xs text-neutral mb-2">{t('header.joinUs')}</div>
                <div className="flex gap-2 justify-between">
                  <button 
                    className="flex items-center gap-2 px-4 py-2 bg-black/40 border-none rounded-lg text-xs text-white"
                    onClick={() => window.open(`${process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL}=${Cookies.get("ref") || null}`, "_blank")}
                  >
                    <img src="/tele-icon.png" alt="tele-icon" className="w-3 h-3" />
                    Telegram
                  </button>
                  <button 
                    className="flex items-center gap-2 px-4 py-2 bg-black/40 border-none rounded-lg text-xs text-white"
                    onClick={handlePhantomSignIn}
                  >
                    <img src="/phantom.png" alt="phantom-icon" className="w-3 h-3" />
                    Phantom
                  </button>
                  <button 
                    className="flex items-center gap-2 px-4 py-2 bg-black/40 border-none rounded-lg text-xs text-white"
                    onClick={handleGoogleSignIn}
                  >
                    <img src="/gg-icon.png" alt="gg-icon" className="w-3 h-3" />
                    Google
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
