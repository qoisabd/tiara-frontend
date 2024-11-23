"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download } from "lucide-react";
import { RegisterType } from "@/types/types";

interface UserManagementHeaderProps {
  data: RegisterType[];
  onSearch: (value: string) => void;
}

export function UserManagementHeader({
  data,
  onSearch,
}: UserManagementHeaderProps) {
  const handleExport = () => {
    if (data.length === 0) return;

    const csvData = data.map((user) => ({
      Username: user.us_username,
      Email: user.us_email,
      "Phone Number": user.us_phone_number,
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
        `user_management_${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
      <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <Button onClick={handleExport} className="flex items-center gap-2">
          <Download size={16} />
          Export CSV
        </Button>
      </div>
    </div>
  );
}
