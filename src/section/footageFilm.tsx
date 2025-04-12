import { idCTX } from "@/context/idCTX";
import { options } from "@/exports";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

interface FootageFilmProps {

}

interface Bacdrops {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1: string | null;
    vote_average: number;
    vote_count: number;
    width: number;
}
const FootageFilm: React.FC<FootageFilmProps> = () => {

    const [footage, setFootage] = useState<Bacdrops[]>([])
    const context = useContext(idCTX);
    const id = context?.params?.id;

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}movie_id/images`, options);
                const data = await response.json();
                console.log(data);
                setFootage(data.backdrops);

            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        };

        fetchData();
    }, [id]);

    console.log(footage);

    if (!context) {
        return <div>Ошибка: компонент должен быть внутри idCTX.Provider</div>;
    }

    if (!id || !footage) {
        return <div>Loading...</div>;
    }
    console.log(footage);

    return (
        <div>


            <div className="flex flex-col  items-center md:flex-row justify-between md:items-center">
                <h1 className="font-black text-3xl text-white text-nowrap md:text-4xl">Кадры из фильма</h1>
                <p className="flex text-white items-center gap-2 cursor-pointer transition-all duration-150 ease-in font-medium text-lg mt-2  hover:text-gray-300">Все кадры <FaArrowRightLong color="white" /></p>
            </div>

            <div>
                <div className="relative cursor-pointer">

                    <div className="grid grid-cols-4 gap-4 h-[400px]">
                        <div className="col-span-2">
                            <Image
                                width={700}
                                height={1000}
                                src={`https://image.tmdb.org/t/p/w500${footage[0]?.file_path}`}
                                alt=""
                                className="rounded-[10px] w-full h-full object-cover"
                            />
                        </div>
                        <div className="col-span-1">
                            <Image
                                width={700}
                                height={1000}
                                src={`https://image.tmdb.org/t/p/w500${footage[1]?.file_path}`}
                                alt=""
                                className="rounded-[10px] w-full h-full object-cover"
                            />
                        </div>
                        <div className="col-span-1 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${footage[2]?.file_path})`}}>
                            <Image
                                width={700}
                                height={1000}
                                src={``}
                                alt=""
                                className="rounded-[10px] w-full h-full object-cover"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default FootageFilm;