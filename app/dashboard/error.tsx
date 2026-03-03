'use client';

import { useEffect } from 'react';
import { RefreshCcw } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-white p-6 text-center">
            <div className="space-y-6 max-w-md">
                <h2 className="text-4xl font-bold">Oops!</h2>
                <p className="text-neutral-400">
                    Something went wrong in your dashboard. This has been logged and we're looking into it.
                </p>
                <button
                    onClick={() => reset()}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                    <RefreshCcw className="w-4 h-4" />
                    Try Again
                </button>
            </div>
        </div>
    );
}
