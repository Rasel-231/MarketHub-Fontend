"use client";

import { FilterIcon, Search, CheckCircle2 } from "lucide-react";
import Sorting from "./Sorting";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface ShopNavberProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onSortChange: (sortVal: string) => void;
  onSearch: (term: string) => void;
}

const ShopNavber = ({ isOpen, setIsOpen, onSortChange, onSearch }: ShopNavberProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSearch]); 

  return (
    <nav className="sticky top-16 z-30 bg-gray-50/80 backdrop-blur-md py-2 mb-2">
      <div className="bg-white p-4 flex flex-wrap items-center justify-between gap-4 border">
        
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className={`flex items-center gap-2 px-4 py-2 border rounded transition-all text-sm font-bold ${
            isOpen 
              ? "bg-blue-50 border-blue-600 text-blue-600" 
              : "hover:bg-gray-50 text-gray-700"
          }`}
        >
          {isOpen ? <CheckCircle2 size={18} /> : <FilterIcon size={18} />}
          <span className="uppercase tracking-wider">
            {isOpen ? "Filtering..." : "Filter"}
          </span>
        </button>

        <div className="flex-1 min-w-[200px]  relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <Sorting onSortChange={onSortChange}/>
      </div>
    </nav>
  );
};

export default ShopNavber;