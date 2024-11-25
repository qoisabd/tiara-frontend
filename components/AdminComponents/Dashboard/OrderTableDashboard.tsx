"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, FileTerminal } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import useSnap from "@/hooks/useSnap";
import { fetchRecentOrder } from "@/features/admin/adminThunk";
import { OrderHistoryType } from "@/types/types";
import { OrderDetailModal } from "@/components/OrderDetailModal";
import DataTableComponent from "@/components/DataTables";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function RecentOrdersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderHistoryType | null>(
    null
  );

  const dispatch = useDispatch<AppDispatch>();
  const { snapEmbed } = useSnap();
  const { recentOrder, errorMessage, status } = useSelector(
    (state: RootState) => state.recentOrderReducer
  );

  useEffect(() => {
    dispatch(fetchRecentOrder());
  }, [dispatch]);

  const handleViewPayment = (row: OrderHistoryType) => {
    const token = row.or_platform_token;
    snapEmbed(token, {
      onSuccess: (result: any) => console.log("success", result),
      onError: (result: any) => console.log("error", result),
      onClose: () =>
        console.log("customer closed the popup without finishing the payment"),
    });
  };

  const columns = [
    {
      name: "No",
      selector: (row: OrderHistoryType, index: number) => index + 1,
      sortable: true,
      width: "60px",
    },
    {
      name: "Date",
      selector: (row: OrderHistoryType) =>
        new Date(row.or_created_at).toLocaleString("id-ID", {
          timeZone: "Asia/Jakarta",
        }),
      sortable: true,
      width: "160px",
    },
    {
      name: "Transaction ID",
      selector: (row: OrderHistoryType) => row.or_platform_id,
      sortable: true,
      width: "200px",
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
      cell: (row: OrderHistoryType) => `Rp. ${row.or_total_amount.toFixed(0)}`,
      sortable: true,
      width: "120px",
    },
    {
      name: "Status",
      cell: (row: OrderHistoryType) => (
        <StatusBadge status={row.or_status || "pending"} />
      ),
      sortable: true,
      width: "120px",
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
            <FileTerminal className="mr-2 h-4 w-4 text-yellow-400" />
            View Details
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleViewPayment(row)}
          >
            <CreditCard className="mr-2 h-4 w-4 text-green-500" />
            View Payment
          </Button>
        </div>
      ),
      width: "300px",
    },
  ];

  const customStyles = {
    table: {
      style: {
        backgroundColor: "transparent",
      },
    },
    headRow: {
      style: {
        backgroundColor: "transparent",
        borderBottomColor: "#e5e7eb",
        borderBottomWidth: "1px",
      },
    },
    rows: {
      style: {
        backgroundColor: "transparent",
        "&:nth-of-type(odd)": {
          backgroundColor: "#f9fafb",
        },
        "&:hover": {
          backgroundColor: "#f3f4f6",
        },
        borderBottomColor: "#e5e7eb",
        borderBottomWidth: "1px",
      },
    },
    pagination: {
      style: {
        backgroundColor: "transparent",
        borderTopColor: "#e5e7eb",
        borderTopWidth: "1px",
      },
    },
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
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders (Last 24 Hours)</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTableComponent
            columns={columns}
            data={recentOrder}
            pagination
            customStyles={customStyles}
            responsive
          />
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
