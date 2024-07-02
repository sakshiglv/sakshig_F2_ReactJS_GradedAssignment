import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import './MovieList.css';

const MovieList = ({ category, searchQuery, onFavorite, onMovieClick, favorites = [] }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            let response;
            if (searchQuery) {
                response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=5c859c573cd256715a53fedc7ada81f0&query=${searchQuery}`);
            } else {
                const categoryMap = {
                    'coming-soon': 'upcoming',
                    'in-theaters': 'now_playing',
                    'top-rated-indian': 'top_rated&region=IN',
                    'top-rated': 'top_rated'
                };
                response = await fetch(`https://api.themoviedb.org/3/movie/${categoryMap[category]}?api_key=5c859c573cd256715a53fedc7ada81f0`);
            }
            const data = await response.json();
            setMovies(data.results || []);

            
        };
        fetchMovies();
    }, [category, searchQuery]);

    if (movies.length === 0) return <div>No movies found</div>;

    return (
        <div className="movie-list">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onFavorite={onFavorite}
                    onClick={onMovieClick}
                    isFavorite={favorites.some(fav => fav.id === movie.id)}
                />
            ))}
        </div>
    );
};

export default MovieList;
