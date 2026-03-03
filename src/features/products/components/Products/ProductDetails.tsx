import BreadCumb from "@/components/shared/BreadCumb";
import MinHeader from "@/components/shared/MinHeader";
import ProductCard from "../FlashSale/ProductCard";
import Product from "./Product";

const ProductDetails = () => {
  return (
    <div>
      <BreadCumb />
      <Product />
      <div>
        <div className="my-5">
          <MinHeader title="Just for you"/>
        </div>
        <div>
          <ProductCard />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
