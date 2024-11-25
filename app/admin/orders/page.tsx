"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { Card, CardContent } from "@/components/ui/card";
import { OrderAdminHeader } from "@/components/AdminComponents/Orders/OrderAdminHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { OrderHistoryType } from "@/types/types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchAllOrder } from "@/features/admin/adminThunk";
import DataTableComponent from "@/components/DataTables";
import { Button } from "@/components/ui/button";
import { OrderDetailModal } from "@/components/OrderDetailModal";
import { CreditCard, FileTerminal } from "lucide-react";
import useSnap from "@/hooks/useSnap";

export default function OrderHistoryPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { adminAllOrder, status, errorMessage } = useSelector(
    (state: RootState) => state.adminAllOrderReducer
  );
  const [filteredOrders, setFilteredOrders] = useState<OrderHistoryType[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderHistoryType | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { snapEmbed } = useSnap();

  useEffect(() => {
    dispatch(fetchAllOrder());
  }, [dispatch]);

  useEffect(() => {
    setFilteredOrders(adminAllOrder);
  }, [adminAllOrder]);

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
      width: "60px",
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
      width: "150px",
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
      width: "100px",
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
    const filtered = adminAllOrder.filter((order) => {
      const generalMatch = Object.values(order).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
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
      <OrderAdminHeader onSearch={handleSearch} data={filteredOrders} />
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
