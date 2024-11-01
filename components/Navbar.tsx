"use client";
import { useState } from "react";
import { Search, Menu, X, House, ScrollTextIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const logoImage = "/assets/logos/logo-rifqi-top-up.svg";

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md md:px-32">
      {/* Logo and Primary Links */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={logoImage}
            alt="Rifqi Top-up Logo"
            width={50}
            height={50}
          />
        </Link>

        {/* Primary Links (Hidden on Small Screens) */}
        <div className="hidden md:flex items-center gap-4 ml-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-black font-bold hover:text-yellow-400"
          >
            <House size={24} />
            <span>Home</span>
          </Link>
          <Link
            href="/check-transaction"
            className="flex items-center gap-2 text-black font-bold hover:text-yellow-400"
          >
            <Search size={24} />
            <span>Transaction Check</span>
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 text-black font-bold hover:text-yellow-400"
          >
            <ScrollTextIcon size={24} />
            <span>Create Ticket</span>
          </Link>
        </div>
      </div>

      {/* Desktop Actions */}
      <div className="hidden sm:flex items-center gap-3">
        <Button className="flex items-center gap-2 px-3 py-2 rounded-md border border-blue-500 bg-blue-600 text-white hover:bg-blue-300 hover:text-black">
          <Search size={20} />
          <span className="hidden lg:inline">Search</span>
        </Button>
        <Link
          href="/sign-in"
          className="px-4 py-2 bg-gray-200 rounded-lg text-black hover:bg-gray-300"
        >
          Sign in
        </Link>
        <Link
          href="/sign-up"
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400"
        >
          Sign up
        </Link>
        <ThemeToggle />
      </div>

      {/* Mobile Menu Button */}
      <div className="sm:hidden">
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg sm:hidden">
          <div className="flex flex-col items-center space-y-4 py-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-black hover:text-yellow-400"
            >
              <House size={20} />
              <span>Home</span>
            </Link>
            <Link
              href="/check-transaction"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-black hover:text-yellow-400"
            >
              <Search size={20} />
              <span>Transaction Check</span>
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-black hover:text-yellow-400"
            >
              <ScrollTextIcon size={20} />
              <span>Create Ticket</span>
            </Link>
            <Link
              href="/sign-in"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-black bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-400"
            >
              Sign up
            </Link>
          </div>

          {/* Mobile Search Bar */}
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mx-4 mt-4">
            <Search className="text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Cari Product di UXIOSTORE"
              className="bg-transparent px-2 py-1 w-full focus:outline-none"
            />
          </div>
        </div>
      )}
    </nav>
  );
}
