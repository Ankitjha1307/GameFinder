import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { useRoutes } from "../utils/routes";

export default function Logo(){
    const {toTop} = useRoutes();
    return(
        <button onClick={toTop}>
            <div className="flex items-center gap-2 text-4xl ml-14 mt-2 mr-2 font-bold text-yellow-500 hover:shadow-lg hover:scale-110 transition-transform">
            <FontAwesomeIcon icon={faGamepad}  className="text-yellow-500"/>
            <span> Gamezzz</span>
        </div>
        </button>
        
    )
}