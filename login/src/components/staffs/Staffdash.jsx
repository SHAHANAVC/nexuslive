// Dashboard.jsx
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

function Staffdash() {
  return (
    <>
      <Container fluid>
        {/* Page Header */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div>
                <h2 className="mb-1 text-white" style={{ fontWeight: "600" }}>
                  Dashboard Overview
                </h2>
                <p className="text-light mb-0">
                  Welcome back, admin! Here's what's happening today.
                </p>
              </div>
              <button className="d-flex p-2 button align-items-center gap-2">
                <i className="bi bi-plus-circle"></i>
                Add New
              </button>
            </div>
          </Col>
        </Row>

        {/* Stats Cards */}
        <Row className="mb-4">
          {[
            {
              title: "Total Clients",
              value: "24",
              icon: "people",
              color: "primary",
            },
            {
              title: "Active Projects",
              value: "18",
              icon: "folder",
              color: "success",
            },
            {
              title: "Pending Tasks",
              value: "8",
              icon: "clock",
              color: "warning",
            },
            {
              title: "Revenue",
              value: "$12.4K",
              icon: "currency-dollar",
              color: "info",
            },
          ].map((stat, index) => (
            <Col xl={3} lg={6} md={6} className="mb-3" key={index}>
              <Card className="custom-card stats-card">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center">
                    <div className={`icon-container bg-${stat.color} me-3`}>
                      <i
                        className={`bi bi-${stat.icon} text-${stat.color}`}
                      ></i>
                    </div>
                    <div>
                      <h4 className="fw-bold mb-0 text-white">{stat.value}</h4>
                      <small className="text-light">{stat.title}</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Main Content Area */}
        <Row>
          <Col lg={8}>
            {/* Recent Projects */}
            <Card className="custom-card mb-4">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                  <h6 className="fw-bold mb-0 text-white">Recent Projects</h6>
                  <button className="p-2 button">View All</button>
                </div>

                {/* Project List */}
                {[
                  {
                    name: "Website Redesign",
                    status: "In Progress",
                    progress: 65,
                    due: "Dec 15, 2024",
                    color: "primary",
                  },
                  {
                    name: "Mobile App",
                    status: "Completed",
                    progress: 100,
                    due: "Nov 10, 2024",
                    color: "success",
                  },
                ].map((project, index) => (
                  <div
                    key={index}
                    className={`border-start border-3 border-${project.color} ps-3 mb-4`}
                  >
                    <div className="d-flex justify-content-between align-items-start mb-2 flex-wrap gap-2">
                      <h6 className="fw-bold mb-0 text-white">
                        {project.name}
                      </h6>
                      <Badge bg={project.color} className="px-2 badge py-1">
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-light small mb-2">
                      {project.name === "Website Redesign"
                        ? "Complete redesign of company website"
                        : "iOS and Android application"}
                    </p>
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                      <small className="text-light">Due: {project.due}</small>
                      <ProgressBar
                        now={project.progress}
                        variant={project.color}
                        className="custom-progress"
                      />
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            {/* Recent Activity */}
            <Card className="custom-card">
              <Card.Body className="p-4">
                <h6 className="fw-bold mb-4 text-white">Recent Activity</h6>

                {[
                  {
                    icon: "file-earmark-text",
                    title: "New project",
                    time: "2 hours ago",
                    desc: "Project created",
                    color: "primary",
                  },
                  {
                    icon: "check-circle",
                    title: "Task completed",
                    time: "1 day ago",
                    desc: "Mobile app design approved",
                    color: "success",
                  },
                  {
                    icon: "chat-dots",
                    title: "New message",
                    time: "2 days ago",
                    desc: "Client feedback received",
                    color: "info",
                  },
                ].map((activity, index) => (
                  <div key={index} className="d-flex align-items-start mb-3">
                    <div
                      className={`icon-container-sm bg-${activity.color} me-3`}
                    >
                      <i
                        className={`bi bi-${activity.icon} text-${activity.color}`}
                      ></i>
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                        <h6 className="fw-bold mb-0 text-white">
                          {activity.title}
                        </h6>
                        <small className="text-light">{activity.time}</small>
                      </div>
                      <p className="text-light small mb-0">{activity.desc}</p>
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Staffdash;
