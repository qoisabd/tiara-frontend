import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download } from "lucide-react";
import { ProductType } from "@/types/types";

interface ProductHeaderProps {
  onSearch: (value: string) => void;
  data: ProductType[];
}

export function ProductHeader({ onSearch, data }: ProductHeaderProps) {
  const handleExport = () => {
    if (data.length === 0) return;

    const csvData = data.map((product) => ({
      "Product ID": product.pr_id,
      Name: product.pr_name,
      Price: `Rp. ${product.pr_price.toFixed()}`,
      Category: product.category?.ct_name || "-",
    }));

    const headers = Object.keys(csvData[0]);
    const csvString = [
      headers.join(","),
      ...csvData.map((row) =>
        headers
          .map((header) =>
            JSON.stringify(row[header as keyof typeof row] || "")
          )
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `list_all_product_${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6 ">
      <h1 className="text-2xl font-bold tracking-tight">List All Products</h1>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search product"
            className="pl-8"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <Button onClick={handleExport} className="bg-primary text-white">
          <Download size={16} />
          Export CSV
        </Button>
      </div>
    </div>
  );
}
