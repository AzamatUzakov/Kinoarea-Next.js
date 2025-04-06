import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[#1E2538]">
      <div className="absolute">
        <img src="/defoultBg.png" alt="" className="w-full h-auto object-cover" />
        <div className="absolute inset-0 bg-[#1e2538c7] "></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#1e2538d5] to-transparent"></div>
      </div>

      <div className="relative  z-10 p-3 xl:py-4 lg:px-20">
      
        <Header />
        <Link href={"/cardFilm"}>GO</Link>
      
        <Footer/>
      </div>
    </div>
  );
}
