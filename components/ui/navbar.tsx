"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, User } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-gray-900">news</span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center">
            <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition">
              <User className="w-5 h-5" />
              <span className="font-manrope-sans font-regular">Sign In</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Menu Toggle */}
            <button
              className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded hover:bg-gray-50 transition"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </button>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center justify-center gap-8 flex-1 mx-8">
              <Link
                href="/"
                className="flex items-center gap-1 text-gray-700 hover:text-orange-500 transition font-manrope-sans font-bold"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-orange-500 transition font-manrope-sans font-bold"
              >
                About Us
              </Link>
              <Link
                href="/features"
                className="flex items-center gap-1 text-gray-700 hover:text-orange-500 transition font-manrope-sans font-bold"
              >
                Features
              </Link>
              <Link
                href="/categories"
                className="flex items-center gap-1 text-gray-700 hover:text-orange-500 transition font-manrope-sans font-bold"
              >
                Categories
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-orange-500 transition font-manrope-sans font-bold"
              >
                Contact
              </Link>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 flex-shrink-0 max-w-md">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search here..."
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 font-inter-sans font-regular"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Search className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/"
              className="block py-2 text-gray-700 hover:text-orange-500 transition font-bold"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block py-2 text-gray-700 hover:text-orange-500 transition font-bold"
            >
              About Us
            </Link>
            <Link
              href="/features"
              className="block py-2 text-gray-700 hover:text-orange-500 transition font-bold"
            >
              Features
            </Link>
            <Link
              href="/categories"
              className="block py-2 text-gray-700 hover:text-orange-500 transition font-bold"
            >
              Categories
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-gray-700 hover:text-orange-500 transition font-bold"
            >
              Contact
            </Link>
            <div className="flex flex-col pt-2 md:hidden">
              <button className="flex items-center justify-center gap-2 py-2 text-gray-700 hover:text-gray-900 transition border border-gray-300 rounded">
                <User className="w-5 h-5" />
                <span>Sign In</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
