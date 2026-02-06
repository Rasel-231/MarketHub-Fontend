"use client";

import { MoveLeft, MoveRight } from "lucide-react";
import MinHeader from "../../common/MinHeader/MinHeader";
import ProductCard from "./ProductCard";

const TodaysProduct = () => {
  return (
    <div className="container mx-auto px-4 md:px-0 py-10">
      <MinHeader title="Today's Favorite" />

      <div className="flex flex-row justify-between gap-6 mt-6 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end gap-6 md:gap-20">
          <h2 className="text-xl md:text-2xl font-extrabold uppercase tracking-wider leading-none">
            Flash Sales
          </h2>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase mb-1">Days</span>
              <span className="text-xl md:text-2xl font-extrabold leading-none">
                03
              </span>
            </div>
            <span className="text-2xl font-extrabold text-red-600 self-end mb-1">
              :
            </span>

            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase mb-1">
                Hours
              </span>
              <span className="text-xl md:text-2xl font-extrabold leading-none">
                07
              </span>
            </div>
            <span className="text-2xl font-extrabold text-red-600 self-end mb-1">
              :
            </span>

            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase mb-1">
                Minutes
              </span>
              <span className="text-xl md:text-2xl font-extrabold leading-none">
                46
              </span>
            </div>
            <span className="text-2xl font-bold text-red-600 self-end mb-1">
              :
            </span>

            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase mb-1">
                Seconds
              </span>
              <span className="text-xl md:text-2xl font-extrabold leading-none">
                13
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-center md:justify-end">
          <button className="h-10 w-10 md:h-11 md:w-11 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-all">
            <MoveLeft size={20} />
          </button>
          <button className="h-10 w-10 md:h-11 md:w-11 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-all">
            <MoveRight size={20} />
          </button>
        </div>
      </div>

      <ProductCard />
    </div>
  );
};

export default TodaysProduct;
