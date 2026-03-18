"use client";

import { MoveLeft, MoveRight } from "lucide-react";
import React from "react";
import { PaginationProps } from "../Types/Shop.types";



const ShopPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}: PaginationProps) => {
  
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-8 border-t border-gray-200 mt-6">
      
    
      

      <div className="flex items-center gap-3">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-gray-700 hover:text-blue-600 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <MoveLeft size={18} />
          <span className="inline">PREV</span>
        </button>
        <div className="flex items-center gap-1.5">
          {getPageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {typeof page === "number" ? (
                <button
                  onClick={() => onPageChange(page)}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg text-xs font-black transition-all shadow-sm border ${
                    currentPage === page
                      ? "bg-black text-white border-black scale-105"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {page}
                </button>
              ) : (
                <span className="px-1 text-gray-400 font-bold tracking-widest">{page}</span>
              )}
            </React.Fragment>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-gray-700 hover:text-blue-600 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <span className="inline">NEXT</span>
          <MoveRight size={18} />
        </button>

      </div>
      <div className="text-sm font-semibold text-gray-500">
        Showing <span className="text-black">{Math.min(itemsPerPage * currentPage, totalItems)}</span> of <span className="text-black">{totalItems}</span> Products
      </div>
    </div>
  );
};

export default ShopPagination;