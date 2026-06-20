import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";

import Footer from "./components/Footer";

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  // preload: true,
  fallback: ["sans-serif"]
});

export const metadata: Metadata = {
  title: "Dine Restaurant Nextjs",
  description: "I made the nextjs version of a vanillajs, html and css website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${leagueSpartan.variable}`} suppressHydrationWarning >
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
