"use client";

import { useSearchParams } from "next/navigation";
import { ArrowDownUp } from "lucide-react";

interface SortingProps {
  onSortChange: (val: string) => void;
}

const Sorting = ({ onSortChange }: SortingProps) => {
  const searchParams = useSearchParams();
  const currentSort = `${searchParams.get("sortBy") || "createdAt"}-${searchParams.get("sortOrder") || "desc"}`;

  return (
    <div className="relative flex items-center gap-2 border px-4 py-2  bg-white shadow-sm hover:border-blue-500 hover:shadow-md transition-all group cursor-pointer">
      <ArrowDownUp size={16} className="text-gray-500 group-hover:text-blue-600 transition-colors" />
      
      <span className="text-[11px] font-black text-gray-700 uppercase tracking-tighter">
        SORT
      </span>

      <select
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      >
        <option value="createdAt-desc">Newest Arrival</option>
        <option value="productActualPrice-asc">Price: Low to High</option>
        <option value="productActualPrice-desc">Price: High to Low</option>
        <option value="title-asc">Name: A to Z</option>
      </select>

      <div className="hidden md:block h-4 w-[1px] bg-gray-200 mx-1"></div>
      <span className="hidden md:block text-[10px] text-blue-600 font-bold truncate max-w-[80px]">
        {currentSort === "createdAt-desc" ? "Newest" : 
         currentSort === "productActualPrice-asc" ? "Low-High" : 
         currentSort === "productActualPrice-desc" ? "High-Low" : "A-Z"}
      </span>
    </div>
  );
};

export default Sorting;