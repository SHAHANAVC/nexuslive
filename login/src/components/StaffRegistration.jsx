import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Alert, Badge, Modal } from 'react-bootstrap';
import api from '../api';

const StaffRegistration = ({ show, onHide, onStaffAdded, staff, onSave, isEdit = false }) => {
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
    emergencyContact: { name: '', relation: '', phone: '' },
    status: 'active',
    role: 'staff'
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [documentFiles, setDocumentFiles] = useState([]);

  const departments = ['Technical', 'Marketing'];

  const qualifications = [
    'High School',
    'Diploma',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'PhD',
    'Professional Certification'
  ];

  const roles = ['staff', 'admin'];

  // Initialize form data when staff prop changes (for edit mode)
  useEffect(() => {
    if (isEdit && staff) {
      setStaffData({
        name: staff.name || '',
        email: staff.email || '',
        password: '', // Don't pre-fill password in edit mode
        confirmPassword: '', // Don't pre-fill confirm password in edit mode
        address: staff.address || '',
        phone: staff.phone || '',
        qualification: staff.qualification || '',
        dateOfJoining: staff.dateOfJoining ? staff.dateOfJoining.split('T')[0] : '',
        department: staff.department || '',
        designation: staff.designation || '',
        emergencyContact: staff.emergencyContact || { name: '', relation: '', phone: '' },
        status: staff.status || 'active',
        role: staff.role || 'staff'
      });
      console.log(staff);
      console.log(staffData);
      
    } else {
      // Reset form for create mode
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
        emergencyContact: { name: '', relation: '', phone: '' },
        status: 'active',
        role: 'staff'
      });
    }
    setErrors({});
    setSuccess(false);
  }, [staff, isEdit, show]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('emergencyContact.')) {
      const field = name.split('.')[1];
      setStaffData(prev => ({
        ...prev,
        emergencyContact: {
          ...prev.emergencyContact,
          [field]: value
        }
      }));
    } 
    // else if (name === 'documents') {
    //   setDocumentFiles(Array.from(e.target.files));
    // } 
    else {
      setStaffData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
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
    if (!isEdit && !staffData.password) newErrors.password = 'Password is required';
    if (!staffData.address.trim()) newErrors.address = 'Address is required';
    if (!staffData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!staffData.qualification) newErrors.qualification = 'Qualification is required';
    if (!staffData.dateOfJoining) newErrors.dateOfJoining = 'Date of joining is required';
    if (!staffData.department) newErrors.department = 'Department is required';
    if (!staffData.designation) newErrors.designation = 'Designation is required';
    if (!staffData.emergencyContact.name.trim()) newErrors['emergencyContact.name'] = 'Emergency contact name is required';
    if (!staffData.emergencyContact.relation.trim()) newErrors['emergencyContact.relation'] = 'Emergency contact relation is required';
    if (!staffData.emergencyContact.phone.trim()) newErrors['emergencyContact.phone'] = 'Emergency contact phone is required';

    // Email validation
    if (staffData.email && !/\S+@\S+\.\S+/.test(staffData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (staffData.phone && !/^\d{10}$/.test(staffData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    // Emergency contact validation
    if (staffData.emergencyContact.phone && !/^\d{10}$/.test(staffData.emergencyContact.phone)) {
      newErrors['emergencyContact.phone'] = 'Please enter a valid 10-digit phone number';
    }

    // Password validation (only for create mode)
    if (!isEdit) {
      if (staffData.password && staffData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters long';
      }

      // Password confirmation
      if (staffData.password !== staffData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (validateForm()) {
      try {
        const submitData = { ...staffData };
        
        // Remove password fields if not changing password in edit mode
        if (isEdit) {
          delete submitData.password;
          delete submitData.confirmPassword;
        }

        if (isEdit && staff && staff._id) {
          // Update existing staff
          const response = await api.put(`/staff/${staff._id}`, submitData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          
          if (onSave) {
            onSave(submitData);
          }
          
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
            onHide();
          }, 2000);
        } else {
          // Create new staff
          const response = await api.post('/staff/register', submitData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          alert(response.data.message || 'Successfully registered staff.');
          
          if (onStaffAdded) {
            onStaffAdded();
          }
          
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
            onHide();
          }, 2000);
        }
      } catch (error) {
        console.error('Error saving staff:', error);
        const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Failed to save staff. Please try again.';

      alert(msg);
        setErrors({ submit: error.response?.data?.message || 'Failed to save staff. Please try again.' });
      }
    }
    setLoading(false);
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'probation': return 'warning';
      case 'resigned': return 'danger';
      default: return 'secondary';
    }
  };

  const handleReset = () => {
    if (isEdit && staff) {
      setStaffData({
        name: staff.name || '',
        email: staff.email || '',
        password: '',
        confirmPassword: '',
        address: staff.address || '',
        phone: staff.phone || '',
        qualification: staff.qualification || '',
        dateOfJoining: staff.dateOfJoining ? staff.dateOfJoining.split('T')[0] : '',
        department: staff.department || '',
        designation: staff.designation || '',
        emergencyContact: staff.emergencyContact || { name: '', relation: '', phone: '' },
        status: staff.status || 'active',
        role: staff.role || 'staff'
      });
    } else {
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
        emergencyContact: { name: '', relation: '', phone: '' },
        status: 'active',
        role: 'staff'
      });
    }
    setErrors({});
    // setDocumentFiles([]);
  };

  // If used as a modal, wrap in Modal component
  if (show !== undefined) {
    return (
      <Modal show={show} onHide={onHide} size="xl" centered className="text-white">
        <Modal.Header closeButton className="bg-dark border-secondary text-white">
          <Modal.Title>
            <i className="bi bi-person-plus me-2"></i>
            {isEdit ? 'Edit Staff Member' : 'Register New Staff'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white p-0">
          <StaffFormContent 
            staffData={staffData}
            errors={errors}
            success={success}
            loading={loading}
            isEdit={isEdit}
            departments={departments}
            qualifications={qualifications}
            roles={roles}
            // documentFiles={documentFiles}
            onHandleChange={handleChange}
            onHandleSubmit={handleSubmit}
            onHandleReset={handleReset}
            getStatusVariant={getStatusVariant}
          />
        </Modal.Body>
      </Modal>
    );
  }

  // If used as standalone page
  return (
    <Container className="px-2 px-md-3 py-3">
      <StaffFormContent 
        staffData={staffData}
        errors={errors}
        success={success}
        loading={loading}
        isEdit={isEdit}
        departments={departments}
        qualifications={qualifications}
        roles={roles}
        // documentFiles={documentFiles}
        onHandleChange={handleChange}
        onHandleSubmit={handleSubmit}
        onHandleReset={handleReset}
        getStatusVariant={getStatusVariant}
        showHeader={true}
      />
    </Container>
  );
};

// Separate form content component to avoid code duplication
const StaffFormContent = ({ 
  staffData, errors, success, loading, isEdit, departments, qualifications, roles, 
   onHandleChange, onHandleSubmit, onHandleReset, getStatusVariant, showHeader 
}) => {
  return (
    <>
      {showHeader && (
        <Row className="mb-4">
          <Col>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
              <div className="text-center text-md-start">
                <h2 className="text-white mb-1">{isEdit ? 'Edit Staff' : 'Staff Registration'}</h2>
                <p className="text-light mb-0">
                  {isEdit ? 'Update staff member details' : 'Register new staff members with complete details'}
                </p>
              </div>
              <Badge bg="primary" className="fs-6 px-3 py-2">
                {isEdit ? 'Edit Mode' : 'New Registration'}
              </Badge>
            </div>
          </Col>
        </Row>
      )}

      {/* Success Alert */}
      {success && (
        <Row className="mb-4">
          <Col>
            <Alert variant="success" className="d-flex align-items-center">
              <i className="bi bi-check-circle-fill me-2 fs-5"></i>
              {isEdit ? 'Staff member updated successfully!' : 'Staff member registered successfully!'}
            </Alert>
          </Col>
        </Row>
      )}

      {/* Error Alert */}
      {errors.submit && (
        <Row className="mb-4">
          <Col>
            <Alert variant="danger" className="d-flex align-items-center">
              <i className="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
              {errors.submit}
            </Alert>
          </Col>
        </Row>
      )}

      <Row className='justify-content-center'>
        <Col>
          <Card className="bg-dark text-white border-secondary">
            {/* <Card.Header className="border-secondary">
              <h5 className="mb-0">
                <i className="bi bi-person-plus me-2"></i>
                {isEdit ? 'Edit Staff Information' : 'Staff Information'}
              </h5>
            </Card.Header> */}
            <Card.Body>
              <Form onSubmit={onHandleSubmit}>
                <Row className="g-3">
                  {/* Personal Information */}
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="text-light">Full Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={staffData.name}
                        onChange={onHandleChange}
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
                        onChange={onHandleChange}
                        isInvalid={!!errors.email}
                        className="bg-dark text-white border-secondary"
                        placeholder="Enter email address"
                        disabled={isEdit} // Email shouldn't be changed in edit mode
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                      {isEdit && (
                        <Form.Text className="text-warning">
                          Email cannot be changed
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>

                  {/* Password fields only for new registration */}
                  {!isEdit && (
                    <>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="text-light">Password *</Form.Label>
                          <Form.Control
                            type="password"
                            name="password"
                            value={staffData.password}
                            onChange={onHandleChange}
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
                            onChange={onHandleChange}
                            isInvalid={!!errors.confirmPassword}
                            className="bg-dark text-white border-secondary"
                            placeholder="Confirm password"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </>
                  )}

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
                          onChange={onHandleChange}
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
                      <Form.Label className="text-light">Role</Form.Label>
                      <Form.Select
                        name="role"
                        value={staffData.role}
                        onChange={onHandleChange}
                        className="bg-dark text-white border-secondary"
                      >
                        {roles.map((role, index) => (
                          <option key={index} value={role}>
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  {/* Emergency Contact */}
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label className="text-light">Emergency Contact Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="emergencyContact.name"
                        value={staffData.emergencyContact.name}
                        onChange={onHandleChange}
                        isInvalid={!!errors['emergencyContact.name']}
                        className="bg-dark text-white border-secondary"
                        placeholder="Contact name"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors['emergencyContact.name']}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group>
                      <Form.Label className="text-light">Relation *</Form.Label>
                      <Form.Control
                        type="text"
                        name="emergencyContact.relation"
                        value={staffData.emergencyContact.relation}
                        onChange={onHandleChange}
                        isInvalid={!!errors['emergencyContact.relation']}
                        className="bg-dark text-white border-secondary"
                        placeholder="Relation"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors['emergencyContact.relation']}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group>
                      <Form.Label className="text-light">Emergency Phone *</Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="bg-dark text-white border-secondary">
                          <i className="bi bi-telephone-fill"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="tel"
                          name="emergencyContact.phone"
                          value={staffData.emergencyContact.phone}
                          onChange={onHandleChange}
                          isInvalid={!!errors['emergencyContact.phone']}
                          className="bg-dark text-white border-secondary"
                          placeholder="10-digit phone number"
                        />
                      </InputGroup>
                      <Form.Control.Feedback type="invalid">
                        {errors['emergencyContact.phone']}
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
                        onChange={onHandleChange}
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
                        onChange={onHandleChange}
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
                        onChange={onHandleChange}
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
                        onChange={onHandleChange}
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
                      <Form.Control
                        type="text"
                        name="designation"
                        value={staffData.designation}
                        onChange={onHandleChange}
                        isInvalid={!!errors.designation}
                        className="bg-dark text-white border-secondary"
                        placeholder="Enter designation"
                      />
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
                            onChange={onHandleChange}
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
                  {/* <Col xs={12}>
                    <Form.Group>
                      <Form.Label className="text-light">
                        <i className="bi bi-paperclip me-2"></i>
                        Documents Upload
                      </Form.Label>
                      <Form.Control
                        type="file"
                        name="documents"
                        onChange={onHandleChange}
                        className="bg-dark text-white border-secondary"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                      <Form.Text className="text-light opacity-75">
                        Upload relevant documents (PDF, Word, Images). Max 5 files.
                      </Form.Text>
                      
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
                  </Col> */}

                  {/* Form Actions */}
                  <Col xs={12}>
                    <hr className="border-secondary my-4" />
                    <div className="d-flex gap-3 justify-content-end">
                      <Button 
                        variant="outline-light" 
                        type="button"
                        onClick={onHandleReset}
                        className="d-flex align-items-center gap-2"
                        disabled={loading}
                      >
                        <i className="bi bi-arrow-clockwise"></i>
                        Reset
                      </Button>
                      <Button 
                        variant="primary" 
                        type="submit"
                        className="d-flex align-items-center gap-2"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" />
                            {isEdit ? 'Updating...' : 'Registering...'}
                          </>
                        ) : (
                          <>
                            <i className="bi bi-person-plus"></i>
                            {isEdit ? 'Update Staff' : 'Register Staff'}
                          </>
                        )}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* {showHeader && (
        <Row className="mt-4">
          <Col md={4}>
            <Card className="bg-dark text-white border-secondary">
              <Card.Body className="text-center">
                <i className="bi bi-info-circle fs-1 text-primary"></i>
                <h5 className="mt-2 mb-1">Form Instructions</h5>
                <p className="text-light opacity-75 mb-0 small">
                  Fill all required fields marked with *. {isEdit ? 'Update the necessary information.' : 'Ensure documents are uploaded in supported formats.'}
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
      )} */}
    </>
  );
};

export default StaffRegistration;