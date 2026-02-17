"use client";

import { ArrowUpRight, ArrowDown } from "lucide-react";

const faqs = [
    {
        id: "01",
        question: "Is my data safe with Aliveai.ai?",
        answer: "Lorem Ipsum Dolor Sit Amet Consectetur. Nec Quisque Diam Duis Massa. Aliquet Massa Hendrerit Morbi Adipiscing Risus Feugiat Adipiscing Malesuada. Dignissim Non Commodo Gravida Laoreet Nisi. Nulla Massa Sit Mauris Eget Risus Venenatis."
    },
    {
        id: "02",
        question: "What is Aliveai.ai and how does it work?",
        answer: "Aliveai.ai uses advanced algorithms to process your inputs and generate high-quality content instantly, ensuring efficiency and creativity."
    },
    {
        id: "03",
        question: "Will I get real doctors to chat ?",
        answer: "Our platform connects you with certified professionals to ensure you receive accurate and reliable medical advice."
    },
    {
        id: "04",
        question: "How does the real-time video chat feature work?",
        answer: "You can initiate a video call directly through the interface, connecting you face-to-face with available specialists for a consultation."
    },
    {
        id: "05",
        question: "What are the benefits of the premium plans compared to the free plan?",
        answer: "Premium plans offer unlimited access, priority support, advanced analysis tools, and personalized health tracking features."
    }
];

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setActiveFAQIndex } from "@/lib/features/ui/uiSlice";

import { RootState } from "@/lib/store";

export default function FAQ() {
    const dispatch = useAppDispatch();
    const openIndex = useAppSelector((state: RootState) => state.ui.activeFAQIndex);

    const toggleFAQ = (index: number) => {
        dispatch(setActiveFAQIndex(openIndex === index ? null : index));
    };

    return (
        <section id="faq" className="py-24 px-6 max-w-5xl mx-auto bg-black border-t border-white/5">
            <div className="text-center mb-20 space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold text-white">Everything You Need To Know</h2>
                <p className="text-gray-400 text-sm md:text-base">Here Are Some Frequently Asked Questions</p>
            </div>

            <div className="space-y-0">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="py-8 border-b border-white/10 group transition-all duration-300"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex items-start justify-between text-left focus:outline-none"
                        >
                            <div className="flex items-start gap-8 md:gap-16">
                                <span className="text-white/70 font-mono text-lg pt-1">{faq.id}</span>
                                <div className="space-y-4 max-w-2xl">
                                    <h3
                                        className={`text-lg md:text-xl font-bold transition-colors duration-300 ${openIndex === index ? 'text-[#8B5CF6]' : 'text-white group-hover:text-gray-300'
                                            }`}
                                    >
                                        {faq.question}
                                    </h3>

                                    <div
                                        className={`grid transition-all duration-300 ease-in-out ${openIndex === index
                                            ? 'grid-rows-[1fr] opacity-100'
                                            : 'grid-rows-[0fr] opacity-0'
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 ${openIndex === index
                                    ? 'border-white/20 bg-white/5 rotate-180'
                                    : 'border-white/10 hover:border-white/30'
                                    }`}
                            >
                                {openIndex === index ? (
                                    <ArrowUpRight className="text-white w-4 h-4 rotate-45" />
                                ) : (
                                    <ArrowUpRight className="text-gray-500 w-4 h-4 group-hover:text-white" />
                                )}
                            </div>
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
