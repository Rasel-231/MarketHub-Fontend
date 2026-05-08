"use client";

import AdminNavber from '@/components/shared/AdminNavber';
import AdminSidebar from '@/features/account/components/Admin/AdminSidebar/AdminSidebar';
import React, { useState, useEffect } from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
};

export default DashboardLayout;