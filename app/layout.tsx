import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Use Outfit for a modern tech look
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"], // Include necessary weights
});

export const metadata: Metadata = {
  title: "Aliveai.ai — AI-Powered Healthcare Platform",
  description: "Connect with doctors, get AI health insights, and manage your health — all in one place. Powered by Aliveai.ai.",
};

import StoreProvider from "@/components/StoreProvider";

import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased text-white bg-black`}>
        {/* Skip to main content link for keyboard navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg"
        >
          Skip to main content
        </a>
        <StoreProvider>
          <main id="main-content" role="main">
            {children}
          </main>
          <Toaster position="top-right" richColors theme="dark" />
        </StoreProvider>
      </body>
    </html>
  );
}
