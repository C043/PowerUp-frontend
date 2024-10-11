import { Form, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./NavBar.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const NavBar = () => {
  const token = localStorage.getItem("token")

  const user = useSelector(state => state.user)
  const search = useSelector(state => state.search)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const fetchUser = async () => {
    try {
      const resp = await fetch("http://localhost:3001/users", {
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
      const resp = await fetch("http://localhost:3001/auth/me", {
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
    navigate("/home")
  }

  useEffect(() => {
    checkToken()
  }, []);

  return (
    <Navbar className="bg-body-dark pt-3">
      <Container>
        <Navbar.Brand role="button" onClick={() => navigate("/home")}>
          Game <span className="text-primary">Vault</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav align-content-between">
          <Form className="w-100 me-3" onSubmit={ev => handleSubmit(ev)}>
            <InputGroup>
              <InputGroup.Text id="basic-addon1">
                <Search />
              </InputGroup.Text>
              <Form.Control value={search}
                onChange={ev => {
                  dispatch({
                    type: "SEARCH", payload: ev.target.value
                  })
                }
                }
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
            className="rounded rounded-circle propic border border-color-primary"
            onClick={() => navigate("/user")}
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
