import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Input } from "../ui/input";

interface SearchTransactionProps {
  onSearch: (value: string) => void;
}

const SearchTransaction = ({ onSearch }: SearchTransactionProps) => {
  return (
    <section className="px-4 md:px-32 bg-blue-90 relative shadow-2xl">
      <div className="container relative py-12 text-left text-white">
        <div>
          <h2 className="maw-w-2xl text-3xl sm:text-4xl font-bold tracking-tight">
            Track your orders here!
          </h2>
          <p className="mt-6 max-w-3xl capitalize">
            Your order is not registered even though you are sure you have
            ordered? Please wait 1-5 minutes. But if the order still does not
            appear, you can{" "}
            <Link
              href="https://wa.me/6285195300828?text=Hello%20I%20want%20to%20ask%20about%20my%20order"
              target="_blank"
              className="underline underline-offset-2 decoration-yellow-500"
            >
              Contact Us
            </Link>
          </p>
        </div>
        <div className="max-w-xl mt-5">
          <label htmlFor="search-input" className="text-sm mb-2 block">
            Enter your order number
          </label>
          <div className="relative">
            <Search className="absolute z-10 left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black pointer-events-none" />
            <Input
              placeholder="Trxxxxxxxx"
              className="pl-10 text-black placeholder-blue-300"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchTransaction;
