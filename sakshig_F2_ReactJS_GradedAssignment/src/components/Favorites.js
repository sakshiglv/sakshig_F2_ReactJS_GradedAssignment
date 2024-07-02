import React from 'react';
import MovieCard from '../components/MovieCard';
import './Favorites.css';

const Favorites = ({ favorites, onMovieClick, onFavorite }) => (
    <div className="favorites">
        <div className="movie-list">
            {favorites.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onFavorite={onFavorite}
                    onClick={onMovieClick}
                    isFavorite={true}
                />
            ))}
        </div>
    </div>
);

export default Favorites;
