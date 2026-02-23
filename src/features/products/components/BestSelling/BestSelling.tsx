"use client"
import { useState } from "react";
import MinHeader from "@/components/shared/MinHeader";
import BestSellingProduct from "./BestSellingProduct";

const BestSelling = () => {
    const [showAll,setShowAll]=useState(false)
    return (
        <div className="mx-auto container ">  
             <MinHeader title="This Month"/>
            <section className="flex justify-between items-center my-5">            
                <span className="text-2xl font-extrabold uppercase tracking-wider">Best Selling Products</span>
                <button onClick={()=>setShowAll(!showAll)} className="bg-red-500  w-32 h-full p-2  text-white cursor-pointer">{showAll ? "View Less":"View all"}</button>
            </section>
            <section>
                <BestSellingProduct showAll={showAll}/>
            </section>
        </div>
    );
};

export default BestSelling;