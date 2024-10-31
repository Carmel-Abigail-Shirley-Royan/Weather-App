import React, { useState } from 'react';
import Search1 from '../images/search.jpg'; // Ensure the path is correct
import '.././styles.css'; 

const SearchBar = ({ setCity }) => {
    const [input, setInput] = useState('');

    const handleSearch = () => {
        if (input.trim() !== '') {
            setCity(input);
            setInput(''); // Clear input after search
        }
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search city"
            />
            <button onClick={handleSearch} className="search-button">
                <img src={Search1} alt="search icon" className="search-icon" />
            </button>
        </div>
    );
};

export default SearchBar;
