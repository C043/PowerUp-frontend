import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [hasError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const registerFetch = async () => {
    try {
      const resp = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await resp.json();
      if (resp.ok) {
        console.log(data);
        setError(false);
        setSuccess(true);
      } else throw new Error(data.message);
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
      console.log(error);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    registerFetch();
  };
  return (
    <Form onSubmit={e => handleSubmit(e)}>
      {hasError ? <Alert variant="danger">{errorMessage}</Alert> : ""}
      {success ? <Alert variant="primary">Login done</Alert> : ""}
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default LoginComponent;
