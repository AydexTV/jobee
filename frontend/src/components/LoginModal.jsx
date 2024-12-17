import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

export const LoginModal = ({ show, handleClose, switchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      setError(null);
      await login(email, password);
      handleClose(); // Close the modal after successful login
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="loginEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          {error && <div className="text-danger mb-3">{error}</div>}
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
        </Form>
        <div className="mt-3">
          <small>
            Don’t have an account?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={switchToRegister}
            >
              Register
            </span>
          </small>
        </div>
      </Modal.Body>
    </Modal>
  );
};
