"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, Loader2, Calendar, X } from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { doctorRegisterSchema, DoctorRegisterFormData } from '@/lib/validations/schemas';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { loginUser, clearError } from '@/lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { isLoading } = useAppSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid },
    } = useForm<DoctorRegisterFormData>({
        resolver: zodResolver(doctorRegisterSchema),
        mode: 'onChange',
    });

    // Password strength
    const passwordValue = useWatch({ control, name: 'password', defaultValue: '' });
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

    const onSubmit = async (data: DoctorRegisterFormData) => {
        dispatch(clearError());
        const resultAction = await dispatch(loginUser({ email: data.email, password: data.password }));

        if (loginUser.fulfilled.match(resultAction)) {
            const user = resultAction.payload;
            toast.success(`Account created! Welcome, ${user.name}!`);
            router.push('/dashboard');
        } else if (loginUser.rejected.match(resultAction)) {
            toast.error(resultAction.payload as string || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="h-screen w-full flex overflow-hidden">
            <div className="hidden lg:block lg:w-1/2 h-full bg-[#8B5CF6] relative">
                <Image src="/images/loginimage.png" alt="Medical Staff" fill className="absolute inset-0 w-full h-full object-cover object-center" />
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
                            <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Hey there</h1>
                            <p className="text-neutral-500">
                                Already know Aliveai.ai?{' '}
                                <Link href="/auth/login" className="font-semibold text-[#8B5CF6] hover:text-[#7C3AED] transition-colors">Log in</Link>
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate role="form" aria-label="Doctor registration form">
                            <div className="space-y-4">
                                {/* Email */}
                                <div className="space-y-1.5">
                                    <label htmlFor="doc-email" className="text-xs font-semibold text-neutral-600 block">Email address</label>
                                    <input
                                        id="doc-email"
                                        type="email"
                                        {...register('email')}
                                        className={`block w-full px-4 py-3 rounded-lg border text-neutral-900 placeholder-neutral-400 focus:ring-2 outline-none transition-all ${errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : 'border-neutral-200 focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/20'}`}
                                        placeholder="steve.madden@gmail.com"
                                        aria-describedby={errors.email ? "doc-email-error" : undefined}
                                    />
                                    {errors.email && <p id="doc-email-error" role="alert" className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                                </div>

                                {/* Phone */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-neutral-600 block">Phone Number</label>
                                    <div className="flex gap-2">
                                    <div className="flex items-center gap-2 px-3 py-3 border border-neutral-200 rounded-lg bg-white min-w-[100px]">
                                            <Image src="https://flagcdn.com/w20/us.png" alt="US" width={20} height={15} className="rounded-sm shrink-0" />
                                            <span className="text-sm font-medium text-neutral-600">+1</span>
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <label htmlFor="doc-phone" className="sr-only">Phone number</label>
                                            <input
                                                id="doc-phone"
                                                type="tel"
                                                {...register('phoneNumber')}
                                                className={`w-full px-4 py-3 rounded-lg border text-neutral-900 placeholder-neutral-400 focus:ring-2 outline-none transition-all ${errors.phoneNumber ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : 'border-neutral-200 focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/20'}`}
                                                placeholder="1234567890"
                                                aria-describedby={errors.phoneNumber ? "doc-phone-error" : undefined}
                                            />
                                            {errors.phoneNumber && <p id="doc-phone-error" role="alert" className="text-xs text-red-500">{errors.phoneNumber.message}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="space-y-1.5">
                                    <label htmlFor="doc-password" className="text-xs font-semibold text-neutral-600 block">Your password</label>
                                    <div className="relative">
                                        <input
                                            id="doc-password"
                                            type={showPassword ? "text" : "password"}
                                            {...register('password')}
                                            className={`block w-full px-4 py-3 rounded-lg border text-neutral-900 placeholder-neutral-400 focus:ring-2 outline-none transition-all pr-10 ${errors.password ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : 'border-neutral-200 focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/20'}`}
                                            placeholder="••••••••••••"
                                            aria-describedby={errors.password ? "doc-password-error" : undefined}
                                        />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors p-1 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] rounded" aria-label={showPassword ? "Hide password" : "Show password"}>
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    {errors.password && <p id="doc-password-error" role="alert" className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
                                    {/* Password strength */}
                                    {passwordValue.length > 0 && (
                                        <div className="space-y-1 mt-1">
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((i) => (
                                                    <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength.score ? strength.color : 'bg-neutral-200'}`} />
                                                ))}
                                            </div>
                                            {strength.label && <p className={`text-xs font-medium ${strength.score <= 1 ? 'text-red-500' : strength.score <= 3 ? 'text-yellow-600' : 'text-green-600'}`}>{strength.label} password</p>}
                                        </div>
                                    )}
                                </div>

                                {/* Date of Birth */}
                                <div className="space-y-1.5">
                                    <label htmlFor="doc-birthdate" className="text-xs font-semibold text-neutral-600 block">Date of Birth</label>
                                    <div className="relative">
                                        <input
                                            id="doc-birthdate"
                                            type="date"
                                            {...register('birthDate')}
                                            className={`block w-full px-4 py-3 rounded-lg border text-neutral-900 placeholder-neutral-400 focus:ring-2 outline-none transition-all pr-10 ${errors.birthDate ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : 'border-neutral-200 focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/20'}`}
                                            aria-describedby={errors.birthDate ? "doc-birthdate-error" : undefined}
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                                            <Calendar className="h-4 w-4" />
                                        </div>
                                    </div>
                                    {errors.birthDate && <p id="doc-birthdate-error" role="alert" className="text-xs text-red-500 mt-1">{errors.birthDate.message}</p>}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || !isValid}
                                className="w-full flex justify-center py-3.5 px-4 rounded-xl shadow-md shadow-[#8B5CF6]/20 text-sm font-bold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#8B5CF6] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign Up"}
                            </button>

                            <div className="flex items-center">
                                <label className="flex items-center cursor-pointer group">
                                    <input type="checkbox" className="h-4 w-4 rounded border-neutral-300 text-[#8B5CF6] focus:ring-[#8B5CF6] cursor-pointer" />
                                    <span className="ml-2 text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">Remember me</span>
                                </label>
                            </div>
                        </form>

                        {/* Social Login */}
                        <div className="space-y-4 pt-2">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-100"></div></div>
                                <div className="relative flex justify-start"><span className="pr-2 bg-white text-xs text-neutral-400 font-medium">Or sign up with</span></div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <button className="flex items-center justify-center py-2.5 border border-neutral-100 rounded-xl hover:bg-neutral-50 hover:border-neutral-200 transition-all duration-200"><Image src="/images/Glogo.png" alt="Google" width={20} height={20} /></button>
                                <button className="flex items-center justify-center py-2.5 border border-neutral-100 rounded-xl hover:bg-neutral-50 hover:border-neutral-200 transition-all duration-200"><Image src="/images/Flogo.png" alt="Facebook" width={20} height={20} /></button>
                                <button className="flex items-center justify-center py-2.5 border border-neutral-100 rounded-xl hover:bg-neutral-50 hover:border-neutral-200 transition-all duration-200"><Image src="/images/Alogo.png" alt="Apple" width={20} height={20} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
