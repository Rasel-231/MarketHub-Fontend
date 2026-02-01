"use client"

import { MoveLeft, MoveRight } from "lucide-react";
import MinHeader from "../../common/MinHeader/MinHeader";
import ProductCard from "./ProductCard";

const TodaysProduct = () => {
    return (
        <div>  
             <MinHeader/>
            <section className="flex justify-between">
                <span className="flex justify-between gap-2 font-bold mx-5">
                <span>Flash Sales</span>
                <span>03:23:19:56</span>
                </span>
                <span className="flex gap-2"><MoveLeft className="rounded-md"/><MoveRight className="rounded-md"/></span>
            </section>
            <section>
                <ProductCard/>
            </section>
        </div>
    );
};

export default TodaysProduct;