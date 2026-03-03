export default function MoreFeatures() {
    const features = [
        {
            id: "mf-1",
            title: "Lorem ipsum dolor sit",
            description: "Mattis eget mauris elementum id bibendum amet massa dui urna. Urna leo nibh sociis amet. Aenean sit sed etiam vitae orci volutpat massa."
        },
        {
            id: "mf-2",
            title: "Vel dis diam in odio. Ac",
            description: "Malesuada et nunc in ut id mattis. Mattis gravida velit massa mi nisi orci non arcu. Pharetra sit."
        },
        {
            id: "mf-3",
            title: "Lorem ipsum dolor sit amet",
            description: "Sapien est purus dictum facilisi mauris fusce lorem neque. Massa praesent pulvinar enim proin."
        },
        {
            id: "mf-4",
            title: "Lorem ipsum dolor sit amet",
            description: "Amet tincidunt tincidunt dolor sit quis donec. Sed non iaculis ipsum hac feugiat felis sed. At."
        },
        {
            id: "mf-5",
            title: "Lorem ipsum dolor sit",
            description: "In consequat mattis neque proin suspendisse felis ullamcorper vitae pellentesque. Nam id orci viverra."
        },
        {
            id: "mf-6",
            title: "Lorem ipsum dolor sit amet",
            description: "Lorem ipsum dolor sit amet consectetur. Dui quisque eget integer ac quis. Et mi nec ultricies in."
        }
    ];

    return (
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 sm:mb-16">
                    <span className="text-gray-400 text-lg sm:text-xl md:text-2xl font-medium block mb-3">More features</span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white tracking-tight">
                        Aliveai.ai features for individuals
                    </h2>
                </div>

                <div className="border-t border-white/20 mb-10"></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                    {features.map((feature) => (
                        <div key={feature.id} className="space-y-4">
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
