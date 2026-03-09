import Link from "next/link";
import { FaFacebookF, FaGoogle, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

export default function Footer() {
    return (
        <footer className="w-full bg-gradient-to-b from-[#0d0d0d] to-[#000000] text-white py-16 px-4 sm:px-6 md:px-12 relative">

            {/* GRID TOP SECTION */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 max-w-7xl mx-auto">

                {/* --- NAVIGATION --- */}
                <nav>
                    <h4 className="text-gray-400 text-sm mb-6">Navigation</h4>

                    <ul className="space-y-3 text-sm text-white/80">
                        <li><Link href="/auth/patient-login" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-primary rounded px-1">Get Started</Link></li>
                        <li><Link href="/" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-primary rounded px-1">About Us</Link></li>
                        <li><Link href="/#pricing" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-primary rounded px-1">Pricing</Link></li>
                        <li><Link href="/dashboard/settings" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-primary rounded px-1">Payment</Link></li>
                        <li><a href="#" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-primary rounded px-1">Terms & Conditions</a></li>
                        <li><a href="#" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-primary rounded px-1">Privacy Policy</a></li>
                    </ul>
                </nav>

                {/* --- RESOURCES --- */}
                <nav>
                    <h4 className="text-gray-400 text-sm mb-6">Resources</h4>

                    <ul className="space-y-3 text-sm text-white/80">
                        <li><a href="#" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-primary rounded px-1">FAQ's</a></li>
                        <li><a href="#" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-primary rounded px-1">Blogs</a></li>
                        <li><a href="#" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-primary rounded px-1">Contacts</a></li>
                    </ul>
                </nav>

                {/* --- CONTACT US --- */}
                <div>
                    <h4 className="text-gray-400 text-sm mb-6">Contact us</h4>

                    <ul className="space-y-3 text-sm text-white/80">
                        <li>+1 (406) 555-0120</li>
                        <li>+1 (480) 555-0103</li>
                        <li className="mt-3">hellp@Aliveai.ai</li>
                    </ul>
                </div>

                {/* --- SOCIAL & CHAT --- */}
                <div className="space-y-10">

                    {/* FOLLOW US */}
                    <div>
                        <h4 className="text-gray-400 text-sm mb-4">Follow us</h4>

                        <div className="flex items-center gap-4">
                            <IconCircle as="a" href="https://facebook.com" target="_blank" rel="noopener noreferrer" ariaLabel="Visit our Facebook page"><FaFacebookF size={16} /></IconCircle>
                            <IconCircle as="a" href="https://google.com" target="_blank" rel="noopener noreferrer" ariaLabel="Visit our Google page"><FaGoogle size={16} /></IconCircle>
                            <IconCircle as="a" href="https://instagram.com" target="_blank" rel="noopener noreferrer" ariaLabel="Visit our Instagram page"><FaInstagram size={16} /></IconCircle>
                            <IconCircle as="a" href="https://youtube.com" target="_blank" rel="noopener noreferrer" ariaLabel="Visit our YouTube channel"><FaYoutube size={16} /></IconCircle>
                        </div>
                    </div>

                    {/* LET'S CHAT */}
                    <div>
                        <h4 className="text-gray-400 text-sm mb-4">Let's chat</h4>

                        <div className="flex items-center gap-4">
                            <IconCircle as="a" href="https://wa.me/" target="_blank" rel="noopener noreferrer" ariaLabel="Chat with us on WhatsApp"><FaWhatsapp size={16} /></IconCircle>
                            <IconCircle as="a" href="mailto:hello@aliveai.ai" ariaLabel="Send us an email"><IoIosSend size={18} /></IconCircle>
                            <IconCircle as="a" href="https://telegram.me/" target="_blank" rel="noopener noreferrer" ariaLabel="Connect with us on Telegram"><FaWhatsapp size={16} /></IconCircle>
                        </div>
                    </div>
                </div>
            </div>

            {/* LOCATION */}
            <div className="max-w-7xl mx-auto mt-12">
                <h4 className="text-gray-400 text-sm mb-2">Location</h4>
                <p className="text-white/80 text-sm">
                    2972 Westheimer Rd. Santa Ana, Illinois 85486
                </p>
            </div>

            {/* --- BOTTOM FOOTER BAR --- */}
            <div className="max-w-7xl mx-auto mt-12 flex flex-col md:flex-row md:justify-between items-start md:items-center text-sm gap-6">

                <div className="text-white/40 space-y-1">
                    <p>Copyright</p>
                    <p>Privacy</p>
                    <p>All rights reserved</p>
                </div>

                <p className="text-white/50 text-sm">
                    © 2025 — Aliveai.ai
                </p>

                {/* LANGUAGE SWITCHER */}
                <div className="flex items-center gap-6 text-white/60">
                    <span>En</span>
                    <span>Es</span>
                </div>
            </div>

        </footer>
    );
}

/* ───────── ICON CIRCLE COMPONENT ───────── */
function IconCircle({
    children,
    as: Component = "div",
    ariaLabel,
    ...props
}: {
    children: React.ReactNode;
    as?: any;
    ariaLabel?: string;
    [key: string]: any;
}) {
    return (
        <Component
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-neutral-900"
            aria-label={ariaLabel}
            {...props}
        >
            {children}
        </Component>
    );
}
