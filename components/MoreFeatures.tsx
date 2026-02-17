export default function MoreFeatures() {
    const features = [
        {
            title: "Lorem ipsum dolor sit",
            description: "Mattis eget mauris elementum id bibendum amet massa dui urna. Urna leo nibh sociis amet. Aenean sit sed etiam vitae orci volutpat massa."
        },
        {
            title: "Vel dis diam in odio. Ac",
            description: "Malesuada et nunc in ut id mattis. Mattis gravida velit massa mi nisi orci non arcu. Pharetra sit."
        },
        {
            title: "Lorem ipsum dolor sit amet",
            description: "Sapien est purus dictum facilisi mauris fusce lorem neque. Massa praesent pulvinar enim proin."
        },
        {
            title: "Lorem ipsum dolor sit amet",
            description: "Amet tincidunt tincidunt dolor sit quis donec. Sed non iaculis ipsum hac feugiat felis sed. At."
        },
        {
            title: "Lorem ipsum dolor sit",
            description: "In consequat mattis neque proin suspendisse felis ullamcorper vitae pellentesque. Nam id orci viverra."
        },
        {
            title: "Lorem ipsum dolor sit amet",
            description: "Lorem ipsum dolor sit amet consectetur. Dui quisque eget integer ac quis. Et mi nec ultricies in."
        }
    ];

    return (
        <section className="py-24 px-6 bg-black text-white">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <span className="text-gray-500 text-3xl md:text-5xl font-medium block mb-4">More features</span>
                    <h2 className="text-4xl md:text-6xl font-medium text-white tracking-tight">
                        Aliveai.Ai offers to an individual
                    </h2>
                </div>

                <div className="border-t border-white/20 mb-16"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                    {features.map((feature, index) => (
                        <div key={index} className="space-y-4">
                            <h3 className="text-xl font-medium text-white">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
