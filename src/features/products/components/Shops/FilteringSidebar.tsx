"use client";

import React, { useState, useEffect} from "react";
import { useGetCategoryQuery } from "@/store/api/categoryApi/categoryApi";
import { ICategory, IUserProducts } from "@/types/types";

interface IFilterParams {
  category?: string;
  brand?: string;
  maxPrice?: string;
  searchTerm?: string;
  page?: string;
  sortBy?: string;
  sortOrder?: string;
}

interface IProps {
  products: IUserProducts[];
  filters: IFilterParams;
  onChange: (newParams: Record<string, string | number | null>) => void;
}

const FilteringSidebar = ({ products = [], filters, onChange }: IProps) => {
  const { data: categoryResponse, isLoading } = useGetCategoryQuery(undefined);
  
  const [localMaxPrice, setLocalMaxPrice] = useState(filters.maxPrice || "100000");
  

  const [prevFiltersPrice, setPrevFiltersPrice] = useState(filters.maxPrice);

  const categories = categoryResponse?.data?.data || [];
  const brands = Array.from(new Set(products.map((p) => p.brand).filter(Boolean)));

  if (filters.maxPrice !== prevFiltersPrice) {
    setLocalMaxPrice(filters.maxPrice || "100000");
    setPrevFiltersPrice(filters.maxPrice);
  }

  
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localMaxPrice !== (filters.maxPrice || "100000")) {
        onChange({ maxPrice: localMaxPrice, page: 1 });
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [localMaxPrice, onChange, filters.maxPrice]);

  if (isLoading) return <div className="p-4 bg-gray-50 animate-pulse h-64 rounded-xl" />;

  return (
    <div className="flex flex-col gap-6 p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-gray-700">Budget Limit</span>
          <span className="text-sm font-bold text-orange-600">
            ${Number(localMaxPrice).toLocaleString()}
          </span>
        </div>
        
        <input
          type="range"
          min="0"
          max="100000"
          step="1000"
          value={localMaxPrice}
          onChange={(e) => setLocalMaxPrice(e.target.value)}
          className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-orange-600"
        />
        
        <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase">
          <span>Min: $0</span>
          <span>Max: $100K</span>
        </div>
      </div>


      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Category</label>
        <select 
          value={filters.category || ""}
          onChange={(e) => onChange({ category: e.target.value, page: 1 })}
          className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm"
        >
          <option value="">All Categories</option>
          {categories.map((cat: ICategory) => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Brand</label>
        <select 
          value={filters.brand || ""}
          onChange={(e) => onChange({ brand: e.target.value, page: 1 })}
          className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm"
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand as string} value={brand as string}>{brand as string}</option>
          ))}
        </select>
      </div>

      <button 
        onClick={() => {
          setLocalMaxPrice("100000");
          onChange({ category: null, brand: null, maxPrice: null, searchTerm: null, page: 1 });
        }}
        className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg text-xs uppercase tracking-widest transition-all"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilteringSidebar;