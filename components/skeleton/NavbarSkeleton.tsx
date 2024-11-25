"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function SkeletonNavbar() {
  return (
    <nav className="flex items-center justify-between p-4 sticky top-0 z-40 bg-header backdrop-blur-md md:px-8">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-6 w-24" />
        </Link>
      </div>

      <div className="hidden md:flex items-center justify-center flex-1 px-8">
        <Skeleton className="h-10 w-64" />
        <div className="flex items-center gap-3 ml-6">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-36" />
        </div>
      </div>

      <div className="hidden md:flex items-center gap-4">
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-navy-900 border-gray-800">
            <div className="flex flex-col space-y-4 mt-8">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-px w-full bg-gray-800" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
