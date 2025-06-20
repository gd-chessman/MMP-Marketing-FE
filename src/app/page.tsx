'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLang } from '@/lang';
import Cookies from 'js-cookie';

function HomeContent() {
  const router = useRouter();
  const { t } = useLang();

  const searchParams = useSearchParams();

  useEffect(() => {
    const refParam = searchParams.get('ref');
    console.log("refParam", refParam)
    if (refParam) {
      Cookies.set('ref', refParam, { expires: 1 });
    }

    router.push('/swap');
  }, [router, searchParams]);

  return (
    <div className='text-neutral'>
      {t('home.redirecting')}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div></div>}>
      <HomeContent />
    </Suspense>
  );
}
