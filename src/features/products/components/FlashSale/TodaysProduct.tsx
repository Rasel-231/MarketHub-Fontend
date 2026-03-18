"use client";

import { MoveLeft, MoveRight } from "lucide-react";
import MinHeader from "@/components/shared/MinHeader";
import ProductCard from "./ProductCard";
import FlashSaleTimer from "./FlashSaleTimer";
import { useGetProductsQuery } from "@/store/api/productsApi/productsApi";

const TodaysProduct = () => {
  const { data: productsResponse } = useGetProductsQuery(undefined);
  
  const products = productsResponse?.data?.data || [];
  const flashSaleEndDate = products.length > 0 ? products[0].flashSaleEnd : null;

  return (
    <div className="container mx-auto py-10 my-2 px-4 md:px-0">
      <MinHeader title="Today's Favorite" />
      
      <div className="my-6">
        {/* উপরের অংশ: হেডিং এবং বাটন একই রো (Row) তে থাকবে */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wider">
            Flash Sales
          </h2>

          <div className="flex gap-3">
            <button className="h-9 w-9 md:h-11 md:w-11 flex items-center justify-center bg-gray-100 hover:bg-gray-200 active:scale-90 rounded-full transition-all border border-gray-100">
              <MoveLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button className="h-9 w-9 md:h-11 md:w-11 flex items-center justify-center bg-gray-100 hover:bg-gray-200 active:scale-90 rounded-full transition-all border border-gray-100">
              <MoveRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        {/* নিচের অংশ: টাইমারটি আলাদা লাইনে (নিচে) থাকবে */}
        <div className="mt-2">
          {flashSaleEndDate && <FlashSaleTimer endTime={flashSaleEndDate} />}
        </div>
      </div>

      {/* প্রোডাক্ট সেকশন */}
      <div className="mt-8">
        <ProductCard />
      </div>
    </div>
  );
};

export default TodaysProduct;