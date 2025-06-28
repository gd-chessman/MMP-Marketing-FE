"use client"

import { getmyWallet } from '@/services/api/TelegramWalletService'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { Copy, Download, Wallet, QrCode, Check } from 'lucide-react'
import { toast } from 'react-toastify'
import { useLang } from '@/lang/useLang'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { truncateString } from '@/utils/format'

const DepositPage = () => {
    const { data: mywallet, isLoading } = useQuery({
        queryKey: ['mywallet'],
        queryFn: () => getmyWallet()
    })
    const { t } = useLang()
    const [copied, setCopied] = useState(false)
    const [depositAmount, setDepositAmount] = useState('')
    const [selectedToken, setSelectedToken] = useState('SOL')

    const address = mywallet?.sol_address

    const handleCopyAddress = async () => {
        if (!address) return

        try {
            await navigator.clipboard.writeText(address)
            setCopied(true)
            toast.success(t('deposit.addressCopied'))
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            toast.error(t('deposit.failedToCopyAddress'))
        }
    }

    const handleDownloadQR = () => {
        const svg = document.querySelector('#qr-code svg') as SVGElement
        if (!svg) return

        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const img = new Image()

        const svgData = new XMLSerializer().serializeToString(svg)
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
        const url = URL.createObjectURL(svgBlob)

        img.onload = () => {
            canvas.width = img.width
            canvas.height = img.height
            ctx?.drawImage(img, 0, 0)

            const pngUrl = canvas.toDataURL('image/png')
            const downloadLink = document.createElement('a')
            downloadLink.href = pngUrl
            downloadLink.download = 'deposit-qr.png'
            downloadLink.click()

            URL.revokeObjectURL(url)
        }

        img.src = url
    }

    const handleDeposit = () => {
        if (!depositAmount || Number(depositAmount) <= 0) {
            toast.error('Please enter a valid amount')
            return
        }

        toast.success(`Deposit request for ${depositAmount} ${selectedToken} submitted!`)
        setDepositAmount('')
    }

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center p-4 z-20">
                <div className="text-white text-lg sm:text-xl">{t('deposit.loading')}</div>
            </div>
        )
    }

    return (
        <ProtectedRoute>
            <div className="flex-1 flex items-center justify-center z-20 container lg:mx-auto px-10">
                <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl bg-black/60 p-4 sm:p-6 rounded-xl">
                    {/* QR Code Section */}
                    <Card className="border-[#d7d7d7]/20 text-white">
                        <CardHeader className="text-center">
                            <CardTitle className="bg-gradient-purple-cyan bg-clip-text text-xl sm:text-2xl font-bold flex items-center justify-center gap-2 mb-2 sm:mb-3">
                                {t('deposit.title')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 sm:space-y-6">
                            {/* QR Code */}
                            <div id="qr-code" className="flex justify-center rounded-xl">
                                {address ? (
                                    <div className="p-1 bg-white rounded-xl">
                                        <QRCodeSVG
                                            value={address}
                                            size={window.innerWidth < 640 ? 200 : 300}
                                            level="M"
                                            includeMargin={true}
                                        />
                                    </div>
                                ) : (
                                    <div className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] bg-gray-700 rounded-lg flex items-center justify-center">
                                        <span className="text-gray-400 text-xs sm:text-sm">{t('deposit.noAddressAvailable')}</span>
                                    </div>
                                )}
                            </div>

                            {/* Address Display */}
                            <div className="space-y-2 sm:space-y-3">
                                <Label className="text-neutral text-xs sm:text-sm">{t('deposit.myWalletAddress')}</Label>
                                <div className="flex items-center gap-2 px-2 sm:px-3 py-2 bg-gray-800/50 rounded-lg border border-gray-600/30">
                                    <Wallet className="w-3 h-3 sm:w-4 sm:h-4 text-neutral flex-shrink-0" />
                                    <code className="text-xs sm:text-sm text-neutral flex-1 break-all kati-font">
                                        {address || t('deposit.noAddressAvailable')}
                                    </code>
                                    <Button
                                        onClick={handleCopyAddress}
                                        variant="ghost"
                                        size="sm"
                                        className="text-neutral hover:text-white bg-transparent border-none cursor-pointer p-1 sm:p-2"
                                    >
                                        {copied ? (
                                            <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                                        ) : (
                                            <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>

                            {/* Download QR Button */}
                            <Button
                                onClick={handleDownloadQR}
                                variant="outline"
                                className="inline-flex items-center justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none hover:bg-primary/90 h-9 sm:h-10 px-3 sm:px-4 w-full bg-gradient-violet-blue cursor-pointer rounded-full border-none text-white font-bold py-2 sm:py-3 text-sm sm:text-base kati-font transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                {t('deposit.downloadQRCode')}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </ProtectedRoute>
    )
}

export default DepositPage