"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { patientRegisterSchema, PatientRegisterFormData } from '@/lib/validations/schemas';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { loginUser } from '@/lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Image from "next/image";

export default function PatientRegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { isLoading } = useAppSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm<PatientRegisterFormData>({
        resolver: zodResolver(patientRegisterSchema),
        mode: 'onChange',
    });

    // Password strength
    const passwordValue = watch('password', '');
    const getPasswordStrength = (pwd: string) => {
        if (!pwd) return { score: 0, label: '', color: '' };
        let score = 0;
        if (pwd.length >= 6) score++;
        if (pwd.length >= 10) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[^A-Za-z0-9]/.test(pwd)) score++;
        if (score <= 1) return { score, label: 'Weak', color: 'bg-red-500' };
        if (score <= 3) return { score, label: 'Fair', color: 'bg-yellow-500' };
        return { score, label: 'Strong', color: 'bg-green-500' };
    };
    const strength = getPasswordStrength(passwordValue);

    const onSubmit = async (data: PatientRegisterFormData) => {
        const resultAction = await dispatch(loginUser({ email: data.email, password: data.password }));

        if (loginUser.fulfilled.match(resultAction)) {
            const user = resultAction.payload;
            toast.success(`Account created! Welcome to Aliveai, ${user.name}!`);
            router.push('/onboarding');
        } else if (loginUser.rejected.match(resultAction)) {
            toast.error(resultAction.payload as string || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="h-screen w-full flex overflow-hidden bg-neutral-900">
            {/* Left Side */}
            <div className="w-full lg:w-1/2 h-full bg-neutral-900 flex flex-col relative">
                <div className="absolute top-6 right-6 z-10">
                    <Link href="/" className="p-2 rounded-full hover:bg-neutral-800 transition-colors block">
                        <X className="w-6 h-6 text-neutral-400" />
                    </Link>
                </div>

                <div className="flex-1 flex items-center justify-center p-6 sm:p-8 overflow-y-auto">
                    <div className="w-full max-w-[420px] space-y-5">
                        <div className="text-center space-y-2">
                            <div className="flex justify-center mb-6">
                                <Image src="/images/mainlogo2.png" alt="Logo" width={100} height={25} className="object-contain" priority />
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight text-white">Create an Account</h1>
                            <p className="text-neutral-400">Kindly fill in your details to create an account</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                            <div className="space-y-4">
                                {/* Full Name */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-neutral-400 block">Your fullname*</label>
                                    <input
                                        type="text"
                                        {...register('fullName')}
                                        className={`block w-full px-4 py-3 rounded-lg border bg-neutral-800 text-white placeholder-neutral-500 focus:ring-2 outline-none transition-all ${errors.fullName ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-neutral-700 focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/20'}`}
                                        placeholder="Enter your name"
                                    />
                                    {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName.message}</p>}
                                </div>

                                {/* Email */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-neutral-400 block">Your email*</label>
                                    <input
                                        type="email"
                                        {...register('email')}
                                        className={`block w-full px-4 py-3 rounded-lg border bg-neutral-800 text-white placeholder-neutral-500 focus:ring-2 outline-none transition-all ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-neutral-700 focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/20'}`}
                                        placeholder="Enter your email"
                                    />
                                    {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
                                </div>

                                {/* Password */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-neutral-400 block">Password*</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            {...register('password')}
                                            className={`block w-full px-4 py-3 rounded-lg border bg-neutral-800 text-white placeholder-neutral-500 focus:ring-2 outline-none transition-all pr-10 ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-neutral-700 focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/20'}`}
                                            placeholder="Enter password"
                                        />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors p-1">
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>}
                                    {/* Password strength */}
                                    {passwordValue.length > 0 && (
                                        <div className="space-y-1 mt-1">
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((i) => (
                                                    <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength.score ? strength.color : 'bg-neutral-700'}`} />
                                                ))}
                                            </div>
                                            {strength.label && <p className={`text-xs font-medium ${strength.score <= 1 ? 'text-red-400' : strength.score <= 3 ? 'text-yellow-400' : 'text-green-400'}`}>{strength.label} password</p>}
                                        </div>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-neutral-400 block">Confirm Password*</label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            {...register('confirmPassword')}
                                            className={`block w-full px-4 py-3 rounded-lg border bg-neutral-800 text-white placeholder-neutral-500 focus:ring-2 outline-none transition-all pr-10 ${errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-neutral-700 focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/20'}`}
                                            placeholder="Re-enter password"
                                        />
                                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors p-1">
                                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && <p className="text-xs text-red-400 mt-1">{errors.confirmPassword.message}</p>}
                                </div>

                                {/* Terms */}
                                <div className="space-y-1">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            {...register('agreedToTerms')}
                                            className="w-4 h-4 rounded border-neutral-600 bg-neutral-800 text-[#8B5CF6] focus:ring-2 focus:ring-offset-2 focus:ring-[#8B5CF6]"
                                        />
                                        <label htmlFor="terms" className="ml-2 text-sm text-neutral-400">I agree to terms &amp; conditions</label>
                                    </div>
                                    {errors.agreedToTerms && <p className="text-xs text-red-400">{errors.agreedToTerms.message}</p>}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || !isValid}
                                className="w-full flex justify-center py-3.5 px-4 rounded-xl shadow-md shadow-[#8B5CF6]/20 text-sm font-bold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#8B5CF6] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Creating Account...' : 'Sign up'}
                            </button>
                        </form>

                        {/* Google */}
                        <div className="space-y-4">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-700"></div></div>
                                <div className="relative flex justify-center text-sm"><span className="px-2 bg-neutral-900 text-neutral-500">Or</span></div>
                            </div>
                            <button type="button" className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg border border-neutral-700 text-neutral-300 hover:bg-neutral-800 transition-colors font-medium">
                                <svg className="w-5 h-5" viewBox="0 0 24 24"><text x="2" y="20" fontSize="18" fill="currentColor" fontWeight="bold">G</text></svg>
                                Register with Google
                            </button>
                        </div>

                        <div className="text-center">
                            <p className="text-neutral-400">
                                Already have an Account?{' '}
                                <Link href="/auth/patient-login" className="font-semibold text-[#8B5CF6] hover:text-[#7C3AED] transition-colors">Login</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="hidden lg:flex lg:w-1/2 h-full bg-gradient-to-br from-purple-900 to-blue-900 relative overflow-hidden">
                <img src="/images/patentimage.png" alt="Medical AI" className="absolute inset-0 w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-purple-900/20 mix-blend-multiply"></div>
                <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-4 px-8">
                    <Link href="/auth/patient-login" className="px-6 py-2.5 text-sm font-semibold text-[#8B5CF6] bg-white rounded-full hover:bg-gray-100 transition-colors">Login as a Patient</Link>
                    <Link href="/auth/login" className="px-6 py-2.5 text-sm font-semibold text-white bg-[#8B5CF6] rounded-full hover:bg-[#7C3AED] transition-colors">Login as a Doctor</Link>
                </div>
            </div>
        </div>
    );
}
