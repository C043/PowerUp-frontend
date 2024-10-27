import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./NavBar.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchComponent from "../SearchComponent";

const NavBar = () => {
  const token = localStorage.getItem("token")

  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const url = import.meta.env.VITE_URL

  const fetchUser = async () => {
    try {
      const resp = await fetch(url + "/users", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await resp.json();
      if (resp.ok) {
        dispatch({
          type: "USER",
          payload: data
        })
      } else throw new Error(data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  const checkToken = async () => {
    try {
      const resp = await fetch(url + "/auth/me", {
        method: "POST",
        body: JSON.stringify({
          token: token
        }),
        headers: {
          "Content-type": "application/json",
        }
      })
      if (!resp.ok) {
        throw new Error("Token error")
      } else {
        fetchUser();
      }
    } catch (error) {
      console.log(error.message)
      navigate("/")
    }
  }


  useEffect(() => {
    checkToken()
  }, []);

  return (
    <Navbar className="bg-body-dark pt-3">
      <Container>
        <Navbar.Brand role="button" onClick={() => {
          navigate("/home")
          dispatch({ type: "PAGE", payload: 1 })
          dispatch({
            type: "SEARCH", payload: ""
          })
        }
        }
          className="brand p-0"
        >
          Power <span className="text-primary">Up</span>
        </Navbar.Brand>
        <SearchComponent />
        <img
          role="button"
          src={user.avatar}
          alt="profile-picture"
          className="border-0 rounded rounded-circle propic border border-color-primary"
          onClick={() => navigate("/user")}
        />
      </Container>
    </Navbar>
  );
}

export default NavBar;
