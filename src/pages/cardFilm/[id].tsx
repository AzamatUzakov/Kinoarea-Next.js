import { useParams } from "next/navigation";
import React, { useState } from "react";

import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import InfoCard from "@/section/infoCard";

import { idCTX } from './../../context/idCTX';
import MainRole from "@/components/custom/MianRole";

interface CardFilmProps {

}

const CardFilm: React.FC<CardFilmProps> = () => {


    const [bg, setBg] = useState<string | undefined>("/defoultBG.png")
    const params = useParams() as { id: string };





    return (

        <>
            <div className="bg-[#1E2538]">
                <div className="absolute w-full ">
                    <div className="h-[100vh] w-[300px] bg object-cover" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${bg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: "no-repeat" }}></div>
                </div>

                <div className="relative  z-10 p-3 xl:py-4 lg:px-10">

                    <Header />

                    <idCTX.Provider value={{ params, setBg }}>

                        <InfoCard />
                        <MainRole />
                    </idCTX.Provider>


                    <Footer />
                </div>
            </div>
        </>
    );
}

export default CardFilm;