import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import "../../styles/custom.css"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "../ui/button";
import { options } from "@/exports";

interface NowCinemaProps {
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
    setMainBg: (bg: string) => void;
    mainBg: string
}


const generesArr: string[] = ["Все", "Боевики", "Приключения", "Комедии", "Фантастика", "Триллеры", "Драма"]

const NowCinema: React.FC<NowCinemaProps> = ({ setMainBg }) => {
    const [actText, setActText] = useState<null | string | number>(0)
    const [hoverStates, setHoverStates] = useState<{ [key: number]: boolean }>({});
    const [cinema, setCinema] = useState<NowCinemaProps[]>([])
    const [genres, setGenres] = useState<{ [key: number]: string[] }>({});
    const [visibleCount, setVisibleCount] = useState<number>(8)
    const NowUrl = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
    const generesUrl = 'https://api.themoviedb.org/3/genre/movie/list?language=en'
    const AuthorizationUrl = process.env.NEXT_PUBLIC_AUTHORIZATION


    
    useEffect(() => {
        fetch(NowUrl, options)
            .then((res) => res.json())
            .then((res) => setCinema(res.results));

        fetch(generesUrl, options)
            .then((res) => res.json())
            .then((res: { genres: { id: number; name: string }[] }) => {
                const allGenres = res.genres;

                const genresMap: { [key: number]: string[] } = {};
                cinema.forEach((movie) => {
                    genresMap[movie.id] = movie.genre_ids
                        .map((id) => allGenres.find((genre) => genre.id === id)?.name)
                        .filter(Boolean) as string[];
                });

                setGenres(genresMap);
            });
    }, [NowUrl, generesUrl]);

    const handleMouseEnter = (id: number, backdropPath: string) => {
        setHoverStates((prev) => ({ ...prev, [id]: true }));
        setMainBg(`https://image.tmdb.org/t/p/w500${backdropPath || 'defaultBackdrop.jpg'}`);
    };

    const handleMouseLeave = (id: number) => {
        setHoverStates((prev) => ({ ...prev, [id]: false }));
        
    };
    const showMore = () => {
        setVisibleCount(prev => prev + 12)
    }

    return (
        <>

            <main className="mt-7 md:mt-11 xl:mt-[50px]">

                <div className="flex items-center gap-1 justify-center md:flex-col md:items-start xl:flex-row xl:items-center xl:justify-between">
                    <h1 className="font-black text-3xl text-white text-nowrap md:text-4xl">Сейчас в кино</h1>

                    <div className="md:hidden">
                        <Sheet >
                            <SheetTrigger className="h-7 w-7 flex items-center justify-center rounded-[5px] cursor-pointer  transition-all ease-in">
                                <RxHamburgerMenu color="white" size={20} className="mt-2 cursor-pointer" />
                            </SheetTrigger>
                            <SheetContent side="top" className="bg-[#1e2538c9]" >
                                <SheetHeader>
                                    <SheetTitle className="text-center mx-auto"><img src="/mainLogo.png" alt="" /></SheetTitle>
                                    <SheetDescription className="text-center mx-auto mt-3 pb-5">

                                        <ul className="flex flex-col items-center text-sm leading-10 font-semibold text-white">
                                            <li className="relative group w-fit cursor-pointer">
                                                Все                                                   <span className="absolute left-0 bottom-0  h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                                            </li>
                                            <li className="relative group w-fit cursor-pointer">
                                                Боевики
                                                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                                            </li>
                                            <li className="relative group w-fit cursor-pointer">
                                                Приключения                                                   <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                                            </li>
                                            <li className="relative group w-fit cursor-pointer">
                                                Комедии                                                   <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                                            </li>
                                            <li className="relative group w-fit cursor-pointer">
                                                Фантастика                                                  <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                                            </li>
                                            <li className="relative group w-fit cursor-pointer">
                                                Триллеры
                                                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                                            </li>
                                            <li className="relative group w-fit cursor-pointer">
                                                Драма
                                                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                                            </li>
                                        </ul>


                                    </SheetDescription>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                    </div>
                    <img src="/line.png" alt="line" className="hidden xl:block" />
                    <div className="hidden md:flex justify-between w-[90%] mt-2 xl:w-[50%]">
                        {generesArr.map((str, indx) => (
                            <div key={indx} className="font-bold text-[15px] text-[#818181c5]">
                                <p
                                    onClick={() => setActText(indx)}
                                    className={`
                                    cursor-pointer transition-all duration-200 ease-in
                                    ${actText === indx ? "text-white" : "text-[#818181c5]"}`}>{str}</p>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="w-full">
                    {<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 gap-4 mt-[50px]">
                        {cinema.slice(0, visibleCount).map((item) => (
                            <div key={item.id}>
                                <div
                                    onMouseEnter={() => handleMouseEnter(item.id, item.backdrop_path)}
                                    onMouseLeave={() => handleMouseLeave(item.id)}
                                    className="w-[178px] h-[250px]  relative bg-cover bg-no-repeat bg-center rounded-lg md:h-[286px] md:w-[210px] lg:w-[202px] lg:h-[297px] xl:w-[290px] xl:h-[420px] 2xl:w-[340px] 2xl:h-[480px]"
                                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.poster_path})` }}
                                >
                                    <div className=
                                        {`absolute cursor-pointer top-2 z-10 right-2 w-[38px] h-[21px] text-center text-[12px] flex items-center justify-center font-bold rounded-[5px] text-white ${item.vote_average > 6 && "bg-[#34EA16]" || item.vote_average === 6 && "bg-[#89CB36]" || item.vote_average < 6 && "bg-[#CB6C36]" }`}>
                                        {item.vote_average.toFixed(1)}
                                    </div>

                                    <div
                                        className={`absolute top-0 left-0 z-[3] bg-[#3657CBA6] w-full h-full rounded-lg flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer ${hoverStates[item.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
                                    >
                                        <Button
                                            className={`max-w-full cursor-pointer bg-white text-[#3657CB] font-bold text-sm py-[22px] transition-all duration-500 ease-out  hover:scale-[0.9] hover:bg-white ${hoverStates[item.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                        >
                                            Карточка фильма
                                        </Button>
                                    </div>
                                </div>
                                <p className="font-semibold text-white text-[15px] truncate-text">{item.title}</p>
{/*                                 <p className="text-[#F2F60F]  text-[12px] truncate-text">{genres[item.id] ? genres[item.id].join(", ") : "Жанры не доступны("}</p>
 */}                            </div>
                        ))}

                    </div>
                    }
                    <div className="flex justify-center mt-8">
                        <Button
                            onClick={showMore}
                            className="text-center w-[160px] h-[50px] bg-[#10101000] border cursor-pointer transition-all duration-300 ease-in hover:bg-[#10101000] hover:scale-[0.9]">Все новинки</Button>
                    </div>
                </div>
            </main >

        </>
    );
}

export default NowCinema;