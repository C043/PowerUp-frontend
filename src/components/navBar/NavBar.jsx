import { Form, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./NavBar.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const NavBar = () => {
  const [search, setSearch] = useState("")
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

  const handleSubmit = (ev) => {
    ev.preventDefault()
    dispatch({ type: "SEARCH", payload: search })
    navigate("/home")
  }

  useEffect(() => {
    checkToken()
  }, []);

  return (
    <Navbar className="bg-body-dark pt-3">
      <Container>
        <Navbar.Brand role="button" onClick={() => {
          navigate("/home")
          setSearch("")
          dispatch({ type: "PAGE", payload: 1 })
          dispatch({
            type: "SEARCH", payload: ""
          })
        }
        }
          className="brand"
        >
          Power <span className="text-primary">Up</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav align-content-between">
          <Form className="w-100 me-3" onSubmit={ev => handleSubmit(ev)}>
            <InputGroup>
              <InputGroup.Text id="basic-addon1">
                <Search />
              </InputGroup.Text>
              <Form.Control value={search}
                onChange={ev => setSearch(ev.target.value)}
                placeholder="Search 874.413 games"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </Form>
          <img
            role="button"
            src={user.avatar}
            alt="profile-picture"
            className="border-0 rounded rounded-circle propic border border-color-primary"
            onClick={() => navigate("/user")}
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
