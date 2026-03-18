"use client";
import { useState, useEffect, useCallback } from "react";

const FlashSaleTimer = ({ endTime }: { endTime: string }) => {
  // ১. ব্যাকএন্ডের ISO স্ট্রিং থেকে সময় ক্যালকুলেট করার ফাংশন
  const calculateTime = useCallback(() => {
    const target = new Date(endTime).getTime();
    const now = new Date().getTime();
    const gap = target - now;

    if (gap <= 0) return null;

    // দিন, ঘণ্টা, মিনিট ও সেকেন্ড বের করা
    const d = Math.floor(gap / (1000 * 60 * 60 * 24));
    const h = Math.floor((gap / (1000 * 60 * 60)) % 24);
    const m = Math.floor((gap / 1000 / 60) % 60);
    const s = Math.floor((gap / 1000) % 60);

    return {
      days: String(d).padStart(2, "0"),
      hours: String(h).padStart(2, "0"),
      minutes: String(m).padStart(2, "0"),
      seconds: String(s).padStart(2, "0"),
    };
  }, [endTime]);

  const [timeLeft, setTimeLeft] = useState(calculateTime());

  useEffect(() => {
    // ২. প্রতি ১ সেকেন্ডে টাইমার আপডেট হবে
    const timer = setInterval(() => {
      const result = calculateTime();
      setTimeLeft(result);
      if (!result) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTime]);

  // যদি সেল শেষ হয়ে যায় (ব্যাকএন্ডের ডেট অনুযায়ী)
  if (!timeLeft) {
    return <div className="text-red-600 font-black uppercase text-sm">Sale Ended</div>;
  }

  return (
    <div className="flex items-center gap-4 sm:gap-6">
      {/* Days */}
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase mb-1 text-gray-500">Days</span>
        <span className="text-xl md:text-2xl font-extrabold leading-none">{timeLeft.days}</span>
      </div>
      <span className="text-2xl font-extrabold text-red-600 self-end mb-1">:</span>

      {/* Hours */}
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase mb-1 text-gray-500">Hours</span>
        <span className="text-xl md:text-2xl font-extrabold leading-none">{timeLeft.hours}</span>
      </div>
      <span className="text-2xl font-extrabold text-red-600 self-end mb-1">:</span>

      {/* Minutes */}
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase mb-1 text-gray-500">Mins</span>
        <span className="text-xl md:text-2xl font-extrabold leading-none">{timeLeft.minutes}</span>
      </div>
      <span className="text-2xl font-bold text-red-600 self-end mb-1">:</span>

      {/* Seconds */}
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase mb-1 text-gray-500">Secs</span>
        <span className="text-xl md:text-2xl font-extrabold leading-none text-red-600">
          {timeLeft.seconds}
        </span>
      </div>
    </div>
  );
};

export default FlashSaleTimer;