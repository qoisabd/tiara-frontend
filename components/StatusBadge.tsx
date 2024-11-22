import { cn } from "@/lib/utils";
import { OrderStatusType } from "@/types/types";

interface StatusBadgeProps {
  status: OrderStatusType["value"];
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig: Record<
    OrderStatusType["value"],
    { label: string; className: string }
  > = {
    pending: {
      label: "Pending",
      className: "bg-yellow-100 text-yellow-800",
    },
    settlement: {
      label: "Success",
      className: "bg-green-100 text-green-800",
    },
    cancelled: {
      label: "Cancelled",
      className: "bg-red-100 text-red-800",
    },
    expire: {
      label: "Expired",
      className: "bg-red-100 text-red-800",
    },
    default: {
      label: "Unknown",
      className: "bg-gray-100 text-gray-800",
    },
  };

  const config = statusConfig[status] || statusConfig.default;

  return (
    <span
      className={cn(
        "px-2 py-1 rounded-full text-xs font-bold",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}
