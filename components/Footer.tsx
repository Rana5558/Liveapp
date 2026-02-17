import { FaFacebookF, FaGoogle, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

export default function Footer() {
    return (
        <footer className="w-full bg-gradient-to-b from-[#0d0d0d] to-[#000000] text-white py-24 px-6 md:px-16 relative">

            {/* GRID TOP SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-16 max-w-7xl mx-auto">

                {/* --- NAVIGATION --- */}
                <div>
                    <h4 className="text-gray-400 text-sm mb-6">Navigation</h4>

                    <ul className="space-y-3 text-sm text-white/80">
                        <li>Get Started</li>
                        <li>About Us</li>
                        <li>Pricing</li>
                        <li>Payment</li>
                        <li>Terms & Conditions</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                {/* --- EMPTY SPACER COLUMN (Figma style) --- */}
                <div>
                    <h4 className="text-gray-400 text-sm mb-6"> </h4>

                    <ul className="space-y-3 text-sm text-white/80">
                        <li>FAQ’s</li>
                        <li>Blogs</li>
                        <li>Contacts</li>
                    </ul>
                </div>

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
                            <IconCircle><FaFacebookF size={16} /></IconCircle>
                            <IconCircle><FaGoogle size={16} /></IconCircle>
                            <IconCircle><FaInstagram size={16} /></IconCircle>
                            <IconCircle><FaYoutube size={16} /></IconCircle>
                        </div>
                    </div>

                    {/* LET'S CHAT */}
                    <div>
                        <h4 className="text-gray-400 text-sm mb-4">Let’s chat</h4>

                        <div className="flex items-center gap-4">
                            <IconCircle><FaWhatsapp size={16} /></IconCircle>
                            <IconCircle><IoIosSend size={18} /></IconCircle>
                            <IconCircle><FaWhatsapp size={16} /></IconCircle>
                        </div>
                    </div>
                </div>
            </div>

            {/* LOCATION */}
            <div className="max-w-7xl mx-auto mt-20">
                <h4 className="text-gray-400 text-sm mb-2">Location</h4>
                <p className="text-white/80 text-sm">
                    2972 Westheimer Rd. Santa Ana, Illinois 85486
                </p>
            </div>

            {/* --- BOTTOM FOOTER BAR --- */}
            <div className="max-w-7xl mx-auto mt-24 flex justify-between items-center text-sm">

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
function IconCircle({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition cursor-pointer">
            {children}
        </div>
    );
}
