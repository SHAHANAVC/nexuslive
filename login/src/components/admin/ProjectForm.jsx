import React, { useState } from 'react';
import { Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

const ProjectForm = ({ student, onSave, onCancel }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    category: 'project',
    institution: student?.institution || '',
    collegeName: student?.collegeName || '',
    dateOfJoining: student?.dateOfJoining || '',
    fees: student?.fees || '',
    technology: student?.technology || '',
    projectName: student?.projectName || '',
    department: student?.department || '',
    modeOfCourse: student?.modeOfCourse || '',
    description: student?.description || '',
    groupMembers: student?.groupMembers || [
      { name: '', email: '', phone: '', regNumber: '' }
    ]
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGroupMemberChange = (index, field, value) => {
    const updatedMembers = [...formData.groupMembers];
    updatedMembers[index][field] = value;
    setFormData(prev => ({
      ...prev,
      groupMembers: updatedMembers
    }));
  };

  const addGroupMember = () => {
    setFormData(prev => ({
      ...prev,
      groupMembers: [
        ...prev.groupMembers,
        { name: '', email: '', phone: '', regNumber: '' }
      ]
    }));
  };

  const removeGroupMember = (index) => {
    if (formData.groupMembers.length > 1) {
      const updatedMembers = formData.groupMembers.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        groupMembers: updatedMembers
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.institution) newErrors.institution = 'Institution is required';
    if (!formData.collegeName) newErrors.collegeName = 'College name is required';
    if (!formData.dateOfJoining) newErrors.dateOfJoining = 'Date of joining is required';
    if (!formData.fees) newErrors.fees = 'Fees is required';
    if (!formData.technology) newErrors.technology = 'Technology is required';
    if (!formData.projectName) newErrors.projectName = 'Project name is required';
    if (!formData.modeOfCourse) newErrors.modeOfCourse = 'Mode of course required'
    if (!formData.department) newErrors.department = 'Department is required';

    // Validate group members
    formData.groupMembers.forEach((member, index) => {
      if (!member.name) newErrors[`memberName_${index}`] = `Member ${index + 1} name is required`;
      if (!member.email) newErrors[`memberEmail_${index}`] = `Member ${index + 1} email is required`;
      if (!member.phone) newErrors[`memberPhone_${index}`] = `Member ${index + 1} phone is required`;
      if (!member.regNumber) newErrors[`memberRegno_${index}`] = `Member ${index + 1} Reg No is required`;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // onSave(formData);
      try{
      const response = await api.post('/registrations',formData)
      console.log(response);
      alert(response.data.message)
      navigate('/')

      
      }
      catch{(error)=>{
        console.log(error);
        alert(error.response.data.message)
        
      }}
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="p-3">
        <Row className="g-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Institution *</Form.Label>
              <Form.Select
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                isInvalid={!!errors.institution}
                className="bg-dark text-white"
              >
                <option value="">Select Institution</option>
                <option value="nexus">Nexus</option>
                <option value="trycode">Trycode</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.institution}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>College Name *</Form.Label>
              <Form.Control
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                isInvalid={!!errors.collegeName}
                className="bg-dark text-white"
                placeholder="Enter college name"
              />
              <Form.Control.Feedback type="invalid">
                {errors.collegeName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Date of Joining *</Form.Label>
              <Form.Control
                type="date"
                name="dateOfJoining"
                value={formData.dateOfJoining}
                onChange={handleChange}
                isInvalid={!!errors.dateOfJoining}
                className="bg-dark text-white"
              />
              <Form.Control.Feedback type="invalid">
                {errors.dateOfJoining}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Fees *</Form.Label>
              <Form.Control
                type="number"
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                isInvalid={!!errors.fees}
                className="bg-dark text-white"
                placeholder="Enter fees amount"
              />
              <Form.Control.Feedback type="invalid">
                {errors.fees}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Technology *</Form.Label>
              <Form.Control
                type="text"
                name="technology"
                value={formData.technology}
                onChange={handleChange}
                isInvalid={!!errors.technology}
                className="bg-dark text-white"
                placeholder="Enter technology stack"
              />
              <Form.Control.Feedback type="invalid">
                {errors.technology}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Project Name *</Form.Label>
              <Form.Control
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                isInvalid={!!errors.projectName}
                className="bg-dark text-white"
                placeholder="Enter project name"
              />
              <Form.Control.Feedback type="invalid">
                {errors.projectName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Department *</Form.Label>
              <Form.Select
                name="department"
                value={formData.department}
                onChange={handleChange}
                isInvalid={!!errors.department}
                className="bg-dark text-white"
              >
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Electronics">Electronics</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.department}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
                      <Form.Group>
                        <Form.Label>Mode of Course *</Form.Label>
                        <Form.Select
                          name="modeOfCourse"
                          value={formData.modeOfCourse}
                          onChange={handleChange}
                          isInvalid={!!errors.modeOfCourse}
                          className="bg-dark text-white"
                        >
                          <option value="">Select Mode</option>
                          <option value="Detailed">Detailed</option>
                          <option value="Fastrack">Fastrack</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.modeOfCourse}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

          <Col md={12}>
            <Form.Group>
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="bg-dark text-white"
                placeholder="Enter project description"
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Group Members Section */}
        <Card className="bg-dark border-secondary mt-3">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <span>Group Members</span>
            <Button variant="outline-success" size="sm" onClick={addGroupMember}>
              <i className="bi bi-plus-circle"></i> Add Member
            </Button>
          </Card.Header>
          <Card.Body>
            {formData.groupMembers.map((member, index) => (
              <Row key={index} className="g-3 mb-3 border-bottom pb-3">
                <Col md={12}>
                  <h6 className="text-light">Member {index + 1}</h6>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Name *</Form.Label>
                    <Form.Control
                      type="text"
                      value={member.name}
                      onChange={(e) => handleGroupMemberChange(index, 'name', e.target.value)}
                      isInvalid={!!errors[`memberName_${index}`]}
                      className="bg-dark text-white"
                      placeholder="Full name"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors[`memberName_${index}`]}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Email *</Form.Label>
                    <Form.Control
                      type="email"
                      value={member.email}
                      onChange={(e) => handleGroupMemberChange(index, 'email', e.target.value)}
                      isInvalid={!!errors[`memberEmail_${index}`]}
                      className="bg-dark text-white"
                      placeholder="Email address"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors[`memberEmail_${index}`]}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Phone *</Form.Label>
                    <Form.Control
                      type="tel"
                      value={member.phone}
                      onChange={(e) => handleGroupMemberChange(index, 'phone', e.target.value)}
                      isInvalid={!!errors[`memberPhone_${index}`]}
                      className="bg-dark text-white"
                      placeholder="Phone number"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors[`memberPhone_${index}`]}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Reg Number</Form.Label>
                    <Form.Control
                      type="text"
                      value={member.regNumber}
                      onChange={(e) => handleGroupMemberChange(index, 'regNumber', e.target.value)}
                      isInvalid={!!errors[`memberRegno_${index}`]}
                      className="bg-dark text-white"
                      placeholder="Reg number"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors[`memberRegno_${index}`]}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={1} className="d-flex align-items-end">
                  {formData.groupMembers.length > 1 && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeGroupMember(index)}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  )}
                </Col>
              </Row>
            ))}
          </Card.Body>
        </Card>

        {Object.keys(errors).length > 0 && (
          <Alert variant="danger" className="mt-3">
            Please fix the errors above before submitting.
          </Alert>
        )}

        <div className="d-flex gap-2 justify-content-end mt-3">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {student ? 'Update Student' : 'Add Student'}
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default ProjectForm;