"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Truck, RotateCcw, Heart, Minus, Plus } from "lucide-react";

import { IUserProductsResponse } from "@/types/types";
import { Rating } from "react-simple-star-rating";
import CustomSpinner from "@/components/shared/CustomSpinner";
import { useGetProductsQuery } from "@/store/api/productsApi/productsApi";



const ProductDetails = () => {
  const { data: response, isLoading } = useGetProductsQuery();
  const product = (response as IUserProductsResponse)?.data?.data?.[0];
  const [userSelectedImg, setUserSelectedImg] = useState<string | null>(null);
  const [userSelectedSize, setUserSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const mainImg = userSelectedImg ?? product?.images?.[0] ?? null;
  const selectedSize = userSelectedSize ?? product?.size?.[0] ?? null;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center font-bold">
        <CustomSpinner/>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center font-bold">
        No Product Found!
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Thumbnails */}
        <div className="lg:col-span-2 flex lg:flex-col flex-row gap-4 order-2 lg:order-1">
          {product.images?.map((img: string, index: number) => (
            <div
              key={index}
              className="relative w-full h-24 sm:h-32 lg:h-40 overflow-hidden bg-[#F5F5F5] rounded"
            >
              <button
                onClick={() => setUserSelectedImg(img)}
                className={`w-full h-full relative border-2 transition-all ${
                  mainImg === img ? "border-[#DB4444]" : "border-transparent"
                }`}
              >
                <Image
                  src={img}
                  alt={`thumbnail-${index}`}
                  fill
                  className="object-contain p-2 hover:scale-110 transition-transform"
                />
              </button>
            </div>
          ))}
        </div>

        {/* Main Image View */}
        <div className="lg:col-span-5 relative h-[300px] sm:h-[400px] lg:h-[600px] overflow-hidden order-1 lg:order-2 bg-[#F5F5F5] rounded">
          {mainImg && (
            <Image
              src={mainImg}
              alt={product.title}
              fill
              priority
              className="object-contain p-10 transition-transform duration-700 hover:scale-105"
            />
          )}
        </div>

        {/* Product Information */}
        <div className="lg:col-span-5 order-3 flex flex-col">
          <div className="space-y-4">
            <h1 className="text-2xl lg:text-3xl font-bold text-black uppercase tracking-tight">
              {product.title}
            </h1>

            {/* Ratings & Stock Status */}
            <div className="flex items-center gap-4">
             <div className="flex flex-col items-end">
                  <Rating
                    initialValue={Number(product.rating)}
                    readonly={true}
                    size={16}
                    allowFraction={true}
                    SVGstyle={{ display: 'inline' }}
                  />
                  <span className="text-[10px] font-semibold text-gray-400">
                    ({product.review?.length || 0} reviews)
                  </span>
                </div>
              
            </div>

            {/* Pricing */}
            <div className="flex items-center gap-3">
              <p className="text-2xl font-semibold">
                ${product.sellingPrice.toFixed(2)}
              </p>
              {product.productActualPrice > 0 && (
                <p className="text-xl text-gray-500 line-through">
                  ${product.productActualPrice.toFixed(2)}
                </p>
              )}
            </div>

            <p className="text-sm text-gray-700 leading-relaxed border-b border-black/10 pb-6">
              {product.description}
            </p>

            {/* Variants (Colors & Sizes) */}
            <div className="space-y-4 py-4">
              {product.colour && product.colour.length > 0 && (
                <div className="flex items-center gap-4">
                  <span className="text-xl">Colours:</span>
                  <div className="flex gap-2">
                    {product.colour.map((color: string, idx: number) => (
                      <div
                        key={idx}
                        style={{ backgroundColor: color }}
                        className="w-5 h-5 rounded-full ring-offset-2 hover:ring-2 ring-black cursor-pointer transition-all border border-gray-200"
                      />
                    ))}
                  </div>
                </div>
              )}

              {product.size && product.size.length > 0 && (
                <div className="flex items-center gap-4">
                  <span className="text-xl">Size:</span>
                  <div className="flex gap-3">
                    {product.size.map((size: string) => (
                      <button
                        key={size}
                        onClick={() => setUserSelectedSize(size)}
                        className={`w-10 h-10 border rounded-md font-bold transition-all ${
                          selectedSize === size
                            ? "bg-[#DB4444] text-white border-[#DB4444]"
                            : "hover:border-[#DB4444]"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-6 mt-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center border border-black/30 rounded-md overflow-hidden h-11">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 hover:bg-[#DB4444] hover:text-white transition-colors h-full border-r border-black/30"
                >
                  <Minus size={18} />
                </button>
                <span className="px-8 font-bold text-xl min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 hover:bg-[#DB4444] hover:text-white transition-colors h-full border-l border-black/30"
                >
                  <Plus size={18} />
                </button>
              </div>
              <button className="flex-1 bg-[#DB4444] text-white h-11 rounded-md font-bold hover:bg-red-600 transition-all">
                Buy Now
              </button>
              <button className="p-2 border border-black/30 rounded-md hover:bg-[#DB4444] hover:text-white transition-all h-11 w-12 flex items-center justify-center">
                <Heart size={24} />
              </button>
            </div>

            {/* Support Info */}
            <div className="border border-black/30 rounded-md divide-y divide-black/30">
              <div className="flex items-center gap-4 p-4">
                <Truck size={32} />
                <div>
                  <h3 className="font-bold text-sm">Free Delivery</h3>
                  <p className="text-[10px] underline cursor-pointer">
                    Enter your postal code for Delivery Availability
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4">
                <RotateCcw size={32} />
                <div>
                  <h3 className="font-bold text-sm">Return Delivery</h3>
                  <p className="text-[10px]">
                    Free 30 Days Delivery Returns.{" "}
                    <span className="underline cursor-pointer">Details</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;