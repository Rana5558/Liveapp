"use client";

import React from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Loader2, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/lib/validations/schemas';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { loginUser, clearError } from '@/lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { toast } from 'sonner';
import { useState } from 'react';

const showComingSoon = (action: string) => {
    toast.info(`${action} is coming soon!`);
};

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { isLoading } = useAppSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
    });

    const onSubmit = async (data: LoginFormData) => {
        dispatch(clearError());
        const resultAction = await dispatch(loginUser({ email: data.email, password: data.password }));

        if (loginUser.fulfilled.match(resultAction)) {
            const user = resultAction.payload;
            toast.success(`Welcome back, ${user.name}!`);
            if (user.role === 'doctor') {
                router.push('/dashboard/docdashboard/home');
            } else {
                router.push('/dashboard/home');
            }
        } else if (loginUser.rejected.match(resultAction)) {
            toast.error(resultAction.payload as string || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="h-screen w-full flex overflow-hidden">
            <div className="hidden lg:block lg:w-1/2 h-full bg-[#8B5CF6] relative">
                <Image
                    src="/images/loginimage.png"
                    alt="Medical Staff"
                    fill
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-purple-900/10 mix-blend-multiply"></div>
            </div>

            <div className="w-full lg:w-1/2 h-full bg-white flex flex-col relative">
                <div className="absolute top-6 right-6 z-10">
                    <Link href="/" className="p-2 rounded-full hover:bg-neutral-100 transition-colors block">
                        <X className="w-6 h-6 text-neutral-500" />
                    </Link>
                </div>

                <div className="flex-1 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
                    <div className="w-full max-w-[420px] space-y-8">
                        <div className="text-center space-y-2">
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

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate role="form" aria-label="Doctor login form">
                            <div className="space-y-4">
                                {/* Email */}
                                <div className="space-y-1.5">
                                    <label htmlFor="email" className="text-xs font-semibold text-neutral-600 block">Email address</label>
                                    <input
                                        id="email"
                                        type="email"
                                        {...register('email')}
                                        className={`block w-full px-4 py-3 rounded-lg border text-neutral-900 placeholder-neutral-400 focus:ring-2 outline-none transition-all ${errors.email
                                            ? 'border-red-400 focus:border-red-400 focus:ring-red-200'
                                            : 'border-neutral-200 focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/20'
                                            }`}
                                        placeholder="Email address"
                                        aria-describedby={errors.email ? "email-error" : undefined}
                                    />
                                    {errors.email && (
                                        <p id="email-error" role="alert" className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                                    )}
                                </div>

                                {/* Password */}
                                <div className="space-y-1.5">
                                    <label htmlFor="password" className="text-xs font-semibold text-neutral-600 block">Your password</label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            {...register('password')}
                                            className={`block w-full px-4 py-3 rounded-lg border text-neutral-900 placeholder-neutral-400 focus:ring-2 outline-none transition-all pr-10 ${errors.password
                                                ? 'border-red-400 focus:border-red-400 focus:ring-red-200'
                                                : 'border-neutral-200 focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/20'
                                                }`}
                                            placeholder="••••••••••••"
                                            aria-describedby={errors.password ? "password-error" : undefined}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors p-1 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] rounded"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p id="password-error" role="alert" className="text-xs text-red-500 mt-1">{errors.password.message}</p>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || !isValid}
                                className="w-full flex justify-center py-3.5 px-4 rounded-xl shadow-md shadow-[#8B5CF6]/20 text-sm font-bold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#8B5CF6] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Log in"}
                            </button>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center cursor-pointer group">
                                    <input type="checkbox" className="h-4 w-4 rounded border-neutral-300 text-[#8B5CF6] focus:ring-[#8B5CF6] cursor-pointer" />
                                    <span className="ml-2 text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">Remember me</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={() => showComingSoon("Password reset")}
                                    className="text-sm font-semibold text-[#8B5CF6] hover:text-[#7C3AED] transition-colors bg-transparent border-none cursor-pointer"
                                >
                                    Forgot password?
                                </button>
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
                                <button
                                    type="button"
                                    onClick={() => showComingSoon("Google login")}
                                    className="flex items-center justify-center py-2.5 border border-neutral-100 rounded-xl hover:bg-neutral-50 hover:border-neutral-200 transition-all duration-200"
                                >
                                    <Image src="/images/Glogo.png" alt="Google" width={20} height={20} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => showComingSoon("Facebook login")}
                                    className="flex items-center justify-center py-2.5 border border-neutral-100 rounded-xl hover:bg-neutral-50 hover:border-neutral-200 transition-all duration-200"
                                >
                                    <Image src="/images/Flogo.png" alt="Facebook" width={20} height={20} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => showComingSoon("Apple login")}
                                    className="flex items-center justify-center py-2.5 border border-neutral-100 rounded-xl hover:bg-neutral-50 hover:border-neutral-200 transition-all duration-200"
                                >
                                    <Image src="/images/Alogo.png" alt="Apple" width={20} height={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
