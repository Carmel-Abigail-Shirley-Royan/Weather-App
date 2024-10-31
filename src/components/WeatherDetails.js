import React from 'react';

const WeatherDetails = ({ weatherData }) => {
    // Handle loading state or undefined weatherData
    if (!weatherData || !weatherData.current || !weatherData.current.main) {
        return <p>Loading...</p>; // Show loading indicator until data is available
    }

    const { main, wind, clouds } = weatherData.current;
    const { temp = 0, feels_like = 0, humidity = 0 } = main; // Provide default values
    const windSpeed = wind?.speed ? (wind.speed * 3.6).toFixed(1) : 'N/A';  // Convert m/s to km/h
    const windGust = wind?.gust ? (wind.gust * 3.6).toFixed(1) : 'N/A';
    const cloudCover = clouds?.all || 'N/A';

    return (
        <div className="weather-details-cards">
            <div className="card">
                <h3>Temperature</h3>
                <p>{temp}°C</p>
                <p>Steady at current value of {temp}°</p>
            </div>

            <div className="card">
                <h3>Feels Like</h3>
                <p>{feels_like}°C</p>
                <p>Feels warmer due to humidity</p>
            </div>

            <div className="card">
                <h3>Cloud Cover</h3>
                <p>Partly Cloudy ({cloudCover}%)</p>
            </div>

            <div className="card">
                <h3>Wind</h3>
                <p>{windSpeed} km/h</p>
                <p>Gusts up to {windGust} km/h</p>
            </div>

            <div className="card">
                <h3>Humidity</h3>
                <p>{humidity}%</p>
            </div>
        </div>
    );
};

export default WeatherDetails;
