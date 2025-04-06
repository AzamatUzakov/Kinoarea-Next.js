import { RxHamburgerMenu } from "react-icons/rx";
import { Button } from "../ui/button";
import { IoLogoVk, IoSearchSharp } from "react-icons/io5";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import Link from "next/link";


const Header = () => {
    return (
        <>
            <header>
                <div className="flex justify-between lg:items-center">
                    <div className="flex gap-1.5">
                        <Sheet >
                            <SheetTrigger className="h-7 w-7 flex items-center justify-center rounded-[5px] cursor-pointer  bg-white transition-all ease-in hover:bg-gray-100 md:hidden">
                                <RxHamburgerMenu color="#3657CB" className="" size={18} />
                            </SheetTrigger>
                            <SheetContent side="top" className="bg-[#1e2538c9]" >
                                <SheetHeader>
                                    <SheetTitle className="text-center mx-auto"><img src="/mainLogo.png" alt="" /></SheetTitle>
                                    <SheetDescription className="text-center mx-auto mt-3 pb-5">

                                        <ul className="flex flex-col items-center text-sm leading-10 font-semibold text-white">
                                            <li className="relative group w-fit cursor-pointer">
                                                Афиша
                                                <span className="absolute left-0 bottom-0  h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                                            </li>
                                            <li className="relative group w-fit cursor-pointer">
                                                Медиа
                                                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                                            </li>
                                            <li className="relative group w-fit cursor-pointer">
                                                Фильмы
                                                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                                            </li>
                                            <li className="relative group w-fit cursor-pointer">
                                                Актёры
                                                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                                            </li>
                                            <li className="relative group w-fit cursor-pointer">
                                                Новости
                                                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                                            </li>
                                            <li className="relative group w-fit cursor-pointer">
                                                Подборки
                                                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                                            </li>
                                            <li className="relative group w-fit cursor-pointer">
                                                Категории
                                                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                                            </li>
                                        </ul>


                                    </SheetDescription>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                        <div className="h-7 w-7 md:w-[100px] lg:hidden">
                            <button className="h-7 w-7 flex items-center justify-center rounded-[5px] cursor-pointer  bg-white transition-all ease-in border-0 hover:bg-gray-100 md:rounded-[10px] md:h-10 md:w-10"><IoSearchSharp color="#3657CB" size={20} /></button>
                        </div>
                    </div>

                    <div className="">
                        <Link href={"/"}>    <img src="/mainLogo.png" width={"100px"} className="cursor-pointer" alt="mainLogo" /></Link>
                        <div className="flex justify-between mt-2 cursor-pointer">
                            <IoLogoVk color="#686868" />
                            <FaInstagram color="#686868" />
                            <FaFacebookF color="#686868" />
                            <FaTwitter color="#686868" />
                        </div>
                    </div>
                    <ul className="hidden items-center text-[15px]  gap-1 font-semibold text-white w-[50%] justify-between mx-auto mt-6 lg:flex lg:w-[60%]">
                        <li className="relative group w-fit cursor-pointer">
                            Афиша
                            <span className="absolute left-0 bottom-0  h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                        </li>
                        <li className="relative group w-fit cursor-pointer">
                            Медиа
                            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                        </li>
                        <li className="relative group w-fit cursor-pointer">
                            Фильмы
                            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                        </li>
                        <li className="relative group w-fit cursor-pointer">
                            Актёры
                            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                        </li>
                        <li className="relative group w-fit cursor-pointer">
                            Новости
                            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                        </li>
                        <li className="relative group w-fit cursor-pointer">
                            Подборки
                            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                        </li>
                        <li className="relative group w-fit cursor-pointer">
                            Категории
                            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                        </li>
                    </ul>


                    <div className="lg:flex gap-1">
                        <button className="h-10 w-10  hidden  items-center justify-center rounded-[5px] cursor-pointer  bg-white transition-all ease-in border-0 hover:bg-gray-100 lg:flex"><IoSearchSharp color="#3657CB" size={20} /></button>
                        <Button className="bg-[#3657CB] h-8 w-[66px] text-sm font-semibold cursor-pointer transition-all duration-500 shadow-[0px_0px_15px_0px_#4871FFCC] hover:bg-gray-300 hover:text-black md:h-10 md:w-[100px]">Войти</Button>
                    </div> 

                </div>

                <ul className="hidden items-center text-[13px]  font-semibold text-white w-[75%] justify-between  mx-auto mt-6 md:flex md:gap-1 lg:hidden">
                    <li className="relative group w-fit cursor-pointer">
                        Афиша
                        <span className="absolute left-0 bottom-0  h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </li>
                    <li className="relative group w-fit cursor-pointer">
                        Медиа
                        <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </li>
                    <li className="relative group w-fit cursor-pointer">
                        Фильмы
                        <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </li>
                    <li className="relative group w-fit cursor-pointer">
                        Актёры
                        <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </li>
                    <li className="relative group w-fit cursor-pointer">
                        Новости
                        <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </li>
                    <li className="relative group w-fit cursor-pointer">
                        Подборки
                        <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </li>
                    <li className="relative group w-fit cursor-pointer">
                        Категории
                        <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </li>
                </ul>
            </header>
        </>
    );
}

export default Header;