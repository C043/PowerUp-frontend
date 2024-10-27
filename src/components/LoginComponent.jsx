import { useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoding] = useState(false)

  const [hasError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const url = import.meta.env.VITE_URL

  const loginFetch = async () => {
    setIsLoding(true)
    try {
      const resp = await fetch(url + "/auth/login", {
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
        setError(false);
        setSuccess(true);
        localStorage.setItem("token", data.token)
        navigate("/home");
      } else throw new Error(data.message);
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
      console.log(error);
    } finally {
      setIsLoding(false)
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    loginFetch()
  };
  return (
    isLoading ?
      <div className="d-flex justify-content-center">
        <Spinner variant="primary" />
      </div> :
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
            minLength={8}
            required
          />
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
  );
};

export default LoginComponent;
