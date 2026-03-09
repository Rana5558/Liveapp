"use client";

import Image from "next/image";

const showComingSoon = (action: string) => {
    alert(`${action} feature is coming soon!`);
};

export default function Pricing() {
    return (
        <section className="w-full py-16 sm:py-20 px-4 sm:px-6 md:px-10 bg-[#0a0a0a]">
            {/* ---------- HEADER ---------- */}
            <div className="text-center space-y-4 mb-20">
                <div className="inline-block bg-[#cfc8ff33] text-[#b19cff] px-4 py-1 rounded-full text-sm font-medium">
                    Plan & Pricing
                </div>

                <h2 className="text-3xl md:text-5xl font-bold text-white leading-snug">
                    Choose the Plan that’s Right For You
                </h2>

                <p className="text-gray-400 text-sm md:text-base">
                    Provide Descriptions, Get Instant AI Generated Content
                </p>
            </div>

            {/* ---------- PRICING CARDS ---------- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-2 md:px-0">

                {/* FREE PLAN CARD */}
                <div className="bg-[#131313] rounded-3xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.45)] overflow-hidden flex flex-col justify-between">

                    <Image
                        src="/images/pric1.png"
                        alt="Free Plan"
                        width={600}
                        height={300}
                        className="w-full h-48 object-cover"
                    />

                    <div className="p-6 sm:p-8 space-y-6">
                        <h3 className="text-white text-2xl font-semibold">Free</h3>

                        <p className="text-white/80 text-base">
                            USD $0 <span className="text-white/50">/ month</span>
                        </p>

                        <ul className="space-y-3 text-white/70 text-sm leading-relaxed">
                            <li>✔ Limited access to Multiple chat thread (20 Threads)</li>
                            <li>✔ Basic Dynamic Suggestions</li>
                            <li>✔ Limited chat history</li>
                            <li>✔ Multilingual Support (2 languages)</li>
                        </ul>
                    </div>

                    <button
                        onClick={() => showComingSoon("Plan management")}
                        disabled
                        className="w-full bg-[#222222] text-white py-3 sm:py-4 text-sm border-t border-white/10 rounded-b-3xl transition-colors hover:bg-[#333333] cursor-not-allowed"
                    >
                        Your Current Plan
                    </button>
                </div>

                {/* PLUS PLAN CARD — CLEAN BACKGROUND, NO PURPLE GLOW */}
                <div className="bg-[#131313] rounded-3xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.45)] overflow-hidden flex flex-col justify-between relative">

                    <div className="absolute top-4 right-4 bg-[#b19cff] text-black text-xs 
                                    px-3 py-1 rounded-full font-medium">
                        Best Selling
                    </div>

                    <Image
                        src="/images/pric2.png"
                        alt="Plus Plan"
                        width={600}
                        height={300}
                        className="w-full h-48 object-cover"
                    />

                    <div className="p-6 sm:p-8 space-y-6">
                        <h3 className="text-white text-2xl font-semibold">Plus</h3>

                        <p className="text-white/80 text-base">
                            USD $20 <span className="text-white/50">/ month</span>
                        </p>

                        <ul className="space-y-3 text-white/70 text-sm leading-relaxed">
                            <li>✔ Access to unlimited chat thread</li>
                            <li>✔ Schedule online appointment</li>
                            <li>✔ Live video call with experts</li>
                            <li>✔ Read Prescriptions</li>
                        </ul>
                    </div>

                    <button
                        onClick={() => showComingSoon("Upgrade to Plus plan")}
                        className="w-full bg-[#b19cff] text-black py-3 sm:py-4 text-sm font-medium hover:bg-[#a68cff] transition-colors rounded-b-3xl"
                    >
                        Upgrade to Plus
                    </button>
                </div>

                {/* TEAM PLAN CARD */}
                <div className="bg-[#131313] rounded-3xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.45)] overflow-hidden flex flex-col justify-between">

                    <Image
                        src="/images/price3.png"
                        alt="Team Plan"
                        width={600}
                        height={300}
                        className="w-full h-48 object-cover"
                    />

                    <div className="p-6 sm:p-8 space-y-6">
                        <h3 className="text-white text-2xl font-semibold">Team</h3>

                        <p className="text-white/80 text-base">
                            USD $40 <span className="text-white/50">/month (per user)</span>
                        </p>

                        <ul className="space-y-3 text-white/70 text-sm leading-relaxed">
                            <li>✔ Unlimited chat thread</li>
                            <li>✔ Unlimited chat history</li>
                            <li>✔ Live Video call with doctor</li>
                            <li>✔ Read Prescriptions</li>
                            <li>✔ Predict future health</li>
                            <li>✔ Scan and find about medicines</li>
                        </ul>
                    </div>

                    <button
                        onClick={() => showComingSoon("Upgrade to Team plan")}
                        className="w-full bg-[#b19cff] text-black py-3 sm:py-4 text-sm font-medium hover:bg-[#a68cff] transition-colors rounded-b-3xl"
                    >
                        Upgrade to Team
                    </button>
                </div>

            </div>
        </section>
    );
}
