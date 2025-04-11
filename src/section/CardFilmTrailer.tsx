import React from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FaArrowRightLong, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa6";
import { IoLogoVk, IoLogoYoutube } from "react-icons/io5";


const CardFilmTrailer: React.FC= () => {
    return (


        <>

            <div>
                <div className="flex flex-col  items-center md:flex-row justify-between md:items-center">
                    <h1 className="font-black text-3xl text-white text-nowrap md:text-4xl">Новые трейлеры</h1>
                    <p className="flex text-white items-center gap-2 cursor-pointer transition-all duration-150 ease-in font-medium text-lg mt-2  hover:text-gray-300">Все трейлеры <FaArrowRightLong color="white" /></p>
                </div>
                <div >
                  {/*   <iframe src={stateVideo !== null ? `https://www.youtube.com/embed/${stateVideo?.key}` : "https://www.youtube.com/embed/55qOCxcLj6o?si=e6mHoqLpZgFRagT"}
                        className="w-full h-[196px] mt-4 rounded-[10px] md:h-[350px] xl:h-[554px] 2xl:h-[754px]"
                    ></iframe>
                   */}  <div className="flex justify-between mt-2">
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

            </div>

        </>
    );
}

export default CardFilmTrailer;