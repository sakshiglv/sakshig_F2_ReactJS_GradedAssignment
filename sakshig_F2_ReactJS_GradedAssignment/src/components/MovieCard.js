import React, { useEffect, useState } from 'react';
import { BookmarkFillIcon, BookmarkIcon } from '@primer/octicons-react';
import ColorThief from 'color-thief-browser';
import './MovieCard.css';

const getLuminance = (rgb) => {
    const [r, g, b] = rgb.map(value => {
        const normalized = value / 255;
        return normalized <= 0.03928 ? normalized / 12.92 : Math.pow((normalized + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const MovieCard = ({ movie, onFavorite, onClick, isFavorite }) => {
    const [bgColor, setBgColor] = useState('transparent');
    const [textColor, setTextColor] = useState('#000');

    useEffect(() => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        img.onload = () => {
            const colorThief = new ColorThief();
            const result = colorThief.getColor(img);
            setBgColor(`rgb(${result[0]}, ${result[1]}, ${result[2]})`);
            const luminance = getLuminance(result);
            setTextColor(luminance > 0.5 ? '#000' : '#fff');
        };
        img.onerror = () => {
            console.error("Failed to load image for ColorThief");
        };
    }, [movie.poster_path]);

    return (
        <div className="movie-card" onClick={() => onClick(movie)} style={{ backgroundColor: bgColor }}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} crossOrigin="anonymous" />
            <div className="movie-title-fav" style={{ color: textColor }}>
                <h3 style={{ color: textColor }}>{movie.title}</h3>
                <button
                    className="favorite-icon"
                    onClick={(e) => {
                        e.stopPropagation();
                        onFavorite(movie);
                    }}
                    style={{ color: textColor }}
                >
                    {isFavorite ? <BookmarkFillIcon size={24} /> : <BookmarkIcon size={24} />}
                </button>
            </div>
        </div>
    );
};

export default MovieCard;
