"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Product } from "../FlashSale/Types";

const WishList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-semibold text-black">Wishlist ({products.length})</h1>
        <button className="px-6 py-3 border border-gray-300 rounded-sm font-medium hover:bg-gray-100 transition">
          Move All To Bag
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((item) => (
          <div key={item.id} className="group relative border rounded-md overflow-hidden bg-white shadow-sm flex flex-col">
            
            {/* Image Section */}
            <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
              {/* Discount Badge */}
              {item.discount && (
                <span className="absolute top-3 left-3 bg-[#DB4444] text-white text-xs px-3 py-1 rounded-sm z-10">
                  -{item.discount}
                </span>
              )}

              {/* Product Image - Now Full and Covered */}
              <Image 
                src={item.images[0]} 
                alt={item.name} 
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Delete Button */}
              <button 
                onClick={() => handleDelete(item.id)}
                className="absolute top-3 right-3 p-2 bg-white rounded-full hover:text-red-500 transition shadow-sm z-10"
              >
                <Trash2 size={18} />
              </button>

              {/* Add To Cart - Always Visible */}
              <button className="absolute bottom-0 w-full bg-black text-white py-2.5 flex items-center justify-center gap-2 transition-colors hover:bg-gray-800">
                <ShoppingCart size={18} />
                <span className="text-sm font-medium">Add To Cart</span>
              </button>
            </div>

            {/* Content Section */}
            <div className="p-4 space-y-2 flex-grow">
              <h2 className="font-bold text-gray-800 truncate text-base">{item.name}</h2>
              <div className="flex items-center gap-3">
                <span className="text-[#DB4444] font-bold">${item.discountPrice}</span>
                <span className="text-gray-400 line-through text-sm">${item.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;