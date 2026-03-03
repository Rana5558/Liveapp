"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, User, Eye, EyeOff, Loader2, Calendar, X, Phone } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { loginUser, clearError } from '@/lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const dispatch = useAppDispatch();
    const router = useRouter();
    const { isLoading, error: authError } = useAppSelector((state) => state.auth);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        dispatch(clearError());

        if (!email || !password || !phoneNumber || !birthDate) {
            setError('Please fill in all required fields');
            return;
        }

        const resultAction = await dispatch(loginUser({ email, password }));

        if (loginUser.fulfilled.match(resultAction)) {
            router.push('/dashboard');
        }
    };

    return (
        <div className="h-screen w-full flex overflow-hidden">
            {/* Left Side: Image Only */}
            <div className="hidden lg:block lg:w-1/2 h-full bg-[#8B5CF6] relative">
                <img
                    src="/images/loginimage.png"
                    alt="Medical Staff"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-purple-900/10 mix-blend-multiply"></div>
            </div>

            {/* Right Side: Signup Form */}
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
                            <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
                                Hey there
                            </h1>
                            <p className="text-neutral-500">
                                Already know Aliveai.ai?{' '}
                                <Link href="/auth/login" className="font-semibold text-[#8B5CF6] hover:text-[#7C3AED] transition-colors">
                                    Log in
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
                                        placeholder="steve.madden@gmail.com"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-neutral-600 block">Phone Number</label>
                                    <div className="flex gap-2">
                                        <div className="flex items-center gap-2 px-3 py-3 border border-neutral-200 rounded-lg bg-white cursor-pointer hover:bg-neutral-50 transition-colors min-w-[100px]">
                                            <img src="https://flagcdn.com/w20/us.png" alt="US" className="w-5 h-auto rounded-sm shrink-0" />
                                            <span className="text-sm font-medium text-neutral-600">+1</span>
                                            <svg height="16" width="16" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="text-neutral-400 ml-auto"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
                                        </div>
                                        <input
                                            type="tel"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            className="flex-1 px-4 py-3 rounded-lg border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 outline-none transition-all"
                                            placeholder="1234567890"
                                            required
                                        />
                                    </div>
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

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-neutral-600 block">Birth Date</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={birthDate}
                                            onChange={(e) => setBirthDate(e.target.value)}
                                            className="block w-full px-4 py-3 rounded-lg border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 outline-none transition-all pr-10"
                                            placeholder="23/03/1995"
                                            required
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                                            <Calendar className="h-4 w-4" />
                                        </div>
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
                                    "Sign Up"
                                )}
                            </button>

                            <div className="flex items-center">
                                <label className="flex items-center cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-neutral-300 text-[#8B5CF6] focus:ring-[#8B5CF6] cursor-pointer"
                                    />
                                    <span className="ml-2 text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">Remember me</span>
                                </label>
                            </div>
                        </form>

                        {/* Social Login */}
                        <div className="space-y-4 pt-2">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-neutral-100"></div>
                                </div>
                                <div className="relative flex justify-start">
                                    <span className="pr-2 bg-white text-xs text-neutral-400 font-medium">Or sign up with</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <button className="flex items-center justify-center py-2.5 border border-neutral-100 rounded-xl hover:bg-neutral-50 hover:border-neutral-200 transition-all duration-200">
                                    <img src="/images/Glogo.png" alt="Google" className="w-5 h-5" />
                                </button>
                                <button className="flex items-center justify-center py-2.5 border border-neutral-100 rounded-xl hover:bg-neutral-50 hover:border-neutral-200 transition-all duration-200">
                                    <img src="/images/Flogo.png" alt="Facebook" className="w-5 h-5" />
                                </button>
                                <button className="flex items-center justify-center py-2.5 border border-neutral-100 rounded-xl hover:bg-neutral-50 hover:border-neutral-200 transition-all duration-200">
                                    <img src="/images/Alogo.png" alt="Apple" className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
