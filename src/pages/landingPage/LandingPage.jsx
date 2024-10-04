import VideoBg from "reactjs-videobg/dist/bundle.cjs";
import video from "../../assets/video-bg.mp4";
import { Container } from "react-bootstrap";
import "./LandingPage.scss";
import { useState } from "react";
import RegisterComponent from "../../components/RegisterComponent";

const LandingPage = () => {
  const [register, setRegister] = useState(false);

  return (
    <>
      <VideoBg>
        <VideoBg.Source src={video} type="video/mp4" />
      </VideoBg>
      <Container>
        <div className="hero d-flex justify-content-center align-items-center flex-column p-3 ">
          <h1 role="button" onClick={() => setRegister(false)} className="header">
            Game <span className="text-secondary">Vault</span>
          </h1>
          {register ? (
            <RegisterComponent />
          ) : (
            <>
              <p className="h2">
                Your game library on the <span className="text-secondary">go.</span>
              </p>
              <p className="h5">
                Already signed up? <span className="text-secondary">Login</span>
              </p>
              <p className="h5">
                Need an account?{" "}
                <span role="button" onClick={() => setRegister(true)} className="text-secondary">
                  Sign Up
                </span>
              </p>
            </>
          )}
        </div>
      </Container>
    </>
  );
};

export default LandingPage;
