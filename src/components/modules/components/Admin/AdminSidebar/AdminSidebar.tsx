"use client"
import Link from "next/link";
import { Home, User, Upload, DollarSign, MessageSquare, Truck, Layers } from "lucide-react";

const AdminSidebar = ({ isOpen }: { isOpen: boolean }) => {
  const items = [
    { name: "Home", icon: <Home size={20}/>, path: "/" },
    { name: "Account", icon: <User size={20}/>, path: "/dashboard/account" },
    { name: "Make Category", icon: <Layers size={20}/>, path: "/dashboard/categories" },
    { name: "Upload Products", icon: <Upload size={20}/>, path: "/dashboard/upload-products" },
    { name: "Total Revenue", icon: <DollarSign size={20}/>, path: "/dashboard/revenue" },
    { name: "Live Chat", icon: <MessageSquare size={20}/>, path: "/dashboard/live-chat" },
    { name: "Order Tracking", icon: <Truck size={20}/>, path: "/dashboard/order-tracking" },
  ];

  return (
    <aside className={`fixed left-0 top-16 h-[calc(100vh-64px)] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 z-40 
      ${isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full lg:w-20 lg:translate-x-0 overflow-hidden"}`}>
      <div className="p-4 space-y-2">
        {items.map((item, index) => (
          <Link key={index} href={item.path} className="flex items-center gap-4 p-3 text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 rounded-lg group transition-all">
            <span className="text-emerald-600">{item.icon}</span>
            <span className={`whitespace-nowrap font-medium transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}>
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default AdminSidebar;
