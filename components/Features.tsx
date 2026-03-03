const features = [
    {
        id: "feat-1",
        icon: "/images/logo1.png",
        title: "Diabetes Analysis",
        description: "Let our AI-powered service take the hard work out of content creation. Get started today with AI.",
    },
    {
        id: "feat-2",
        icon: "/images/logo2.png",
        title: "Cardiovascular Analysis",
        description: "Access up-to-date information on any topic during your conversations with AI-Con.",
    },
    {
        id: "feat-3",
        icon: "/images/logo3.png",
        title: "Emotional Intelligence",
        description: "Enhances the empathetic aspect of your interactions, making your conversations more meaningful.",
    },
    {
        id: "feat-4",
        icon: "/images/logo4.png",
        title: "Liver Condition Analysis",
        description: "AI-Con offers a variety of personalities for your AI companion, such as Explorer, Sage, etc.",
    },
    {
        id: "feat-5",
        icon: "/images/logo5.png",
        title: "Reading Reports",
        description: "AI-Con provides dynamic topic suggestions based on your interests and previous conversations.",
    },
    {
        id: "feat-6",
        icon: "/images/logo6.png",
        title: "OPD on Fingertips",
        description: "Personalization makes your interactions more engaging and tailored to your unique needs.",
    }
];

export default function Features() {
    return (
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
            {/* Header */}
            <div className="text-center mb-12 space-y-4">
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#8B5CF6] text-black text-xs font-semibold tracking-wide">
                    Get in touch for free
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white pt-4">
                    Instant Content Generation with AI
                </h2>
                <p className="text-gray-400 text-sm md:text-base font-medium max-w-2xl mx-auto">
                    Provide Descriptions, Get Instant AI Generated Content
                </p>
            </div>

            {/* Feature Cards */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-0">
                {features.map((feature) => (
                    <div
                        key={feature.id}
                        className="group relative p-8 h-full rounded-2xl bg-[#0F0F0F] border border-white/5
                                   hover:border-white/10 transition-all duration-300 flex flex-col items-center text-center space-y-4
                                   shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/40"
                    >
                        <div className="mb-2 p-3 inline-flex items-center justify-center rounded-xl bg-transparent group-hover:scale-110 transition-transform duration-300">
                            <img
                                src={feature.icon}
                                alt={feature.title}
                                className="w-8 h-8 object-contain"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
