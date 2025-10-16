import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Table } from 'react-bootstrap';

const   StudentDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { student } = location.state || {};

  if (!student) {
    return (
      <Container fluid className="px-2 px-md-3 py-4">
        <Card className="bg-dark text-white">
          <Card.Body className="text-center py-5">
            <i className="bi bi-exclamation-triangle display-1 text-warning"></i>
            <h3 className="mt-3">Student Not Found</h3>
            <p className="text-light opacity-75">The requested student details could not be loaded.</p>
            <Button variant="primary" onClick={() => navigate('/admin/students')}>
              Back to Students
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  const isProject = student.category === 'project';

  return (
    <Container fluid className="px-2 px-md-3 py-3 bg-dark">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
            <div>
              <Button 
                variant="outline-light" 
                onClick={() => navigate(-1)}
                className="mb-2 d-flex align-items-center gap-2"
                size="sm"
              >
                <i className="bi bi-arrow-left"></i>
                Back
              </Button>
              <h2 className="text-white mb-1">Student Details</h2>
              <p className="text-light mb-0">
                {isProject ? 'Project Student Information' : 'Internship Student Details'}
              </p>
            </div>
            <div className="d-flex gap-2">
              <Badge 
                bg={isProject ? 'warning' : 'primary'} 
                className="fs-6 px-3 py-2"
              >
                {isProject ? 'Project' : 'Internship'}
              </Badge>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Basic Information */}
        {/* <Col lg={8}>
          <Card className="bg-dark text-white h-100">
            <Card.Header className="border-secondary">
              <h5 className="mb-0">
                <i className="bi bi-person me-2"></i>
                Basic Information
              </h5>
            </Card.Header>
            <Card.Body>
              <Row className="g-3">
                <Col sm={6}>
                  <div className="border-bottom border-secondary pb-2">
                    <small className="text-light opacity-75">Form ID</small>
                    <div className="fw-bold text-info">{student.formId}</div>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="border-bottom border-secondary pb-2">
                    <small className="text-light opacity-75">Name</small>
                    <div className="fw-bold">{student.name || student.projectName}</div>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="border-bottom border-secondary pb-2">
                    <small className="text-light opacity-75">Institution</small>
                    <div className="fw-bold text-capitalize">{student.institution}</div>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="border-bottom border-secondary pb-2">
                    <small className="text-light opacity-75">College</small>
                    <div className="fw-bold">{student.college}</div>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="border-bottom border-secondary pb-2">
                    <small className="text-light opacity-75">Date of Joining</small>
                    <div className="fw-bold">{student.dateOfJoining}</div>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="border-bottom border-secondary pb-2">
                    <small className="text-light opacity-75">Fees</small>
                    <div className="fw-bold text-success">₹{student.fees}</div>
                  </div>
                </Col>
              </Row>

              {isProject && (
                <>
                  <hr className="border-secondary my-4" />
                  <h6 className="mb-3 text-warning">
                    <i className="bi bi-folder me-2"></i>
                    Project Details
                  </h6>
                  <Row className="g-3">
                    <Col sm={6}>
                      <div className="border-bottom border-secondary pb-2">
                        <small className="text-light opacity-75">Project Name</small>
                        <div className="fw-bold">{student.projectName}</div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="border-bottom border-secondary pb-2">
                        <small className="text-light opacity-75">Technology</small>
                        <div>
                          <Badge bg="info" className="text-dark">{student.technology}</Badge>
                        </div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="border-bottom border-secondary pb-2">
                        <small className="text-light opacity-75">Department</small>
                        <div className="fw-bold">{student.department}</div>
                      </div>
                    </Col>
                    <Col xs={12}>
                      <div className="border-bottom border-secondary pb-2">
                        <small className="text-light opacity-75">Description</small>
                        <div className="fw-bold mt-1">{student.description || 'No description provided'}</div>
                      </div>
                    </Col>
                  </Row>
                </>
              )}

              {!isProject && (
                <>
                  <hr className="border-secondary my-4" />
                  <h6 className="mb-3 text-info">
                    <i className="bi bi-briefcase me-2"></i>
                    Internship Details
                  </h6>
                  <Row className="g-3">
                    <Col sm={6}>
                      <div className="border-bottom border-secondary pb-2">
                        <small className="text-light opacity-75">Course</small>
                        <div className="fw-bold">{student.course}</div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="border-bottom border-secondary pb-2">
                        <small className="text-light opacity-75">Mode of Course</small>
                        <div className="fw-bold">{student.modeOfCourse}</div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="border-bottom border-secondary pb-2">
                        <small className="text-light opacity-75">Qualification</small>
                        <div className="fw-bold">{student.qualification}</div>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="border-bottom border-secondary pb-2">
                        <small className="text-light opacity-75">Duraction</small>
                        <div className="fw-bold">{student.preferredDuration}</div>
                      </div>
                    </Col>
                  </Row>
                </>
              )}
            </Card.Body>
          </Card>
        </Col> */}

        <Col lg={isProject ? 12 : 8}>
  <Card className="bg-dark text-white h-100">
    <Card.Header className="border-secondary">
      <h5 className="mb-0">
        <i className="bi bi-person me-2"></i>
        Basic Information
      </h5>
    </Card.Header>
    <Card.Body>
      <Row className="g-3">
        <Col sm={6}>
          <div className="border-bottom border-secondary pb-2">
            <small className="text-light opacity-75">Form ID</small>
            <div className="fw-bold text-info">{student.formId}</div>
          </div>
        </Col>
        <Col sm={6}>
          <div className="border-bottom border-secondary pb-2">
            <small className="text-light opacity-75">Name</small>
            <div className="fw-bold">{student.name || student.projectName}</div>
          </div>
        </Col>
        <Col sm={6}>
          <div className="border-bottom border-secondary pb-2">
            <small className="text-light opacity-75">Institution</small>
            <div className="fw-bold text-capitalize">{student.institution}</div>
          </div>
        </Col>
        <Col sm={6}>
          <div className="border-bottom border-secondary pb-2">
            <small className="text-light opacity-75">College</small>
            <div className="fw-bold">{student.college}</div>
          </div>
        </Col>
        <Col sm={6}>
          <div className="border-bottom border-secondary pb-2">
            <small className="text-light opacity-75">Date of Joining</small>
            <div className="fw-bold">{student.dateOfJoining}</div>
          </div>
        </Col>
        <Col sm={6}>
          <div className="border-bottom border-secondary pb-2">
            <small className="text-light opacity-75">Fees</small>
            <div className="fw-bold text-success">₹{student.fees}</div>
          </div>
        </Col>
      </Row>

      {/* Project Specific Details */}
      {isProject && (
        <>
          <hr className="border-secondary my-4" />
          <h6 className="mb-3 text-warning">
            <i className="bi bi-folder me-2"></i>
            Project Details
          </h6>
          <Row className="g-3">
            <Col sm={6}>
              <div className="border-bottom border-secondary pb-2">
                <small className="text-light opacity-75">Project Name</small>
                <div className="fw-bold">{student.projectName}</div>
              </div>
            </Col>
            <Col sm={6}>
              <div className="border-bottom border-secondary pb-2">
                <small className="text-light opacity-75">Technology</small>
                <div>
                  <Badge bg="info" className="text-dark">{student.technology}</Badge>
                </div>
              </div>
            </Col>
            <Col sm={6}>
              <div className="border-bottom border-secondary pb-2">
                <small className="text-light opacity-75">Department</small>
                <div className="fw-bold">{student.department}</div>
              </div>
            </Col>
            <Col xs={6}>
              <div className="border-bottom border-secondary pb-2">
                <small className="text-light opacity-75">Mode of course</small>
                <div className="fw-bold mt-1">{student.modeOfCourse || 'No Mode Of Course provided'}</div>
              </div>
            </Col>
            <Col xs={12}>
              <div className="border-bottom border-secondary pb-2">
                <small className="text-light opacity-75">Description</small>
                <div className="fw-bold mt-1">{student.description || 'No description provided'}</div>
              </div>
            </Col>

            
          </Row>
        </>
      )}

      {/* Internship Specific Details */}
      {!isProject && (
        <>
          <hr className="border-secondary my-4" />
          <h6 className="mb-3 text-info">
            <i className="bi bi-briefcase me-2"></i>
            Internship Details
          </h6>
          <Row className="g-3">
            <Col sm={6}>
              <div className="border-bottom border-secondary pb-2">
                <small className="text-light opacity-75">Course</small>
                <div className="fw-bold">{student.course}</div>
              </div>
            </Col>
            <Col sm={6}>
              <div className="border-bottom border-secondary pb-2">
                <small className="text-light opacity-75">Mode of Course</small>
                <div className="fw-bold">{student.modeOfCourse}</div>
              </div>
            </Col>
            <Col sm={6}>
              <div className="border-bottom border-secondary pb-2">
                <small className="text-light opacity-75">Qualification</small>
                <div className="fw-bold">{student.qualification}</div>
              </div>
            </Col>
            <Col sm={6}>
              <div className="border-bottom border-secondary pb-2">
                <small className="text-light opacity-75">Duration</small>
                <div className="fw-bold">{student.preferredDuration}</div>
              </div>
            </Col>
          </Row>
        </>
      )}
    </Card.Body>
  </Card>
</Col>


        {/* Contact & Additional Information */}
        {/* <Col lg={4}>
         
          <Card className="bg-dark text-white mb-4">
            <Card.Header className="border-secondary">
              <h6 className="mb-0">
                <i className="bi bi-telephone me-2"></i>
                Contact Information
              </h6>
            </Card.Header>
            <Card.Body>
              <div className="d-flex flex-column gap-3">
                {student.email && (
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{width: '35px', height: '35px'}}>
                      <i className="bi bi-envelope"></i>
                    </div>
                    <div>
                      <small className="text-light opacity-75">Email</small>
                      <div className="fw-bold">{student.email}</div>
                    </div>
                  </div>
                )}
                {student.phone && (
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-success rounded-circle d-flex align-items-center justify-content-center" style={{width: '35px', height: '35px'}}>
                      <i className="bi bi-phone"></i>
                    </div>
                    <div>
                      <small className="text-light opacity-75">Phone</small>
                      <div className="fw-bold">{student.phone}</div>
                    </div>
                  </div>
                )}
                {!isProject && student.address && (
                  <div className="d-flex align-items-start gap-3">
                    <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center" style={{width: '35px', height: '35px'}}>
                      <i className="bi bi-geo-alt"></i>
                    </div>
                    <div>
                      <small className="text-light opacity-75">Address</small>
                      <div className="fw-bold small">{student.address}</div>
                      <div className="text-light opacity-75">
                        {student.city}, {student.district}, {student.state} - {student.pin}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>

          {!isProject && (
            <Card className="bg-dark text-white">
              <Card.Header className="border-secondary">
                <h6 className="mb-0">
                  <i className="bi bi-person-badge me-2"></i>
                  Personal Information
                </h6>
              </Card.Header>
              <Card.Body>
                <Row className="g-2">
                  <Col sm={6}>
                    <small className="text-light opacity-75">Date of Birth</small>
                    <div className="fw-bold">{student.dob}</div>
                  </Col>
                  <Col sm={6}>
                    <small className="text-light opacity-75">Age</small>
                    <div className="fw-bold">{student.age} years</div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
        </Col> */}

        {/* Contact & Additional Information */}
{!isProject && (
  <Col lg={4}>
    {/* Contact Information */}
    <Card className="bg-dark text-white mb-4">
      <Card.Header className="border-secondary">
        <h6 className="mb-0">
          <i className="bi bi-telephone me-2"></i>
          Contact Information
        </h6>
      </Card.Header>
      <Card.Body>
        <div className="d-flex flex-column gap-3">
          {student.email && (
            <div className="d-flex align-items-center gap-3">
              <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{width: '35px', height: '35px'}}>
                <i className="bi bi-envelope"></i>
              </div>
              <div>
                <small className="text-light opacity-75">Email</small>
                <div className="fw-bold">{student.email}</div>
              </div>
            </div>
          )}
          {student.phone && (
            <div className="d-flex align-items-center gap-3">
              <div className="bg-success rounded-circle d-flex align-items-center justify-content-center" style={{width: '35px', height: '35px'}}>
                <i className="bi bi-phone"></i>
              </div>
              <div>
                <small className="text-light opacity-75">Phone</small>
                <div className="fw-bold">{student.phone}</div>
              </div>
            </div>
          )}
          {student.address && (
            <div className="d-flex align-items-start gap-3">
              <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center" style={{width: '35px', height: '35px'}}>
                <i className="bi bi-geo-alt"></i>
              </div>
              <div>
                <small className="text-light opacity-75">Address</small>
                <div className="fw-bold small">{student.address}</div>
                <div className="text-light opacity-75">
                  {student.city}, {student.district}, {student.state} - {student.pincode}
                </div>
              </div>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>

    {/* Personal Information */}
    <Card className="bg-dark text-white">
      <Card.Header className="border-secondary">
        <h6 className="mb-0">
          <i className="bi bi-person-badge me-2"></i>
          Personal Information
        </h6>
      </Card.Header>
      <Card.Body>
        <Row className="g-2">
          <Col sm={6}>
            <small className="text-light opacity-75">Date of Birth</small>
            <div className="fw-bold">{new Date(student.dob).toLocaleDateString()}</div>
          </Col>
          <Col sm={6}>
            <small className="text-light opacity-75">Age</small>
            <div className="fw-bold">{student.age} years</div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </Col>
)}

      </Row>

      {/* Group Members Section (Project Only) */}
      {isProject && student.groupMembers && student.groupMembers.length > 0 && (
        <Row className="mt-4">
          <Col>
            <Card className="bg-dark text-white">
              <Card.Header className="border-secondary">
                <h5 className="mb-0">
                  <i className="bi bi-people me-2"></i>
                  Group Members
                </h5>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <Table hover variant="dark" className="mb-0">
                    <thead>
                      <tr>
                        <th style={{borderColor: 'rgba(255,255,255,0.1)'}}>Name</th>
                        <th style={{borderColor: 'rgba(255,255,255,0.1)'}}>Email</th>
                        <th style={{borderColor: 'rgba(255,255,255,0.1)'}}>Phone</th>
                        <th style={{borderColor: 'rgba(255,255,255,0.1)'}}>Registration Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {student.groupMembers.map((member, index) => (
                        <tr key={index}>
                          <td style={{borderColor: 'rgba(255,255,255,0.1)'}}>
                            <div className="d-flex align-items-center">
                              <div 
                                className="rounded-circle d-flex align-items-center justify-content-center me-2"
                                style={{ 
                                  width: '30px', 
                                  height: '30px', 
                                  background: 'rgba(255,255,255,0.1)',
                                  fontSize: '0.7rem'
                                }}
                              >
                                <i className="bi bi-person"></i>
                              </div>
                              {member.name}
                            </div>
                          </td>
                          <td style={{borderColor: 'rgba(255,255,255,0.1)'}}>{member.email}</td>
                          <td style={{borderColor: 'rgba(255,255,255,0.1)'}}>{member.phone}</td>
                          <td style={{borderColor: 'rgba(255,255,255,0.1)'}}>{member.regNumber || 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default StudentDetails;