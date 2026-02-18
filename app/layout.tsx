import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Use Outfit for a modern tech look
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"], // Include necessary weights
});

export const metadata: Metadata = {
  title: "AlvesAI - Unlock The Power Of Artificial Intelligence",
  description: "Instant Content Generation with AI. The biggest revolution of the century.",
};

import StoreProvider from "@/components/StoreProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased text-white bg-black`}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
