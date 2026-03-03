import Services from "@/components/shared/Services";
import Banner from "@/features/home/components/Banner";
import HomeCarousel from "@/features/home/components/Carousel";
import HeroSection from "@/features/home/components/Hero";
import ReactOrbit from "@/features/home/components/ReactOrbit";
import BestSelling from "@/features/products/components/BestSelling/BestSelling";
import BrowseByCategory from "@/features/products/components/BrowseByCategory/BrowseByCategory";
import ExploreProducts from "@/features/products/components/ExploreProducts/ExploreProducts";
import Featured from "@/features/products/components/Featured/Featured";
import TodaysProduct from "@/features/products/components/FlashSale/TodaysProduct";

export default function ProductHomePages() {
  return (
    <div className="container mx-auto px-4 md:px-10 py-5  ">
      <HeroSection />
      <HomeCarousel />
      <TodaysProduct />
      <BrowseByCategory />
      <BestSelling/>
      <Banner />
      <ExploreProducts/>
      <Featured />
      <ReactOrbit />
      <Services />
    </div>
  );
}
