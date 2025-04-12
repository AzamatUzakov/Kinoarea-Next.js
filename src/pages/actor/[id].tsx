'use client';

import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import { options } from "@/exports";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaAngleRight, FaFacebookF, FaTwitter } from "react-icons/fa6";
import { IoHeart } from "react-icons/io5";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import "../../styles/custom.css"

interface ActorProps {
    adult: boolean;
    also_known_as: string[];
    biography: string;
    birthday: string;
    deathday: string | null;
    gender: number;
    homepage: string | null;
    id: number;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
}

const Actor: React.FC = () => {
    const [actor, setActor] = useState<ActorProps | null>(null);
    const [activeTab, setActiveTab] = useState<number>(0);
    const params = useParams() as { id: string };
    const swiperRef = useRef<any>(null);

    useEffect(() => {
        if (!params?.id) return;

        fetch(`https://api.themoviedb.org/3/person/${params.id}?language=ru-RU`, options)
            .then(res => res.json())
            .then(data => setActor(data))
            .catch(err => console.error(err));
    }, [params?.id]);

    const handleSlideChange = (index: number) => {
        setActiveTab(index);
        swiperRef.current?.slideTo(index);
    };

    if (!actor) return null;

    console.log(actor);

    return (
        <div className="bg-[#1E2538] p-3 xl:py-4 lg:px-10">
            <Header />

            <div className="">
                <div className="text-16px font-medium text-[#4F5B7C] flex items-center gap-2 mt-8 md:hidden">
                    <Link href="/">Главная</Link>
                    <FaAngleRight color="#4F5B7C" size={16} />
                    <Link href={`/`}>Персоны</Link>
                    <FaAngleRight color="#4F5B7C" size={16} />
                    <span className="text-white">{actor.name}</span>
                </div>

                <div className="md:hidden">
                    <h2 className="font-black text-white text-3xl mt-2">{actor.name}</h2>
                    <p className="text-white font-medium text-xl mt-1">{actor.also_known_as[1]}</p>
                </div>

                <div className="md:flex gap-4 h-[50%] mt-10">
                    <div className="mt-4 flex gap-6 w-full  md:w-[50%] xl:w-[30%] ">
                        <img
                            src={actor.profile_path !== null ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : "/dontImag.png"}
                            alt={actor.name}
                            className="rounded-[10px] w-[80%] h-auto md:h-[100%] md:w-full"
                        />

                        <div className="flex flex-col gap-2 md:hidden">
                            <div className="p-3 border border-[#2B354E] rounded-4xl cursor-pointer hover:scale-[0.9] transition-all duration-200 ease-in-out">
                                <FaFacebookF color="#FFFFFF80" />
                            </div>
                            <div className="p-3 border border-[#2B354E] rounded-4xl cursor-pointer hover:scale-[0.9] transition-all duration-200 ease-in-out">
                                <FaTwitter color="#FFFFFF80" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-5 mt-5 md:hidden">
                        <div className="w-[55px] h-[55px] bg-[#1B2133] flex flex-col items-center justify-center rounded-md transition-all duration-150 ease-in hover:scale-[0.9] p-2 text-white">
                            <IoHeart size={18} className="mb-[2px]" />
                        </div>
                        <p className="font-medium text-sm text-white">{`В избранном у ${actor.id} человек`}</p>
                    </div>

                    <div className="mt-8 md:w-[50%]">
                        <div className="text-[16px] font-medium text-[#4F5B7C]  items-center gap-2  hidden md:flex">
                            <Link href="/">Главная</Link>
                            <FaAngleRight color="#4F5B7C" size={16} />
                            <Link href={`/`}>Персоны</Link>
                            <FaAngleRight color="#4F5B7C" size={16} />
                            <span className="text-white">{actor.name}</span>
                        </div>

                        <div className="hidden md:block">
                            <h2 className="font-black text-white text-4xl mt-2">{actor.name}</h2>
                            <p className="text-white font-medium text-xl mt-3">{actor.also_known_as[1]}</p>
                        </div>
                        <div className="flex gap-4 mb-4 md:mt-10">
                            <button
                                onClick={() => handleSlideChange(0)}
                                className={`cursor-pointer font-semibold text-lg ${activeTab === 0 ? "text-white" : "text-gray-400"
                                    } hover:text-white transition`}
                            >
                                Информация
                            </button>
                            <button
                                onClick={() => handleSlideChange(1)}
                                className={`cursor-pointer font-semibold text-lg ${activeTab === 1 ? "text-white" : "text-gray-400"
                                    } hover:text-white transition`}
                            >
                                Биография
                            </button>
                        </div>

                        <Swiper
                            spaceBetween={10}
                            slidesPerView={1}
                            onSwiper={(swiper) => (swiperRef.current = swiper)}
                            onSlideChange={(swiper) => setActiveTab(swiper.activeIndex)}
                        >

                            <SwiperSlide>
                                <div className="text-white text-sm space-y-2">
                                    <p className="flex text-yellow-300"><span className="text-[#A4A9B6] block w-[150px]">Карьера:</span> {actor.known_for_department || "-"}</p>
                                    <p className="flex text-yellow-300"><span className="text-[#A4A9B6] block w-[150px]">Дата рождения:</span> {actor.birthday || "-"}</p>
                                    {actor.place_of_birth && (
                                        <p className="flex text-yellow-300"><span className="text-[#A4A9B6] block w-[150px]">Место рождения:</span> {actor.place_of_birth || "-"}</p>
                                    )}
                                    <p className="flex text-yellow-300"><span className="text-[#A4A9B6] block w-[150px]">Пол:</span> {actor.gender === 1 ? "Женский" : "Мужской"}</p>
                                    <p className="flex text-yellow-300"><span className="text-[#A4A9B6] block w-[150px]">Популярность:</span> {actor.popularity || "-"}</p>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div className="text-white text-sm leading-relaxed whitespace-pre-line md:h-[400px] md:overflow-y-auto webkit xl:h-[300px]">
                                    {actor.biography || 'Биография недоступна'}
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
                <div className="hidden items-center gap-5 mt-5 md:flex">
                    <div className="w-[55px] h-[55px] bg-[#1B2133] flex flex-col items-center justify-center rounded-md transition-all duration-150 ease-in hover:scale-[0.9] p-2 text-white">
                        <IoHeart size={18} className="mb-[2px]" />
                    </div>
                    <p className="font-medium text-sm text-white">{`В избранном у ${actor.id} человек`}</p>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Actor;
