'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="min-h-[400px] flex flex-col items-center justify-center p-6 text-center space-y-6 bg-neutral-900/50 rounded-2xl border border-white/5">
                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-8 h-8 text-red-500" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-white">Something went wrong</h2>
                        <p className="text-neutral-400 max-w-md mx-auto">
                            Our AI encountered an unexpected error while processing this section. Please try refreshing the page.
                        </p>
                    </div>
                    <button
                        onClick={() => this.setState({ hasError: false })}
                        className="flex items-center gap-2 px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-colors"
                    >
                        <RefreshCcw className="w-4 h-4" />
                        Try Again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
