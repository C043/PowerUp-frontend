import { Form, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./NavBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function NavBar() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const user = useSelector(state => state.user);

  const userFetch = async () => {
    try {
      const resp = await fetch("http://localhost:3001/users", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await resp.json();
      if (resp.ok) {
        dispatch({ type: "USER", payload: data });
      } else throw new Error(data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    userFetch();
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
            <Form.Control placeholder="Search 874.413 games" aria-label="Username" aria-describedby="basic-addon1" />
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
