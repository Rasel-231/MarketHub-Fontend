"use client"
import AdminSidebar from "@/components/modules/components/Admin/AdminSidebar/AdminSidebar";
import AdminNavber from "@/components/shared/AdminNavber";
import { useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <AdminNavber onToggle={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      
      <div className="flex">
        <AdminSidebar isOpen={isOpen} />
        <main className={`flex-1 p-6 mt-16 transition-all duration-300 
          ${isOpen ? "lg:ml-64" : "lg:ml-20"}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
