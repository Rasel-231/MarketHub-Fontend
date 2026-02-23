"use client"
import { CheckCircle2, ShoppingBag, Home } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const SuccessContent = () => {
    const searchParams = useSearchParams();
    const tranId = searchParams.get("tranId");

    return (
        <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full text-center border border-slate-100">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-extrabold text-slate-800 mb-2">পেমেন্ট সফল!</h1>
            <p className="text-slate-500 mb-8">আপনার অর্ডারটি কনফার্ম করা হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
            
            <div className="bg-slate-50 border border-dashed border-slate-200 p-4 rounded-xl mb-8 text-left">
                <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1 font-bold">Transaction ID</p>
                <p className="font-mono font-bold text-slate-700 break-all text-sm">{tranId || "N/A"}</p>
            </div>

            <div className="flex flex-col gap-4">
                <Link href="/orders" className="flex items-center justify-center gap-2 bg-green-600 text-white py-3.5 rounded-xl font-semibold hover:bg-green-700 transition shadow-lg shadow-green-100">
                    <ShoppingBag className="w-5 h-5" /> অর্ডার ট্র্যাক করুন
                </Link>
                <Link href="/" className="flex items-center justify-center gap-2 text-slate-500 hover:text-slate-800 font-medium transition pt-2">
                    <Home className="w-4 h-4" /> হোম পেজে ফিরে যান
                </Link>
            </div>
        </div>
    );
}


export default function PaymentSuccess() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
            <Suspense fallback={<p className="text-slate-500">Loading...</p>}>
                <SuccessContent />
            </Suspense>
        </div>
    );
};