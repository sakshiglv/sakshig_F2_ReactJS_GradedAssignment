import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';


const NavBar = ({ toggleDarkMode, darkMode }) => {
    const navigate = useNavigate();
    const refreshPage = () => {
        navigate(0);
    };
    <FontAwesomeIcon icon="fa-solid fa-record-vinyl" />
    return (
        <nav className="nav-bar">
            <div className="nav-logo" onClick={refreshPage}>
                <FontAwesomeIcon icon={faCompactDisc} spin />
            </div>
            <NavLink to="/in-theaters">Movies In Theaters</NavLink>
            <NavLink to="/coming-soon">Coming Soon</NavLink>
            <NavLink to="/top-rated-indian">Top Rated Indian Movies</NavLink>
            <NavLink to="/top-rated">Top Rated Movies</NavLink>
            <NavLink to="/favorites">Favorites</NavLink>
            <div className="theme-toggle" onClick={toggleDarkMode}>
                <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            </div>
        </nav>
    );
};

export default NavBar;
