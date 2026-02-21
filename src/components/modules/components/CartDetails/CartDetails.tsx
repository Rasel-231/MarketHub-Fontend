"use client";

import Link from "next/link";
import BreadCumb from "../../common/BreadCumb/BreadCumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  useGetCartsQuery,  
} from "@/components/Redux/api/cartApi/cartApi";
import Image from "next/image";
import { ICart } from "@/types/types";
import { Trash2, Plus, Minus, Loader2 } from "lucide-react";
import { useAddToCart } from "../Utils/cartFuntionlaity";


const CartDetails = () => {
  const { data: cartResponse, isLoading } = useGetCartsQuery(undefined);
  const {handleDelete,handleQuantity}=useAddToCart()


  const cartData = cartResponse?.data;
  const cartItems = cartData?.items || [];
  const totalAmount = cartData?.totalAmount || 0;



  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="animate-spin text-red-500" size={40} />
          <p className="font-medium text-lg text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-black">
      <section className="mb-10">
        <BreadCumb />
      </section>

      <section className="mb-6 border rounded-sm overflow-hidden bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow className="border-b">
              <TableHead className="w-[350px] py-5 px-6 text-black font-bold">Product</TableHead>
              <TableHead className="text-black font-bold text-center">Price</TableHead>
              <TableHead className="text-black font-bold text-center">Quantity</TableHead>
              <TableHead className="text-black font-bold text-center">Subtotal</TableHead>
              <TableHead className="text-right py-5 px-6 text-black font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems.length > 0 ? (
              cartItems.map((item: ICart) => (
                <TableRow key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <TableCell className="py-6 px-6">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden border flex-shrink-0">
                        {item.product?.images?.[0] ? (
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[10px] text-gray-400 font-bold">
                            NO IMAGE
                          </div>
                        )}
                      </div>
                      <span className="truncate max-w-[200px] font-semibold text-gray-800">
                        {item.product?.title || "Product Name"}
                      </span>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-center text-gray-700 font-medium">
                    ${item.sellingPrice.toFixed(2)}
                  </TableCell>

                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-3 border rounded-md w-fit mx-auto px-2 py-1 bg-white">
                      <button 
                        onClick={() => handleQuantity(item.id!, item.quantity, 'dec')}
                        disabled={item.quantity <= 1}
                        className="p-1 hover:bg-gray-100 rounded-full disabled:opacity-30 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => handleQuantity(item.id!, item.quantity, 'inc')}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </TableCell>

                  <TableCell className="text-center font-bold text-rose-600">
                    ${(item.sellingPrice * item.quantity).toFixed(2)}
                  </TableCell>

                  <TableCell className="text-right px-6">
                    <button 
                      onClick={() => handleDelete(item.id!)}
                     
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all active:scale-90"
                      title="Remove Item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-52 text-center text-gray-400 italic">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-lg">Your cart is currently empty.</p>
                    <Link href="/" className="text-red-500 font-bold hover:underline">Shop Now</Link>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12">
        <div className="lg:col-span-7">
          <Link href="/">
            <button className="px-10 py-3 border-2 border-gray-200 rounded-md hover:bg-black hover:border-black hover:text-white transition-all font-bold uppercase text-sm tracking-wider">
              Return to Shop
            </button>
          </Link>
        </div>

        <div className="lg:col-span-5 border-2 border-black rounded-lg p-8 bg-white shadow-lg">
          <h1 className="text-2xl font-black mb-8 border-b-2 border-gray-100 pb-4">Cart Total</h1>
          <div className="space-y-5">
            <div className="flex justify-between pb-3 border-b border-dashed border-gray-200">
              <p className="text-gray-500 font-medium">Subtotal:</p>
              <p className="font-bold text-lg">${totalAmount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between pb-3 border-b border-dashed border-gray-200">
              <p className="text-gray-500 font-medium">Shipping:</p>
              <p className="font-bold text-green-600 uppercase text-sm">Free</p>
            </div>
            <div className="flex justify-between pt-4 text-2xl font-black text-rose-600">
              <p>Total:</p>
              <p>${totalAmount.toFixed(2)}</p>
            </div>
          </div>
          <Link href="/billing" className="w-full block mt-10">
            <button className="bg-red-500 hover:bg-red-600 text-white w-full py-5 rounded-md font-black transition-all active:scale-[0.98] uppercase tracking-widest shadow-md">
              Process To Checkout
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CartDetails;