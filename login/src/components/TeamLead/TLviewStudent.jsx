
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { Container, Row, Col, Card, Button, Table, Form, InputGroup, Modal, Dropdown } from 'react-bootstrap';
// // import { useNavigate } from 'react-router-dom';
// // import ProjectForm from '../admin/ProjectForm';
// // import InternshipForm from '../admin/InternshipForm';
// // import api from '../../api';
// // // import ProjectForm from './ProjectForm';
// // // import InternshipForm from './InternshipForm';
// // // import api from '../../api';

// // const TLStudent = () => {
// //   const [students, setStudents] = useState([]);
// //   const [showForm, setShowForm] = useState(false);
// //   const [showTypeModal, setShowTypeModal] = useState(false);
// //   const [selectedType, setSelectedType] = useState('');
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [editingStudent, setEditingStudent] = useState(null);
// //   const [enrollmentFilter, setEnrollmentFilter] = useState('all');

// //   const [showStatusModal, setShowStatusModal] = useState(false);
// // const [selectedStudent, setSelectedStudent] = useState(null);
// // const [newStatus, setNewStatus] = useState('notstarted');
  
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetchStudents();
// //   }, []);

// //   const fetchStudents = async () => {
// //     try {
// //       const response = await api.get('/registrations')
// //       setStudents(response.data.data);
// //     } catch (error) {
// //       console.error('Error fetching students:', error);
// //     }
// //   };

// //   // Filter students based on search and enrollment type
// //   const filteredStudents = students.filter(student => {
// //     const matchesSearch = 
// //       student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       student.college?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       student.institution?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       student.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       student.technology?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       student.modeOfCourse?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       student.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       student.formId?.toLowerCase().includes(searchTerm.toLowerCase());

// //     const matchesEnrollment = 
// //       enrollmentFilter === 'all' || 
// //       student.category === enrollmentFilter;

// //     return matchesSearch && matchesEnrollment;
// //   });

// //   const handleAddStudent = async (studentData) => {
// //     if (editingStudent) {
// //       setStudents(students.map(s => 
// //         s.id === editingStudent.id ? { ...studentData, id: editingStudent.id } : s
// //       ));
// //     } else {
// //       const newStudent = {
// //         ...studentData,
// //         id: Date.now().toString(),
// //         category: selectedType,
// //         name: selectedType === 'project' ? studentData.groupMembers?.[0]?.name : studentData.name
// //       };
// //       setStudents([...students, newStudent]);
// //     }
// //     setShowForm(false);
// //     setShowTypeModal(false);
// //     setEditingStudent(null);
// //     setSelectedType('');
// //     await fetchStudents();
// //   };

// //   const handleEdit = (student) => {
// //     setEditingStudent(student);
// //     setSelectedType(student.category);
// //     setShowForm(true);
// //   };

// //   const handleDelete = (id) => {
// //     setStudents(students.filter(s => s.id !== id));
// //   };

// //   const handleAddNewStudent = () => {
// //     setEditingStudent(null);
// //     setSelectedType('');
// //     setShowTypeModal(true);
// //   };

// //   const handleTypeSelect = (type) => {
// //     setSelectedType(type);
// //     setShowTypeModal(false);
// //     setShowForm(true);
// //   };

// //   const handleViewDetails = (student) => {
// //     navigate('/student-details', { state: { student } });
// //   };
// // const handleCurrentStatus = (student) => {
// //   setSelectedStudent(student);
// //   setNewStatus(student.projectStatus);
// //   setShowStatusModal(true);
// // }; 

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// // const fetchData = async ()=>{
// //   try{
// //     const staffRes = await api.get('/staff/all')
// //     console.log(staffRes, "staff of team lead");
    
// //   }
// //   catch(e){
// //     console.log(e);
    
// //   }
// // }



// // // const handleSaveStatus = async () => {
// // //   if (!selectedStudent) return;
// // //   console.log(newStatus,selectedStudent._id,selectedStudent);
// // //   const studentId = selectedStudent._id
  

// // //   try {
// // //     // Update backend
// // //     // await api.put(`/registrations/${selectedStudent._id}`, { status: newStatus });

// // //     // Update local state
// // //     // setStudents((prev) =>
// // //     //   prev.map((s) =>
// // //     //     s._id === selectedStudent._id ? { ...s, status: newStatus } : s
// // //     //   )
// // //     // );

// // //     setShowStatusModal(false);
// // //     setSelectedStudent(null);
// // //   } catch (error) {
// // //     console.error('Error updating status:', error);
// // //   }
// // // };


// //   // Mobile Card View - Enhanced for very small screens
// //   const handleSaveStatus = async () => {
    
    
// //   if (!selectedStudent) return;

// //   const studentId = selectedStudent._id;
// //   const newStatus = "dropped";
// //   console.log(newStatus);

// //   try {
// //     // ✅ Update status in backend
// //     const response = await api.put(`/registrations/${studentId}/projectstatus`, { status: newStatus });
// //     console.log(response,"updated statusssssssssssssssssssssssss");
    

// //     // ✅ Update local state immediately to reflect changes in UI
// //     // setStudents((prev) =>
// //     //   prev.map((s) =>
// //     //     s._id === studentId ? { ...s, status: newStatus } : s
// //     //   )
// //     // );

// //     // ✅ Close modal and clear selection
// //     alert("Status updated Successfully!!")
// //     setShowStatusModal(false);
// //     setSelectedStudent(null);
// //     fetchStudents();
// //   } catch (error) {
// //     alert("Status updation failed!!")
// //     console.error("Error updating status:", error);

// //   }
// // };

  
  
// //   const MobileStudentCard = ({ student }) => (
// //     <Card 
// //       className="bg-dark text-white mb-2 border-secondary"
// //       style={{ cursor: 'pointer' }}
// //       onClick={() => handleViewDetails(student)}
// //     >
// //       <Card.Body className="p-2 p-sm-3">
// //         {/* Header with basic info */}
// //         <div className="d-flex justify-content-between align-items-start mb-2">
// //           <div className="d-flex align-items-center flex-grow-1 me-2">
// //             <div 
// //               className="rounded-circle d-flex align-items-center justify-content-center me-2 flex-shrink-0"
// //               style={{ 
// //                 width: '36px', 
// //                 height: '36px', 
// //                 background: 'rgba(255,255,255,0.1)',
// //                 fontSize: '0.875rem'
// //               }}
// //             >
// //               <i className="bi bi-person-fill"></i>
// //             </div>
// //             <div className="min-w-0 flex-grow-1">
// //               <h6 className="mb-0 fw-bold text-truncate small">
// //                 {student.name || student.projectName}
// //               </h6>
// //               <small className="text-light opacity-75 text-truncate d-block" style={{fontSize: '0.7rem'}}>
// //                 {student.formId}
// //               </small>
// //             </div>
// //           </div>
// //           <span 
// //             className={`badge ${student.category === 'project' ? 'bg-warning text-dark' : 'bg-primary'} flex-shrink-0`}
// //             style={{fontSize: '0.65rem'}}
// //           >
// //             {student.category === 'project' ? 'Project' : 'Internship'}
// //           </span>
// //         </div>

// //         {/* Course/Project Info */}
// //         <div className="mb-2">
// //           <small className="text-light opacity-75 d-block" style={{fontSize: '0.7rem'}}>
// //             {student.category === 'project' ? 'Technology' : 'Technology'}:
// //           </small>
// //           <div className="fw-bold text-truncate" style={{fontSize: '0.8rem'}}>
// //             {student.category === 'project' ? student.technology : student.course}
// //           </div>
// //         </div>

// //         {/* Institute & College */}
// //         <div className="row g-1 mb-2">
// //           <Col xs={6}>
// //             <small className="text-light opacity-75 d-block" style={{fontSize: '0.7rem'}}>Institute</small>
// //             <div className="text-truncate" style={{fontSize: '0.75rem'}}>{student.institution}</div>
// //           </Col>
// //           <Col xs={6}>
// //             <small className="text-light opacity-75 d-block" style={{fontSize: '0.7rem'}}>College</small>
// //             <div className="text-truncate" style={{fontSize: '0.75rem'}}>{student.college}</div>
// //           </Col>
// //         </div>

// //         {/* Date & Mode */}
// //         <div className="row g-1 mb-2">
// //           {/* <Col xs={6}>
// //             <small className="text-light opacity-75 d-block" style={{fontSize: '0.7rem'}}>Date</small>
// //             <div style={{fontSize: '0.75rem'}}>{student.dateOfJoining}</div>
// //           </Col> */}
// //           <Col xs={6}>
// //             <small className="text-light opacity-75 d-block" style={{fontSize: '0.7rem'}}>Mode</small>
// //             <div style={{fontSize: '0.75rem'}}>{student.modeOfCourse}</div>
// //           </Col>
// //           <Col xs={6}>
// //             <small className="text-light opacity-75 d-block" style={{fontSize: '0.7rem'}}>Status</small>
// //             <div style={{fontSize: '0.75rem'}}>{student.projectStatus}</div>
// //           </Col>
// //         </div>

// //         {/* Actions */}
// //         <div className="d-flex gap-1" onClick={(e) => e.stopPropagation()}>
// //           <Button
// //             variant="outline-info"
// //             size="sm"
// //             onClick={() => handleViewDetails(student)}
// //             className="flex-fill d-flex align-items-center justify-content-center gap-1"
// //             style={{fontSize: '0.75rem', padding: '0.25rem 0.5rem'}}
// //           >
// //             <i className="bi bi-eye"></i>
// //             <span className="d-none d-xs-inline">View</span>
// //           </Button>
// //           <Button
// //             variant="outline-light"
// //             size="sm"
// //             onClick={() => handleEdit(student)}
// //             className="flex-fill d-flex align-items-center justify-content-center gap-1"
// //             style={{fontSize: '0.75rem', padding: '0.25rem 0.5rem'}}
// //           >
// //             <i className="bi bi-pencil"></i>
// //             <span className="d-none d-xs-inline">Edit</span>
// //           </Button>
// //           {/* <Button
// //             variant="outline-danger"
// //             size="sm"
// //             onClick={() => handleDelete(student.id)}
// //             className="flex-fill d-flex align-items-center justify-content-center gap-1"
// //             style={{fontSize: '0.75rem', padding: '0.25rem 0.5rem'}}
// //           >
// //             <i className="bi bi-trash"></i>
// //             <span className="d-none d-xs-inline">Delete</span>
// //           </Button> */}
// //           <Button
// //             variant="outline-danger"
// //             size="sm"
// //             onClick={() => handleCurrentStatus(student)}
// //             title="Edit"
// //             className="d-flex align-items-center justify-content-center"
// //             style={{width: '32px', height: '32px'}}
// //           >
// //             <i className="bi bi-trash"></i>
// //           </Button>
// //         </div>
// //       </Card.Body>
// //     </Card>
// //   );

// //   // Desktop Table Row with responsive improvements
// //   const DesktopTableRow = ({ student }) => (
// //     <tr 
// //       className="align-middle cursor-pointer"
// //       style={{ cursor: 'pointer' }}
// //       onClick={() => handleViewDetails(student)}
// //     >
// //       <td style={{borderColor: 'rgba(255,255,255,0.1)'}} className="d-none d-lg-table-cell">
// //         <code className="small">{student.groupNo || student.formId}</code>
// //       </td>
// //       <td style={{borderColor: 'rgba(255,255,255,0.1)'}}>
// //         <div className="d-flex align-items-center">
// //           <div 
// //             className="rounded-circle d-flex align-items-center justify-content-center me-2 me-md-3 flex-shrink-0"
// //             style={{ 
// //               width: '36px', 
// //               height: '36px', 
// //               background: 'rgba(255,255,255,0.1)',
// //               fontSize: '0.875rem'
// //             }}
// //           >
// //             <i className="bi bi-person-fill"></i>
// //           </div>
// //           <div className="min-w-0">
// //             <div className="fw-bold text-truncate small">{student.name || student.projectName}</div>
// //             <small className="text-light opacity-75 d-none d-md-block" style={{fontSize: '0.7rem'}}>
// //               {student.regNumber}
// //             </small>
// //           </div>
// //         </div>
// //       </td>
// //       <td style={{borderColor: 'rgba(255,255,255,0.1)'}} className="d-none d-xl-table-cell">
// //         <div className="text-truncate" style={{maxWidth: '150px'}}>{student.institution}</div>
// //       </td>
// //       <td style={{borderColor: 'rgba(255,255,255,0.1)'}} className="d-none d-lg-table-cell">
// //         <div className="text-truncate" style={{maxWidth: '120px'}}>{student.college}</div>
// //       </td>
// //       {/* <td style={{borderColor: 'rgba(255,255,255,0.1)'}} className="d-none d-md-table-cell">
// //         <span className="small">{student.dateOfJoining}</span>
// //       </td> */}
// //       <td style={{borderColor: 'rgba(255,255,255,0.1)'}} className="d-none d-xl-table-cell">
// //         <span className="small">{student.modeOfCourse}</span>
// //       </td>
// //       <td style={{borderColor: 'rgba(255,255,255,0.1)'}}>
// //         <div className="text-truncate small" style={{maxWidth: '120px'}}>
// //           {student.category === 'project' ? student.technology : student.course}
// //         </div>
// //       </td>
// //       <td style={{borderColor: 'rgba(255,255,255,0.1)'}} className="d-none d-sm-table-cell">
// //         <span 
// //           className={`badge ${student.category === 'project' ? 'bg-warning text-dark' : 'bg-primary'} small`}
// //         >
// //           {student.category}
// //         </span>
// //       </td>
// //       <td style={{borderColor: 'rgba(255,255,255,0.1)'}}>
// //   <span className="badge bg-secondary small">
// //     {student.projectStatus}
// //   </span>
// // </td>

// //       <td style={{borderColor: 'rgba(255,255,255,0.1)'}} onClick={(e) => e.stopPropagation()}>
// //         <div className="d-flex gap-1 flex-nowrap">
// //           <Button
// //             variant="outline-info"
// //             size="sm"
// //             onClick={() => handleViewDetails(student)}
// //             title="View Details"
// //             className="d-flex align-items-center justify-content-center"
// //             style={{width: '32px', height: '32px'}}
// //           >
// //             <i className="bi bi-eye"></i>
// //           </Button>
// //           <Button
// //             variant="outline-light"
// //             size="sm"
// //             onClick={() => handleEdit(student)}
// //             title="Edit"
// //             className="d-flex align-items-center justify-content-center"
// //             style={{width: '32px', height: '32px'}}
// //           >
// //             <i className="bi bi-pencil"></i>
// //           </Button>
// //           <Button
// //             variant="outline-danger"
// //             size="sm"
// //             onClick={() => handleCurrentStatus(student)}
// //             title="Edit"
// //             className="d-flex align-items-center justify-content-center"
// //             style={{width: '32px', height: '32px'}}
// //           >
// //             <i className="bi bi-trash"></i>
// //           </Button>
// //         </div>
// //       </td>
// //     </tr>
// //   );

// //   return (
// //     <Container fluid className="px-1 px-sm-2 px-md-3 py-2">
// //       {/* Header Section */}
// //       <Row className="mb-2 mb-md-3">
// //         <Col>
// //           <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
// //             <div className="text-center text-sm-start">
// //               <h2 className="text-white mb-1 fs-5 fs-sm-4 fs-md-3">Student Management</h2>
// //               <p className="text-light mb-0 d-none d-md-block small">Manage student records and enrollment</p>
// //             </div>
// //             <div className='d-flex gap-1 w-100 w-sm-auto justify-content-sm-end'>
// //               <Button
// //                 variant="outline-light" 
// //                 className="bg-transparent border-white text-white d-flex align-items-center"
// //                 onClick={fetchStudents}
// //                 size="sm"
// //               >
// //                 <i className="bi bi-arrow-clockwise pe-1 pe-sm-2"></i>
// //                 <span className="d-none d-sm-inline">Refresh</span>
// //               </Button>
// //               <Button 
// //                 variant="primary" 
// //                 onClick={handleAddNewStudent}
// //                 className="d-none d-sm-flex align-items-center gap-1 gap-md-2"
// //                 size="sm"
// //               >
// //                 <i className="bi bi-plus-circle"></i>
// //                 <span className="d-none d-lg-inline">Add New Student</span>
// //                 <span className="d-lg-none">Add Student</span>
// //               </Button>
// //             </div>
// //           </div>
// //         </Col>
// //       </Row>

// //       {/* Stats Cards */}
// //       <Row className="mb-2 mb-md-3 g-1 g-sm-2 g-md-3">
// //         <Col xs={6} sm={3}>
// //           <Card className="bg-dark text-white h-100" style={{border: 'none'}}>
// //             <Card.Body className="p-2 p-sm-3">
// //               <div className="d-flex justify-content-between align-items-center">
// //                 <div>
// //                   <h4 className="mb-0 fs-6 fs-sm-5 fs-md-4">{students.length}</h4>
// //                   <small className="text-light" style={{fontSize: '0.75rem'}}>Total Students</small>
// //                 </div>
// //                 <i className="bi bi-people text-primary fs-6 fs-sm-5 fs-md-4"></i>
// //               </div>
// //             </Card.Body>
// //           </Card>
// //         </Col>
// //         <Col xs={6} sm={3}>
// //           <Card className="bg-dark text-white h-100" style={{border: 'none'}}>
// //             <Card.Body className="p-2 p-sm-3">
// //               <div className="d-flex justify-content-between align-items-center">
// //                 <div>
// //                   <h4 className="mb-0 fs-6 fs-sm-5 fs-md-4">
// //                     {students.filter(s => s.category === 'project').length}
// //                   </h4>
// //                   <small className="text-light" style={{fontSize: '0.75rem'}}>Project Students</small>
// //                 </div>
// //                 <i className="bi bi-folder text-warning fs-6 fs-sm-5 fs-md-4"></i>
// //               </div>
// //             </Card.Body>
// //           </Card>
// //         </Col>
// //         <Col xs={6} sm={3}>
// //           <Card className="bg-dark text-white h-100" style={{border: 'none'}}>
// //             <Card.Body className="p-2 p-sm-3">
// //               <div className="d-flex justify-content-between align-items-center">
// //                 <div>
// //                   <h4 className="mb-0 fs-6 fs-sm-5 fs-md-4">
// //                     {students.filter(s => s.category === 'internship').length}
// //                   </h4>
// //                   <small className="text-light" style={{fontSize: '0.75rem'}}>Internship Students</small>
// //                 </div>
// //                 <i className="bi bi-briefcase text-info fs-6 fs-sm-5 fs-md-4"></i>
// //               </div>
// //             </Card.Body>
// //           </Card>
// //         </Col>
// //         <Col xs={6} sm={3}>
// //           <Card className="bg-dark text-white h-100" style={{border: 'none'}}>
// //             <Card.Body className="p-2 p-sm-3">
// //               <div className="d-flex justify-content-between align-items-center">
// //                 <div>
// //                   <h4 className="mb-0 fs-6 fs-sm-5 fs-md-4">
// //                     {new Set(students.map(s => s.college)).size}
// //                   </h4>
// //                   <small className="text-light" style={{fontSize: '0.75rem'}}>Colleges</small>
// //                 </div>
// //                 <i className="bi bi-building text-success fs-6 fs-sm-5 fs-md-4"></i>
// //               </div>
// //             </Card.Body>
// //           </Card>
// //         </Col>
// //       </Row>

// //       {/* Search and Controls */}
// //       <Row className="mb-2 mb-md-3 g-2">
// //         <Col xs={12} md={6} lg={5}>
// //           <InputGroup size="sm">
// //             <Form.Control
// //               type="text"
// //               placeholder="Search students..."
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               className="bg-dark text-white border-secondary"
// //               style={{fontSize: '0.875rem'}}
// //             />
// //             <Button 
// //               variant="outline-secondary" 
// //               className="border-secondary"
// //               size="sm"
// //             >
// //               <i className="bi bi-search"></i>
// //             </Button>
// //           </InputGroup>
// //         </Col>
// //         <Col xs={12} md={6} lg={3} xl={2}>
// //           <div className="d-flex flex-column flex-md-row gap-2 justify-content-md-end">
// //             <Form.Select 
// //               className="bg-dark text-white border-secondary" 
// //               style={{fontSize: '0.875rem'}}
// //               value={enrollmentFilter}
// //               onChange={(e) => setEnrollmentFilter(e.target.value)}
// //               size="sm"
// //             >
// //               <option value="all">All Types</option>
// //               <option value="project">Project</option>
// //               <option value="internship">Internship</option>
// //             </Form.Select>
// //           </div>
// //         </Col>
// //       </Row>

// //       {/* Students List - Mobile Card View */}
// //       <div className="d-block d-md-none">
// //         <Row>
// //           <Col>
// //             {filteredStudents.length === 0 ? (
// //               <div className="text-center py-4">
// //                 <i className="bi bi-people fs-1 text-light opacity-50"></i>
// //                 <h5 className="text-light mt-2 fs-6">No students found</h5>
// //                 <p className="text-light opacity-75 px-3 small">
// //                   {students.length === 0 
// //                     ? "Get started by adding your first student" 
// //                     : "No students match your search criteria"}
// //                 </p>
// //                 {students.length === 0 && (
// //                   <Button 
// //                     variant="primary" 
// //                     onClick={handleAddNewStudent}
// //                     size="sm"
// //                   >
// //                     Add First Student
// //                   </Button>
// //                 )}
// //               </div>
// //             ) : (
// //               <div>
// //                 {filteredStudents.map((student) => (
// //                   <MobileStudentCard key={student.id} student={student} />
// //                 ))}
// //               </div>
// //             )}
// //           </Col>
// //         </Row>
// //       </div>

// //       {/* Students Table - Desktop View */}
// //       <div className="d-none d-md-block">
// //         <Row>
// //           <Col>
// //             <Card className="bg-dark text-white" style={{border: 'none'}}>
// //               <Card.Body className="p-0">
// //                 {filteredStudents.length === 0 ? (
// //                   <div className="text-center py-4">
// //                     <i className="bi bi-people display-1 text-light opacity-50"></i>
// //                     <h5 className="text-light mt-2">No students found</h5>
// //                     <p className="text-light opacity-75 small">
// //                       {students.length === 0 
// //                         ? "Get started by adding your first student" 
// //                         : "No students match your search criteria"}
// //                     </p>
// //                     {students.length === 0 && (
// //                       <Button variant="primary" onClick={handleAddNewStudent} size="sm">
// //                         Add First Student
// //                       </Button>
// //                     )}
// //                   </div>
// //                 ) : (
// //                   <div className="table-responsive" style={{maxHeight: 'calc(100vh - 300px)', overflowY: 'auto'}}>
// //                     <Table hover variant="dark" className="mb-0" style={{border: 'none', fontSize: '0.875rem'}}>
// //                       <thead style={{position: 'sticky', top: 0, zIndex: 1, background: '#212529'}}>
// //                         <tr>
// //                           <th className="border-secondary bg-dark py-2 small d-none d-lg-table-cell">Form ID</th>
// //                           <th className="border-secondary bg-dark py-2 small">Name</th>
// //                           <th className="border-secondary bg-dark py-2 small d-none d-xl-table-cell">Institute</th>
// //                           <th className="border-secondary bg-dark py-2 small d-none d-lg-table-cell">College</th>
// //                           {/* <th className="border-secondary bg-dark py-2 small d-none d-md-table-cell">Date</th> */}
// //                           <th className="border-secondary bg-dark py-2 small d-none d-xl-table-cell">Mode</th>
// //                           <th className="border-secondary bg-dark py-2 small">Technology</th>
// //                           <th className="border-secondary bg-dark py-2 small d-none d-sm-table-cell">Type</th>
// //                           <th className="border-secondary bg-dark py-2 small d-none d-sm-table-cell">Status</th>
// //                           <th className="border-secondary bg-dark py-2 small" style={{width: '100px'}}>Actions</th>
// //                         </tr>
// //                       </thead>
// //                       <tbody>
// //                         {filteredStudents.map((student) => (
// //                           <DesktopTableRow key={student.id} student={student} />
// //                         ))}
// //                       </tbody>
// //                     </Table>
// //                   </div>
// //                 )}
// //               </Card.Body>
// //             </Card>
// //           </Col>
// //         </Row>
// //       </div>

// //       {/* Floating Action Button for Mobile */}
// //       <div className="d-md-none position-fixed bottom-0 end-0 m-2 m-sm-3" style={{zIndex: 1050}}>
// //         <Button
// //           variant="primary"
// //           onClick={handleAddNewStudent}
// //           className="rounded-circle d-flex align-items-center justify-content-center"
// //           style={{ 
// //             width: '50px', 
// //             height: '50px',
// //             boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
// //           }}
// //         >
// //           <i className="bi bi-plus fs-5"></i>
// //         </Button>
// //       </div>

// //       {/* Type Selection Modal */}
// //       <Modal 
// //         show={showTypeModal} 
// //         onHide={() => setShowTypeModal(false)}
// //         centered
// //         contentClassName="bg-dark"
// //         size="sm"
// //       >
// //         <Modal.Header closeButton closeVariant="white" className="bg-dark text-white border-secondary py-2">
// //           <Modal.Title className="fs-6">
// //             <i className="bi bi-person-plus me-2"></i>
// //             Select Enrollment Type
// //           </Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body className="bg-dark text-white text-center py-3">
// //           <div className="row g-2">
// //             <div className="col-12">
// //               <div 
// //                 className="card bg-dark border-warning h-100 cursor-pointer"
// //                 style={{ cursor: 'pointer' }}
// //                 onClick={() => handleTypeSelect('project')}
// //               >
// //                 <div className="card-body text-center py-3">
// //                   <i className="bi bi-folder text-warning fs-2"></i>
// //                   <h6 className="mt-2 mb-1">Project</h6>
// //                   <p className="text-light opacity-75 mb-0 small">Register for project work</p>
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="col-12">
// //               <div 
// //                 className="card bg-dark border-info h-100 cursor-pointer"
// //                 style={{ cursor: 'pointer' }}
// //                 onClick={() => handleTypeSelect('internship')}
// //               >
// //                 <div className="card-body text-center py-3">
// //                   <i className="bi bi-briefcase text-info fs-2"></i>
// //                   <h6 className="mt-2 mb-1">Internship</h6>
// //                   <p className="text-light opacity-75 mb-0 small">Register for internship</p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </Modal.Body>
// //       </Modal>

// //       {/* Student Form Modal */}
// //       <Modal 
// //         show={showForm} 
// //         onHide={() => {
// //           setShowForm(false);
// //           setEditingStudent(null);
// //           setSelectedType('');
// //         }}
// //         size="lg"
// //         centered
// //         contentClassName="bg-dark"
// //         scrollable
// //       >
// //         <Modal.Header closeButton closeVariant="white" className="bg-dark text-white border-secondary py-2">
// //           <Modal.Title className="fs-6">
// //             <i className="bi bi-person-plus me-2"></i>
// //             {editingStudent ? 'Edit Student' : `Add New ${selectedType === 'project' ? 'Project' : 'Internship'} Student`}
// //           </Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body className="bg-dark text-white p-0" style={{maxHeight: '80vh'}}>
// //           {selectedType === 'project' ? (
// //             <ProjectForm
// //               student={editingStudent}
// //               onSave={handleAddStudent}
// //               onCancel={() => {
// //                 setShowForm(false);
// //                 setEditingStudent(null);
// //                 setSelectedType('');
// //               }}
// //             />
// //           ) : (
// //             <InternshipForm
// //               student={editingStudent}
// //               onSave={handleAddStudent}
// //               onCancel={() => {
// //                 setShowForm(false);
// //                 setEditingStudent(null);
// //                 setSelectedType('');
// //               }}
// //             />
// //           )}
// //         </Modal.Body>
// //       </Modal>


// //       <Modal 
// //   show={showStatusModal} 
// //   onHide={() => setShowStatusModal(false)}
// //   centered
// //   contentClassName="bg-dark text-white"
// //   size="sm"
// // >
// //   <Modal.Header closeButton closeVariant="white" className="border-secondary py-2">
// //     <Modal.Title className="fs-6">
// //       <i className="bi bi-gear me-2"></i>
// //       Change Project Status
// //     </Modal.Title>
// //   </Modal.Header>
// //   {/* <Modal.Body className="bg-dark text-white text-center">
// //     <Form.Select
// //   className="bg-dark text-white border-secondary mb-3"
// //   value={newStatus}
// //   onChange={(e) => setNewStatus(e.target.value)}
// // >
// //   <option value="notstarted" disabled>Not Started</option>
// //   <option value="dropped">Dropped</option>
// // </Form.Select>


// //     <div className="d-flex justify-content-center gap-2">
// //       <Button 
// //         variant="secondary" 
// //         size="sm" 
// //         onClick={() => setShowStatusModal(false)}
// //       >
// //         Cancel
// //       </Button>
// //       <Button 
// //         variant="primary" 
// //         size="sm" 
// //         onClick={handleSaveStatus}
// //       >
// //         Save
// //       </Button>
// //     </div>
// //   </Modal.Body> */}
// //   <Modal.Body className="bg-dark text-white text-center">
// //   <p>Are you sure you want to mark this project as <strong>Dropped</strong>?</p>
// //   <div className="d-flex justify-content-center gap-2">
// //     <Button variant="secondary" size="sm" onClick={() => setShowStatusModal(false)}>
// //       Cancel
// //     </Button>
// //     <Button variant="danger" size="sm" onClick={handleSaveStatus}>
// //       Confirm Drop
// //     </Button>
// //   </div>
// // </Modal.Body>

// // </Modal>

// //     </Container>
// //   );
// // };

// // export default TLStudent;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container, Row, Col, Card, Button, Table, Form, InputGroup, Modal, Dropdown } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import ProjectForm from '../admin/ProjectForm';
// import InternshipForm from '../admin/InternshipForm';
// import api from '../../api';
// // import ProjectForm from './ProjectForm';
// // import InternshipForm from './InternshipForm';
// // import api from '../../api';

// const TLStudent = () => {
//   const [students, setStudents] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [showTypeModal, setShowTypeModal] = useState(false);
//   const [selectedType, setSelectedType] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [editingStudent, setEditingStudent] = useState(null);
//   const [enrollmentFilter, setEnrollmentFilter] = useState('all');
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [newStatus, setNewStatus] = useState('notstarted');
  
//   // New states for staff assignment
//   const [showStaffModal, setShowStaffModal] = useState(false);
//   const [staffList, setStaffList] = useState([]);
//   const [selectedStaff, setSelectedStaff] = useState([]);
//   const [currentStudentForStaff, setCurrentStudentForStaff] = useState(null);
//   const [staffSearchTerm, setStaffSearchTerm] = useState('');

//   // Get user role (you might need to adjust this based on your auth system)
//   const [userRole, setUserRole] = useState('');
  
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchStudents();
//     fetchStaff(); // Fetch staff when component mounts
//     // Get user role from localStorage or context
//     const role = localStorage.getItem('userRole') || 'staff'; // Adjust based on your auth
//     setUserRole(role);
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const response = await api.get('/registrations')
//       setStudents(response.data.data);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//     }
//   };

//   const fetchStaff = async () => {
//     try {
//       const staffRes = await api.get('/staff/all');
//       setStaffList(staffRes.data.staff || []);
//     } catch (error) {
//       console.error('Error fetching staff:', error);
//     }
//   };

//   // Filter staff based on search term
//   const filteredStaff = staffList.filter(staff => 
//     staff.name?.toLowerCase().includes(staffSearchTerm.toLowerCase())
//   );

//   // Staff assignment functions
//   const assignstaff = (student) => {
//     setCurrentStudentForStaff(student);
//     setSelectedStaff([]); // Reset selected staff when opening modal
//     setStaffSearchTerm(''); // Reset search term
//     setShowStaffModal(true);
//   };

//   const handleStaffSelection = (staffId) => {
//     setSelectedStaff(prev => {
//       if (prev.includes(staffId)) {
//         return prev.filter(id => id !== staffId);
//       } else {
//         return [...prev, staffId];
//       }
//     });
//   };

//   const handleAssignStaff = async () => {
//     if (!currentStudentForStaff || selectedStaff.length === 0) {
//       alert('Please select at least one staff member');
//       return;
//     }

//     try {
//       // Prepare the data for the API call
//       const assignmentData = {
//         studentId: currentStudentForStaff._id,
//         staffIds: selectedStaff
//       };

//       // Make API call to assign staff (you'll need to create this endpoint)
//       const response = await api.post('/registrations/assign-staff', assignmentData);
      
//       console.log('Staff assigned successfully:', response.data);
//       alert('Staff assigned successfully!');
      
//       // Close modal and reset states
//       setShowStaffModal(false);
//       setSelectedStaff([]);
//       setCurrentStudentForStaff(null);
//       setStaffSearchTerm('');
      
//       // Refresh students data if needed
//       fetchStudents();
      
//     } catch (error) {
//       console.error('Error assigning staff:', error);
//       alert('Error assigning staff. Please try again.');
//     }
//   };

//   // Filter students based on search and enrollment type
//   const filteredStudents = students.filter(student => {
//     const matchesSearch = 
//       student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       student.college?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       student.institution?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       student.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       student.technology?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       student.modeOfCourse?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       student.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       student.formId?.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesEnrollment = 
//       enrollmentFilter === 'all' || 
//       student.category === enrollmentFilter;

//     return matchesSearch && matchesEnrollment;
//   });

//   const handleAddStudent = async (studentData) => {
//     if (editingStudent) {
//       setStudents(students.map(s => 
//         s.id === editingStudent.id ? { ...studentData, id: editingStudent.id } : s
//       ));
//     } else {
//       const newStudent = {
//         ...studentData,
//         id: Date.now().toString(),
//         category: selectedType,
//         name: selectedType === 'project' ? studentData.groupMembers?.[0]?.name : studentData.name
//       };
//       setStudents([...students, newStudent]);
//     }
//     setShowForm(false);
//     setShowTypeModal(false);
//     setEditingStudent(null);
//     setSelectedType('');
//     await fetchStudents();
//   };

//   const handleEdit = (student) => {
//     setEditingStudent(student);
//     setSelectedType(student.category);
//     setShowForm(true);
//   };

//   const handleDelete = (id) => {
//     setStudents(students.filter(s => s.id !== id));
//   };

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

//   const handleCurrentStatus = (student) => {
//     setSelectedStudent(student);
//     setNewStatus(student.projectStatus);
//     setShowStatusModal(true);
//   }; 

//   const handleSaveStatus = async () => {
//     if (!selectedStudent) return;

//     const studentId = selectedStudent._id;
//     const newStatus = "dropped";
//     console.log(newStatus);

//     try {
//       const response = await api.put(`/registrations/${studentId}/projectstatus`, { status: newStatus });
//       console.log(response,"updated statusssssssssssssssssssssssss");
      
//       alert("Status updated Successfully!!")
//       setShowStatusModal(false);
//       setSelectedStudent(null);
//       fetchStudents();
//     } catch (error) {
//       alert("Status updation failed!!")
//       console.error("Error updating status:", error);
//     }
//   };

//   // Check if user is teamlead (you can adjust the role name as needed)
//   const isTeamLead = userRole === 'teamlead';

//   // Mobile Card View - Enhanced for very small screens
//   const MobileStudentCard = ({ student }) => (
//     <Card 
//       className="bg-dark text-white mb-2 border-secondary"
//       style={{ cursor: 'pointer' }}
//       onClick={() => handleViewDetails(student)}
//     >
//       <Card.Body className="p-2 p-sm-3">
//         {/* Header with basic info */}
//         <div className="d-flex justify-content-between align-items-start mb-2">
//           <div className="d-flex align-items-center flex-grow-1 me-2">
//             <div 
//               className="rounded-circle d-flex align-items-center justify-content-center me-2 flex-shrink-0"
//               style={{ 
//                 width: '36px', 
//                 height: '36px', 
//                 background: 'rgba(255,255,255,0.1)',
//                 fontSize: '0.875rem'
//               }}
//             >
//               <i className="bi bi-person-fill"></i>
//             </div>
//             <div className="min-w-0 flex-grow-1">
//               <h6 className="mb-0 fw-bold text-truncate small">
//                 {student.name || student.projectName}
//               </h6>
//               <small className="text-light opacity-75 text-truncate d-block" style={{fontSize: '0.7rem'}}>
//                 {student.formId}
//               </small>
//             </div>
//           </div>
//           <span 
//             className={`badge ${student.category === 'project' ? 'bg-warning text-dark' : 'bg-primary'} flex-shrink-0`}
//             style={{fontSize: '0.65rem'}}
//           >
//             {student.category === 'project' ? 'Project' : 'Internship'}
//           </span>
//         </div>

//         {/* Course/Project Info */}
//         <div className="mb-2">
//           <small className="text-light opacity-75 d-block" style={{fontSize: '0.7rem'}}>
//             {student.category === 'project' ? 'Technology' : 'Technology'}:
//           </small>
//           <div className="fw-bold text-truncate" style={{fontSize: '0.8rem'}}>
//             {student.category === 'project' ? student.technology : student.course}
//           </div>
//         </div>

//         {/* Institute & College */}
//         <div className="row g-1 mb-2">
//           <Col xs={6}>
//             <small className="text-light opacity-75 d-block" style={{fontSize: '0.7rem'}}>Institute</small>
//             <div className="text-truncate" style={{fontSize: '0.75rem'}}>{student.institution}</div>
//           </Col>
//           <Col xs={6}>
//             <small className="text-light opacity-75 d-block" style={{fontSize: '0.7rem'}}>College</small>
//             <div className="text-truncate" style={{fontSize: '0.75rem'}}>{student.college}</div>
//           </Col>
//         </div>

//         {/* Date & Mode */}
//         <div className="row g-1 mb-2">
//           <Col xs={6}>
//             <small className="text-light opacity-75 d-block" style={{fontSize: '0.7rem'}}>Mode</small>
//             <div style={{fontSize: '0.75rem'}}>{student.modeOfCourse}</div>
//           </Col>
//           <Col xs={6}>
//             <small className="text-light opacity-75 d-block" style={{fontSize: '0.7rem'}}>Status</small>
//             <div style={{fontSize: '0.75rem'}}>{student.projectStatus}</div>
//           </Col>
//         </div>

//         {/* Actions */}
//         <div className="d-flex gap-1" onClick={(e) => e.stopPropagation()}>
//           <Button
//             variant="outline-info"
//             size="sm"
//             onClick={() => handleViewDetails(student)}
//             className="flex-fill d-flex align-items-center justify-content-center gap-1"
//             style={{fontSize: '0.75rem', padding: '0.25rem 0.5rem'}}
//           >
//             <i className="bi bi-eye"></i>
//             <span className="d-none d-xs-inline">View</span>
//           </Button>
//           <Button
//             variant="outline-light"
//             size="sm"
//             onClick={() => handleEdit(student)}
//             className="flex-fill d-flex align-items-center justify-content-center gap-1"
//             style={{fontSize: '0.75rem', padding: '0.25rem 0.5rem'}}
//           >
//             <i className="bi bi-pencil"></i>
//             <span className="d-none d-xs-inline">Edit</span>
//           </Button>
//           {/* Conditionally render Assign Staff button for teamlead only */}
//           {isTeamLead && (
//             <Button
//               variant="outline-warning"
//               size="sm"
//               onClick={() => assignstaff(student)}
//               className="flex-fill d-flex align-items-center justify-content-center gap-1"
//               style={{fontSize: '0.75rem', padding: '0.25rem 0.5rem'}}
//             >
//               <i className="bi bi-person-plus"></i>
//               <span className="d-none d-xs-inline">Assign</span>
//             </Button>
//           )}
//           <Button
//             variant="outline-danger"
//             size="sm"
//             onClick={() => handleCurrentStatus(student)}
//             title="Drop Project"
//             className="d-flex align-items-center justify-content-center"
//             style={{width: '32px', height: '32px'}}
//           >
//             <i className="bi bi-trash"></i>
//           </Button>
//         </div>
//       </Card.Body>
//     </Card>
//   );

//   // Desktop Table Row with responsive improvements
//   const DesktopTableRow = ({ student }) => (
//     <tr 
//       className="align-middle cursor-pointer"
//       style={{ cursor: 'pointer' }}
//       onClick={() => handleViewDetails(student)}
//     >
//       <td style={{borderColor: 'rgba(255,255,255,0.1)'}} className="d-none d-lg-table-cell">
//         <code className="small">{student.groupNo || student.formId}</code>
//       </td>
//       <td style={{borderColor: 'rgba(255,255,255,0.1)'}}>
//         <div className="d-flex align-items-center">
//           <div 
//             className="rounded-circle d-flex align-items-center justify-content-center me-2 me-md-3 flex-shrink-0"
//             style={{ 
//               width: '36px', 
//               height: '36px', 
//               background: 'rgba(255,255,255,0.1)',
//               fontSize: '0.875rem'
//             }}
//           >
//             <i className="bi bi-person-fill"></i>
//           </div>
//           <div className="min-w-0">
//             <div className="fw-bold text-truncate small">{student.name || student.projectName}</div>
//             <small className="text-light opacity-75 d-none d-md-block" style={{fontSize: '0.7rem'}}>
//               {student.regNumber}
//             </small>
//           </div>
//         </div>
//       </td>
//       <td style={{borderColor: 'rgba(255,255,255,0.1)'}} className="d-none d-xl-table-cell">
//         <div className="text-truncate" style={{maxWidth: '150px'}}>{student.institution}</div>
//       </td>
//       <td style={{borderColor: 'rgba(255,255,255,0.1)'}} className="d-none d-lg-table-cell">
//         <div className="text-truncate" style={{maxWidth: '120px'}}>{student.college}</div>
//       </td>
//       <td style={{borderColor: 'rgba(255,255,255,0.1)'}} className="d-none d-xl-table-cell">
//         <span className="small">{student.modeOfCourse}</span>
//       </td>
//       <td style={{borderColor: 'rgba(255,255,255,0.1)'}}>
//         <div className="text-truncate small" style={{maxWidth: '120px'}}>
//           {student.category === 'project' ? student.technology : student.course}
//         </div>
//       </td>
//       <td style={{borderColor: 'rgba(255,255,255,0.1)'}} className="d-none d-sm-table-cell">
//         <span 
//           className={`badge ${student.category === 'project' ? 'bg-warning text-dark' : 'bg-primary'} small`}
//         >
//           {student.category}
//         </span>
//       </td>
//       <td style={{borderColor: 'rgba(255,255,255,0.1)'}}>
//         <span className="badge bg-secondary small">
//           {student.projectStatus}
//         </span>
//       </td>

//       <td style={{borderColor: 'rgba(255,255,255,0.1)'}} onClick={(e) => e.stopPropagation()}>
//         <div className="d-flex gap-1 flex-nowrap">
//           <Button
//             variant="outline-info"
//             size="sm"
//             onClick={() => handleViewDetails(student)}
//             title="View Details"
//             className="d-flex align-items-center justify-content-center"
//             style={{width: '32px', height: '32px'}}
//           >
//             <i className="bi bi-eye"></i>
//           </Button>
//           <Button
//             variant="outline-light"
//             size="sm"
//             onClick={() => handleEdit(student)}
//             title="Edit"
//             className="d-flex align-items-center justify-content-center"
//             style={{width: '32px', height: '32px'}}
//           >
//             <i className="bi bi-pencil"></i>
//           </Button>
//           {/* Conditionally render Assign Staff button for teamlead only */}
//           {isTeamLead && (
//             <Button
//               variant="outline-warning"
//               size="sm"
//               onClick={() => assignstaff(student)}
//               title="Assign Staff"
//               className="d-flex align-items-center justify-content-center"
//               style={{width: '32px', height: '32px'}}
//             >
//               <i className="bi bi-person-plus"></i>
//             </Button>
//           )}
//           <Button
//             variant="outline-danger"
//             size="sm"
//             onClick={() => handleCurrentStatus(student)}
//             title="Drop Project"
//             className="d-flex align-items-center justify-content-center"
//             style={{width: '32px', height: '32px'}}
//           >
//             <i className="bi bi-trash"></i>
//           </Button>
//         </div>
//       </td>
//     </tr>
//   );

//   return (
//     <Container fluid className="px-1 px-sm-2 px-md-3 py-2">
//       {/* Header Section */}
//       <Row className="mb-2 mb-md-3">
//         <Col>
//           <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
//             <div className="text-center text-sm-start">
//               <h2 className="text-white mb-1 fs-5 fs-sm-4 fs-md-3">Student Management</h2>
//               <p className="text-light mb-0 d-none d-md-block small">Manage student records and enrollment</p>
//             </div>
//             <div className='d-flex gap-1 w-100 w-sm-auto justify-content-sm-end'>
//               <Button
//                 variant="outline-light" 
//                 className="bg-transparent border-white text-white d-flex align-items-center"
//                 onClick={fetchStudents}
//                 size="sm"
//               >
//                 <i className="bi bi-arrow-clockwise pe-1 pe-sm-2"></i>
//                 <span className="d-none d-sm-inline">Refresh</span>
//               </Button>
//               <Button 
//                 variant="primary" 
//                 onClick={handleAddNewStudent}
//                 className="d-none d-sm-flex align-items-center gap-1 gap-md-2"
//                 size="sm"
//               >
//                 <i className="bi bi-plus-circle"></i>
//                 <span className="d-none d-lg-inline">Add New Student</span>
//                 <span className="d-lg-none">Add Student</span>
//               </Button>
//             </div>
//           </div>
//         </Col>
//       </Row>

//       {/* Stats Cards */}
//       <Row className="mb-2 mb-md-3 g-1 g-sm-2 g-md-3">
//         <Col xs={6} sm={3}>
//           <Card className="bg-dark text-white h-100" style={{border: 'none'}}>
//             <Card.Body className="p-2 p-sm-3">
//               <div className="d-flex justify-content-between align-items-center">
//                 <div>
//                   <h4 className="mb-0 fs-6 fs-sm-5 fs-md-4">{students.length}</h4>
//                   <small className="text-light" style={{fontSize: '0.75rem'}}>Total Students</small>
//                 </div>
//                 <i className="bi bi-people text-primary fs-6 fs-sm-5 fs-md-4"></i>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col xs={6} sm={3}>
//           <Card className="bg-dark text-white h-100" style={{border: 'none'}}>
//             <Card.Body className="p-2 p-sm-3">
//               <div className="d-flex justify-content-between align-items-center">
//                 <div>
//                   <h4 className="mb-0 fs-6 fs-sm-5 fs-md-4">
//                     {students.filter(s => s.category === 'project').length}
//                   </h4>
//                   <small className="text-light" style={{fontSize: '0.75rem'}}>Project Students</small>
//                 </div>
//                 <i className="bi bi-folder text-warning fs-6 fs-sm-5 fs-md-4"></i>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col xs={6} sm={3}>
//           <Card className="bg-dark text-white h-100" style={{border: 'none'}}>
//             <Card.Body className="p-2 p-sm-3">
//               <div className="d-flex justify-content-between align-items-center">
//                 <div>
//                   <h4 className="mb-0 fs-6 fs-sm-5 fs-md-4">
//                     {students.filter(s => s.category === 'internship').length}
//                   </h4>
//                   <small className="text-light" style={{fontSize: '0.75rem'}}>Internship Students</small>
//                 </div>
//                 <i className="bi bi-briefcase text-info fs-6 fs-sm-5 fs-md-4"></i>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col xs={6} sm={3}>
//           <Card className="bg-dark text-white h-100" style={{border: 'none'}}>
//             <Card.Body className="p-2 p-sm-3">
//               <div className="d-flex justify-content-between align-items-center">
//                 <div>
//                   <h4 className="mb-0 fs-6 fs-sm-5 fs-md-4">
//                     {new Set(students.map(s => s.college)).size}
//                   </h4>
//                   <small className="text-light" style={{fontSize: '0.75rem'}}>Colleges</small>
//                 </div>
//                 <i className="bi bi-building text-success fs-6 fs-sm-5 fs-md-4"></i>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Search and Controls */}
//       <Row className="mb-2 mb-md-3 g-2">
//         <Col xs={12} md={6} lg={5}>
//           <InputGroup size="sm">
//             <Form.Control
//               type="text"
//               placeholder="Search students..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="bg-dark text-white border-secondary"
//               style={{fontSize: '0.875rem'}}
//             />
//             <Button 
//               variant="outline-secondary" 
//               className="border-secondary"
//               size="sm"
//             >
//               <i className="bi bi-search"></i>
//             </Button>
//           </InputGroup>
//         </Col>
//         <Col xs={12} md={6} lg={3} xl={2}>
//           <div className="d-flex flex-column flex-md-row gap-2 justify-content-md-end">
//             <Form.Select 
//               className="bg-dark text-white border-secondary" 
//               style={{fontSize: '0.875rem'}}
//               value={enrollmentFilter}
//               onChange={(e) => setEnrollmentFilter(e.target.value)}
//               size="sm"
//             >
//               <option value="all">All Types</option>
//               <option value="project">Project</option>
//               <option value="internship">Internship</option>
//             </Form.Select>
//           </div>
//         </Col>
//       </Row>

//       {/* Students List - Mobile Card View */}
//       <div className="d-block d-md-none">
//         <Row>
//           <Col>
//             {filteredStudents.length === 0 ? (
//               <div className="text-center py-4">
//                 <i className="bi bi-people fs-1 text-light opacity-50"></i>
//                 <h5 className="text-light mt-2 fs-6">No students found</h5>
//                 <p className="text-light opacity-75 px-3 small">
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
//                   <div className="text-center py-4">
//                     <i className="bi bi-people display-1 text-light opacity-50"></i>
//                     <h5 className="text-light mt-2">No students found</h5>
//                     <p className="text-light opacity-75 small">
//                       {students.length === 0 
//                         ? "Get started by adding your first student" 
//                         : "No students match your search criteria"}
//                     </p>
//                     {students.length === 0 && (
//                       <Button variant="primary" onClick={handleAddNewStudent} size="sm">
//                         Add First Student
//                       </Button>
//                     )}
//                   </div>
//                 ) : (
//                   <div className="table-responsive" style={{maxHeight: 'calc(100vh - 300px)', overflowY: 'auto'}}>
//                     <Table hover variant="dark" className="mb-0" style={{border: 'none', fontSize: '0.875rem'}}>
//                       <thead style={{position: 'sticky', top: 0, zIndex: 1, background: '#212529'}}>
//                         <tr>
//                           <th className="border-secondary bg-dark py-2 small d-none d-lg-table-cell">Form ID</th>
//                           <th className="border-secondary bg-dark py-2 small">Name</th>
//                           <th className="border-secondary bg-dark py-2 small d-none d-xl-table-cell">Institute</th>
//                           <th className="border-secondary bg-dark py-2 small d-none d-lg-table-cell">College</th>
//                           <th className="border-secondary bg-dark py-2 small d-none d-xl-table-cell">Mode</th>
//                           <th className="border-secondary bg-dark py-2 small">Technology</th>
//                           <th className="border-secondary bg-dark py-2 small d-none d-sm-table-cell">Type</th>
//                           <th className="border-secondary bg-dark py-2 small d-none d-sm-table-cell">Status</th>
//                           <th className="border-secondary bg-dark py-2 small" style={{width: '100px'}}>Actions</th>
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
//       <div className="d-md-none position-fixed bottom-0 end-0 m-2 m-sm-3" style={{zIndex: 1050}}>
//         <Button
//           variant="primary"
//           onClick={handleAddNewStudent}
//           className="rounded-circle d-flex align-items-center justify-content-center"
//           style={{ 
//             width: '50px', 
//             height: '50px',
//             boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
//           }}
//         >
//           <i className="bi bi-plus fs-5"></i>
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
//         <Modal.Header closeButton closeVariant="white" className="bg-dark text-white border-secondary py-2">
//           <Modal.Title className="fs-6">
//             <i className="bi bi-person-plus me-2"></i>
//             Select Enrollment Type
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="bg-dark text-white text-center py-3">
//           <div className="row g-2">
//             <div className="col-12">
//               <div 
//                 className="card bg-dark border-warning h-100 cursor-pointer"
//                 style={{ cursor: 'pointer' }}
//                 onClick={() => handleTypeSelect('project')}
//               >
//                 <div className="card-body text-center py-3">
//                   <i className="bi bi-folder text-warning fs-2"></i>
//                   <h6 className="mt-2 mb-1">Project</h6>
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
//                 <div className="card-body text-center py-3">
//                   <i className="bi bi-briefcase text-info fs-2"></i>
//                   <h6 className="mt-2 mb-1">Internship</h6>
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
//         <Modal.Header closeButton closeVariant="white" className="bg-dark text-white border-secondary py-2">
//           <Modal.Title className="fs-6">
//             <i className="bi bi-person-plus me-2"></i>
//             {editingStudent ? 'Edit Student' : `Add New ${selectedType === 'project' ? 'Project' : 'Internship'} Student`}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="bg-dark text-white p-0" style={{maxHeight: '80vh'}}>
//           {selectedType === 'project' ? (
//             <ProjectForm
//               student={editingStudent}
//               onSave={handleAddStudent}
//               onCancel={() => {
//                 setShowForm(false);
//                 setEditingStudent(null);
//                 setSelectedType('');
//               }}
//             />
//           ) : (
//             <InternshipForm
//               student={editingStudent}
//               onSave={handleAddStudent}
//               onCancel={() => {
//                 setShowForm(false);
//                 setEditingStudent(null);
//                 setSelectedType('');
//               }}
//             />
//           )}
//         </Modal.Body>
//       </Modal>

//       {/* Status Change Modal */}
//       <Modal 
//         show={showStatusModal} 
//         onHide={() => setShowStatusModal(false)}
//         centered
//         contentClassName="bg-dark text-white"
//         size="sm"
//       >
//         <Modal.Header closeButton closeVariant="white" className="border-secondary py-2">
//           <Modal.Title className="fs-6">
//             <i className="bi bi-gear me-2"></i>
//             Change Project Status
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="bg-dark text-white text-center">
//           <p>Are you sure you want to mark this project as <strong>Dropped</strong>?</p>
//           <div className="d-flex justify-content-center gap-2">
//             <Button variant="secondary" size="sm" onClick={() => setShowStatusModal(false)}>
//               Cancel
//             </Button>
//             <Button variant="danger" size="sm" onClick={handleSaveStatus}>
//               Confirm Drop
//             </Button>
//           </div>
//         </Modal.Body>
//       </Modal>

//       {/* Staff Assignment Modal */}
//       <Modal 
//         show={showStaffModal} 
//         onHide={() => setShowStaffModal(false)}
//         centered
//         contentClassName="bg-dark text-white"
//         size="lg"
//       >
//         <Modal.Header closeButton closeVariant="white" className="border-secondary py-2">
//           <Modal.Title className="fs-6">
//             <i className="bi bi-person-plus me-2"></i>
//             Assign Staff to {currentStudentForStaff?.name}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="bg-dark text-white">
//           <div className="mb-3">
//             <p className="mb-2">
//               <strong>Student:</strong> {currentStudentForStaff?.name} ({currentStudentForStaff?.formId})
//             </p>
//             <p className="mb-3 text-light opacity-75">
//               Select one or more staff members to assign to this student:
//             </p>
//           </div>
          
//           {/* Staff Search Input */}
//           <div className="mb-3">
//             <InputGroup size="sm">
//               <Form.Control
//                 type="text"
//                 placeholder="Search staff by name..."
//                 value={staffSearchTerm}
//                 onChange={(e) => setStaffSearchTerm(e.target.value)}
//                 className="bg-dark text-white border-secondary"
//               />
//               <Button 
//                 variant="outline-secondary" 
//                 className="border-secondary"
//                 size="sm"
//               >
//                 <i className="bi bi-search"></i>
//               </Button>
//             </InputGroup>
//           </div>
          
//           <div className="staff-list" style={{maxHeight: '400px', overflowY: 'auto'}}>
//             {filteredStaff.length === 0 ? (
//               <div className="text-center py-4">
//                 <i className="bi bi-people fs-1 text-light opacity-50"></i>
//                 <p className="text-light mt-2">
//                   {staffSearchTerm ? 'No staff members match your search' : 'No staff members found'}
//                 </p>
//               </div>
//             ) : (
//               <Row>
//                 {filteredStaff.map((staff) => (
//                   <Col xs={12} sm={6} key={staff._id} className="mb-2">
//                     <div 
//                       className={`p-3 border rounded cursor-pointer ${
//                         selectedStaff.includes(staff._id) 
//                           ? 'border-primary bg-primary bg-opacity-10' 
//                           : 'border-secondary bg-dark'
//                       }`}
//                       style={{ cursor: 'pointer' }}
//                       onClick={() => handleStaffSelection(staff._id)}
//                     >
//                       <div className="d-flex align-items-center">
//                         <Form.Check
//                           type="checkbox"
//                           checked={selectedStaff.includes(staff._id)}
//                           onChange={() => handleStaffSelection(staff._id)}
//                           className="me-3"
//                         />
//                         <div>
//                           <h6 className="mb-1">{staff.name}</h6>
//                           <small className="text-light opacity-75">
//                             {staff.employeeId} • {staff.email}
//                           </small>
//                         </div>
//                       </div>
//                     </div>
//                   </Col>
//                 ))}
//               </Row>
//             )}
//           </div>
          
//           {selectedStaff.length > 0 && (
//             <div className="mt-3 p-3 bg-secondary bg-opacity-25 rounded">
//               <strong>Selected Staff ({selectedStaff.length}):</strong>
//               <div className="mt-1">
//                 {staffList
//                   .filter(staff => selectedStaff.includes(staff._id))
//                   .map(staff => (
//                     <span key={staff._id} className="badge bg-primary me-1">
//                       {staff.name}
//                     </span>
//                   ))
//                 }
//               </div>
//             </div>
//           )}
//         </Modal.Body>
//         <Modal.Footer className="border-secondary">
//           <Button variant="secondary" size="sm" onClick={() => setShowStaffModal(false)}>
//             Cancel
//           </Button>
//           <Button 
//             variant="primary" 
//             size="sm" 
//             onClick={handleAssignStaff}
//             disabled={selectedStaff.length === 0}
//           >
//             Assign Selected Staff ({selectedStaff.length})
//           </Button>
//         </Modal.Footer>
//       </Modal>

//     </Container>
//   );
// };

// export default TLStudent;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Table, Form, InputGroup, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const Adminstudent = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [enrollmentFilter, setEnrollmentFilter] = useState('all');
  
  // States for staff assignment
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [currentStudentForStaff, setCurrentStudentForStaff] = useState(null);
  const [staffSearchTerm, setStaffSearchTerm] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
    fetchStaff();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await api.get('/registrations')
      setStudents(response.data.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchStaff = async () => {
    try {
      const staffRes = await api.get('/staff/all');
      setStaffList(staffRes.data.staff || []);
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  // Filter staff based on search term
  const filteredStaff = staffList.filter(staff => 
    staff.name?.toLowerCase().includes(staffSearchTerm.toLowerCase())
  );

  // Staff assignment functions
  const assignstaff = (student) => {
    setCurrentStudentForStaff(student);
    setSelectedStaff([]);
    setStaffSearchTerm('');
    setShowStaffModal(true);
  };

  const handleStaffSelection = (staffId) => {
    setSelectedStaff(prev => {
      if (prev.includes(staffId)) {
        return prev.filter(id => id !== staffId);
      } else {
        return [...prev, staffId];
      }
    });
  };

  const handleAssignStaff = async () => {
    if (!currentStudentForStaff || selectedStaff.length === 0) {
      alert('Please select at least one staff member');
      return;
    }

    try {
      const assignmentData = {
        studentId: currentStudentForStaff._id,
        staffIds: selectedStaff
      };

      const response = await api.post('/registrations/assign-staff', assignmentData);
      
      console.log('Staff assigned successfully:', response.data);
      alert('Staff assigned successfully!');
      
      setShowStaffModal(false);
      setSelectedStaff([]);
      setCurrentStudentForStaff(null);
      setStaffSearchTerm('');
      
      fetchStudents();
      
    } catch (error) {
      console.error('Error assigning staff:', error);
      alert('Error assigning staff. Please try again.');
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
      student.modeOfCourse?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.formId?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesEnrollment = 
      enrollmentFilter === 'all' || 
      student.category === enrollmentFilter;

    return matchesSearch && matchesEnrollment;
  });

  const handleViewDetails = (student) => {
    navigate('/student-details', { state: { student } });
  };

  // Mobile Card View
  const MobileStudentCard = ({ student }) => (
    <Card 
      className="bg-dark text-white mb-2 border-secondary"
      style={{ cursor: 'pointer' }}
      onClick={() => handleViewDetails(student)}
    >
      <Card.Body className="p-2 p-sm-3">
        {/* Header with basic info */}
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div className="d-flex align-items-center flex-grow-1 me-2">
            <div 
              className="rounded-circle d-flex align-items-center justify-content-center me-2 flex-shrink-0"
              style={{ 
                width: '36px', 
                height: '36px', 
                background: 'rgba(255,255,255,0.1)',
                fontSize: '0.875rem'
              }}
            >
              <i className="bi bi-person-fill"></i>
            </div>
            <div className="min-w-0 flex-grow-1">
              <h6 className="mb-0 fw-bold text-truncate small">
                {student.name || student.projectName}
              </h6>
              <small className="text-light opacity-75 text-truncate d-block" style={{fontSize: '0.7rem'}}>
                {student.formId}
              </small>
            </div>
          </div>
          <span 
            className={`badge ${student.category === 'project' ? 'bg-warning text-dark' : 'bg-primary'} flex-shrink-0`}
            style={{fontSize: '0.65rem'}}
          >
            {student.category === 'project' ? 'Project' : 'Internship'}
          </span>
        </div>

        {/* Course/Project Info */}
        <div className="mb-2">
          <small className="text-light opacity-75 d-block" style={{fontSize: '0.7rem'}}>
            {student.category === 'project' ? 'Technology' : 'Technology'}:
          </small>
          <div className="fw-bold text-truncate" style={{fontSize: '0.8rem'}}>
            {student.category === 'project' ? student.technology : student.course}
          </div>
        </div>

        {/* Institute & College */}
        <div className="row g-1 mb-2">
          <Col xs={6}>
            <small className="text-light opacity-75 d-block" style={{fontSize: '0.7rem'}}>Institute</small>
            <div className="text-truncate" style={{fontSize: '0.75rem'}}>{student.institution}</div>
          </Col>
          <Col xs={6}>
            <small className="text-light opacity-75 d-block" style={{fontSize: '0.7rem'}}>College</small>
            <div className="text-truncate" style={{fontSize: '0.75rem'}}>{student.college}</div>
          </Col>
        </div>

        {/* Date & Mode */}
        <div className="row g-1 mb-2">
          <Col xs={6}>
            <small className="text-light opacity-75 d-block" style={{fontSize: '0.7rem'}}>Mode</small>
            <div style={{fontSize: '0.75rem'}}>{student.modeOfCourse}</div>
          </Col>
          <Col xs={6}>
            <small className="text-light opacity-75 d-block" style={{fontSize: '0.7rem'}}>Status</small>
            <div style={{fontSize: '0.75rem'}}>{student.projectStatus}</div>
          </Col>
        </div>

        {/* Actions - Only View and Assign */}
        <div className="d-flex gap-1" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="outline-info"
            size="sm"
            onClick={() => handleViewDetails(student)}
            className="flex-fill d-flex align-items-center justify-content-center gap-1"
            style={{fontSize: '0.75rem', padding: '0.25rem 0.5rem'}}
          >
            <i className="bi bi-eye"></i>
            <span className="d-none d-xs-inline">View</span>
          </Button>
          <Button
            variant="outline-warning"
            size="sm"
            onClick={() => assignstaff(student)}
            className="flex-fill d-flex align-items-center justify-content-center gap-1"
            style={{fontSize: '0.75rem', padding: '0.25rem 0.5rem'}}
          >
            <i className="bi bi-person-plus"></i>
            <span className="d-none d-xs-inline">Assign</span>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );

  // Desktop Table Row
  const DesktopTableRow = ({ student }) => (
    <tr 
      className="align-middle cursor-pointer"
      style={{ cursor: 'pointer' }}
      onClick={() => handleViewDetails(student)}
    >
      <td style={{borderColor: 'rgba(255,255,255,0.1)'}} className="d-none d-lg-table-cell">
        <code className="small">{student.groupNo || student.formId}</code>
      </td>
      <td style={{borderColor: 'rgba(255,255,255,0.1)'}}>
        <div className="d-flex align-items-center">
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center me-2 me-md-3 flex-shrink-0"
            style={{ 
              width: '36px', 
              height: '36px', 
              background: 'rgba(255,255,255,0.1)',
              fontSize: '0.875rem'
            }}
          >
            <i className="bi bi-person-fill"></i>
          </div>
          <div className="min-w-0">
            <div className="fw-bold text-truncate small">{student.name || student.projectName}</div>
            <small className="text-light opacity-75 d-none d-md-block" style={{fontSize: '0.7rem'}}>
              {student.regNumber}
            </small>
          </div>
        </div>
      </td>
      <td style={{borderColor: 'rgba(255,255,255,0.1)'}} className="d-none d-xl-table-cell">
        <div className="text-truncate" style={{maxWidth: '150px'}}>{student.institution}</div>
      </td>
      <td style={{borderColor: 'rgba(255,255,255,0.1)'}} className="d-none d-lg-table-cell">
        <div className="text-truncate" style={{maxWidth: '120px'}}>{student.college}</div>
      </td>
      <td style={{borderColor: 'rgba(255,255,255,0.1)'}} className="d-none d-xl-table-cell">
        <span className="small">{student.modeOfCourse}</span>
      </td>
      <td style={{borderColor: 'rgba(255,255,255,0.1)'}}>
        <div className="text-truncate small" style={{maxWidth: '120px'}}>
          {student.category === 'project' ? student.technology : student.course}
        </div>
      </td>
      <td style={{borderColor: 'rgba(255,255,255,0.1)'}} className="d-none d-sm-table-cell">
        <span 
          className={`badge ${student.category === 'project' ? 'bg-warning text-dark' : 'bg-primary'} small`}
        >
          {student.category}
        </span>
      </td>
      <td style={{borderColor: 'rgba(255,255,255,0.1)'}}>
        <span className="badge bg-secondary small">
          {student.projectStatus}
        </span>
      </td>

      <td style={{borderColor: 'rgba(255,255,255,0.1)'}} onClick={(e) => e.stopPropagation()}>
        <div className="d-flex gap-1 flex-nowrap">
          <Button
            variant="outline-info"
            size="sm"
            onClick={() => handleViewDetails(student)}
            title="View Details"
            className="d-flex align-items-center justify-content-center"
            style={{width: '32px', height: '32px'}}
          >
            <i className="bi bi-eye"></i>
          </Button>
          <Button
            variant="outline-warning"
            size="sm"
            onClick={() => assignstaff(student)}
            title="Assign Staff"
            className="d-flex align-items-center justify-content-center"
            style={{width: '32px', height: '32px'}}
          >
            <i className="bi bi-person-plus"></i>
          </Button>
        </div>
      </td>
    </tr>
  );

  return (
    <Container fluid className="px-1 px-sm-2 px-md-3 py-2">
      {/* Header Section */}
      <Row className="mb-2 mb-md-3">
        <Col>
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
            <div className="text-center text-sm-start">
              <h2 className="text-white mb-1 fs-5 fs-sm-4 fs-md-3">Student Management</h2>
              <p className="text-light mb-0 d-none d-md-block small">Manage student records and enrollment</p>
            </div>
            <div className='d-flex gap-1 w-100 w-sm-auto justify-content-sm-end'>
              <Button
                variant="outline-light" 
                className="bg-transparent border-white text-white d-flex align-items-center"
                onClick={fetchStudents}
                size="sm"
              >
                <i className="bi bi-arrow-clockwise pe-1 pe-sm-2"></i>
                <span className="d-none d-sm-inline">Refresh</span>
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-2 mb-md-3 g-1 g-sm-2 g-md-3">
        <Col xs={6} sm={3}>
          <Card className="bg-dark text-white h-100" style={{border: 'none'}}>
            <Card.Body className="p-2 p-sm-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="mb-0 fs-6 fs-sm-5 fs-md-4">{students.length}</h4>
                  <small className="text-light" style={{fontSize: '0.75rem'}}>Total Students</small>
                </div>
                <i className="bi bi-people text-primary fs-6 fs-sm-5 fs-md-4"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} sm={3}>
          <Card className="bg-dark text-white h-100" style={{border: 'none'}}>
            <Card.Body className="p-2 p-sm-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="mb-0 fs-6 fs-sm-5 fs-md-4">
                    {students.filter(s => s.category === 'project').length}
                  </h4>
                  <small className="text-light" style={{fontSize: '0.75rem'}}>Project Students</small>
                </div>
                <i className="bi bi-folder text-warning fs-6 fs-sm-5 fs-md-4"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} sm={3}>
          <Card className="bg-dark text-white h-100" style={{border: 'none'}}>
            <Card.Body className="p-2 p-sm-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="mb-0 fs-6 fs-sm-5 fs-md-4">
                    {students.filter(s => s.category === 'internship').length}
                  </h4>
                  <small className="text-light" style={{fontSize: '0.75rem'}}>Internship Students</small>
                </div>
                <i className="bi bi-briefcase text-info fs-6 fs-sm-5 fs-md-4"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} sm={3}>
          <Card className="bg-dark text-white h-100" style={{border: 'none'}}>
            <Card.Body className="p-2 p-sm-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="mb-0 fs-6 fs-sm-5 fs-md-4">
                    {new Set(students.map(s => s.college)).size}
                  </h4>
                  <small className="text-light" style={{fontSize: '0.75rem'}}>Colleges</small>
                </div>
                <i className="bi bi-building text-success fs-6 fs-sm-5 fs-md-4"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Search and Controls */}
      <Row className="mb-2 mb-md-3 g-2">
        <Col xs={12} md={6} lg={5}>
          <InputGroup size="sm">
            <Form.Control
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-dark text-white border-secondary"
              style={{fontSize: '0.875rem'}}
            />
            <Button 
              variant="outline-secondary" 
              className="border-secondary"
              size="sm"
            >
              <i className="bi bi-search"></i>
            </Button>
          </InputGroup>
        </Col>
        <Col xs={12} md={6} lg={3} xl={2}>
          <div className="d-flex flex-column flex-md-row gap-2 justify-content-md-end">
            <Form.Select 
              className="bg-dark text-white border-secondary" 
              style={{fontSize: '0.875rem'}}
              value={enrollmentFilter}
              onChange={(e) => setEnrollmentFilter(e.target.value)}
              size="sm"
            >
              <option value="all">All Types</option>
              <option value="project">Project</option>
              <option value="internship">Internship</option>
            </Form.Select>
          </div>
        </Col>
      </Row>

      {/* Students List - Mobile Card View */}
      <div className="d-block d-md-none">
        <Row>
          <Col>
            {filteredStudents.length === 0 ? (
              <div className="text-center py-4">
                <i className="bi bi-people fs-1 text-light opacity-50"></i>
                <h5 className="text-light mt-2 fs-6">No students found</h5>
                <p className="text-light opacity-75 px-3 small">
                  {students.length === 0 
                    ? "No students available" 
                    : "No students match your search criteria"}
                </p>
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
                  <div className="text-center py-4">
                    <i className="bi bi-people display-1 text-light opacity-50"></i>
                    <h5 className="text-light mt-2">No students found</h5>
                    <p className="text-light opacity-75 small">
                      {students.length === 0 
                        ? "No students available" 
                        : "No students match your search criteria"}
                    </p>
                  </div>
                ) : (
                  <div className="table-responsive" style={{maxHeight: 'calc(100vh - 300px)', overflowY: 'auto'}}>
                    <Table hover variant="dark" className="mb-0" style={{border: 'none', fontSize: '0.875rem'}}>
                      <thead style={{position: 'sticky', top: 0, zIndex: 1, background: '#212529'}}>
                        <tr>
                          <th className="border-secondary bg-dark py-2 small d-none d-lg-table-cell">Form ID</th>
                          <th className="border-secondary bg-dark py-2 small">Name</th>
                          <th className="border-secondary bg-dark py-2 small d-none d-xl-table-cell">Institute</th>
                          <th className="border-secondary bg-dark py-2 small d-none d-lg-table-cell">College</th>
                          <th className="border-secondary bg-dark py-2 small d-none d-xl-table-cell">Mode</th>
                          <th className="border-secondary bg-dark py-2 small">Technology</th>
                          <th className="border-secondary bg-dark py-2 small d-none d-sm-table-cell">Type</th>
                          <th className="border-secondary bg-dark py-2 small d-none d-sm-table-cell">Status</th>
                          <th className="border-secondary bg-dark py-2 small" style={{width: '100px'}}>Actions</th>
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

      {/* Staff Assignment Modal */}
      <Modal 
        show={showStaffModal} 
        onHide={() => setShowStaffModal(false)}
        centered
        contentClassName="bg-dark text-white"
        size="lg"
      >
        <Modal.Header closeButton closeVariant="white" className="border-secondary py-2">
          <Modal.Title className="fs-6">
            <i className="bi bi-person-plus me-2"></i>
            Assign Staff to {currentStudentForStaff?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          <div className="mb-3">
            <p className="mb-2">
              <strong>Student:</strong> {currentStudentForStaff?.name} ({currentStudentForStaff?.formId})
            </p>
            <p className="mb-3 text-light opacity-75">
              Select one or more staff members to assign to this student:
            </p>
          </div>
          
          {/* Staff Search Input */}
          <div className="mb-3">
            <InputGroup size="sm">
              <Form.Control
                type="text"
                placeholder="Search staff by name..."
                value={staffSearchTerm}
                onChange={(e) => setStaffSearchTerm(e.target.value)}
                className="bg-dark text-white border-secondary"
              />
              <Button 
                variant="outline-secondary" 
                className="border-secondary"
                size="sm"
              >
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
          </div>
          
          <div className="staff-list" style={{maxHeight: '400px', overflowY: 'auto'}}>
            {filteredStaff.length === 0 ? (
              <div className="text-center py-4">
                <i className="bi bi-people fs-1 text-light opacity-50"></i>
                <p className="text-light mt-2">
                  {staffSearchTerm ? 'No staff members match your search' : 'No staff members found'}
                </p>
              </div>
            ) : (
              <Row>
                {filteredStaff.map((staff) => (
                  <Col xs={12} sm={6} key={staff._id} className="mb-2">
                    <div 
                      className={`p-3 border rounded cursor-pointer ${
                        selectedStaff.includes(staff._id) 
                          ? 'border-primary bg-primary bg-opacity-10' 
                          : 'border-secondary bg-dark'
                      }`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleStaffSelection(staff._id)}
                    >
                      <div className="d-flex align-items-center">
                        <Form.Check
                          type="checkbox"
                          checked={selectedStaff.includes(staff._id)}
                          onChange={() => handleStaffSelection(staff._id)}
                          className="me-3"
                        />
                        <div>
                          <h6 className="mb-1">{staff.name}</h6>
                          <small className="text-light opacity-75">
                            {staff.employeeId} • {staff.email}
                          </small>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            )}
          </div>
          
          {selectedStaff.length > 0 && (
            <div className="mt-3 p-3 bg-secondary bg-opacity-25 rounded">
              <strong>Selected Staff ({selectedStaff.length}):</strong>
              <div className="mt-1">
                {staffList
                  .filter(staff => selectedStaff.includes(staff._id))
                  .map(staff => (
                    <span key={staff._id} className="badge bg-primary me-1">
                      {staff.name}
                    </span>
                  ))
                }
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-secondary">
          <Button variant="secondary" size="sm" onClick={() => setShowStaffModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            onClick={handleAssignStaff}
            disabled={selectedStaff.length === 0}
          >
            Assign Selected Staff ({selectedStaff.length})
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
};

export default Adminstudent;