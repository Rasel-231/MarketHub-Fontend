"use client";

import { useState } from "react";
import Image from "next/image";
import { Truck, RotateCcw, Heart, Minus, Plus} from "lucide-react";

import { IErrorResponse, IUserProducts } from "@/types/types";
import { Rating } from "react-simple-star-rating";
import CustomSpinner from "@/components/shared/CustomSpinner";
import { useGetSingleProductsQuery } from "@/store/api/productsApi/productsApi";
import ProductSpecification from "../ProductsTabs/ProductSpecification";
import UserComments from "../ProductsTabs/UserComents";
import RelatedProduct from "../RelatedProducts/RelatedProduct";
import { useParams } from "next/navigation";
import { getRatingStats } from "@/Utils/calculatefuntion";
import { useAddWishlistMutation } from "@/store/api/wishlistApi/wishlistApi";
import { toast } from "react-toastify";
import { useGetMyProfileQuery } from "@/store/api/userApi/userApi";

const ProductDetails = () => {
  const params = useParams();
  const { data: productResponse, isLoading } = useGetSingleProductsQuery(params.id as string);
  const [addWishlist]=useAddWishlistMutation()
  console.log("Get Single Data Fetch ",productResponse)
const product = productResponse?.data?.data?.[0] as IUserProducts | undefined;
  console.log("Products data fetch from params",product);
   const { averageRating, totalReviews } = getRatingStats(product?.review || []);
     const { data: userData } = useGetMyProfileQuery(undefined);
     const userId = userData?.data?.id;
  
  const [userSelectedImg, setUserSelectedImg] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("specification");
  const mainImg = userSelectedImg ?? product?.images?.[0] ?? "/placeholder.png";

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center font-bold">
        <CustomSpinner />
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

  return (
    <>
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
       
          <div className="lg:col-span-2 flex lg:flex-col flex-row gap-4 order-2 lg:order-1">
           
            {Array.isArray(product.images) && product.images.map((img: string, index: number) => (
              
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

     
          <div className="lg:col-span-5 relative h-[300px] sm:h-[400px] lg:h-[600px] overflow-hidden order-1 lg:order-2 bg-[#F5F5F5] rounded">
            {mainImg && (
              <Image
                src={mainImg}
                alt={product.title || "Product Image"}
                fill
                priority
                className="object-contain p-10 transition-transform duration-700 hover:scale-105"
              />
            )}
          </div>

         
          <div className="lg:col-span-5 order-3 flex flex-col">
            <div className="space-y-4">
              <h1 className="text-2xl lg:text-3xl font-bold text-black uppercase tracking-tight flex items-center gap-3">
                <div>{product.title}</div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">

                   
                   
                    <Rating
                      initialValue={averageRating}
                      readonly={true}
                      size={16}
                      allowFraction={true}
                      SVGstyle={{ display: "inline" }}
                    />
                    <span className="text-[10px] font-semibold text-gray-400">
                      ({totalReviews})
                    </span>
                  </div>
                </div>
              </h1>

              <div className="flex gap-4 items-center">
                <p className="flex gap-2 items-center">
                  SKU :{" "}
                  <span className="text-gray-500 uppercase">
                    {product.id?.slice(0, 6)}
                  </span>
                </p>{" "}
                |
                <p className="flex gap-2 items-center">
                  {" "}
                  Model :{" "}
                  <span className="text-gray-500">{product.model}</span>{" "}
                </p>
                |
                <p className="flex gap-2 items-center">
                  Brand : <span className="text-blue-500">{product.brand}</span>
                </p>
                |<p className="text-green-500 items-center">{product.status}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-2xl font-semibold">
                  ${parseFloat(String(product.flashSalePrice || 0)).toFixed(2)}
                </p>
                {product.productActualPrice > 0 && (
                  <p className="text-xl text-gray-500 line-through">
                    ${product.productActualPrice.toFixed(2)}
                  </p>
                )}
                {product?.discountAmount > 0 && (
                  <div className="bg-green-600 text-white p-1 shadow">
                    <p>{`Save ${product.discountAmount}$`}</p>
                  </div>
                )}
              </div>

              <h1 className="font-bold"> Key Features</h1>
              <ol>
                <li className="list-disc ml-4">High Performance Motor</li>
                <li className="list-disc ml-4">Multiple Speed Settings</li>
                <li className="list-disc ml-4">Easy to Clean</li>
                <li className="list-disc ml-4">Compact Design</li>
                <li className="list-disc ml-4">Durable Build Quality</li>
                <li className="list-disc ml-4">Energy Efficient</li>
              </ol>

              <button className="text-red-600 underline">View More Info</button>
            </div>

           
            <div className="space-y-6 mt-4">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center border border-black/30 rounded-md overflow-hidden h-11">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 hover:bg-black hover:text-white transition-colors h-full border-r border-black/30"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="px-8 font-bold text-xl min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-4 hover:bg-black hover:text-white transition-colors h-full border-l border-black/30"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <button className="flex-1 bg-black text-white h-11 rounded-md font-bold hover:bg-gray-600 transition-all">
                  Add to Cart
                </button>
                <div>
                  <button onClick={() => handleWishlist(product.id)} className="p-2 border border-black/30 rounded-md bg-black hover:bg-gray-600 text-white transition-all h-11 w-12 flex items-center justify-center">
                    <Heart size={24} />
                  </button>

                </div>
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

      {/* Tabs */}
      <div className="container mx-auto px-4 ">
        <div>
          <div className="flex gap-7 mt-10">
            {["specification", "description", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`p-3 w-48 font-bold transition-colors capitalize ${
                  activeTab === tab
                    ? "bg-black text-white"
                    : "bg-gray-300 text-black hover:bg-black hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="mt-8 border p-4">
            {activeTab === "specification" && <ProductSpecification />}
            {activeTab === "description" && (
              <div className="p-4 text-gray-700">
                {product.description || "No description available."}
              </div>
            )}
            {activeTab === "reviews" && (
              <>
                <UserComments/>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="mt-10 mx-4">
        <RelatedProduct currentProductId={product.id}/>
      </div>
    </>
  );
};

export default ProductDetails;