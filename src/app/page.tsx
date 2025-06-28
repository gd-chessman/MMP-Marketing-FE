'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLang } from '@/lang';
import Cookies from 'js-cookie';
import { useAuth } from '@/hooks/useAuth'
import { ProtectedRoute } from '@/components/ProtectedRoute';

function HomeContent() {
  const router = useRouter();
  const { t } = useLang();
  const { isAuthenticated } = useAuth();

  const searchParams = useSearchParams();

  useEffect(() => {
    const codeParam = searchParams.get('code');
    if (codeParam) {
      Cookies.set('ref', codeParam, { expires: 1 });
    }
    
    // Only redirect if user is authenticated
    if (isAuthenticated) {
      router.push('/swap');
    }
  }, [router, searchParams, isAuthenticated]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center ">
        <div className="text-center">
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
            onClick={() => router.push('/swap')}
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            {t('protectedRoute.connectWallet')}
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div></div>}>
      <HomeContent />
    </Suspense>
  );
}
