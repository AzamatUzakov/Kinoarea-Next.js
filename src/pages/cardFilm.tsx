import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import Link from "next/link";
import React from "react";

interface CardFilmProps {

}

const CardFilm: React.FC<CardFilmProps> = () => {
    return (

        <>
            <div className="bg-[#1E2538]">
                <div className="absolute w-full ">

                </div>
                <div className="relative  z-10 p-3 xl:py-4 lg:px-20">

                    <Header />
                    <img src="Первый экран.png" alt="" />


                    <Footer />
                </div>
            </div>
        </>
    );
}

export default CardFilm;