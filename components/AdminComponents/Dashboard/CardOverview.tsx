import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface CardOverviewProps {
  title: string;
  value: string;
  icon: ReactNode;
  error?: string | null;
}

export const CardOverview = ({
  title,
  value,
  icon,
  error,
}: CardOverviewProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="text-red-500 text-sm font-semibold">{error}</div>
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
      </CardContent>
    </Card>
  );
};
