'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VerifyEmailRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const email = searchParams.get('email');
    const q = email ? `?email=${encodeURIComponent(email)}` : '';
    router.replace(`/verify-otp${q}`);
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground text-sm">
      Redirecting…
    </div>
  );
}
