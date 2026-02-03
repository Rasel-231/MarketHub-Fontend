"use client"
import MinHeader from "../../common/MinHeader/MinHeader";
import BestSellingProduct from "./BestSellingProduct";




const BestSelling = () => {
    return (
        <div className="mx-auto container  p-5 ">  
             <MinHeader/>
            <section className="flex justify-between my-5">            
                <span className="text-2xl font-extrabold uppercase tracking-wider">Best Selling Products</span>
                <button className="bg-red-500 p-1 px-2 mr-5 w-22  text-white">View all</button>
            </section>
            <section>
                <BestSellingProduct/>
            </section>
        </div>
    );
};

export default BestSelling;