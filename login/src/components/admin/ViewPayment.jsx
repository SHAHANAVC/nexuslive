// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Table,
//   Form,
//   Button,
//   InputGroup,
//   Badge,
//   Spinner,
//   Alert
// } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import api from '../../api';
// import Payment from './Payment';
// import { Modal } from 'react-bootstrap';


// const PaymentView = () => {
//   const navigate = useNavigate();
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [filters, setFilters] = useState({
//     category: 'all',
//     paymentMethod: 'all',
//     startDate: '',
//     endDate: '',
//     search: ''
//   });
//   const [showPayment, setShowPayment] = useState(false);

//   // Fetch payments on component mount and when filters change
//   useEffect(() => {
//     fetchPayments();
//   }, []);

// //   const fetchPayments = async (filterParams = {}) => {
// //     setLoading(true);
// //     setError('');
    
// //     try {
// //       const params = new URLSearchParams();
      
// //       // Add date filters if provided
// //       if (filters.startDate) params.append('startDate', filters.startDate);
// //       if (filters.endDate) params.append('endDate', filters.endDate);
      
// //       const response = await api.get(`/payments?${params.toString()}`);
      
// //       if (response.data.success) {
// //         let filteredData = response.data.data;
        
// //         // Apply additional filters
// //         if (filters.category !== 'all') {
// //           filteredData = filteredData.filter(payment => payment.category === filters.category);
// //         }
        
// //         if (filters.paymentMethod !== 'all') {
// //           filteredData = filteredData.filter(payment => payment.paymentMethod === filters.paymentMethod);
// //         }
        
// //         if (filters.search) {
// //           const searchTerm = filters.search.toLowerCase();
// //           filteredData = filteredData.filter(payment =>
// //             payment.memberName?.toLowerCase().includes(searchTerm) ||
// //             payment.formId?.toLowerCase().includes(searchTerm) ||
// //             payment.groupNo?.toLowerCase().includes(searchTerm) ||
// //             payment.institution?.toLowerCase().includes(searchTerm)
// //           );
// //         }
        
// //         setPayments(filteredData);
// //       } else {
// //         setError('Failed to fetch payments');
// //       }
// //     } catch (err) {
// //       console.error('Error fetching payments:', err);
// //       setError('Failed to load payment data. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// const fetchPayments = async () => {
//   setLoading(true);
//   setError('');
  
//   try {
//     // Only send date filters to the backend (as per your backend expectation)
//     const params = new URLSearchParams();
    
//     if (filters.startDate) params.append('startDate', filters.startDate);
//     if (filters.endDate) params.append('endDate', filters.endDate);
//     // console.log(params);
    
    
//     const response = await api.get(`/payment?${params.toString()}`);
//     console.log(response);
    
    
//     if (response.data.success) {
//       let filteredData = response.data.data;
      
//       // Apply other filters (category, paymentMethod, search) on the frontend
//       // since your backend only handles date filtering
      
//       if (filters.category !== 'all') {
//         filteredData = filteredData.filter(payment => payment.category === filters.category);
//       }
      
//       if (filters.paymentMethod !== 'all') {
//         filteredData = filteredData.filter(payment => payment.paymentMethod === filters.paymentMethod);
//       }
      
//       if (filters.search) {
//         const searchTerm = filters.search.toLowerCase();
//         filteredData = filteredData.filter(payment =>
//           payment.memberName?.toLowerCase().includes(searchTerm) ||
//           payment.formId?.toLowerCase().includes(searchTerm) ||
//           payment.groupNo?.toLowerCase().includes(searchTerm) ||
//           payment.institution?.toLowerCase().includes(searchTerm)
//         );
//       }
      
//       setPayments(filteredData);
//     } else {
//       setError('Failed to fetch payments');
//     }
//   } catch (err) {
//     console.error('Error fetching payments:', err);
//     setError('Failed to load payment data. Please try again.');
//   } finally {
//     setLoading(false);
//   }
// };
//   const handleFilterChange = (key, value) => {
//     const newFilters = { ...filters, [key]: value };
//     setFilters(newFilters);
//   };

//   const handleApplyFilters = () => {
//     fetchPayments();
//   };

//   const handleResetFilters = () => {
//     const resetFilters = {
//       category: 'all',
//       paymentMethod: 'all',
//       startDate: '',
//       endDate: '',
//       search: ''
//     };
//     setFilters(resetFilters);
//     fetchPayments();
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric'
//     });
//   };

//   const formatTime = (dateString) => {
//     return new Date(dateString).toLocaleTimeString('en-IN', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   const formatAmount = (amount) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0
//     }).format(amount);
//   };

//   // Get unique values for filter options
//   const categories = [...new Set(payments.map(p => p.category))];
//   const paymentMethods = [...new Set(payments.map(p => p.paymentMethod))];

//   if (loading) {
//     return (
//       <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
//         <Spinner animation="border" variant="light" />
//       </Container>
//     );
//   }

//   return (
//     <Container fluid className="px-2 px-md-3">
//       {/* Header Section */}
//       <Row className="mb-3 mb-md-4">
//         <Col>
//           <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
//             <div className="text-center text-md-start">
//               <h2 className="text-white mb-1 fs-4 fs-md-3">Payment History</h2>
//               <p className="text-light mb-0 d-none d-md-block">View and manage all payment transactions</p>
//             </div>
//             {/* <Button 
//               variant="primary" 
//               onClick={() => setShowPayment(true)}
//               className="d-flex align-items-center gap-2"
//               size="sm"
//             >
//               <i className="bi bi-credit-card"></i>
//               Make a Payment
//             </Button> */}
//             {/* {showPayment && <Payment />} */}
//             <Button 
//   variant="primary" 
//   onClick={() => setShowPayment(true)}
//   className="d-flex align-items-center gap-2"
//   size="sm"
// >
//   <i className="bi bi-credit-card"></i>
//   Make a Payment
// </Button>

// {/* <Modal
//   show={showPayment}
//   onHide={() => setShowPayment(false)}
//   centered
//   backdrop="static"
//   keyboard={false}
// >
//   <Modal.Header closeButton>
//     <Modal.Title>Make a Payment</Modal.Title>
//   </Modal.Header>

//   <Modal.Body>
//     <Payment />
//   </Modal.Body>
// </Modal> */}
// <Modal
//   show={showPayment}
//   onHide={() => {setShowPayment(false); fetchPayments(); }}
//   centered
//   backdrop="static"
//   keyboard={false}
//   size="lg" // 👈 makes modal wider and proportional
//   className="payment-modal"
// >
//   <Modal.Header closeButton className="border-0 pb-0">
//     <Modal.Title className="fw-semibold text-white">Make a Payment</Modal.Title>
//   </Modal.Header>

//   <Modal.Body className="p-0">
//     <Payment />
//   </Modal.Body>
// </Modal>

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
//                   <h4 className="mb-0 fs-6 fs-md-4">{payments.length}</h4>
//                   <small className="text-light">Total Payments</small>
//                 </div>
//                 <i className="bi bi-credit-card text-primary fs-5 fs-md-2"></i>
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
//                     {payments.filter(p => p.category === 'project').length}
//                   </h4>
//                   <small className="text-light">Project Payments</small>
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
//                     {payments.filter(p => p.category === 'internship').length}
//                   </h4>
//                   <small className="text-light">Internship Payments</small>
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
//                     {formatAmount(payments.reduce((sum, payment) => sum + payment.paidAmount, 0))}
//                   </h4>
//                   <small className="text-light">Total Collected</small>
//                 </div>
//                 <i className="bi bi-cash text-success fs-5 fs-md-2"></i>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Filters Section */}
//       <Card className="bg-dark text-white mb-3 border-secondary">
//         <Card.Body>
//           <Row className="g-2 g-md-3">
//             {/* Search */}
//             <Col xs={12} md={4}>
//               <Form.Group>
//                 <Form.Label className="labels small">Search</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Search by name, form ID, or institution..."
//                   value={filters.search}
//                   onChange={(e) => handleFilterChange('search', e.target.value)}
//                   className="bg-dark text-white"
//                   style={{border: '1px solid rgba(255,255,255,0.2)'}}
//                   size="sm"
//                 />
//               </Form.Group>
//             </Col>

//             {/* Category Filter */}
//             <Col xs={6} md={2}>
//               <Form.Group>
//                 <Form.Label className="labels small">Category</Form.Label>
//                 <Form.Select
//                   value={filters.category}
//                   onChange={(e) => handleFilterChange('category', e.target.value)}
//                   className="bg-dark text-white"
//                   style={{border: '1px solid rgba(255,255,255,0.2)'}}
//                   size="sm"
//                 >
//                   <option value="all">All Categories</option>
//                   <option value="project">Project</option>
//                   <option value="internship">Internship</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>

//             {/* Payment Method Filter */}
//             <Col xs={6} md={2}>
//               <Form.Group>
//                 <Form.Label className="labels small">Payment Method</Form.Label>
//                 <Form.Select
//                   value={filters.paymentMethod}
//                   onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
//                   className="bg-dark text-white"
//                   style={{border: '1px solid rgba(255,255,255,0.2)'}}
//                   size="sm"
//                 >
//                   <option value="all">All Methods</option>
//                   <option value="cash">Cash</option>
//                   <option value="gpay">GPay</option>
//                   {/* <option value="bank">Bank</option> */}
//                 </Form.Select>
//               </Form.Group>
//             </Col>

//             {/* Date Range Filters */}
//             <Col xs={6} md={2}>
//               <Form.Group>
//                 <Form.Label className="labels small">From Date</Form.Label>
//                 <Form.Control
//                   type="date"
//                   value={filters.startDate}
//                   onChange={(e) => handleFilterChange('startDate', e.target.value)}
//                   className="bg-dark text-white"
//                   style={{border: '1px solid rgba(255,255,255,0.2)'}}
//                   size="sm"
//                 />
//               </Form.Group>
//             </Col>

//             <Col xs={6} md={2}>
//               <Form.Group>
//                 <Form.Label className="labels small">To Date</Form.Label>
//                 <Form.Control
//                   type="date"
//                   value={filters.endDate}
//                   onChange={(e) => handleFilterChange('endDate', e.target.value)}
//                   className="bg-dark text-white"
//                   style={{border: '1px solid rgba(255,255,255,0.2)'}}
//                   size="sm"
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           {/* Filter Actions */}
//           <Row className="mt-3">
//             <Col>
//               <div className="d-flex gap-2 justify-content-end">
//                 <Button
//                   variant="outline-light"
//                   onClick={handleResetFilters}
//                   size="sm"
//                 >
//                   <i className="bi bi-arrow-clockwise me-1"></i>
//                   Reset
//                 </Button>
//                 <Button
//                   variant="primary"
//                   onClick={handleApplyFilters}
//                   size="sm"
//                 >
//                   <i className="bi bi-funnel me-1"></i>
//                   Apply Filters
//                 </Button>
//               </div>
//             </Col>
//           </Row>
//         </Card.Body>
//       </Card>

//       {/* Error Alert */}
//       {error && (
//         <Alert variant="danger" className="mb-3">
//           {error}
//         </Alert>
//       )}

//       {/* Payments Table */}
//       <Card className="bg-dark text-white border-secondary">
//         <Card.Body className="p-0">
//           {payments.length === 0 ? (
//             <div className="text-center py-5">
//               <i className="bi bi-credit-card display-1 text-light opacity-50"></i>
//               <h5 className="text-light mt-3">No payments found</h5>
//               <p className="text-light opacity-75">
//                 {loading ? 'Loading payments...' : 'No payments match your current filters'}
//               </p>
//               {!loading && (
//                 <Button variant="primary" onClick={handleResetFilters}>
//                   Clear Filters
//                 </Button>
//               )}
//             </div>
//           ) : (
//             <div 
//               className="table-responsive"
//               style={{
//                 maxHeight: '600px',
//                 overflowY: 'auto',
//                 scrollbarWidth: 'none',
//                 msOverflowStyle: 'none'
//               }}
//             >
//               <style>
//                 {`
//                   .payment-table-container::-webkit-scrollbar {
//                     display: none;
//                   }
//                 `}
//               </style>
//               <Table 
//                 hover 
//                 variant="dark" 
//                 className="mb-0 payment-table-container"
//                 style={{
//                   border: 'none',
//                   minWidth: '800px'
//                 }}
//               >
//                 <thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
//                   <tr>
//                     <th 
//                       style={{
//                         borderColor: 'rgba(255,255,255,0.1)',
//                         background: '#1a1a1a',
//                         padding: '12px 8px',
//                         fontSize: '0.875rem',
//                         fontWeight: '600'
//                       }}
//                     >
//                       Date & Time
//                     </th>
//                     <th 
//                       style={{
//                         borderColor: 'rgba(255,255,255,0.1)',
//                         background: '#1a1a1a',
//                         padding: '12px 8px',
//                         fontSize: '0.875rem',
//                         fontWeight: '600'
//                       }}
//                     >
//                       Name
//                     </th>
//                     <th 
//                       style={{
//                         borderColor: 'rgba(255,255,255,0.1)',
//                         background: '#1a1a1a',
//                         padding: '12px 8px',
//                         fontSize: '0.875rem',
//                         fontWeight: '600'
//                       }}
//                     >
//                       Category
//                     </th>
//                     <th 
//                       style={{
//                         borderColor: 'rgba(255,255,255,0.1)',
//                         background: '#1a1a1a',
//                         padding: '12px 8px',
//                         fontSize: '0.875rem',
//                         fontWeight: '600'
//                       }}
//                     >
//                       Form ID
//                     </th>
//                     <th 
//                       style={{
//                         borderColor: 'rgba(255,255,255,0.1)',
//                         background: '#1a1a1a',
//                         padding: '12px 8px',
//                         fontSize: '0.875rem',
//                         fontWeight: '600'
//                       }}
//                     >
//                       Paid Amount
//                     </th>
//                     <th 
//                       style={{
//                         borderColor: 'rgba(255,255,255,0.1)',
//                         background: '#1a1a1a',
//                         padding: '12px 8px',
//                         fontSize: '0.875rem',
//                         fontWeight: '600'
//                       }}
//                     >
//                       Payment Method
//                     </th>
//                     <th 
//                       style={{
//                         borderColor: 'rgba(255,255,255,0.1)',
//                         background: '#1a1a1a',
//                         padding: '12px 8px',
//                         fontSize: '0.875rem',
//                         fontWeight: '600'
//                       }}
//                     >
//                       Institution
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {payments.map((payment, index) => (
//                     <tr 
//                       key={payment._id || index}
//                       className="align-middle"
//                       style={{
//                         borderBottom: '1px solid rgba(255,255,255,0.1)'
//                       }}
//                     >
//                       <td 
//                         style={{
//                           borderColor: 'rgba(255,255,255,0.1)',
//                           padding: '12px 8px',
//                           fontSize: '0.875rem'
//                         }}
//                       >
//                         <div>
//                           <div className="fw-bold">{formatDate(payment.paymentDate)}</div>
//                           <small className="text-light opacity-75">
//                             {formatTime(payment.paymentDate)}
//                           </small>
//                         </div>
//                       </td>
//                       <td 
//                         style={{
//                           borderColor: 'rgba(255,255,255,0.1)',
//                           padding: '12px 8px',
//                           fontSize: '0.875rem'
//                         }}
//                       >
//                         <div className="fw-bold">{payment.memberName || 'N/A'}</div>
//                         {payment.memberEmail && (
//                           <small className="text-light opacity-75 d-block">
//                             {payment.memberEmail}
//                           </small>
//                         )}
//                       </td>
//                       <td 
//                         style={{
//                           borderColor: 'rgba(255,255,255,0.1)',
//                           padding: '12px 8px',
//                           fontSize: '0.875rem'
//                         }}
//                       >
//                         <Badge 
//                           bg={payment.category === 'project' ? 'warning' : 'primary'}
//                           className="text-capitalize"
//                         >
//                           {payment.category}
//                         </Badge>
//                       </td>
//                       <td 
//                         style={{
//                           borderColor: 'rgba(255,255,255,0.1)',
//                           padding: '12px 8px',
//                           fontSize: '0.875rem'
//                         }}
//                       >
//                         <code className="text-info">{payment.formId || payment.groupNo || 'N/A'}</code>
//                       </td>
//                       <td 
//                         style={{
//                           borderColor: 'rgba(255,255,255,0.1)',
//                           padding: '12px 8px',
//                           fontSize: '0.875rem'
//                         }}
//                       >
//                         <span className="fw-bold text-success">
//                           {formatAmount(payment.paidAmount)}
//                         </span>
//                       </td>
//                       <td 
//                         style={{
//                           borderColor: 'rgba(255,255,255,0.1)',
//                           padding: '12px 8px',
//                           fontSize: '0.875rem'
//                         }}
//                       >
//                         <Badge 
//                           bg={
//                             payment.paymentMethod === 'cash' ? 'success' :
//                             payment.paymentMethod === 'gpay' ? 'info' : 'secondary'
//                           }
//                           className="text-capitalize"
//                         >
//                           {payment.paymentMethod}
//                         </Badge>
//                       </td>
//                       <td 
//                         style={{
//                           borderColor: 'rgba(255,255,255,0.1)',
//                           padding: '12px 8px',
//                           fontSize: '0.875rem'
//                         }}
//                       >
//                         <span className="text-capitalize fw-bold">
//                           {payment.institution}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             </div>
//           )}
//         </Card.Body>
//       </Card>

//       {/* Summary Footer */}
//       {payments.length > 0 && (
//         <Row className="mt-3">
//           <Col>
//             <Card className="bg-dark text-white border-success">
//               <Card.Body className="py-2">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <small className="text-light opacity-75">Showing {payments.length} payments</small>
//                   </div>
//                   <div className="text-end">
//                     <small className="text-light opacity-75">Total Amount: </small>
//                     <strong className="text-success fs-6">
//                       {formatAmount(payments.reduce((sum, payment) => sum + payment.paidAmount, 0))}
//                     </strong>
//                   </div>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default PaymentView; 

import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Form,
  Button,
  InputGroup,
  Badge,
  Spinner,
  Alert
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import Payment from './Payment';
import { Modal } from 'react-bootstrap';

const PaymentView = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    paymentMethod: 'all',
    startDate: '',
    endDate: '',
    search: ''
  });
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    setError('');
    
    try {
      const params = new URLSearchParams();
      
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      
      const response = await api.get(`/payment?${params.toString()}`);
      
      if (response.data.success) {
        let filteredData = response.data.data;
        
        if (filters.category !== 'all') {
          filteredData = filteredData.filter(payment => payment.category === filters.category);
        }
        
        if (filters.paymentMethod !== 'all') {
          filteredData = filteredData.filter(payment => payment.paymentMethod === filters.paymentMethod);
        }
        
        if (filters.search) {
          const searchTerm = filters.search.toLowerCase();
          filteredData = filteredData.filter(payment =>
            payment.memberName?.toLowerCase().includes(searchTerm) ||
            payment.formId?.toLowerCase().includes(searchTerm) ||
            payment.groupNo?.toLowerCase().includes(searchTerm) ||
            payment.institution?.toLowerCase().includes(searchTerm)
          );
        }
        
        setPayments(filteredData);
      } else {
        setError('Failed to fetch payments');
      }
    } catch (err) {
      console.error('Error fetching payments:', err);
      setError('Failed to load payment data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    fetchPayments();
  };

  const handleResetFilters = () => {
    const resetFilters = {
      category: 'all',
      paymentMethod: 'all',
      startDate: '',
      endDate: '',
      search: ''
    };
    setFilters(resetFilters);
    fetchPayments();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <Spinner animation="border" variant="light" />
      </Container>
    );
  }

  // Mobile Card View for Payments
  const MobilePaymentCard = ({ payment, index }) => (
    <Card className="bg-dark text-white mb-2 border-secondary">
      <Card.Body className="p-2 p-sm-3">
        {/* Header with Date and Category */}
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <div className="fw-bold small">{formatDate(payment.paymentDate)}</div>
            <small className="text-light opacity-75" style={{fontSize: '0.7rem'}}>
              {formatTime(payment.paymentDate)}
            </small>
          </div>
          <Badge 
            bg={payment.category === 'project' ? 'warning' : 'primary'}
            className="text-capitalize"
            style={{fontSize: '0.7rem'}}
          >
            {payment.category}
          </Badge>
        </div>

        {/* Name and Form ID */}
        <div className="mb-2">
          <div className="fw-bold text-truncate small">{payment.memberName || 'N/A'}</div>
          <code className="text-info small" style={{fontSize: '0.75rem'}}>
            {payment.formId || payment.groupNo || 'N/A'}
          </code>
        </div>

        {/* Amount and Payment Method */}
        <div className="row g-2 mb-2">
          <Col xs={6}>
            <small className="text-light opacity-75 d-block" style={{fontSize: '0.7rem'}}>Amount</small>
            <span className="fw-bold text-success small">{formatAmount(payment.paidAmount)}</span>
          </Col>
          <Col xs={6}>
            <small className="text-light opacity-75 d-block" style={{fontSize: '0.7rem'}}>Method</small>
            <Badge 
              bg={
                payment.paymentMethod === 'cash' ? 'success' :
                payment.paymentMethod === 'gpay' ? 'info' : 'secondary'
              }
              className="text-capitalize"
              style={{fontSize: '0.7rem'}}
            >
              {payment.paymentMethod}
            </Badge>
          </Col>
        </div>

        {/* Institution */}
        <div className="mb-2">
          <small className="text-light opacity-75 d-block" style={{fontSize: '0.7rem'}}>Institution</small>
          <div className="text-truncate small" style={{fontSize: '0.8rem'}}>
            {payment.institution}
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  // Desktop Table Row
  const DesktopTableRow = ({ payment, index }) => (
    <tr 
      key={payment._id || index}
      className="align-middle"
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <td 
        style={{
          borderColor: 'rgba(255,255,255,0.1)',
          padding: '8px 6px',
          fontSize: '0.8rem'
        }}
      >
        <div>
          <div className="fw-bold small">{formatDate(payment.paymentDate)}</div>
          <small className="text-light opacity-75" style={{fontSize: '0.7rem'}}>
            {formatTime(payment.paymentDate)}
          </small>
        </div>
      </td>
      <td 
        style={{
          borderColor: 'rgba(255,255,255,0.1)',
          padding: '8px 6px',
          fontSize: '0.8rem'
        }}
      >
        <div className="fw-bold text-truncate small" style={{maxWidth: '120px'}}>
          {payment.memberName || 'N/A'}
        </div>
        {payment.memberEmail && (
          <small className="text-light opacity-75 d-block text-truncate" style={{fontSize: '0.7rem', maxWidth: '120px'}}>
            {payment.memberEmail}
          </small>
        )}
      </td>
      <td 
        style={{
          borderColor: 'rgba(255,255,255,0.1)',
          padding: '8px 6px',
          fontSize: '0.8rem'
        }}
      >
        <Badge 
          bg={payment.category === 'project' ? 'warning' : 'primary'}
          className="text-capitalize small"
        >
          {payment.category}
        </Badge>
      </td>
      <td 
        style={{
          borderColor: 'rgba(255,255,255,0.1)',
          padding: '8px 6px',
          fontSize: '0.8rem'
        }}
      >
        <code className="text-info small">{payment.formId || payment.groupNo || 'N/A'}</code>
      </td>
      <td 
        style={{
          borderColor: 'rgba(255,255,255,0.1)',
          padding: '8px 6px',
          fontSize: '0.8rem'
        }}
      >
        <span className="fw-bold text-success small">
          {formatAmount(payment.paidAmount)}
        </span>
      </td>
      <td 
        style={{
          borderColor: 'rgba(255,255,255,0.1)',
          padding: '8px 6px',
          fontSize: '0.8rem'
        }}
      >
        <Badge 
          bg={
            payment.paymentMethod === 'cash' ? 'success' :
            payment.paymentMethod === 'gpay' ? 'info' : 'secondary'
          }
          className="text-capitalize small"
        >
          {payment.paymentMethod}
        </Badge>
      </td>
      <td 
        style={{
          borderColor: 'rgba(255,255,255,0.1)',
          padding: '8px 6px',
          fontSize: '0.8rem'
        }}
      >
        <span className="text-capitalize fw-bold text-truncate d-block small" style={{maxWidth: '150px'}}>
          {payment.institution}
        </span>
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
              <h2 className="text-white mb-1 fs-5 fs-sm-4 fs-md-3">Payment History</h2>
              <p className="text-light mb-0 d-none d-md-block small">View and manage all payment transactions</p>
            </div>
            <Button 
              variant="primary" 
              onClick={() => setShowPayment(true)}
              className="d-flex align-items-center gap-1 gap-sm-2"
              size="sm"
            >
              <i className="bi bi-credit-card"></i>
              <span className="d-none d-sm-inline">Make a Payment</span>
              <span className="d-sm-none">Pay</span>
            </Button>

            <Modal
              show={showPayment}
              onHide={() => {setShowPayment(false); fetchPayments(); }}
              centered
              backdrop="static"
              keyboard={false}
              size="lg"
              className="payment-modal"
            >
              <Modal.Header closeButton className="border-0 pb-0">
                <Modal.Title className="fw-semibold text-white">Make a Payment</Modal.Title>
              </Modal.Header>
              <Modal.Body className="p-0">
                <Payment />
              </Modal.Body>
            </Modal>
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
                  <h4 className="mb-0 fs-6 fs-sm-5 fs-md-4">{payments.length}</h4>
                  <small className="text-light" style={{fontSize: '0.75rem'}}>Total Payments</small>
                </div>
                <i className="bi bi-credit-card text-primary fs-6 fs-sm-5 fs-md-4"></i>
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
                    {payments.filter(p => p.category === 'project').length}
                  </h4>
                  <small className="text-light" style={{fontSize: '0.75rem'}}>Project Payments</small>
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
                    {payments.filter(p => p.category === 'internship').length}
                  </h4>
                  <small className="text-light" style={{fontSize: '0.75rem'}}>Internship Payments</small>
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
                    {formatAmount(payments.reduce((sum, payment) => sum + payment.paidAmount, 0))}
                  </h4>
                  <small className="text-light" style={{fontSize: '0.75rem'}}>Total Collected</small>
                </div>
                <i className="bi bi-cash text-success fs-6 fs-sm-5 fs-md-4"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filters Section */}
      <Card className="bg-dark text-white mb-2 mb-md-3 border-secondary">
        <Card.Body className="p-2 p-sm-3">
          <Row className="g-1 g-sm-2 g-md-3">
            {/* Search */}
            <Col xs={12} md={4}>
              <Form.Group>
                <Form.Label className="fw-medium mb-1 small">Search</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search payments..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="bg-dark text-white border-secondary"
                  size="sm"
                  style={{fontSize: '0.875rem'}}
                />
              </Form.Group>
            </Col>

            {/* Category Filter */}
            <Col xs={6} sm={4} md={2}>
              <Form.Group>
                <Form.Label className="fw-medium mb-1 small">Category</Form.Label>
                <Form.Select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="bg-dark text-white border-secondary"
                  size="sm"
                  style={{fontSize: '0.875rem'}}
                >
                  <option value="all">All Categories</option>
                  <option value="project">Project</option>
                  <option value="internship">Internship</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Payment Method Filter */}
            <Col xs={6} sm={4} md={2}>
              <Form.Group>
                <Form.Label className="fw-medium mb-1 small">Method</Form.Label>
                <Form.Select
                  value={filters.paymentMethod}
                  onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
                  className="bg-dark text-white border-secondary"
                  size="sm"
                  style={{fontSize: '0.875rem'}}
                >
                  <option value="all">All Methods</option>
                  <option value="cash">Cash</option>
                  <option value="gpay">GPay</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Date Range Filters */}
            <Col xs={6} sm={6} md={2}>
              <Form.Group>
                <Form.Label className="fw-medium mb-1 small">From Date</Form.Label>
                <Form.Control
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => handleFilterChange('startDate', e.target.value)}
                  className="bg-dark text-white border-secondary"
                  size="sm"
                  style={{fontSize: '0.875rem'}}
                />
              </Form.Group>
            </Col>

            <Col xs={6} sm={6} md={2}>
              <Form.Group>
                <Form.Label className="fw-medium mb-1 small">To Date</Form.Label>
                <Form.Control
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => handleFilterChange('endDate', e.target.value)}
                  className="bg-dark text-white border-secondary"
                  size="sm"
                  style={{fontSize: '0.875rem'}}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Filter Actions */}
          <Row className="mt-2 mt-sm-3">
            <Col>
              <div className="d-flex flex-column flex-sm-row gap-1 gap-sm-2 justify-content-end">
                <Button
                  variant="outline-light"
                  onClick={handleResetFilters}
                  size="sm"
                  className="flex-grow-1 flex-sm-grow-0"
                >
                  <i className="bi bi-arrow-clockwise me-1"></i>
                  <span className="small">Reset</span>
                </Button>
                <Button
                  variant="primary"
                  onClick={handleApplyFilters}
                  size="sm"
                  className="flex-grow-1 flex-sm-grow-0"
                >
                  <i className="bi bi-funnel me-1"></i>
                  <span className="small">Apply Filters</span>
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert variant="danger" className="mb-2 mb-md-3 small py-2">
          {error}
        </Alert>
      )}

      {/* Mobile Payments List */}
      <div className="d-block d-md-none">
        <Row>
          <Col>
            {payments.length === 0 ? (
              <div className="text-center py-4">
                <i className="bi bi-credit-card fs-1 text-light opacity-50"></i>
                <h5 className="text-light mt-2 fs-6">No payments found</h5>
                <p className="text-light opacity-75 small">
                  {loading ? 'Loading payments...' : 'No payments match your current filters'}
                </p>
                {!loading && (
                  <Button variant="primary" onClick={handleResetFilters} size="sm">
                    Clear Filters
                  </Button>
                )}
              </div>
            ) : (
              <div>
                {payments.map((payment, index) => (
                  <MobilePaymentCard key={payment._id || index} payment={payment} index={index} />
                ))}
              </div>
            )}
          </Col>
        </Row>
      </div>

      {/* Desktop Payments Table */}
      <div className="d-none d-md-block">
        <Card className="bg-dark text-white border-secondary">
          <Card.Body className="p-0">
            {payments.length === 0 ? (
              <div className="text-center py-4">
                <i className="bi bi-credit-card display-1 text-light opacity-50"></i>
                <h5 className="text-light mt-2">No payments found</h5>
                <p className="text-light opacity-75 small">
                  {loading ? 'Loading payments...' : 'No payments match your current filters'}
                </p>
                {!loading && (
                  <Button variant="primary" onClick={handleResetFilters} size="sm">
                    Clear Filters
                  </Button>
                )}
              </div>
            ) : (
              <div 
                className="table-responsive"
                style={{
                  maxHeight: '500px',
                  overflowY: 'auto'
                }}
              >
                <Table 
                  hover 
                  variant="dark" 
                  className="mb-0"
                  style={{
                    border: 'none',
                    minWidth: '700px',
                    fontSize: '0.875rem'
                  }}
                >
                  <thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                    <tr>
                      <th className="border-secondary bg-dark py-2 small">Date & Time</th>
                      <th className="border-secondary bg-dark py-2 small">Name</th>
                      <th className="border-secondary bg-dark py-2 small">Category</th>
                      <th className="border-secondary bg-dark py-2 small">Form ID</th>
                      <th className="border-secondary bg-dark py-2 small">Amount</th>
                      <th className="border-secondary bg-dark py-2 small">Method</th>
                      <th className="border-secondary bg-dark py-2 small">Institution</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment, index) => (
                      <DesktopTableRow key={payment._id || index} payment={payment} index={index} />
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>

      {/* Summary Footer */}
      {payments.length > 0 && (
        <Row className="mt-2 mt-md-3">
          <Col>
            <Card className="bg-dark text-white border-success">
              <Card.Body className="py-1 py-sm-2">
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
                  <div>
                    <small className="text-light opacity-75 small">
                      Showing {payments.length} payments
                    </small>
                  </div>
                  <div className="text-center text-sm-end mt-1 mt-sm-0">
                    <small className="text-light opacity-75 small">Total Amount: </small>
                    <strong className="text-success fs-6">
                      {formatAmount(payments.reduce((sum, payment) => sum + payment.paidAmount, 0))}
                    </strong>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default PaymentView;