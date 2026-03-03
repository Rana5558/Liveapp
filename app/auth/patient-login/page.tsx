"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { loginUser } from "@/lib/features/auth/authSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PatientLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useAppDispatch();
    const router = useRouter();

    const { isLoading, error } = useAppSelector(
        (state) => state.auth
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) return;

        const resultAction = await dispatch(
            loginUser({ email, password })
        );

        if (loginUser.fulfilled.match(resultAction)) {
            router.push("/onboarding");
        }
    };

    return (
        <div className="h-screen w-full flex overflow-hidden bg-neutral-900">
            {/* Left Side */}
            <div className="w-full lg:w-1/2 h-full bg-neutral-900 flex flex-col relative">
                <div className="absolute top-6 right-6 z-10">
                    <Link
                        href="/"
                        className="p-2 rounded-full hover:bg-neutral-800 transition-colors block"
                    >
                        <X className="w-6 h-6 text-neutral-400" />
                    </Link>
                </div>

                <div className="flex-1 flex items-center justify-center p-6 sm:p-8">
                    <div className="w-full max-w-[420px] space-y-6">
                        <div className="text-center space-y-2">
                            <div className="flex justify-center mb-6">
                                <Image
                                    src="/images/mainlogo2.png"
                                    alt="Aliveai.ai Logo"
                                    width={100}
                                    height={25}
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight text-white">
                                Login
                            </h1>
                            <p className="text-neutral-400">
                                Add your credentials to log in
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <div className="bg-red-500/20 text-red-200 p-3 rounded-lg text-sm font-medium border border-red-500/50 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                                    {error}
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-neutral-400 block">
                                        Your email*
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full px-4 py-3 rounded-lg border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-500 focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 outline-none transition-all"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-neutral-400 block">
                                        Password*
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="block w-full px-4 py-3 rounded-lg border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-500 focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 outline-none transition-all pr-10"
                                            placeholder="Enter password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors p-1"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        className="w-4 h-4 rounded border-neutral-600 bg-neutral-800 text-[#8B5CF6] focus:ring-2 focus:ring-offset-2 focus:ring-[#8B5CF6]"
                                    />
                                    <label
                                        htmlFor="terms"
                                        className="ml-2 text-sm text-neutral-400"
                                    >
                                        I agree to terms & conditions
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-3.5 px-4 rounded-xl shadow-md shadow-[#8B5CF6]/20 text-sm font-bold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Logging in..." : "Login"}
                            </button>
                        </form>

                        <div className="text-center space-y-2">
                            <p className="text-neutral-400">
                                Don’t have an Account?{" "}
                                <Link
                                    href="/auth/patient-register"
                                    className="font-semibold text-[#8B5CF6] hover:text-[#7C3AED] transition-colors"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="hidden lg:flex lg:w-1/2 h-full bg-gradient-to-br from-purple-900 to-blue-900 relative overflow-hidden">
                <img
                    src="/images/patentimage.png"
                    alt="Medical AI"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-purple-900/20 mix-blend-multiply"></div>

                <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-4 px-8">
                    <Link
                        href="/auth/patient-register"
                        className="px-6 py-2.5 text-sm font-semibold text-[#8B5CF6] bg-white rounded-full hover:bg-gray-100 transition-colors"
                    >
                        Register as a Patient
                    </Link>
                    <Link
                        href="/auth/login"
                        className="px-6 py-2.5 text-sm font-semibold text-white bg-[#8B5CF6] rounded-full hover:bg-[#7C3AED] transition-colors"
                    >
                        Login as a Doctor
                    </Link>
                </div>
            </div>
        </div>
    );
}