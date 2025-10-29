import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Modal, Alert, Badge  } from 'react-bootstrap';

function Profile({ staffData }) {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  const handleChangePassword = () => {
    // Basic validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setAlert({ show: true, message: 'Please fill all fields', type: 'danger' });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setAlert({ show: true, message: 'New passwords do not match', type: 'danger' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setAlert({ show: true, message: 'Password must be at least 6 characters', type: 'danger' });
      return;
    }

    // Here you would typically make an API call to change the password
    console.log('Changing password:', passwordData);
    
    // Simulate success
    setAlert({ show: true, message: 'Password changed successfully!', type: 'success' });
    setTimeout(() => {
      setShowChangePassword(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setAlert({ show: false, message: '', type: '' });
    }, 2000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'secondary';
      case 'suspended': return 'danger';
      default: return 'primary';
    }
  };

  if (!staffData) {
    return (
      <Container fluid>
        <div className="text-center text-white py-5">
          <p>Loading profile data...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid>
      {/* Page Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <h2 className="mb-1 text-white" style={{ fontWeight: '600' }}>My Profile</h2>
              <p className="text-light mb-0">View and manage your personal information</p>
            </div>
            <Button 
              className="d-flex p-2 button align-items-center gap-2"
              onClick={() => setShowChangePassword(true)}
            >
              <i className="bi bi-key"></i>
              Change Password
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Personal Information */}
        <Col lg={6}>
          <Card className="custom-card h-100">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-4">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: 'white'
                  }}
                >
                  {staffData.name?.charAt(0) || 'A'}
                </div>
                <div>
                  <h4 className="text-white mb-1">{staffData.name}</h4>
                  <Badge bg={getStatusVariant(staffData.status)} className="text-capitalize">
                    {staffData.status}
                  </Badge>
                </div>
              </div>

              <h5 className="text-white mb-3 border-bottom pb-2" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                Personal Information
              </h5>
              
              <Row className="g-3">
                <Col sm={6}>
                  <div>
                    <small className="text-white">Employee ID</small>
                    <p className="text-white mb-0 fw-semibold">{staffData.employeeId}</p>
                  </div>
                </Col>
                <Col sm={6}>
                  <div>
                    <small className="text-white">Email</small>
                    <p className="text-white mb-0 fw-semibold">{staffData.email}</p>
                  </div>
                </Col>
                <Col sm={6}>
                  <div>
                    <small className="text-white">Phone</small>
                    <p className="text-white mb-0 fw-semibold">{staffData.phone}</p>
                  </div>
                </Col>
                <Col sm={6}>
                  <div>
                    <small className="text-white">Address</small>
                    <p className="text-white mb-0 fw-semibold">{staffData.address}</p>
                  </div>
                </Col>
                <Col sm={12}>
                  <div>
                    <small className="text-white">Qualification</small>
                    <p className="text-white mb-0 fw-semibold">{staffData.qualification}</p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Employment Details */}
        <Col lg={6}>
          <Card className="custom-card h-100">
            <Card.Body className="p-4">
              <h5 className="text-white mb-3 border-bottom pb-2" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                Employment Details
              </h5>
              
              <Row className="g-3">
                <Col sm={6}>
                  <div>
                    <small className="text-white">Role</small>
                    <p className="text-white mb-0 fw-semibold text-capitalize">{staffData.role}</p>
                  </div>
                </Col>
                <Col sm={6}>
                  <div>
                    <small className="text-white">Department</small>
                    <p className="text-white mb-0 fw-semibold">{staffData.department}</p>
                  </div>
                </Col>
                <Col sm={6}>
                  <div>
                    <small className="text-white">Designation</small>
                    <p className="text-white mb-0 fw-semibold">{staffData.designation}</p>
                  </div>
                </Col>
                <Col sm={6}>
                  <div>
                    <small className="text-white">Date of Joining</small>
                    <p className="text-white mb-0 fw-semibold">{formatDate(staffData.dateOfJoining)}</p>
                  </div>
                </Col>
                {/* <Col sm={6}>
                  <div>
                    <small className="text-white">Account Created</small>
                    <p className="text-white mb-0 fw-semibold">{formatDate(staffData.createdAt)}</p>
                  </div>
                </Col> */}
              </Row>

              {/* Emergency Contact */}
              <div className="mt-4 pt-3 border-top" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <h6 className="text-white mb-3">Emergency Contact</h6>
                {staffData.emergencyContact ? (
                  <Row className="g-3">
                    <Col sm={6}>
                      <div>
                        <small className="text-white">Name</small>
                        <p className="text-white mb-0 fw-semibold">{staffData.emergencyContact.name}</p>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div>
                        <small className="text-white">Phone</small>
                        <p className="text-white mb-0 fw-semibold">{staffData.emergencyContact.phone}</p>
                      </div>
                    </Col>
                    <Col sm={12}>
                      <div>
                        <small className="text-white">Relation</small>
                        <p className="text-white mb-0 fw-semibold">{staffData.emergencyContact.relation}</p>
                      </div>
                    </Col>
                  </Row>
                ) : (
                  <p className="text-white mb-0">No emergency contact provided</p>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Additional Information */}
        {/* <Col lg={12}>
          <Card className="custom-card">
            <Card.Body className="p-4">
              <h5 className="text-white mb-3">Additional Information</h5>
              <Row className="g-4">
                <Col md={4}>
                  <div className="text-center">
                    <div className="mb-2">
                      <i className="bi bi-file-text text-primary" style={{ fontSize: '2rem' }}></i>
                    </div>
                    <h6 className="text-white">Documents</h6>
                    <p className="text-white mb-0">
                      {staffData.documents?.length || 0} document(s) uploaded
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="text-center">
                    <div className="mb-2">
                      <i className="bi bi-clock-history text-warning" style={{ fontSize: '2rem' }}></i>
                    </div>
                    <h6 className="text-white">Edit History</h6>
                    <p className="text-white mb-0">
                      {staffData.editHistory?.length || 0} edit(s) recorded
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="text-center">
                    <div className="mb-2">
                      <i className="bi bi-shield-check text-success" style={{ fontSize: '2rem' }}></i>
                    </div>
                    <h6 className="text-white">Account Status</h6>
                    <Badge bg={getStatusVariant(staffData.status)} className="text-capitalize">
                      {staffData.status}
                    </Badge>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>

      {/* Change Password Modal */}
      <Modal 
        show={showChangePassword} 
        onHide={() => setShowChangePassword(false)}
        centered
      >
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          {alert.show && (
            <Alert variant={alert.type} className="mb-3">
              {alert.message}
            </Alert>
          )}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Current Password</Form.Label>
              <Form.Control
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                className="custom-input"
                placeholder="Enter current password"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">New Password</Form.Label>
              <Form.Control
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                className="custom-input"
                placeholder="Enter new password"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                className="custom-input"
                placeholder="Confirm new password"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button variant="secondary" onClick={() => setShowChangePassword(false)}>
            Cancel
          </Button>
          <Button className="button" onClick={handleChangePassword}>
            Change Password
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Profile;