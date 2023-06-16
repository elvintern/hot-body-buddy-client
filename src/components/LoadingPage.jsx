import { useState, useEffect } from 'react';
import LoadingIcons from 'react-loading-icons';
// import landscape1 from '../../public/assets/loadingImages/landscape-1.jpg';
// import landscape2 from '../../public/assets/loadingImages/landscape-2.jpg';
// import landscape3 from '../../public/assets/loadingImages/landscape-3.jpg';
// import landscape4 from '../../public/assets/loadingImages/landscape-4.jpg';
// import landscape5 from '../../public/assets/loadingImages/landscape-5.jpg';
// import landscape6 from '../../public/assets/loadingImages/landscape-6.jpg';
// import portrait1 from '../../public/assets/loadingImages/portrait-1.jpg';
// import portrait2 from '../../public/assets/loadingImages/portrait-2.jpg';

function LoadingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingImage, setLoadingImage] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      let randNum = 1;
      if (window.innerWidth >= 992) {
        randNum = Math.floor(Math.random() * 6) + 1;
        setLoadingImage(`assets/loadingImages/landscape-${randNum}.jpg`);
      } else {
        randNum = Math.floor(Math.random() * 2) + 1;
        setLoadingImage(`assets/loadingImages/portrait-${randNum}.jpg`);
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
