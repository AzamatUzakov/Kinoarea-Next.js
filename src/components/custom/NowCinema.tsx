import React, { useEffect, useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { options } from "@/exports";
import Link from "next/link";
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";

interface NowCinemaProps {
    adult?: boolean;
    backdrop_path?: string;
    genre_ids?: number[];
    id?: number;
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    release_date?: string;
    title?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
    setMainBg: (bg: string) => void;
}

const genresMap = [
    { id: 0, name: "Все" },
    { id: 28, name: "Боевики" },
    { id: 12, name: "Приключения" },
    { id: 35, name: "Комедии" },
    { id: 878, name: "Фантастика" },
    { id: 53, name: "Триллеры" },
    { id: 18, name: "Драма" },
];

const NowCinema: React.FC<NowCinemaProps> = ({ setMainBg }) => {
    const [actText, setActText] = useState<number>(0);
    const [hoverStates, setHoverStates] = useState<{ [key: number]: boolean }>({});
    const [cinema, setCinema] = useState<NowCinemaProps[]>([]);
    const [visibleCount, setVisibleCount] = useState<number>(8);
    const [genress, setGenres] = useState<{ [key: number]: string }>({});


    const NowUrl = "https://api.themoviedb.org/3/movie/now_playing?language=ru&page=1";
    const generesUrl = 'https://api.themoviedb.org/3/genre/movie/list?language=en';

    useEffect(() => {
        fetch(NowUrl, options)
            .then((res) => res.json())
            .then((res) => {
                setCinema(res.results || []);
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
    }, []);

    const filteredCinema = actText === 0
        ? cinema
        : cinema.filter((film) => film.genre_ids?.includes(actText));

    const handleMouseEnter = (id: number, backdropPath: string) => {
        setHoverStates((prev) => ({ ...prev, [id]: true }));
        setMainBg(`https://image.tmdb.org/t/p/original${backdropPath || ""}`);
    };

    const handleMouseLeave = (id: number) => {
        setHoverStates((prev) => ({ ...prev, [id]: false }));
    };

    const showMore = () => {
        setVisibleCount((prev) => prev + 12);
    };

    const getGenresNames = (genreIds: number[]) => {
        return genreIds.map(id => genress[id] || 'Неизвестно').join(', ');
    };


    return (
        <main className="mt-7 md:mt-11 xl:mt-[50px]">
            <div className="flex items-center gap-1 justify-center md:flex-col md:items-start xl:flex-row xl:items-center xl:justify-between">
                <h1 className="font-black text-3xl text-white text-nowrap md:text-4xl">Сейчас в кино</h1>

                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger className="h-7 w-7 flex items-center justify-center rounded-[5px] cursor-pointer transition-all ease-in">
                            <RxHamburgerMenu color="white" size={20} className="mt-2" />
                        </SheetTrigger>
                        <SheetContent side="top" className="bg-[#1e2538c9]">
                            <SheetHeader>
                                <SheetTitle className="text-center mx-auto">
                                    <Image width={700} height={300} src="/mainLogo.png" alt="" />
                                </SheetTitle>
                                <SheetDescription className="text-center mx-auto mt-3 pb-5">
                                    <ul className="flex flex-col items-center text-sm leading-10 font-semibold text-white">
                                        {genresMap.map((genre) => (
                                            <li
                                                key={genre.id}
                                                onClick={() => setActText(genre.id)}
                                                className="relative group w-fit cursor-pointer"
                                            >
                                                {genre.name}
                                                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
                                            </li>
                                        ))}
                                    </ul>
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>

                <Image width={70} height={10} src="/line.png" alt="line" className="hidden xl:block" />

                <div className="hidden md:flex justify-between w-[90%] mt-2 xl:w-[50%]">
                    {genresMap.map((genre) => (
                        <div key={genre.id} className="font-bold text-[15px]">
                            <p
                                onClick={() => setActText(genre.id)}
                                className={`cursor-pointer transition-all duration-200 ease-in ${actText === genre.id ? "text-white" : "text-[#818181c5]"
                                    }`}
                            >
                                {genre.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 gap-4 mt-[50px]">
                {filteredCinema.slice(0, visibleCount).map((item) => (
                    <div key={item.id} className="relative w-full max-w-[340px] overflow-hidden group cursor-pointer">
                        <Link href={`/cardFilm/${item.id}`}>
                            <div
                                onMouseEnter={() => handleMouseEnter(item.id as number, item.backdrop_path || "")}
                                onMouseLeave={() => handleMouseLeave(item.id as number)}
                                className="relative group-hover:opacity-80 transition duration-300 rounded-[15px] overflow-hidden"
                            >
                                <Image
                                    width={700}
                                    height={300}
                                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                    alt={item.title || "movie"}
                                    className="w-full h-auto object-cover transition duration-300 rounded-[15px]"
                                />
                                <div className="absolute inset-0 bg-[#3657CB]/70 opacity-0 group-hover:opacity-100 transition duration-300 rounded-[15px]" />

                                <div
                                    className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${hoverStates[item.id as number]
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-4 pointer-events-none"
                                        }`}
                                >
                                    <Button className="max-w-full bg-white text-[#3657CB] font-bold text-sm py-[22px] transition-all duration-500 ease-out hover:scale-[0.9] hover:bg-white">
                                        Карточка фильма
                                    </Button>
                                </div>
                            </div>
                        </Link>

                        <div
                            className={`absolute top-2 right-2 text-white text-sm font-bold rounded-[8px] px-2 py-[2px] z-10 ${item.vote_average && item.vote_average > 6
                                ? "bg-[#34EA16]"
                                : item.vote_average === 6
                                    ? "bg-[#89CB36]"
                                    : "bg-[#CB6C36]"
                                }`}
                        >
                            {item.vote_average?.toFixed(1) ?? "N/A"}
                        </div>

                        <div className="px-2 pb-3 pt-2 z-10">
                            <p className="text-white text-[16px] font-bold leading-[20px] truncate">{item?.title as string}</p>
                            <p className="text-[#F2F60F] text-[14px] truncate">
                                {getGenresNames(item.genre_ids ?? [])}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {visibleCount < filteredCinema.length && (
                <div className="flex justify-center mt-8">
                    <Button
                        onClick={showMore}
                        className="text-center w-[160px] h-[50px] bg-[#10101000] border cursor-pointer transition-all duration-300 ease-in hover:bg-[#10101000] hover:scale-[0.9]">Все новинки</Button>
                </div>
            )}
        </main>
    );
};

export default NowCinema;
