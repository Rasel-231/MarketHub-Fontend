"use client"
import Image from 'next/image';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import CustomSpinner from '@/components/shared/CustomSpinner';
import { useGetSingleOrderQuery } from '@/store/api/orderApi/orderApi';
import DeliveryBoy from "../../../../public/Image/Delivery-cuate.png"

const OrderStatus = () => {
  
    
    const params = useParams();
    const id = params?.id as string;
    const { data:orderResponse,isLoading } = useGetSingleOrderQuery(id);
    const orderData = orderResponse?.data || [];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <CustomSpinner/>
            </div>
        );
    }

    if (!orderData) {
        return (
            <div className="text-center p-10">
                <p className="text-red-500 font-bold">No Order Data Found!</p>
            </div>
        );
    }
    const ordersArray = Array.isArray(orderData) ? orderData : [orderData];

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            { ordersArray.map((order) => (
                <div key={order.id} className="max-w-4xl mx-auto p-4 space-y-8 mb-10">
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative w-64 h-64">
                            <Image
                                src={DeliveryBoy}
                                alt='Delivery Illustration'
                                priority
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h1 className='text-3xl font-bold font-nunito text-gray-800'>Order Status</h1>
                    </div>

          
                    <div className='border rounded-xl shadow-lg bg-white overflow-hidden'>
                        <div className="bg-blue-50 p-4 border-b">
                            <h1 className='font-bold font-nunito text-xl text-gray-800 italic'>Order Summary</h1>
                        </div>

                        <div className='grid grid-cols-1 gap-4 p-6'>
                            <div className="flex justify-between border-b pb-2">
                                <p className="text-gray-500 text-sm">Order ID</p>
                                <p className="font-semibold text-gray-800"> {`O-${order.id.slice(0,6).toUpperCase()}`}</p>
                            </div>
                            
                            <div className="flex justify-between border-b pb-2">
                                <p className="text-gray-500 text-sm">Shipping Address</p>
                                <p className="font-semibold text-gray-800 text-right max-w-[200px]">{order.deliveryAddress}</p>
                            </div>
                            
                            <div className="flex justify-between border-b pb-2">
                                <p className="text-gray-500 text-sm">Delivery Status</p>
                                <span className={`px-2 py-1 rounded text-xs font-bold ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {order.status}
                                </span>
                            </div>

                           
                            <div className="flex justify-between border-b pb-2">
                                <p className="text-gray-500 text-sm">Payment Status</p>
                                <p className="font-semibold text-gray-800">{order.payment?.paymentStatus || 'N/A'}</p>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <p className="text-gray-500 text-sm">Payment Method</p>
                                <p className="font-semibold text-gray-800">{order?.payment?.paymentMethod}</p>
                            </div>
                            
                           

                            <div className="flex justify-between">
                                <p className="text-gray-500 text-sm">Total Amount</p>
                                <p className="font-bold text-green-600 text-lg">৳ {order.totalAmount}</p>
                            </div>
                        </div>

                  
                        <div className="p-6 bg-gray-50 border-t flex flex-col items-center gap-4">
                            <Link href={`/order/traking-order/${order.id}`}>
                            <button className='w-full sm:w-auto rounded-full bg-green-500 hover:bg-green-600 text-white font-bold font-nunito py-3 px-10 shadow-md transition-all active:scale-95'>
                                Track Order
                            </button>
                            </Link>
                            
                            <div className='text-center text-sm text-gray-500'>
                                <p>Need Help? Contact Us at <span className="text-blue-600 font-medium">rasel.byte64@gmail.com</span></p>
                                <p>Hotline: <span className="text-blue-600 font-medium">+8801988446825</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderStatus;
