"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { Card, CardContent } from "@/components/ui/card";
import { OrderHistoryHeader } from "@/components/OrderHistoryHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { OrderHistoryType } from "@/types/types";
import { UserType } from "@/types/types";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import DataTableComponent from "@/components/DataTables";
import { fetchOrdersByUserId } from "@/features/order/orderThunk";
import { Button } from "@/components/ui/button";
import { OrderDetailModal } from "@/components/OrderDetailModal";
import { ArrowLeft, CreditCard, FileTerminal } from "lucide-react";
import useSnap from "@/hooks/useSnap";
import { useRouter } from "next/navigation";

export default function OrderHistoryPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { orderHistory, status, errorMessage } = useSelector(
    (state: RootState) => state.orderHistoryReducer
  );
  const [filteredOrders, setFilteredOrders] = useState<OrderHistoryType[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderHistoryType | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { snapEmbed } = useSnap();

  useEffect(() => {
    const token = Cookies.get(process.env.NEXT_PUBLIC_COOKIE_NAME || "");
    if (token) {
      try {
        const decoded: UserType = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          dispatch(fetchOrdersByUserId(decoded.us_id.toString()));
        } else {
          console.warn("Token has expired.");
          Cookies.remove(process.env.NEXT_PUBLIC_COOKIE_NAME || "");
        }
      } catch (err) {
        console.error("Failed to decode token", err);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    setFilteredOrders(orderHistory);
  }, [orderHistory]);

  const handleViewPayment = (row: any) => {
    const token = row.or_platform_token;
    snapEmbed(token, {
      onSuccess: function (result: any) {
        console.log("success", result);
      },
      onError: function (result: any) {
        console.log("error", result);
      },
      onClose: function () {
        console.log("customer closed the popup without finishing the payment");
      },
    });
  };

  const columns = [
    {
      name: "No.",
      selector: (row: OrderHistoryType, index: number) => index + 1,
      sortable: false,
      width: "80px",
    },
    {
      name: "Date",
      selector: (row: OrderHistoryType) =>
        new Date(row.or_created_at).toLocaleString("id-ID", {
          timeZone: "Asia/Jakarta",
        }),
      sortable: true,
      width: "200px",
    },
    {
      name: "Transaction ID",
      selector: (row: OrderHistoryType) => row.or_platform_id,
      sortable: true,
      width: "250px",
    },
    {
      name: "Game Name",
      cell: (row: OrderHistoryType) => {
        const categories = row.orderItem?.oi_product
          ?.map((product) => product.category_name)
          .filter((name) => name)
          .join(", ");
        return categories || "-";
      },
      sortable: true,
      width: "250px",
    },
    {
      name: "Total",
      cell: (row: OrderHistoryType) => `Rp. ${row.or_total_amount.toFixed()}`,
      sortable: true,
      width: "130px",
    },
    {
      name: "Status",
      cell: (row: OrderHistoryType) => (
        <StatusBadge status={row.or_status || "pending"} />
      ),
      sortable: true,
      width: "200px",
    },
    {
      name: "Action",
      cell: (row: OrderHistoryType) => (
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedOrder(row);
              setIsModalOpen(true);
            }}
          >
            <FileTerminal className="text-yellow-400" />
            View Details
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              handleViewPayment(row);
            }}
          >
            <CreditCard className="text-green-500" />
            View Payment
          </Button>
        </div>
      ),
      sortable: true,
    },
  ];

  const handleSearch = (searchTerm: string) => {
    const filtered = orderHistory.filter((order) => {
      const generalMatch = Object.values(order).some(
        (val) =>
          val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );

      const categoryMatch = order.orderItem?.oi_product?.some(
        (product) =>
          product.category_name &&
          product.category_name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return generalMatch || categoryMatch;
    });

    setFilteredOrders(filtered);
  };
  if (status === "LOADING") {
    return (
      <div className="container mx-auto py-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    );
  }

  if (status === "FAILED") {
    return (
      <div className="container mx-auto py-8">
        <Alert variant="destructive">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-4">
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="flex items-center gap-2 hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Button>
      </div>

      <OrderHistoryHeader onSearch={handleSearch} data={filteredOrders} />
      <Card>
        <CardContent className="p-6">
          <DataTableComponent columns={columns} data={filteredOrders} />
        </CardContent>
      </Card>
      <OrderDetailModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOrder(null);
        }}
      />
    </div>
  );
}
