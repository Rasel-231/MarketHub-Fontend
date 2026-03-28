import Footer3 from '@/components/shared/PublicFooter';
import PublicNavbar from '@/components/shared/PublicNavbar';
import Assistant from '@/features/products/components/Avater/Avater';
import React from 'react';

const shopLayout = ({ children }: { children: React.ReactNode }) => {
    return (
         <>
      <PublicNavbar />
      <div className="container mx-auto px-4 md:px-10">
      
          {children}
          <Assistant/>
       
      </div>
      <Footer3 />
    </>
    );
};

export default shopLayout;