import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download } from "lucide-react";
import { CategoryType } from "@/types/types";

interface CategoriesHeaderProps {
  onSearch: (searchTerm: string) => void;
  data: CategoryType[];
}

export function CategoriesHeader({ onSearch, data }: CategoriesHeaderProps) {
  const handleExport = () => {
    if (data.length === 0) return;

    const csvData = data.map((category) => ({
      "Category ID": category.ct_id,
      Name: category.ct_name,
      Code: category.ct_code,
      Publisher: category.ct_game_publisher,
      Currency: category.ct_currency_type,
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
        `list_all_category_${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6 ">
      <h1 className="text-2xl font-bold tracking-tight">List All Categories</h1>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search category"
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
