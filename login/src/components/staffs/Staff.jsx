import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  ProgressBar,
  Navbar,
  Nav,
  Form,
  InputGroup,
  Dropdown,
} from "react-bootstrap";
import Staffdash from "./Staffdash";

function Staff() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Staffdash/>;
      case "settings":
        return ;
      case "clients":
      case "projects":
      case "tasks":
      case "calendar":
      case "reports":
        return (
          <Container fluid>
            <Row className="mb-4">
              <Col>
                <h2 className="text-white text-capitalize">
                  {activePage} Page
                </h2>
                <p className="text-light">This page is under construction</p>
              </Col>
            </Row>
          </Container>
        );
      default:
        return <Staffdash />;
    }
  };

  // Function to handle navigation clicks
  const handleNavigation = (pageName) => {
    const pageKey = pageName.toLowerCase();
    setActivePage(pageKey);
  };

  // Menu items configuration for dropdown
  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: "speedometer2" },
    { key: "clients", label: "Clients", icon: "people" },
    { key: "projects", label: "Projects", icon: "folder" },
    { key: "tasks", label: "Tasks", icon: "check-square" },
    { key: "calendar", label: "Calendar", icon: "calendar" },
    { key: "reports", label: "Reports", icon: "graph-up" },
    { key: "settings", label: "Settings", icon: "gear" },
  ];

  const getActiveItem = () => {
    return menuItems.find(item => item.key === activePage) || menuItems[0];
  };

  const activeItem = getActiveItem();

  return (
    <div
      className="d-flex flex-column text-white"
      style={{
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        background:
          "linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #2d2d2d 100%)",
      }}
    >
      {/* Navbar */}
      <Navbar
        expand="lg"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          position: "relative",
          zIndex: 1030,
        }}
      >
        <Container fluid>
          {/* Brand */}
          <Navbar.Brand href="#" className="text-white">
            <h4 className="mb-0 fw-bolder">Staff Panel</h4>
          </Navbar.Brand>

          {/* Mobile Toggle */}
          <Navbar.Toggle 
            aria-controls="staff-navbar"
            className="border-0"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              color: "white"
            }}
          >
            <i className="bi bi-list"></i>
          </Navbar.Toggle>

          <Navbar.Collapse id="staff-navbar">
            {/* Navigation Dropdown - Center */}
            <Nav className="mx-auto">
              <Dropdown>
                <Dropdown.Toggle
                  variant="outline-light"
                  id="navigation-dropdown"
                  className="d-flex align-items-center gap-2 px-3 py-2 border-0"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    minWidth: "180px",
                    justifyContent: "space-between"
                  }}
                >
                  <span className="d-flex align-items-center gap-2">
                    <i className={`bi bi-${activeItem.icon}`}></i>
                    {activeItem.label}
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu 
                  className="custom-dropdown"
                  style={{
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    minWidth: "200px"
                  }}
                >
                  {menuItems.map((item) => (
                    <Dropdown.Item
                      key={item.key}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(item.key);
                      }}
                      className={`d-flex align-items-center gap-2 py-2 ${
                        activePage === item.key ? "active-dropdown-item" : "text-dark"
                      }`}
                      style={{
                        background: activePage === item.key ? "rgba(0, 123, 255, 0.1)" : "transparent"
                      }}
                    >
                      <i className={`bi bi-${item.icon}`}></i>
                      {item.label}
                      {activePage === item.key && (
                        <i className="bi bi-check2 ms-auto text-primary"></i>
                      )}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Nav>

            {/* Right Side Items */}
            <div className="d-flex align-items-center gap-3">
              {/* Search Bar - Hidden on mobile */}
              <Form className="d-none d-lg-flex">
                <InputGroup style={{ width: "250px" }}>
                  <Form.Control
                    type="search"
                    placeholder="Search..."
                    aria-label="Search"
                    className="search-input"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      color: "white",
                    }}
                  />
                  <Button
                    variant="outline-secondary"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      color: "white",
                    }}
                  >
                    <i className="bi bi-search"></i>
                  </Button>
                </InputGroup>
              </Form>

              {/* User Dropdown */}
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="outline-light"
                  id="dropdown-user"
                  className="d-flex align-items-center border-0"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                    alt="User"
                    className="rounded-circle me-2"
                    style={{
                      width: "32px",
                      height: "32px",
                      objectFit: "cover",
                    }}
                  />
                  <span className="d-none d-md-inline">Staff User</span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="custom-dropdown">
                  <Dropdown.Header>
                    <div className="d-flex align-items-center">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                        alt="User"
                        className="rounded-circle me-2"
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <div className="fw-bold">Staff User</div>
                        <small className="text-muted">staff@example.com</small>
                      </div>
                    </div>
                  </Dropdown.Header>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation("settings");
                    }}
                    className="text-dark d-flex align-items-center"
                  >
                    <i className="bi bi-gear me-2"></i>
                    Settings
                  </Dropdown.Item>
                  <Dropdown.Item href="#profile" className="text-dark d-flex align-items-center">
                    <i className="bi bi-person me-2"></i>
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item href="#help" className="text-dark d-flex align-items-center">
                    <i className="bi bi-question-circle me-2"></i>
                    Help & Support
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#logout" className="text-dark d-flex align-items-center">
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Sign Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Page Content */}
      <div
        className="flex-grow-1 p-3"
        style={{
          overflowY: "auto",
        }}
      >
        {renderPage()}
      </div>

      {/* Add some custom CSS */}
      <style jsx>{`
        .custom-dropdown {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .active-dropdown-item {
          background-color: rgba(0, 123, 255, 0.1) !important;
          color: #007bff !important;
        }
        .dropdown-toggle::after {
          margin-left: 0.5rem;
        }
      `}</style>
    </div>
  );
}

export default Staff;