import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css';  // Ensure the path to the CSS file is correct
import WeatherDetails from './WeatherDetails';
// Import images for weather conditions
import snowImage from '../images/snowy.png';
import partlyRainyImage from '../images/partly_rainy.png';
import cloudyImage from '../images/cloudy.png';
import sunnyImage from '../images/sunny.png';
import partlyCloudyImage from '../images/partly_cloudy.png';
import heavyRainImage from '../images/heavy_rain.png';
import mistImage from '../images/mist.png';
import Img1 from '../images/humidity.jpg';  // Adjust if necessary
import Img2 from '../images/speed.jpg';  // Adjust if necessary

import Forecast from './Forecast';  // Import your Forecast component

const getWeatherImage = (description) => {
    if (description.includes('snow')) {
        return snowImage;
    } else if (description.includes('heavy rain') || description.includes('heavy intensity rain')) {
        return heavyRainImage;
    } else if (description.includes('light rain') || description.includes('drizzle')) {
        return partlyRainyImage;
    } else if (description.includes('mist') || description.includes('drizzle')) {
        return mistImage;
    } else if (description.includes('clouds')) {
        return description.includes('few clouds') ? partlyCloudyImage : cloudyImage;
    } else if (description.includes('clear')) {
        return sunnyImage;
    } else {
        return sunnyImage;
    }
};

const Weather = ({ city }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);  // State to store forecast data
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // Fetch current weather data
                const weatherResponse = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=01fc3f356ef4525d0a2f61da8a538b5a`
                );

                // Fetch 5-day forecast data
                const forecastResponse = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=01fc3f356ef4525d0a2f61da8a538b5a`
                );

                // Set state with both weather and forecast data
                setWeatherData(weatherResponse.data);
                setForecastData(forecastResponse.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching the weather data:', error.response ? error.response.data : error.message);
                setError('Unable to fetch weather data. Please try again later.');
            }
        };
        fetchWeather();
    }, [city]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!weatherData || !forecastData) {
        return <p>Loading...</p>;
    }

    const { temp, humidity } = weatherData.main;
    const { description } = weatherData.weather[0];
    const windSpeed = (weatherData.wind.speed * 3.6).toFixed(1);  // Converting m/s to km/h


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                {/* Current Weather */}
                <div className="current-weather">
                    <img src={getWeatherImage(description)} alt="Weather condition" style={{
                        width: '100px',
                        height: 'auto',
                        backgroundColor: 'transparent',  // Background is transparent
                        mixBlendMode: 'normal', 
                        marginBottom: '10px'  // Blend mode is normal
                    }}
                    />
                    <div className="weather-details">
                        <h1>{temp}°C</h1>
                        <h2>{weatherData.name}</h2>
                        <p>{description}</p>
                        <div >
                            <p className="humidity"><img src={Img1} alt="Humidity" className="icon" />{humidity}%</p>
                            <p className="wind-speed"><img src={Img2} alt="Wind Speed" className="icon" />{windSpeed} km/h</p>
                        </div>
                    </div>
                </div>

                {/* Forecast Component */}
                <div className='forecast-container'>
                    <Forecast forecastData={forecastData} getWeatherImage={getWeatherImage} />
                </div>
            </div>
            <WeatherDetails weatherData={weatherData} />
        </div>
    );
};

export default Weather;
