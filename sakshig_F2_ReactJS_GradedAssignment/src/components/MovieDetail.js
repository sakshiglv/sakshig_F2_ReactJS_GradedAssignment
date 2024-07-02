import React, { useEffect, useState } from 'react';
import { XIcon } from '@primer/octicons-react';
import { BookmarkFillIcon, BookmarkIcon } from '@primer/octicons-react';
import './MovieDetail.css';

const API_KEY = '5c859c573cd256715a53fedc7ada81f0';

const MovieDetail = ({ movie, onClose, onFavorite, isFavorite }) => {
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&append_to_response=credits`);
            const data = await response.json();
            setMovieDetails(data);
        };

        fetchMovieDetails();
    }, [movie.id]);

    if (!movieDetails) {
        return <div>Loading...</div>;
    }

    const { release_date, runtime, genres, vote_average, adult, credits } = movieDetails;

    const genresList = genres.map(genre => genre.name).join(', ');
    const castList = credits.cast.slice(0, 5).map(actor => actor.name).join(', ');

    return (
        <div className="movie-detail-overlay" onClick={onClose}>
            <div className="movie-detail" onClick={(e) => e.stopPropagation()}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} crossOrigin="anonymous" />
                <div className="movie-detail-info">
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                    <p><strong>Release Date:</strong> {release_date}</p>
                    <p><strong>Runtime:</strong> {runtime} minutes</p>
                    <p><strong>Genres:</strong> {genresList}</p>
                    <p><strong>Rating:</strong> {vote_average}/10</p>
                    <p><strong>Content Rating:</strong> {adult ? 'Adult' : 'General'}</p>
                    <p><strong>Cast:</strong> {castList}</p>
                </div>
                <div className="movie-detail-buttons">
                    <button className="favorite-icon" onClick={(e) => {
                        e.stopPropagation();
                        onFavorite(movie);
                    }}>
                        {isFavorite ? <BookmarkFillIcon size={24} /> : <BookmarkIcon size={24} />}
                    </button>
                    <button className="close-button" onClick={onClose}>
                        <XIcon size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
