import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Franklin CHA Voice Survey",
  description:
    "Voice AI-powered Community Health Assessment survey for the City of Franklin, Wisconsin. Call to share your input and help improve community health.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased text-white`}
        style={{ background: "#0b1120" }}
      >
        <div className="min-h-screen flex flex-col bg-[#0b1120]">
          <Navbar />
          <main className="flex-1 bg-[#0b1120]">{children}</main>
        </div>
      </body>
    </html>
  );
}
