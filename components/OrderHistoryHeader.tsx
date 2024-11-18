import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface OrderHistoryHeaderProps {
  onSearch: (value: string) => void;
}

export function OrderHistoryHeader({ onSearch }: OrderHistoryHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6 mx-5">
      <h1 className="text-2xl font-bold tracking-tight">Order History</h1>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="pl-8"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <Button>Export</Button>
      </div>
    </div>
  );
}
