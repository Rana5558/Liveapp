"use client";

import React, { useState } from "react";
import { MessageSquare, Star, Send, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { feedbackSchema, FeedbackFormData } from "@/lib/validations/schemas";
import { toast } from "sonner";

const feedbackCategories = [
    "General Experience", "AI Response Quality", "Appointment Booking",
    "Documents & Reports", "UI / Design", "Other",
];

export default function FeedbackPage() {
    const [hovered, setHovered] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const { register, handleSubmit, setValue, watch, reset, formState: { errors, isSubmitting, isValid } } = useForm<FeedbackFormData>({
        resolver: zodResolver(feedbackSchema),
        mode: 'onChange',
        defaultValues: { rating: 0, category: "General Experience", message: "" },
    });

    const rating = watch("rating");
    const category = watch("category");
    const message = watch("message");

    const onSubmit = (data: FeedbackFormData) => {
        console.log("Feedback submitted:", data);
        setSubmitted(true);
        toast.success("Feedback submitted! Thank you for your input.");
    };

    if (submitted) {
        return (
            <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-10 sm:p-16 flex flex-col items-center justify-center text-center max-w-lg mx-auto mt-6 sm:mt-10">
                    <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4">
                        <CheckCircle2 className="w-7 h-7 text-green-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">Thank you!</h2>
                    <p className="text-neutral-400 text-sm mb-6">Your feedback has been submitted. We truly appreciate your input!</p>
                    <button onClick={() => { setSubmitted(false); reset(); }} className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl text-sm transition-all">
                        Submit Another
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 space-y-5 sm:space-y-6">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Feedback</h1>
                <p className="text-neutral-400 text-sm sm:text-base">Help us improve by sharing your experience</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
                <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 space-y-4 sm:space-y-5" noValidate>

                    {/* Star Rating */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-3">
                        <label className="text-white font-semibold text-sm block">Overall Rating <span className="text-red-400">*</span></label>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button type="button" key={star} onMouseEnter={() => setHovered(star)} onMouseLeave={() => setHovered(0)}
                                    onClick={() => setValue("rating", star, { shouldValidate: true })} className="focus:outline-none" aria-label={`Rate ${star} stars`}>
                                    <Star className={`w-7 h-7 sm:w-8 sm:h-8 transition-all duration-100 ${star <= (hovered || rating) ? "text-yellow-400 fill-yellow-400 scale-110" : "text-neutral-700"}`} />
                                </button>
                            ))}
                            {rating > 0 && <span className="ml-2 text-xs text-neutral-400">{["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}</span>}
                        </div>
                        {errors.rating && <p className="text-xs text-red-400">{errors.rating.message}</p>}
                    </div>

                    {/* Category */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-3">
                        <label className="text-white font-semibold text-sm block">Feedback Category</label>
                        <div className="flex flex-wrap gap-2">
                            {feedbackCategories.map((cat) => (
                                <button type="button" key={cat} onClick={() => setValue("category", cat, { shouldValidate: true })}
                                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all border ${category === cat ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-white hover:border-neutral-600"}`}>
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Message */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-3">
                        <label className="text-white font-semibold text-sm block">Your Message <span className="text-red-400">*</span></label>
                        <textarea rows={5} maxLength={500} {...register("message")}
                            placeholder="Tell us what you think — what worked well, what could be better..."
                            className={`w-full bg-neutral-950 border text-white placeholder-neutral-600 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 transition-all ${errors.message ? 'border-red-500 focus:ring-red-500/30' : 'border-neutral-800 focus:ring-primary/40 focus:border-primary/50'}`}
                        />
                        <div className="flex items-center justify-between">
                            {errors.message ? <p className="text-xs text-red-400">{errors.message.message}</p> : <span />}
                            <p className={`text-xs ml-auto ${(message?.length ?? 0) >= 450 ? 'text-yellow-400' : 'text-neutral-600'}`}>{message?.length ?? 0} / 500</p>
                        </div>
                    </div>

                    <button type="submit" disabled={isSubmitting || !isValid}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed">
                        <Send className="w-4 h-4" />
                        {isSubmitting ? "Submitting..." : "Submit Feedback"}
                    </button>
                </form>

                <div className="space-y-4">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <MessageSquare className="w-4 h-4 text-primary" />
                        </div>
                        <h3 className="text-white font-semibold text-sm">Why your feedback matters</h3>
                        <p className="text-neutral-400 text-xs leading-relaxed">We read every piece of feedback we receive. Your input directly shapes future improvements to Alive.ai.</p>
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
