"use client";
import { useState } from "react";
import { Search, Menu, X, House } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const logoImage = "/assets/logos/logo-rifqi-top-up.svg";

  return (
    <nav className="flex items-center justify-between p-2 bg-white shadow-md px-32">
      {/* Logo */}
      <div className="flex flex-row items-center gap-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src={logoImage}
            alt="Rifqi Top-up Logo"
            width={50}
            height={50}
          />
        </Link>
        <Link
          href="/"
          className="ml-5 flex flex-row gap-2 hover:text-yellow-400"
        >
          <House size={24} />
          <span className="text-base font-bold">Home</span>
        </Link>
        <Link
          href="/check-transaction"
          className="flex flex-row gap-2 hover:text-yellow-400"
        >
          <Search size={24} />
          <span className="text-base font-bold">Check Transaction</span>
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden sm:flex items-center space-x-3">
        <Button className="flex flex-row px-3 py-2 gap-2 rounded-md border border-blue-500 bg-blue-600 text-white text-secondary-foreground duration-300 ease-in-out hover:bg-blue-300 focus:bg-murky-800 hover:text-black">
          <Search size={20} className="text-white group-hover:text-black" />
          <span className="hidden lg:block text-sm text-white group-hover:text-black">
            Search
          </span>
        </Button>

        <Link
          href="/sign-in"
          className="px-4 py-2 text-black bg-gray-200 rounded-lg hover:bg-gray-300 bg-transparent"
        >
          Sign in
        </Link>
        <Link
          href="/sign-up"
          className="px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-400"
        >
          Sign up
        </Link>
        <ThemeToggle />
      </div>

      {/* Hamburger Menu Icon for Mobile */}
      <div className="sm:hidden flex items-center">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg sm:hidden">
          <div className="flex flex-col items-center space-y-4 py-4">
            <Link href="/other" onClick={() => setIsOpen(false)}>
              <Search size={20} />
              Search Game
            </Link>
            <Link href="/sign-in" onClick={() => setIsOpen(false)}>
              Sign in
            </Link>
            <Link
              href="/sign-up"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-blue-600 rounded-lg text-white"
            >
              Sign up
            </Link>
          </div>

          {/* Mobile Search Bar */}
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mt-4 mx-4">
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
