import VideoBg from "reactjs-videobg/dist/bundle.cjs";
import video from "../../assets/video-bg.mp4";
import { Button, Container } from "react-bootstrap";
import "./LandingPage.scss";
import { useState } from "react";
import RegisterComponent from "../../components/RegisterComponent";
import { ArrowLeft } from "react-bootstrap-icons";
import LoginComponent from "../../components/LoginComponent";

const LandingPage = () => {
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);

  return (
    <>
      <VideoBg>
        <VideoBg.Source src={video} type="video/mp4" />
      </VideoBg>
      <Container>
        <div className="hero d-flex justify-content-center align-items-center flex-column p-3 ">
          <div className="d-flex justify-content-center align-items-center">
            {register || login ? (
              <Button
                variant="primary"
                onClick={() => {
                  setRegister(false);
                  setLogin(false);
                }}
                className="rounded rounded-circle me-3 backButton"
              >
                <ArrowLeft />
              </Button>
            ) : (
              ""
            )}
            <h1 role="button" onClick={() => setRegister(false)} className="header">
              Power <span className="text-primary">Up</span>
            </h1>
          </div>
          {login && <LoginComponent />}
          {register && <RegisterComponent />}
          {!register && !login && (
            <>
              <p className="h2">
                Step Up your game <span className="text-primary">collection.</span>
              </p>
              <p className="h5">
                Already signed up?{" "}
                <span role="button" onClick={() => setLogin(true)} className="text-primary">
                  Login
                </span>
              </p>
              <p className="h5">
                Need an account?{" "}
                <span role="button" onClick={() => setRegister(true)} className="text-primary">
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
