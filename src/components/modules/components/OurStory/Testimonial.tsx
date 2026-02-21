import Image from "next/image";
import { Twitter, Send, Star, Mail } from "lucide-react";


const teamData = [
  { id: 1, name: "Ariful Islam", role: "Founder & Investor", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", rating: 4.9 },
  { id: 2, name: "Sarah Ahmed", role: "Operations Manager", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330", rating: 4.8 },
  { id: 3, name: "James Wilson", role: "Top Rated Seller", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e", rating: 5.0 },
  { id: 4, name: "Farhana Yasmin", role: "Marketing Head", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2", rating: 4.7 },
  { id: 5, name: "David Miller", role: "Strategic Investor", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e", rating: 4.9 },
  { id: 6, name: "Elena Rodriguez", role: "Customer Manager", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956", rating: 4.6 },
  { id: 7, name: "Tanvir Rahman", role: "Growth Marketer", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7", rating: 4.8 },
  { id: 8, name: "Sultana Bibir", role: "Verified Seller", image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604", rating: 4.9 },
  { id: 9, name: "Robert Chen", role: "Financial Analyst", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6", rating: 4.5 },
  { id: 10, name: "Maya Kapoor", role: "Project Manager", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce", rating: 4.8 }
];

export default function TeamSection() {
  return (
    <section className=" max-w-7xl mx-auto font-nunito">
        <h2 className="text-3xl font-bold tracking-tight font-nunito my-3">Our rewarded Customers</h2>
      <div className="grid grid-cols-3 md:grid-cols-4  gap-2 md:gap-4">
        {teamData.map((person) => (
          <div key={person.id} className="group animate-in fade-in duration-700">
            <div className="relative w-full aspect-[1] mb-5 bg-[#F5F5F5] rounded-lg overflow-hidden">
              <Image 
                src={`${person.image}?q=80&w=600`} 
                alt={person.name} 
                fill
                className="object-cover  group-hover:grayscale-0 transition-all duration-500"
              />
            </div>

            <div className="space-y-2 font-nunito">
              <h3 className="text-2xl font-semibold leading-tight">{person.name}</h3>
              <p className="text-sm text-gray-500 font-normal">{person.role}</p>
              
              <div className="flex items-center gap-1.5">
                <Star size={16} className="fill-star-yellow text-star-yellow" />
                <span className="text-sm font-bold text-gray-700">{person.rating}</span>
              </div>

              <div className="flex gap-4 pt-2">
                <Twitter size={20} className="cursor-pointer hover:text-sky-500 transition-colors" />
                <Mail size={20} className="cursor-pointer hover:text-blue-500 transition-colors" />
                <Send size={20} className="cursor-pointer hover:text-blue-700 transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}