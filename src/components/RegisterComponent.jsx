import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const RegisterComponent = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registerFetch = async () => {
    try {
      const resp = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          name: firstName,
          surname: lastName,
          username: username,
          password: password,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        console.log(data);
      } else throw new Error("Fetch Error");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    registerFetch();
  };
  return (
    <Form className="">
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="name">
        <div className="d-flex">
          <div className="d-flex flex-column me-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </div>
          <div className="d-flex flex-column">
            <Form.Label>Surname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </div>
        </div>
      </Form.Group>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
};

export default RegisterComponent;
