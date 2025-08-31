import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";


export default function Logo(){
    return(
        <div className="flex items-center gap-2 text-2xl ml-2 mt-2 font-bold text-yellow-500 hover:shadow-lg hover:scale-110 transition-transform">
            <FontAwesomeIcon icon={faGamepad}  className="text-yellow-500"/>
            <span> Gamezzz</span>
        </div>
    )
}