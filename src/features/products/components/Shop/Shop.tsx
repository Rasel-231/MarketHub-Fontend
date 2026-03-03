"use client";
import Image from "next/image";
import { ChevronRight, ChevronLeft, Filter, Heart, Eye } from "lucide-react";

import { useGetProductsQuery } from "@/store/api/productsApi/productsApi";
import { getRatingStats } from "@/Utils/calculatefuntion";
import { Rating } from "react-simple-star-rating";
import { useAddToCart } from "@/Utils/cartFuntionlaity";
import Link from "next/link";
import { IUserProducts } from "@/types/types";

const Shop = () => {
  const { data: productResponse, isLoading } = useGetProductsQuery(undefined);
  const products: IUserProducts[] = productResponse?.data?.data || [];
  const { handleAdd } = useAddToCart();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 bg-gray-50 dark:bg-zinc-950 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar - আপনার আগের ডিজাইন অনুযায়ী সব ফিল্ড এখানে */}
        <aside className="w-full lg:w-72 space-y-6 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 h-fit">
          <div className="flex items-center gap-2 mb-4 border-b pb-4 dark:border-zinc-800">
            <Filter size={18} className="text-indigo-600" />
            <h2 className="text-lg font-bold">Filters</h2>
          </div>

          <div className="space-y-4">
            {/* Price Range */}
            <div>
              <label className="text-md font-nunito text-left font-semibold text-gray-700 dark:text-gray-300 block mb-2">
                Price Range
              </label>
              <hr className="dark:border-zinc-800" />
              <input
                type="range"
                name="price"
                id="price"
                className="w-full accent-indigo-600 mt-2"
              />
            </div>

            {/* Static Filters */}
            {[
              {
                label: "Category",
                options: ["All Categories", "Electronics", "Clothing"],
              },
              { label: "Brand", options: ["All Brands", "Apple", "Samsung"] },
              {
                label: "Rating",
                options: ["All Ratings", "4 Stars & Up", "3 Stars & Up"],
              },
              {
                label: "Availability",
                options: ["All", "In Stock", "Out of Stock"],
              },
              {
                label: "Color",
                options: ["All Colors", "Red", "Blue", "Green"],
              },
              {
                label: "Size",
                options: ["All Sizes", "Small", "Medium", "Large"],
              },
              {
                label: "Discount",
                options: ["All Discounts", "10% or More", "20% or More"],
              },
            ].map((filter) => (
              <div key={filter.label}>
                <label className="text-md font-nunito text-left font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  {filter.label}
                </label>
                <hr className="dark:border-zinc-800" />
                <select
                  name={filter.label.toLowerCase()}
                  id={filter.label.toLowerCase()}
                  className="w-full p-2 mt-2 text-sm bg-gray-50 dark:bg-zinc-800 border rounded-md outline-none"
                >
                  {filter.options.map((opt) => (
                    <option key={opt} value={opt.toLowerCase()}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Nav - আপনার আগের ডিজাইন */}
          <nav className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-100 dark:border-zinc-800 gap-4">
            <h1 className="text-xl font-bold">Shop Page</h1>
            <div className="flex flex-wrap items-center gap-6">
              <span className="flex items-center gap-2">
                <label className="text-md font-nunito text-left">Show</label>
                <select
                  name="sort"
                  id="sort"
                  className="p-1 border rounded bg-transparent"
                >
                  <option value="relevance">10</option>
                  <option value="price-low-high">20</option>
                  <option value="price-low-high">30</option>
                  <option value="price-low-high">40</option>
                </select>
              </span>
              <span className="flex items-center gap-2">
                <label className="text-md font-nunito text-left">Sort By</label>
                <select
                  name="sort"
                  id="sort"
                  className="p-1 border rounded bg-transparent"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-low-high">Price: High to Low</option>
                </select>
              </span>
            </div>
          </nav>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const { averageRating, totalReviews } = getRatingStats(
                product?.review || [],
              );

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
                      <div>
                        <button className="bg-white p-1.5 rounded-full shadow-sm hover:text-red-500 transition-colors">
                          <Heart size={18} />
                        </button>
                        <Link href={"/products"}>
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
                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-lg truncate">
                      {product.title}
                    </h3>
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

                      <div className="flex flex-col items-end">
                        <Rating
                          initialValue={averageRating}
                          readonly={true}
                          size={16}
                          allowFraction={true}
                          SVGstyle={{ display: "inline" }}
                        />
                        <span className="text-[10px] font-semibold text-gray-400">
                          ({totalReviews} reviews)
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <button
                        onClick={() => handleAdd(product)}
                        className="bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 transition-colors w-full"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-10 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800 gap-4">
            <div className="flex items-center gap-2">
              <button className="p-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                <ChevronLeft size={18} />
              </button>
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  className={`w-10 h-10 rounded-lg border transition-all ${num === 1 ? "bg-indigo-600 text-white border-indigo-600" : "hover:bg-gray-50 dark:hover:bg-zinc-800"}`}
                >
                  {num}
                </button>
              ))}
              <button className="p-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Showing <span className=" dark:text-white">1 to 20</span> of 99
              products
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Shop;
