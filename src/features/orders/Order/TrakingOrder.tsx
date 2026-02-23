"use client";

import React from 'react';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  Store, 
  MapPin, 
  CircleCheck,
} from 'lucide-react';
import { useParams } from 'next/navigation';

import { IOrder } from '@/types/types';
import { useGetSingleOrderQuery } from '@/store/api/orderApi/orderApi';
import CustomSpinner from '@/components/shared/CustomSpinner';

const orderStages = [
  { title: "Order Confirmed", description: "Your order has been confirmed.", icon: CheckCircle2, statusKey: "CONFIRMED" },
  { title: "Order Packed", description: "The items are being packed for delivery.", icon: Package, statusKey: "PACKED" },
  { title: "Out Store", description: "Your order has left our main warehouse.", icon: Store, statusKey: "OUT_STORE" },
  { title: "On the Way", description: "The courier is on the way to your destination.", icon: Truck, statusKey: "ON_THE_WAY" },
  { title: "Store Received", description: "Your local country/city store received it.", icon: MapPin, statusKey: "STORE_RECEIVED" },
  { title: "Delivered", description: "Order has been successfully delivered.", icon: CircleCheck, statusKey: "DELIVERED" }
];

const TrakingOrder = () => {
  const params = useParams();
  const id = params?.id as string;
  
  const { data: orderResponse, isLoading, isError } = useGetSingleOrderQuery(id || "", {
    skip: !id,
  });

  const order = orderResponse?.data as IOrder;;
  const currentStatus = order?.status|| "PENDING";
  const activeStepIndex = orderStages.findIndex(s => s.statusKey === currentStatus);

  if (isLoading) return <div className="p-10 text-center font-nunito animate-pulse"><CustomSpinner/></div>;
  if (isError || !order) return <div className="p-10 text-center text-red-500 font-nunito">Order not found for ID: {id}</div>;

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-lg mx-auto font-nunito">
      <div className="flex justify-between mb-8 border-b pb-4">
        <div>
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Estimated Time</p>
          <p className="text-sm font-black text-gray-800">30 Minutes</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Order Number</p>
          <p className="text-sm font-black text-gray-800">#{order.id.slice(0, 6).toUpperCase()}</p>
        </div>
      </div>

      <div className="relative">
        {orderStages.map((stage, index) => {
          const isCompleted = index < activeStepIndex;
          const isActive = index === activeStepIndex;
          const Icon = stage.icon;

          return (
            <div key={index} className="flex group last:mb-0 mb-1">
              <div className="flex flex-col items-center mr-6">
                <div className={`relative flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-500 ${
                  isCompleted || isActive 
                    ? "bg-red-500 border-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" 
                    : "bg-white border-gray-200"
                }`}>
                  {(isCompleted || isActive) && <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
                </div>
                
                {index !== orderStages.length - 1 && (
                  <div className={`w-[2px] h-20 my-1 rounded-full transition-all duration-700 ${
                    index < activeStepIndex ? "bg-green-500" : "bg-gray-100"
                  }`} />
                )}
              </div>

              {/* কন্টেন্ট এবং আইকন */}
              <div className="flex items-start gap-4 pb-10">
                <div className={`p-3 rounded-2xl transition-colors ${
                  isActive ? "bg-blue-50 text-blue-600" : (isCompleted ? "bg-gray-50 text-gray-700" : "bg-transparent text-gray-300")
                }`}>
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                
                <div className="flex flex-col justify-center h-[48px]">
                  <h3 className={`font-bold text-base transition-colors ${
                    isActive ? "text-blue-900" : (isCompleted ? "text-gray-800" : "text-gray-400")
                  }`}>
                    {stage.title}
                  </h3>
                  <p className={`text-[11px] leading-tight ${
                    isActive ? "text-gray-600" : "text-gray-400"
                  }`}>
                    {stage.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrakingOrder;