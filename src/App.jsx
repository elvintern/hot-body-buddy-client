import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
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
import { usePwa } from 'vite-plugin-pwa-utils';

function App() {
  const { deferredPrompt } = usePwa();

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      deferredPrompt.current = event;
      document.getElementById('install-button').style.display = 'block';
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
    };
  }, [deferredPrompt]);

  function installApp() {
    if (deferredPrompt.current) {
      deferredPrompt.current.prompt();

      deferredPrompt.current.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the installation prompt.');
        } else {
          console.log('User dismissed the installation prompt.');
        }
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
        onClick={installApp}
        style={{ display: 'none' }}
      >
        Install
      </button>
    </AuthProvider>
  );
}

export default App;
