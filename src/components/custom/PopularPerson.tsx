import React, { useEffect, useState } from "react";
import { options } from "@/exports";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";

interface PopularPersonProps {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
}

const yearsArr: string[] = ["За год", "За месяц", "За неделю"];

const PopularPerson: React.FC<PopularPersonProps> = () => {
    const [actText, setActText] = useState<null | string | number>(0);
    const [person, setPerson] = useState<PopularPersonProps[]>([])

    const personUrl = "https://api.themoviedb.org/3/person/popular?language=en-US&page=1"


    useEffect(() => {

        fetch(personUrl, options)
            .then(res => res.json())
            .then(res => setPerson(res.results)
            )
    }, [])

    return (
        <>

            <div className="mt-8">
                <div className="flex justify-center items-center md:flex-col md:items-start md:items-center xl:flex-row xl:justify-between xl:items-center">
                    <h1 className="font-black text-2xl text-white text-nowrap md:text-4xl">Популярные персоны</h1>
                    <Image layout="intrinsic" width={70} height={100} src="/line.png" alt="line" className="hidden mt-2 xl:block" />
                    <div className="mb-[4px] md:hidden">
                        <Sheet>
                            <SheetTrigger className="h-7 w-7 flex items-center justify-center rounded-[5px] cursor-pointer transition-all ease-in">
                                <RxHamburgerMenu color="white" size={20} className="mt-2 cursor-pointer" />
                            </SheetTrigger>
                            <SheetContent side="top" className="bg-[#1e2538c9]">
                                <SheetHeader>
                                    <SheetTitle className="text-center mx-auto"><Image width={800} height={500} src="/mainLogo.png" alt="" /></SheetTitle>
                                    <SheetDescription className="text-center mx-auto mt-3 pb-5">
                                        <ul className="flex flex-col items-center text-sm leading-10 font-semibold text-white">
                                            {yearsArr.map((str, indx) => (
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
                    <div className="hidden mt-2 md:flex w-[70%] justify-between xl:w-[30%]">
                        {yearsArr.map((str, indx) => (
                            <div key={indx} className="font-bold text-[15px] text-[#818181c5]">
                                <p
                                    onClick={() => setActText(indx)}
                                    className={`cursor-pointer transition-all duration-200 ease-in
                                    ${actText === indx ? "text-white" : "text-[#818181c5]"}`}>{str}</p>
                            </div>
                        ))}
                    </div>
                </div>




                <div className="mt-5">
                    <div className=" xl:flex justify-between gap-[20px]">
                        <div className="flex justify-between md:gap-4 xl:w-[70%]">

                            <div className="w-[180px] h-[180px] bg-no-repeat bg-cover bg-center rounded-[10px]  pt-[5px] pl-2 pb-3 md:h-[320px] md:w-full lg:h-[400px] xl:h-[100%]" style={{
                                backgroundImage: person && person[0] && person[0].profile_path
                                    ? `url(https://image.tmdb.org/t/p/w500${person[0].profile_path})`
                                    : 'none'
                            }} >
                                <div className="flex flex-col justify-between w-full h-full"><p className="text-[#F2F60F] font-medium text-[12px] md:text-[15px]">1-е место</p>
                                    <div>
                                        <p className="font-bold text-sm text-white md:text-[18px]">{person[0]?.name}</p>
                                        <p className="font-semibold text-[11px] text-[#FFFFFF59] text-shadow">{person[0]?.original_name}</p>
                                    </div>

                                </div>
                            </div>
                            <div className="w-[180px] h-[180px] bg-no-repeat bg-cover bg-center rounded-[10px] pt-[5px] pl-2 pb-3 md:h-[320px] md:w-full lg:h-[400px] xl:h-[100%]" style={{
                                backgroundImage: person && person[1] && person[1].profile_path
                                    ? `url(https://image.tmdb.org/t/p/w500${person[1].profile_path})`
                                    : 'none'
                            }} >
                                <div className="flex flex-col justify-between w-full h-full"><p className="text-[#F2F60F] font-medium text-[12px] md:text-[15px]">2-е место</p>
                                    <div>
                                        <p className="font-bold text-sm text-white md:text-[18px]">{person[4]?.name}</p>
                                        <p className="font-semibold text-[11px] text-[#FFFFFF59] text-shadow">{person[4]?.original_name}</p>
                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="bg-[#1B2133] rounded-[10px] p-5 mt-2 xl:w-[30%] xl:mt-0">
                            {person.slice(2, 7).map((item, index) => {
                                const randomNumber = Math.floor(Math.random() * (70 - 20 + 1)) + 20;

                                return (
                                    <div key={item.id} className="">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-bold text-[15px] text-white">{item?.name}</p>
                                                <p className="font-semibold text-[11px] text-[#3B486B]">{item?.original_name}</p>
                                                <p className="text-[#F2F60F] font-normal text-[11px]">{randomNumber} лет</p>
                                            </div>
                                            <p className="font-semibold text-[15px] text-[#F2F60F]">{index + 1}-место</p>
                                        </div>
                                        <hr className="border-0 h-[2px] w-full bg-[#1E2538]" />
                                    </div>
                                );
                            })}

                        </div>

                    </div>
                </div>
            </div >

        </>
    );
}

export default PopularPerson;