import { useState, useEffect } from 'react';
import LoadingIcons from 'react-loading-icons';

function LoadingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingImage, setLoadingImage] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      let randNum = 1;
      if (window.innerWidth >= 992) {
        randNum = Math.floor(Math.random() * 6) + 1;
        setLoadingImage(
          `../../public/assets/loadingImages/landscape-${randNum}.jpg`
        );
      } else {
        randNum = Math.floor(Math.random() * 2) + 1;
        setLoadingImage(
          `../../public/assets/loadingImages/portrait-${randNum}.jpg`
        );
      }
      console.log(randNum);

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
            background: `url('${loadingImage}') center/cover`,
          }}
        >
          <LoadingIcons.BallTriangle className="loading-icon" width={'50rem'} />
        </div>
      )}
    </>
  );
}

export default LoadingPage;
