import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
  Badge,
  Modal,
  Alert,
  Spinner,
} from "react-bootstrap";
import api from "../../api";

function SuperadminTasks({userData}) {
  const [tasks, setTasks] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  // Form state
//   console.log(userData,"----------------------------------------");
  
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    deadline: "",
    assignedBy: userData.id
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [tasksRes, staffRes] = await Promise.all([
        api.get("/tasks"),
        api.get("/staff/all")
      ]);
      console.log(tasksRes);
      
      setTasks(tasksRes.data);
      setStaffList(staffRes.data.staff);
    } catch (error) {
      console.error("Error fetching data:", error);
      showAlert("Failed to load data", "danger");
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 5000);
  };

  const handleAssignTask = async (e) => {
    e.preventDefault();
    // console.log(taskForm);
    
    try {
      await api.post("/tasks", taskForm);
      showAlert("Task assigned successfully!", "success");
      setShowAssignModal(false);
      setTaskForm({
        title: "",
        description: "",
        assignedTo: "",
        deadline: "",
      });
      fetchData();
    } catch (error) {
      console.error("Error assigning task:", error);
      showAlert("Failed to assign task", "danger");
    }
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

  const viewTaskDetails = (task) => {
    setSelectedTask(task);
    setShowDetailsModal(true);
  };

  const deleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await api.delete(`/tasks/${taskId}`);
        showAlert("Task deleted successfully!", "success");
        fetchData();
      } catch (error) {
        console.error("Error deleting task:", error);
        showAlert("Failed to delete task", "danger");
      }
    }
  };

  if (loading) {
    return (
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
        <Spinner animation="border" variant="light" />
        <span className="text-white ms-3">Loading tasks...</span>
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
              <h2 className="text-white mb-1">Task Management</h2>
              <p className="text-light mb-0">Assign tasks and track progress across all staff</p>
            </div>
            <Button 
              variant="primary" 
              onClick={() => setShowAssignModal(true)}
              className="mt-2 mt-md-0"
            >
              <i className="bi bi-plus-circle me-2"></i>
              Assign New Task
            </Button>
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
                    {tasks.filter(t => isOverdue(t.deadline, t.status)).length}
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

      {/* Tasks Table */}
      <Row>
        <Col>
          <Card className="bg-dark text-white border-secondary">
            <Card.Header className="bg-secondary bg-opacity-25 border-secondary">
              <h5 className="mb-0">All Tasks</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover variant="dark" className="mb-0">
                  <thead className="bg-secondary bg-opacity-25">
                    <tr>
                      <th>Title</th>
                      <th>Assigned To</th>
                      <th>Assigned by</th>
                      <th>Deadline</th>
                      <th>Status</th>
                      <th>Updates</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task) => {
                      const overdue = isOverdue(task.deadline, task.status);
                      return (
                        <tr key={task._id} className={overdue ? "table-warning" : ""}>
                          <td>
                            <div>
                              <strong>{task.title}</strong>
                              {overdue && (
                                <Badge bg="warning" text="dark" className="ms-2">
                                  Overdue
                                </Badge>
                              )}
                            </div>
                            <small className="text-white">{task.description.substring(0, 50)}...</small>
                          </td>
                          <td>
                            {task.assignedTo && (
                              <Badge bg="light" text="dark">
                                {task.assignedTo.name}
                              </Badge>
                            )}
                          </td>
                          <td>
                            {task.assignedBy && (
                              <Badge bg="light" text="dark">
                                {task.assignedBy.email}
                              </Badge>
                            )}
                          </td>
                          <td>
                            <div>{new Date(task.dueDate).toLocaleDateString()}</div>
                            <small className={overdue ? "text-warning" : "text-white"}>
                              {overdue ? "Past due" : "Due"}
                            </small>
                          </td>
                          <td>{getStatusBadge(task.status)}</td>
                          <td>
                            <Badge bg="info">
                              {task.progressUpdates ? task.progressUpdates.length : 0} updates
                            </Badge>
                          </td>
                          <td>
                            <div className="d-flex gap-1 flex-wrap">
                              <Button
                                size="sm"
                                variant="outline-info"
                                onClick={() => viewTaskDetails(task)}
                              >
                                <i className="bi bi-eye"></i>
                              </Button>
                              <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={() => deleteTask(task._id)}
                              >
                                <i className="bi bi-trash"></i>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {tasks.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-center py-4">
                          <i className="bi bi-inbox display-4 text-white d-block mb-2"></i>
                          <span className="text-white">No tasks assigned yet</span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Assign Task Modal */}
      <Modal
        show={showAssignModal}
        onHide={() => setShowAssignModal(false)}
        size="lg"
        centered
        className="text-white"
      >
        <Modal.Header closeButton className="bg-dark border-secondary">
          <Modal.Title className="text-white">Assign New Task</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAssignTask}>
          <Modal.Body className="bg-dark">
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">Task Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={taskForm.title}
                    onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                    placeholder="Enter task title"
                    required
                    className="bg-secondary border-secondary text-white"
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={taskForm.description}
                onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                placeholder="Enter task description"
                required
                className="bg-secondary border-secondary text-white"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-white">Assign to Staff</Form.Label>
              <Form.Select
                value={taskForm.assignedTo}
                onChange={(e) => setTaskForm({ ...taskForm, assignedTo: e.target.value })}
                required
                className="bg-secondary border-secondary text-white"
              >
                <option value="">Select Staff Member</option>
                {staffList.map((staff) => (
                  <option key={staff._id} value={staff._id}>
                    {staff.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-white">Deadline</Form.Label>
              <Form.Control
  type="date"
  value={taskForm.deadline}
  onChange={(e) => setTaskForm({ ...taskForm, deadline: e.target.value })}
  required
  className="bg-secondary border-secondary text-white"
  min={new Date().toISOString().split("T")[0]}
/>

            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="bg-dark border-secondary">
            <Button variant="secondary" onClick={() => setShowAssignModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Assign Task
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Task Details Modal */}
      <Modal
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        size="lg"
        centered
        className="text-white"
      >
        <Modal.Header closeButton className="bg-dark border-secondary">
          <Modal.Title className="text-white">Task Details & Updates</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          {selectedTask && (
            <>
              <Row className="mb-4 text-white">
                <Col>
                  <h4>{selectedTask.title}</h4>
                  <p className="text-white">{selectedTask.description}</p>
                  
                  <Row className="mt-3">
                    <Col sm={6}>
                      <strong>Assigned To:</strong>
                      <div className="mt-1">
                        {selectedTask.assignedTo && (
                          <Badge bg="light" text="dark" className="me-1">
                            {selectedTask.assignedTo.name}
                          </Badge>
                        )}
                      </div>
                    </Col>
                    <Col sm={6}>
                      <strong>Status:</strong>
                      <div className="mt-1">{getStatusBadge(selectedTask.status)}</div>
                    </Col>
                  </Row>
                  
                  <Row className="mt-3">
                    <Col sm={6}>
                      <strong>Deadline:</strong>
                      <div className={isOverdue(selectedTask.dueDate, selectedTask.status) ? "text-warning" : "text-light"}>
                        {new Date(selectedTask.dueDate).toLocaleString()}
                        {isOverdue(selectedTask.dueDate, selectedTask.status) && (
                          <Badge bg="warning" text="dark" className="ms-2">
                            Overdue
                          </Badge>
                        )}
                      </div>
                    </Col>
                    <Col sm={6}>
                      <strong>Created:</strong>
                      <div className="text-light">
                        {new Date(selectedTask.createdAt).toLocaleString()}
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <hr className="border-secondary" />

              <h5 className="text-white">Daily Updates</h5>
              {selectedTask.progressUpdates && selectedTask.progressUpdates.length > 0 ? (
                <div style={{ maxHeight: "300px", overflowY: "auto", color: "white" }}>
                  {selectedTask.progressUpdates.slice().reverse().map((update, index) => (
                    <Card key={index} className="bg-secondary bg-opacity-25 border-secondary mb-2 text-white">
                      <Card.Body className="p-3 text-white">
                        <div className="d-flex justify-content-between align-items-start mb-2 text-white">
                          <Badge bg={
                            update.status === "Completed" ? "success" :
                            update.status === "Ongoing" ? "primary" :
                            update.status === "Blocked" ? "danger" : "secondary"
                          }>
                            {update.status}
                          </Badge>
                          <small className="text-white">
                            {new Date(update.date).toLocaleString()}
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
      </Modal>
    </Container>
  );
}

export default SuperadminTasks;