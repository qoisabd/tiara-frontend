import { Search, Menu, House, LogOut, History } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { UserType } from "@/types/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { logoutUser } from "@/features/auth/authThunk";
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";
import { ConfirmModal } from "./ConfirmModal";
import SearchNavbar from "./SearchNavbar";
import SkeletonNavbar from "./skeleton/NavbarSkeleton";

export default function Navbar() {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const logoImage = "/assets/logos/logo-rifqi-top-up.svg";

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get(process.env.NEXT_PUBLIC_COOKIE_NAME || "");
        if (token) {
          const decoded: UserType = jwtDecode(token);
          if (decoded.exp * 1000 > Date.now()) {
            setIsAuthenticated(true);
            setUser(decoded);
          } else {
            Cookies.remove(process.env.NEXT_PUBLIC_COOKIE_NAME || "");
          }
        }
      } catch (err) {
        console.error("Failed to decode token", err);
      } finally {
        setLoading(false); // Ensure loading is false after the effect runs
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      Cookies.remove(process.env.NEXT_PUBLIC_COOKIE_NAME || "");
      setUser(null);
      setIsAuthenticated(false);
      toast.success("Logout Success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        transition: Bounce,
      });
      router.push("/");
    } catch (error: any) {
      toast.error(`User Logout Failed: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        transition: Bounce,
      });
    }
  };

  const getInitials = (username: string, email: string) => {
    const name = username || email || "Guest";
    const parts = name.split(" ");
    return parts.length === 1
      ? parts[0][0].toUpperCase()
      : `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  };

  if (loading) {
    return <SkeletonNavbar />; // Display SkeletonNavbar while loading
  }

  return (
    <>
      <nav className="flex items-center justify-between p-4 sticky top-0 z-40 bg-header backdrop-blur-md md:px-8">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logoImage}
              alt="Tiara Games Logo"
              width={50}
              height={50}
            />
            <span className="font-bold text-base lg:text-xl text-white">
            Tiara<span className="text-[#FBB017]"> Games</span>
            </span>
          </Link>
        </div>

        {/* Desktop Center Section */}
        <div className="hidden md:flex items-center justify-center flex-1 px-8">
          <SearchNavbar />
          <div className="flex items-center gap-3 ml-6">
            <Link
              href="/"
              className="text-sm lg:text-base flex items-center gap-2 text-white hover:text-blue-400"
            >
              <House size={20} />
              <span>Home</span>
            </Link>
            <Link
              href="/transaction-check"
              className="text-sm lg:text-base flex items-center gap-2 text-white hover:text-blue-400"
            >
              <Search size={24} />
              <span>Transaction Check</span>
            </Link>
          </div>
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {getInitials(user.us_username, user.us_email)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link
                    href="/order-history"
                    className="w-full flex flex-row gap-3 "
                  >
                    <History className="text-yellow-500" />
                    Order History
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsLogoutModalOpen(true)}>
                  <LogOut className="text-yellow-500" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/sign-in" className="text-white hover:text-blue-400">
                Log in
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
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
                  <SearchNavbar />
                </div>
                <Link
                  href="/"
                  className="flex items-center gap-2 text-white hover:text-blue-400 p-2"
                >
                  <House size={20} />
                  <span>Home</span>
                </Link>
                <Link
                  href="/transaction-check"
                  className="flex items-center gap-2 text-white hover:text-blue-400 p-2"
                >
                  <Search size={24} />
                  <span>Transaction Check</span>
                </Link>
                <hr className="border-gray-800" />
                {user ? (
                  <>
                    <Link
                      href="/order-history"
                      className="text-white hover:text-blue-400 p-2"
                    >
                      Order History
                    </Link>
                    <button
                      onClick={() => setIsLogoutModalOpen(true)}
                      className="text-white hover:text-blue-400 p-2"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={() => {
          setIsLogoutModalOpen(false);
          handleLogout();
        }}
        title="Confirm Logout"
        description="Are you sure you want to log out?"
        confirmText="Logout"
        cancelText="Cancel"
      />
    </>
  );
}
