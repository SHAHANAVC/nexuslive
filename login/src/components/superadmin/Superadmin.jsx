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
import Dashboard from "./Dashboard";
import AdminStaff from "../admin/AdminStaff";
import ViewStaff from "./ViewStaff";
import Adminstudent from "../admin/Adminstudent";
import PaymentView from "../admin/ViewPayment";
import SuperadminStudent from "./SuperadminStudent";
// import StaffRegistration from "../StaffRegistration";

function Superadmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      // Add more cases as you create components
      case "staffs": return <ViewStaff/>
      case "students": return <SuperadminStudent/>
      case "payment": return <PaymentView/>
        case "settings":
      case "tasks":
      case "reports":
        // Return a placeholder or actual component
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
        return <Dashboard />;
    }
  };

  // Function to handle navigation clicks
  const handleNavigation = (pageName) => {
    const pageKey = pageName.toLowerCase();
    setActivePage(pageKey);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 992) {
      setSidebarOpen(false);
    }
  };

  // Menu items configuration
  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: "speedometer2" },
    { key: "staffs", label: "Staffs", icon: "people" },
    { key: "students", label: "Students", icon: "people" },
    { key: "tasks", label: "Tasks", icon: "check-square" },
    { key: "payment", label: "Payment", icon: "credit-card" },
    { key: "reports", label: "Reports", icon: "graph-up" },
    { key: "settings", label: "Settings", icon: "gear" },
  ];

  return (
    <div
      className="d-flex text-white"
      style={{
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        background:
          "linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #2d2d2d 100%)",
      }}
    >
      {/* Sidebar */}
      <div
        className={`d-lg-block ${sidebarOpen ? "d-block" : "d-none"}`}
        style={{
          width: "300px",
          position: sidebarOpen ? "fixed" : "static",
          height: sidebarOpen ? "100vh" : "auto",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRight: "1px solid rgba(255, 255, 255, 0.2)",
          zIndex: 1000,
        }}
      >
        <div className="p-3 admin-dash d-flex justify-content-between align-items-center">
          <h3 className="mb-0 fw-bolder text-white">Super Admin Panel</h3>
          <button
            className="text-white buttons d-lg-none p-2"
            style={{ background: "none", border: "none" }}
            onClick={() => setSidebarOpen(false)}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <Nav className="flex-column p-3">
          {menuItems.map((item) => (
            <div key={item.key} className="sidebar-link mb-2">
              <Nav.Link
                href="#"
                className={`text-white d-flex align-items-center gap-2 py-2 px-3 rounded ${
                  activePage === item.key ? "active-nav-link" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(item.key);
                }}
              >
                <i className={`bi bi-${item.icon}`}></i>
                {item.label}
              </Nav.Link>
            </div>
          ))}
          <div className="mt-4 pt-3 border-top border-secondary">
            <div className="sidebar-link">
              <Nav.Link
                href="#"
                className="text-white d-flex align-items-center gap-2 py-2 px-3 rounded"
                onClick={(e) => e.preventDefault()}
              >
                <i className="bi bi-question-circle"></i>
                Help & Support
              </Nav.Link>
            </div>
          </div>
        </Nav>
      </div>

      {/* Main Content */}
      <div
        className="flex-grow-1 d-flex flex-column"
        style={{ marginLeft: sidebarOpen ? "300px" : "0" }}
      >
        {/* Navbar */}
        <Navbar
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
            position: "relative",
            zIndex: 1030,
            overflow: "visible",
          }}
        >
          <Container fluid>
            <div className="d-flex align-items-center">
              <button
                className="text-white buttons2 d-lg-none me-3"
                style={{ background: "none", border: "none" }}
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <i className="bi bi-list" style={{ fontSize: "1.5rem" }}></i>
              </button>
              <Navbar.Brand href="#" className="d-lg-none text-white">
                <h5 className="mb-0 text-capitalize">{activePage}</h5>
              </Navbar.Brand>
            </div>

            {/* Search Bar - Hidden on mobile */}
            <Form className="d-none d-lg-flex me-auto">
              <InputGroup style={{ width: "300px" }}>
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

            {/* Three Dots Menu - Visible on small screens */}
            <Dropdown className="d-lg-none">
              <Dropdown.Toggle
                variant="outline-light"
                id="mobile-menu"
                className="d-flex align-items-center"
              >
                <i className="bi bi-three-dots-vertical"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu align="end" className="custom-dropdown">
                <Dropdown.Item
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation("settings");
                  }}
                  className="text-dark"
                >
                  <i className="bi bi-gear me-2"></i>
                  Settings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#logout" className="text-dark">
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Sign Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* Desktop Navigation Items */}
            <div className="d-none d-lg-flex align-items-center">
              {/* Regular Desktop Dropdown */}
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="outline-light"
                  id="dropdown-user"
                  className="d-flex align-items-center ms-2"
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
                  <span>superadmin</span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="custom-dropdown">
                  <Dropdown.Item
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation("settings");
                    }}
                    className="text-dark"
                  >
                    <i className="bi bi-gear me-2"></i>
                    Settings
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#logout" className="text-dark">
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Sign Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Container>
        </Navbar>

        {/* Page Content with Scroll - This area changes dynamically */}
        <div
          className="flex-grow-1 p-3"
          style={{
            overflowY: "auto",
            maxHeight: "calc(100vh - 76px)",
          }}
        >
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default Superadmin;
