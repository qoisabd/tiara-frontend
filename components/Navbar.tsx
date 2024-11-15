import {
  Search,
  Menu,
  House,
  ScrollTextIcon,
  BellDot,
  History,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

export default function Navbar() {
  const logoImage = "/assets/logos/logo-rifqi-top-up.svg";

  return (
    <nav className="flex items-center justify-between p-4 sticky top-0 z-40 border-b bg-header backdrop-blur-md md:px-8">
      {/* Logo Section */}
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logoImage}
            alt="Rifqi Top-up Logo"
            width={50}
            height={50}
          />
          <span className="font-bold text-xl text-white">
            Rifqi
            <span className="text-[#FBB017]">TopUp</span>
          </span>
        </Link>
      </div>

      {/* Desktop Center Section */}
      <div className="hidden md:flex items-center justify-center flex-1 px-8">
        <div className="relative max-w-md w-full">
          <Input
            type="text"
            placeholder="Search..."
            className="w-full bg-white text-black border-gray-700 focus:border-blue-500"
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <div className="flex items-center gap-6 ml-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-white hover:text-blue-400"
          >
            <House size={20} />
            <span>Home</span>
          </Link>
          <Link
            href="/notifications"
            className="flex items-center gap-2 text-white hover:text-blue-400"
          >
            <Search size={24} />
            <span>Transaction Check</span>
          </Link>
          <Link
            href="/history"
            className="flex items-center gap-2 text-white hover:text-blue-400"
          >
            <ScrollTextIcon size={24} />
            <span>Create Ticket</span>
          </Link>
        </div>
      </div>

      {/* Desktop Auth Buttons */}
      <div className="hidden md:flex items-center gap-4">
        <Link href="/sign-in" className="text-white hover:text-blue-400">
          Log in
        </Link>
        <Link
          href="/sign-up"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Register
        </Link>
        <ThemeToggle />
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-navy-900 border-gray-800">
            <div className="flex flex-col space-y-4 mt-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-gray-800 text-white border-gray-700"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              <Link
                href="/"
                className="flex items-center gap-2 text-white hover:text-blue-400 p-2"
              >
                <House size={20} />
                <span>Home</span>
              </Link>
              <Link
                href="/notifications"
                className="flex items-center gap-2 text-white hover:text-blue-400 p-2"
              >
                <Search size={24} />
                <span>Transaction Check</span>
              </Link>
              <Link
                href="/history"
                className="flex items-center gap-2 text-white hover:text-blue-400 p-2"
              >
                <ScrollTextIcon size={24} />
                <span>Create Ticket</span>
              </Link>

              <hr className="border-gray-800" />

              <Link
                href="/sign-in"
                className="text-white hover:text-blue-400 p-2"
              >
                Log in
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center"
              >
                Register
              </Link>

              <div className="pt-4">
                <ThemeToggle />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
