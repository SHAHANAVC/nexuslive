import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import api from '../../api';
import { useNavigate } from "react-router-dom";
const InternshipForm = ({ student, onSave, onCancel }) => {
  const navigate = useNavigate();
  console.log(student);
  
  const [formData, setFormData] = useState({
    institution: student?.institution || '',
    collegeName: student?.collegeName || '',
    dob: student?.dob || '',
    age: student?.age || '',
    email: student?.email || '',
    phone: student?.phone || '',
    address: student?.address || '',
    city: student?.city || '',
    pin: student?.pin || '',
    district: student?.district || '',
    state: student?.state || '',
    qualification: student?.qualification || '',
    university: student?.university || '',
    course: student?.course || '',
    modeOfCourse: student?.modeOfCourse || '',
    dateOfJoining: student?.dateOfJoining || '',
    fees: student?.fees || '',
    category:'internship',
    name: student?.name || '',
    preferredDuration : student?.preferredDuration || '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-calculate age if DOB is changed
    if (name === 'dob' && value) {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      setFormData(prev => ({
        ...prev,
        age: age.toString()
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    const requiredFields = [
      'institution', 'collegeName', 'dob', 'age', 'email', 'phone', 
      'address', 'city', 'pin', 'district', 'state', 'qualification',
      'university', 'course', 'modeOfCourse', 'dateOfJoining', 'fees'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
      }
    });

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    // PIN validation
    if (formData.pin && !/^\d{6}$/.test(formData.pin)) {
      newErrors.pin = 'Please enter a valid 6-digit PIN code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit =async (e) => {
    console.log("-------------------------------------------");
    
    e.preventDefault();
    // if (validateForm()) {
    //   onSave({
    //     ...formData,
    //     name: formData.email.split('@')[0] // Simple name extraction from email
    //   });
    // }
    if(validateForm()){
      try{
        const response = await  api.post('/registrations',formData)
        console.log(response);
        alert(response.data.message)
        navigate('/')        
        
      }
      catch (error) {
        console.log("kkkkkkkkkkkkkkkkkkk",error);
        alert(error.response.data.message)
        
      }
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
              />
              <Form.Control.Feedback type="invalid">
                {errors.collegeName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

        <Col md={6}>
            <Form.Group>
              <Form.Label>Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
                className="bg-dark text-white"
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Duration *</Form.Label>
              <Form.Control
                type="text"
                name="preferredDuration"
                value={formData.preferredDuration}
                onChange={handleChange}
                isInvalid={!!errors.preferredDuration}
                className="bg-dark text-white"
              />
              <Form.Control.Feedback type="invalid">
                {errors.preferredDuration}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>


          <Col md={6}>
            <Form.Group>
              <Form.Label>Date of Birth *</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                isInvalid={!!errors.dob}
                className="bg-dark text-white"
              />
              <Form.Control.Feedback type="invalid">
                {errors.dob}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Age *</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                isInvalid={!!errors.age}
                className="bg-dark text-white"
                readOnly
              />
              <Form.Control.Feedback type="invalid">
                {errors.age}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
                className="bg-dark text-white"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Phone *</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
                className="bg-dark text-white"
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Group>
              <Form.Label>Address *</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="address"
                value={formData.address}
                onChange={handleChange}
                isInvalid={!!errors.address}
                className="bg-dark text-white"
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>City *</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                isInvalid={!!errors.city}
                className="bg-dark text-white"
              />
              <Form.Control.Feedback type="invalid">
                {errors.city}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>PIN Code *</Form.Label>
              <Form.Control
                type="text"
                name="pin"
                value={formData.pin}
                onChange={handleChange}
                isInvalid={!!errors.pin}
                className="bg-dark text-white"
              />
              <Form.Control.Feedback type="invalid">
                {errors.pin}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>District *</Form.Label>
              <Form.Control
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                isInvalid={!!errors.district}
                className="bg-dark text-white"
              />
              <Form.Control.Feedback type="invalid">
                {errors.district}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>State *</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                isInvalid={!!errors.state}
                className="bg-dark text-white"
              />
              <Form.Control.Feedback type="invalid">
                {errors.state}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Qualification *</Form.Label>
              <Form.Select
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                isInvalid={!!errors.qualification}
                className="bg-dark text-white"
              >
                <option value="">Select Qualification</option>
                <option value="B.Tech">B.Tech</option>
                <option value="M.Tech">M.Tech</option>
                <option value="BCA">BCA</option>
                <option value="MCA">MCA</option>
                <option value="B.Sc">B.Sc</option>
                <option value="M.Sc">M.Sc</option>
                <option value="Diploma">Diploma</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.qualification}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>University *</Form.Label>
              <Form.Control
                type="text"
                name="university"
                value={formData.university}
                onChange={handleChange}
                isInvalid={!!errors.university}
                className="bg-dark text-white"
              />
              <Form.Control.Feedback type="invalid">
                {errors.university}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Course *</Form.Label>
              <Form.Control
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                isInvalid={!!errors.course}
                className="bg-dark text-white"
              />
              <Form.Control.Feedback type="invalid">
                {errors.course}
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
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                {/* <option value="Distance">Distance</option> */}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.modeOfCourse}
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
              />
              <Form.Control.Feedback type="invalid">
                {errors.fees}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

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

export default InternshipForm;