import React, { useEffect, useRef, useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";


import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { RxHamburgerMenu } from "react-icons/rx";
import { options } from "@/exports";
import { Button } from "../ui/button";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";

interface PopularFilmProps {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
const timesArr: string[] = ["Всё время", "2020", "2019", "2018", "2017", "2016", "2015"];

const PopularFilm: React.FC<PopularFilmProps> = () => {
    const [actText, setActText] = useState<null | string | number>(0);
    const [popular, setPopular] = useState<PopularFilmProps[]>([]);
    const [hoverStates, setHoverStates] = useState<{ [key: number]: boolean }>({});
    const [activeSlide, setActiveSlide] = useState(0);
    const [totalSlides, setTotalSlides] = useState(0)
    const [genress, setGenres] = useState<{ [key: number]: string }>({});

    const popularUrl = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
    const generesUrl = 'https://api.themoviedb.org/3/genre/movie/list?language=en'

    useEffect(() => {
        fetch(popularUrl, options)
            .then(res => res.json())
            .then(res => {
                setPopular(res.results);
            });


        fetch(generesUrl, options)
            .then((res) => res.json())
            .then((res) => {

                const genresMap: { [key: number]: string } = {};
                res.genres.forEach((gen: { id: number; name: string }) => {
                    genresMap[gen.id] = gen.name;
                });
                setGenres(genresMap);
            });

    }, [popularUrl, generesUrl]);

    const getGenresNames = (genreIds: number[]) => {
        return genreIds.map(id => genress[id] || 'Неизвестно').join(', ');
    };
    const handleMouseEnter = (id: number) => {
        setHoverStates((prev) => ({ ...prev, [id]: true }));
    };

    const handleMouseLeave = (id: number) => {
        setHoverStates((prev) => ({ ...prev, [id]: false }));
    };
    const handleSlideChange = (swiper: any) => {
        setActiveSlide(swiper.activeIndex);
    };

    const handleSwiperInit = (swiper: any) => {
        setTotalSlides(swiper.slides.length);
    };



    const prevRef = useRef<SVGSVGElement | null>(null);
    const nextRef = useRef<SVGSVGElement | null>(null);



    return (
        <>
            <div className="mt-8">
                <div className="flex justify-center items-center md:flex-col md:items-start md:items-center xl:flex-row xl:justify-between xl:items-center">
                    <h1 className="font-black text-2xl text-white text-nowrap md:text-4xl">Популярные фильмы</h1>
                    <img src="/line.png" alt="line" className="hidden mt-2 xl:block" />
                    <div className="mb-[4px] md:hidden">
                        <Sheet>
                            <SheetTrigger className="h-7 w-7 flex items-center justify-center rounded-[5px] cursor-pointer transition-all ease-in">
                                <RxHamburgerMenu color="white" size={20} className="mt-2 cursor-pointer" />
                            </SheetTrigger>
                            <SheetContent side="top" className="bg-[#1e2538c9]">
                                <SheetHeader>
                                    <SheetTitle className="text-center mx-auto"><img src="/mainLogo.png" alt="" /></SheetTitle>
                                    <SheetDescription className="text-center mx-auto mt-3 pb-5">
                                        <ul className="flex flex-col items-center text-sm leading-10 font-semibold text-white">
                                            {timesArr.map((str, indx) => (
                                                <li key={indx} className="relative group w-fit cursor-pointer">
                                                    {str}
                                                    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                                                </li>
                                            ))}
                                        </ul>
                                    </SheetDescription>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                    </div>
                    <div className="hidden mt-2 md:flex w-[70%] justify-between xl:w-[40%]">
                        {timesArr.map((str, indx) => (
                            <div key={indx} className="font-bold text-[15px] text-[#818181c5]">
                                <p
                                    onClick={() => setActText(indx)}
                                    className={`cursor-pointer transition-all duration-200 ease-in
                                    ${actText === indx ? "text-white" : "text-[#818181c5]"}`}>{str}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative mt-[50px]">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        onSlideChange={handleSlideChange}
                        onInit={handleSwiperInit}
                       /*  pagination={{ clickable: true }}
                        */ spaceBetween={10}
                        breakpoints={{
                            320: {
                                slidesPerView: 2,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                            1000: {
                                slidesPerView: 4,
                            },
                            1224: {
                                slidesPerView: 4,
                            },
                        }}
                    >
                        {popular.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div key={item.id} className="relative w-full max-w-[340px] overflow-hidden group cursor-pointer">
                                    <Link href="/cardFilm">
                                        <div
                                            onMouseEnter={() => handleMouseEnter(item.id)}
                                            onMouseLeave={() => handleMouseLeave(item.id)}
                                            className="relative group-hover:opacity-80 transition duration-300 rounded-[15px] overflow-hidden"
                                        >
                                            {/* Адаптивное изображение */}
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                                alt={item.title}
                                                className="w-full h-auto object-cover transition duration-300 rounded-[15px]"
                                            />

                                            <div className="absolute inset-0 bg-[#3657CB]/70 opacity-0 group-hover:opacity-100 transition duration-300 rounded-[15px]"></div>

                                            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${hoverStates[item.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                                                }`}>
                                                <Button
                                                    className={`max-w-full cursor-pointer bg-white text-[#3657CB] font-bold text-sm py-[22px] transition-all duration-500 ease-out hover:scale-[0.9] hover:bg-white ${hoverStates[item.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                                        }`}
                                                >
                                                    Карточка фильма
                                                </Button>
                                            </div>
                                        </div>

                                        <div className={`absolute top-2 right-2 text-white text-sm font-bold rounded-[8px] px-2 py-[2px] z-10 ${item.vote_average > 6
                                            ? "bg-[#34EA16]"
                                            : item.vote_average === 6
                                                ? "bg-[#89CB36]"
                                                : "bg-[#CB6C36]"
                                            }`}>
                                            {item.vote_average.toFixed(1)}
                                        </div>
                                        <div className="px-2 pb-3 pt-2 z-10">
                                            <p className="text-white text-[16px] font-bold leading-[20px] truncate">{item.title}</p>
                                            <p className="text-[#F2F60F] text-[14px] truncate">
                                                {getGenresNames(item.genre_ids)}
                                            </p>


                                        </div>
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="flex justify-center mt-5 gap-4 cursor-pointer ">

                        <div>
                            <FaArrowLeftLong ref={prevRef} color="white" size={20} />
                        </div>

                        <p className="font-medium text-[17px] text-white no-select no-select-context"> {activeSlide + 1} / {popular.length}</p>
                        <div>
                            <FaArrowLeftLong ref={nextRef} color="white" size={20} className="rotate-180 " />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PopularFilm;
