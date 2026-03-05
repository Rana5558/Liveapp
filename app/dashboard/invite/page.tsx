"use client";

import React, { useState } from "react";
import { Copy, Mail, CheckCheck, Link2, Users, Gift } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inviteSchema, InviteFormData } from "@/lib/validations/schemas";
import { toast } from "sonner";

const referralLink = "https://alive.ai/invite?ref=USR-2024-XK9";

const invitedFriends = [
    { id: 1, name: "Arjun Mehta", email: "arjun@example.com", status: "Joined", date: "Feb 15, 2026" },
    { id: 2, name: "Priya Nair", email: "priya@example.com", status: "Pending", date: "Feb 20, 2026" },
    { id: 3, name: "Riya Sharma", email: "riya@example.com", status: "Joined", date: "Feb 10, 2026" },
];

export default function InvitePage() {
    const [copied, setCopied] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid, isSubmitting },
    } = useForm<InviteFormData>({
        resolver: zodResolver(inviteSchema),
        mode: "onChange",
    });

    const handleCopy = async () => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(referralLink);
            } else {
                const textArea = document.createElement("textarea");
                textArea.value = referralLink;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand("copy");
                document.body.removeChild(textArea);
            }
            setCopied(true);
            toast.success("Link copied to clipboard!");
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy: ", err);
            toast.error("Failed to copy link. Please try manually.");
        }
    };

    const onSubmit = (data: InviteFormData) => {
        toast.success(`Invite sent successfully to ${data.email}!`);
        reset();
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 space-y-5 sm:space-y-6">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Invite People</h1>
                <p className="text-neutral-400 text-sm sm:text-base">Bring your friends and family to Alive.ai — earn rewards together</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
                <div className="lg:col-span-2 space-y-4 sm:space-y-5">
                    {/* Referral Link */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                <Link2 className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm sm:text-base">Your Referral Link</p>
                                <p className="text-neutral-500 text-xs">Share this link to invite friends</p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3">
                            <span className="flex-1 text-neutral-400 text-xs sm:text-sm font-mono break-all sm:truncate">{referralLink}</span>
                            <button
                                onClick={handleCopy}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${copied
                                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                    : "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20"
                                    }`}
                            >
                                {copied ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        </div>
                    </div>

                    {/* Email Invite */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                <Mail className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm sm:text-base">Invite via Email</p>
                                <p className="text-neutral-500 text-xs">Send a direct invite to their inbox</p>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-2">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex-1 space-y-1">
                                    <input
                                        type="email"
                                        {...register("email")}
                                        placeholder="friend@example.com"
                                        className={`w-full bg-neutral-950 border text-white placeholder-neutral-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${errors.email
                                            ? "border-red-500 focus:ring-red-500/30"
                                            : "border-neutral-800 focus:ring-primary/40 focus:border-primary/50"
                                            }`}
                                    />
                                    {errors.email && (
                                        <p className="text-xs text-red-400">{errors.email.message}</p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !isValid}
                                    className="px-5 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap w-full sm:w-auto"
                                >
                                    {isSubmitting ? "Sending..." : "Send Invite"}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Invited Friends List */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-white font-semibold text-sm sm:text-base">People You&apos;ve Invited</p>
                            <span className="text-xs text-neutral-500">{invitedFriends.length} invited</span>
                        </div>
                        <div className="space-y-3">
                            {invitedFriends.map((friend) => (
                                <div key={friend.id} className="flex items-center gap-3 sm:gap-4 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3">
                                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-800 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                        {friend.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white text-sm font-medium truncate">{friend.name}</p>
                                        <p className="text-neutral-500 text-xs truncate">{friend.email}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${friend.status === "Joined"
                                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                                            : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                            }`}>
                                            {friend.status}
                                        </span>
                                        <p className="text-neutral-600 text-xs mt-1 hidden sm:block">{friend.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Stats & Rewards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-4">
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-primary" />
                            <p className="text-white font-semibold text-sm">Referral Stats</p>
                        </div>
                        <div className="space-y-3">
                            {[{ label: "Invited", value: "3" }, { label: "Joined", value: "2" }, { label: "Pending", value: "1" }].map((stat) => (
                                <div key={stat.label} className="flex items-center justify-between py-2 border-b border-neutral-800 last:border-0">
                                    <span className="text-neutral-400 text-sm">{stat.label}</span>
                                    <span className="text-white font-bold">{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 sm:p-6 space-y-3">
                        <div className="flex items-center gap-2">
                            <Gift className="w-4 h-4 text-primary" />
                            <p className="text-white font-semibold text-sm">Earn Rewards</p>
                        </div>
                        <p className="text-neutral-400 text-sm leading-relaxed">
                            Get <span className="text-primary font-semibold">1 free month</span> of Premium for every friend who signs up using your referral link.
                        </p>
                        <div className="bg-primary/10 border border-primary/20 rounded-lg px-3 py-2 text-center">
                            <p className="text-primary font-bold text-xl">2</p>
                            <p className="text-neutral-400 text-xs">Rewards Earned</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
