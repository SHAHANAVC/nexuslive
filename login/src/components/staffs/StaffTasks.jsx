// import React, { useEffect, useState } from "react";
// import { Card, Button, Form, Row, Col, Badge, Spinner } from "react-bootstrap";
// import api from "../../api";


// function StaffTasks({ staffData }) {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [updateMessage, setUpdateMessage] = useState({});
//   const [updateStatus, setUpdateStatus] = useState({});

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await api.get(`/tasks/staff/${staffData._id}`);
//         setTasks(response.data);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTasks();
//   }, [staffData._id]);

//   const handleUpdate = async (taskId) => {
//     const message = updateMessage[taskId] || "";
//     const status = updateStatus[taskId] || "Ongoing";

//     try {
//       await api.put(`/tasks/${taskId}/update`, { status, message });
//       setTasks((prev) =>
//         prev.map((t) =>
//           t._id === taskId ? { ...t, status, lastUpdate: message } : t
//         )
//       );
//       setUpdateMessage((prev) => ({ ...prev, [taskId]: "" }));
//       alert("Task updated successfully!");
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   if (loading)
//     return (
//       <div className="text-center text-light mt-5">
//         <Spinner animation="border" /> Loading tasks...
//       </div>
//     );

//   if (tasks.length === 0)
//     return (
//       <div className="text-center text-light mt-5">
//         <h5>No tasks assigned yet</h5>
//       </div>
//     );

//   return (
//     <div className="container mt-4">
//       <h3 className="text-white mb-3">My Tasks</h3>
//       <Row>
//         {tasks.map((task) => (
//           <Col key={task._id} md={6} lg={4} className="mb-4">
//             <Card
//               className="h-100 shadow-sm border-secondary text-light"
//               style={{
//                 background: "linear-gradient(145deg, #1a1a1a, #262626)",
//               }}
//             >
//               <Card.Body>
//                 <Card.Title className="text-primary">{task.title }</Card.Title>
//                 <Card.Text className="small text-muted">{task.description}</Card.Text>
//                 <Badge
//                   bg={
//                     task.status === "Completed"
//                       ? "success"
//                       : task.status === "Ongoing"
//                       ? "info"
//                       : "secondary"
//                   }
//                   className="mb-2"
//                 >
//                   {task.status}
//                 </Badge>

//                 <Form.Select
//                   size="sm"
//                   className="bg-dark text-white border-secondary mb-2"
//                   value={updateStatus[task._id] || task.status}
//                   onChange={(e) =>
//                     setUpdateStatus((prev) => ({
//                       ...prev,
//                       [task._id]: e.target.value,
//                     }))
//                   }
//                 >
//                   <option value="Not Started">Not Started</option>
//                   <option value="Ongoing">Ongoing</option>
//                   <option value="Completed">Completed</option>
//                   <option value="Blocked">Blocked</option>
//                 </Form.Select>

//                 <Form.Control
//                   as="textarea"
//                   rows={2}
//                   placeholder="Write today’s update..."
//                   className="bg-dark text-white border-secondary mb-2"
//                   value={updateMessage[task._id] || ""}
//                   onChange={(e) =>
//                     setUpdateMessage((prev) => ({
//                       ...prev,
//                       [task._id]: e.target.value,
//                     }))
//                   }
//                 />

//                 <Button
//                   size="sm"
//                   variant="primary"
//                   className="w-100"
//                   onClick={() => handleUpdate(task._id)}
//                 >
//                   <i className="bi bi-send me-2"></i>Send Update
//                 </Button>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// }

// export default StaffTasks;


import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Badge,
  Modal,
  Alert,
  Spinner,
  ListGroup,
} from "react-bootstrap";
import api from "../../api";

function StaffViewTasks({ userData }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  // Update form state
  const [updateForm, setUpdateForm] = useState({
    message: "",
    status: "Ongoing"
  });

  useEffect(() => {
    fetchTasks();
  }, [userData]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/tasks/staff/${userData.id}`);
      console.log("Staff tasks:", response.data);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching staff tasks:", error);
      showAlert("Failed to load tasks", "danger");
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 5000);
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    if (!selectedTask) return;

    try {
      const updateData = {
        message: updateForm.message,
        status: updateForm.status,
        timestamp: new Date().toISOString()
      };

      // Send update to the task
      await api.put(`/tasks/${selectedTask._id}/update`, updateData);
      
      showAlert("Task updated successfully!", "success");
      setShowUpdateModal(false);
      setUpdateForm({ message: "", status: "Ongoing" });
      setSelectedTask(null);
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error("Error updating task:", error);
      showAlert("Failed to update task", "danger");
    }
  };

  const openUpdateModal = (task) => {
    setSelectedTask(task);
    setUpdateForm({
      message: "",
      status: task.status || "Ongoing"
    });
    setShowUpdateModal(true);
  };

  const openDetailsModal = (task) => {
    setSelectedTask(task);
    setShowDetailsModal(true);
  };

  const getStatusBadge = (status) => {
    const variants = {
      "Not Started": "secondary",
      "Ongoing": "primary",
      "Completed": "success",
      "Blocked": "danger",
      "Overdue": "warning"
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  const isOverdue = (deadline, status) => {
    if (status === "Completed") return false;
    return new Date(deadline) < new Date();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
        <Spinner animation="border" variant="light" />
        <span className="text-white ms-3">Loading your tasks...</span>
      </Container>
    );
  }

  return (
    <Container fluid>
      {/* Alert */}
      {alert.show && (
        <Alert variant={alert.type} className="mb-3">
          {alert.message}
        </Alert>
      )}

      {/* Header Section */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div>
              <h2 className="text-white mb-1">My Tasks</h2>
              <p className="text-light mb-0">View and update your assigned tasks</p>
            </div>
            <div className="mt-2 mt-md-0">
              <Badge bg="primary" className="fs-6">
                {tasks.length} Task(s) Assigned
              </Badge>
            </div>
          </div>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col xs={6} md={3} className="mb-3">
          <Card className="bg-dark text-white border-secondary h-100">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title text-white">Total Tasks</h6>
                  <h3 className="mb-0">{tasks.length}</h3>
                </div>
                <div className="align-self-center">
                  <i className="bi bi-list-task text-primary" style={{ fontSize: "1.5rem" }}></i>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3} className="mb-3">
          <Card className="bg-dark text-white border-secondary h-100">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title text-white">Completed</h6>
                  <h3 className="mb-0 text-success">
                    {tasks.filter(t => t.status === "Completed").length}
                  </h3>
                </div>
                <div className="align-self-center">
                  <i className="bi bi-check-circle text-success" style={{ fontSize: "1.5rem" }}></i>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3} className="mb-3">
          <Card className="bg-dark text-white border-secondary h-100">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title text-white">Overdue</h6>
                  <h3 className="mb-0 text-warning">
                    {tasks.filter(t => isOverdue(t.dueDate, t.status)).length}
                  </h3>
                </div>
                <div className="align-self-center">
                  <i className="bi bi-exclamation-triangle text-warning" style={{ fontSize: "1.5rem" }}></i>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3} className="mb-3">
          <Card className="bg-dark text-white border-secondary h-100">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="card-title text-white">In Progress</h6>
                  <h3 className="mb-0 text-info">
                    {tasks.filter(t => t.status === "Ongoing").length}
                  </h3>
                </div>
                <div className="align-self-center">
                  <i className="bi bi-arrow-repeat text-info" style={{ fontSize: "1.5rem" }}></i>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tasks Grid */}
      <Row>
        {tasks.length === 0 ? (
          <Col>
            <Card className="bg-dark text-white border-secondary text-center py-5">
              <Card.Body>
                <i className="bi bi-inbox display-1 text-white d-block mb-3"></i>
                <h4 className="text-white">No Tasks Assigned</h4>
                <p className="text-white mb-0">You don't have any tasks assigned to you yet.</p>
              </Card.Body>
            </Card>
          </Col>
        ) : (
          tasks.map((task) => {
            const overdue = isOverdue(task.dueDate, task.status);
            return (
              <Col key={task._id} xs={12} lg={6} className="mb-4">
                <Card 
                  className={`h-100 border-secondary ${
                    overdue ? "border-warning" : ""
                  }`}
                  style={{
                    background: "linear-gradient(145deg, #1a1a1a, #262626)",
                  }}
                >
                  <Card.Header className={`d-flex justify-content-between align-items-center border-secondary ${
                    overdue ? "bg-warning bg-opacity-10" : "bg-secondary bg-opacity-25"
                  }`}>
                    <h5 className="mb-0 text-white">{task.title}</h5>
                    {overdue && (
                      <Badge bg="warning" text="dark">
                        Overdue
                      </Badge>
                    )}
                  </Card.Header>
                  <Card.Body className="text-white">
                    <p className="mb-3">{task.description}</p>
                    
                    <Row className="mb-3">
                      <Col xs={6}>
                        <small className="text-white">Deadline</small>
                        <div className={overdue ? "text-warning fw-bold" : "text-white"}>
                          {formatDate(task.dueDate)}
                        </div>
                      </Col>
                      <Col xs={6}>
                        <small className="text-white">Status</small>
                        <div>{getStatusBadge(task.status)}</div>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col xs={6}>
                        <small className="text-white">Assigned By</small>
                        <div className="text-white">
                          {task.assignedBy?.email || "Admin"}
                        </div>
                      </Col>
                      <Col xs={6}>
                        <small className="text-white">Updates</small>
                        <div>
                          <Badge bg="info">
                            {task.progressUpdates ? task.progressUpdates.length : 0}
                          </Badge>
                        </div>
                      </Col>
                    </Row>

                    {task.progressUpdates && task.progressUpdates.length > 0 && (
                      <div className="mb-3">
                        <small className="text-white">Latest Update</small>
                        <div className="bg-secondary bg-opacity-25 p-2 rounded mt-1">
                          <small className="text-light">
                            "{task.progressUpdates[task.progressUpdates.length - 1].message}"
                          </small>
                          <br />
                          <small className="text-white">
                            {formatDateTime(task.progressUpdates[task.progressUpdates.length - 1].date)}
                          </small>
                        </div>
                      </div>
                    )}
                  </Card.Body>
                  <Card.Footer className="border-secondary bg-transparent">
                    <div className="d-flex gap-2 flex-wrap">
                      <Button
                        variant="outline-info"
                        size="sm"
                        onClick={() => openDetailsModal(task)}
                        className="flex-fill"
                      >
                        <i className="bi bi-eye me-1"></i>
                        View Details
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => openUpdateModal(task)}
                        className="flex-fill"
                      >
                        <i className="bi bi-pencil-square me-1"></i>
                        Update
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })
        )}
      </Row>

      {/* Update Task Modal */}
      <Modal
        show={showUpdateModal}
        onHide={() => {
          setShowUpdateModal(false);
          setSelectedTask(null);
        }}
        centered
        className="text-white"
      >
        <Modal.Header closeButton className="bg-dark border-secondary">
          <Modal.Title className="text-white">
            Update Task: {selectedTask?.title}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleUpdateTask}>
          <Modal.Body className="bg-dark">
            {selectedTask && (
              <>
                <div className="mb-3 p-3 bg-secondary bg-opacity-25 rounded">
                  <h6 className="text-white">Task Details</h6>
                  <p className="mb-2 text-light">{selectedTask.description}</p>
                  <div className="d-flex justify-content-between text-sm">
                    <span className="text-white">
                      Deadline: {formatDate(selectedTask.dueDate)}
                    </span>
                    <span className="text-white">
                      Current Status: {getStatusBadge(selectedTask.status)}
                    </span>
                  </div>
                </div>

                <Form.Group className="mb-3">
                  <Form.Label className="text-white">Update Status</Form.Label>
                  <Form.Select
                    value={updateForm.status}
                    onChange={(e) => setUpdateForm({ ...updateForm, status: e.target.value })}
                    className="bg-secondary border-secondary text-white"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                    <option value="Blocked">Blocked</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="text-white">
                    Today's Update Message
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={updateForm.message}
                    onChange={(e) => setUpdateForm({ ...updateForm, message: e.target.value })}
                    placeholder="Describe your progress, challenges, or completion details..."
                    required
                    className="bg-secondary border-secondary text-white"
                  />
                  <Form.Text className="text-white">
                    This update will be added to the task's history.
                  </Form.Text>
                </Form.Group>

                {selectedTask.updates && selectedTask.updates.length > 0 && (
                  <div>
                    <h6 className="text-white mb-2">Previous Updates</h6>
                    <div style={{ maxHeight: "150px", overflowY: "auto" }}>
                      {selectedTask.updates.slice().reverse().map((update, index) => (
                        <div key={index} className="bg-secondary bg-opacity-25 p-2 rounded mb-2">
                          <div className="d-flex justify-content-between align-items-start">
                            <Badge bg={
                              update.status === "Completed" ? "success" :
                              update.status === "Ongoing" ? "primary" :
                              update.status === "Blocked" ? "danger" : "secondary"
                            } className="mb-1">
                              {update.status}
                            </Badge>
                            <small className="text-white">
                              {formatDateTime(update.timestamp)}
                            </small>
                          </div>
                          <p className="mb-0 text-light small">{update.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </Modal.Body>
          <Modal.Footer className="bg-dark border-secondary">
            <Button 
              variant="secondary" 
              onClick={() => {
                setShowUpdateModal(false);
                setSelectedTask(null);
              }}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              <i className="bi bi-send me-1"></i>
              Submit Update
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Task Details Modal */}
      <Modal
        show={showDetailsModal}
        onHide={() => {
          setShowDetailsModal(false);
          setSelectedTask(null);
        }}
        size="lg"
        centered
        className="text-white"
      >
        <Modal.Header closeButton className="bg-dark border-secondary">
          <Modal.Title className="text-white">
            Task Details: {selectedTask?.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          {selectedTask && (
            <>
              <Row className="mb-4">
                <Col>
                  <h4 className="text-white">{selectedTask.title}</h4>
                  <p className="text-light">{selectedTask.description}</p>
                  
                  <Row className="mt-3">
                    <Col md={6} className="mb-3">
                      <strong className="text-white">Assigned By:</strong>
                      <div className="mt-1">
                        <Badge bg="light" text="dark">
                          {selectedTask.assignedBy?.email || "Admin"}
                        </Badge>
                      </div>
                    </Col>
                    <Col md={6} className="mb-3">
                      <strong className="text-white">Current Status:</strong>
                      <div className="mt-1">
                        {getStatusBadge(selectedTask.status)}
                      </div>
                    </Col>
                  </Row>
                  
                  <Row className="mt-3">
                    <Col md={6} className="mb-3">
                      <strong className="text-white">Deadline:</strong>
                      <div className={
                        isOverdue(selectedTask.dueDate, selectedTask.status) 
                          ? "text-warning fw-bold" 
                          : "text-light"
                      }>
                        {formatDateTime(selectedTask.dueDate)}
                        {isOverdue(selectedTask.dueDate, selectedTask.status) && (
                          <Badge bg="warning" text="dark" className="ms-2">
                            Overdue
                          </Badge>
                        )}
                      </div>
                    </Col>
                    <Col md={6} className="mb-3">
                      <strong className="text-white">Created:</strong>
                      <div className="text-light">
                        {formatDateTime(selectedTask.createdAt)}
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <hr className="border-secondary" />

              <h5 className="text-white mb-3">Update History</h5>
              {selectedTask.progressUpdates && selectedTask.progressUpdates.length > 0 ? (
                <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                  {selectedTask.progressUpdates.slice().reverse().map((update, index) => (
                    <Card key={index} className="bg-secondary bg-opacity-25 border-secondary mb-3">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-2 flex-wrap">
                          <Badge bg={
                            update.status === "Completed" ? "success" :
                            update.status === "Ongoing" ? "primary" :
                            update.status === "Blocked" ? "danger" : "secondary"
                          }>
                            {update.status}
                          </Badge>
                          <small className="text-white">
                            {formatDateTime(update.date)}
                          </small>
                        </div>
                        <p className="mb-0 text-light">{update.message}</p>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center text-white py-4">
                  <i className="bi bi-chat-dots display-4 d-block mb-2"></i>
                  No updates yet
                </div>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="bg-dark border-secondary">
          <Button 
            variant="primary" 
            onClick={() => {
              setShowDetailsModal(false);
              openUpdateModal(selectedTask);
            }}
          >
            <i className="bi bi-pencil-square me-1"></i>
            Add Update
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => {
              setShowDetailsModal(false);
              setSelectedTask(null);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default StaffViewTasks;