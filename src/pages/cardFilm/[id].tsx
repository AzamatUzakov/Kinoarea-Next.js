import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import { useParams } from "next/navigation";
import React, { createContext, useState } from "react";
import { idCTX } from './../../context/idCTX';
import InfoCard from "@/section/infoCard";

interface CardFilmProps {

}

const CardFilm: React.FC<CardFilmProps> = () => {


    const [bg, setBg] = useState<string>("/defoultBG.png")
    const params = useParams() as { id: string };





    /*     fetch('https://api.themoviedb.org/3/movie/{}?language=en-US', options)
     */
    return (

        <>
            <div className="bg-[#1E2538]">
                <div className="absolute w-full ">
                    <div className="h-[100vh] w-[300px] bg object-cover" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${bg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: "no-repeat" }}></div>
                </div>

                <div className="relative  z-10 p-3 xl:py-4 lg:px-20">

                    <Header />

                    <idCTX.Provider value={{ params, setBg }}>
                        <InfoCard />
                    </idCTX.Provider>

                    <Footer />
                </div>
            </div>
        </>
    );
}

export default CardFilm;