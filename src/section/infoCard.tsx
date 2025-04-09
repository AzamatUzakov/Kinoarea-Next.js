import { idCTX } from "@/context/idCTX";
import { options } from "@/exports";
import DoughnutChart from "@/others/Charts";
import React, { useContext, useEffect, useState } from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import { FaAngleRight, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa6";
import { IoHeart, IoLogoVk, IoPlayOutline } from "react-icons/io5";

interface infoCardProps {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: BelongsToCollection | null;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

const InfoCard: React.FC<infoCardProps> = () => {
    const [infoCard, setInfoCard] = useState<infoCardProps | null>(null);
    const context = useContext(idCTX);

    if (!context) {
        throw new Error("InfoCard must be used within an idCTX.Provider");
    }

    const { params, setBg } = context;
    if (!params || !params.id) {
        return <div>Loading...</div>;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?language=en-US`, options);
                const data = await response.json();
                setInfoCard(data);
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        };

        fetchData();
    }, [params.id, setBg]);

    if (!infoCard) {
        return <div>Loading...</div>;
    }
    console.log(infoCard);
    if (infoCard) {
        setBg(infoCard.backdrop_path);
    }
    console.log(infoCard);
    const randomNumber = Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000;


    return (
        <div className="mt-11">

            <div>
                <div className="md:hidden">
                    <div className="text-16px font-medium text-[#4F5B7C] flex items-center gap-2">Главная  <FaAngleRight color="#4F5B7C" size={16} />  Фильмы <FaAngleRight color="#4F5B7C" size={16} />     <span className="text-white">{infoCard.title}</span></div>
                    <h2 className="text-white font-black text-3xl mt-1">{infoCard.title}</h2>
                    <p className="text-white font-medium text-xl">{infoCard.tagline}</p>


                    <div className="mt-4 flex justify-between w-[90%]">

                        <img
                            src={`https://image.tmdb.org/t/p/w500${infoCard?.poster_path}`}
                            alt={infoCard?.title}
                            className="rounded-[10px] max-w-full h-[310px]"
                        />


                        <div className="flex flex-col  gap-4">
                            <DoughnutChart Kinoarea_reyting={infoCard.vote_average} procents_hindred={10} />
                            <DoughnutChart Kinoarea_reyting={infoCard.vote_average} procents_hindred={10} />
                        </div>

                    </div>
                    <p className="font-medium text-[15px] text-white leading-[157%] mt-7">{infoCard.overview}</p>
                    <div className="flex flex-col max-w-full items-center justify-center mx-auto mt-11">
                        <button className="border w-[210px] border-white py-4  flex justify-center gap-1 items-center font-semibold text-white text-[15px] rounded-[10px] cursor-pointer hover:scale-105 transition-transform duration-300">
                            <IoPlayOutline color="white" size={20} className="mb-0.5" />
                            Смотреть трейлер
                        </button>

                        <div className="flex justify-between w-[210px]  px-2 mt-3">
                            <IoLogoVk color="#686868" />
                            <FaInstagram color="#686868" />
                            <FaFacebookF color="#686868" />
                            <FaTwitter color="#686868" />
                        </div>

                    </div>


                    <div className="mx-auto flex  flex-col  items-center mt-7">
                        <div>
                            <div className="flex gap-2">
                                <div className="w-[55px] h-[55px] bg-[#1B2133]  flex flex-col items-center justify-center rounded-md transition-all duration-150 ease-in hover:scale-[0.9] text-white  md:w-[50px] md:h-[50px]">
                                    <BiLike size={18} className="mb-[2px]" />
                                </div>
                                <div className="w-[55px] h-[55px] bg-[#1B2133]  flex flex-col items-center justify-center rounded-md transition-all duration-150 ease-in hover:scale-[0.9] p-2 text-white  md:w-[50px] md:h-[50px]">
                                    <BiDislike size={18} className="mb-[2px]" />
                                </div>
                                <div className="h-[55px] px-4 bg-[#2E6125] rounded-lg flex items-center justify-center">
                                    <span className="text-[#57D043] text-sm font-medium">Рейтинг ожиданий 85%</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-5 mt-5">
                                <div className="w-[55px] h-[55px] bg-[#1B2133]  flex flex-col items-center justify-center rounded-md transition-all duration-150 ease-in hover:scale-[0.9] p-2 text-white  md:w-[50px] md:h-[50px]">
                                    <IoHeart size={18} className="mb-[2px]" />
                                </div>
                                <p className="font-medium text-sm text-white">{`В избранном у ${randomNumber} человек `}</p>
                            </div>
                        </div>
                    </div>

                </div>


                <div className="hidden   md:flex gap-3" >

                    <div className="w-[50%]">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${infoCard?.poster_path}`}
                            alt={infoCard?.title}
                            className="rounded-[10px] max-w-full h-auto"
                        />
                    </div>
                    <div className="w-[50%]">
                        <div className="text-16px font-medium text-[#4F5B7C] flex items-center gap-2">Главная  <FaAngleRight color="#4F5B7C" size={16} />  Фильмы <FaAngleRight color="#4F5B7C" size={16} />     <span className="text-white">{infoCard.title}</span></div>
                            <h2 className="text-white font-black text-4xl mt-1">{infoCard.title}</h2>
                            <p className="text-white font-medium text-xl">{infoCard.tagline}</p>
                            <div className="flex   gap-4 mt-4">
                                <DoughnutChart Kinoarea_reyting={infoCard.vote_average} procents_hindred={10} />
                                <DoughnutChart Kinoarea_reyting={infoCard.vote_average} procents_hindred={10} />
                            </div>
                            <p className="font-medium text-[16px] text-white leading-[157%] mt-7">{infoCard.overview}</p>

                    </div>

                </div>


            </div>

        </div>
    );
};

export default InfoCard;
