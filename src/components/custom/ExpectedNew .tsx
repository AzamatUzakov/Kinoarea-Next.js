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

interface ExpectedNewProps {
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

const ExpectedNew : React.FC<ExpectedNewProps> = () => {
    const [actText, setActText] = useState<null | string | number>(0);
    const [popular, setPopular] = useState<ExpectedNewProps[]>([]);
    const [hoverStates, setHoverStates] = useState<{ [key: number]: boolean }>({});
    const [activeSlide, setActiveSlide] = useState(0);
    const [totalSlides, setTotalSlides] = useState(0)
    const [genres, setGenres] = useState<{ [key: number]: string[] }>({});

    const popularUrl = "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
    const generesUrl = 'https://api.themoviedb.org/3/genre/movie/list?language=en'

    useEffect(() => {
        fetch(popularUrl, options)
            .then(res => res.json())
            .then(res => {
                setPopular(res.results);
            });


        fetch(generesUrl, options)
            .then((res) => res.json())
            .then((res: { genres: { id: number; name: string }[] }) => {
                const allGenres = res.genres;

                const genresMap: { [key: number]: string[] } = {};
                popular.forEach((movie) => {
                    genresMap[movie.id] = movie.genre_ids
                        .map((id) => allGenres.find((genre) => genre.id === id)?.name)
                        .filter(Boolean) as string[];
                });

                setGenres(genresMap);
            })
    }, [popularUrl, generesUrl]);

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
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <>
            <div className="mt-[60px] mb-11">
                <div className="flex flex-col  justify-between  items-center md:flex-row md:items-center  xl:flex-row xl:justify-between xl:items-center">
                    <h1 className="font-black text-2xl text-white text-nowrap md:text-4xl">Ожидаемые новинки</h1>
                    <div className="flex justify-center mt-5 gap-4 cursor-pointer md:mt-2 ">

                        <div>
                            <FaArrowLeftLong ref={prevRef} color="white" size={20} />
                        </div>

                        <p className="font-medium text-[17px] text-white no-select no-select-context"> {activeSlide + 1} / {popular.length}</p>
                        <div>
                            <FaArrowLeftLong ref={nextRef} color="white" size={20} className="rotate-180 " />
                        </div>
                    </div>
                    
                </div>

                <div className="relative mt-[20px]">
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
                                <div
                                    onMouseEnter={() => handleMouseEnter(item.id)}
                                    onMouseLeave={() => handleMouseLeave(item.id)}
                                    className="w-[178px] h-[250px] relative bg-cover bg-no-repeat bg-center rounded-lg md:h-[286px] md:w-[210px] lg:w-[202px] lg:h-[297px] xl:w-[290px] xl:h-[420px] 2xl:w-[340px] 2xl:h-[480px]"
                                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.poster_path})` }}
                                >
                                    <div className={`
                                        absolute cursor-grab  top-2 z-10 right-2 w-[38px] h-[21px] text-center text-[12px] flex items-center justify-center font-bold rounded-[5px] text-white
                                        ${item.vote_average > 6 && "bg-[#34EA16]" || item.vote_average === 6 && "bg-[#89CB36]" || item.vote_average < 6 && "bg-[#CB6C36]"}`}
                                    >
                                        {item.vote_average.toFixed(1)}
                                    </div>

                                    <div
                                        className={`absolute top-0 left-0 z-[3] bg-[#3657CBA6] w-full h-full rounded-lg flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer
                                        ${hoverStates[item.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
                                    >
                                        <Button
                                            className={`max-w-full cursor-pointer bg-white text-[#3657CB] font-bold text-sm py-[22px] transition-all duration-500 ease-out hover:scale-[0.9] hover:bg-white
                                            ${hoverStates[item.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                        >
                                            Карточка фильма
                                        </Button>
                                    </div>
                                </div>
                                <p className="font-semibold text-white text-[15px] truncate-text">{item.title}</p>
                             {/*    <p className="text-[#F2F60F]  text-[12px] truncate-text">{genres[item.id] ? genres[item.id].join(", ") : "Жанры не доступны("}</p>
 */}
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    
                </div>
            </div>
        </>
    );
}

export default ExpectedNew ;
