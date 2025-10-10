import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup, Badge, Alert } from 'react-bootstrap';

const StaffRegistrationForm = ({ 
  show, 
  onHide, 
  onStaffAdded,
  departments = [],
  designations = [],
  qualifications = []
}) => {
  const [staffData, setStaffData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone: '',
    qualification: '',
    dateOfJoining: '',
    department: '',
    designation: '',
    emergencyContact: '',
    status: 'active',
    documents: []
  });

  const [errors, setErrors] = useState({});
  const [documentFiles, setDocumentFiles] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'documents') {
      setDocumentFiles(Array.from(files));
    } else {
      setStaffData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!staffData.name.trim()) newErrors.name = 'Name is required';
    if (!staffData.email.trim()) newErrors.email = 'Email is required';
    if (!staffData.password) newErrors.password = 'Password is required';
    if (!staffData.confirmPassword) newErrors.confirmPassword = 'Please confirm password';
    if (!staffData.address.trim()) newErrors.address = 'Address is required';
    if (!staffData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!staffData.qualification) newErrors.qualification = 'Qualification is required';
    if (!staffData.dateOfJoining) newErrors.dateOfJoining = 'Date of joining is required';
    if (!staffData.department) newErrors.department = 'Department is required';
    if (!staffData.designation) newErrors.designation = 'Designation is required';
    if (!staffData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact is required';

    if (staffData.email && !/\S+@\S+\.\S+/.test(staffData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (staffData.phone && !/^\d{10}$/.test(staffData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (staffData.emergencyContact && !/^\d{10}$/.test(staffData.emergencyContact)) {
      newErrors.emergencyContact = 'Please enter a valid 10-digit phone number';
    }

    if (staffData.password && staffData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (staffData.password !== staffData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Create new staff member
      const newStaff = {
        name: staffData.name,
        email: staffData.email,
        phone: staffData.phone,
        department: staffData.department,
        designation: staffData.designation,
        qualification: staffData.qualification,
        dateOfJoining: staffData.dateOfJoining,
        status: staffData.status,
        address: staffData.address,
        emergencyContact: staffData.emergencyContact,
        documents: documentFiles
      };

      // Call the parent component's callback
      if (onStaffAdded) {
        onStaffAdded(newStaff);
      }
      
      // Show success message
      setShowSuccessAlert(true);
      
      // Reset form
      resetForm();
      
      // Close modal after delay
      setTimeout(() => {
        setShowSuccessAlert(false);
        if (onHide) onHide();
      }, 2000);
    }
  };

  const resetForm = () => {
    setStaffData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
      phone: '',
      qualification: '',
      dateOfJoining: '',
      department: '',
      designation: '',
      emergencyContact: '',
      status: 'active',
      documents: []
    });
    setDocumentFiles([]);
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    if (onHide) onHide();
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
    <Modal 
      show={show} 
      onHide={handleClose}
      size="xl"
      centered
      scrollable
      responsive
    >
      <Modal.Header closeButton className="bg-dark text-white border-secondary">
        <Modal.Title className="fs-6 fs-md-5">
          <i className="bi bi-person-plus me-2"></i>
          Register New Staff
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white p-2 p-md-3">
        {/* Success Alert */}
        {showSuccessAlert && (
          <div className="mb-3">
            <Alert variant="success" className="d-flex align-items-center py-2">
              <i className="bi bi-check-circle-fill me-2"></i>
              <span className="small">Staff member registered successfully!</span>
            </Alert>
          </div>
        )}

        <Form onSubmit={handleSubmit}>
          <Row className="g-2 g-md-3">
            {/* Personal Information */}
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label className="text-light small">Full Name *</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="name"
                  value={staffData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                  className="bg-dark text-white border-secondary"
                  placeholder="Enter full name"
                />
                <Form.Control.Feedback type="invalid" className="small">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label className="text-light small">Email Address *</Form.Label>
                <Form.Control
                  size="sm"
                  type="email"
                  name="email"
                  value={staffData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  className="bg-dark text-white border-secondary"
                  placeholder="Enter email address"
                />
                <Form.Control.Feedback type="invalid" className="small">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label className="text-light small">Password *</Form.Label>
                <Form.Control
                  size="sm"
                  type="password"
                  name="password"
                  value={staffData.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                  className="bg-dark text-white border-secondary"
                  placeholder="Enter password"
                />
                <Form.Control.Feedback type="invalid" className="small">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label className="text-light small">Confirm Password *</Form.Label>
                <Form.Control
                  size="sm"
                  type="password"
                  name="confirmPassword"
                  value={staffData.confirmPassword}
                  onChange={handleChange}
                  isInvalid={!!errors.confirmPassword}
                  className="bg-dark text-white border-secondary"
                  placeholder="Confirm password"
                />
                <Form.Control.Feedback type="invalid" className="small">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label className="text-light small">Phone Number *</Form.Label>
                <InputGroup size="sm">
                  <InputGroup.Text className="bg-dark text-white border-secondary">
                    <i className="bi bi-phone"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={staffData.phone}
                    onChange={handleChange}
                    isInvalid={!!errors.phone}
                    className="bg-dark text-white border-secondary"
                    placeholder="10-digit phone number"
                  />
                </InputGroup>
                <Form.Control.Feedback type="invalid" className="small">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label className="text-light small">Emergency Contact *</Form.Label>
                <InputGroup size="sm">
                  <InputGroup.Text className="bg-dark text-white border-secondary">
                    <i className="bi bi-telephone-fill"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="tel"
                    name="emergencyContact"
                    value={staffData.emergencyContact}
                    onChange={handleChange}
                    isInvalid={!!errors.emergencyContact}
                    className="bg-dark text-white border-secondary"
                    placeholder="Emergency contact number"
                  />
                </InputGroup>
                <Form.Control.Feedback type="invalid" className="small">
                  {errors.emergencyContact}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group>
                <Form.Label className="text-light small">Address *</Form.Label>
                <Form.Control
                  size="sm"
                  as="textarea"
                  rows={2}
                  name="address"
                  value={staffData.address}
                  onChange={handleChange}
                  isInvalid={!!errors.address}
                  className="bg-dark text-white border-secondary"
                  placeholder="Enter complete address"
                />
                <Form.Control.Feedback type="invalid" className="small">
                  {errors.address}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Professional Information */}
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label className="text-light small">Qualification *</Form.Label>
                <Form.Select
                  size="sm"
                  name="qualification"
                  value={staffData.qualification}
                  onChange={handleChange}
                  isInvalid={!!errors.qualification}
                  className="bg-dark text-white border-secondary"
                >
                  <option value="">Select Qualification</option>
                  {qualifications.map((qual, index) => (
                    <option key={index} value={qual}>{qual}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid" className="small">
                  {errors.qualification}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label className="text-light small">Date of Joining *</Form.Label>
                <Form.Control
                  size="sm"
                  type="date"
                  name="dateOfJoining"
                  value={staffData.dateOfJoining}
                  onChange={handleChange}
                  isInvalid={!!errors.dateOfJoining}
                  className="bg-dark text-white border-secondary"
                />
                <Form.Control.Feedback type="invalid" className="small">
                  {errors.dateOfJoining}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label className="text-light small">Department *</Form.Label>
                <Form.Select
                  size="sm"
                  name="department"
                  value={staffData.department}
                  onChange={handleChange}
                  isInvalid={!!errors.department}
                  className="bg-dark text-white border-secondary"
                >
                  <option value="">Select Department</option>
                  {departments.map((dept, index) => (
                    <option key={index} value={dept}>{dept}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid" className="small">
                  {errors.department}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label className="text-light small">Designation *</Form.Label>
                <Form.Select
                  size="sm"
                  name="designation"
                  value={staffData.designation}
                  onChange={handleChange}
                  isInvalid={!!errors.designation}
                  className="bg-dark text-white border-secondary"
                >
                  <option value="">Select Designation</option>
                  {designations.map((desig, index) => (
                    <option key={index} value={desig}>{desig}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid" className="small">
                  {errors.designation}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group>
                <Form.Label className="text-light small">Employment Status</Form.Label>
                <div className="d-flex flex-wrap gap-2">
                  {['active', 'probation', 'resigned'].map((status) => (
                    <Form.Check
                      key={status}
                      inline
                      type="radio"
                      name="status"
                      id={`status-${status}`}
                      value={status}
                      checked={staffData.status === status}
                      onChange={handleChange}
                      label={
                        <span className="text-capitalize small">
                          <Badge bg={getStatusVariant(status)} className="me-1">
                            {status}
                          </Badge>
                        </span>
                      }
                      className="text-light"
                    />
                  ))}
                </div>
              </Form.Group>
            </Col>

            {/* Documents Upload */}
            <Col xs={12}>
              <Form.Group>
                <Form.Label className="text-light small">
                  <i className="bi bi-paperclip me-2"></i>
                  Documents Upload
                </Form.Label>
                <Form.Control
                  size="sm"
                  type="file"
                  name="documents"
                  onChange={handleChange}
                  className="bg-dark text-white border-secondary"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <Form.Text className="text-light opacity-75 small">
                  Upload relevant documents (PDF, Word, Images). Max 5 files.
                </Form.Text>
                
                {documentFiles.length > 0 && (
                  <div className="mt-2">
                    <small className="text-light">Selected files:</small>
                    <div className="mt-1 d-flex flex-wrap gap-1">
                      {documentFiles.map((file, index) => (
                        <Badge 
                          key={index} 
                          bg="secondary" 
                          className="d-flex align-items-center"
                        >
                          <i className="bi bi-file-earmark me-1"></i>
                          <span className="text-truncate" style={{maxWidth: '120px'}}>
                            {file.name}
                          </span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className="bg-dark border-secondary d-flex flex-column flex-sm-row gap-2">
        <Button 
          variant="outline-light" 
          onClick={resetForm}
          className="d-flex align-items-center gap-2 order-2 order-sm-1"
          size="sm"
        >
          <i className="bi bi-arrow-clockwise"></i>
          Reset
        </Button>
        <div className="d-flex gap-2 order-1 order-sm-2">
          <Button 
            variant="secondary" 
            onClick={handleClose}
            size="sm"
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSubmit}
            className="d-flex align-items-center gap-2"
            size="sm"
          >
            <i className="bi bi-person-plus"></i>
            Register
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default StaffRegistrationForm;