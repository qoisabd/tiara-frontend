"use client";
import React, { useEffect } from "react";
import { Users, ShoppingBag, ShoppingCart, Wallet } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { CardOverview } from "@/components/AdminComponents/Dashboard/CardOverview";
import RecentOrdersPage from "@/components/AdminComponents/Dashboard/OrderTableDashboard";
import {
  fetchUserCount,
  fetchProductCount,
  fetchOrderCount,
  fetchTotalAmount,
} from "@/features/admin/adminThunk";

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { totalUser, totalProduct, totalOrder, totalAmount, error } =
    useSelector((state: RootState) => state.adminReducer);

  useEffect(() => {
    dispatch(fetchUserCount());
    dispatch(fetchProductCount());
    dispatch(fetchOrderCount());
    dispatch(fetchTotalAmount());
  }, [dispatch]);

  const formatCurrency = (amount: string | number) => {
    const numberAmount =
      typeof amount === "string" ? parseFloat(amount) : amount;
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numberAmount);
  };

  const stats = [
    {
      title: "Total Users",
      value: (totalUser as { totalUser: string })?.totalUser || "N/A",
      icon: <Users className="w-8 h-8 text-blue-500" />,
      error: error.totalUser,
    },
    {
      title: "Total Products",
      value: (totalProduct as { totalProduct: string })?.totalProduct || "N/A",
      icon: <ShoppingBag className="w-8 h-8 text-green-500" />,
      error: error.totalProduct,
    },
    {
      title: "Total Orders",
      value: (totalOrder as { totalOrder: string })?.totalOrder || "N/A",
      icon: <ShoppingCart className="w-8 h-8 text-purple-500" />,
      error: error.totalOrder,
    },
    {
      title: "Total Revenue",
      value: formatCurrency(
        (totalAmount as { totalAmount: string })?.totalAmount || "0"
      ),
      icon: <Wallet className="w-8 h-8 text-yellow-500" />,
      error: error.totalAmount,
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <CardOverview
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            error={stat.error}
          />
        ))}
      </div>

      <RecentOrdersPage />
    </>
  );
}
