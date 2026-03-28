"use client";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import { Eye, Heart } from "lucide-react";
import { useState } from "react";

import { IFlagResponse } from "@/types/types";
import { getRatingStats } from "@/Utils/calculatefuntion";
import { useAddToCart } from "@/Utils/cartFuntionlaity";
import CustomSpinner from "@/components/shared/CustomSpinner";
import Link from "next/link";
import { useGetFlashSalesQuery } from "@/store/api/flagApi/flagApi";
import { useWishlistAction } from "../WishListDetails/addToWishlist";

const ProductCard = () => {
  const [showAll, setShowAll] = useState(false);
  const { data: response, isLoading } = useGetFlashSalesQuery(undefined);
  const { handleAdd } = useAddToCart();
 const {handleWishlist}=useWishlistAction()
  const rawRes = (response as IFlagResponse)?.data?.data;
  const products = Array.isArray(rawRes) ? rawRes : [];


  if (isLoading)
    return (
      <div className="py-10 text-center font-bold">
        <CustomSpinner />
      </div>
    );
  if (!products?.length)
    return <div className="py-10 text-center">No Products Found!</div>;


  const visibleProducts = showAll ? products : products.slice(0, 4);


  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleProducts.map((product) => {
          const { averageRating, totalReviews } = getRatingStats(
            product?.review || [],
          );

          return (
            <div
              key={product.id}
              className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full"
            >
              <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
                <div className="absolute top-2 left-0 right-0 z-10 flex justify-between items-center px-2">
                  {product.discountedRate > 0 && (
                    <div className="w-16 h-7 bg-red-600 flex items-center justify-center text-white text-[10px] font-bold rounded-r-md">
                      {`-${product.discountedRate} %`}
                    </div>
                  )}
                  <div>
                    <button
                      onClick={() => handleWishlist(product.id)}
                      className="bg-white p-1.5 rounded-full shadow-sm hover:text-red-500 transition-colors"
                    >
                      <Heart size={18} />
                    </button>
                    <Link href={`/products/${product.id}`}>
                      <button className="bg-white p-1.5 flex flex-col mt-2 rounded-full shadow-sm hover:text-red-500 transition-colors">
                        <Eye size={18} />
                      </button>
                    </Link>
                  </div>
                </div>
                <Image
                  src={product.images?.[0] || "/placeholder.jpg"}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4 space-y-2 flex flex-col flex-grow">
                <h3 className="font-bold text-lg truncate">{product.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="flex gap-2 items-center">
                    <span className="text-xl font-extrabold text-rose-500">
                      $
                      {product.flashSalePrice
                        ? parseFloat(String(product.flashSalePrice)).toFixed(2)
                        : product.productActualPrice.toFixed(2)}
                    </span>
                    {product.discountedRate > 0 && (
                      <span className="text-gray-400 text-sm font-bold line-through">
                        $
                        {product.productActualPrice
                          ? product.productActualPrice.toFixed(2)
                          : "0.00"}
                      </span>
                    )}
                  </span>
                  <div className="flex flex-col items-end">
                    <Rating
                      initialValue={averageRating}
                      readonly={true}
                      size={14}
                      allowFraction={true}
                      SVGstyle={{ display: "inline" }}
                    />
                    <span className="text-[10px] font-semibold text-gray-400">
                      ({totalReviews})
                    </span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm line-clamp-2 flex-grow">
                  {product.description}
                </p>
                <div className="mt-4">
                  <button
                    onClick={() => handleAdd(product)}
                    className="bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 transition-colors w-full rounded-md"
                  >
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
            className="w-xs my-8 bg-red-500 text-white p-2 px-8 rounded-full text-xs font-bold hover:bg-red-600 transition-all"
          >
            {showAll ? "View less Products" : "View All Products"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
