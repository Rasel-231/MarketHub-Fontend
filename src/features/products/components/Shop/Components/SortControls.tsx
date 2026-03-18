"use client";

import { useSearchParams } from "next/navigation";
import { ArrowDownUp } from "lucide-react";
import { SHOP_CONSTANT } from "../Constant/Shop.Constant";
import { SortControlsProps } from "../Types/Shop.types";

const SortControls = ({ onSortChange }: SortControlsProps) => {
  const searchParams = useSearchParams();

  const currentSort = `${searchParams.get("sortBy") || "createdAt"}-${searchParams.get("sortOrder") || "desc"}`;

  const labels: Record<string, string> = {
    [SHOP_CONSTANT.SORT_OPTIONS.NEWEST]: "Newest",
    [SHOP_CONSTANT.SORT_OPTIONS.PRICE_LOW]: "Price: Low to High",
    [SHOP_CONSTANT.SORT_OPTIONS.PRICE_HIGH]: "Price: High to Low",
    [SHOP_CONSTANT.SORT_OPTIONS.NAME_AZ]: "Name: A-Z",
  };

  return (
    <div className="relative flex items-center justify-center w-10 h-10 md:w-10 md:h-10 bg-gray-50 border border-gray-100  hover:border-orange-500 transition-all group cursor-pointer shadow-sm">
      <ArrowDownUp 
        size={20} 
        className="text-gray-900 group-hover:text-orange-600 transition-colors" 
      />

      <select
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        aria-label="Sort products"
      >
        {Object.entries(labels).map(([val, label]) => (
          <option key={val} value={val} className="text-sm font-sans">
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortControls;