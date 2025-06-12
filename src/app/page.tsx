'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLang } from '@/lang';

function HomeContent() {
  const router = useRouter();
  const { t } = useLang();

 

  return (
    <div>
      đang chuyển hướng...
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
