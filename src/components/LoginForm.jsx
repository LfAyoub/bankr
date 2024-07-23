import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import styles from "./LoginForm.module.css";

function LoginForm() {
  const [email, setEmail] = useState("jack@mail.com");
  const [password, setPassword] = useState("azerty");

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app");
    }
  }, [isAuthenticated, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }

  return (
    <Container className={styles.loginContainer}>
      <Col lg={5} md={8} xs={12}>
        <Form className={styles.loginForm}>
          <h2>Login</h2>
          <Row className="justify-content-center">
            <Col xl={8} lg={9} md={8} xs={9}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" onClick={handleSubmit} className="my-3">
                Login
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Container>
  );
}

export default LoginForm;

// <Container>
//   <Col lg={4} className="mx-auto">
//     <form className={styles.loginForm} onSubmit={handleSubmit}>
//       <h2>Login</h2>
//       <label htmlFor="email">Email</label>
//       <input
//         type="email"
//         id="email"
//         name="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <label htmlFor="password">Password</label>
//       <input
//         type="password"
//         id="password"
//         name="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button>Login</button>
//     </form>
//   </Col>
// </Container>
