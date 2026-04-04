import { Suspense } from 'react';
import VerifyOtpForm from './VerifyOtpForm';

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground text-sm">
          Loading…
        </div>
      }
    >
      <VerifyOtpForm />
    </Suspense>
  );
}
