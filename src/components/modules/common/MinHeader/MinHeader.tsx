"use client"

import { Tally1 } from "lucide-react";

const MinHeader = () => {
    return (
        <div className="flex items-center px-2 py-2 my-4">
            {/* The Icon Container */}
            <div className="text-rose-600">
                {/* strokeWidth={4} or {5} dile eti bhalo bold hobe */}
                <Tally1 
                    className="rotate-0" 
                    size={32} 
                    strokeWidth={5} 
                />
            </div>
            
            {/* The Text */}
            <h2 className="text-rose-600 font-bold text-2xl tracking-wide">
                Today&apos;s
            </h2>
        </div>
    );
};

export default MinHeader;