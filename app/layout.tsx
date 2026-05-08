import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import TerminalPrompt from "@/components/TerminalPrompt";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "justin-chan(1) — software engineer",
  description:
    "Portfolio of Justin Chan, a software engineer based in Brentwood, CA.",
  openGraph: {
    title: "justin-chan(1) — software engineer",
    description:
      "Portfolio of Justin Chan, a software engineer based in Brentwood, CA.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="min-h-screen flex flex-col relative">
        <Nav />
        <main className="flex-1 relative z-10">
          {children}
          <TerminalPrompt />
        </main>
        <Footer />
      </body>
    </html>
  );
}
