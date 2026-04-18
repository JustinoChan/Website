import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Justin Chan — Software Engineer",
  description:
    "Portfolio of Justin Chan, a software engineer based in Brentwood, CA.",
  openGraph: {
    title: "Justin Chan — Software Engineer",
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
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
