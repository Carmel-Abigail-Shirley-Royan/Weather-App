import React, { useState } from 'react';
import Weather from './components/Weather';
import SearchBar from './components/SearchBar';
import './styles.css';
import Forecast from './components/Forecast';

const App = () => {
    const [city, setCity] = useState('Chennai');

    return (
        <div style={{ display: 'flex' }}> {/* Flex container for layout */}
            <div style={{ flex: 1 }}> {/* Left side for search bar and weather */}
                <SearchBar setCity={setCity} />
                <Weather city={city} />
            </div>
            <div style={{ flex: 1 }}> {/* Right side for forecast */}
                <Forecast city={city} />
            </div>
        </div>
    );
};

export default App;
