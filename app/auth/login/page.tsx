"use client";

import React, { useState } from 'react';
import Link from 'next/link';

import {
    Eye,
    EyeOff,
    Loader2,
    X
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { loginUser, clearError } from '@/lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const dispatch = useAppDispatch();
    const router = useRouter();
    const { isLoading, error: authError } = useAppSelector((state) => state.auth);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        dispatch(clearError());

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        const resultAction = await dispatch(loginUser({ email, password }));

        if (loginUser.fulfilled.match(resultAction)) {
            const user = resultAction.payload;
            if (user.role === 'doctor') {
                router.push('/dashboard/docdashboard/home');
            } else {
                router.push('/dashboard/home');
            }
        }
    };

    return (
        <div className="h-screen w-full flex overflow-hidden">
            <div className="hidden lg:block lg:w-1/2 h-full bg-[#8B5CF6] relative">
                <Image
                    src="/images/patentimage.png"
                    alt="Medical Staff"
                    fill
                    className="object-cover object-center"
                    priority
                />
                {/* Purple overlay gradient for better text contrast if needed, mostly for aesthetic matching */}
                <div className="absolute inset-0 bg-purple-900/10 mix-blend-multiply"></div>
            </div>

            {/* Right Side: Login Form - Scrollable internally if height is too small, but main container is fixed */}
            <div className="w-full lg:w-1/2 h-full bg-white flex flex-col relative">
                {/* Close Button */}
                <div className="absolute top-6 right-6 z-10">
                    <Link href="/" className="p-2 rounded-full hover:bg-neutral-100 transition-colors block">
                        <X className="w-6 h-6 text-neutral-500" />
                    </Link>
                </div>

                <div className="flex-1 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
                    <div className="w-full max-w-[420px] space-y-8">
                        {/* Header */}
                        <div className="text-center space-y-2">
                            <div className="flex justify-center mb-6">
                                {/* Logo placeholder if needed, using text for now as per design */}
                                <div className="flex justify-center mb-6">
                                    <Image
                                        src="/images/mainlogo.png"
                                        alt="Logo"
                                        width={150}
                                        height={50}
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
                                Welcome back
                            </h1>
                            <p className="text-neutral-500">
                                New to Aliveai.ai?{' '}
                                <Link href="/auth/register" className="font-semibold text-[#8B5CF6] hover:text-[#7C3AED] transition-colors">
                                    Sign up
                                </Link>
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {(error || authError) && (
                                <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm font-medium border border-red-100 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                    {error || authError}
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-neutral-600 block">Email address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full px-4 py-3 rounded-lg border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 outline-none transition-all"
                                        placeholder="Email address"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-neutral-600 block">Your password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="block w-full px-4 py-3 rounded-lg border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 outline-none transition-all pr-10"
                                            placeholder="••••••••••••"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors p-1"
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-3.5 px-4 rounded-xl shadow-md shadow-[#8B5CF6]/20 text-sm font-bold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#8B5CF6] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    "Log in"
                                )}
                            </button>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-neutral-300 text-[#8B5CF6] focus:ring-[#8B5CF6] cursor-pointer"
                                    />
                                    <span className="ml-2 text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">Remember me</span>
                                </label>
                                <a href="#" className="text-sm font-semibold text-[#8B5CF6] hover:text-[#7C3AED] transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                        </form>

                        {/* Social Login */}
                        <div className="space-y-4 pt-2">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-neutral-100"></div>
                                </div>
                                <div className="relative flex justify-start">
                                    <span className="pr-2 bg-white text-xs text-neutral-400 font-medium">Or log in with</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <button className="flex items-center justify-center py-2.5 border border-neutral-100 rounded-xl hover:bg-neutral-50 hover:border-neutral-200 transition-all duration-200">
                                    <Image src="/images/Glogo.png" alt="Google" width={20} height={20} className="w-5 h-5" />
                                </button>
                                <button className="flex items-center justify-center py-2.5 border border-neutral-100 rounded-xl hover:bg-neutral-50 hover:border-neutral-200 transition-all duration-200">
                                    <Image src="/images/Flogo.png" alt="Facebook" width={20} height={20} className="w-5 h-5" />
                                </button>
                                <button className="flex items-center justify-center py-2.5 border border-neutral-100 rounded-xl hover:bg-neutral-50 hover:border-neutral-200 transition-all duration-200">
                                    <Image src="/images/Alogo.png" alt="Apple" width={20} height={20} className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
