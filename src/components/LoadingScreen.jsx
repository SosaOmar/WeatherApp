import React from 'react'
import imagen from "../../public/772.svg";

const LoadingScreen = () => {
    return (
        <div className="loadingg">
            <img src={imagen} alt="" />
            <h2>WeatherApp wants to know your location ...</h2>
        </div>
    )
}

export default LoadingScreen