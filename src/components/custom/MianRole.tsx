import { idCTX } from "@/context/idCTX";
import { options } from "@/exports";
import React, { useContext, useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Button } from "../ui/button";
import Image from "next/image";

interface Cast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}
interface Crew {
    adult: boolean;
    credit_id: string;
    department: string;
    gender: number;
    id: number;
    job: string;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
}
const MainRole: React.FC = () => {
    const [credits, setCredits] = useState<{ cast: Cast[]; crew: Crew[] } | null>(null);
    const [showMore, setShowMore] = useState<number>(10)

    const context = useContext(idCTX);
    const id = context?.params?.id;

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, options);
                const data = await response.json();
                setCredits(data);
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        };

        fetchData();
    }, [id]);

    if (!context) {
        return <div>Ошибка: компонент должен быть внутри idCTX.Provider</div>;
    }

    if (!id || !credits) {
        return <div>Loading...</div>;
    }
    console.log(credits);


    return (

        <>
            <div className="mt-11">

                <div className="flex flex-col  items-center md:flex-row justify-between md:items-center">
                    <h1 className="font-black text-3xl text-white text-nowrap md:text-4xl">В главных ролях:</h1>
                    <p className="flex text-white items-center gap-2 cursor-pointer transition-all duration-150 ease-in font-medium text-lg mt-2  hover:text-gray-300">Все актёры <FaArrowRightLong color="white" /></p>
                </div>

                <div className="text-center mt-9">

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full">
                        {credits.cast.slice(0, showMore).map((item) => (
                            <div
                                key={item.id}
                                className="p-2 transition-transform transform hover:scale-105 hover:ease-in-out duration-300"
                            >
                                <Image
                                    width={200}
                                    height={200}
                                    className="w-[165px] h-[160px] sm:h-[200px] sm:w-[210px] md:h-[250px] md:w-[280px] xl:h-[230px] xl:w-[310px] 2xl:h-[300px]  cursor-pointer object-cover rounded-[5px] transition-transform duration-300 ease-in-out"
                                    src={item.profile_path !== null ? `https://image.tmdb.org/t/p/original${item.profile_path}` : "/dontImag.png"}
                                    alt=""
                                />
                                <p className="text-start font-bold text-[18px] text-white">{item.name}</p>
                            </div>
                        ))}
                    </div>

                    <Button className="py-7 bg-[#ff000000] mt-7 border-2 border-white cursor-pointer text-md transition-all duration-200 ease-in hover:scale-[0.9] hover:bg-gray-900 " onClick={() => setShowMore(prev => prev + 12)}> {"Показать больше"}</Button>
                </div>

            </div>
        </>
    );
}

export default MainRole;