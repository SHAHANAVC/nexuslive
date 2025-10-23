// import React, { useState } from 'react';
// import { Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
// import api from '../../api';
// import { useNavigate } from 'react-router-dom';

// const ProjectForm = ({ student, onSave, onCancel }) => {
//   const navigate = useNavigate()
//   const [formData, setFormData] = useState({
//     category: 'project',
//     institution: student?.institution || '',
//     college: student?.college || '',
//     dateOfJoining: student?.dateOfJoining || '',
//     fees: student?.fees || '',
//     technology: student?.technology || '',
//     projectName: student?.projectName || '',
//     department: student?.department || '',
//     modeOfCourse: student?.modeOfCourse || '',
//     description: student?.description || '',
//     groupMembers: student?.groupMembers || [
//       { name: '', email: '', phone: '', regNumber: '' }
//     ]
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleGroupMemberChange = (index, field, value) => {
//     const updatedMembers = [...formData.groupMembers];
//     updatedMembers[index][field] = value;
//     setFormData(prev => ({
//       ...prev,
//       groupMembers: updatedMembers
//     }));
//   };

//   const addGroupMember = () => {
//     setFormData(prev => ({
//       ...prev,
//       groupMembers: [
//         ...prev.groupMembers,
//         { name: '', email: '', phone: '', regNumber: '' }
//       ]
//     }));
//   };

//   const removeGroupMember = (index) => {
//     if (formData.groupMembers.length > 1) {
//       const updatedMembers = formData.groupMembers.filter((_, i) => i !== index);
//       setFormData(prev => ({
//         ...prev,
//         groupMembers: updatedMembers
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.institution) newErrors.institution = 'Institution is required';
//     if (!formData.college) newErrors.college = 'College name is required';
//     if (!formData.dateOfJoining) newErrors.dateOfJoining = 'Date of joining is required';
//     if (!formData.fees) newErrors.fees = 'Fees is required';
//     if (!formData.technology) newErrors.technology = 'Technology is required';
//     if (!formData.projectName) newErrors.projectName = 'Project name is required';
//     if (!formData.modeOfCourse) newErrors.modeOfCourse = 'Mode of course required'
//     if (!formData.department) newErrors.department = 'Department is required';

//     // Validate group members
//     formData.groupMembers.forEach((member, index) => {
//       if (!member.name) newErrors[`memberName_${index}`] = `Member ${index + 1} name is required`;
//       if (!member.email) newErrors[`memberEmail_${index}`] = `Member ${index + 1} email is required`;
//       if (!member.phone) newErrors[`memberPhone_${index}`] = `Member ${index + 1} phone is required`;
//       if (!member.regNumber) newErrors[`memberRegno_${index}`] = `Member ${index + 1} Reg No is required`;
//     });

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       // onSave(formData);
//       try{
//       const response = await api.post('/registrations',formData)
//       console.log(response);
//       alert(response.data.message)
//       navigate('/')

      
//       }
//       catch{(error)=>{
//         console.log(error);
//         alert(error.response.data.message)
        
//       }}
//     }
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <div className="p-3">
//         <Row className="g-3">
//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>Institution *</Form.Label>
//               <Form.Select
//                 name="institution"
//                 value={formData.institution}
//                 onChange={handleChange}
//                 isInvalid={!!errors.institution}
//                 className="bg-dark text-white"
//               >
//                 <option value="">Select Institution</option>
//                 <option value="nexus">Nexus</option>
//                 <option value="trycode">Trycode</option>
//               </Form.Select>
//               <Form.Control.Feedback type="invalid">
//                 {errors.institution}
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Col>

//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>College Name *</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="college"
//                 value={formData.college}
//                 onChange={handleChange}
//                 isInvalid={!!errors.college}
//                 className="bg-dark text-white"
//                 placeholder="Enter college name"
//               />
//               <Form.Control.Feedback type="invalid">
//                 {errors.college}
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Col>

//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>Date of Joining *</Form.Label>
//               <Form.Control
//                 type="date"
//                 name="dateOfJoining"
//                 value={formData.dateOfJoining}
//                 onChange={handleChange}
//                 isInvalid={!!errors.dateOfJoining}
//                 className="bg-dark text-white"
//               />
//               <Form.Control.Feedback type="invalid">
//                 {errors.dateOfJoining}
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Col>

//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>Fees *</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="fees"
//                 value={formData.fees}
//                 onChange={handleChange}
//                 isInvalid={!!errors.fees}
//                 className="bg-dark text-white"
//                 placeholder="Enter fees amount"
//               />
//               <Form.Control.Feedback type="invalid">
//                 {errors.fees}
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Col>

//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>Technology *</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="technology"
//                 value={formData.technology}
//                 onChange={handleChange}
//                 isInvalid={!!errors.technology}
//                 className="bg-dark text-white"
//                 placeholder="Enter technology stack"
//               />
//               <Form.Control.Feedback type="invalid">
//                 {errors.technology}
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Col>

//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>Project Name *</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="projectName"
//                 value={formData.projectName}
//                 onChange={handleChange}
//                 isInvalid={!!errors.projectName}
//                 className="bg-dark text-white"
//                 placeholder="Enter project name"
//               />
//               <Form.Control.Feedback type="invalid">
//                 {errors.projectName}
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Col>

//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>Department *</Form.Label>
//               <Form.Select
//                 name="department"
//                 value={formData.department}
//                 onChange={handleChange}
//                 isInvalid={!!errors.department}
//                 className="bg-dark text-white"
//               >
//                 <option value="">Select Department</option>
//                 <option value="Computer Science">Computer Science</option>
//                 <option value="Electrical Engineering">Electrical Engineering</option>
//                 <option value="Mechanical Engineering">Mechanical Engineering</option>
//                 <option value="Civil Engineering">Civil Engineering</option>
//                 <option value="Electronics">Electronics</option>
//               </Form.Select>
//               <Form.Control.Feedback type="invalid">
//                 {errors.department}
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Col>

//           <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Mode of Course *</Form.Label>
//                         <Form.Select
//                           name="modeOfCourse"
//                           value={formData.modeOfCourse}
//                           onChange={handleChange}
//                           isInvalid={!!errors.modeOfCourse}
//                           className="bg-dark text-white"
//                         >
//                           <option value="">Select Mode</option>
//                           <option value="Detailed">Detailed</option>
//                           <option value="Fastrack">Fastrack</option>
//                         </Form.Select>
//                         <Form.Control.Feedback type="invalid">
//                           {errors.modeOfCourse}
//                         </Form.Control.Feedback>
//                       </Form.Group>
//                     </Col>

//           <Col md={12}>
//             <Form.Group>
//               <Form.Label>Project Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 className="bg-dark text-white"
//                 placeholder="Enter project description"
//               />
//             </Form.Group>
//           </Col>
//         </Row>

//         {/* Group Members Section */}
//         <Card className="bg-dark border-secondary mt-3">
//           <Card.Header className="d-flex justify-content-between align-items-center">
//             <span>Group Members</span>
//             <Button variant="outline-success" size="sm" onClick={addGroupMember}>
//               <i className="bi bi-plus-circle"></i> Add Member
//             </Button>
//           </Card.Header>
//           <Card.Body>
//             {formData.groupMembers.map((member, index) => (
//               <Row key={index} className="g-3 mb-3 border-bottom pb-3">
//                 <Col md={12}>
//                   <h6 className="text-light">Member {index + 1}</h6>
//                 </Col>
//                 <Col md={3}>
//                   <Form.Group>
//                     <Form.Label>Name *</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={member.name}
//                       onChange={(e) => handleGroupMemberChange(index, 'name', e.target.value)}
//                       isInvalid={!!errors[`memberName_${index}`]}
//                       className="bg-dark text-white"
//                       placeholder="Full name"
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {errors[`memberName_${index}`]}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>
//                 <Col md={3}>
//                   <Form.Group>
//                     <Form.Label>Email *</Form.Label>
//                     <Form.Control
//                       type="email"
//                       value={member.email}
//                       onChange={(e) => handleGroupMemberChange(index, 'email', e.target.value)}
//                       isInvalid={!!errors[`memberEmail_${index}`]}
//                       className="bg-dark text-white"
//                       placeholder="Email address"
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {errors[`memberEmail_${index}`]}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>
//                 <Col md={3}>
//                   <Form.Group>
//                     <Form.Label>Phone *</Form.Label>
//                     <Form.Control
//                       type="tel"
//                       value={member.phone}
//                       onChange={(e) => handleGroupMemberChange(index, 'phone', e.target.value)}
//                       isInvalid={!!errors[`memberPhone_${index}`]}
//                       className="bg-dark text-white"
//                       placeholder="Phone number"
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {errors[`memberPhone_${index}`]}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>
//                 <Col md={2}>
//                   <Form.Group>
//                     <Form.Label>Reg Number</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={member.regNumber}
//                       onChange={(e) => handleGroupMemberChange(index, 'regNumber', e.target.value)}
//                       isInvalid={!!errors[`memberRegno_${index}`]}
//                       className="bg-dark text-white"
//                       placeholder="Reg number"
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {errors[`memberRegno_${index}`]}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>
//                 <Col md={1} className="d-flex align-items-end">
//                   {formData.groupMembers.length > 1 && (
//                     <Button
//                       variant="outline-danger"
//                       size="sm"
//                       onClick={() => removeGroupMember(index)}
//                     >
//                       <i className="bi bi-trash"></i>
//                     </Button>
//                   )}
//                 </Col>
//               </Row>
//             ))}
//           </Card.Body>
//         </Card>

//         {Object.keys(errors).length > 0 && (
//           <Alert variant="danger" className="mt-3">
//             Please fix the errors above before submitting.
//           </Alert>
//         )}

//         <div className="d-flex gap-2 justify-content-end mt-3">
//           <Button variant="secondary" onClick={onCancel}>
//             Cancel
//           </Button>
//           <Button variant="primary" type="submit">
//             {student ? 'Update Student' : 'Add Student'}
//           </Button>
//         </div>
//       </div>
//     </Form>
//   );
// };

// export default ProjectForm;

// import React, { useState, useMemo } from 'react';
// import { Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
// import api from '../../api';
// import { useNavigate } from 'react-router-dom';

// const ProjectForm = ({ student, onSave, onCancel }) => {
//   const navigate = useNavigate()
//   const [formData, setFormData] = useState({
//     category: 'project',
//     pcategory: student?.pcategory || '',
//     institution: student?.institution || '',
//     college: student?.college || '',
//     dateOfJoining: student?.dateOfJoining || '',
//     fees: student?.fees || '',
//     technology: student?.technology || '',
//     projectName: student?.projectName || '',
//     department: student?.department || '',
//     modeOfCourse: student?.modeOfCourse || '',
//     description: student?.description || '',
//     groupMembers: student?.groupMembers || [
//       { name: '', email: '', phone: '', regNumber: '' }
//     ]
//   });

//   const [errors, setErrors] = useState({});
//   const [showCollegeDropdown, setShowCollegeDropdown] = useState(false);
//   const [collegeSearch, setCollegeSearch] = useState('');
//   const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);
// const [departmentSearch, setDepartmentSearch] = useState('');

// // Department list data
// const departmentList = [
//   "Computer Science",
//   "Computer Science and Engineering",
//   "Information Technology",
//   "Computer Engineering",
//   "Electrical Engineering",
//   "Electronics and Communication Engineering",
//   "Electronics Engineering",
//   "Mechanical Engineering",
//   "Civil Engineering",
//   "Electronics and Electrical Engineering",
//   "Biomedical Engineering",
//   "Instrumentation Engineering",
//   "Electrical and Electronics Engineering",
//   "Artificial Intelligence",
//   "Data Science",
//   "Cyber Security",
//   "Computer Hardware Engineering",
//   "Computer Applications",
//   "Information Science",
//   "Software Engineering",
//   "BCA",
//   "MCA",
//   "Other"
// ];

//   // College list data
//   const collegeList = useMemo(() => [
//     "AWH ENGG KUTTIKKATTOOR",
//     "KMCT ENGG KALLANTHODE",
//     "MANIYOOR ENGG",
//     "UNIVERSITY ENGG",
//     "MDIT ULLIYERI",
//     "VEDAVYASA KARAD",
//     "KMCT WOMENS KALLANTHODE",
//     "GEC CALICUT WESTHILL",
//     "MGM VALANCHERY",
//     "EKC MANJERY",
//     "MEA PERINTHALMANNA",
//     "MES KUTTIPPURAM",
//     "GEC WAYANAD",
//     "GEC IDUKKI",
//     "THEJUS",
//     "IES CHITTILAPPILI",
//     "AXIS",
//     "UNIVERSAL VALLIVATTOM",
//     "MALABAR PALLUR",
//     "JYOTHI CHERUTHURUTHI",
//     "NIRMALA COLLEGE KUNNAPPILLI",
//     "SAHRDAYA KODAKARA",
//     "MET MALA",
//     "FOCUS POOMALA",
//     "ICCS NADIPPARA",
//     "HOLY GRACE THIRUVILLAMALA",
//     "CHRIST IRINGALAKKUDA",
//     "CYRIX",
//     "SCMS KARUKUTTY",
//     "VIDHYA",
//     "NEHRU THRISSUR",
//     "GEC THRISSUR",
//     "ROYAL ENGG",
//     "IMT POTTORE",
//     "SREE ERNAKULATHAPPAN COLLEGE",
//     "GEC KANNUR",
//     "LBS KAZARGOD",
//     "THRIKKARIPUR ENGG",
//     "THALASSERY ENGG",
//     "MIT ANJARAKKANDI",
//     "VIMAL JYOTHI",
//     "NSS PALAKKAD",
//     "GEC PALAKKAD",
//     "AL AMEEN",
//     "AMMINI",
//     "ARYANET",
//     "AHALYA",
//     "JAWAHARLAL COLLEGE",
//     "PRIME COLLEGE",
//     "SREEPATHI PATAMBI",
//     "IHRD KOOTHPARAMBA",
//     "IHRD PINARAY",
//     "IHRD NERUVAMBRAM",
//     "IHRD PATTUVAM",
//     "IHRD MANANTHAVADI",
//     "IHRD CHEEMENI",
//     "IHRD MANJESWARAM",
//     "THALIPARAMB ARTS",
//     "OUR COLLEGE",
//     "FAROOK COLLEGE",
//     "PROVIDENCE COLLEGE",
//     "DEVAGIRI MEDICAL COLLEGE",
//     "SNDP KOLLAM",
//     "SD SABOO VELLANNOOR",
//     "AWH SPECIAL KALLAI",
//     "SALAFI MEPPAYYUR",
//     "MES VADAKARA",
//     "DAYAPURAM MUKKAM",
//     "MET NADAPURAM",
//     "SN COLLEGE VADAKARA",
//     "BAITHUL IZA NARIKKUNI",
//     "MHES CHERANDATHUR",
//     "JDT VELLIMADUKUNN",
//     "MES MUKKOM",
//     "NATIONAL PULIYAV",
//     "DARUL HUDA NADAPURAM",
//     "SILVER ARTS PERAMBRA",
//     "PEE KEY NALLALAM",
//     "MALABAR MOODADI",
//     "IHRD NADAPURAM",
//     "IHRD MUKKOM",
//     "IHRD THAMARASSERY",
//     "HI-TECH NADAPURAM",
//     "SMI ARTS & SCIENCE CHOMBALA",
//     "GURUDEV KOYILANDI",
//     "CCSIT VADAKARA",
//     "MAPS VADAKARA",
//     "ILAHIYA KOYILANDI",
//     "MES PONNANI",
//     "MARTHOMA CHUNGATHARA",
//     "UNITY MANJERY",
//     "MES KAVEEYAM VALANCHERY",
//     "EMEA KONDOTTY",
//     "SULLAMUSSALAM ARECODE",
//     "AMAL COLLEGE NILAMBUR",
//     "MAJILIS VALANCHERY",
//     "SNDP PERINTHALMANNA",
//     "HM MANJEY",
//     "REGIONAL COLLEGE KUZHIMANNA",
//     "JAMIYA NADAWIYA EDAVANNA",
//     "GRACE VALLEY KADAMPUZHA",
//     "ASSABAH VALAYAMKULAM",
//     "KHIDMATH THIRUNAVAYA",
//     "GEMS PERINTHALMANNA",
//     "SAFA EDAYUR",
//     "IDEAL KUTTIPPURAM",
//     "AL JAMIA PATTIKKAD",
//     "ST MARYS ANGADIPURAM",
//     "BLOSSOM PULIKAL",
//     "NOBLE WOMENS MANJERI",
//     "PRIYADARSHINI MELMURI",
//     "MIC VALLUVAMBRAM",
//     "NASRA THIRURKAD",
//     "ISS PERINTHALMANNA",
//     "TANUR ARTS MALAPPURAM",
//     "SAHYA ARTS WANDOOR",
//     "PANAKKAD POOKOYA THANGAL MEMORIAL VENGARA",
//     "MALABAR, MANUR, CHEGANUR ROAD",
//     "EXTER COLLEGE MANJERI",
//     "MAULANA COLLEGE TIRUR",
//     "FATHIMA ARTS NILAMBUR",
//     "IHRD - MALAPPURAM",
//     "IHRD -EDAPAL",
//     "IHRD - VAZHAKKAD",
//     "IHRD MUTHUVALLUR",
//     "BYK PUTHANATHANI",
//     "KR SREENARAYANA VALANCHERI",
//     "MODEL IHRD PARAPPANANGADI",
//     "MALABAR VENGARA",
//     "NMSM COLLEGE KALPETTA",
//     "ST MARYS BATHERY",
//     "WMO MUTTIL",
//     "DONBOSCO BATHERY",
//     "CM PANAMARAM",
//     "SNDP PULPALLY",
//     "ALPHONSA BATHERY",
//     "IHRD - MEENANGADI",
//     "LIZA KAITHAPPOYIL",
//     "GREEN MOUNT PADINHARATHARA",
//     "GOV VICTORIA COLLEGE ,PALAKKAD",
//     "GOV COLLEGE , CHITTUR",
//     "NSS COLLEGE ,OTTAPPALAM",
//     "GLOBAL",
//     "BHARATH",
//     "MERCY COLLEGE PALAKKAD",
//     "NSS COLLEGE NENMARA",
//     "MES KALADI",
//     "SREEKRISHNAPURAM BTB",
//     "VV COLLEGE KANJIKODE",
//     "THUNCHATH EZHUTHACHAN CLG",
//     "YUVAKSHETHRA INSTITUTE",
//     "MOUNT SEENA COLLEGE OTTAPALAM",
//     "IDEAL CHERPULASSERY",
//     "CHERPULASSERY COLLEGE KARALMANNA",
//     "ASPIRE THRITHALA",
//     "SADANAM KUMARAN MANKARA",
//     "SNES KALLYANI OTTAPPALAM",
//     "NETHAJI MEMORIAL NENMARA",
//     "SREENARAYANA GURU COLLEGE ALATHUR",
//     "KSHM EDATHANATTUKARA",
//     "NAJATH NELLIPPUZHA",
//     "UNIVERSAL COLLEGE MANNARKKAD",
//     "BARATHAMATHA KOZHINJAMPARA",
//     "LEMENT PATAMBI",
//     "LIONS ALATHUR",
//     "IHRD VADAKKANCHERY",
//     "IHRD MALAMBUZHA",
//     "IHRD KOTTAYI",
//     "IHRD ATTAPPADI",
//     "IHRD AVALUR",
//     "SRI ATHUTHAMENON KUTTANELLUR",
//     "ST THOMAS",
//     "ASPIRE PATTAMBI",
//     "VIMALA COLLEGE",
//     "ST MARRYS",
//     "SREEKERALA VARMA",
//     "LITTLE FLOWER GURUVAYOOR",
//     "ST JOSEPH IRINGALAKKUDA",
//     "CHRIST IRINGALAKKUDA",
//     "MES ASMABI VEMBALLOOR",
//     "CARMEL MALA",
//     "MAR DIONYSIUS PAZHANJI",
//     "NAIPUNYA KORATTY",
//     "MOTHER ARTS AND SCIENCE , POOVATHUR",
//     "ICA THOZHIYUR",
//     "ANSAR PERUMBILAV",
//     "DONBOSCO MANNUTHY",
//     "SN NATTIKA",
//     "THRANANELLUR ARTS AND SCIENCE IRINGALAKKUDA",
//     "PARAMEKKAV AYYANTHOLE",
//     "MAR OSTHATHEOUS PERUMBILAV",
//     "ELIMS COLLEGE",
//     "NIRMALA COLLEGE KUNNAPPILLY",
//     "MET KURIVILLASERY MALA",
//     "IHRD NATTIKA",
//     "IHRD KODUNGALLUR",
//     "IHRD CHELAKKARA",
//     "Other"
//   ], []);

//   // Filter colleges based on search input
//   const filteredColleges = useMemo(() => {
//     if (!collegeSearch) return collegeList;
//     return collegeList.filter(college => 
//       college.toLowerCase().includes(collegeSearch.toLowerCase())
//     );
//   }, [collegeSearch, collegeList]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleCollegeSelect = (college) => {
//     setFormData(prev => ({
//       ...prev,
//       college: college
//     }));
//     setCollegeSearch('');
//     setShowCollegeDropdown(false);
//   };

//   const handleCollegeInputChange = (e) => {
//     const value = e.target.value;
//     setCollegeSearch(value);
//     setFormData(prev => ({
//       ...prev,
//       college: value
//     }));
//     setShowCollegeDropdown(true);
//   };

//   const handleCollegeInputFocus = () => {
//     setShowCollegeDropdown(true);
//     if (formData.college) {
//       setCollegeSearch(formData.college);
//     }
//   };

//   const handleCollegeInputBlur = () => {
//     // Delay hiding dropdown to allow for click selection
//     setTimeout(() => setShowCollegeDropdown(false), 200);
//   };

//   // ... rest of your existing functions (handleGroupMemberChange, addGroupMember, removeGroupMember, validateForm, handleSubmit)

//   const handleGroupMemberChange = (index, field, value) => {
//     const updatedMembers = [...formData.groupMembers];
//     updatedMembers[index][field] = value;
//     setFormData(prev => ({
//       ...prev,
//       groupMembers: updatedMembers
//     }));
//   };

//   const addGroupMember = () => {
//     setFormData(prev => ({
//       ...prev,
//       groupMembers: [
//         ...prev.groupMembers,
//         { name: '', email: '', phone: '', regNumber: '' }
//       ]
//     }));
//   };

//   const removeGroupMember = (index) => {
//     if (formData.groupMembers.length > 1) {
//       const updatedMembers = formData.groupMembers.filter((_, i) => i !== index);
//       setFormData(prev => ({
//         ...prev,
//         groupMembers: updatedMembers
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.institution) newErrors.institution = 'Institution is required';
//     if (!formData.pcategory) newErrors.pcategory = 'Project Category is required';
//     if (!formData.college) newErrors.college = 'College name is required';
//     if (!formData.dateOfJoining) newErrors.dateOfJoining = 'Date of joining is required';
//     if (!formData.fees) newErrors.fees = 'Fees is required';
//     if (!formData.technology) newErrors.technology = 'Technology is required';
//     if (!formData.projectName) newErrors.projectName = 'Project name is required';
//     if (!formData.modeOfCourse) newErrors.modeOfCourse = 'Mode of course required'
//     if (!formData.department) newErrors.department = 'Department is required';

//     // Validate group members
//     formData.groupMembers.forEach((member, index) => {
//       if (!member.name) newErrors[`memberName_${index}`] = `Member ${index + 1} name is required`;
//       if (!member.email) newErrors[`memberEmail_${index}`] = `Member ${index + 1} email is required`;
//       if (!member.phone) newErrors[`memberPhone_${index}`] = `Member ${index + 1} phone is required`;
//       if (!member.regNumber) newErrors[`memberRegno_${index}`] = `Member ${index + 1} Reg No is required`;
//     });

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   if (validateForm()) {
//   //     try{
//   //       const response = await api.post('/registrations',formData)
//   //       console.log(response);
//   //       alert(response.data.message)
//   //       navigate('/')
//   //     }
//   //     catch{(error)=>{
//   //       console.log(error);
//   //       alert(error.response.data.message)
//   //     }}
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (validateForm()) {
//     try {
//       let response;

//       if (student?._id) {
//         console.log(student._id);
        
//         // 👇 Update existing student
//         response = await api.put(`/registrations/${student._id}`, formData);
//         console.log(response);
        
//         alert("Student updated successfully!");
//       } else {
//         // 👇 Create new student
//         response = await api.post('/registrations', formData);
//         alert("Student added successfully!");
//       }

//       console.log(response);
//       // navigate('/');
//     } catch (error) {
//       console.error(error);
//       alert(error.response?.data?.message || "An error occurred!");
//     }
//   }
// };


//   return (
//     <Form onSubmit={handleSubmit}>
//       <div className="p-3">
//         <Row className="g-3">
//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>Institution *</Form.Label>
//               <Form.Select
//                 name="institution"
//                 value={formData.institution}
//                 onChange={handleChange}
//                 isInvalid={!!errors.institution}
//                 className="bg-dark text-white"
//               >
//                 <option value="">Select Institution</option>
//                 <option value="nexus">Nexus</option>
//                 <option value="trycode">Trycode</option>
//               </Form.Select>
//               <Form.Control.Feedback type="invalid">
//                 {errors.institution}
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Col>

//           <Col md={6}>
//             <Form.Group className="position-relative">
//               <Form.Label>College Name *</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="college"
//                 value={formData.college}
//                 onChange={handleCollegeInputChange}
//                 onFocus={handleCollegeInputFocus}
//                 onBlur={handleCollegeInputBlur}
//                 isInvalid={!!errors.college}
//                 className="bg-dark text-white"
//                 placeholder="Type to search colleges..."
//                 autoComplete="off"
//               />
//               <Form.Control.Feedback type="invalid">
//                 {errors.college}
//               </Form.Control.Feedback>
              
//               {/* College Dropdown */}
//               {showCollegeDropdown && (
//                 <div 
//                   className="position-absolute w-100 bg-dark border border-secondary mt-1 rounded shadow-lg z-3"
//                   style={{
//   maxHeight: '200px',
//   overflowY: 'auto',
//   scrollbarWidth: 'none',        
//   msOverflowStyle: 'none',        
// }}

//                 >
//                   {filteredColleges.length > 0 ? (
//                     filteredColleges.map((college, index) => (
//                       <div
//                         key={index}
//                         className="dropdown-item text-white p-2"
//                         style={{ 
//                           cursor: 'pointer',
//                           borderBottom: '1px solid #444',
//                           fontFamily: 'Inter, sans-serif'
//                         }}
//                         onMouseDown={(e) => e.preventDefault()} // Prevent blur on mousedown
//                         onClick={() => handleCollegeSelect(college)}
//                         onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
//                         onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
//                       >
//                         {college}
//                       </div>
//                     ))
//                   ) : (
//                     <div className="dropdown-item text-white p-2 text-center">
//                       No colleges found
//                     </div>
//                   )}
//                 </div>
//               )}
//             </Form.Group>
//           </Col>

//           {/* Rest of your existing form fields */}
//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>Date of Joining *</Form.Label>
//               <Form.Control
//                 type="date"
//                 name="dateOfJoining"
//                 value={formData.dateOfJoining}
//                 onChange={handleChange}
//                 isInvalid={!!errors.dateOfJoining}
//                 className="bg-dark text-white"
//               />
//               <Form.Control.Feedback type="invalid">
//                 {errors.dateOfJoining}
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Col>

//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>Fees *</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="fees"
//                 value={formData.fees}
//                 onChange={handleChange}
//                 isInvalid={!!errors.fees}
//                 className="bg-dark text-white"
//                 placeholder="Enter fees amount"
//               />
//               <Form.Control.Feedback type="invalid">
//                 {errors.fees}
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Col>

//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>Technology *</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="technology"
//                 value={formData.technology}
//                 onChange={handleChange}
//                 isInvalid={!!errors.technology}
//                 className="bg-dark text-white"
//                 placeholder="Enter technology stack"
//               />
//               <Form.Control.Feedback type="invalid">
//                 {errors.technology}
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Col>

//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>Project Category *</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="technology"
//                 value={formData.pcategory}
//                 onChange={handleChange}
//                 isInvalid={!!errors.pcategory}
//                 className="bg-dark text-white"
//                 placeholder="Enter technology stack"
//               />
//               <Form.Control.Feedback type="invalid">
//                 {errors.pcategory}
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Col>

//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>Project Name *</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="projectName"
//                 value={formData.projectName}
//                 onChange={handleChange}
//                 isInvalid={!!errors.projectName}
//                 className="bg-dark text-white"
//                 placeholder="Enter project name"
//               />
//               <Form.Control.Feedback type="invalid">
//                 {errors.projectName}
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Col>

//           {/* <Col md={6}>
//             <Form.Group>
//               <Form.Label>Department *</Form.Label>
//               <Form.Select
//                 name="department"
//                 value={formData.department}
//                 onChange={handleChange}
//                 isInvalid={!!errors.department}
//                 className="bg-dark text-white"
//               >
//                 <option value="">Select Department</option>
//                 <option value="Computer Science">Computer Science</option>
//                 <option value="Electrical Engineering">Electrical Engineering</option>
//                 <option value="Mechanical Engineering">Mechanical Engineering</option>
//                 <option value="Civil Engineering">Civil Engineering</option>
//                 <option value="Electronics">Electronics</option>
//               </Form.Select>
//               <Form.Control.Feedback type="invalid">
//                 {errors.department}
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Col> */}

//           <Col md={6}>
//   <Form.Group className="position-relative">
//     <Form.Label>Department *</Form.Label>
//     <Form.Control
//       type="text"
//       name="department"
//       value={formData.department}
//       onChange={(e) => {
//         const value = e.target.value;
//         setFormData(prev => ({
//           ...prev,
//           department: value
//         }));
//         setDepartmentSearch(value);
//         setShowDepartmentDropdown(true);
//       }}
//       onFocus={() => setShowDepartmentDropdown(true)}
//       onBlur={() => setTimeout(() => setShowDepartmentDropdown(false), 200)}
//       isInvalid={!!errors.department}
//       className="bg-dark text-white"
//       placeholder="Type to search departments..."
//       autoComplete="off"
//     />
//     <Form.Control.Feedback type="invalid">
//       {errors.department}
//     </Form.Control.Feedback>
    
//     {/* Department Dropdown */}
//     {showDepartmentDropdown && (
//       <div 
//         className="position-absolute w-100 bg-dark border border-secondary mt-1 rounded shadow-lg z-3"
//         style={{ maxHeight: '200px',
//   overflowY: 'auto',
//   scrollbarWidth: 'none',        
//   msOverflowStyle: 'none', }}
//       >
//         {departmentList.filter(dept => 
//           dept.toLowerCase().includes(departmentSearch.toLowerCase())
//         ).length > 0 ? (
//           departmentList
//             .filter(dept => 
//               dept.toLowerCase().includes(departmentSearch.toLowerCase())
//             )
//             .map((department, index) => (
//               <div
//                 key={index}
//                 className="dropdown-item text-white p-2"
//                 style={{ 
//                   cursor: 'pointer',
//                   borderBottom: '1px solid #444',
//                   fontFamily: 'Inter, sans-serif'
//                 }}
//                 onMouseDown={(e) => e.preventDefault()}
//                 onClick={() => {
//                   setFormData(prev => ({
//                     ...prev,
//                     department: department
//                   }));
//                   setDepartmentSearch('');
//                   setShowDepartmentDropdown(false);
//                 }}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
//               >
//                 {department}
//               </div>
//             ))
//         ) : (
//           <div className="dropdown-item text-white p-2 text-center">
//             No departments found
//           </div>
//         )}
//       </div>
//     )}
//   </Form.Group>
// </Col>

//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>Mode of Course *</Form.Label>
//               <Form.Select
//                 name="modeOfCourse"
//                 value={formData.modeOfCourse}
//                 onChange={handleChange}
//                 isInvalid={!!errors.modeOfCourse}
//                 className="bg-dark text-white"
//               >
//                 <option value="">Select Mode</option>
//                 <option value="Detailed">Detailed</option>
//                 <option value="Fastrack">Fastrack</option>
//               </Form.Select>
//               <Form.Control.Feedback type="invalid">
//                 {errors.modeOfCourse}
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Col>

//           <Col md={12}>
//             <Form.Group>
//               <Form.Label>Project Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 className="bg-dark text-white"
//                 placeholder="Enter project description"
//               />
//             </Form.Group>
//           </Col>
//         </Row>

//         {/* Group Members Section - Keep your existing code */}
//         <Card className="bg-dark border-secondary mt-3">
//           <Card.Header className="d-flex justify-content-between align-items-center">
//             <span>Group Members</span>
//             <Button variant="outline-success" size="sm" onClick={addGroupMember}>
//               <i className="bi bi-plus-circle"></i> Add Member
//             </Button>
//           </Card.Header>
//           <Card.Body>
//             {formData.groupMembers.map((member, index) => (
//               <Row key={index} className="g-3 mb-3 border-bottom pb-3">
//                 <Col md={12}>
//                   <h6 className="text-light">Member {index + 1}</h6>
//                 </Col>
//                 <Col md={3}>
//                   <Form.Group>
//                     <Form.Label>Name *</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={member.name}
//                       onChange={(e) => handleGroupMemberChange(index, 'name', e.target.value)}
//                       isInvalid={!!errors[`memberName_${index}`]}
//                       className="bg-dark text-white"
//                       placeholder="Full name"
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {errors[`memberName_${index}`]}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>
//                 <Col md={3}>
//                   <Form.Group>
//                     <Form.Label>Email *</Form.Label>
//                     <Form.Control
//                       type="email"
//                       value={member.email}
//                       onChange={(e) => handleGroupMemberChange(index, 'email', e.target.value)}
//                       isInvalid={!!errors[`memberEmail_${index}`]}
//                       className="bg-dark text-white"
//                       placeholder="Email address"
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {errors[`memberEmail_${index}`]}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>
//                 <Col md={3}>
//                   <Form.Group>
//                     <Form.Label>Phone *</Form.Label>
//                     <Form.Control
//                       type="tel"
//                       value={member.phone}
//                       onChange={(e) => handleGroupMemberChange(index, 'phone', e.target.value)}
//                       isInvalid={!!errors[`memberPhone_${index}`]}
//                       className="bg-dark text-white"
//                       placeholder="Phone number"
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {errors[`memberPhone_${index}`]}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>
//                 <Col md={2}>
//                   <Form.Group>
//                     <Form.Label>Reg Number *</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={member.regNumber}
//                       onChange={(e) => handleGroupMemberChange(index, 'regNumber', e.target.value)}
//                       isInvalid={!!errors[`memberRegno_${index}`]}
//                       className="bg-dark text-white"
//                       placeholder="Reg number"
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {errors[`memberRegno_${index}`]}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>
//                 <Col md={1} className="d-flex align-items-end">
//                   {formData.groupMembers.length > 1 && (
//                     <Button
//                       variant="outline-danger"
//                       size="sm"
//                       onClick={() => removeGroupMember(index)}
//                     >
//                       <i className="bi bi-trash"></i>
//                     </Button>
//                   )}
//                 </Col>
//               </Row>
//             ))}
//           </Card.Body>
//         </Card>

//         {Object.keys(errors).length > 0 && (
//           <Alert variant="danger" className="mt-3">
//             Please fix the errors above before submitting.
//           </Alert>
//         )}

//         <div className="d-flex gap-2 justify-content-end mt-3">
//           <Button variant="secondary" onClick={onCancel}>
//             Cancel
//           </Button>
//           <Button variant="primary" type="submit">
//             {student ? 'Update Student' : 'Add Student'}
//           </Button>
//         </div>
//       </div>
//     </Form>
//   );
// };

// export default ProjectForm;


import React, { useState, useMemo } from 'react';
import { Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

const ProjectForm = ({ student, onSave, onCancel }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: 'project',
    pcategory: student?.pcategory || '',
    institution: student?.institution || '',
    college: student?.college || '',
    // dateOfJoining: student?.dateOfJoining || '',
     dateOfJoining: student?.dateOfJoining ? student.dateOfJoining.split("T")[0] : '',
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
  const [showCollegeDropdown, setShowCollegeDropdown] = useState(false);
  const [collegeSearch, setCollegeSearch] = useState('');
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);
  const [departmentSearch, setDepartmentSearch] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Department list data
  const departmentList = [
    "Computer Science",
    "Computer Science and Engineering",
    "Information Technology",
    "Computer Engineering",
    "Electrical Engineering",
    "Electronics and Communication Engineering",
    "Electronics Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electronics and Electrical Engineering",
    "Biomedical Engineering",
    "Instrumentation Engineering",
    "Electrical and Electronics Engineering",
    "Artificial Intelligence",
    "Data Science",
    "Cyber Security",
    "Computer Hardware Engineering",
    "Computer Applications",
    "Information Science",
    "Software Engineering",
    "BCA",
    "MCA",
    "Other"
  ];

  // College list data (same as your existing list)
  const collegeList = useMemo(() => [
    "AWH ENGG KUTTIKKATTOOR",
    "KMCT ENGG KALLANTHODE",
    "MANIYOOR ENGG",
      "UNIVERSITY ENGG",
      "MDIT ULLIYERI",
      "VEDAVYASA KARAD",
      "KMCT WOMENS KALLANTHODE",
      "GEC CALICUT WESTHILL",
      "MGM VALANCHERY",
      "EKC MANJERY",
      "MEA PERINTHALMANNA",
      "MES KUTTIPPURAM",
      "GEC WAYANAD",
      "GEC IDUKKI",
      "THEJUS",
      "IES CHITTILAPPILI",
      "AXIS",
      "UNIVERSAL VALLIVATTOM",
      "MALABAR PALLUR",
      "JYOTHI CHERUTHURUTHI",
      "NIRMALA COLLEGE KUNNAPPILLI",
      "SAHRDAYA KODAKARA",
      "MET MALA",
      "FOCUS POOMALA",
      "ICCS NADIPPARA",
      "HOLY GRACE THIRUVILLAMALA",
      "CHRIST IRINGALAKKUDA",
      "CYRIX",
      "SCMS KARUKUTTY",
      "VIDHYA",
      "NEHRU THRISSUR",
      "GEC THRISSUR",
      "ROYAL ENGG",
      "IMT POTTORE",
      "SREE ERNAKULATHAPPAN COLLEGE",
      "GEC KANNUR",
      "LBS KAZARGOD",
      "THRIKKARIPUR ENGG",
      "THALASSERY ENGG",
      "MIT ANJARAKKANDI",
      "VIMAL JYOTHI",
      "NSS PALAKKAD",
      "GEC PALAKKAD",
      "AL AMEEN",
      "AMMINI",
      "ARYANET",
      "AHALYA",
      "JAWAHARLAL COLLEGE",
      "PRIME COLLEGE",
      "SREEPATHI PATAMBI",
      "IHRD KOOTHPARAMBA",
      "IHRD PINARAY",
      "IHRD NERUVAMBRAM",
      "IHRD PATTUVAM",
      "IHRD MANANTHAVADI",
      "IHRD CHEEMENI",
      "IHRD MANJESWARAM",
      "THALIPARAMB ARTS",
      "OUR COLLEGE",
      "FAROOK COLLEGE",
      "PROVIDENCE COLLEGE",
      "DEVAGIRI MEDICAL COLLEGE",
      "SNDP KOLLAM",
      "SD SABOO VELLANNOOR",
      "AWH SPECIAL KALLAI",
      "SALAFI MEPPAYYUR",
      "MES VADAKARA",
      "DAYAPURAM MUKKAM",
      "MET NADAPURAM",
      "SN COLLEGE VADAKARA",
      "BAITHUL IZA NARIKKUNI",
      "MHES CHERANDATHUR",
      "JDT VELLIMADUKUNN",
      "MES MUKKOM",
      "NATIONAL PULIYAV",
      "DARUL HUDA NADAPURAM",
      "SILVER ARTS PERAMBRA",
      "PEE KEY NALLALAM",
      "MALABAR MOODADI",
      "IHRD NADAPURAM",
      "IHRD MUKKOM",
      "IHRD THAMARASSERY",
      "HI-TECH NADAPURAM",
      "SMI ARTS & SCIENCE CHOMBALA",
      "GURUDEV KOYILANDI",
      "CCSIT VADAKARA",
      "MAPS VADAKARA",
      "ILAHIYA KOYILANDI",
      "MES PONNANI",
      "MARTHOMA CHUNGATHARA",
      "UNITY MANJERY",
      "MES KAVEEYAM VALANCHERY",
      "EMEA KONDOTTY",
      "SULLAMUSSALAM ARECODE",
      "AMAL COLLEGE NILAMBUR",
      "MAJILIS VALANCHERY",
      "SNDP PERINTHALMANNA",
      "HM MANJEY",
      "REGIONAL COLLEGE KUZHIMANNA",
      "JAMIYA NADAWIYA EDAVANNA",
      "GRACE VALLEY KADAMPUZHA",
      "ASSABAH VALAYAMKULAM",
      "KHIDMATH THIRUNAVAYA",
      "GEMS PERINTHALMANNA",
      "SAFA EDAYUR",
      "IDEAL KUTTIPPURAM",
      "AL JAMIA PATTIKKAD",
      "ST MARYS ANGADIPURAM",
      "BLOSSOM PULIKAL",
      "NOBLE WOMENS MANJERI",
      "PRIYADARSHINI MELMURI",
      "MIC VALLUVAMBRAM",
      "NASRA THIRURKAD",
      "ISS PERINTHALMANNA",
      "TANUR ARTS MALAPPURAM",
      "SAHYA ARTS WANDOOR",
      "PANAKKAD POOKOYA THANGAL MEMORIAL VENGARA",
      "MALABAR, MANUR, CHEGANUR ROAD",
      "EXTER COLLEGE MANJERI",
      "MAULANA COLLEGE TIRUR",
      "FATHIMA ARTS NILAMBUR",
      "IHRD - MALAPPURAM",
      "IHRD -EDAPAL",
      "IHRD - VAZHAKKAD",
      "IHRD MUTHUVALLUR",
      "BYK PUTHANATHANI",
      "KR SREENARAYANA VALANCHERI",
      "MODEL IHRD PARAPPANANGADI",
      "MALABAR VENGARA",
      "NMSM COLLEGE KALPETTA",
      "ST MARYS BATHERY",
      "WMO MUTTIL",
      "DONBOSCO BATHERY",
      "CM PANAMARAM",
      "SNDP PULPALLY",
      "ALPHONSA BATHERY",
      "IHRD - MEENANGADI",
      "LIZA KAITHAPPOYIL",
      "GREEN MOUNT PADINHARATHARA",
      "GOV VICTORIA COLLEGE ,PALAKKAD",
      "GOV COLLEGE , CHITTUR",
      "NSS COLLEGE ,OTTAPPALAM",
      "GLOBAL",
      "BHARATH",
      "MERCY COLLEGE PALAKKAD",
      "NSS COLLEGE NENMARA",
      "MES KALADI",
      "SREEKRISHNAPURAM BTB",
      "VV COLLEGE KANJIKODE",
      "THUNCHATH EZHUTHACHAN CLG",
      "YUVAKSHETHRA INSTITUTE",
      "MOUNT SEENA COLLEGE OTTAPALAM",
      "IDEAL CHERPULASSERY",
      "CHERPULASSERY COLLEGE KARALMANNA",
      "ASPIRE THRITHALA",
      "SADANAM KUMARAN MANKARA",
      "SNES KALLYANI OTTAPPALAM",
      "NETHAJI MEMORIAL NENMARA",
      "SREENARAYANA GURU COLLEGE ALATHUR",
      "KSHM EDATHANATTUKARA",
      "NAJATH NELLIPPUZHA",
      "UNIVERSAL COLLEGE MANNARKKAD",
      "BARATHAMATHA KOZHINJAMPARA",
      "LEMENT PATAMBI",
      "LIONS ALATHUR",
      "IHRD VADAKKANCHERY",
      "IHRD MALAMBUZHA",
      "IHRD KOTTAYI",
      "IHRD ATTAPPADI",
      "IHRD AVALUR",
      "SRI ATHUTHAMENON KUTTANELLUR",
      "ST THOMAS",
      "ASPIRE PATTAMBI",
      "VIMALA COLLEGE",
      "ST MARRYS",
      "SREEKERALA VARMA",
      "LITTLE FLOWER GURUVAYOOR",
      "ST JOSEPH IRINGALAKKUDA",
      "CHRIST IRINGALAKKUDA",
      "MES ASMABI VEMBALLOOR",
      "CARMEL MALA",
      "MAR DIONYSIUS PAZHANJI",
      "NAIPUNYA KORATTY",
      "MOTHER ARTS AND SCIENCE , POOVATHUR",
      "ICA THOZHIYUR",
      "ANSAR PERUMBILAV",
      "DONBOSCO MANNUTHY",
      "SN NATTIKA",
      "THRANANELLUR ARTS AND SCIENCE IRINGALAKKUDA",
      "PARAMEKKAV AYYANTHOLE",
      "MAR OSTHATHEOUS PERUMBILAV",
      "ELIMS COLLEGE",
      "NIRMALA COLLEGE KUNNAPPILLY",
      "MET KURIVILLASERY MALA",
      "IHRD NATTIKA",
      "IHRD KODUNGALLUR",
      "IHRD CHELAKKARA",
    "Other"
  ], []);

  // Filter colleges based on search input
  const filteredColleges = useMemo(() => {
    if (!collegeSearch) return collegeList;
    return collegeList.filter(college => 
      college.toLowerCase().includes(collegeSearch.toLowerCase())
    );
  }, [collegeSearch, collegeList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear API error when user starts typing
    if (apiError) setApiError('');
  };

  const handleCollegeSelect = (college) => {
    setFormData(prev => ({
      ...prev,
      college: college
    }));
    setCollegeSearch('');
    setShowCollegeDropdown(false);
  };

  const handleCollegeInputChange = (e) => {
    const value = e.target.value;
    setCollegeSearch(value);
    setFormData(prev => ({
      ...prev,
      college: value
    }));
    setShowCollegeDropdown(true);
  };

  const handleCollegeInputFocus = () => {
    setShowCollegeDropdown(true);
    if (formData.college) {
      setCollegeSearch(formData.college);
    }
  };

  const handleCollegeInputBlur = () => {
    setTimeout(() => setShowCollegeDropdown(false), 200);
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
    if (!formData.pcategory) newErrors.pcategory = 'Project Category is required';
    if (!formData.college) newErrors.college = 'College name is required';
    if (!formData.dateOfJoining) newErrors.dateOfJoining = 'Date of joining is required';
    if (!formData.fees) newErrors.fees = 'Fees is required';
    if (!formData.technology) newErrors.technology = 'Technology is required';
    if (!formData.projectName) newErrors.projectName = 'Project name is required';
    if (!formData.modeOfCourse) newErrors.modeOfCourse = 'Mode of course required';
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
    setApiError('');
    
    if (validateForm()) {
      setIsLoading(true);
      try {
        let response;

        if (student?._id) {
          response = await api.put(`/registrations/${student._id}`, formData);
        } else {
          response = await api.post('/registrations', formData);
        }

        console.log(response);
        alert(response.data.message || 'Registered succesfully')
        // setIsSubmitted(true);
        
        // Optional: Call onSave callback if provided by parent
        if (onSave) {
          onSave(response.data);
        }
        
      } catch (error) {
        console.error(error);
        setApiError(error.response?.data?.message || "An error occurred!");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setApiError('');
    setErrors({});
    
    // Reset form data if you want to allow adding another student
    if (!student) {
      setFormData({
        category: 'project',
        pcategory: '',
        institution: '',
        college: '',
        dateOfJoining: '',
        fees: '',
        technology: '',
        projectName: '',
        department: '',
        modeOfCourse: '',
        description: '',
        groupMembers: [{ name: '', email: '', phone: '', regNumber: '' }]
      });
    }
  };

  // Show success message if submitted successfully
  if (isSubmitted) {
    return (
      <div className="p-3">
        <Alert variant="success" className="text-center">
          <Alert.Heading>
            <i className="bi bi-check-circle-fill me-2"></i>
            Success!
          </Alert.Heading>
          <p>
            {student ? 'Student updated successfully!' : 'Student added successfully!'}
          </p>
          <div className="d-flex gap-2 justify-content-center">
            <Button variant="outline-success" onClick={resetForm}>
              {student ? 'Edit Again' : 'Add Another Student'}
            </Button>
            {onCancel && (
              <Button variant="secondary" onClick={onCancel}>
                Close
              </Button>
            )}
          </div>
        </Alert>
      </div>
    );
  }

  // Show the form (either initial state or when there's an error)
  return (
    <Form onSubmit={handleSubmit}>
      <div className="p-3">
        {/* API Error Alert */}
        {apiError && (
          <Alert variant="danger" className="mb-3">
            <Alert.Heading>
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              Error
            </Alert.Heading>
            {apiError}
          </Alert>
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <Alert variant="info" className="text-center mb-3">
            <i className="bi bi-arrow-repeat spinner me-2"></i>
            {student ? 'Updating student...' : 'Adding student...'}
          </Alert>
        )}

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
                disabled={isLoading || !!student}
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
            <Form.Group className="position-relative">
              <Form.Label>College Name *</Form.Label>
              <Form.Control
                type="text"
                name="college"
                value={formData.college}
                onChange={handleCollegeInputChange}
                onFocus={handleCollegeInputFocus}
                onBlur={handleCollegeInputBlur}
                isInvalid={!!errors.college}
                className="bg-dark text-white"
                placeholder="Type to search colleges..."
                autoComplete="off"
                disabled={isLoading}
              />
              <Form.Control.Feedback type="invalid">
                {errors.college}
              </Form.Control.Feedback>
              
              {/* College Dropdown */}
              {showCollegeDropdown && (
                <div 
                  className="position-absolute w-100 bg-dark border border-secondary mt-1 rounded shadow-lg z-3"
                  style={{
                    maxHeight: '200px',
                    overflowY: 'auto',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                >
                  {filteredColleges.length > 0 ? (
                    filteredColleges.map((college, index) => (
                      <div
                        key={index}
                        className="dropdown-item text-white p-2"
                        style={{ 
                          cursor: 'pointer',
                          borderBottom: '1px solid #444',
                          fontFamily: 'Inter, sans-serif'
                        }}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleCollegeSelect(college)}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      >
                        {college}
                      </div>
                    ))
                  ) : (
                    <div className="dropdown-item text-white p-2 text-center">
                      No colleges found
                    </div>
                  )}
                </div>
              )}
            </Form.Group>
          </Col>

          {/* Rest of your form fields with disabled={isLoading} added */}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
              <Form.Control.Feedback type="invalid">
                {errors.technology}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Project Category *</Form.Label>
              <Form.Select
                name="pcategory"
                value={formData.pcategory}
                onChange={handleChange}
                isInvalid={!!errors.pcategory}
                className="bg-dark text-white"
                placeholder="Enter project category"
                disabled={isLoading}
              >
                <option value="">Select Project Category</option>
                <option value="cs">CS</option>
                <option value="ec">EC</option>
                </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.pcategory}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
{/* 
          <Col md={6}>
            <Form.Group>
              <Form.Label>Institution *</Form.Label>
              <Form.Select
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                isInvalid={!!errors.institution}
                className="bg-dark text-white"
                disabled={isLoading || !!student}
              >
                <option value="">Select Institution</option>
                <option value="nexus">Nexus</option>
                <option value="trycode">Trycode</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.institution}
              </Form.Control.Feedback>
            </Form.Group>
          </Col> */}

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
                disabled={isLoading}
              />
              <Form.Control.Feedback type="invalid">
                {errors.projectName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="position-relative">
              <Form.Label>Department *</Form.Label>
              <Form.Control
                type="text"
                name="department"
                value={formData.department}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData(prev => ({
                    ...prev,
                    department: value
                  }));
                  setDepartmentSearch(value);
                  setShowDepartmentDropdown(true);
                }}
                onFocus={() => setShowDepartmentDropdown(true)}
                onBlur={() => setTimeout(() => setShowDepartmentDropdown(false), 200)}
                isInvalid={!!errors.department}
                className="bg-dark text-white"
                placeholder="Type to search departments..."
                autoComplete="off"
                disabled={isLoading}
              />
              <Form.Control.Feedback type="invalid">
                {errors.department}
              </Form.Control.Feedback>
              
              {/* Department Dropdown */}
              {showDepartmentDropdown && (
                <div 
                  className="position-absolute w-100 bg-dark border border-secondary mt-1 rounded shadow-lg z-3"
                  style={{ 
                    maxHeight: '200px',
                    overflowY: 'auto',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                >
                  {departmentList.filter(dept => 
                    dept.toLowerCase().includes(departmentSearch.toLowerCase())
                  ).length > 0 ? (
                    departmentList
                      .filter(dept => 
                        dept.toLowerCase().includes(departmentSearch.toLowerCase())
                      )
                      .map((department, index) => (
                        <div
                          key={index}
                          className="dropdown-item text-white p-2"
                          style={{ 
                            cursor: 'pointer',
                            borderBottom: '1px solid #444',
                            fontFamily: 'Inter, sans-serif'
                          }}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              department: department
                            }));
                            setDepartmentSearch('');
                            setShowDepartmentDropdown(false);
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                          {department}
                        </div>
                      ))
                  ) : (
                    <div className="dropdown-item text-white p-2 text-center">
                      No departments found
                    </div>
                  )}
                </div>
              )}
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Group Members Section */}
        <Card className="bg-dark border-secondary mt-3">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <span>Group Members</span>
            <Button 
              variant="outline-success" 
              size="sm" 
              onClick={addGroupMember}
              disabled={isLoading}
            >
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
                      disabled={isLoading}
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
                      disabled={isLoading}
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
                      disabled={isLoading}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors[`memberPhone_${index}`]}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Reg Number *</Form.Label>
                    <Form.Control
                      type="text"
                      value={member.regNumber}
                      onChange={(e) => handleGroupMemberChange(index, 'regNumber', e.target.value)}
                      isInvalid={!!errors[`memberRegno_${index}`]}
                      className="bg-dark text-white"
                      placeholder="Reg number"
                      disabled={isLoading}
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
                      disabled={isLoading}
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
          <Button 
            variant="secondary" 
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="bi bi-arrow-repeat spinner me-2"></i>
                {student ? 'Updating...' : 'Adding...'}
              </>
            ) : (
              student ? 'Update Student' : 'Add Student'
            )}
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default ProjectForm;