"use client";

import Image from "next/image";
import MinHeader from "@/components/shared/MinHeader";
import { useGetFeaturedProductsQuery } from "@/store/api/flagApi/flagApi";
import CustomSpinner from "@/components/shared/CustomSpinner";
import { IFlagResponse } from "@/types/types";

const Featured = () => {
  const { data: response, isLoading, isError } = useGetFeaturedProductsQuery(undefined);
  const rawData = (response as IFlagResponse)?.data?.data;
  const featuredProducts = Array.isArray(rawData) ? rawData : [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CustomSpinner />
      </div>
    );
  }

  if (isError || featuredProducts.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        No Feature Products
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <MinHeader title="Featured" />
        <h2 className="text-xl md:text-2xl font-extrabold uppercase tracking-wider mt-4">
          Best Choise For You
        </h2>
      </div>
      
      {featuredProducts.map((product) => (
        <section key={product.id} className="flex flex-col md:flex-row gap-5 h-auto md:h-[600px] mb-10">
         
          <div className="w-full md:w-1/2 relative bg-zinc-900 rounded-xl overflow-hidden group h-[400px] md:h-full">
            <Image
              src={Array.isArray(product.images) ? product.images[0] : product.images || "/placeholder.jpg"}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
            />
            <div className="absolute bottom-8 left-8 z-10 text-white max-w-[280px]">
              <h3 className="text-2xl font-bold mb-2">Best Choice for You</h3>
              <p className="text-sm text-gray-300 mb-4">Explore your buying skill with premium quality.</p>
              <button className="underline font-bold hover:text-red-500 transition-colors">Shop Now</button>
            </div>
          </div>

        
          <div className="w-full md:w-1/2 flex flex-col gap-5">
            <div className="h-[280px] md:flex-1 relative bg-zinc-900 rounded-xl overflow-hidden group">
              <Image
               
                src={Array.isArray(product.images) ? product.images[1] || product.images[0] : product.images || "/placeholder.jpg"}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute bottom-6 left-6 z-10 text-white max-w-[250px]">
                <h3 className="text-xl font-bold mb-1">Best Choice for You</h3>
                <p className="text-xs text-gray-300 mb-3">Explore your buying skill with premium quality.</p>
                <button className="underline font-bold hover:text-red-500 transition-colors">Shop Now</button>
              </div>
            </div>

            {/* Bottom Two Small Cards */}
            <div className="flex flex-row gap-5 h-[250px] md:flex-1">
              <div className="flex-1 relative bg-zinc-900 rounded-xl overflow-hidden group">
                <Image
                  src={Array.isArray(product.images) ? product.images[0] : product.images || "/placeholder.jpg"}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute bottom-4 left-4 z-10 text-white">
                  <h3 className="text-lg font-bold">Best Choice</h3>
                  <button className="underline text-sm font-bold hover:text-red-500">Shop Now</button>
                </div>
              </div>

              <div className="flex-1 relative bg-zinc-900 rounded-xl overflow-hidden group">
                <Image
                  src={Array.isArray(product.images) ? product.images[0] : product.images || "/placeholder.jpg"}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute bottom-4 left-4 z-10 text-white">
                  <h3 className="text-lg font-bold">New Airpots</h3>
                  <button className="underline text-sm font-bold hover:text-red-500">Shop Now</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Featured;