"use client";

import { Search } from "lucide-react";
import { ShopToolbarProps } from "../Types/Shop.types";



const ShopToolbar = ({ searchTerm, onSearch }: ShopToolbarProps) => {
  return (
    <div className="flex-1 w-full flex flex-col md:flex-row items-center gap-6">
      <div className="relative flex-1 w-full group">
        <Search 
          size={16} 
          className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" 
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full bg-gray-50 border border-gray-100 pl-12 pr-6 py-3  text-xs font-bold text-gray-900 focus:outline-none focus:border-orange-500 focus:bg-white transition-all shadow-inner"
        />
      </div>
    </div>
  );
};

export default ShopToolbar;