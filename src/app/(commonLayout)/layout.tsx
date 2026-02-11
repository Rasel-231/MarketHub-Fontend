
import Footer3 from "@/components/shared/PublicFooter";
import PublicNavbar from "@/components/shared/PublicNavbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PublicNavbar />
      <div className="container mx-auto px-4 md:px-10">
      
          {children}
       
      </div>
      <Footer3 />
    </>
  );
};

export default CommonLayout;
