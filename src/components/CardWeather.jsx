import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import Clock from './Clock'
import LoadingScreen from './LoadingScreen'

const CardWeather = ({ lon, lat }) => {

  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [celsius, setCelsius] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (lat) {
      const APIkey = "b82164faf94d09fc9bdfb092942ef8fb"

      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`

      axios.get(URL)
        .then(res => {
          setWeather(res.data)
          const temperature = {
            celsius: `${Math.floor(res.data.main.temp - 273.15)}°C`,
            fahrenheit: `${Math.floor((res.data.main.temp - 273.15) * 9 / 5 + 32)}°F`
          }
          setTemperature(temperature)
          setIsLoading(false)
        })

        .catch(err => console.log(err + "hola"))
    }
  }, [lon, lat])

  const changeTemperature = () => {
    if (celsius) {
      setCelsius(false)
    }
    else setCelsius(true)
  }

  if (isLoading) {
    return <LoadingScreen/>
  }else{
    return (
      <div className='container'>
        <div className="location">
          <div className="your_location">
          <i className="fa-solid fa-location-dot"></i>
            <p>Your location now</p>
          </div>
          <h2>{`${weather?.name}, ${weather?.sys.country}`}</h2>
        </div>
  
        <Clock />
        <div className="description">
          <div className="image"><img src={weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" /></div>
          <p>{weather?.weather[0].description}</p>
        </div>
        <p className='temperature'>{!celsius ? temperature?.celsius : temperature?.fahrenheit}</p>
        <div className="items">
          <div className="wind">
            <i className="fa-solid fa-wind"></i>
            <p>{weather?.wind.speed} m/s</p>
          </div>
          <div className="cloud">
            <i className="fa-solid fa-cloud"></i>
            <p>{weather?.clouds.all}%</p>
          </div>
  
          <div className="droplet">
            <i className="fa-solid fa-droplet"></i>
            <p>{weather?.main.humidity}%</p>
          </div>
        </div>
        <button className='change' onClick={changeTemperature}><i className="fa-solid fa-arrows-rotate">{celsius ? "°C" : "°F"}</i></button>
      </div>
    )
  }
}

export default CardWeather