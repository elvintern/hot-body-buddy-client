import { Link } from 'react-router-dom';
import './Nav.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import installApp from '../App';

const Nav = ({ navProps }) => {
  const userId = localStorage.getItem('id');
  const { isLoggedIn, logout, showNavbar, navRef } = navProps;

  const hideNavbar = () => {
    navRef.current.classList.remove('nav--responsive');
  };

  const handleClick = () => {
    hideNavbar();
    if (isLoggedIn) {
      logout();
      localStorage.clear();
    }
  };

  return (
    <nav ref={navRef} className="nav">
      <Link
        className="nav__link"
        onClick={hideNavbar}
        to={isLoggedIn ? `/profile/${userId}` : '/'}
      >
        Home
      </Link>
      <Link className="nav__link" onClick={hideNavbar} to="/about">
        About us
      </Link>
      <Link
        className="nav__link"
        onClick={hideNavbar}
        to={isLoggedIn ? `/profile/${userId}` : '/'}
      >
        Profile
      </Link>

      <button
        id="install-button"
        className="nav__link"
        onClick={installApp}
        style={{ display: 'none' }}
      >
        Install
      </button>

      <Link className="nav__link" onClick={handleClick} to="/">
        {isLoggedIn ? 'Logout' : 'Login'}
      </Link>
      <button className="nav__btn nav__btn--close" onClick={showNavbar}>
        <FontAwesomeIcon icon={faRectangleXmark} />
      </button>
    </nav>
  );
};

export default Nav;
