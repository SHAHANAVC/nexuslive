import React, { useState, useEffect } from 'react';
import { 
  Container, Row, Col, Card, Table, Button, Form, InputGroup, Badge, 
  Modal, Dropdown, Pagination, Alert 
} from 'react-bootstrap';
import StaffRegistrationForm from './StaffRegistraionForm'; // Adjust import path as needed

const AdminStaff = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Departments, designations, qualifications arrays
  const departments = [
    'Administration', 'Academic', 'Technical', 'Human Resources', 
    'Finance', 'Marketing', 'IT Support', 'Research & Development'
  ];

  const designations = [
    'Manager', 'Supervisor', 'Senior Staff', 'Junior Staff', 
    'Technical Lead', 'Developer', 'Analyst', 'Coordinator', 
    'Specialist', 'Assistant'
  ];

  const qualifications = [
    'High School', 'Diploma', 'Bachelor\'s Degree', 
    'Master\'s Degree', 'PhD', 'Professional Certification'
  ];

  // Initialize mock data
  useEffect(() => {
    const mockStaff = [
      {
        id: 1,
        name: 'John Smith',
        email: 'john.smith@company.com',
        phone: '1234567890',
        department: 'Administration',
        designation: 'Manager',
        qualification: "Master's Degree",
        dateOfJoining: '2020-01-15',
        status: 'active',
        address: '123 Main St, City, State',
        emergencyContact: '0987654321',
        documents: []
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        email: 'sarah.j@company.com',
        phone: '2345678901',
        department: 'Academic',
        designation: 'Senior Staff',
        qualification: "PhD",
        dateOfJoining: '2019-03-20',
        status: 'active',
        address: '456 Oak Ave, City, State',
        emergencyContact: '9876543210',
        documents: []
      },
      {
        id: 3,
        name: 'Mike Chen',
        email: 'mike.chen@company.com',
        phone: '3456789012',
        department: 'IT Support',
        designation: 'Technical Lead',
        qualification: "Bachelor's Degree",
        dateOfJoining: '2021-06-10',
        status: 'probation',
        address: '789 Pine Rd, City, State',
        emergencyContact: '8765432109',
        documents: []
      },
      {
        id: 4,
        name: 'Emily Davis',
        email: 'emily.davis@company.com',
        phone: '4567890123',
        department: 'Human Resources',
        designation: 'Coordinator',
        qualification: "Master's Degree",
        dateOfJoining: '2018-11-05',
        status: 'active',
        address: '321 Elm St, City, State',
        emergencyContact: '7654321098',
        documents: []
      }
    ];
    
    setStaffMembers(mockStaff);
    setFilteredStaff(mockStaff);
  }, []);

  // Filter staff based on search and filters
  useEffect(() => {
    let filtered = staffMembers;

    if (searchTerm) {
      filtered = filtered.filter(staff =>
        staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.designation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (departmentFilter) {
      filtered = filtered.filter(staff => staff.department === departmentFilter);
    }

    if (statusFilter) {
      filtered = filtered.filter(staff => staff.status === statusFilter);
    }

    setFilteredStaff(filtered);
    setCurrentPage(1);
  }, [searchTerm, departmentFilter, statusFilter, staffMembers]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStaff = filteredStaff.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);

  // Staff Management Functions
  const handleViewDetails = (staff) => {
    setSelectedStaff(staff);
    setShowDetailsModal(true);
  };

  const handleDeleteStaff = (staffId) => {
    setStaffMembers(prev => prev.filter(staff => staff.id !== staffId));
    setShowDeleteAlert(true);
    setTimeout(() => setShowDeleteAlert(false), 3000);
  };

  const handleStatusChange = (staffId, newStatus) => {
    setStaffMembers(prev =>
      prev.map(staff =>
        staff.id === staffId ? { ...staff, status: newStatus } : staff
      )
    );
  };

  const handleStaffAdded = (newStaff) => {
    // Add ID and other necessary fields
    const staffWithId = {
      ...newStaff,
      id: staffMembers.length > 0 ? Math.max(...staffMembers.map(s => s.id)) + 1 : 1
    };

    setStaffMembers(prev => [...prev, staffWithId]);
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setDepartmentFilter('');
    setStatusFilter('');
  };

  const getTotalByStatus = (status) => {
    return staffMembers.filter(staff => staff.status === status).length;
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'probation': return 'warning';
      case 'resigned': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <div className="staff-list-page">
      <div className="content-wrapper">
        {/* Header Section - Mobile Optimized */}
        <div className="page-header mb-3 mb-md-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
            <div className="text-center text-md-start mb-2 mb-md-0">
              <h2 className="text-white mb-1 fs-4 fs-md-3">Staff Management</h2>
              <p className="text-light mb-0 small d-none d-md-block">View and manage all staff members</p>
              <p className="text-light mb-0 small d-md-none">Manage staff members</p>
            </div>
            <div className="d-flex flex-column flex-sm-row gap-2 w-100 w-md-auto">
              <Badge bg="primary" className="fs-6 px-3 py-2 text-center">
                Total: {staffMembers.length}
              </Badge>
              <Button 
                variant="success" 
                className="d-flex align-items-center gap-2 justify-content-center"
                onClick={() => setShowRegistrationModal(true)}
                size="sm"
              >
                <i className="bi bi-person-plus"></i>
                <span className="d-none d-sm-inline">Add New Staff</span>
                <span className="d-sm-none">Add Staff</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Success Alerts */}
        {showDeleteAlert && (
          <div className="mb-3 mb-md-4">
            <Alert variant="success" className="d-flex align-items-center py-2">
              <i className="bi bi-check-circle-fill me-2"></i>
              <span className="small">Staff member deleted successfully!</span>
            </Alert>
          </div>
        )}

        {showSuccessAlert && (
          <div className="mb-3 mb-md-4">
            <Alert variant="success" className="d-flex align-items-center py-2">
              <i className="bi bi-check-circle-fill me-2"></i>
              <span className="small">Staff member registered successfully!</span>
            </Alert>
          </div>
        )}

        {/* Stats Cards - Responsive Grid */}
        <Row className="mb-3 mb-md-4 g-2 g-md-3">
          <Col xs={6} md={3}>
            <Card className="bg-dark text-white border-success h-100">
              <Card.Body className="text-center p-2 p-md-3">
                <i className="bi bi-person-check fs-2 fs-md-1 text-success"></i>
                <h4 className="mt-1 mt-md-2 mb-0 fs-5 fs-md-4">{getTotalByStatus('active')}</h4>
                <p className="text-light opacity-75 mb-0 small">Active</p>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={3}>
            <Card className="bg-dark text-white border-warning h-100">
              <Card.Body className="text-center p-2 p-md-3">
                <i className="bi bi-person-dash fs-2 fs-md-1 text-warning"></i>
                <h4 className="mt-1 mt-md-2 mb-0 fs-5 fs-md-4">{getTotalByStatus('probation')}</h4>
                <p className="text-light opacity-75 mb-0 small">Probation</p>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={3}>
            <Card className="bg-dark text-white border-danger h-100">
              <Card.Body className="text-center p-2 p-md-3">
                <i className="bi bi-person-x fs-2 fs-md-1 text-danger"></i>
                <h4 className="mt-1 mt-md-2 mb-0 fs-5 fs-md-4">{getTotalByStatus('resigned')}</h4>
                <p className="text-light opacity-75 mb-0 small">Resigned</p>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={3}>
            <Card className="bg-dark text-white border-info h-100">
              <Card.Body className="text-center p-2 p-md-3">
                <i className="bi bi-building fs-2 fs-md-1 text-info"></i>
                <h4 className="mt-1 mt-md-2 mb-0 fs-5 fs-md-4">{new Set(staffMembers.map(s => s.department)).size}</h4>
                <p className="text-light opacity-75 mb-0 small">Departments</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Filters Card - Stack on Mobile */}
        <Card className="bg-dark text-white border-secondary mb-3 mb-md-4">
          <Card.Header className="border-secondary py-2">
            <h5 className="mb-0 fs-6 fs-md-5">
              <i className="bi bi-funnel me-2"></i>
              Filters & Search
            </h5>
          </Card.Header>
          <Card.Body className="p-2 p-md-3">
            <Row className="g-2 g-md-3">
              <Col xs={12} md={4}>
                <Form.Group>
                  <Form.Label className="text-light small">Search Staff</Form.Label>
                  <InputGroup size="sm">
                    <InputGroup.Text className="bg-dark text-white border-secondary">
                      <i className="bi bi-search"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Search by name, email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-dark text-white border-secondary"
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={4}>
                <Form.Group>
                  <Form.Label className="text-light small">Department</Form.Label>
                  <Form.Select
                    size="sm"
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="bg-dark text-white border-secondary"
                  >
                    <option value="">All Departments</option>
                    {departments.map((dept, index) => (
                      <option key={index} value={dept}>{dept}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={4}>
                <Form.Group>
                  <Form.Label className="text-light small">Status</Form.Label>
                  <Form.Select
                    size="sm"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-dark text-white border-secondary"
                  >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="probation">Probation</option>
                    <option value="resigned">Resigned</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12}>
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
                  <small className="text-light opacity-75">
                    Showing {filteredStaff.length} of {staffMembers.length} staff
                  </small>
                  <Button 
                    variant="outline-light" 
                    size="sm"
                    onClick={resetFilters}
                    className="d-flex align-items-center gap-1"
                  >
                    <i className="bi bi-arrow-clockwise"></i>
                    Reset
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Staff Table - Horizontal Scroll on Mobile */}
        <Card className="bg-dark text-white border-secondary">
          <Card.Header className="border-secondary d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center py-2">
            <h5 className="mb-1 mb-md-0 fs-6 fs-md-5">
              <i className="bi bi-people me-2"></i>
              Staff Members
            </h5>
            <Badge bg="secondary" className="fs-6">
              Page {currentPage} of {totalPages}
            </Badge>
          </Card.Header>
          <Card.Body className="p-0">
            <div className="table-responsive-md">
              <Table hover variant="dark" className="mb-0">
                <thead className="border-secondary">
                  <tr>
                    <th className="border-secondary">Staff Member</th>
                    <th className="border-secondary d-none d-md-table-cell">Department</th>
                    <th className="border-secondary d-none d-sm-table-cell">Designation</th>
                    <th className="border-secondary d-none d-lg-table-cell">Qualification</th>
                    <th className="border-secondary d-none d-sm-table-cell">Join Date</th>
                    <th className="border-secondary">Status</th>
                    <th className="border-secondary text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentStaff.length > 0 ? (
                    currentStaff.map((staff) => (
                      <tr key={staff.id} className="align-middle">
                        <td className="border-secondary">
                          <div>
                            <strong className="text-white d-block">{staff.name}</strong>
                            <small className="text-light opacity-75 d-block">{staff.email}</small>
                            <small className="text-light opacity-75 d-block d-md-none">{staff.department}</small>
                            <small className="text-light opacity-75 d-block d-sm-none">{staff.designation}</small>
                          </div>
                        </td>
                        <td className="border-secondary d-none d-md-table-cell">
                          <Badge bg="outline-info" className="text-info">
                            {staff.department}
                          </Badge>
                        </td>
                        <td className="border-secondary d-none d-sm-table-cell">{staff.designation}</td>
                        <td className="border-secondary d-none d-lg-table-cell">{staff.qualification}</td>
                        <td className="border-secondary d-none d-sm-table-cell">
                          {new Date(staff.dateOfJoining).toLocaleDateString()}
                        </td>
                        <td className="border-secondary">
                          <Badge bg={getStatusVariant(staff.status)} className="fs-6">
                            <span className="d-none d-sm-inline">{staff.status.toUpperCase()}</span>
                            <span className="d-sm-none">
                              {staff.status === 'active' ? 'A' : staff.status === 'probation' ? 'P' : 'R'}
                            </span>
                          </Badge>
                        </td>
                        <td className="border-secondary text-center">
                          <Dropdown>
                            <Dropdown.Toggle 
                              variant="outline-light" 
                              size="sm" 
                              id="dropdown-basic"
                              className="d-flex align-items-center gap-1"
                            >
                              <i className="bi bi-three-dots"></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu variant="dark">
                              <Dropdown.Item 
                                onClick={() => handleViewDetails(staff)}
                                className="d-flex align-items-center gap-2"
                              >
                                <i className="bi bi-eye"></i>
                                View Details
                              </Dropdown.Item>
                              <Dropdown.Item 
                                className="d-flex align-items-center gap-2"
                              onClick={() => {/* Edit functionality */}}
                              >
                                <i className="bi bi-pencil"></i>
                                Edit Staff
                              </Dropdown.Item>
                              <Dropdown.Divider />
                              <Dropdown.Item 
                                onClick={() => handleStatusChange(staff.id, 'active')}
                                className="d-flex align-items-center gap-2"
                              >
                                <i className="bi bi-person-check"></i>
                                Set Active
                              </Dropdown.Item>
                              <Dropdown.Item 
                                onClick={() => handleStatusChange(staff.id, 'probation')}
                                className="d-flex align-items-center gap-2"
                              >
                                <i className="bi bi-person-dash"></i>
                                Set Probation
                              </Dropdown.Item>
                              <Dropdown.Divider />
                              <Dropdown.Item 
                                onClick={() => handleDeleteStaff(staff.id)}
                                className="d-flex align-items-center gap-2 text-danger"
                              >
                                <i className="bi bi-trash"></i>
                                Delete Staff
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-4 border-secondary">
                        <i className="bi bi-people fs-1 text-secondary d-block mb-2"></i>
                        <span className="text-light">No staff members found</span>
                        <br />
                        <small className="text-light opacity-75">
                          Try adjusting your search or filters
                        </small>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>

        {/* Pagination - Responsive */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-3 mt-md-4">
            <Pagination size="sm" className="flex-wrap justify-content-center">
              <Pagination.Prev 
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next 
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </Pagination>
          </div>
        )}

        {/* Staff Details Modal - Responsive */}
        <Modal 
          show={showDetailsModal} 
          onHide={() => setShowDetailsModal(false)}
          size="lg"
          centered
          scrollable
        >
          <Modal.Header closeButton className="bg-dark text-white border-secondary">
            <Modal.Title className="fs-6 fs-md-5">
              <i className="bi bi-person-badge me-2"></i>
              Staff Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark text-white">
            {selectedStaff && (
              <Row className="g-2 g-md-3">
                <Col xs={12} md={6}>
                  <strong className="small">Full Name:</strong>
                  <p className="text-light mb-2">{selectedStaff.name}</p>
                </Col>
                <Col xs={12} md={6}>
                  <strong className="small">Email:</strong>
                  <p className="text-light mb-2">{selectedStaff.email}</p>
                </Col>
                <Col xs={12} md={6}>
                  <strong className="small">Phone:</strong>
                  <p className="text-light mb-2">{selectedStaff.phone}</p>
                </Col>
                <Col xs={12} md={6}>
                  <strong className="small">Emergency Contact:</strong>
                  <p className="text-light mb-2">{selectedStaff.emergencyContact}</p>
                </Col>
                <Col xs={12} md={6}>
                  <strong className="small">Department:</strong>
                  <p className="text-light mb-2">{selectedStaff.department}</p>
                </Col>
                <Col xs={12} md={6}>
                  <strong className="small">Designation:</strong>
                  <p className="text-light mb-2">{selectedStaff.designation}</p>
                </Col>
                <Col xs={12} md={6}>
                  <strong className="small">Qualification:</strong>
                  <p className="text-light mb-2">{selectedStaff.qualification}</p>
                </Col>
                <Col xs={12} md={6}>
                  <strong className="small">Date of Joining:</strong>
                  <p className="text-light mb-2">
                    {new Date(selectedStaff.dateOfJoining).toLocaleDateString()}
                  </p>
                </Col>
                <Col xs={12} md={6}>
                  <strong className="small">Status:</strong>
                  <p className="mb-2">
                    <Badge bg={getStatusVariant(selectedStaff.status)}>
                      {selectedStaff.status.toUpperCase()}
                    </Badge>
                  </p>
                </Col>
                <Col xs={12}>
                  <strong className="small">Address:</strong>
                  <p className="text-light mb-0">{selectedStaff.address}</p>
                </Col>
              </Row>
            )}
          </Modal.Body>
          <Modal.Footer className="bg-dark border-secondary d-flex flex-column flex-sm-row gap-2">
            <Button 
              variant="secondary" 
              onClick={() => setShowDetailsModal(false)}
              className="order-2 order-sm-1"
            >
              Close
            </Button>
            <Button 
              variant="primary"
              className="order-1 order-sm-2"
              onClick={() => {/* Edit functionality */}}
            >
              Edit Staff
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Staff Registration Form Component */}
        <StaffRegistrationForm
          show={showRegistrationModal}
          onHide={() => setShowRegistrationModal(false)}
          onStaffAdded={handleStaffAdded}
          departments={departments}
          designations={designations}
          qualifications={qualifications}
        />
      </div>

      {/* Responsive CSS */}
      <style>{`
        .staff-list-page {
          width: 100%;
          min-height: 100vh;
        }
        .content-wrapper {
          padding: 0.75rem;
          margin-left: 0;
          transition: all 0.3s;
        }
        @media (min-width: 768px) {
          .content-wrapper {
            padding: 1.5rem;
          }
        }
        .table-responsive-md {
          overflow-x: auto;
        }
        @media (max-width: 767.98px) {
          .table-responsive-md {
            font-size: 0.875rem;
          }
        }
        
        /* Improve mobile touch targets */
        @media (max-width: 576px) {
          .btn {
            min-height: 44px;
          }
          .form-control, .form-select {
            min-height: 44px;
          }
        }
        
        /* Better modal handling on mobile */
        @media (max-width: 575.98px) {
          .modal-dialog {
            margin: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminStaff;