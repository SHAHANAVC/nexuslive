import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Alert, Badge } from 'react-bootstrap';

const StaffRegistration = () => {
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
  const [success, setSuccess] = useState(false);
  const [documentFiles, setDocumentFiles] = useState([]);

  const departments = [
    'Technical',
    'Marketing'
  ];

  // const designations = [
  //   'Manager',
  //   'Supervisor',
  //   'Senior Staff',
  //   'Junior Staff',
  //   'Technical Lead',
  //   'Developer',
  //   'Analyst',
  //   'Coordinator',
  //   'Specialist',
  //   'Assistant'
  // ];

  const qualifications = [
    'High School',
    'Diploma',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'PhD',
    'Professional Certification'
  ];

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

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
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

    // Email validation
    if (staffData.email && !/\S+@\S+\.\S+/.test(staffData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (staffData.phone && !/^\d{10}$/.test(staffData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    // Emergency contact validation
    if (staffData.emergencyContact && !/^\d{10}$/.test(staffData.emergencyContact)) {
      newErrors.emergencyContact = 'Please enter a valid 10-digit phone number';
    }

    // Password validation
    if (staffData.password && staffData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    // Password confirmation
    if (staffData.password !== staffData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log('Staff data:', {
        ...staffData,
        documents: documentFiles
      });
      
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        // Reset form
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
      }, 3000);
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

  return (
    <Container  className="px-2 px-md-3 py-3">
      {/* Header Section */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
            <div className="text-center text-md-start">
              <h2 className="text-white mb-1">Staff Registration</h2>
              <p className="text-light mb-0">Register new staff members with complete details</p>
            </div>
            <Badge bg="primary" className="fs-6 px-3 py-2">
              New Registration
            </Badge>
          </div>
        </Col>
      </Row>

      {/* Success Alert */}
      {success && (
        <Row className="mb-4">
          <Col>
            <Alert variant="success" className="d-flex align-items-center">
              <i className="bi bi-check-circle-fill me-2 fs-5"></i>
              Staff member registered successfully!
            </Alert>
          </Col>
        </Row>
      )}

      <Row className='justify-content-center'>
        <Col xl={10} xxl={8}>
          <Card className="bg-dark text-white border-secondary">
            <Card.Header className="border-secondary">
              <h5 className="mb-0">
                <i className="bi bi-person-plus me-2"></i>
                Staff Information
              </h5>
            </Card.Header>
            <Card.Body>              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  {/* Personal Information */}
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-light">Full Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={staffData.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                        className="bg-dark text-white border-secondary"
                        placeholder="Enter full name"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-light">Email Address *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={staffData.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                        className="bg-dark text-white border-secondary"
                        placeholder="Enter email address"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-light">Password *</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={staffData.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                        className="bg-dark text-white border-secondary"
                        placeholder="Enter password"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-light">Confirm Password *</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={staffData.confirmPassword}
                        onChange={handleChange}
                        isInvalid={!!errors.confirmPassword}
                        className="bg-dark text-white border-secondary"
                        placeholder="Confirm password"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-light">Phone Number *</Form.Label>
                      <InputGroup>
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
                      <Form.Control.Feedback type="invalid">
                        {errors.phone}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-light">Emergency Contact *</Form.Label>
                      <InputGroup>
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
                      <Form.Control.Feedback type="invalid">
                        {errors.emergencyContact}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label className="text-light">Address *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="address"
                        value={staffData.address}
                        onChange={handleChange}
                        isInvalid={!!errors.address}
                        className="bg-dark text-white border-secondary"
                        placeholder="Enter complete address"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.address}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  {/* Professional Information */}
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-light">Qualification *</Form.Label>
                      <Form.Select
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
                      <Form.Control.Feedback type="invalid">
                        {errors.qualification}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-light">Date of Joining *</Form.Label>
                      <Form.Control
                        type="date"
                        name="dateOfJoining"
                        value={staffData.dateOfJoining}
                        onChange={handleChange}
                        isInvalid={!!errors.dateOfJoining}
                        className="bg-dark text-white border-secondary"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.dateOfJoining}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-light">Department *</Form.Label>
                      <Form.Select
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
                      <Form.Control.Feedback type="invalid">
                        {errors.department}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-light">Designation *</Form.Label>
                      <Form.Select
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
                      <Form.Control.Feedback type="invalid">
                        {errors.designation}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-light">Employment Status</Form.Label>
                      <div>
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
                              <span className="text-capitalize">
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
                      <Form.Label className="text-light">
                        <i className="bi bi-paperclip me-2"></i>
                        Documents Upload
                      </Form.Label>
                      <Form.Control
                        type="file"
                        name="documents"
                        onChange={handleChange}
                        className="bg-dark text-white border-secondary"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                      <Form.Text className="text-light opacity-75">
                        Upload relevant documents (PDF, Word, Images). Max 5 files.
                      </Form.Text>
                      
                      {/* Display selected files */}
                      {documentFiles.length > 0 && (
                        <div className="mt-2">
                          <small className="text-light">Selected files:</small>
                          <div className="mt-1">
                            {documentFiles.map((file, index) => (
                              <Badge 
                                key={index} 
                                bg="secondary" 
                                className="me-2 mb-1"
                              >
                                <i className="bi bi-file-earmark me-1"></i>
                                {file.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </Form.Group>
                  </Col>

                  {/* Form Actions */}
                  <Col xs={12}>
                    <hr className="border-secondary my-4" />
                    <div className="d-flex gap-3 justify-content-end">
                      <Button 
                        variant="outline-light" 
                        type="button"
                        onClick={() => {
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
                        }}
                        className="d-flex align-items-center gap-2"
                      >
                        <i className="bi bi-arrow-clockwise"></i>
                        Reset
                      </Button>
                      <Button 
                        variant="primary" 
                        type="submit"
                        className="d-flex align-items-center gap-2"
                      >
                        <i className="bi bi-person-plus"></i>
                        Register Staff
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Stats Card */}
      <Row className="mt-4">
        <Col md={4}>
          <Card className="bg-dark text-white border-secondary">
            <Card.Body className="text-center">
              <i className="bi bi-info-circle fs-1 text-primary"></i>
              <h5 className="mt-2 mb-1">Form Instructions</h5>
              <p className="text-light opacity-75 mb-0 small">
                Fill all required fields marked with *. Ensure documents are uploaded in supported formats.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="bg-dark text-white border-secondary">
            <Card.Body className="text-center">
              <i className="bi bi-shield-check fs-1 text-success"></i>
              <h5 className="mt-2 mb-1">Data Security</h5>
              <p className="text-light opacity-75 mb-0 small">
                All staff information is securely stored and encrypted. Access is restricted to authorized personnel only.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="bg-dark text-white border-secondary">
            <Card.Body className="text-center">
              <i className="bi bi-headset fs-1 text-info"></i>
              <h5 className="mt-2 mb-1">Need Help?</h5>
              <p className="text-light opacity-75 mb-0 small">
                Contact HR department for assistance with staff registration and document requirements.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StaffRegistration;