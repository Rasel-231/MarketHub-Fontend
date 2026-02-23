"use client"


import { AlertCircle } from "lucide-react";
import Link from "next/link";

export const PaymentCancel = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                <AlertCircle className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-800 mb-2">পেমেন্ট বাতিল হয়েছে</h1>
                <p className="text-gray-600 mb-6">আপনি পেমেন্ট প্রক্রিয়াটি বাতিল করেছেন। আপনি যদি অর্ডারটি দিতে চান, তবে পুনরায় পেমেন্ট করুন।</p>

                <div className="flex flex-col gap-3">
                    <Link href={"/cart"} className="bg-yellow-600 text-white py-3 rounded-lg font-semibold hover:bg-yellow-700 transition">কার্টে ফিরে যান</Link>
                    <Link href={"/"} className="text-gray-600 hover:underline">অন্যান্য প্রোডাক্ট দেখুন</Link>
                </div>
            </div>
        </div>
    );
};