import { options } from "@/exports";
import React, { useEffect, useState } from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoLogoVk, IoLogoYoutube } from "react-icons/io5";
import { TbPlayerPlayFilled } from "react-icons/tb";

interface NewTrailersProps {
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
interface VideoData {
    key: string;
    [key: string]: any;
}

const NewTrailers: React.FC<NewTrailersProps> = () => {

    const [trailer, setTrailer] = useState<NewTrailersProps[]>([])

    const PopularUrl = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"


    const [stateVideo, setStateVideo] = useState<VideoData | null>(null);


    useEffect(() => {

        fetch(PopularUrl, options)
            .then(res => res.json())
            .then(res => setTrailer(res.results)
            )

    }, [PopularUrl])


    const showMovie = (id: number) => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, options)
            .then(res => res.json())
            .then(res => {
                let rnd = Math.floor(Math.random() * res.results.length)
                const selectMovie = res.results[rnd]
                
                setStateVideo(selectMovie)

            })
    }





    return (
        <>

            <div className="w-full mt-8 md:mt-[50px]">
                <div className="flex flex-col  items-center md:flex-row justify-between md:items-center">
                    <h1 className="font-black text-3xl text-white text-nowrap md:text-4xl">Новые трейлеры</h1>
                    <p className="flex text-white items-center gap-2 cursor-pointer transition-all duration-150 ease-in font-medium text-lg mt-2  hover:text-gray-300">Все трейлеры <FaArrowRightLong color="white" /></p>
                </div>
                <div >
                    <iframe src={stateVideo !== null ? `https://www.youtube.com/embed/${stateVideo?.key}` : "https://www.youtube.com/embed/55qOCxcLj6o?si=e6mHoqLpZgFRagT"}
                        className="w-full h-[196px] mt-4 rounded-[10px] md:h-[350px] xl:h-[554px] 2xl:h-[754px]"
                    ></iframe>
                    <div className="flex justify-between mt-2">
                        <div>
                            <h2 className="font-black text-2xl text-white md:text-3xl">Жеки чан </h2>
                            <div className="flex justify-between mt-3"> <IoLogoVk color="#686868" />
                                <FaInstagram color="#686868" />
                                <FaFacebookF color="#686868" />
                                <FaTwitter color="#686868" />
                                <IoLogoYoutube color="#686868" />
                                <BsThreeDots color="#686868" />

                            </div>
                        </div>
                        <div className="flex gap-1">
                            <div className="text-center cursor-pointer">
                                <div className="w-[40px] h-[40px] bg-[#1B2133]  flex flex-col items-center justify-center rounded-md transition-all duration-150 ease-in hover:scale-[0.9] text-white  md:w-[50px] md:h-[50px]">
                                    <BiLike size={18} className="mb-[2px]" />
                                </div>
                                <span className="text-[12px] leading-none text-white font-normal">3245</span>
                            </div>

                            <div className="text-center cursor-pointer">
                                <div className="w-[40px] h-[40px] bg-[#1B2133]  flex flex-col items-center justify-center rounded-md transition-all duration-150 ease-in hover:scale-[0.9] p-2 text-white  md:w-[50px] md:h-[50px]">
                                    <BiDislike size={18} className="mb-[2px]" />
                                </div>
                                <span className="text-[12px] text-white font-normal leading-none">313</span>
                            </div>
                        </div>
                    </div>
                </div>




                <div className="flex items-center gap-2 overflow-y-auto w-full scrollbar-custom mt-5 ">
                    {trailer.map((item) => (
                        <div key={item.id} className="transform rotate-180 pt-4">
                            <div
                                className="group w-[178px] h-[127px] relative cursor-grab bg-no-repeat bg-center bg-cover rounded-[10px] md:w-[200px] md:h-[130px] xl:w-[260px] xl:h-[180px]"
                                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.backdrop_path})` }}
                                onClick={() => {
                                    showMovie(item?.id)
                                }}
                            >

                                <TbPlayerPlayFilled
                                    color="white"
                                    size={25}
                                    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2  transition-transform duration-300 ease-in-out group-hover:scale-[1.3] z-10"
                                />

                                <div className="absolute top-0 left-0 z-[3] w-full h-full rounded-lg bg-[#3657CBA6] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center cursor-pointer"></div>
                            </div>

                            <p className="font-extrabold text-sm text-white truncate-text">{item.title}</p>

                        </div>
                    ))}
                </div>

            </div>
        </>
    );
}

export default NewTrailers;