"use client";

import { Check, Headphones, Truck } from "lucide-react";

const Services = () => {
  return (
    <div className="container mx-auto p-5 pb-10">
      <div className="grid grid-cols-3 gap-4 md:gap-12">
        
        <div className="flex flex-col items-center text-center group">
          <div className="bg-gray-200 p-4 rounded-full mb-6 group-hover:bg-black group-hover:text-white transition-all duration-300">
            <div className="bg-black text-white p-3 rounded-full group-hover:bg-gray-800">
              <Truck size={32} />
            </div>
          </div>
          <h3 className="font-bold md:font-extrabold  text-md md:text-lg uppercase tracking-wider">
            FREE AND FAST DELIVERY
          </h3>
          <p className="text-sm text-gray-600 mt-2 font-medium">
            Free Delivery for all orders over $140
          </p>
        </div>

        <div className="flex flex-col items-center text-center group">
          <div className="bg-gray-200 p-4 rounded-full mb-6 group-hover:bg-black group-hover:text-white transition-all duration-300">
            <div className="bg-black text-white p-3 rounded-full group-hover:bg-gray-800">
              <Headphones size={32} />
            </div>
          </div>
          <h3 className="font-bold md:font-extrabold  text-md md:text-lg uppercase tracking-wider">
            24/7 CUSTOMER SERVICE
          </h3>
          <p className="text-sm text-gray-600 mt-2 font-medium">
            Friendly 24/7 customer support
          </p>
        </div>

        <div className="flex flex-col items-center text-center group">
          <div className="bg-gray-200 p-4 rounded-full mb-6 group-hover:bg-black group-hover:text-white transition-all duration-300">
            <div className="bg-black text-white p-3 rounded-full group-hover:bg-gray-800">
              <Check size={32} />
            </div>
          </div>
          <h3 className="font-bold md:font-extrabold  text-md md:text-lg uppercase tracking-wider">
            MONEY BACK GUARANTEE
          </h3>
          <p className="text-sm text-gray-600 mt-2 font-medium">
            We return money within 30 days
          </p>
        </div>

      </div>
    </div>
  );
};

export default Services;