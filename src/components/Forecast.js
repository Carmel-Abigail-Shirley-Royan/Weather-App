import React from 'react';
import dayjs from 'dayjs';

const Forecast = ({ forecastData, getWeatherImage }) => {
    if (!forecastData) return null;

    // Filter data to get only one entry per day (e.g., 12:00:00)
    const dailyForecasts = forecastData.list.filter((item) =>
        item.dt_txt.includes('12:00:00')
    );

    return (
        <div className="forecast-container">
            <h2>5-Day Forecast</h2>
            <div className="forecast">
                {dailyForecasts.slice(0, 5).map((day, index) => (
                    <div key={index} className="forecast-day">
                        <p>{dayjs(day.dt_txt).format('dddd')}</p>
                        <img src={getWeatherImage(day.weather[0].description)} alt="Weather" />
                        <p>{day.main.temp}°C</p>
                        <p>{day.weather[0].description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forecast;
