import React, { useContext, useEffect, useState } from "react";
import { idCTX } from "@/context/idCTX";
import { options } from "@/exports";
import { BiDislike, BiLike } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FaArrowRightLong, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa6";
import { IoLogoVk, IoLogoYoutube } from "react-icons/io5";
import { MdRemoveRedEye } from "react-icons/md";

interface VideoData {
    key: string;
    name?: string;
    [key: string]: any;
}

interface YTStats {
    likeCount: string;
    viewCount: string;
}

const CardFilmTrailer: React.FC = () => {
    const [showTrailer, setShowTrailer] = useState<VideoData | null>(null);
    const [ytStats, setYtStats] = useState<YTStats | null>(null);

    const context = useContext(idCTX);
    const id = context?.params?.id;

    useEffect(() => {
        const fetchTrailerAndStats = async () => {
            if (!id) return;

            try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en`, options);
                const data = await res.json();
                const trailer = data.results?.[0];

                if (trailer) {
                    setShowTrailer(trailer);

                    // Запрос статистики YouTube
                    const statsRes = await fetch(
                        `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${trailer.key}&key=AIzaSyD7rrx0A_yR-HmvDDSfk2l2U0v9TIIusnE`
                    );
                    const statsData = await statsRes.json();
                    const stats = statsData.items?.[0]?.statistics;

                    if (stats) {
                        setYtStats({ likeCount: stats.likeCount, viewCount: stats.viewCount });
                    }
                }
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        };

        fetchTrailerAndStats();
    }, [id]);

    if (!context) {
        return <div>Ошибка: компонент должен быть внутри idCTX.Provider</div>;
    }

    if (!id || !showTrailer) {
        return <div>Loading...</div>;
    }
    function formatViews(views: string) {
        const num = parseInt(views, 10);
        if (isNaN(num)) return "-";

        if (num >= 1_000_000) {
            return (num / 1_000_000).toFixed(1).replace(".0", "") + " млн";
        } else if (num >= 1_000) {
            return (num / 1_000).toFixed(1).replace(".0", "") + " тыс";
        } else {
            return num.toString();
        }
    }
    return (
        <>
            <div className="mt-12">
                <div className="flex flex-col items-center md:flex-row justify-between md:items-center">
                    <h1 className="font-black text-3xl text-white text-nowrap md:text-4xl">Трейлеры фильма</h1>
                    <p className="flex text-white items-center gap-2 cursor-pointer transition-all duration-150 ease-in font-medium text-lg mt-2 hover:text-gray-300">
                        Все трейлеры <FaArrowRightLong color="white" />
                    </p>
                </div>

                <div>
                    <iframe
                        src={`https://www.youtube.com/embed/${showTrailer.key}`}
                        className="w-full h-[196px] mt-4 rounded-[10px] md:h-[350px] xl:h-[554px] 2xl:h-[754px]"
                    ></iframe>

                    <div className="flex justify-between mt-2">
                        <div className="w-[60%] md:w-full">
                            <h2 className="font-black text-xl text-white md:text-3xl">{showTrailer.name}</h2>

                            <div className="flex justify-between w-[150px] mt-3">
                                <IoLogoVk color="#686868" />
                                <FaInstagram color="#686868" />
                                <FaFacebookF color="#686868" />
                                <FaTwitter color="#686868" />
                                <IoLogoYoutube color="#686868" />
                                <BsThreeDots color="#686868" />
                            </div>
                        </div>

                        <div className="flex gap-4 justify-end w-[35%] md:w-[30%]">
                            <div className="text-center cursor-pointer">
                                <div className="w-[40px] h-[40px] bg-[#1B2133]  flex flex-col items-center justify-center rounded-md transition-all duration-150 ease-in hover:scale-[0.9] text-white  md:w-[50px] md:h-[50px]">
                                    <BiLike size={18} className="mb-[2px]" />
                                </div>
                                <span className="text-[12px] leading-none text-white font-normal">{ytStats?.likeCount ? formatViews(ytStats?.likeCount) : "-"}</span>
                            </div>

                            <div className="text-center cursor-pointer">
                                <div className="w-[40px] h-[40px] bg-[#1B2133]  flex flex-col items-center justify-center rounded-md transition-all duration-150 ease-in hover:scale-[0.9] p-2 text-white  md:w-[50px] md:h-[50px]">
                                    <MdRemoveRedEye size={18} className="mb-[2px]" />
                                </div>
                                <span className="text-[12px] text-white font-normal leading-none">{ytStats?.viewCount ? formatViews(ytStats?.viewCount) : "-"}  </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardFilmTrailer;
