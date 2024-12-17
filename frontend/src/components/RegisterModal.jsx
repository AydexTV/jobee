import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

export const RegisterModal = ({ show, handleClose, switchToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    try {
      setError(null);
      await register(email, password);
      handleClose(); // Close the modal after successful registration
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create an Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="registerEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="registerPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Text className="text-muted">
              Password must be at least 8 characters long.
            </Form.Text>
          </Form.Group>
          {error && <div className="text-danger mb-3">{error}</div>}
          <Button variant="primary" onClick={handleRegister}>
            Register
          </Button>
        </Form>
        <div className="mt-3">
          <small>
            Already have an account?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={switchToLogin}
            >
              Login
            </span>
          </small>
        </div>
      </Modal.Body>
    </Modal>
  );
};
