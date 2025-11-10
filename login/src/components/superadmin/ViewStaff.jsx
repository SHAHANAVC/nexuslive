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
import api from '../../api';
import StaffRegistrationForm from '../admin/StaffRegistraionForm';
import StaffRegistration from '../StaffRegistration';

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
  const [showEditModal, setShowEditModal] = useState(false);
  const [newRole, setNewRole] = useState('');
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  const departments = ['Technical', 'Marketing'];
  const statusOptions = ['active', 'probation', 'resigned'];
  const roleOptions = ['staff', 'admin','teamlead'];

  // Get current user role from localStorage or context
  // const currentUserRole = localStorage.getItem('userData') || 'admin';
  // console.log(currentUserRole);
  const storedUser = localStorage.getItem('userData');
const currentUserRole = storedUser ? JSON.parse(storedUser) : { role: 'admin' };

  

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
        
      })
        // console.log(response);
      ;
      
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

  // console.log(selectedStaff);
  
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

  const handleEdit = (staff) => {
    // console.log(staff,"1111111111111111111111111111111111111111111111111111111111111111111111111");
    
    setEditingStaff(staff);
    setShowEditModal(true);
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

  // Handle staff update
  const handleUpdateStaff = async (staffData) => {
    // console.log(editingStaff._id);
    
    try {
      if (editingStaff && editingStaff._id) {
        const response = await api.put(
          `/staff/${editingStaff._id}`,
          staffData,
          {
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        
        setSuccess('Staff member updated successfully!');
        setShowEditModal(false);
        setEditingStaff(null);
        fetchStaff();
        
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      console.error('Error updating staff:', err);
      setError('Failed to update staff member. Please try again.');
    }
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/staff/${selectedStaff._id}`, {
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
      case 'superAdmin': return 'danger';
      case 'admin': return 'warning';
      case 'teamlead': return 'warning';
      case 'staff': return 'info';
      default: return 'secondary';
    }
  };

  const canChangeRole = (staffRole) => {
    if (currentUserRole.role === 'superAdmin') return true;
    if (currentUserRole.role === 'admin') {
      return staffRole !== 'superAdmin';
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
<Container fluid className="px-2 px-sm-1 py-3">
  {/* Header */}
  <Row className="mb-3">
    <Col>
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
        <div className="text-center text-sm-start mb-1 mb-sm-0">
          <h2 className="text-white mb-0 h4">Staff Management</h2>
          <p className="text-light mb-0 small d-none d-sm-block">View and manage all staff members</p>
        </div>
        <div className='d-flex flex-column flex-xs-row gap-2 '>
          <Badge bg="primary" className="fs-6 px-2 py-1 d-flex align-items-center justify-content-center gap-1">
            <i className="bi bi-people"></i>
            Total: {filteredStaff.length}
          </Badge>
          <Button 
            variant="success" 
            className="d-flex align-items-center gap-1 justify-content-center py-1"
            onClick={() => setShowRegistrationModal(true)}
            size="sm"
          >
            <i className="bi bi-person-plus"></i>
            <span>Add Staff</span>
          </Button>
        </div>
      </div>
    </Col>
  </Row>

  {/* Alerts */}
  {error && (
    <Row className="mb-3">
      <Col>
        <Alert variant="danger" className="d-flex align-items-center py-2">
          <i className="bi bi-exclamation-triangle me-2"></i>
          <span className="small">{error}</span>
        </Alert>
      </Col>
    </Row>
  )}

  {success && (
    <Row className="mb-3">
      <Col>
        <Alert variant="success" className="d-flex align-items-center py-2">
          <i className="bi bi-check-circle me-2"></i>
          <span className="small">{success}</span>
        </Alert>
      </Col>
    </Row>
  )}

  {/* Filters and Search */}
  <Row className="mb-3 g-1">
    <Col xs={12} lg={6} className="mb-2">
      <InputGroup size="sm">
        <InputGroup.Text className="bg-dark text-white border-secondary">
          <i className="bi bi-search"></i>
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search staff..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-dark text-white border-secondary"
        />
      </InputGroup>
    </Col>
    
    <Col xs={6} className="mb-2">
      <Form.Select
        size="sm"
        value={filterDepartment}
        onChange={(e) => setFilterDepartment(e.target.value)}
        className="bg-dark text-white border-secondary small"
      >
        <option value="">All Departments</option>
        {departments.map((dept, i) => (
          <option key={i} value={dept}>{dept}</option>
        ))}
      </Form.Select>
    </Col>

    <Col xs={6} className="mb-2">
      <Form.Select
        size="sm"
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="bg-dark text-white border-secondary small"
      >
        <option value="">All Status</option>
        {statusOptions.map((status, i) => (
          <option key={i} value={status}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </option>
        ))}
      </Form.Select>
    </Col>

    <Col xs={6} className="mb-2">
      <Form.Select
        size="sm"
        value={filterRole}
        onChange={(e) => setFilterRole(e.target.value)}
        className="bg-dark text-white border-secondary small"
      >
        <option value="">All Roles</option>
        {roleOptions.map((role, i) => (
          <option key={i} value={role}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </option>
        ))}
      </Form.Select>
    </Col>

    <Col xs={6} lg={3} className="mb-2">
      <div className="d-flex gap-1 h-100">
        <Button
          variant="outline-light"
          size="sm"
          className="d-flex align-items-center justify-content-center gap-1 flex-fill py-1"
          onClick={fetchStaff}
        >
          <i className="bi bi-arrow-clockwise"></i>
          <span className="d-none d-lg-inline">Refresh</span>
        </Button>

        <Button
          variant="outline-danger"
          size="sm"
          className="d-flex align-items-center justify-content-center gap-1 flex-fill py-1"
          onClick={() => {
            setSearchTerm('');
            setFilterDepartment('');
            setFilterStatus('');
            setFilterRole('');
          }}
        >
          <i className="bi bi-x-circle"></i>
          <span className="d-none d-lg-inline">Reset</span>
        </Button>
      </div>
    </Col>
  </Row>

  {/* Staff Table - Mobile Cards View */}
  <Row>
    <Col>
      <Card className="bg-dark text-white border-secondary">
        <Card.Header className="border-secondary d-flex justify-content-between align-items-center py-2">
          <h5 className="mb-0 small">Staff List</h5>
          <Badge bg="secondary" className="small">{filteredStaff.length} staff</Badge>
        </Card.Header>
        <Card.Body className="p-0">
          {filteredStaff.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-search display-4 text-muted mb-2"></i>
              <h6 className="text-muted">No staff members found</h6>
              <p className="text-muted small">Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              {/* Mobile Cards View - for screens below 576px */}
              <div className="d-block d-sm-none">
                <div className="p-2">
                  {filteredStaff.map((staff) => (
                    <Card key={staff._id} className="bg-secondary-dark text-white mb-2 border-secondary">
                      <Card.Body className="p-2">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div className="flex-grow-1">
                            <h6 className="mb-0 text-truncate">{staff.name}</h6>
                            {staff.role === 'superAdmin' && (
                              <Badge bg="danger" className="ms-1" title="Super Admin">
                                SA
                              </Badge>
                            )}
                            <div className="small text-muted">{staff.phone}</div>
                          </div>
                          <div className="d-flex gap-1">
                            <Button
                              variant="outline-info"
                              size="sm"
                              onClick={() => handleView(staff)}
                              className="p-1"
                              title="View Details"
                            >
                              <i className="bi bi-eye"></i>
                            </Button>
                            <Dropdown>
                              <Dropdown.Toggle 
                                variant="outline-secondary" 
                                size="sm" 
                                id={`dropdown-mobile-${staff._id}`}
                                className="p-1"
                              >
                                <i className="bi bi-three-dots"></i>
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="bg-dark border-secondary">
                                <Dropdown.Item 
                                  onClick={() => handleView(staff)}
                                  className="text-white small"
                                >
                                  <i className="bi bi-eye me-2"></i>
                                  View Details
                                </Dropdown.Item>
                                
                                {canChangeRole(staff.role) && (
                                  <Dropdown.Item 
                                    onClick={() => handleRoleChange(staff)}
                                    className="text-warning small"
                                  >
                                    <i className="bi bi-person-gear me-2"></i>
                                    Change Role
                                  </Dropdown.Item>
                                )}
                                
                                <Dropdown.Item 
                                  onClick={() => handleEdit(staff)}
                                  className="text-info small"
                                >
                                  <i className="bi bi-pencil me-2"></i>
                                  Edit
                                </Dropdown.Item>
                                
                                <Dropdown.Divider className="border-secondary" />
                                
                                <Dropdown.Item 
                                  onClick={() => handleDelete(staff)}
                                  className="text-danger small"
                                >
                                  <i className="bi bi-trash me-2"></i>
                                  Delete
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        
                        <div className="row g-1 small">
                          <div className="col-6">
                            <strong>Dept:</strong>
                            <Badge bg="outline-info" text="info" className="ms-1">
                              {staff.department}
                            </Badge>
                          </div>
                          <div className="col-6">
                            <strong>Role:</strong>
                            <Badge bg={getRoleVariant(staff.role)} className="ms-1">
                              {staff.role?.charAt(0).toUpperCase()}
                            </Badge>
                          </div>
                          <div className="col-6">
                            <strong>Status:</strong>
                            <Badge bg={getStatusVariant(staff.status)} className="ms-1">
                              {staff.status?.charAt(0).toUpperCase()}
                            </Badge>
                          </div>
                          <div className="col-6">
                            <strong>Joined:</strong>
                            <span className="ms-1">{formatDate(staff.dateOfJoining, 'short')}</span>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Table View - for screens 576px and above */}
              <div className="d-none d-sm-block table-responsive">
                <Table hover variant="dark" className="mb-0 small">
                  <thead className="border-secondary">
                    <tr>
                      <th>Name</th>
                      <th className="d-none d-lg-table-cell">Phone</th>
                      <th>Department</th>
                      <th className="d-none d-xl-table-cell">Designation</th>
                      <th>Role</th>
                      <th className="d-none d-md-table-cell">Status</th>
                      <th className="d-none d-lg-table-cell">Join Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStaff.map((staff) => (
                      <tr key={staff._id}>
                        <td className="fw-semibold">
                          <div className="d-flex flex-column">
                            <span>{staff.name}</span>
                            <small className="text-muted d-lg-none">{staff.phone}</small>
                            {staff.role === 'superAdmin' && (
                              <Badge bg="danger" className="mt-1 align-self-start" title="Super Admin">
                                SA
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="d-none d-lg-table-cell">{staff.phone}</td>
                        <td>
                          <Badge bg="outline-info" text="info" className="text-wrap">
                            {staff.department}
                          </Badge>
                        </td>
                        <td className="d-none d-xl-table-cell">{staff.designation}</td>
                        <td>
                          <Badge bg={getRoleVariant(staff.role)} className="text-wrap">
                            {staff.role?.charAt(0).toUpperCase() + staff.role?.slice(1)}
                          </Badge>
                        </td>
                        <td className="d-none d-md-table-cell">
                          <Badge bg={getStatusVariant(staff.status)}>
                            {staff.status?.charAt(0).toUpperCase() + staff.status?.slice(1)}
                          </Badge>
                        </td>
                        <td className="d-none d-lg-table-cell">{formatDate(staff.dateOfJoining)}</td>
                        <td>
                          <div className="d-flex gap-1">
                            <Button
                              variant="outline-info"
                              size="sm"
                              onClick={() => handleView(staff)}
                              className="d-flex align-items-center"
                              title="View Details"
                            >
                              <i className="bi bi-eye"></i>
                              <span className="d-none d-xl-inline ms-1">View</span>
                            </Button>
                            
                            <Dropdown>
                              <Dropdown.Toggle 
                                variant="outline-secondary" 
                                size="sm" 
                                id={`dropdown-${staff._id}`}
                                className="d-flex align-items-center"
                              >
                                <i className="bi bi-three-dots"></i>
                              </Dropdown.Toggle>

                              <Dropdown.Menu className="bg-dark border-secondary">
                                <Dropdown.Item 
                                  onClick={() => handleView(staff)}
                                  className="text-white"
                                >
                                  <i className="bi bi-eye me-2"></i>
                                  View Details
                                </Dropdown.Item>
                                
                                {canChangeRole(staff.role) && (
                                  <Dropdown.Item 
                                    onClick={() => handleRoleChange(staff)}
                                    className="text-warning"
                                  >
                                    <i className="bi bi-person-gear me-2"></i>
                                    Change Role
                                  </Dropdown.Item>
                                )}
                                
                                <Dropdown.Item 
                                  onClick={() => handleEdit(staff)}
                                  className="text-info"
                                >
                                  <i className="bi bi-pencil me-2"></i>
                                  Edit
                                </Dropdown.Item>
                                
                                <Dropdown.Divider className="border-secondary" />
                                
                                <Dropdown.Item 
                                  onClick={() => handleDelete(staff)}
                                  className="text-danger"
                                >
                                  <i className="bi bi-trash me-2"></i>
                                  Delete
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </Col>
  </Row>

  {/* Add this CSS for better mobile support */}
  <style jsx>{`
    @media (max-width: 575px) {
      .bg-secondary-dark {
        background-color: #2a2a2a !important;
      }
      .container-fluid {
        padding-left: 8px;
        padding-right: 8px;
      }
      .card-body {
        padding: 0.5rem;
      }
    }
    
    @media (max-width: 424px) {
      .container-fluid {
        padding-left: 4px;
        padding-right: 4px;
      }
      .btn {
        font-size: 0.75rem;
      }
      .badge {
        font-size: 0.7rem;
      }
    }
  `}</style>

  {/* Rest of your modals remain the same */}
  {/* View Staff Modal */}
  <Modal 
    show={showViewModal} 
    onHide={() => setShowViewModal(false)}
    centered
    size="lg"
    className="text-white"
  >
    <Modal.Header closeButton className="bg-dark border-secondary text-white py-2">
      <Modal.Title className="h6">Staff Details</Modal.Title>
    </Modal.Header>
    <Modal.Body className="bg-dark text-white py-2">
      {selectedStaff && (
        <Row className="g-2 small">
          <Col xs={12} md={6}>
            <strong>Name:</strong>
            <p className="mb-1">{selectedStaff.name}</p>
          </Col>
          <Col xs={12} md={6}>
            <strong>Email:</strong>
            <p className="mb-1">{selectedStaff.email}</p>
          </Col>
          <Col xs={12} md={6}>
            <strong>Phone:</strong>
            <p className="mb-1">{selectedStaff.phone}</p>
          </Col>
          
          <Col xs={12} md={6}>
            <strong>Department:</strong>
            <p className="mb-1">
              <Badge bg="outline-info" text="info">
                {selectedStaff.department}
              </Badge>
            </p>
          </Col>
          <Col xs={12} md={6}>
            <strong>Designation:</strong>
            <p className="mb-1">{selectedStaff.designation}</p>
          </Col>
          <Col xs={12} md={6}>
            <strong>Role:</strong>
            <p className="mb-1">
              <Badge bg={getRoleVariant(selectedStaff.role)}>
                {selectedStaff.role?.charAt(0).toUpperCase() + selectedStaff.role?.slice(1)}
              </Badge>
            </p>
          </Col>
          <Col xs={12} md={6}>
            <strong>Qualification:</strong>
            <p className="mb-1">{selectedStaff.qualification}</p>
          </Col>
          <Col xs={12} md={6}>
            <strong>Status:</strong>
            <p className="mb-1">
              <Badge bg={getStatusVariant(selectedStaff.status)}>
                {selectedStaff.status}
              </Badge>
            </p>
          </Col>
          <Col xs={12} md={6}>
            <strong>Date of Joining:</strong>
            <p className="mb-1">{formatDate(selectedStaff.dateOfJoining)}</p>
          </Col>
          <Col xs={12}>
            <strong>Address:</strong>
            <p className="mb-1">{selectedStaff.address}</p>
          </Col>
          <Col xs={12}>
            <strong>Emergency Contact:</strong>
            <div className="border rounded p-2 bg-dark mt-1">
              <div className="mb-1">
                <strong>Name:</strong> {selectedStaff.emergencyContact?.name}
              </div>
              <div className="mb-1">
                <strong>Relation:</strong> {selectedStaff.emergencyContact?.relation}
              </div>
              <div className="mb-0">
                <strong>Phone:</strong> {selectedStaff.emergencyContact?.phone}
              </div>
            </div>
          </Col>
        </Row>
      )}
    </Modal.Body>
    <Modal.Footer className="bg-dark border-secondary py-2">
      <Button 
        variant="secondary" 
        onClick={() => setShowViewModal(false)}
        size="sm"
      >
        Close
      </Button>
    </Modal.Footer>
  </Modal>

  {/* Edit Staff Modal */}
  <Modal 
    show={showEditModal} 
    onHide={() => {
      setShowEditModal(false);
      setEditingStaff(null);
    }}
    size="xl"
    centered
    className="text-white"
  >
    <Modal.Header closeButton className="bg-dark border-secondary text-white py-2">
      <Modal.Title className="h6">
        <i className="bi bi-pencil me-2"></i>
        Edit Staff Member
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className="bg-dark text-white py-2">
      {editingStaff && (
        <StaffRegistration
          staff={editingStaff}
          onSave={handleUpdateStaff}
          onCancel={() => {
            setShowEditModal(false);
            setEditingStaff(null);
          }}
          isEdit={true}
        />
      )}
    </Modal.Body>
  </Modal>

  {/* Change Role Modal */}
  <Modal 
    show={showRoleModal} 
    onHide={() => setShowRoleModal(false)}
    centered
    className="text-white"
  >
    <Modal.Header closeButton className="bg-dark border-secondary text-white py-2">
      <Modal.Title className="h6">Change Staff Role</Modal.Title>
    </Modal.Header>
    <Modal.Body className="bg-dark text-white py-2">
      {selectedStaff && (
        <>
          <p className="small">
            Change role for <strong>{selectedStaff.name}</strong>
          </p>
          <Form.Group>
            <Form.Label className="small">Select New Role:</Form.Label>
            <Form.Select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="bg-dark text-white border-secondary small"
              size="sm"
            >
              {roleOptions
                .filter(role => {
                  if (currentUserRole.role === 'superAdmin') return true;
                  if (currentUserRole.role === 'admin') return role !== 'superAdmin';
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
          <Alert variant="info" className="mt-2 small py-2">
            <strong>Note:</strong> Changing role will affect user permissions and access levels.
          </Alert>
        </>
      )}
    </Modal.Body>
    <Modal.Footer className="bg-dark border-secondary py-2">
      <Button 
        variant="secondary" 
        onClick={() => setShowRoleModal(false)}
        size="sm"
      >
        Cancel
      </Button>
      <Button 
        variant="warning" 
        onClick={updateStaffRole}
        disabled={!newRole || newRole === selectedStaff?.role}
        size="sm"
      >
        <i className="bi bi-person-gear me-2"></i>
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
    <Modal.Header closeButton className="bg-dark text-light border-secondary py-2">
      <Modal.Title className="h6">Confirm Delete</Modal.Title>
    </Modal.Header>
    <Modal.Body className="bg-dark text-light py-2">
      {selectedStaff && (
        <p className="small mb-0">
          Are you sure you want to delete <strong>{selectedStaff.name}</strong>? 
          This action cannot be undone.
        </p>
      )}
    </Modal.Body>
    <Modal.Footer className="bg-dark border-secondary py-2">
      <Button 
        variant="secondary" 
        onClick={() => setShowDeleteModal(false)}
        size="sm"
      >
        Cancel
      </Button>
      <Button 
        variant="danger" 
        onClick={confirmDelete}
        size="sm"
      >
        Delete Staff
      </Button>
    </Modal.Footer>
  </Modal>

  {/* Add Staff Modal */}
  <StaffRegistration
    show={showRegistrationModal}
    onHide={() => setShowRegistrationModal(false)}
    onStaffAdded={() => {
      setShowRegistrationModal(false);
      fetchStaff();
    }}
    departments={departments}
    qualifications={['High School', 'Diploma', 'Bachelor\'s Degree', 
      'Master\'s Degree', 'PhD', 'Professional Certification']}
  />
</Container>
  );
};

export default ViewStaff;