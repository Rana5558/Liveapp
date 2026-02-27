"use client";

import React, { useState } from "react";
import { MessageSquare, Star, Send, CheckCircle2 } from "lucide-react";

const feedbackCategories = [
    "General Experience",
    "AI Response Quality",
    "Appointment Booking",
    "Documents & Reports",
    "UI / Design",
    "Other",
];

export default function FeedbackPage() {
    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);
    const [category, setCategory] = useState("General Experience");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || rating === 0) return;
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-10 sm:p-16 flex flex-col items-center justify-center text-center max-w-lg mx-auto mt-6 sm:mt-10">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4">
                        <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-green-400" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Thank you!</h2>
                    <p className="text-neutral-400 text-sm sm:text-base mb-6">Your feedback has been submitted. We truly appreciate your input!</p>
                    <button
                        onClick={() => { setSubmitted(false); setRating(0); setMessage(""); setCategory("General Experience"); }}
                        className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl text-sm transition-all"
                    >
                        Submit Another
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 space-y-5 sm:space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Feedback</h1>
                <p className="text-neutral-400 text-sm sm:text-base">Help us improve by sharing your experience</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
                {/* Feedback Form — full width on mobile/tablet, 2/3 on desktop */}
                <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4 sm:space-y-5">
                    {/* Star Rating */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-3">
                        <label className="text-white font-semibold text-sm block">Overall Rating</label>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    type="button"
                                    key={star}
                                    onMouseEnter={() => setHovered(star)}
                                    onMouseLeave={() => setHovered(0)}
                                    onClick={() => setRating(star)}
                                    className="focus:outline-none"
                                    aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                                >
                                    <Star
                                        className={`w-7 h-7 sm:w-8 sm:h-8 transition-all duration-100 ${star <= (hovered || rating)
                                            ? "text-yellow-400 fill-yellow-400 scale-110"
                                            : "text-neutral-700"
                                            }`}
                                    />
                                </button>
                            ))}
                            {rating > 0 && (
                                <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-neutral-400">
                                    {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Category */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-3">
                        <label className="text-white font-semibold text-sm block">Feedback Category</label>
                        <div className="flex flex-wrap gap-2">
                            {feedbackCategories.map((cat) => (
                                <button
                                    type="button"
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all border ${category === cat
                                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                        : "bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-white hover:border-neutral-600"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Message */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-3">
                        <label className="text-white font-semibold text-sm block">Your Message</label>
                        <textarea
                            rows={5}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tell us what you think — what worked well, what could be better..."
                            className="w-full bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all"
                        />
                        <p className="text-neutral-600 text-xs text-right">{message.length} / 500</p>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={!message.trim() || rating === 0}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-4 h-4" />
                        Submit Feedback
                    </button>
                </form>

                {/* Side Info — shows below form on mobile/tablet */}
                <div className="space-y-4">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-3">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        </div>
                        <h3 className="text-white font-semibold text-sm sm:text-base">Why your feedback matters</h3>
                        <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                            We read every piece of feedback we receive. Your input directly shapes future improvements to Alive.ai.
                        </p>
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-2">
                        <p className="text-white font-semibold text-sm">📊 Response Stats</p>
                        <div className="space-y-1.5 text-sm text-neutral-400">
                            <div className="flex justify-between"><span>Avg. response time</span><span className="text-white">2 days</span></div>
                            <div className="flex justify-between"><span>Issues resolved</span><span className="text-green-400">94%</span></div>
                            <div className="flex justify-between"><span>Happy users</span><span className="text-primary">12,400+</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
