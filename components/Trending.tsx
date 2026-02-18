import Link from "next/link";
import Image from "next/image";
import { MessageSquare, Layout, Calendar, Sparkles, Clock } from "lucide-react";

export default function Trending() {
    return (
        <section className="py-24 px-6 text-center bg-black">
            <div className="max-w-4xl mx-auto mb-12 space-y-6">
                <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                    See Trending Prompts
                </h2>
                <p className="text-gray-400 text-sm md:text-base mb-8 max-w-3xl mx-auto leading-relaxed">
                    Discover endless creativity with PromptVerse. Generate diverse content effortlessly using prompts. Stay updated with real-time trends, automate tasks, and extract insights from any document or URL. All within a sleek, futuristic design. Create more, effortlessly.
                </p>

                <div className="flex items-center justify-center gap-6 pt-4">
                    {/* Login Button */}
                    <button className="px-8 py-2.5 rounded-full border border-white text-white font-medium hover:bg-white hover:text-black transition-all cursor-pointer">
                        Login
                    </button>

                    {/* Sign Up Button */}
                    <button className="px-8 py-2.5 rounded-full border border-white text-white font-medium hover:bg-white hover:text-black transition-all cursor-pointer">
                        Sign Up
                    </button>
                </div>
            </div>

            {/* Dashboard Mockup Image */}
            <div className="max-w-6xl mx-auto mt-20 relative rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#1A1A1A]">
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
