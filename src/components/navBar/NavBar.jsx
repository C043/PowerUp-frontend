import { Form, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./NavBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar({ onSearch, search }) {
  const token = localStorage.getItem("token")
  const [user, setUser] = useState({})

  const navigate = useNavigate()

  const userFetch = async () => {
    try {
      const resp = await fetch("http://localhost:3001/users", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await resp.json();
      if (resp.ok) {
        setUser(data)
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
        userFetch();
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
        <Navbar.Brand href="#home">
          Game <span className="text-primary">Vault</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav align-content-between">
          <InputGroup className=" me-3">
            <InputGroup.Text id="basic-addon1">
              <Search />
            </InputGroup.Text>
            <Form.Control value={search}
              onChange={ev => onSearch(ev.target.value)}
              placeholder="Search 874.413 games"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <img
            src={"https://ui-avatars.com/api/?name=" + user.username}
            alt="profile-picture"
            className="rounded rounded-circle propic border border-color-primary"
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
