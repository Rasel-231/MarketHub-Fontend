"use client";

import React from 'react';
import { 
  CheckCircle2, Truck, Store, MapPin, CircleCheck,
  Box, Navigation, User, Phone, 
} from 'lucide-react';
import { useParams } from 'next/navigation';

import { IOrder } from '@/types/types';
import { useGetSingleOrderQuery } from '@/store/api/orderApi/orderApi';
import CustomSpinner from '@/components/shared/CustomSpinner';
import { useOrderTracking } from '@/socket.io/hooks/useSocket';

const orderStages = [
    { title: "Order Confirmed", description: "Order has been confirmed.", icon: CheckCircle2, statusKey: "CONFIRMED" },
    { title: "Order Packed", description: "Items are being packed.", icon: Box, statusKey: "ORDER_PACKED" },
    { title: "Sent to Warehouse", description: "Order is moving to main warehouse.", icon: Truck, statusKey: "SENT_TO_WAREHOUSE" },
    { title: "Warehouse Received", description: "Received at central warehouse.", icon: Store, statusKey: "RECEIVED_AT_WAREHOUSE" },
    { title: "Sent to Destination", description: "Order is on the way to your city.", icon: Navigation, statusKey: "SENT_TO_DESTINATION" },
    { title: "Destination Received", description: "Reached your local area store.", icon: MapPin, statusKey: "DESTINATION_RECEIVED" },
    { title: "Rider Assigned", description: "A delivery hero is assigned.", icon: User, statusKey: "RIDER_ASSIGNED" },
    { title: "Out for Delivery", description: "Rider is near your location.", icon: Truck, statusKey: "OUT_FOR_DELIVERY" },
    { title: "Delivered", description: "Successfully delivered!", icon: CircleCheck, statusKey: "DELIVERED" }
];

const TrakingOrder = () => {
  const params = useParams();
  const id = params?.id as string;

  const { data: orderResponse, isLoading, isError } = useGetSingleOrderQuery(id || "", {
    skip: !id,
    pollingInterval: 30000,
  });

  const { riderLocation } = useOrderTracking(id);

  const order = orderResponse?.data as IOrder;
  const currentStatus = order?.status || "PENDING";
  const activeStepIndex = orderStages.findIndex(s => s.statusKey === currentStatus);

  // // টাইম ফরম্যাট করার ফাংশন
  // const formatStepTime = (dateString: string) => {
  //   if (!dateString) return "";
  //   return new Date(dateString).toLocaleTimeString([], { 
  //     hour: '2-digit', 
  //     minute: '2-digit',
  //     hour12: true 
  //   });
  // };

  if (isLoading) return <div className="p-10 flex justify-center h-[60vh] items-center"><CustomSpinner/></div>;
  if (isError || !order) return <div className="p-10 text-center text-red-500 font-bold">অর্ডার পাওয়া যায়নি!</div>;

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 max-w-lg mx-auto font-nunito my-10">
      
      <div className="flex justify-between mb-8 border-b pb-4">
        <div>
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Estimated Time</p>
          <p className="text-sm font-black text-gray-800">30-45 Minutes</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Order Number</p>
          <p className="text-sm font-black text-gray-800">#{order?.id?.slice(-6).toUpperCase()}</p>
        </div>
      </div>

      {(order?.riderName || riderLocation) && (
        <div className="mb-8 p-4 bg-blue-50 rounded-2xl border border-blue-100 transition-all duration-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  <User size={20} />
               </div>
               <div>
                  <p className="text-[10px] text-blue-600 font-bold uppercase">Delivery Partner</p>
                  <p className="font-black text-gray-800">{order?.riderName || "Searching..."}</p>
               </div>
            </div>
            {order?.riderPhone && (
              <a href={`tel:${order.riderPhone}`} className="p-2 bg-white rounded-full text-green-600 shadow-sm hover:scale-110 transition-transform">
                <Phone size={18} />
              </a>
            )}
          </div>
          
          {riderLocation && (
             <div className="mt-3 flex items-center gap-2 text-[11px] text-green-600 font-bold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Rider is moving towards you...
             </div>
          )}
        </div>
      )}

      <div className="relative">
        {orderStages.map((stage, index) => {
          const isCompleted = index < activeStepIndex;
          const isActive = index === activeStepIndex;
          const Icon = stage.icon;

          return (
            <div key={index} className="flex mb-2 last:mb-0">
              <div className="flex flex-col items-center mr-6">
                <div className={`relative z-10 flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-500 ${
                  isCompleted || isActive 
                    ? "bg-green-500 border-green-500" 
                    : "bg-white border-gray-200"
                }`}>
                  {(isCompleted || isActive) && <CheckCircle2 className="text-white w-4 h-4" />}
                </div>
                
                {index !== orderStages.length - 1 && (
                  <div className={`w-[2px] h-16 my-1 rounded-full transition-all duration-700 ${
                    index < activeStepIndex ? "bg-green-500" : "bg-gray-100"
                  }`} />
                )}
              </div>

              <div className="flex items-start gap-4 pb-8 w-full">
                <div className={`p-3 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110" 
                    : (isCompleted ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-300")
                }`}>
                  <Icon size={20} />
                </div>
                
                <div className="flex-1 flex justify-between items-start">
                  <div className="flex flex-col justify-center">
                    <h3 className={`font-bold text-sm transition-colors ${
                      isActive ? "text-blue-900" : (isCompleted ? "text-gray-800" : "text-gray-400")
                    }`}>
                      {stage.title}
                    </h3>
                    <p className={`text-[11px] leading-tight transition-colors ${
                      isActive ? "text-gray-600 font-medium" : "text-gray-400"
                    }`}>
                      {stage.description}
                    </p>
                  </div>
                  
                 
                  {(isActive || isCompleted) && (
                    <span className="text-[10px] font-bold text-gray-400 mt-1">
                     {order?.updatedAt ? new Date(order.updatedAt).toLocaleString() : ""}
                    </span>
                  )}
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