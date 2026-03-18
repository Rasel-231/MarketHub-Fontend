"use client";

import  { useState, useEffect, useCallback } from "react";
import { useGetCategoryQuery } from "@/store/api/categoryApi/categoryApi";
import { ICategory} from "@/types/types";
import { useDebounce } from "@/features/products/hooks/useDebounce";
import { SHOP_CONSTANT } from "../Constant/Shop.Constant";
import {  ShopFiltersProps } from "../Types/Shop.types";



const ShopFilters = ({ products = [], filters, onFilterChange }: ShopFiltersProps) => {
  const { data: categoryResponse, isLoading } = useGetCategoryQuery(undefined);
  
  const [price, setPrice] = useState<string | number>(filters.maxPrice || SHOP_CONSTANT.DEFAULT_MAX_PRICE);
  const debouncedPrice = useDebounce(price, SHOP_CONSTANT.DEBOUNCE_DELAY);

  const categories: ICategory[] = categoryResponse?.data?.data || [];
  const brands = Array.from(new Set(products.map((p) => p.brand).filter(Boolean)));

  const handlePriceUpdate = useCallback(() => {
    const currentMaxPrice = Number(filters.maxPrice) || SHOP_CONSTANT.DEFAULT_MAX_PRICE;
    if (Number(debouncedPrice) !== currentMaxPrice) {
      onFilterChange({ 
        maxPrice: Number(debouncedPrice), 
        page: SHOP_CONSTANT.DEFAULT_PAGE 
      });
    }
  }, [debouncedPrice, filters.maxPrice, onFilterChange]);

  useEffect(() => {
    handlePriceUpdate();
  }, [handlePriceUpdate]);

  if (isLoading) return <div className="p-4 bg-gray-50 animate-pulse h-64 rounded-2xl" />;

  return (
    <div className="flex flex-col gap-8 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
      <div className="">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-gray-700 uppercase tracking-tighter">Budget</span>
          <span className="text-sm font-black text-orange-600">${Number(price).toLocaleString()}</span>
        </div>
        <input
          type="range"
          min="0"
          max={SHOP_CONSTANT.DEFAULT_MAX_PRICE}
          step={SHOP_CONSTANT.PRICE_STEP}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-orange-600"
        />
        <div className="flex justify-between">
          <span className="uppercase text-gray-600 font-black text-sm font-nunito tracking-tight">Min: $0</span>
          <span className="uppercase text-gray-600 font-black text-sm font-nunito tracking-tight">Max: $100K</span>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</label>
        <select 
          value={filters.category || ""}
          onChange={(e) => onFilterChange({ category: e.target.value || null, page: SHOP_CONSTANT.DEFAULT_PAGE })}
          className="w-full p-3 bg-gray-50 border border-transparent rounded-xl text-sm font-semibold outline-none focus:border-orange-500 focus:bg-white transition-all cursor-pointer"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id || cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Brand</label>
        <select 
          value={filters.brand || ""}
          onChange={(e) => onFilterChange({ brand: e.target.value || null, page: SHOP_CONSTANT.DEFAULT_PAGE })}
          className="w-full p-3 bg-gray-50 border border-transparent rounded-xl text-sm font-semibold outline-none focus:border-orange-500 focus:bg-white transition-all cursor-pointer"
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={String(brand)} value={String(brand)}>{String(brand)}</option>
          ))}
        </select>
      </div>

      <button 
        onClick={() => {
          setPrice(SHOP_CONSTANT.DEFAULT_MAX_PRICE);
          onFilterChange({ category: null, brand: null, maxPrice: null, page: SHOP_CONSTANT.DEFAULT_PAGE });
        }}
        className="w-full py-3.5 bg-gray-900 hover:bg-black text-white text-[10px] font-black uppercase tracking-widest  transition-all shadow-lg active:scale-95"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default ShopFilters;