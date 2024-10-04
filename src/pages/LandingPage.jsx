import VideoBg from "reactjs-videobg/dist/bundle.cjs";
import video from "../assets/video-bg.mp4";

const LandingPage = () => {
  return (
    <>
      <VideoBg>
        <VideoBg.Source src={video} type="video/mp4" />
      </VideoBg>
    </>
  );
};

export default LandingPage;
