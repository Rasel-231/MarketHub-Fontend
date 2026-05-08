import React from "react";
import {
  BarChart3,
  DollarSign,
  RotateCcw,
  CalendarDays,
  TrendingUp,
  BarChart,
  Wallet,
 
  ShoppingCart,
} from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    { id: 1, icon: <BarChart3 size={24} />, label: "Total Sales", color: "from-blue-600 to-blue-700", value: "1,250" },
    { id: 2, icon: <DollarSign size={24} />, label: "Total Revenue", color: "from-emerald-600 to-emerald-700", value: "$45,200" },
    { id: 3, icon: <RotateCcw size={24} />, label: "Total Refunds", color: "from-rose-600 to-rose-700", value: "$1,120" },
    { id: 4, icon: <CalendarDays size={24} />, label: "Daily Sales", color: "from-orange-500 to-orange-600", value: "48" },
    { id: 5, icon: <TrendingUp size={24} />, label: "Daily Revenue", color: "from-purple-600 to-purple-700", value: "$2,400" },
    { id: 6, icon: <BarChart size={24} />, label: "Monthly Sales", color: "from-pink-600 to-pink-700", value: "890" },
    { id: 7, icon: <Wallet size={24} />, label: "Monthly Revenue", color: "from-indigo-600 to-indigo-700", value: "$28,500" },
 { id: 8, icon: <ShoppingCart size={24} />, label: "Daily Orders", color: "from-cyan-600 to-cyan-700", value: "120" },
 
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6  bg-base-200  font-nunito">
      {stats.map((item) => (
        <div
          key={item.id}
          className={`relative overflow-hidden group flex border border-red-800 items-center p-5 h-32 rounded-2xl shadow-lg bg-gradient-to-br ${item.color} text-white transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-white/10`}
        >
          {/* Icon Box - Centered vertically with text */}
          <div className="z-10 flex-shrink-0 p-3 bg-white/15 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center">
            {item.icon}
          </div>

          {/* Text Content - Vertical Alignment Fixed */}
          <div className="z-10 ml-4 flex flex-col justify-center h-full">
            <span className="text-[10px] font-bold opacity-80 uppercase tracking-widest leading-none mb-1">
              {item.label}
            </span>
            <span className="text-2xl font-extrabold leading-none tabular-nums tracking-tight">
              {item.value}
            </span>
          </div>

          {/* Background Decorative Circle */}
          <div className="absolute -right-3 -top-3 w-16 h-16 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-all"></div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;