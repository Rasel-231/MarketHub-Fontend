"use client"
import MinHeader from "../../common/MinHeader/MinHeader";
import BestSellingProduct from "./BestSellingProduct";




const BestSelling = () => {
    return (
        <div>  
             <MinHeader/>
            <section className="flex justify-between ">
                
                <span className="font-extrabold text-2xl ml-5">Best Selling Products</span>
                <button className="bg-red-500 p-1 px-2 mr-5 w-22  text-white">View all</button>
            </section>
            <section>
                <BestSellingProduct/>
            </section>
        </div>
    );
};

export default BestSelling;