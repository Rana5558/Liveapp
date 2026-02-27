"use client";

import React, { useState } from "react";
import { Pencil, Camera } from "lucide-react";

export default function ProfileDetails() {
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@gmail.com");
  const [password, setPassword] = useState("••••••••");
  const [confirmPassword, setConfirmPassword] = useState("••••••••");

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Avatar + Name Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
        <div className="relative shrink-0">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile"
            className="w-20 h-20 rounded-2xl object-cover border-2 border-neutral-700"
          />
          <button className="absolute -bottom-1.5 -right-1.5 bg-primary text-white p-1.5 rounded-full shadow hover:bg-primary/90 transition-colors border-2 border-neutral-900">
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="text-center sm:text-left">
          <p className="text-white font-bold text-lg">{fullName}</p>
          <p className="text-neutral-400 text-sm">{email}</p>
          <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 mt-2 rounded-full bg-primary/10 text-primary border border-primary/20">
            Patient Account
          </span>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-4 sm:space-y-5">
        <h3 className="text-white font-bold text-base sm:text-lg">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div className="space-y-1.5">
            <label className="block text-neutral-400 text-sm font-medium">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-neutral-400 text-sm font-medium">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all"
            />
          </div>
        </div>
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-primary/20">
          <Pencil className="w-3.5 h-3.5" />
          Update Profile
        </button>
      </div>

      {/* Password */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-4 sm:space-y-5">
        <h3 className="text-white font-bold text-base sm:text-lg">Change Password</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div className="space-y-1.5">
            <label className="block text-neutral-400 text-sm font-medium">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-neutral-400 text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all"
            />
          </div>
        </div>
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-primary/20">
          Update Password →
        </button>
      </div>
    </div>
  );
}
