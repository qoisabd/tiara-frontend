import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  ShoppingCart,
  List,
  LogOut,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { logoutUser } from "@/features/auth/authThunk";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ConfirmModal } from "@/components/ConfirmModal";
import { useState } from "react";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const menuItems = [
  {
    icon: <LayoutDashboard size={20} />,
    label: "Dashboard",
    path: "/admin/dashboard",
  },
  { icon: <Users size={20} />, label: "Users", path: "/admin/users" },
  {
    icon: <ShoppingBag size={20} />,
    label: "Products",
    path: "/admin/products",
  },
  { icon: <ShoppingCart size={20} />, label: "Orders", path: "/admin/orders" },
  { icon: <List size={20} />, label: "Categories", path: "/admin/categories" },
];

export const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      Cookies.remove(process.env.NEXT_PUBLIC_COOKIE_NAME || "");
      toast.success("Logout Success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        transition: Bounce,
      });
      router.push("/");
    } catch (error: any) {
      const message = error.message;
      toast.error(`Admin Logout Failed: ${message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        transition: Bounce,
      });
    }
  };
  return (
    <>
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-lg transition-all duration-300`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-between">
            <h1 className={`font-bold text-xl ${!isSidebarOpen && "hidden"}`}>
              Admin Panel <br />
              <span>Tiara Games</span>
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
            </Button>
          </div>

          <nav className="flex-1 px-2 py-4">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg mb-1"
              >
                {item.icon}
                <span className={`ml-3 ${!isSidebarOpen && "hidden"}`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsLogoutModalOpen(true)}
            >
              <LogOut size={20} />
              <span className={`ml-3 ${!isSidebarOpen && "hidden"}`}>
                Logout
              </span>
            </Button>
          </div>
        </div>
      </aside>
      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={() => {
          setIsLogoutModalOpen(false);
          handleLogout();
        }}
        title="Confirm Logout"
        description="Are you sure you want to log out? You will be redirected to the login page."
        confirmText="Logout"
        cancelText="Cancel"
      />
    </>
  );
};
