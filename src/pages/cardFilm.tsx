import Link from "next/link";
import React from "react";

interface CardFilmProps {

}

const CardFilm: React.FC<CardFilmProps> = () => {
    return (

        <>
            <Link href={"/"}>Back</Link>
            <h1>CardFilm</h1>
        </>
    );
}

export default CardFilm;