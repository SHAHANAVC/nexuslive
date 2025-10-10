import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Table, 
  Button, 
  Form, 
  InputGroup, 
  Badge, 
  Modal, 
  Alert, 
  Dropdown 
} from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaSearch, FaFilter, FaSync, FaUserCog } from 'react-icons/fa';
import api from '../../api';

const ViewStaff = () => {
  const [staffList, setStaffList] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [newRole, setNewRole] = useState('');

  const departments = ['Technical', 'Marketing'];
  const statusOptions = ['active', 'probation', 'resigned'];
  const roleOptions = ['staff', 'admin', 'superadmin'];

  // Get current user role from localStorage or context
  const currentUserRole = localStorage.getItem('userRole') || 'admin';

  useEffect(() => {
    fetchStaff();
  }, []);

  useEffect(() => {
    filterStaff();
  }, [staffList, searchTerm, filterDepartment, filterStatus, filterRole]);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const response = await api.get('/staff/all', {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response);
      
    //   setStaffList(response.data);
        // Fix: Access the staff array from response.data.staff
    const staffData = response.data.staff || response.data || [];
    setStaffList(staffData);
      setError('');
    } catch (err) {
      console.error('Error fetching staff:', err);
      setError('Failed to fetch staff data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filterStaff = () => {
    let filtered = staffList;

    if (searchTerm) {
      filtered = filtered.filter(staff =>
        staff.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.designation?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterDepartment) {
      filtered = filtered.filter(staff => staff.department === filterDepartment);
    }

    if (filterStatus) {
      filtered = filtered.filter(staff => staff.status === filterStatus);
    }

    if (filterRole) {
      filtered = filtered.filter(staff => staff.role === filterRole);
    }

    setFilteredStaff(filtered);
  };

  const handleView = (staff) => {
    setSelectedStaff(staff);
    setShowViewModal(true);
  };

  const handleDelete = (staff) => {
    setSelectedStaff(staff);
    setShowDeleteModal(true);
  };

  const handleRoleChange = (staff) => {
    setSelectedStaff(staff);
    setNewRole(staff.role);
    setShowRoleModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/staff/${selectedStaff._id}`, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      setSuccess('Staff member deleted successfully!');
      setShowDeleteModal(false);
      setSelectedStaff(null);
      fetchStaff();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error deleting staff:', err);
      setError('Failed to delete staff member. Please try again.');
    }
  };

  const updateStaffRole = async () => {
    try {
      const response = await api.put(
        `/staff/${selectedStaff._id}/role`,
        { role: newRole },
        {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      console.log(response);
      
      
      setSuccess(`Role updated successfully! ${selectedStaff.name} is now ${newRole}`);
      setShowRoleModal(false);
      setSelectedStaff(null);
      setNewRole('');
      fetchStaff();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error updating role:', err);
      setError('Failed to update role. Please try again.');
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'probation': return 'warning';
      case 'resigned': return 'danger';
      default: return 'secondary';
    }
  };

  const getRoleVariant = (role) => {
    switch (role) {
      case 'superadmin': return 'danger';
      case 'admin': return 'warning';
      case 'staff': return 'info';
      default: return 'secondary';
    }
  };

  const canChangeRole = (staffRole) => {
    if (currentUserRole === 'superadmin') return true;
    if (currentUserRole === 'admin') {
      return staffRole !== 'superadmin';
    }
    return false;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Container className="px-2 px-md-3 py-3">
        <div className="text-center text-white">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading staff data...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="px-2 px-md-3 py-3">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
            <div className="text-center text-md-start">
              <h2 className="text-white mb-1">Staff Management</h2>
              <p className="text-light mb-0">View and manage all staff members</p>
            </div>
            <Badge bg="primary" className="fs-6 px-3 py-2">
              Total Staff: {filteredStaff.length}
            </Badge>
          </div>
        </Col>
      </Row>

      {/* Alerts */}
      {error && (
        <Row className="mb-4">
          <Col>
            <Alert variant="danger" className="d-flex align-items-center">
              <FaTrash className="me-2" />
              {error}
            </Alert>
          </Col>
        </Row>
      )}

      {success && (
        <Row className="mb-4">
          <Col>
            <Alert variant="success" className="d-flex align-items-center">
              <FaSync className="me-2" />
              {success}
            </Alert>
          </Col>
        </Row>
      )}

      {/* Filters and Search */}
      <Row className="mb-4">
        <Col lg={3} md={6} className="mb-2">
          <InputGroup>
            <InputGroup.Text className="bg-dark text-white border-secondary">
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by name, email, department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-dark text-white border-secondary"
            />
          </InputGroup>
        </Col>
        
        <Col lg={2} md={6} className="mb-2">
          <Form.Select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="bg-dark text-white border-secondary"
          >
            <option value="">All Departments</option>
            {departments.map((dept, i) => (
              <option key={i} value={dept}>{dept}</option>
            ))}
          </Form.Select>
        </Col>

        <Col lg={2} md={6} className="mb-2">
          <Form.Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-dark text-white border-secondary"
          >
            <option value="">All Status</option>
            {statusOptions.map((status, i) => (
              <option key={i} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col lg={2} md={6} className="mb-2">
          <Form.Select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="bg-dark text-white border-secondary"
          >
            <option value="">All Roles</option>
            {roleOptions.map((role, i) => (
              <option key={i} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col lg={3} md={6} className="mb-2">
          <Button 
            variant="outline-light" 
            onClick={fetchStaff}
            className="w-100 d-flex align-items-center justify-content-center gap-2"
          >
            <FaSync /> Refresh
          </Button>
        </Col>
      </Row>

      {/* Staff Table */}
      <Row>
        <Col>
          <Card className="bg-dark text-white border-secondary">
            <Card.Header className="border-secondary d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <FaEye className="me-2" />
                Staff List
              </h5>
              <Badge bg="secondary">{filteredStaff.length} staff members</Badge>
            </Card.Header>
            <Card.Body className="p-0">
              {filteredStaff.length === 0 ? (
                <div className="text-center py-5">
                  <FaSearch size={48} className="text-muted mb-3" />
                  <h5 className="text-muted">No staff members found</h5>
                  <p className="text-muted">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table hover variant="dark" className="mb-0">
                    <thead className="border-secondary">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Join Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStaff.map((staff) => (
                        <tr key={staff._id}>
                          <td className="fw-semibold">
                            {staff.name}
                            {staff.role === 'superadmin' && (
                              <Badge bg="danger" className="ms-1" title="Super Admin">
                                SA
                              </Badge>
                            )}
                          </td>
                          <td>{staff.email}</td>
                          <td>
                            <Badge bg="outline-info" text="info">
                              {staff.department}
                            </Badge>
                          </td>
                          <td>{staff.designation}</td>
                          <td>
                            <Badge bg={getRoleVariant(staff.role)}>
                              {staff.role?.charAt(0).toUpperCase() + staff.role?.slice(1)}
                            </Badge>
                          </td>
                          <td>
                            <Badge bg={getStatusVariant(staff.status)}>
                              {staff.status?.charAt(0).toUpperCase() + staff.status?.slice(1)}
                            </Badge>
                          </td>
                          <td>{formatDate(staff.dateOfJoining)}</td>
                          <td>
                            <Dropdown>
                              <Dropdown.Toggle 
                                variant="outline-secondary" 
                                size="sm" 
                                id="dropdown-basic"
                              >
                                Actions
                              </Dropdown.Toggle>

                              <Dropdown.Menu className="bg-dark border-secondary">
                                <Dropdown.Item 
                                  onClick={() => handleView(staff)}
                                  className="text-white"
                                >
                                  <FaEye className="me-2" />
                                  View Details
                                </Dropdown.Item>
                                
                                {canChangeRole(staff.role) && (
                                  <Dropdown.Item 
                                    onClick={() => handleRoleChange(staff)}
                                    className="text-warning"
                                  >
                                    <FaUserCog className="me-2" />
                                    Change Role
                                  </Dropdown.Item>
                                )}
                                
                                <Dropdown.Item className="text-white">
                                  <FaEdit className="me-2" />
                                  Edit
                                </Dropdown.Item>
                                
                                <Dropdown.Divider className="border-secondary" />
                                
                                <Dropdown.Item 
                                  onClick={() => handleDelete(staff)}
                                  className="text-danger"
                                >
                                  <FaTrash className="me-2" />
                                  Delete
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* View Staff Modal */}
      <Modal 
        show={showViewModal} 
        onHide={() => setShowViewModal(false)}
        centered
        size="lg"
        className="text-white"
      >
        <Modal.Header closeButton className="bg-dark border-secondary">
          <Modal.Title>Staff Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          {selectedStaff && (
            <Row className="g-3">
              <Col md={6}>
                <strong>Name:</strong>
                <p>{selectedStaff.name}</p>
              </Col>
              <Col md={6}>
                <strong>Email:</strong>
                <p>{selectedStaff.email}</p>
              </Col>
              <Col md={6}>
                <strong>Phone:</strong>
                <p>{selectedStaff.phone}</p>
              </Col>
              <Col md={6}>
                <strong>Emergency Contact:</strong>
                <p>{selectedStaff.emergencyContact}</p>
              </Col>
              <Col md={6}>
                <strong>Department:</strong>
                <p>
                  <Badge bg="outline-info" text="info">
                    {selectedStaff.department}
                  </Badge>
                </p>
              </Col>
              <Col md={6}>
                <strong>Designation:</strong>
                <p>{selectedStaff.designation}</p>
              </Col>
              <Col md={6}>
                <strong>Role:</strong>
                <p>
                  <Badge bg={getRoleVariant(selectedStaff.role)}>
                    {selectedStaff.role?.charAt(0).toUpperCase() + selectedStaff.role?.slice(1)}
                  </Badge>
                </p>
              </Col>
              <Col md={6}>
                <strong>Qualification:</strong>
                <p>{selectedStaff.qualification}</p>
              </Col>
              <Col md={6}>
                <strong>Status:</strong>
                <p>
                  <Badge bg={getStatusVariant(selectedStaff.status)}>
                    {selectedStaff.status}
                  </Badge>
                </p>
              </Col>
              <Col md={6}>
                <strong>Date of Joining:</strong>
                <p>{formatDate(selectedStaff.dateOfJoining)}</p>
              </Col>
              <Col xs={12}>
                <strong>Address:</strong>
                <p>{selectedStaff.address}</p>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer className="bg-dark border-secondary">
          <Button 
            variant="secondary" 
            onClick={() => setShowViewModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Change Role Modal */}
      <Modal 
        show={showRoleModal} 
        onHide={() => setShowRoleModal(false)}
        centered
        className="text-white"
      >
        <Modal.Header closeButton className="bg-dark border-secondary">
          <Modal.Title>Change Staff Role</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          {selectedStaff && (
            <>
              <p>
                Change role for <strong>{selectedStaff.name}</strong>
              </p>
              <Form.Group>
                <Form.Label>Select New Role:</Form.Label>
                <Form.Select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="bg-dark text-white border-secondary"
                >
                  {roleOptions
                    .filter(role => {
                      if (currentUserRole === 'superadmin') return true;
                      if (currentUserRole === 'admin') return role !== 'superadmin';
                      return false;
                    })
                    .map((role, i) => (
                      <option key={i} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </option>
                    ))
                  }
                </Form.Select>
              </Form.Group>
              <Alert variant="info" className="mt-3 small">
                <strong>Note:</strong> Changing role will affect user permissions and access levels.
              </Alert>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="bg-dark border-secondary">
          <Button 
            variant="secondary" 
            onClick={() => setShowRoleModal(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="warning" 
            onClick={updateStaffRole}
            disabled={!newRole || newRole === selectedStaff?.role}
          >
            <FaUserCog className="me-2" />
            Update Role
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal 
        show={showDeleteModal} 
        onHide={() => setShowDeleteModal(false)}
        centered
        className="text-white"
      >
        <Modal.Header closeButton className="bg-dark border-secondary">
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          {selectedStaff && (
            <p>
              Are you sure you want to delete <strong>{selectedStaff.name}</strong>? 
              This action cannot be undone.
            </p>
          )}
        </Modal.Body>
        <Modal.Footer className="bg-dark border-secondary">
          <Button 
            variant="secondary" 
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={confirmDelete}
          >
            Delete Staff
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ViewStaff;