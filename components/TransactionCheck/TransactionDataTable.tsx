"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import SearchTransaction from "./SearchTransaction";
import { fetchAllOrder } from "@/features/admin/adminThunk";
import DataTableComponent from "@/components/DataTables";
import { OrderHistoryType } from "@/types/types";
import { StatusBadge } from "../StatusBadge";
import { Alert, AlertDescription } from "../ui/alert";
import { Skeleton } from "../ui/skeleton";

export default function TransactionDataTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { adminAllOrder, status, errorMessage } = useSelector(
    (state: RootState) => state.adminAllOrderReducer
  );
  const [filteredOrders, setFilteredOrders] = useState<OrderHistoryType[]>([]);

  useEffect(() => {
    dispatch(fetchAllOrder());
  }, [dispatch]);

  useEffect(() => {
    setFilteredOrders(adminAllOrder);
  }, [adminAllOrder]);

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

  const formatPlatformNumber = (platformId = "") =>
    !platformId || platformId.length <= 6
      ? "tiaraxxxxxx"
      : `${platformId.substring(0, 3)}xxxxxx${platformId.substring(
          platformId.length - 3
        )}`;

  const formatEmail = (email = "") => {
    if (!email.includes("@")) return "Invalid Email";
    const [localPart, domainPart] = email.split("@");
    const localPrefix = localPart.substring(0, 3);
    const domainSuffix = domainPart.substring(domainPart.length - 3);

    return `${localPrefix}xxxxx@xxxxx${domainSuffix}`;
  };

  const handleSearch = (searchTerm: string) => {
    const filtered = adminAllOrder.filter((order) => {
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

  const columns = [
    {
      name: "No.",
      selector: (row: OrderHistoryType, index: number) => index + 1,
      sortable: false,
      width: "80px",
    },
    {
      name: "Order Date",
      selector: (row: OrderHistoryType) =>
        new Date(row.or_created_at).toLocaleString("id-ID", {
          timeZone: "Asia/Jakarta",
        }),
      sortable: true,
      width: "200px",
    },
    {
      name: "Transaction ID",
      selector: (row: OrderHistoryType) =>
        formatPlatformNumber(row.or_platform_id),
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
      width: "200px",
    },
    {
      name: "Order Email",
      cell: (row: OrderHistoryType) => {
        const formattedEmail = formatEmail(
          row.orderItem?.oi_product
            ?.map((product) => product.order_email)
            .filter((name) => name)
            .join(", ")
        );
        return formattedEmail || "-";
      },
      sortable: true,
      width: "200px",
    },
    {
      name: "Total",
      selector: (row: OrderHistoryType) => row.or_total_amount,
      format: (row: OrderHistoryType) => formatCurrency(row.or_total_amount),
      sortable: true,
      width: "200px",
    },
    {
      name: "Status",
      cell: (row: OrderHistoryType) => (
        <StatusBadge status={row.or_status || "pending"} />
      ),
      sortable: true,
      width: "150px",
    },
  ];

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
    <section className="bg-gradient-detail">
      <SearchTransaction onSearch={handleSearch} />
      <div className="mt-5 px-4 md:px-32 pb-10">
        <h2 className="text-xl text-white">All Orders Created</h2>
        <p className="mt-2 max-w-2xl text-sm text-gray-200">
          These are all transactions from all users, The information available
          includes transaction date, invoice code, mobile number, price, and
          status.
        </p>
        <div className="mt-5">
          <DataTableComponent columns={columns} data={filteredOrders} />
        </div>
      </div>
    </section>
  );
}
