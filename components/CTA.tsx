"use client";

import Image from "next/image";
import Link from "next/link";

export default function CTA() {
    return (
        <section className="w-full flex justify-center px-4 py-12 sm:py-16">
            <div className="relative w-full max-w-6xl sm:max-w-7xl rounded-2xl bg-[#161616] bg-gradient-to-br from-[#1a1a1a] via-[#111111] to-[#0b0b0b] border border-white/5 shadow-[0px_0px_40px_rgba(0,0,0,0.28)] px-6 sm:px-12 md:px-20 py-12 sm:py-20 overflow-hidden">

                {/* 🔹 Top-left big vector */}
                <Image
                    src="/images/vector.png"
                    alt="Decorative Star"
                    width={260}
                    height={260}
                    className="absolute top-0 left-0 opacity-20"
                />

                {/* 🔹 Top-right small vector */}
                <Image
                    src="/images/vector.png"
                    alt="Decorative Star"
                    width={90}
                    height={90}
                    className="absolute top-10 right-14 opacity-20"
                />

                {/* 🔹 Bottom-right medium vector */}
                <Image
                    src="/images/vector.png"
                    alt="Decorative Star"
                    width={110}
                    height={110}
                    className="absolute bottom-12 right-20 opacity-20"
                />

                {/* 🔹 Bottom-left medium vector */}
                <Image
                    src="/images/vector.png"
                    alt="Decorative Star"
                    width={110}
                    height={110}
                    className="absolute bottom-14 left-16 opacity-20"
                />

                {/* TEXT */}
                <div className="relative z-10 text-center">
                    <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold leading-snug">
                        Aliveai.ai has no limitation.
                    </h2>

                    <p className="mt-3 text-white text-lg sm:text-2xl md:text-3xl font-medium leading-snug max-w-2xl mx-auto">
                        Get started on a journey with Aliveai.ai.
                    </p>

                    <div className="mt-8">
                    <Link href="/auth/register" className="inline-block px-6 sm:px-10 py-3 sm:py-4 bg-white text-black rounded-full font-medium text-sm sm:text-base hover:bg-gray-100 shadow-lg transition">
                        Create an Account
                    </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
