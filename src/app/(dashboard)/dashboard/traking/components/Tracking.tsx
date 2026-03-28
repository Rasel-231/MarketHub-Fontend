"use client";

import React, { useState, useEffect } from 'react';
import { Package, CheckCircle2, Circle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { useGetOrderQuery, useUpdateOrderMutation } from '@/store/api/orderApi/orderApi';
import { IErrorResponse, IOrder, TOrderStatus } from '@/types/types';
import { socket } from '@/socket.io/socket/socket.io';
import CustomSpinner from '@/components/shared/CustomSpinner';

const Tracking = () => {
  const { data: orderResponse, isLoading } = useGetOrderQuery(undefined);
  const [updateOrder] = useUpdateOrderMutation();
  const orders = (orderResponse?.data as IOrder[]) || [];

  const [userToggled, setUserToggled] = useState<Record<string, boolean>>({});
  const [riderData, setRiderData] = useState<Record<string, { name: string; phone: string }>>({});

  useEffect(() => {
    if (!socket.connected) socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  const trackingSteps: TOrderStatus[] = [
    'PENDING', 'ORDER_RECEIVED', 'ORDER_PACKED', 'SENT_TO_WAREHOUSE', 
    'RECEIVED_AT_WAREHOUSE', 'SENT_TO_DESTINATION', 'DESTINATION_RECEIVED', 
    'RIDER_ASSIGNED', 'OUT_FOR_DELIVERY', 'DELIVERED'
  ];

  const handleUpdateStatus = async (orderId: string, newStatus: TOrderStatus) => {
    try {
      const info = riderData[orderId] || {};
      
      if (newStatus === 'RIDER_ASSIGNED' && (!info.name || !info.phone)) {
        return toast.warning("রাইডার তথ্য দিন");
      }

      await updateOrder({ 
        id: orderId, 
        data: { 
          status: newStatus, 
          riderName: info.name, 
          riderPhone: info.phone 
        } 
      }).unwrap();

      if (newStatus === 'RIDER_ASSIGNED' || newStatus === 'OUT_FOR_DELIVERY') {
        socket.emit('start_delivery', orderId);
      }
      
      toast.success(`অবস্থা এখন: ${newStatus.replace(/_/g, ' ')}`);
    } catch (err) {
      const error = err as IErrorResponse;
      toast.error(error?.data?.message || "Update failed");
    }
  };

  if (isLoading) return <div className="flex h-screen items-center justify-center"><CustomSpinner/></div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 text-gray-800">
        <Package className="text-blue-600" /> অর্ডার ট্র্যাকিং
      </h2>

      <div className="grid gap-8">
        {orders.map((order: IOrder) => {
          const currentStatusIndex = trackingSteps.indexOf(order.status);
          const isExpanded = userToggled[order.id] ?? order.status === 'PENDING';

          return (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div 
                onClick={() => setUserToggled(prev => ({...prev, [order.id]: !isExpanded}))}
                className={`p-6 cursor-pointer flex justify-between items-center ${isExpanded ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
              >
                <div className="flex gap-10 items-center">
                  <div>
                    <p className="text-[10px] text-gray-400 font-mono uppercase">ORDER_ID: {order.id.slice(-8)}</p>
                    <h3 className="font-bold text-xl text-gray-900">{order.user?.name || "কাস্টমার"}</h3>
                    <p className="text-blue-600 font-bold text-lg mt-1">৳{order.totalAmount}</p>
                  </div>
                  
                  <div className="mt-2 space-y-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block ${
                      order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' : order.status === 'CANCELLED' ? 'bg-red-200 text-red-600' : 'bg-yellow-200 text-yellow-600'
                    }`}>
                      {order.status.replace(/_/g, ' ')}
                    </span>

                    {(order.status === 'RIDER_ASSIGNED' || order.status === 'OUT_FOR_DELIVERY') && (
                      <div className="flex items-center gap-2 text-orange-500 animate-pulse text-xs font-bold">
                        <div className="w-2 h-2 bg-orange-500 rounded-full" /> লাইভ ট্র্যাকিং চালু
                      </div>
                    )}
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: "auto", opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-gray-50 overflow-hidden"
                  >
                    <div className="p-8">
                      <div className="relative flex flex-col">
                        {trackingSteps.map((step, index) => {
                          const isCompleted = index <= currentStatusIndex;
                          const isNextStep = index === currentStatusIndex + 1;
                          const isLast = index === trackingSteps.length - 1;

                          return (
                            <div key={step} className="relative flex gap-6 pb-10 last:pb-0">
                              {!isLast && (
                                <div className="absolute left-[13px] top-8 h-full w-[3px] bg-gray-100">
                                  <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: isCompleted && index < currentStatusIndex ? "100%" : "0%" }}
                                    className="w-full bg-green-500"
                                    transition={{ duration: 0.5 }}
                                  />
                                </div>
                              )}

                              <div className="relative z-10 bg-white">
                                {isCompleted ? (
                                  <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center ring-4 ring-green-50">
                                    <CheckCircle2 className="text-white" size={16} />
                                  </div>
                                ) : (
                                  <div className="w-7 h-7 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center">
                                    <Circle className="text-gray-200" size={14} />
                                  </div>
                                )}
                              </div>

                              <div className="flex-1 flex justify-between items-start">
                                <div>
                                  <p className={`text-sm font-bold ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                                    {step.replace(/_/g, ' ')}
                                  </p>
                                  {isCompleted && (
                                    <p className="text-[10px] text-gray-500">
                                      {new Date(order.updatedAt).toLocaleString()}
                                    </p>
                                  )}
                                </div>

                                {isNextStep && order.status !== 'CANCELLED' && (
                                  <div className="flex items-center gap-3">
                                    {step === 'RIDER_ASSIGNED' && (
                                      <div className="flex gap-2">
                                        <input 
                                          placeholder="নাম" 
                                          className="text-[10px] border p-1 rounded w-20 outline-none" 
                                          onChange={(e) => setRiderData(prev => ({...prev, [order.id]: {...prev[order.id], name: e.target.value}}))}
                                        />
                                        <input 
                                          placeholder="ফোন" 
                                          className="text-[10px] border p-1 rounded w-20 outline-none" 
                                          onChange={(e) => setRiderData(prev => ({...prev, [order.id]: {...prev[order.id], phone: e.target.value}}))}
                                        />
                                      </div>
                                    )}
                                    <button 
                                      onClick={() => handleUpdateStatus(order.id, step)}
                                      className="px-2 py-1 bg-blue-600 text-white text-[10px] rounded shadow-sm hover:bg-blue-700"
                                    >
                                      Approve
                                    </button>
                                    <button 
                                      onClick={() => handleUpdateStatus(order.id, 'CANCELLED')}
                                      className="px-2 py-1 bg-red-500 text-white text-[10px] rounded shadow-sm hover:bg-red-600"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tracking;