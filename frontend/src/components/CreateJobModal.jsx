import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export const CreateJobModal = ({ show, handleClose, onCreateJob }) => {
  const [formData, setFormData] = useState({
    title: "",
    type: "Full time",
    salary: "",
    description: "",
    skills: "",
    date: "",
    picture: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onCreateJob(formData); // Call the function to create the job
    handleClose(); // Close the modal after creation
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Job</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter job title"
              value={formData.title}
              onChange={handleChange}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Job Type</Form.Label>
            <Form.Select
              name="type"
              value={formData.type}
              onChange={handleChange}
              isInvalid={!!errors.type}
            >
              <option value="Full time">Full time</option>
              <option value="Contract">Contract</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.type}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Annual Salary (USD)</Form.Label>
            <Form.Control
              type="number"
              name="salary"
              placeholder="Enter annual salary"
              value={formData.salary}
              onChange={handleChange}
              isInvalid={!!errors.salary}
            />
            <Form.Control.Feedback type="invalid">
              {errors.salary}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              placeholder="Enter job description"
              value={formData.description}
              onChange={handleChange}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Required Skills</Form.Label>
            <Form.Control
              type="text"
              name="skills"
              placeholder="Enter required skills"
              value={formData.skills}
              onChange={handleChange}
              isInvalid={!!errors.skills}
            />
            <Form.Control.Feedback type="invalid">
              {errors.skills}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Posting Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              isInvalid={!!errors.date}
            />
            <Form.Control.Feedback type="invalid">
              {errors.date}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Company Logo URL</Form.Label>
            <Form.Control
              type="text"
              name="picture"
              placeholder="Enter logo URL"
              value={formData.picture}
              onChange={handleChange}
              isInvalid={!!errors.picture}
            />
            <Form.Control.Feedback type="invalid">
              {errors.picture}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create Job
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
