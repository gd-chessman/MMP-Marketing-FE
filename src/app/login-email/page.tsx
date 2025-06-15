"use client"
import { useAuth } from '@/hooks/useAuth';
import { GoogleAuthService } from '@/services/api';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, Suspense } from 'react'
import { toast } from 'react-toastify';

function GoogleLoginContent() {
    const { isAuthenticated, login } = useAuth();
    const searchParams = useSearchParams();
    const router = useRouter();

    const code = searchParams.get("code");

    useEffect(() => {
        if (isAuthenticated) {
            window.location.href = '/swap';
        } else if (code) {
            handleGoogleLogin();
        } else {
            toast.error("Invalid Google authentication!");
            window.location.href = '/';
        }
    }, []);

    const handleGoogleLogin = async () => {
        try {
            // Gọi API để xác thực Google code
            const response = await GoogleAuthService.login({ code });
            login('google');
            window.location.href = '/swap';

        } catch (error: any) {
            console.log(error);
            toast.error("Google authentication failed!");
            window.location.href = '/';
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Processing Google Login...</h2>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            </div>
        </div>
    )
}

export default function GoogleLogin() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GoogleLoginContent />
        </Suspense>
    )
} 