'use client'

import { XCircle } from "lucide-react";
import Link from "next/link";

export const PaymentFail = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-800 mb-2">পেমেন্ট ব্যর্থ হয়েছে</h1>
                <p className="text-gray-600 mb-6">দুঃখিত, আপনার পেমেন্টটি সম্পন্ন করা যায়নি। আপনার ব্যাংক বা কার্ডে কোনো সমস্যা থাকতে পারে।</p>

                <div className="flex flex-col gap-3">
                    <Link href={"/orders"} className="bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition">আবার চেষ্টা করুন</Link>
                    <Link href={"/"} className="text-gray-600 hover:underline">শপিং চালিয়ে যান</Link>
                </div>
            </div>
        </div>
    );
};