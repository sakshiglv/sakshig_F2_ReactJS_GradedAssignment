import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';

const SearchBar = ({ searchQuery, handleSearch, clearSearch }) => {
    return (
        <div className="search-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearch}
                className="search-bar"
            />
            {searchQuery && <FontAwesomeIcon icon={faTimes} className="clear-icon" onClick={clearSearch} />}
        </div>
    );
};

export default SearchBar;
