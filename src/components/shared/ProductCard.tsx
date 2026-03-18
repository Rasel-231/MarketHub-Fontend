"use client";
import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { IErrorResponse, ProductCardProps } from "@/types/types";
import { getRatingStats } from "@/Utils/calculatefuntion";
import { Rating } from "react-simple-star-rating";
import { useAddToCart } from "@/Utils/cartFuntionlaity";
import { useAddWishlistMutation } from "@/store/api/wishlistApi/wishlistApi";
import { useGetMyProfileQuery } from "@/store/api/userApi/userApi";
import { toast } from "react-toastify";

const CustomProductCard = ({
  product,
  isFlashSale = false,
}: ProductCardProps) => {
  const { averageRating, totalReviews } = getRatingStats(product?.review || []);
  const { handleAdd } = useAddToCart();
  const [addWishlist]=useAddWishlistMutation()
    const { data: userData } = useGetMyProfileQuery(undefined);
           const userId = userData?.data?.id;
            const handleWishlist = async (productId: string) => {
               if (!userId) {
                 toast.warning("Please log in to add items to your wishlist!");
                 return;
               }
               try {
                 await addWishlist({ productId, userId }).unwrap();
                 toast.success("Product added to wishlist!");
               } catch (err) {
                 const error = err as IErrorResponse;
                 toast.error(error?.data?.message || "Failed to add to wishlist!");
               }
             };

  const actualPrice = product.productActualPrice || 0;
  const displayPrice =
    isFlashSale && product.flashSalePrice
      ? product.flashSalePrice
      : actualPrice;
  const discount = product.discountedRate || 0;

  return (
    <div className="bg-white border border-gray-100  overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col h-full relative">
      <div className="relative aspect-square w-full bg-[#F8F9FA] overflow-hidden">
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black px-3 py-1 z-20 rounded-lg shadow-md">
            -{discount}%
          </div>
        )}

        <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
          <button onClick={() => handleWishlist(product.id)} className="bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-sm text-gray-900 hover:text-red-500 transition-all active:scale-90">
            <Heart  size={18} />
          </button>
          <Link href={`/products/${product.id}`}>
            <div className="bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-sm text-gray-900 hover:text-orange-600 transition-all active:scale-90">
              <Eye size={18} />
            </div>
          </Link>
        </div>

        <Image
          src={product.images?.[0] || "/placeholder.jpg"}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="p-4 md:p-6 flex flex-col flex-grow">
        <h3 className="font-black text-base md:text-[18px] text-gray-900 uppercase tracking-tight line-clamp-1 mb-2">
          {product.title}
        </h3>

        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg md:text-[22px] font-black text-red-600">
              ${parseFloat(String(displayPrice)).toLocaleString()}
            </span>
            {discount > 0 && (
              <span className="text-xs md:text-[16px] text-gray-400 font-bold line-through">
                ${actualPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex flex-col items-end">
            <Rating
              initialValue={averageRating}
              readonly={true}
              size={14}
              allowFraction={true}
              SVGstyle={{ display: "inline" }}
            />
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
              {totalReviews} Reviews
            </span>
          </div>
        </div>

        <p className="text-gray-400 text-xs md:text-sm font-medium line-clamp-2 mb-5">
          {product.description || `Premium quality ${product.title}`}
        </p>

        <button
          onClick={() => handleAdd(product)}
          className="w-full bg-black  text-white py-2 flex items-center justify-center gap-2.5 hover:bg-orange-600 active:scale-95 transition-all mt-auto shadow-lg shadow-gray-100 group/btn"
        >
          <div className="flex items-center justify-center gap-2">
            <ShoppingCart size={16} className="shrink-0 leading-none" />
            <span className="text-xs font-black font-nunito uppercase tracking-tight leading-none">
              Add To Cart
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default CustomProductCard;
