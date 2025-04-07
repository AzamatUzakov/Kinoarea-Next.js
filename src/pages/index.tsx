import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import NowCinema from "@/components/custom/NowCinema";
import "../styles/custom.css"
import Link from "next/link";
import { useState } from "react";
import NewTrailers from "@/components/custom/NewTrailers";
export default function Home() {

  const [mainBg, setMainBg] = useState<string>("/defoultBg.png")
  return (
    <div className="bg-[#1E2538]">
      <div className="absolute w-full ">
        <div className="h-[100vh] bg object-cover" style={{ backgroundImage: `url(${mainBg})`, backgroundSize: 'cover', backgroundPosition: 'center',  backgroundRepeat: "no-repeat"}}></div>
    </div>

      <div className="relative  z-10 p-3 xl:py-4 lg:px-20">

        <Header />

        <NowCinema setMainBg={setMainBg} />
        
        <NewTrailers />
        
        
        <Link href={"/cardFilm"}>GO</Link>

        
        
        <Footer />
      </div>
    </div>
  );
}
