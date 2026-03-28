// "use client";

// import Image from "next/image";
// import MinHeader from "@/components/shared/MinHeader";
// import { useGetFeaturedProductsQuery } from "@/store/api/flagApi/flagApi";
// import CustomSpinner from "@/components/shared/CustomSpinner";
// import { IFlagResponse } from "@/types/types";

// const Featured = () => {
//   const { data: response, isLoading, isError } = useGetFeaturedProductsQuery(undefined);
//   const rawData = (response as IFlagResponse)?.data?.data;
//   const featuredProducts = Array.isArray(rawData) ? rawData : [];

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <CustomSpinner />
//       </div>
//     );
//   }

//   if (isError || featuredProducts.length === 0) {
//     return (
//       <div className="flex justify-center items-center h-64 text-gray-500">
//         No Feature Products
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-10">
//       <div className="mb-8">
//         <MinHeader title="Featured" />
//         <h2 className="text-xl md:text-2xl font-extrabold uppercase tracking-wider mt-4">
//           Best Choise For You
//         </h2>
//       </div>
      
//       {featuredProducts.map((product) => (
//         <section key={product.id} className="flex flex-col md:flex-row gap-5 h-auto md:h-[600px] mb-10">
         
//           <div className="w-full md:w-1/2 relative bg-zinc-900 rounded-xl overflow-hidden group h-[400px] md:h-full">
//             <Image
//               src={Array.isArray(product.images) ? product.images[0] : product.images || "/placeholder.jpg"}
//               alt={product.title}
//               fill
//               priority
//               sizes="(max-width: 768px) 100vw, 50vw"
//               className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
//             />
//             <div className="absolute bottom-8 left-8 z-10 text-white max-w-[280px]">
//               <h3 className="text-2xl font-bold mb-2">Best Choice for You</h3>
//               <p className="text-sm text-gray-300 mb-4">Explore your buying skill with premium quality.</p>
//               <button className="underline font-bold hover:text-red-500 transition-colors">Shop Now</button>
//             </div>
//           </div>

        
//           <div className="w-full md:w-1/2 flex flex-col gap-5">
//             <div className="h-[280px] md:flex-1 relative bg-zinc-900 rounded-xl overflow-hidden group">
//               <Image
               
//                 src={Array.isArray(product.images) ? product.images[1] || product.images[0] : product.images || "/placeholder.jpg"}
//                 alt={product.title}
//                 fill
//                 sizes="(max-width: 768px) 100vw, 50vw"
//                 className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
//               />
//               <div className="absolute bottom-6 left-6 z-10 text-white max-w-[250px]">
//                 <h3 className="text-xl font-bold mb-1">Best Choice for You</h3>
//                 <p className="text-xs text-gray-300 mb-3">Explore your buying skill with premium quality.</p>
//                 <button className="underline font-bold hover:text-red-500 transition-colors">Shop Now</button>
//               </div>
//             </div>

//             {/* Bottom Two Small Cards */}
//             <div className="flex flex-row gap-5 h-[250px] md:flex-1">
//               <div className="flex-1 relative bg-zinc-900 rounded-xl overflow-hidden group">
//                 <Image
//                   src={Array.isArray(product.images) ? product.images[0] : product.images || "/placeholder.jpg"}
//                   alt={product.title}
//                   fill
//                   sizes="(max-width: 768px) 50vw, 25vw"
//                   className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
//                 />
//                 <div className="absolute bottom-4 left-4 z-10 text-white">
//                   <h3 className="text-lg font-bold">Best Choice</h3>
//                   <button className="underline text-sm font-bold hover:text-red-500">Shop Now</button>
//                 </div>
//               </div>

//               <div className="flex-1 relative bg-zinc-900 rounded-xl overflow-hidden group">
//                 <Image
//                   src={Array.isArray(product.images) ? product.images[0] : product.images || "/placeholder.jpg"}
//                   alt={product.title}
//                   fill
//                   sizes="(max-width: 768px) 50vw, 25vw"
//                   className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
//                 />
//                 <div className="absolute bottom-4 left-4 z-10 text-white">
//                   <h3 className="text-lg font-bold">New Airpots</h3>
//                   <button className="underline text-sm font-bold hover:text-red-500">Shop Now</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       ))}
//     </div>
//   );
// };

// export default Featured;

"use client";

import Image from "next/image";
import MinHeader from "@/components/shared/MinHeader";
import { useGetFeaturedProductsQuery } from "@/store/api/flagApi/flagApi";
import CustomSpinner from "@/components/shared/CustomSpinner";
import { IFlagResponse } from "@/types/types";

const Featured = () => {
  const { data: response, isLoading, isError } = useGetFeaturedProductsQuery(undefined);
  const rawData = (response as IFlagResponse)?.data?.data;
  const featuredProducts = Array.isArray(rawData) ? rawData : [];

  // প্রতিটি কার্ডের জন্য আলাদা কমেন্ট বা টেক্সট
  const cardDetails = [
    { title: "Main Look", desc: "The perfect style for your daily walk." },
    { title: "Side Detail", desc: "Crafted with premium materials." },
    { title: "Top View", desc: "Designed for maximum comfort." },
    { title: "Sole Focus", desc: "Durable grip for every surface." }
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CustomSpinner />
      </div>
    );
  }

  if (isError || featuredProducts.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        No Featured Products Found
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <MinHeader title="Featured" />
        <h2 className="text-xl md:text-2xl font-extrabold uppercase tracking-wider mt-4">
          Best Choice For You
        </h2>
      </div>
      
      {featuredProducts.map((product) => (
        <section key={product.id} className="flex flex-col md:flex-row gap-5 h-auto md:h-[600px] mb-20">
          
          {/* কার্ড ১: মেইন ছবি ও টেক্সট */}
          <div className="w-full md:w-1/2 relative bg-zinc-900 rounded-xl overflow-hidden group h-[400px] md:h-full">
            <Image
              src={product.images?.[0] || "/placeholder.jpg"}
              alt="Main View"
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
            />
            <div className="absolute bottom-8 left-8 z-10 text-white max-w-[280px]">
              <h3 className="text-2xl font-bold mb-2">{cardDetails[0].title}</h3>
              <p className="text-sm text-gray-300 mb-4">{cardDetails[0].desc}</p>
              <button className="underline font-bold hover:text-red-500 transition-colors">Shop Now</button>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-5">
            {/* কার্ড ২: সাইড ভিউ ও আলাদা টেক্সট */}
            <div className="h-[280px] md:flex-1 relative bg-zinc-900 rounded-xl overflow-hidden group">
              <Image
                src={product.images?.[1] || product.images?.[0] || "/placeholder.jpg"}
                alt="Side View"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute bottom-6 left-6 z-10 text-white">
                <h3 className="text-xl font-bold mb-1">{cardDetails[1].title}</h3>
                <p className="text-xs text-gray-300 mb-3">{cardDetails[1].desc}</p>
                <button className="underline font-bold hover:text-red-500">View More</button>
              </div>
            </div>

            <div className="flex flex-row gap-5 h-[250px] md:flex-1">
              {/* কার্ড ৩: টপ ভিউ ও আলাদা টেক্সট */}
              <div className="flex-1 relative bg-zinc-900 rounded-xl overflow-hidden group">
                <Image
                  src={product.images?.[2] || product.images?.[0] || "/placeholder.jpg"}
                  alt="Top View"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute bottom-4 left-4 z-10 text-white">
                  <h3 className="text-lg font-bold">{cardDetails[2].title}</h3>
                  <p className="text-[10px] text-gray-300">{cardDetails[2].desc}</p>
                </div>
              </div>

              {/* কার্ড ৪: সোল/ব্যাক ভিউ ও আলাদা টেক্সট */}
              <div className="flex-1 relative bg-zinc-900 rounded-xl overflow-hidden group">
                <Image
                  src={product.images?.[3] || product.images?.[0] || "/placeholder.jpg"}
                  alt="Detail View"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute bottom-4 left-4 z-10 text-white">
                  <h3 className="text-lg font-bold">{cardDetails[3].title}</h3>
                  <p className="text-[10px] text-gray-300">{cardDetails[3].desc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Featured;