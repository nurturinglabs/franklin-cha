"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b bg-[#0b1120]/80 backdrop-blur-md border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <span className="text-amber-400 font-bold text-sm">F</span>
            </div>
            <span className="font-semibold text-lg text-white">
              Franklin
              <span className="text-amber-400"> CHA</span>
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "text-amber-400"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className={`text-sm font-medium transition-colors ${
                pathname === "/dashboard"
                  ? "text-amber-400"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/calls"
              className={`text-sm font-medium transition-colors ${
                pathname?.startsWith("/calls")
                  ? "text-amber-400"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Calls
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
