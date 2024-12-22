import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export const ApplyModal = ({ show, handleClose, jobId, onSubmit, lockedEmail }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [cv, setCv] = useState("");

  // Use useEffect to set the initial email value when modal opens
  useEffect(() => {
    if (show && lockedEmail) {
      setEmail(lockedEmail);  // Set email to lockedEmail only if it exists
    }
  }, [show, lockedEmail]);

  const submitHandler = () => {
    const applicationData = {
      job_id: jobId,
      name,
      email,
      photo,
      cv,
    };

    onSubmit(applicationData); // Send application data to parent
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Apply for Job</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}  // Email value will be set to email state
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}  // User can change it
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Photo URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a photo URL"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>CV</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Briefly describe your experience"
              value={cv}
              onChange={(e) => setCv(e.target.value)}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={submitHandler}>
          Submit Application
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
