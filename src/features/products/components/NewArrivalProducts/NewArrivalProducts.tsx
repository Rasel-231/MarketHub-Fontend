"use client";
import Image from "next/image";
import { IUserProducts } from "@/types/types";
import { Eye, ShoppingCart } from "lucide-react";
import { useAddToCart } from "@/Utils/cartFuntionlaity";
import MinHeader from "@/components/shared/MinHeader";
import Link from "next/link";
import CustomSpinner from "@/components/shared/CustomSpinner";
import { useGetNewArrivalsQuery } from "@/store/api/flagApi/flagApi";
import NewArrivalEffect from "./NewArrivalEffect";

const NewArrivalProducts = () => {
  const { handleAdd } = useAddToCart();
  const { data: ProductResponse, isLoading, error } = useGetNewArrivalsQuery();
  const products = Array.isArray(ProductResponse?.data?.data)
    ? (ProductResponse.data.data as IUserProducts[])
    : [];

  if (isLoading)
    return (
      <div className="flex justify-center p-10">
        <CustomSpinner />
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 p-10">
        New Arrival products cannot be loaded.
      </div>
    );
  if (products.length === 0) return null;
  return (
    <div>
      <MinHeader title="New Arrival Products" />
      <NewArrivalEffect>
        {products.map((product) => (
          <div
            key={product.id}
            className="border shadow-md bg-white relative m-2 rounded-sm flex flex-col h-[280px] sm:h-[400px] overflow-hidden w-48 sm:w-64 flex-shrink-0"
          >
            <div className="relative h-28 sm:h-48 w-full flex-shrink-0">
              <Image
                src={product.images?.[0] || "/placeholder.png"}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover"
              />
              <div className="absolute top-3 left-2 bg-red-600 text-white px-3 py-1 rounded-sm text-xs font-bold uppercase">
                New
              </div>
              <Link href={`/products/${product.id}`}>
                <button className="bg-white absolute p-1.5 top-2 right-2 flex flex-col rounded-full shadow-sm hover:text-red-500 transition-colors">
                  <Eye size={18} />
                </button>
              </Link>
            </div>

            <div className="mt-2 px-3 flex flex-col justify-between flex-grow pb-3">
              <div className="flex-grow">
                <h2 className="font-bold text-gray-800 line-clamp-1 text-sm sm:text-base">
                  {product.title}
                </h2>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex gap-2">
                    <p className="text-red-600 font-bold text-base sm:text-lg mt-0.5 sm:mt-1">
                      ${product.flashSalePrice}
                    </p>
                    <p className="text-gray-500  line-through text-base sm:text-lg mt-0.5 sm:mt-1">
                      ${product.productActualPrice}
                    </p>
                  </div>
                  <div className="bg-green-700 px-2 py-1 w-18 text-center rounded text-white text-xs  mt-0.5 sm:mt-1">
                    ${product.discountAmount}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mt-0.5 sm:mt-1 leading-tight mb-1">
                  {product.description}
                </p>
              </div>
              <button
                onClick={() => handleAdd(product)}
                className="w-full bg-black text-white py-1.5 sm:py-2 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors text-sm mt-auto"
              >
                <ShoppingCart size={16} />
                <span className="text-xs sm:text-sm font-medium">
                  Add To Cart
                </span>
              </button>
            </div>
          </div>
        ))}
      </NewArrivalEffect>
    </div>
  );
};

export default NewArrivalProducts;