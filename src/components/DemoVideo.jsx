import video from '../assets/HBB-DEMO.mp4';
import './DemoVideo.scss';

const DemoVideo = () => {
  return (
    <div className="video-container">
      <video
        data-testid="video"
        className="video-container__content"
        src={video}
        controls
      ></video>
    </div>
  );
};

export default DemoVideo;
