// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container, Row, Col, Card, Button, Table, Form, InputGroup, Modal, Dropdown } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// // import ProjectForm from './ProjectForm';
// // import InternshipForm from './InternshipForm';
// import api from '../../api';
// import ProjectForm from '../admin/ProjectForm';
// import InternshipForm from '../admin/InternshipForm';

// const SuperadminStudent = () => {
//   const [students, setStudents] = useState([]);
//   // const [student,setStudent] = useState()
//   const [showForm, setShowForm] = useState(false);
//   const [showTypeModal, setShowTypeModal] = useState(false);
//   const [selectedType, setSelectedType] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [editingStudent, setEditingStudent] = useState(null);
//   const [enrollmentFilter, setEnrollmentFilter] = useState('all');
//   console.log(enrollmentFilter);
  
  
//   const navigate = useNavigate();
//   // const API_URL = 'http://localhost:8000/api/students/';


  
// useEffect(() => {
//   fetchStudents();
// }, []);

//   const fetchStudents = async () => {
//   try {
//     const response = await api.get('/registrations')
//     setStudents(response.data.data);
//     console.log('Students fetched:', response.data);
//   } catch (error) {
//     console.error('Error fetching students:', error);
//   }
// };


//   // Filter students based on search and enrollment type
//   const filteredStudents = students.filter(student => {
//     const matchesSearch = 
//       student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       student.college?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       student.institution?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       student.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       student.technology?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       student.course?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       student.formId?.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesEnrollment = 
//       enrollmentFilter === 'all' || 
//       student.category === enrollmentFilter;

//     return matchesSearch && matchesEnrollment;
//   });

//   const generateFormId = (institution, type) => {
//     const prefix = institution === 'nexus' ? 'NXS' : 'TRC';
//     const typeCode = type === 'project' ? 'PROJ' : 'INTERN';
//     const random = Math.floor(1000 + Math.random() * 9000);
//     return `${prefix}_${typeCode}_${random}`;
//   };

//   const handleAddStudent = (studentData) => {
//     if (editingStudent) {
//       // Update existing student
//       setStudents(students.map(s => 
//         s.id === editingStudent.id ? { ...studentData, id: editingStudent.id } : s
//       ));
//     } else {
//       // Add new student
//       const newStudent = {
//         ...studentData,
//         id: Date.now().toString(),
//         formId: generateFormId(studentData.institution, selectedType),
//         category: selectedType,
//         name: selectedType === 'project' ? studentData.groupMembers?.[0]?.name : studentData.name
//       };
//       setStudents([...students, newStudent]);
//     }
//     setShowForm(false);
//     setShowTypeModal(false);
//     setEditingStudent(null);
//     setSelectedType('');
//   };

//   const handleEdit = (student) => {
//     setEditingStudent(student);
//     setSelectedType(student.category);
//     setShowForm(true);
//   };

// //   const handleDelete = (id) => {
// //     setStudents(students.filter(s => s.id !== id));
// //   };
// const handleDelete = async (id) => {
//     console.log(id,'iiiiiiiiiiiiii');
    
//   if (!window.confirm("Are you sure you want to delete this student?")) return;

//   try {
//     // Make API call to delete from backend
//     const response = await api.delete(`/registrations/${id}`);
//     alert(response.data.message || "Student deleted successfully!");

//     // Remove from local state
//     setStudents(students.filter(s => s.id !== id));
//   } catch (error) {
//     console.error("Error deleting student:", error);
//     alert(error.response?.data?.message || "Failed to delete student");
//   }
// };


//   const handleAddNewStudent = () => {
//     setEditingStudent(null);
//     setSelectedType('');
//     setShowTypeModal(true);
//   };

//   const handleTypeSelect = (type) => {
//     setSelectedType(type);
//     setShowTypeModal(false);
//     setShowForm(true);
//   };

//   const handleViewDetails = (student) => {
//     navigate('/student-details', { state: { student } });
//   };

//   // Mobile Card View
//   const MobileStudentCard = ({ student }) => (
//     <Card 
//       className="bg-dark text-white mb-3 border-secondary cursor-pointer"
//       style={{ cursor: 'pointer' }}
//       onClick={() => handleViewDetails(student)}
//     >
//       <Card.Body>
//         {/* Header with basic info */}
//         <div className="d-flex justify-content-between align-items-start mb-2">
//           <div className="d-flex align-items-center">
//             <div 
//               className="rounded-circle d-flex align-items-center justify-content-center me-2"
//               style={{ 
//                 width: '40px', 
//                 height: '40px', 
//                 background: 'rgba(255,255,255,0.1)'
//               }}
//             >
//               <i className="bi bi-person-fill"></i>
//             </div>
//             <div>
//               <h6 className="mb-0 fw-bold">{student.name || student.projectName}</h6>
//               <small className="text-light opacity-75">{student.formId}</small>
//             </div>
//           </div>
//           <span 
//             className={`badge ${
//               student.category === 'project' 
//                 ? 'bg-warning text-dark' 
//                 : 'bg-primary'
//             }`}
//           >
//             {student.category === 'project' ? 'Project' : 'Internship'}
//           </span>
//         </div>

//         {/* Course/Project Info */}
//         <div className="mb-2">
//           <small className="text-light opacity-75">
//             {student.category === 'project' ? 'Project: ' : 'Course: '}
//           </small>
//           <div className="fw-bold">
//             {student.category === 'project' ? student.technologyName : student.course}
//           </div>
//         </div>

//         {/* Institute & Email */}
//         <div className="row g-2 mb-2">
//           <Col xs={6}>
//             <small className="text-light opacity-75">Institute</small>
//             <div className="small">{student.institution}</div>
//           </Col>
//           <Col xs={6}>
//             <small className="text-light opacity-75">college</small>
//             <div className="small text-truncate">{student.college}</div>
//           </Col>
//         </div>

//         {/* Additional Info */}
//         <div className="row g-2 mb-3">
//           <Col xs={6}>
//             <small className="text-light opacity-75">Date</small>
//             <div className="small">{student.dateOfJoining}</div>
//           </Col>
//           {student.technology && (
//             <Col xs={6}>
//               <small className="text-light opacity-75">Technology</small>
//               <div>
//                 <span className="badge bg-info text-dark small">
//                   {student.technology || student.course}
//                 </span>
//               </div>
//             </Col>
//           )}
//         </div>

//         {/* Actions */}
//         <div className="d-flex gap-2" onClick={(e) => e.stopPropagation()}>
//           <Button
//             variant="outline-info"
//             size="sm"
//             onClick={() => handleViewDetails(student)}
//             className="flex-fill d-flex align-items-center justify-content-center gap-1"
//           >
//             <i className="bi bi-eye"></i>
//             View
//           </Button>
//           <Button
//             variant="outline-light"
//             size="sm"
//             onClick={() => handleEdit(student)}
//             className="flex-fill d-flex align-items-center justify-content-center gap-1"
//           >
//             <i className="bi bi-pencil"></i>
//             Edit
//           </Button>
//           {/* <Button
//             variant="outline-danger"
//             size="sm"
//             onClick={() => {handleDelete(student.id); console.log(s.id);}
//             }
//             className="flex-fill d-flex align-items-center justify-content-center gap-1"
//           >
//             <i className="bi bi-trash"></i>
//             Delete
//           </Button> */}
//           <Button
//   variant="outline-danger"
//   size="sm"
//   onClick={(e) => {
//     e.stopPropagation(); // prevent row click
//     handleDelete(student._id);
    
//   }}
//   title="Delete"
// >
//   <i className="bi bi-trash"></i>
// </Button>

//         </div>
//       </Card.Body>
//     </Card>
//   );

//   // Desktop Table Row with click handler=========================================================================================================
//   const DesktopTableRow = ({ student }) => (
//     <tr 
//       key={student.id} 
//       className="align-middle cursor-pointer"
//       style={{ cursor: 'pointer' }}
//       onClick={() => handleViewDetails(student)}
//     >
//       <td style={{borderColor: 'rgba(255,255,255,0.1)'}}>
//         <code>{student.groupNo || student.formId}</code>
//       </td>
//       <td style={{borderColor: 'rgba(255,255,255,0.1)'}}>
//         <div className="d-flex align-items-center">
//           <div 
//             className="rounded-circle d-flex align-items-center justify-content-center me-3"
//             style={{ 
//               width: '40px', 
//               height: '40px', 
//               background: 'rgba(255,255,255,0.1)' 
//             }}
//           >
//             <i className="bi bi-person-fill"></i>
//           </div>
//           <div>
//             <div className="fw-bold">{student.name || student.projectName}</div>
//             <small className="text-light opacity-75">{student.regNumber}</small>
//           </div>
//         </div>
//       </td>
//       <td style={{borderColor: 'rgba(255,255,255,0.1)'}}>{student.institution}</td>
//       <td style={{borderColor: 'rgba(255,255,255,0.1)'}}>{student.college}</td>
//       <td style={{borderColor: 'rgba(255,255,255,0.1)'}}>{student.dateOfJoining}</td>
//       <td style={{borderColor: 'rgba(255,255,255,0.1)'}}>{student.modeOfCourse}</td>
//       <td style={{borderColor: 'rgba(255,255,255,0.1)'}}>
//         {student.category === 'project' ? student.technology : student.course}
//       </td>
//       {/* <td style={{borderColor: 'rgba(255,255,255,0.1)'}}>
//         {student.technology && (
//           <span className="badge bg-info text-dark">
//             {student.technology}
//           </span>
//         )}
//       </td> */}
//       <td style={{borderColor: 'rgba(255,255,255,0.1)'}}>
//         <span 
//           className={`badge ${
//             student.category === 'project' 
//               ? 'bg-warning text-dark' 
//               : 'bg-primary'
//           }`}
//         >
//           {student.category}
//         </span>
//       </td>
//       <td style={{borderColor: 'rgba(255,255,255,0.1)'}} onClick={(e) => e.stopPropagation()}>
//         <div className="d-flex gap-2">
//           <Button
//             variant="outline-info"
//             size="sm"
//             onClick={() => handleViewDetails(student)}
//             title="View Details"
//           >
//             <i className="bi bi-eye"></i>
//           </Button>
//           <Button
//             variant="outline-light"
//             size="sm"
//             onClick={() => handleEdit(student)}
//             title="Edit"
//           >
//             <i className="bi bi-pencil"></i>
//           </Button>
//           {/* <Button
//             variant="outline-danger"
//             size="sm"
//             onClick={() => handleDelete(student.id)}
//             title="Delete"
//           >
//             <i className="bi bi-trash"></i>
//           </Button> */}
//           <Button
//   variant="outline-danger"
//   size="sm"
//   onClick={(e) => {
//     e.stopPropagation(); // prevent row click
//     handleDelete(student._id);
//   }}
//   title="Delete"
// >
//   <i className="bi bi-trash"></i>
// </Button>

//         </div>
//       </td>
//     </tr>
//   );

//   return (
//     <Container fluid className="px-2 px-md-3">
//       {/* Header Section */}
//       <Row className="mb-3 mb-md-4">
//         <Col>
//           <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
//             <div className="text-center text-md-start">
//               <h2 className="text-white mb-1 fs-4 fs-md-3">Student Management</h2>
//               <p className="text-light mb-0 d-none d-md-block">Manage student records and enrollment</p>
//             </div>
//             <Button 
//               variant="primary" 
//               onClick={handleAddNewStudent}
//               className="d-md-flex align-items-center gap-2  d-none w-md-auto justify-content-center"
//               size="sm"
//             >
//               <i className="bi bi-plus-circle"></i>
//               <span className="d-none d-lg-inline">Add New Student</span>
//               <span className="d-lg-none">Add Student</span>
//             </Button>
//           </div>
//         </Col>
//       </Row>

//       {/* Stats Cards */}
//       <Row className="mb-3 mb-md-4 g-2 g-md-3">
//         <Col xs={6} md={3}>
//           <Card className="bg-dark text-white h-100" style={{border: 'none'}}>
//             <Card.Body className="p-2 p-md-3">
//               <div className="d-flex justify-content-between align-items-center">
//                 <div>
//                   <h4 className="mb-0 fs-6 fs-md-4">{students.length}</h4>
//                   <small className="text-light">Total Students</small>
//                 </div>
//                 <i className="bi bi-people text-primary fs-5 fs-md-2"></i>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col xs={6} md={3}>
//           <Card className="bg-dark text-white h-100" style={{border: 'none'}}>
//             <Card.Body className="p-2 p-md-3">
//               <div className="d-flex justify-content-between align-items-center">
//                 <div>
//                   <h4 className="mb-0 fs-6 fs-md-4">
//                     {students.filter(s => s.category === 'project').length}
//                   </h4>
//                   <small className="text-light">Project Students</small>
//                 </div>
//                 <i className="bi bi-folder text-warning fs-5 fs-md-2"></i>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col xs={6} md={3}>
//           <Card className="bg-dark text-white h-100" style={{border: 'none'}}>
//             <Card.Body className="p-2 p-md-3">
//               <div className="d-flex justify-content-between align-items-center">
//                 <div>
//                   <h4 className="mb-0 fs-6 fs-md-4">
//                     {students.filter(s => s.category === 'internship').length}
//                   </h4>
//                   <small className="text-light">Internship Students</small>
//                 </div>
//                 <i className="bi bi-briefcase text-info fs-5 fs-md-2"></i>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col xs={6} md={3}>
//           <Card className="bg-dark text-white h-100" style={{border: 'none'}}>
//             <Card.Body className="p-2 p-md-3">
//               <div className="d-flex justify-content-between align-items-center">
//                 <div>
//                   <h4 className="mb-0 fs-6 fs-md-4">
//                     {new Set(students.map(s => s.college)).size}
//                   </h4>
//                   <small className="text-light">Colleges</small>
//                 </div>
//                 <i className="bi bi-building text-success fs-5 fs-md-2"></i>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Search and Controls */}
//       <Row className="mb-3 g-2">
//         <Col xs={12} md={6}>
//           <InputGroup size="sm">
//             <Form.Control
//               type="text"
//               placeholder="Search by form ID, name, college, or email..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="bg-dark text-white"
//               style={{border: '1px solid rgba(255,255,255,0.2)'}}
//             />
//             <Button 
//               variant="outline-secondary" 
//               style={{border: '1px solid rgba(255,255,255,0.2)'}}
//               size="sm"
//             >
//               <i className="bi bi-search"></i>
//             </Button>
//           </InputGroup>
//         </Col>
//         <Col xs={12} md={6}>
//           <div className="d-flex flex-column flex-md-row gap-2 justify-content-md-end">
//             <Form.Select 
//               className="bg-dark text-white" 
//               style={{ border: '1px solid rgba(255,255,255,0.2)' }}
//               value={enrollmentFilter}
//               onChange={(e) => setEnrollmentFilter(e.target.value)}
//               size="sm"
//             >
//               <option value="all">All Enrollment Types</option>
//               <option value="project">Project</option>
//               <option value="internship">Internship</option>
//             </Form.Select>
//           </div>
//         </Col>
//       </Row>

//       {/* Students List - Mobile Card View */}
//       <div className="d-md-none">
//         <Row>
//           <Col>
//             {filteredStudents.length === 0 ? (
//               <div className="text-center py-5">
//                 <i className="bi bi-people fs-1 text-light opacity-50"></i>
//                 <h5 className="text-light mt-3 fs-6">No students found</h5>
//                 <p className="text-light opacity-75 px-3">
//                   {students.length === 0 
//                     ? "Get started by adding your first student" 
//                     : "No students match your search criteria"}
//                 </p>
//                 {students.length === 0 && (
//                   <Button 
//                     variant="primary" 
//                     onClick={handleAddNewStudent}
//                     size="sm"
//                   >
//                     Add First Student
//                   </Button>
//                 )}
//               </div>
//             ) : (
//               <div>
//                 {filteredStudents.map((student) => (
//                   <MobileStudentCard key={student.id} student={student} />
//                 ))}
//               </div>
//             )}
//           </Col>
//         </Row>
//       </div>

//       {/* Students Table - Desktop View */}
//       <div className="d-none d-md-block">
//         <Row>
//           <Col>
//             <Card className="bg-dark text-white" style={{border: 'none'}}>
//               <Card.Body className="p-0">
//                 {filteredStudents.length === 0 ? (
//                   <div className="text-center py-5">
//                     <i className="bi bi-people display-1 text-light opacity-50"></i>
//                     <h5 className="text-light mt-3">No students found</h5>
//                     <p className="text-light opacity-75">
//                       {students.length === 0 
//                         ? "Get started by adding your first student" 
//                         : "No students match your search criteria"}
//                     </p>
//                     {students.length === 0 && (
//                       <Button variant="primary" onClick={handleAddNewStudent}>
//                         Add First Student
//                       </Button>
//                     )}
//                   </div>
//                 ) : (
//                   <div className="table-responsive">
//                     <Table hover variant="dark" className="mb-0" style={{border: 'none'}}>
//                       <thead>
//                         <tr>
//                           <th style={{borderColor: 'rgba(255,255,255,0.1)'}}>Form ID</th>
//                           <th style={{borderColor: 'rgba(255,255,255,0.1)'}}>Name</th>
//                           <th style={{borderColor: 'rgba(255,255,255,0.1)'}}>Institute</th>
//                           <th style={{borderColor: 'rgba(255,255,255,0.1)'}}>College</th>
//                           <th style={{borderColor: 'rgba(255,255,255,0.1)'}}>Date of Joining</th>
//                           <th style={{borderColor: 'rgba(255,255,255,0.1)'}}>Mode</th>
//                           <th style={{borderColor: 'rgba(255,255,255,0.1)'}}>Technology</th>
//                           {/* <th style={{borderColor: 'rgba(255,255,255,0.1)'}}>Technology</th> */}
//                           <th style={{borderColor: 'rgba(255,255,255,0.1)'}}>Type</th>
//                           <th style={{borderColor: 'rgba(255,255,255,0.1)'}}>Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {filteredStudents.map((student) => (
//                           <DesktopTableRow key={student.id} student={student} />
//                         ))}
//                       </tbody>
//                     </Table>
//                   </div>
//                 )}
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </div>

//       {/* Floating Action Button for Mobile */}
//       <div className="d-md-none position-fixed bottom-0 end-0 m-3" style={{zIndex: 1050}}>
//         <Button
//           variant="primary"
//           onClick={handleAddNewStudent}
//           className="rounded-circle d-flex align-items-center justify-content-center"
//           style={{ 
//             width: '60px', 
//             height: '60px',
//             boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
//           }}
//         >
//           <i className="bi bi-plus fs-4"></i>
//         </Button>
//       </div>

//       {/* Type Selection Modal */}
//       <Modal 
//         show={showTypeModal} 
//         onHide={() => setShowTypeModal(false)}
//         centered
//         contentClassName="bg-dark"
//         size="sm"
//       >
//         <Modal.Header closeButton className="bg-dark text-white border-secondary">
//           <Modal.Title className="fs-6">
//             <i className="bi bi-person-plus me-2"></i>
//             Select Enrollment Type
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="bg-dark text-white text-center py-4">
//           <div className="row g-3">
//             <div className="col-12">
//               <div 
//                 className="card bg-dark border-warning h-100 cursor-pointer"
//                 style={{ cursor: 'pointer' }}
//                 onClick={() => handleTypeSelect('project')}
//               >
//                 <div className="card-body text-center py-4">
//                   <i className="bi bi-folder text-warning fs-1"></i>
//                   <h5 className="mt-3 mb-2">Project</h5>
//                   <p className="text-light opacity-75 mb-0 small">Register for project work</p>
//                 </div>
//               </div>
//             </div>
//             <div className="col-12">
//               <div 
//                 className="card bg-dark border-info h-100 cursor-pointer"
//                 style={{ cursor: 'pointer' }}
//                 onClick={() => handleTypeSelect('internship')}
//               >
//                 <div className="card-body text-center py-4">
//                   <i className="bi bi-briefcase text-info fs-1"></i>
//                   <h5 className="mt-3 mb-2">Internship</h5>
//                   <p className="text-light opacity-75 mb-0 small">Register for internship</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Modal.Body>
//       </Modal>

//       {/* Student Form Modal */}
//       <Modal 
//         show={showForm} 
//         onHide={() => {
//           setShowForm(false);
//           setEditingStudent(null);
//           setSelectedType('');
//         }}
//         size="lg"
//         centered
//         contentClassName="bg-dark"
//         scrollable
//       >
//         <Modal.Header closeButton className="bg-dark text-white border-secondary">
//           <Modal.Title className="fs-6">
//             <i className="bi bi-person-plus me-2"></i>
//             {editingStudent ? 'Edit Student' : `Add New ${selectedType === 'project' ? 'Project' : 'Internship'} Student`}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="bg-dark text-white p-0">
//           {selectedType === 'project' ? (
            
//             <ProjectForm
//             student={editingStudent}
//               onSave={handleAddStudent}
//               onCancel={() => {
//                 setShowForm(false);
//                 setEditingStudent(null);
//                 setSelectedType('');
//               }}/>

//           ) : (
            
//             <InternshipForm
//             student={editingStudent}
//               onSave={handleAddStudent}
//               onCancel={() => {
//                 setShowForm(false);
//                 setEditingStudent(null);
//                 setSelectedType('');
//               }}/>
//           )}
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// };

// export default SuperadminStudent;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Table, Form, InputGroup, Modal, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import ProjectForm from './ProjectForm';
// import InternshipForm from './InternshipForm';
import api from '../../api';
import ProjectForm from '../admin/ProjectForm';
import InternshipForm from '../admin/InternshipForm';

const SuperadminStudent = () => {
  const [students, setStudents] = useState([]);
  // const [student,setStudent] = useState()
  const [showForm, setShowForm] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const [enrollmentFilter, setEnrollmentFilter] = useState('all');
  console.log(enrollmentFilter);
  
  
  const navigate = useNavigate();
  // const API_URL = 'http://localhost:8000/api/students/';


  
useEffect(() => {
  fetchStudents();
}, []);

  const fetchStudents = async () => {
  try {
    const response = await api.get('/registrations')
    setStudents(response.data.data);
    console.log('Students fetched:', response.data);
  } catch (error) {
    console.error('Error fetching students:', error);
  }
};


  // Filter students based on search and enrollment type
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.college?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.institution?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.technology?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.course?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.formId?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesEnrollment = 
      enrollmentFilter === 'all' || 
      student.category === enrollmentFilter;

    return matchesSearch && matchesEnrollment;
  });

  const handleAddStudent = async (studentData) => {
    if (editingStudent) {
      // Update existing student
      setStudents(students.map(s => 
        s.id === editingStudent.id ? { ...studentData, id: editingStudent.id } : s
      ));
    } else {
      // Add new student
      const newStudent = {
        ...studentData,
        id: Date.now().toString(),
        category: selectedType,
        name: selectedType === 'project' ? studentData.groupMembers?.[0]?.name : studentData.name
      };
      setStudents([...students, newStudent]);
    }
    setShowForm(false);
    setShowTypeModal(false);
    setEditingStudent(null);
    setSelectedType('');
      // fetch from backend once after save
  await fetchStudents();
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setSelectedType(student.category);
    setShowForm(true);
  };

//   const handleDelete = (id) => {
//     setStudents(students.filter(s => s.id !== id));
//   };
const handleDelete = async (id) => {
    console.log(id,'iiiiiiiiiiiiii');
    
  if (!window.confirm("Are you sure you want to delete this student?")) return;

  try {
    // Make API call to delete from backend
    const response = await api.delete(`/registrations/${id}`);
    alert(response.data.message || "Student deleted successfully!");

    // Remove from local state
    setStudents(students.filter(s => s.id !== id));
    await fetchStudents();
  } catch (error) {
    console.error("Error deleting student:", error);
    alert(error.response?.data?.message || "Failed to delete student");
  }
};


  const handleAddNewStudent = () => {
    setEditingStudent(null);
    setSelectedType('');
    setShowTypeModal(true);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setShowTypeModal(false);
    setShowForm(true);
  };

  const handleViewDetails = (student) => {
    navigate('/student-details', { state: { student } });
  };

  // Mobile Card View
  const MobileStudentCard = ({ student }) => (
    <Card 
      className="bg-dark text-white mb-3 border-secondary cursor-pointer"
      style={{ cursor: 'pointer' }}
      onClick={() => handleViewDetails(student)}
    >
      <Card.Body>
        {/* Header with basic info */}
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div className="d-flex align-items-center">
            <div 
              className="rounded-circle d-flex align-items-center justify-content-center me-2"
              style={{ 
                width: '40px', 
                height: '40px', 
                background: 'rgba(255,255,255,0.1)'
              }}
            >
              <i className="bi bi-person-fill"></i>
            </div>
            <div>
              <h6 className="mb-0 fw-bold">{student.name || student.projectName}</h6>
              <small className="text-light opacity-75">{student.formId}</small>
            </div>
          </div>
          <span 
            className={`badge ${
              student.category === 'project' 
                ? 'bg-warning text-dark' 
                : 'bg-primary'
            }`}
          >
            {student.category === 'project' ? 'Project' : 'Internship'}
          </span>
        </div>

        {/* Course/Project Info */}
        <div className="mb-2">
          <small className="text-light opacity-75">
            {student.category === 'project' ? 'Project: ' : 'Course: '}
          </small>
          <div className="fw-bold">
            {student.category === 'project' ? student.technologyName : student.course}
          </div>
        </div>

        {/* Institute & Email */}
        <div className="row g-2 mb-2">
          <Col xs={6}>
            <small className="text-light opacity-75">Institute</small>
            <div className="small">{student.institution}</div>
          </Col>
          <Col xs={6}>
            <small className="text-light opacity-75">college</small>
            <div className="small text-truncate">{student.college}</div>
          </Col>
        </div>

        {/* Additional Info */}
        <div className="row g-2 mb-3">
          <Col xs={6}>
            <small className="text-light opacity-75">Date</small>
            <div className="small">{student.dateOfJoining}</div>
          </Col>
          {student.technology && (
            <Col xs={6}>
              <small className="text-light opacity-75">Technology</small>
              <div>
                <span className="badge bg-info text-dark small">
                  {student.technology || student.course}
                </span>
              </div>
            </Col>
          )}
        </div>

        {/* Actions */}
        <div className="d-flex gap-2" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="outline-info"
            size="sm"
            onClick={() => handleViewDetails(student)}
            className="flex-fill d-flex align-items-center justify-content-center gap-1"
          >
            <i className="bi bi-eye"></i>
            View
          </Button>
          <Button
            variant="outline-light"
            size="sm"
            onClick={() => handleEdit(student)}
            className="flex-fill d-flex align-items-center justify-content-center gap-1"
          >
            <i className="bi bi-pencil"></i>
            Edit
          </Button>
          {/* <Button
            variant="outline-danger"
            size="sm"
            onClick={() => {handleDelete(student.id); console.log(s.id);}
            }
            className="flex-fill d-flex align-items-center justify-content-center gap-1"
          >
            <i className="bi bi-trash"></i>
            Delete
          </Button> */}
          <Button
  variant="outline-danger"
  size="sm"
  onClick={(e) => {
    e.stopPropagation(); // prevent row click
    handleDelete(student._id);
    
  }}
  title="Delete"
>
  <i className="bi bi-trash"></i>
</Button>

        </div>
      </Card.Body>
    </Card>
  );

  // Desktop Table Row with click handler=========================================================================================================
  const DesktopTableRow = ({ student }) => (
    <tr 
      key={student.id} 
      className="align-middle cursor-pointer"
      style={{ cursor: 'pointer' }}
      onClick={() => handleViewDetails(student)}
    >
      <td style={{borderColor: 'rgba(255,255,255,0.1)'}}>
        <code>{student.groupNo || student.formId}</code>
      </td>
      <td style={{borderColor: 'rgba(255,255,255,0.1)'}}>
        <div className="d-flex align-items-center">
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center me-3"
            style={{ 
              width: '40px', 
              height: '40px', 
              background: 'rgba(255,255,255,0.1)' 
            }}
          >
            <i className="bi bi-person-fill"></i>
          </div>
          <div>
            <div className="fw-bold">{student.name || student.projectName}</div>
            <small className="text-light opacity-75">{student.regNumber}</small>
          </div>
        </div>
      </td>
      <td style={{borderColor: 'rgba(255,255,255,0.1)'}}>{student.institution}</td>
      <td style={{borderColor: 'rgba(255,255,255,0.1)'}}>{student.college}</td>
      <td style={{borderColor: 'rgba(255,255,255,0.1)'}}>{student.dateOfJoining}</td>
      <td style={{borderColor: 'rgba(255,255,255,0.1)'}}>{student.modeOfCourse}</td>
      <td style={{borderColor: 'rgba(255,255,255,0.1)'}}>
        {student.category === 'project' ? student.technology : student.course}
      </td>
      {/* <td style={{borderColor: 'rgba(255,255,255,0.1)'}}>
        {student.technology && (
          <span className="badge bg-info text-dark">
            {student.technology}
          </span>
        )}
      </td> */}
      <td style={{borderColor: 'rgba(255,255,255,0.1)'}}>
        <span 
          className={`badge ${
            student.category === 'project' 
              ? 'bg-warning text-dark' 
              : 'bg-primary'
          }`}
        >
          {student.category}
        </span>
      </td>
      <td style={{borderColor: 'rgba(255,255,255,0.1)'}} onClick={(e) => e.stopPropagation()}>
        <div className="d-flex gap-2">
          <Button
            variant="outline-info"
            size="sm"
            onClick={() => handleViewDetails(student)}
            title="View Details"
          >
            <i className="bi bi-eye"></i>
          </Button>
          <Button
            variant="outline-light"
            size="sm"
            onClick={() => handleEdit(student)}
            title="Edit"
          >
            <i className="bi bi-pencil"></i>
          </Button>
          {/* <Button
            variant="outline-danger"
            size="sm"
            onClick={() => handleDelete(student.id)}
            title="Delete"
          >
            <i className="bi bi-trash"></i>
          </Button> */}
          <Button
  variant="outline-danger"
  size="sm"
  onClick={(e) => {
    e.stopPropagation(); // prevent row click
    handleDelete(student._id);
  }}
  title="Delete"
>
  <i className="bi bi-trash"></i>
</Button>

        </div>
      </td>
    </tr>
  );

  return (
    <Container fluid className="px-2 px-md-3">
      {/* Header Section */}
      <Row className="mb-3 mb-md-4">
        <Col>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
            <div className="text-center text-md-start">
              <h2 className="text-white mb-1 fs-4 fs-md-3">Student Management</h2>
              <p className="text-light mb-0 d-none d-md-block">Manage student records and enrollment</p>
            </div>
            <div className='d-flex gap-1'>
              <Button
                variant="outline-light" 
  className="bg-transparent border-white text-white"
  onClick={fetchStudents}>
    <i className="bi bi-arrow-clockwise pe-2"></i>
              Refresh
              </Button>
            <Button 
              variant="primary" 
              onClick={handleAddNewStudent}
              className="d-md-flex align-items-center gap-2  d-none w-md-auto justify-content-center"
              size="sm"
            >
              <i className="bi bi-plus-circle"></i>
              <span className="d-none d-lg-inline">Add New Student</span>
              <span className="d-lg-none">Add Student</span>
            </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-3 mb-md-4 g-2 g-md-3">
        <Col xs={6} md={3}>
          <Card className="bg-dark text-white h-100" style={{border: 'none'}}>
            <Card.Body className="p-2 p-md-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="mb-0 fs-6 fs-md-4">{students.length}</h4>
                  <small className="text-light">Total Students</small>
                </div>
                <i className="bi bi-people text-primary fs-5 fs-md-2"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3}>
          <Card className="bg-dark text-white h-100" style={{border: 'none'}}>
            <Card.Body className="p-2 p-md-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="mb-0 fs-6 fs-md-4">
                    {students.filter(s => s.category === 'project').length}
                  </h4>
                  <small className="text-light">Project Students</small>
                </div>
                <i className="bi bi-folder text-warning fs-5 fs-md-2"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3}>
          <Card className="bg-dark text-white h-100" style={{border: 'none'}}>
            <Card.Body className="p-2 p-md-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="mb-0 fs-6 fs-md-4">
                    {students.filter(s => s.category === 'internship').length}
                  </h4>
                  <small className="text-light">Internship Students</small>
                </div>
                <i className="bi bi-briefcase text-info fs-5 fs-md-2"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3}>
          <Card className="bg-dark text-white h-100" style={{border: 'none'}}>
            <Card.Body className="p-2 p-md-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="mb-0 fs-6 fs-md-4">
                    {new Set(students.map(s => s.college)).size}
                  </h4>
                  <small className="text-light">Colleges</small>
                </div>
                <i className="bi bi-building text-success fs-5 fs-md-2"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Search and Controls */}
      <Row className="mb-3 g-2">
        <Col xs={12} md={6}>
          <InputGroup size="sm">
            <Form.Control
              type="text"
              placeholder="Search by form ID, name, college, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-dark text-white"
              style={{border: '1px solid rgba(255,255,255,0.2)'}}
            />
            <Button 
              variant="outline-secondary" 
              style={{border: '1px solid rgba(255,255,255,0.2)'}}
              size="sm"
            >
              <i className="bi bi-search"></i>
            </Button>
          </InputGroup>
        </Col>
        <Col xs={12} md={6}>
          <div className="d-flex flex-column flex-md-row gap-2 justify-content-md-end">
            <Form.Select 
              className="bg-dark text-white" 
              style={{ border: '1px solid rgba(255,255,255,0.2)' }}
              value={enrollmentFilter}
              onChange={(e) => setEnrollmentFilter(e.target.value)}
              size="sm"
            >
              <option value="all">All Enrollment Types</option>
              <option value="project">Project</option>
              <option value="internship">Internship</option>
            </Form.Select>
          </div>
        </Col>
      </Row>

      {/* Students List - Mobile Card View */}
      <div className="d-md-none">
        <Row>
          <Col>
            {filteredStudents.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-people fs-1 text-light opacity-50"></i>
                <h5 className="text-light mt-3 fs-6">No students found</h5>
                <p className="text-light opacity-75 px-3">
                  {students.length === 0 
                    ? "Get started by adding your first student" 
                    : "No students match your search criteria"}
                </p>
                {students.length === 0 && (
                  <Button 
                    variant="primary" 
                    onClick={handleAddNewStudent}
                    size="sm"
                  >
                    Add First Student
                  </Button>
                )}
              </div>
            ) : (
              <div>
                {filteredStudents.map((student) => (
                  <MobileStudentCard key={student.id} student={student} />
                ))}
              </div>
            )}
          </Col>
        </Row>
      </div>

      {/* Students Table - Desktop View */}
      <div className="d-none d-md-block">
        <Row>
          <Col>
            <Card className="bg-dark text-white" style={{border: 'none'}}>
              <Card.Body className="p-0">
                {filteredStudents.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="bi bi-people display-1 text-light opacity-50"></i>
                    <h5 className="text-light mt-3">No students found</h5>
                    <p className="text-light opacity-75">
                      {students.length === 0 
                        ? "Get started by adding your first student" 
                        : "No students match your search criteria"}
                    </p>
                    {students.length === 0 && (
                      <Button variant="primary" onClick={handleAddNewStudent}>
                        Add First Student
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="table-responsive">
                    <Table hover variant="dark" className="mb-0" style={{border: 'none'}}>
                      <thead>
                        <tr>
                          <th style={{borderColor: 'rgba(255,255,255,0.1)'}}>Form ID</th>
                          <th style={{borderColor: 'rgba(255,255,255,0.1)'}}>Name</th>
                          <th style={{borderColor: 'rgba(255,255,255,0.1)'}}>Institute</th>
                          <th style={{borderColor: 'rgba(255,255,255,0.1)'}}>College</th>
                          <th style={{borderColor: 'rgba(255,255,255,0.1)'}}>Date of Joining</th>
                          <th style={{borderColor: 'rgba(255,255,255,0.1)'}}>Mode</th>
                          <th style={{borderColor: 'rgba(255,255,255,0.1)'}}>Technology</th>
                          {/* <th style={{borderColor: 'rgba(255,255,255,0.1)'}}>Technology</th> */}
                          <th style={{borderColor: 'rgba(255,255,255,0.1)'}}>Type</th>
                          <th style={{borderColor: 'rgba(255,255,255,0.1)'}}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredStudents.map((student) => (
                          <DesktopTableRow key={student.id} student={student} />
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Floating Action Button for Mobile */}
      <div className="d-md-none position-fixed bottom-0 end-0 m-3" style={{zIndex: 1050}}>
        <Button
          variant="primary"
          onClick={handleAddNewStudent}
          className="rounded-circle d-flex align-items-center justify-content-center"
          style={{ 
            width: '60px', 
            height: '60px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}
        >
          <i className="bi bi-plus fs-4"></i>
        </Button>
      </div>

      {/* Type Selection Modal */}
      <Modal 
        show={showTypeModal} 
        onHide={() => setShowTypeModal(false)}
        centered
        contentClassName="bg-dark"
        size="sm"
      >
        <Modal.Header closeButton className="bg-dark text-white border-secondary">
          <Modal.Title className="fs-6">
            <i className="bi bi-person-plus me-2"></i>
            Select Enrollment Type
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white text-center py-4">
          <div className="row g-3">
            <div className="col-12">
              <div 
                className="card bg-dark border-warning h-100 cursor-pointer"
                style={{ cursor: 'pointer' }}
                onClick={() => handleTypeSelect('project')}
              >
                <div className="card-body text-center py-4">
                  <i className="bi bi-folder text-warning fs-1"></i>
                  <h5 className="mt-3 mb-2">Project</h5>
                  <p className="text-light opacity-75 mb-0 small">Register for project work</p>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div 
                className="card bg-dark border-info h-100 cursor-pointer"
                style={{ cursor: 'pointer' }}
                onClick={() => handleTypeSelect('internship')}
              >
                <div className="card-body text-center py-4">
                  <i className="bi bi-briefcase text-info fs-1"></i>
                  <h5 className="mt-3 mb-2">Internship</h5>
                  <p className="text-light opacity-75 mb-0 small">Register for internship</p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Student Form Modal */}
      <Modal 
        show={showForm} 
        onHide={() => {
          setShowForm(false);
          setEditingStudent(null);
          setSelectedType('');
        }}
        size="lg"
        centered
        contentClassName="bg-dark"
        scrollable
      >
        <Modal.Header closeButton className="bg-dark text-white border-secondary">
          <Modal.Title className="fs-6">
            <i className="bi bi-person-plus me-2"></i>
            {editingStudent ? 'Edit Student' : `Add New ${selectedType === 'project' ? 'Project' : 'Internship'} Student`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white p-0">
          {selectedType === 'project' ? (
            
            <ProjectForm
            student={editingStudent}
              onSave={handleAddStudent}
              onCancel={() => {
                setShowForm(false);
                setEditingStudent(null);
                setSelectedType('');
              }}/>

          ) : (
            
            <InternshipForm
            student={editingStudent}
              onSave={handleAddStudent}
              onCancel={() => {
                setShowForm(false);
                setEditingStudent(null);
                setSelectedType('');
              }}/>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default SuperadminStudent;