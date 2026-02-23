"use client"

import { MoveLeft, MoveRight } from "lucide-react";
import MinHeader from "@/components/shared/MinHeader";
import ExploreProductsCard from "./ExploreProductsCard";

const ExploreProducts = () => {
    return (
       <div className="container mx-auto  m-5 p-5">  
             <MinHeader title="Our Products"/>
            <section className="flex justify-between py-5">
                
                <span className="text-2xl font-extrabold uppercase tracking-wider">Explore Our Products</span>
               
                <span className="flex gap-2 "><MoveLeft className="w-10 h-10 bg-gray-200 p-2 rounded-full"/><MoveRight className="rounded-full w-10 h-10 bg-gray-200 p-2"/></span>
            </section>
            <section>
                <ExploreProductsCard/>
            </section>
        </div>
    );
};

export default ExploreProducts;