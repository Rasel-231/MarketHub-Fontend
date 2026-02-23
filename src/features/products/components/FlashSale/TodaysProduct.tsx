"use client";

import { MoveLeft, MoveRight } from "lucide-react";
import MinHeader from "@/components/shared/MinHeader";
import ProductCard from "./ProductCard";

const TodaysProduct = () => {
  return (
    <div className="container mx-auto  py-10 my-2">
      <MinHeader title="Today's Favorite" />
      <div className="my-4 p-1">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-xl md:text-2xl font-extrabold uppercase tracking-wider leading-none">
            Flash Sales
          </h2>

          <div className="flex gap-2 shrink-0">
            <button className="h-8 w-8 md:h-11 md:w-11 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-all">
              <MoveLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button className="h-8 w-8 md:h-11 md:w-11 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-all">
              <MoveRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase mb-1">Days</span>
            <span className="text-xl md:text-2xl font-extrabold leading-none">03</span>
          </div>
          <span className="text-2xl font-extrabold text-red-600 self-end mb-1">:</span>

          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase mb-1">Hours</span>
            <span className="text-xl md:text-2xl font-extrabold leading-none">07</span>
          </div>
          <span className="text-2xl font-extrabold text-red-600 self-end mb-1">:</span>

          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase mb-1">Minutes</span>
            <span className="text-xl md:text-2xl font-extrabold leading-none">46</span>
          </div>
          <span className="text-2xl font-bold text-red-600 self-end mb-1">:</span>

          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase mb-1">Seconds</span>
            <span className="text-xl md:text-2xl font-extrabold leading-none">13</span>
          </div>
        </div>
      </div>

      <ProductCard />
    </div>
  );
};

export default TodaysProduct;