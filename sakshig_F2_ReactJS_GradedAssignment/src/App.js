import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import NavBar from './components/NavBar';
import Favorites from './components/Favorites';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import SearchBar from './components/SearchBar';
import Notification from './components/Notification';
import './styles.css';

const App = () => {
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [notification, setNotification] = useState({ message: '', type: '', visible: false });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  useEffect(() => {
    if (selectedMovie) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedMovie]);

  const handleFavorite = (movie) => {
    if (favorites.find(fav => fav.id === movie.id)) {
      setFavorites(favorites.filter(fav => fav.id !== movie.id));
      showNotification('Movie removed from Favorites', 'error');
    } else {
      setFavorites([...favorites, movie]);
      showNotification('Movie added to Favorites', 'success');
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type, visible: true });
    setTimeout(() => {
      setNotification({ message: '', type: '', visible: false });
    }, 1000);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeDetail = () => setSelectedMovie(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div>
        <NavBar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <motion.div
          className={`hero-section ${searchQuery ? 'hero-section-small' : ''}`}
          initial={{ height: '60vh' }}
          animate={{ height: searchQuery ? '25vh' : '60vh' }}
          transition={{ duration: 0.5 }}
        >
          <h1>Moviz</h1>
          <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} clearSearch={clearSearch} />
        </motion.div>
        <div className={`app ${selectedMovie ? 'blur-background' : ''}`}>
          <Routes>
            <Route path="/" element={<MovieList category="in-theaters" searchQuery={searchQuery} onFavorite={handleFavorite} onMovieClick={handleMovieClick} favorites={favorites} />} />
            <Route path="/favorites" element={<Favorites favorites={favorites} onMovieClick={handleMovieClick} onFavorite={handleFavorite} />} />
            <Route path="/coming-soon" element={<MovieList category="coming-soon" searchQuery={searchQuery} onFavorite={handleFavorite} onMovieClick={handleMovieClick} favorites={favorites} />} />
            <Route path="/in-theaters" element={<MovieList category="in-theaters" searchQuery={searchQuery} onFavorite={handleFavorite} onMovieClick={handleMovieClick} favorites={favorites} />} />
            <Route path="/top-rated-indian" element={<MovieList category="top-rated-indian" searchQuery={searchQuery} onFavorite={handleFavorite} onMovieClick={handleMovieClick} favorites={favorites} />} />
            <Route path="/top-rated" element={<MovieList category="top-rated" searchQuery={searchQuery} onFavorite={handleFavorite} onMovieClick={handleMovieClick} favorites={favorites} />} />
          </Routes>
        </div>
        <AnimatePresence>
          {selectedMovie && (
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
            >
              <MovieDetail
                movie={selectedMovie}
                onClose={closeDetail}
                onFavorite={handleFavorite}
                isFavorite={favorites.some(fav => fav.id === selectedMovie.id)}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {notification.visible && (
            <Notification
              message={notification.message}
              type={notification.type}
              visible={notification.visible}
            />
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
};

export default App;
