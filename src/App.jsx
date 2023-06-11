import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Quote from './components/Quote';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Routines from './pages/Routines';
import NotFound from './pages/NotFound';
import Workout from './pages/Workout';
import { AuthProvider } from './components/AuthContext';
import '../src/styles/main.scss';
import ProtectedRoutes from './ProtectedRoutes';
import About from './pages/About';

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
    };
  }, []);

  function handleBeforeInstallPrompt(event) {
    event.preventDefault();
    setDeferredPrompt(event);
  }

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
    <AuthProvider>
      <Router>
        <Header />
        <main className="main">
          <Quote />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="about" element={<About />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="profile/:userId">
                <Route index element={<Profile />} />
                <Route path="routine" element={<Routines />} />
                <Route path="workout/:workoutId" element={<Workout />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Router>
      <button
        id="install-button"
        onClick={handleInstallClick}
        style={{ display: deferredPrompt ? 'block' : 'none' }}
      >
        Install
      </button>
    </AuthProvider>
  );
}

export default App;
