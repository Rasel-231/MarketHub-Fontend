"use client";

import { ITimer } from "@/types/types";
import { useState, useEffect } from "react";



const TimeCounter = ({ deadline }: ITimer) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(deadline).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  const formatTime = (time: number) => (time < 10 ? `0${time}` : time);

  const circleStyle = "bg-white text-black rounded-full h-16 w-16 flex flex-col items-center justify-center shadow-lg transition-transform hover:scale-110";

  return (
    <div className="flex gap-4">
      <div className={circleStyle}>
        <span className="text-lg font-bold">{formatTime(timeLeft.days)}</span>
        <span className="text-[10px] uppercase">Days</span>
      </div>
      <div className={circleStyle}>
        <span className="text-lg font-bold">{formatTime(timeLeft.hours)}</span>
        <span className="text-[10px] uppercase">Hours</span>
      </div>
      <div className={circleStyle}>
        <span className="text-lg font-bold">{formatTime(timeLeft.minutes)}</span>
        <span className="text-[10px] uppercase">Mins</span>
      </div>
      <div className={circleStyle}>
        <span className="text-lg font-bold">{formatTime(timeLeft.seconds)}</span>
        <span className="text-[10px] uppercase">Secs</span>
      </div>
    </div>
  );
};

export default TimeCounter;