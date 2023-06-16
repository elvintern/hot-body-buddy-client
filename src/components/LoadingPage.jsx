import { useState, useEffect } from 'react';
import LoadingIcons from 'react-loading-icons';
import landscape6 from '../../public/assets/loadingImages/landscape-6.jpg';
import portrait1 from '../../public/assets/loadingImages/portrait-1.jpg';

function LoadingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLandscape, setIsLandscape] = useState(true);

  useEffect(() => {
    console.log(landscape6, portrait1);
    const loadImage = async () => {
      if (window.innerWidth >= 992) {
        setIsLandscape(true);
      } else {
        setIsLandscape(false);
      }

      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    };

    loadImage();
  }, []);

  return (
    <>
      {isLoading && (
        <div
          className="loading-image"
          style={{
            background: `url(${
              isLandscape ? landscape6 : portrait1
            }) center/cover`,
          }}
        >
          <LoadingIcons.BallTriangle className="loading-icon" width={'50rem'} />
        </div>
      )}
    </>
  );
}

export default LoadingPage;
