import Link from "next/link";
import Image from "next/image";
import { MessageSquare, Layout, Calendar, Sparkles, Clock } from "lucide-react";

export default function Trending() {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 text-center bg-black">
            <div className="max-w-4xl mx-auto mb-8 space-y-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                    See Trending Prompts
                </h2>
                <p className="text-gray-400 text-sm sm:text-base mb-6 max-w-3xl mx-auto leading-relaxed">
                    Discover endless creativity with Aliveai.ai. Generate diverse content effortlessly using prompts. Stay updated with real-time trends, automate tasks, and extract insights from any document or URL.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                    <button className="px-6 py-2 rounded-full border border-white text-white font-medium hover:bg-white hover:text-black transition-all cursor-pointer w-full sm:w-auto">
                        Login
                    </button>
                    <button className="px-6 py-2 rounded-full border border-white text-white font-medium hover:bg-white hover:text-black transition-all cursor-pointer w-full sm:w-auto">
                        Sign Up
                    </button>
                </div>
            </div>

            {/* Dashboard Mockup Image */}
            <div className="max-w-6xl mx-auto mt-12 relative rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#1A1A1A]">
                <Image
                    src="/images/Chat with Ai.png"
                    alt="Chat with AI Dashboard"
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover"
                />
            </div>
        </section>
    );
}
