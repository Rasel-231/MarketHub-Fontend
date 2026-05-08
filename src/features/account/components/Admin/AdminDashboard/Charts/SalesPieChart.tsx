"use client";

import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  Sector
} from 'recharts';

const data = [
  { name: 'Electronics', value: 450 },
  { name: 'Fashion', value: 300 },
  { name: 'Accessories', value: 250 },
  { name: 'Appliances', value: 200 },
];

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'];

const FullSalesPieChart = () => {
  return (
    <div  className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-[#1f1f1f] mx-2 md:mx-0" >
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white tracking-tight">Market Analytics</h3>
        <p className="text-[10px] text-blue-500 font-black uppercase tracking-[0.2em]">Full Revenue Share</p>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              labelLine={false}
              label={({ percent }) => percent ? `${(percent * 100).toFixed(0)}%` : ''}
              innerRadius={0} 
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              stroke="#0f172a"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  className="hover:opacity-90 transition-all cursor-pointer outline-none"
                />
              ))}
            </Pie>

            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-800 border border-white/10 p-3 rounded-xl shadow-2xl backdrop-blur-md">
                      <p className="text-sm font-bold text-white mb-1">{payload[0].name}</p>
                      <div className="h-[1px] w-full bg-white/10 mb-2" />
                      <p className="text-xs font-medium text-blue-400">
                        Total: <span className="text-white">${payload[0].value}</span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Legend 
              verticalAlign="bottom" 
              iconType="diamond"
              formatter={(value) => (
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider ml-1">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FullSalesPieChart;