"use client";

import BreadCumb from "../../common/BreadCumb/BreadCumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CartDetails = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-black">
    
      <section className="mb-10">
        <BreadCumb />
      </section>

   
      <section className="mb-6 border rounded-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[300px] py-4">Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="hover:bg-transparent">
              <TableCell className="font-medium flex items-center gap-4 py-6">
                <div className="w-12 h-12 bg-gray-100 rounded"></div> {/* প্রোডাক্ট ইমেজ */}
                <span>LCD Monitor</span>
              </TableCell>
              <TableCell>$650</TableCell>
              <TableCell>
                <input 
                  type="number" 
                  defaultValue={1} 
                  className="w-16 border rounded p-1 outline-none"
                  min="1"
                />
              </TableCell>
              <TableCell className="text-right font-medium">$650</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

     
      <section className="flex justify-between mb-12">
        <button className="px-10 py-3 border border-gray-300 rounded-sm hover:bg-gray-50 transition">
          Return to Shop
        </button>
        <button className="px-10 py-3 border border-gray-300 rounded-sm hover:bg-gray-50 transition">
          Update Cart
        </button>
      </section>

     
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
        
          <div className="lg:col-span-7 flex flex-wrap gap-4 items-start">
            <input 
              type="text" 
              className="border border-black px-6 py-3 rounded-sm min-w-[250px] outline-none" 
              placeholder="Coupon Code"
            />
            <button className="bg-red-500 hover:bg-red-600 text-white px-10 py-3 rounded-sm transition">
              Apply Coupon
            </button>
          </div>

        
          <div className="lg:col-span-5 border-2 border-black rounded-md p-6">
            <h1 className="text-xl font-bold mb-6">Cart Total</h1>
            
            <div className="space-y-4">
              <div className="flex justify-between pb-3 border-b">
                <p>Subtotal:</p>
                <p>$1750</p>
              </div>
              
              <div className="flex justify-between pb-3 border-b">
                <p>Shipping:</p>
                <p>Free</p>
              </div>
              
              <div className="flex justify-between pt-2 text-lg font-bold">
                <p>Total:</p>
                <p>$1750</p>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button className="bg-red-500 hover:bg-red-600 text-white w-full py-4 rounded-sm font-medium transition active:scale-95">
                Process To Checkout
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default CartDetails;