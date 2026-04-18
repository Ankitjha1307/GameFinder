import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { useRoutes } from "../utils/routes";

export default function Logo(){
    const {toTop} = useRoutes();
    return(
        <button onClick={toTop}>
            <div className="flex items-center gap-2 text-2xl font-bold text-yellow-500 transition-transform hover:scale-110 hover:shadow-lg sm:text-3xl md:text-4xl">
            <FontAwesomeIcon icon={faGamepad}  className="text-yellow-500"/>
            <span> Gamezzz </span>
        </div>
        </button>
        
    )
}