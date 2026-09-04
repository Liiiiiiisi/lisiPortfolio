'use client';

import { useEffect } from 'react';
import { withBasePath } from '@/lib/paths';

/** Static-export redirect with progressive enhancement. The meta refresh and
 * ordinary anchor are present in build output; JavaScript only replaces the
 * history entry more cleanly when available. */
export default function StaticRedirect({ to }: { to: string }) {
  const destination = withBasePath(to);

  useEffect(() => {
    window.location.replace(destination);
  }, [destination]);

  return (
    <main id="main" className="flex min-h-[60svh] items-center justify-center px-5 text-center">
      <meta httpEquiv="refresh" content={`0;url=${destination}`} />
      <link rel="canonical" href={destination} />
      <p className="text-sm text-muted">
        This page has moved.{' '}
        <a className="text-ink underline underline-offset-4" href={destination}>Continue</a>
      </p>
    </main>
  );
}
