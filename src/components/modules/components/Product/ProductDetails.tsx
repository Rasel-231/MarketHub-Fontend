import BreadCumb from "../../common/BreadCumb/BreadCumb";
import MinHeader from "../../common/MinHeader/MinHeader";
import ProductCard from "../TodaysProduct/ProductCard";
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
