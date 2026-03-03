"use client";

import Image from "next/image";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useDeleteWishlistMutation, useGetWishlistQuery } from "@/store/api/wishlistApi/wishlistApi";
import { IWishlist } from "@/types/types";
import CustomSpinner from "@/components/shared/CustomSpinner";
import { useAddToCart } from './../../../../Utils/cartFuntionlaity';

import NewArrivalProducts from "../NewArrivalProducts/NewArrivalProducts";


const WishList = () => {
  
  const { data: wishlistResponse, isLoading, isError } = useGetWishlistQuery("");
  const [deleteWishlist] = useDeleteWishlistMutation();
  const wishlistItems = (wishlistResponse?.data as IWishlist[]) || [];
  const { handleAdd} = useAddToCart();

  if (isLoading) return <div className="py-10 text-center font-medium"><CustomSpinner/></div>;
  if (isError) return <div className="py-10 text-center text-red-500">Something went wrong!</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      
  
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-semibold text-black">
          Wishlist ({wishlistItems.length})
        </h1>
        <button className="px-6 py-3 border border-gray-300 rounded-sm font-medium hover:bg-gray-100 transition">
          Move All To Bag
        </button>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="py-20 text-center text-gray-500 font-medium">
          Your wishlist is empty.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlistItems.map((item: IWishlist) => {
            const product = item.products;
            if (!product) return null;

            return (
              <div key={item.id} className="group relative border rounded-md overflow-hidden bg-white shadow-sm flex flex-col">
                <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
                  {product.discountedRate !== undefined && product.discountedRate > 0 && (
                    <span className="absolute top-3 left-3 bg-[#DB4444] text-white text-xs px-3 py-1 rounded-sm z-10">
                      -{product.discountedRate}%
                    </span>
                  )}

                  <Image
                    src={product.images?.[0] || "/placeholder.png"} // fallback ইমেজ
                    alt={product.title || "product image"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  <button
                    onClick={() => deleteWishlist(item.id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full text-black hover:text-red-500 transition shadow-sm z-10"
                  >
                    <Trash2 size={18} />
                  </button>

                  <button 
                    onClick={() => handleAdd(item.products!, item.id)}
                    className="absolute bottom-0 w-full bg-black text-white py-2.5 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                  >
                    <ShoppingCart size={18} />
                    <span  className="text-sm font-medium">Add To Cart</span>
                  </button>
                </div>

                <div className="p-4 space-y-2 flex-grow">
                  <h2 className="font-bold text-gray-800 truncate text-base">
                    {product.title}
                  </h2>
                  <div className="flex items-center gap-3">
                    <span className="text-[#DB4444] font-bold">
                      ৳{product.sellingPrice}
                    </span>
                    {product.productActualPrice && (
                      <span className="text-gray-400 line-through text-sm">
                        ৳{product.productActualPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
       
    
    </div>
    <NewArrivalProducts />
      </div>
  );
};

export default WishList;