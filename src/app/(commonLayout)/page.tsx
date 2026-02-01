
import BestSelling from "@/components/modules/components/BestSelling/BestSelling";
import BrowseByCategory from "@/components/modules/components/BrowseByCategory/BrowseByCategory";
import TodaysProduct from "@/components/modules/components/TodaysProduct/TodaysProduct";
import HomeCarousel from "@/components/modules/Home/Carousel";
import HeroSection from "@/components/modules/Home/Hero";
import Footer3 from "@/components/shared/PublicFooter";



export default function Home() {
  return (
    <div>
      <HeroSection/>
      <HomeCarousel/>
      <TodaysProduct/>
      <BrowseByCategory/>
      <BestSelling/>
      <Footer3/>
    </div>
  );
}
