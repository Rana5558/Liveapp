import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative w-full min-h-screen flex flex-col items-center justify-start pt-36 sm:pt-28 md:pt-24 pb-16 overflow-hidden">


            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero.png"
                    alt="Aliveai Background"
                    fill
                    className="object-cover object-bottom"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent z-0" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white drop-shadow-2xl">
                    Unlock The Power Of <span className="text-primary">Aliveai.ai</span> — the biggest revolution of the century
                </h1>
                <p className="text-gray-200 text-xs sm:text-sm md:text-base font-medium tracking-wide max-w-xl mx-auto drop-shadow-md">
                    Your Personal AI, Tailored for Every Medical Conversation, Anytime, Anywhere.
                </p>

                <div className="pt-4">
                    <button className="px-6 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm sm:text-base font-medium flex items-center gap-2 mx-auto hover:bg-white/20 transition-all shadow-[0_0_12px_rgba(255,255,255,0.06)]">
                        Start Diagnostic <Sparkles className="w-4 h-4 text-primary" />
                    </button>
                </div>
            </div>
        </section>
    );
}
