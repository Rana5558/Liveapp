import Link from "next/link";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function AIPlatformFeatures() {
    return (
        <section className="py-24 px-6 bg-black text-white space-y-32">

            {/* Feature 1: Fingertip Doctor */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                    <div>
                        <span className="text-primary font-semibold tracking-wider uppercase text-sm">AI Features</span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-2 leading-tight">
                            Aliveai.ai You Fingertip <br /> Doctor
                        </h2>
                    </div>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                        Aliveai.Ai An Ai Based Doctor Platform Which Will Help You Understand Predict About Your Health
                    </p>

                    <ul className="space-y-4">
                        {[
                            "100 + different departments",
                            "Scan reports medicines",
                            "Schedule online appointments",
                            "Video Chat with real doctors"
                        ].map((item, index) => (
                            <li key={index} className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                                    <CheckCircle2 className="w-3 h-3 text-primary" />
                                </div>
                                <span className="text-gray-300">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Image for Feature 1 */}
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-white/30 to-gray-400/30 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                    <div className="relative rounded-2xl overflow-hidden shadow-[0_0_40px_-5px_rgba(255,255,255,0.15)] border border-white/20">
                        <Image
                            src="/images/Frame-1.png"
                            alt="AI Doctor Platform Interface"
                            width={800}
                            height={600}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Feature 2: Video Chat */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Order swap on mobile/desktop appropriately if needed */}
                <div className="space-y-8">
                    <div>
                        <span className="text-primary font-semibold tracking-wider uppercase text-sm">AI Features</span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-2 leading-tight">
                            Video Chat With Doctors
                        </h2>
                    </div>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                        Don't Need To Visit Clinics In Person You Can Bring A Doctor At Any Place
                    </p>

                    <ul className="space-y-4">
                        {[
                            "Enhanced Engagement",
                            "Deeper Understanding",
                            "Smooth Interactions"
                        ].map((item, index) => (
                            <li key={index} className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                                    <CheckCircle2 className="w-3 h-3 text-primary" />
                                </div>
                                <span className="text-gray-300">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Image for Feature 2 */}
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-white/30 to-gray-400/30 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                    <div className="relative rounded-2xl overflow-hidden shadow-[0_0_40px_-5px_rgba(255,255,255,0.15)] border border-white/20">
                        <Image
                            src="/images/Frame-2.png"
                            alt="Video Chat Interface"
                            width={800}
                            height={600}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>

            </div>

        </section>
    );
}
