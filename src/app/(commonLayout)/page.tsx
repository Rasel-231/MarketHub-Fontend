
import Banner from "@/components/modules/components/Banner/Banner";
import BestSelling from "@/components/modules/components/BestSelling/BestSelling";
import BrowseByCategory from "@/components/modules/components/BrowseByCategory/BrowseByCategory";
import ExploreProducts from "@/components/modules/components/ExploreProducts/ExploreProducts";
import Featured from "@/components/modules/components/Featured/Featured";
import ReactOrbit from "@/components/modules/components/ReactOrbit/ReactOrbit";
import Services from "@/components/modules/components/Services/Services";
import TodaysProduct from "@/components/modules/components/TodaysProduct/TodaysProduct";
import HomeCarousel from "@/components/modules/Home/Carousel";
import HeroSection from "@/components/modules/Home/Hero";




export default function Home() {
  return (
    <div className="container mx-auto px-4 md:px-10 py-5  ">
      <HeroSection/>
      <HomeCarousel/>
      <TodaysProduct/>
      <BrowseByCategory/>
      <BestSelling/>
      <Banner/>
      <ExploreProducts/>
      <Featured/>
      <ReactOrbit/>
      <Services/>
     
    </div>
  );
}
