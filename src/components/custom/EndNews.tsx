import { options } from "@/exports";
import React, { useEffect, useState } from "react";
import { FaArrowRightLong, FaRegComment, FaRegEye } from "react-icons/fa6";

interface EndNewsProps {
    adult?: boolean;
    backdrop_path?: string;
    first_air_date?: string;
    genre_ids?: number[];
    id?: number;
    name?: string;
    origin_country?: string[];
    original_language?: string;
    original_name?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    vote_average?: number;
    vote_count?: number;
}

const EndNews: React.FC<EndNewsProps> = () => {
    const endNewsUrl = "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1"
    const [endNew, setEndNew] = useState<EndNewsProps[]>([])


    useEffect(() => {

        fetch(endNewsUrl, options)
            .then(res => res.json())
            .then(res => setEndNew(res.results)

            )
    }, [endNewsUrl])


    return (
        <>
            <div className="mt-8">

                <div className="flex flex-col  items-center md:flex-row justify-between md:items-center">
                    <h1 className="font-black text-2xl text-white text-nowrap md:text-4xl">Последние новости</h1>
                    <p className="flex text-white items-center gap-2 cursor-pointer transition-all duration-150 ease-in font-medium text-lg mt-2  hover:text-gray-300"> Все новости <FaArrowRightLong color="white" /></p>
                </div>

                <div className="w-full mt-5  justify-between xl:flex gap-1">

                    <div className="w-full h-[245px] bg-no-repeat bg-cover relative rounded-[10px] bg-center px-3 py-3 md:w-[80%]  xl:px-5 md:py-10 md:h-[450px] lg:h-[550px] xl:h-[700px] xl:w-[80%] " style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${endNew[0]?.backdrop_path})` }}>
                        <div className="flex flex-col h-full justify-between relative z-30 ">
                            <div className="flex gap-3 items-center"><p className="flex items-center text-white gap-1 font-semibold text-[13px]">15 Апр 2020</p> <p className="flex items-center text-white gap-1 font-semibold text-[13px]"> <FaRegEye size={18} color="white" />242</p><p className="flex items-center text-white gap-1 font-semibold text-[13px]"> <FaRegComment size={18} color="white" />13</p></div>
                            <div> <p className="font-black text-xl text-white  xl:text-[25px]">{endNew[0]?.name}</p>
                                <p className="hidden text-white font-medium text-[16px] md:flex mt-4 xl:text-[20px] ">{endNew[0]?.overview}</p>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-black opacity-20 rounded-[10px]"></div>

                    </div>

                    <div className="overflow-x-auto webkit mt-5 md:w-[20%] xl:overflow-y-auto xl-[20%] xl:mt-0 ">
                        <div className="flex flex-nowrap gap-3 xl:flex-col w-[100%]  xl:h-[700px] ">
                            {endNew.slice(1, endNew.length).map((i) => (
                                <div
                                    key={i.id}
                                    className="w-[180px] h-[128px] md:w-[100%] md:h-[148px] xl:w-[100%] xl:h-[180px]  bg-no-repeat bg-cover rounded-[10px] bg-center p-3 shrink-0 relative"
                                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${i?.backdrop_path})` }}
                                >
                                    <div className="absolute inset-0 bg-black opacity-20 rounded-[10px]"></div>
                                    <div className="flex flex-col h-full justify-between relative z-10">
                                        <p className="flex items-center text-white gap-1 font-bold text-[12px]">15 Апр 2020</p>
                                        <p className="font-black text-[12px] leading-5 max-full text-white">{i.name}</p>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>




                </div>

            </div>
        </>
    );
}

export default EndNews;