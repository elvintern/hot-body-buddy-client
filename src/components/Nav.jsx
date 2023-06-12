import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Nav.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';

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

  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    console.log('test');
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    self.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      self.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
    };
  }, []);

  function handleInstallClick() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User installed the app');
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null);
      });
    }
  }

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
      <button
        id="install-button"
        className="nav__link nav__link--install"
        onClick={handleInstallClick}
        style={{ display: deferredPrompt ? 'block' : 'none' }}
      >
        Install
      </button>
      <Link
        className="nav__link"
        onClick={hideNavbar}
        to={isLoggedIn ? `/profile/${userId}` : '/'}
      >
        Profile
      </Link>
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
