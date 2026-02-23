"use client";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import { Heart } from "lucide-react";

import { IUserProductsResponse} from "@/types/types";
import { getRatingStats } from "@/Utils/calculatefuntion";
import { useState } from "react";
import { useAddToCart } from "@/Utils/cartFuntionlaity";
import CustomSpinner from "@/components/shared/CustomSpinner";
import { useGetProductsQuery } from "@/store/api/productsApi/productsApi";



const ProductCard = () => {

const [showAll,setShowAll]=useState(false)
  const { data:response, isLoading } = useGetProductsQuery(undefined);
   const products = (response as IUserProductsResponse)?.data?.data;
   console.log("Products:",products);
   const {handleAdd}=useAddToCart()

  if (isLoading) return <div className="py-10 text-center font-bold"><CustomSpinner/></div>;
  if (!products?.length) return <div className="py-10 text-center">No Products Found!</div>;

  const visibleProducts = showAll ? products : products.slice(0, 4);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleProducts.map((product) => {

          const { averageRating, totalReviews } = getRatingStats(product?.review || []);

          return (
            <div
              key={product.id}
              className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
                <div className="absolute top-2 left-0 right-0 z-10 flex justify-between items-center px-2">
                  {product.discountedRate > 0 && (
                    <div className="w-16 h-7 bg-red-600 flex items-center justify-center text-white text-[10px] font-bold rounded-r-md">
                      {`-${product.discountedRate} %`}
                    </div>
                  )}
                  <button className="bg-white p-1.5 rounded-full shadow-sm hover:text-red-500 transition-colors">
                    <Heart size={18} />
                  </button>
                </div>
                <Image
                  src={product.images?.[0] || "/placeholder.jpg"}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-lg truncate">{product.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="flex gap-4 items-center">
                    <span className="text-xl font-extrabold text-rose-500">
                      ${product.sellingPrice.toFixed()}
                    </span>
                    {product.discountedRate > 0 && (
                      <span className="text-gray-400 text-xl font-bold line-through">
                        ${product.productActualPrice.toFixed()}
                      </span>
                    )}
                  </span>
                  
                  {/* Corrected Rating Section */}
                  <div className="flex flex-col items-end">
                    <Rating
                      initialValue={averageRating}
                      readonly={true}
                      size={16}
                      allowFraction={true}
                      SVGstyle={{ display: 'inline' }}
                    />
                    <span className="text-[10px] font-semibold text-gray-400">
                      ({totalReviews} reviews)
                    </span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <button onClick={()=>handleAdd(product)} className="bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 transition-colors w-full">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {products.length > 4 && (
        <div className="flex justify-center items-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-xs my-5 bg-red-500 text-white p-2 px-6 rounded-none text-xs font-bold"
          >
            {showAll ? "View less Products" : "View All Products"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;