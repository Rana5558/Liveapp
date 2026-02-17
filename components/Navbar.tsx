import Link from "next/link";
import { Activity } from "lucide-react"; // LIVE pulse icon

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-12 lg:px-14 h-24">
        {/* Logo */}
        <div className="flex items-center gap-1">
          <div className="text-2xl font-bold text-white tracking-widest flex items-center">
            L<Activity className="w-6 h-6 text-primary mx-0.5" />VE
          </div>
        </div>

        {/* Links & Buttons */}
        <div className="flex items-center gap-6">
          {/* Links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-medium text-gray-300">
            <Link href="#about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link href="#faq" className="hover:text-white transition-colors">
              FAQ's
            </Link>
            <Link href="#contact" className="hover:text-white transition-colors">
              Contact US
            </Link>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <button className="px-5 py-2 text-xs font-semibold text-primary bg-white rounded-lg hover:bg-gray-100 transition-colors">
              Chat As Patient
            </button>
            <button className="px-5 py-2 text-xs font-semibold text-white bg-primary rounded-lg hover:bg-violet-600 transition-colors shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              I'm a Doctor
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
