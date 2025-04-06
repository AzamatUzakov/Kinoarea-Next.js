import { Checkbox } from "@radix-ui/react-checkbox";
import { Button } from "../ui/button";
import { IoLogoVk, IoLogoYoutube } from "react-icons/io5";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <footer>

                <div className="relative w-full h-full bg-cover  bg-center bg-no-repeat object-cover rounded-[10px] p-5 text-center lg:py-20" style={{ backgroundImage: "url('/footer-BG.png')" }}>
                    {/*                     <img src="/footer-BG.png" className="w object-cover  absolute top-0 left-0" alt="" />
 */}
                    <div className="md:w-[70%] mx-auto lg:w-[60%]">
                        <img src="/footer-logo.png" alt="main-footer-logo" className="mx-auto" />
                        <h3 className="font-black text-2xl text-white mt-4 mb-5 lg:text-4xl">Подпишитесь на <br className="md:hidden " /> E-mail рассылку</h3>
                        <p className="text-white font-medium text-sm lg:text-xl">Если хотиет быть в курсе последних новостей и новинок кино - заполните форму ниже и оформите бесплатную E-mail рассылку! </p>
                        <form action="" className="mt-7">
                            <div className="md:flex items-center gap-2 ">
                                <input type="email"
                                    placeholder="Введите свой E-mail адрес" className="bg-white w-full h-[66px] rounded-[10px] text-center text-[#151A2699] font-normal" />
                                <Button className="w-full bg-[#F2F60F] h-[66px] rounded-[10px] text-center text-[#000000] font-bold mt-2 cursor-pointer transition-all duration-300 ease-in hover:bg-gray-300 md:w-[30%] md:mt-0">Подписаться</Button>
                            </div>
                            <label className="flex items-start justify-start gap-1 mt-5  text-white text-sm font-normal cursor-pointer md:gap-3 md:text-[16px]">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 mt-1 cursor-pointer accent-yellow-400 border-0"

                                />
                                <span className="text-start w-full">
                                    Соглашаюсь на условия{" "}
                                    <a href="#" className="text-yellow-300 underline    underline-offset-2 hover:text-yellow-200 ">
                                        политики конфиденциальности
                                    </a>
                                </span>
                            </label>
                        </form>


                    </div>
                </div>
                <div className="flex justify-between mt-6 cursor-pointer w-[50%] mx-auto lg:w-[20%]">
                    <IoLogoVk color="#686868" />
                    <FaInstagram color="#686868" />
                    <FaFacebookF color="#686868" />
                    <FaTwitter color="#686868" />
                    <IoLogoYoutube color="#686868" />
                </div>

                <ul className="flex flex-col items-center text-[15px] leading-7  gap-1 font-medium text-white w-[50%] justify-between mx-auto mt-6 md:flex-row md:w-[80%] lg:w-[60%] lg:my-10 ">
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
                <div className="text-center mt-5 text-sm text-[#E3E6F0B8] font-normal">
                    <a href="#" className="">2020 © Kinoarea.  Все права защищены</a> <br />
                    <a href="#" className="underline">Политика конфиденциальности</a>
                </div>
            </footer>
        </>
    );
}

export default Footer;