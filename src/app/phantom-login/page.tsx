"use client"
import { useAuth } from '@/hooks/useAuth';
import { PhantomWalletService } from '@/services/api';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, Suspense, useState } from 'react'
import { toast } from 'react-toastify';
import { useLang } from '@/lang/useLang';

function PhantomLoginContent() {
    const { isAuthenticated, login } = useAuth();
    const searchParams = useSearchParams();
    const router = useRouter();
    const { t } = useLang();

    const signature = searchParams.get("signature");
    const message = searchParams.get("message");

    useEffect(() => {
        if (isAuthenticated) {
            window.location.href = '/swap';
        } else if (signature && message) {
            handleLogin();
        } else {
            // If no parameters, try to connect wallet directly
            handleDirectLogin();
        }
    }, []);

    const handleLogin = async () => {
        try {
            const res = await PhantomWalletService.login({
                signature: JSON.parse(signature!),
                public_key: searchParams.get("public_key") || "",
                message: message || ""
            });
            if (res.success) {
                login('phantom');
                window.location.href = '/swap';
            } else {
                toast.error(t('connectWalletModal.phantomAuthFailed'));
                window.location.href = '/';
            }
        } catch (error: any) {
            console.log(error);
            toast.error(t('connectWalletModal.phantomAuthFailed'));
            window.location.href = '/';
        }
    }

    const handleDirectLogin = async () => {
        try {
            // Check if Phantom wallet is installed
            if (!PhantomWalletService.isPhantomInstalled()) {
                toast.error(t('connectWalletModal.phantomNotInstalled'));
                window.open('https://phantom.app/', '_blank');
                setTimeout(() => window.location.href = '/', 3000);
                return;
            }

            // Connect to Phantom wallet
            const walletPublicKey = await PhantomWalletService.connectPhantomWallet();
            
            // Create a message to sign
            const signMessage = `Login to MMP Platform - ${Date.now()}`;
            
            // Sign the message
            const { signature: walletSignature } = await PhantomWalletService.signMessageWithPhantom(signMessage);
            
            // Send to backend for verification
            const response = await PhantomWalletService.login({
                signature: walletSignature,
                public_key: walletPublicKey,
                message: signMessage
            });
                
           // Update authentication state properly
           localStorage.setItem("auth_token", "true");
           localStorage.setItem("login_method", "phantom");
           localStorage.setItem("publicKey", walletPublicKey);
           login('phantom');
           window.location.href = '/swap';
        } catch (error: any) {
            console.log("error", error);
            toast.error(t('connectWalletModal.phantomAuthFailed'));
            // window.location.href = '/';
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl text-neutral font-bold mb-4">{t("connectWalletModal.processingPhantomLogin")}</h2>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            </div>
        </div>
    )
}

export default function PhantomLoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PhantomLoginContent />
        </Suspense>
    )
} 