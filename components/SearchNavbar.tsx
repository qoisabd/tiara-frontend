"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import autocomplete from "autocompleter";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchSearchCategory } from "@/features/category/categoryThunk";
import { Status } from "@/utils/Status";
import { CategoryAutocompleteItem } from "@/types/types";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { searchResults, status, errorMessage } = useSelector(
    (state: RootState) => state.categorySearchReducer
  );

  useEffect(() => {
    if (inputRef.current) {
      autocomplete<CategoryAutocompleteItem>({
        input: inputRef.current,
        fetch: function (text, update) {
          text = text.toLowerCase();
          dispatch(fetchSearchCategory(text))
            .unwrap()
            .then((result) => {
              update(result.slice(0, 5));
            })
            .catch((error) => {
              console.error("Error fetching suggestions:", error);
              update([]);
            });
        },
        onSelect: function (item: CategoryAutocompleteItem) {
          setSearchQuery(item.ct_name);
          router.push(`/games/${item.ct_code}`);
        },
        render: function (item: CategoryAutocompleteItem) {
          const div = document.createElement("div");
          div.className =
            "flex items-center p-2 hover:bg-gray-100 cursor-pointer bg-white rounded-full";
          div.innerHTML = `
            <div class="w-12 h-12 mr-2 relative">
              <img src="${item.ct_image}" alt="${item.ct_name}" class="w-full h-full object-cover rounded" />
            </div>
            <span class="text-sm font-medium">${item.ct_name}</span>
          `;
          return div;
        },
        minLength: 1,
      });
    }
  }, [dispatch, router]);

  useEffect(() => {
    const autocompleteContainer = document.querySelector(
      ".autocomplete"
    ) as HTMLElement;
    if (autocompleteContainer) {
      autocompleteContainer.style.zIndex = "100";
      autocompleteContainer.style.backgroundColor = "white";
      autocompleteContainer.style.borderRadius = "0.5rem";
      autocompleteContainer.style.boxShadow =
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
      autocompleteContainer.style.marginTop = "0.5rem";
      autocompleteContainer.style.maxHeight = "300px";
      autocompleteContainer.style.overflowY = "auto";
      autocompleteContainer.nextElementSibling?.remove();
    }
  }, [searchQuery, searchResults]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="relative max-w-md w-full">
      <Input
        ref={inputRef}
        type="text"
        placeholder="Search Game..."
        value={searchQuery}
        onChange={handleInputChange}
        className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
      {status === Status.LOADING && (
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      {status === Status.FAILED && (
        <div className="mt-2 text-red-500 text-sm">{errorMessage}</div>
      )}
    </div>
  );
};

export default SearchComponent;
