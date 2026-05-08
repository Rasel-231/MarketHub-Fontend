"use client";

import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  Rectangle
} from 'recharts';

// আপনার ডামি ডেটা (অর্ডার বা সেলস ডাটা হতে পারে)
const data = [
  { name: 'Jan', orders: 400 },
  { name: 'Feb', orders: 300 },
  { name: 'Mar', orders: 600 },
  { name: 'Apr', orders: 800 },
  { name: 'May', orders: 500 },
  { name: 'Jun', orders: 900 },
];

const OrderAnalyticsChart = () => {
  return (
    <div className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-[#1f1f1f] mx-2 md:mx-0" >
      <div className="mb-6">
         <h2 className="text-base md:text-lg font-medium mb-4 text-gray-100 text-center md:text-left">
           Order Analytics
         </h2>
        <p className="text-xs text-slate-400">Monthly order growth overview</p>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            {/* ব্যাকগ্রাউন্ড গ্রিড লাইন */}
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
              dy={10}
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
            />

            {/* কাস্টম টুলটিপ ডিজাইন */}
            <Tooltip
              cursor={{ fill: '#ffffff05' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-800 border border-white/10 p-3 rounded-xl shadow-xl">
                      <p className="text-xs text-slate-400 mb-1">{payload[0].payload.name}</p>
                      <p className="text-sm font-bold text-blue-400">
                        Orders: <span className="text-white">{payload[0].value}</span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />

            {/* বার (Bar) ডিজাইন */}
            <Bar 
              dataKey="orders" 
              fill="#3b82f6" 
              radius={[6, 6, 0, 0]} 
              barSize={35}
              activeBar={<Rectangle fill="#60a5fa" stroke="#3b82f6" />}
            >
              {/* প্রতিটি বারের জন্য আলাদা কালার ইফেক্ট (ঐচ্ছিক) */}
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === data.length - 1 ? '#ef4444' : '#3b82f6'} 
                  fillOpacity={0.8}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrderAnalyticsChart;