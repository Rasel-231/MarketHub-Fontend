"use client"

import { Heart } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { Product } from "../TodaysProduct/Types";

const ExploreProductsCard = () => {
    const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);


  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
          >
  
            {/* Image Container */}
            <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
              {/* Icons Overlay: Eti image er upor thakbe */}
              <div className="absolute top-2 left-0 right-0 z-10 flex justify-between items-center px-2">
                {/* Left Side: Discount Badge style */}
                <div className="relative flex items-center justify-center">
                  <div className="w-16 h-7 bg-red-600 flex items-center justify-center text-white text-[10px] font-bold rounded-r-md">{product.discount}</div>
                </div>

                {/* Right Side: Heart Icon */}
                <button className="bg-white p-1.5 rounded-full shadow-sm hover:text-red-500 transition-colors">
                  <Heart size={18} />
                </button>
              </div>

              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Details Container */}
            <div className="p-4 space-y-2">
              <h3 className="font-bold text-lg truncate">{product.name}</h3>

              <div className="flex items-center justify-between ">
               <span className="flex gap-4">
                 <span className="text-xl font-extrabold text-rose-500">
                  ${product.discountPrice}
                </span>
                <span className="text-gray-400 text-xl font-bold line-through">
                    ${product.price}
                </span>
               </span>

                {/* Fixed Rating: JSON rating onujayi star fill thakbe */}
                <div className="flex items-center gap-1">
                  <Rating
                    initialValue={product.rating}
                    readonly={true}
                    size={16}
                    allowFraction={true}
                    SVGclassName="inline-block"
                  />
                  <span className="text-sm font-semibold text-gray-400 ">
                    ({product.totalrating})
                  </span>
                </div>
              </div>

              <p className="text-gray-500 text-sm line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center justify-between mt-4">
                <button className="bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 transition-colors w-full">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    <div className="flex justify-center items-center">
    <button className="w-xs my-5 bg-red-500 text-white p-2 px-6 rounded-none text-xs font-bold">
        View All Products
    </button>
</div>
     </div>
  );
};


export default ExploreProductsCard;