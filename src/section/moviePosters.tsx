import { idCTX } from "@/context/idCTX";
import { options } from "@/exports";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

interface MoviePostersProps {

}
interface Poster {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1: string | null;
    vote_average: number;
    vote_count: number;
    width: number;
}

//https://api.themoviedb.org/3/movie/${poster_id}movie_id/images
const MoviePosters: React.FC<MoviePostersProps> = () => {

    const [poster, setPoster] = useState<Poster[]>([])
    const context = useContext(idCTX);
    const id = context?.params?.id;

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}movie_id/images`, options);
                const data = await response.json();
                setPoster(data.posters);

            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        };

        fetchData();
    }, [id]);


    if (!context) {
        return <div>Ошибка: компонент должен быть внутри idCTX.Provider</div>;
    }

    if (!id || !poster) {
        return <div>Loading...</div>;
    }


    return (
        <div className="mt-17 mb-10">
            <div className="flex flex-col  items-center md:flex-row justify-between md:items-center">
                <h1 className="font-black text-3xl text-white text-nowrap md:text-4xl">Постеры к фильму</h1>
                <p className="flex text-white items-center gap-2 cursor-pointer transition-all duration-150 ease-in font-medium text-lg mt-2  hover:text-gray-300">Все постеры <FaArrowRightLong color="white" /></p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mt-11 ">
                {poster.slice(0, 4).map((item, index) => (
                    <div className="relative cursor-pointer">
                        <Image
                            width={700}
                            height={1000}
                            src={`https://image.tmdb.org/t/p/w500${item.file_path}`}
                            alt={"infoCard?.title"}
                            className="rounded-[10px] max-w-full h-auto"
                        />
                        {index === 3 && (
                            <div className="absolute top-0 left-0 w-full h-full bg-[#3657CBA6] bg-opacity-50 text-white flex items-center justify-center rounded-[10px]">
                                <p className="text-lg font-bold text-center">+{poster.length - 4}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

        </div >
    );
}

export default MoviePosters;