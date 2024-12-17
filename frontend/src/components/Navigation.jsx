import React, { useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { LoginModal } from "./LoginModal";
import { RegisterModal } from "./RegisterModal";
import { CreateJobModal } from "./CreateJobModal";
import { api } from "../utils/api";

export const Navigation = () => {
  const { user, loading, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);

  const logoutHandler = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleCreateJob = async (jobData) => {
    try {
      const res = await api.jobs.postJob(jobData)
    } catch (err) {
      console.log(err)
    }
  };

  const renderAuthLinks = () => {
    if (loading) {
      return <Nav.Link>Loading...</Nav.Link>;
    }

    if (!user) {
      return (
        <>
          <Nav.Link onClick={() => setShowLogin(true)}>Login</Nav.Link>
          <Nav.Link onClick={() => setShowRegister(true)}>Register</Nav.Link>
        </>
      );
    }

    return (
      <>
        <Nav.Link disabled>Welcome, {user.email}</Nav.Link>
        <Nav.Link style={{ cursor: "pointer" }} onClick={logoutHandler}>
          Logout
        </Nav.Link>
      </>
    );
  };

  const renderAdminDropdown = () => {
    if (!user) return null; // Only show if the user is logged in

    return (
      <NavDropdown title="Admin" id="admin-dropdown">
        <LinkContainer to="/applications">
          <NavDropdown.Item>Applications</NavDropdown.Item>
        </LinkContainer>
        <NavDropdown.Item onClick={() => setShowCreateJobModal(true)}>
          New Job
        </NavDropdown.Item>
        <LinkContainer to="/my-jobs">
          <NavDropdown.Item>My Jobs</NavDropdown.Item>
        </LinkContainer>
      </NavDropdown>
    );
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Job Board</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>All Jobs</Nav.Link>
              </LinkContainer>
              {renderAdminDropdown()}
            </Nav>

            <Nav>{renderAuthLinks()}</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Login Modal */}
      <LoginModal
        show={showLogin}
        handleClose={() => setShowLogin(false)}
        switchToRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />

      {/* Register Modal */}
      <RegisterModal
        show={showRegister}
        handleClose={() => setShowRegister(false)}
        switchToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />

      {/* Create Job Modal */}
      <CreateJobModal
        show={showCreateJobModal}
        handleClose={() => setShowCreateJobModal(false)}
        onCreateJob={handleCreateJob}
      />
    </>
  );
};
