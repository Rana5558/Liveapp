"use client";

import React from "react";
import Image from "next/image";
import { Pencil, Camera } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileSchema, ProfileFormData,
  passwordSchema, PasswordFormData,
} from "@/lib/validations/schemas";
import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function ProfileDetails() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ── Profile form ────────────────────────────────────────────────────────
  const {
    register: regProfile,
    handleSubmit: handleProfile,
    control: profileControl,
    formState: { errors: profileErrors, isValid: profileValid, isSubmitting: profileSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: { fullName: "John Doe", email: "johndoe@gmail.com" },
  });

  const onProfileSubmit = (data: ProfileFormData) => {
    console.log("Profile updated:", data);
    toast.success("Profile updated successfully!");
  };

  // ── Password form ────────────────────────────────────────────────────────
  const {
    register: regPassword,
    handleSubmit: handlePassword,
    reset: resetPassword,
    control: passwordControl,
    formState: { errors: passwordErrors, isValid: passwordValid, isSubmitting: passwordSubmitting },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
  });

  const fullNameValue = useWatch({ name: "fullName", control: profileControl });
  const emailValue = useWatch({ name: "email", control: profileControl });
  const passwordValue = useWatch({ name: "password", control: passwordControl, defaultValue: "" });

  // password strength
  const getStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: "", color: "" };
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 10) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (score <= 1) return { score, label: "Weak", color: "bg-red-500" };
    if (score <= 3) return { score, label: "Fair", color: "bg-yellow-500" };
    return { score, label: "Strong", color: "bg-green-500" };
  };
  const strength = getStrength(passwordValue);

  const onPasswordSubmit = (data: PasswordFormData) => {
    console.log("Password changed:", data);
    toast.success("Password updated successfully!");
    resetPassword();
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Avatar + Name Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
        <div className="relative shrink-0">
          <Image
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile"
            width={80}
            height={80}
            className="rounded-2xl object-cover border-2 border-neutral-700"
          />
          <button className="absolute -bottom-1.5 -right-1.5 bg-primary text-white p-1.5 rounded-full shadow hover:bg-primary/90 transition-colors border-2 border-neutral-900">
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="text-center sm:text-left">
          <p className="text-white font-bold text-lg">{fullNameValue}</p>
          <p className="text-neutral-400 text-sm">{emailValue}</p>
          <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 mt-2 rounded-full bg-primary/10 text-primary border border-primary/20">
            Patient Account
          </span>
        </div>
      </div>

      {/* Personal Information */}
      <form onSubmit={handleProfile(onProfileSubmit)} noValidate>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-4 sm:space-y-5">
          <h3 className="text-white font-bold text-base sm:text-lg">Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-neutral-400 text-sm font-medium">Full Name</label>
              <input
                type="text"
                {...regProfile("fullName")}
                className={`w-full bg-neutral-950 border text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${profileErrors.fullName ? "border-red-500 focus:ring-red-500/30" : "border-neutral-800 focus:ring-primary/40 focus:border-primary/50"}`}
              />
              {profileErrors.fullName && <p className="text-xs text-red-400">{profileErrors.fullName.message}</p>}
            </div>
            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-neutral-400 text-sm font-medium">Email Address</label>
              <input
                type="email"
                {...regProfile("email")}
                className={`w-full bg-neutral-950 border text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${profileErrors.email ? "border-red-500 focus:ring-red-500/30" : "border-neutral-800 focus:ring-primary/40 focus:border-primary/50"}`}
              />
              {profileErrors.email && <p className="text-xs text-red-400">{profileErrors.email.message}</p>}
            </div>
          </div>
          <button
            type="submit"
            disabled={profileSubmitting || !profileValid}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Pencil className="w-3.5 h-3.5" />
            {profileSubmitting ? "Saving..." : "Update Profile"}
          </button>
        </div>
      </form>

      {/* Change Password */}
      <form onSubmit={handlePassword(onPasswordSubmit)} noValidate>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-4 sm:space-y-5">
          <h3 className="text-white font-bold text-base sm:text-lg">Change Password</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* New Password */}
            <div className="space-y-1.5">
              <label className="block text-neutral-400 text-sm font-medium">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...regPassword("password")}
                  className={`w-full bg-neutral-950 border text-white rounded-xl px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 transition-all ${passwordErrors.password ? "border-red-500 focus:ring-red-500/30" : "border-neutral-800 focus:ring-primary/40 focus:border-primary/50"}`}
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordErrors.password && <p className="text-xs text-red-400">{passwordErrors.password.message}</p>}
              {/* Strength indicator */}
              {passwordValue.length > 0 && (
                <div className="space-y-1 mt-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength.score ? strength.color : "bg-neutral-700"}`} />
                    ))}
                  </div>
                  {strength.label && (
                    <p className={`text-xs font-medium ${strength.score <= 1 ? "text-red-400" : strength.score <= 3 ? "text-yellow-400" : "text-green-400"}`}>
                      {strength.label} password
                    </p>
                  )}
                </div>
              )}
            </div>
            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="block text-neutral-400 text-sm font-medium">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  {...regPassword("confirmPassword")}
                  className={`w-full bg-neutral-950 border text-white rounded-xl px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 transition-all ${passwordErrors.confirmPassword ? "border-red-500 focus:ring-red-500/30" : "border-neutral-800 focus:ring-primary/40 focus:border-primary/50"}`}
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordErrors.confirmPassword && <p className="text-xs text-red-400">{passwordErrors.confirmPassword.message}</p>}
            </div>
          </div>
          <button
            type="submit"
            disabled={passwordSubmitting || !passwordValid}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {passwordSubmitting ? "Updating..." : "Update Password →"}
          </button>
        </div>
      </form>
    </div>
  );
}
