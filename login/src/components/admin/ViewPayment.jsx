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

  // Fetch payments on component mount and when filters change
  useEffect(() => {
    fetchPayments();
  }, []);

//   const fetchPayments = async (filterParams = {}) => {
//     setLoading(true);
//     setError('');
    
//     try {
//       const params = new URLSearchParams();
      
//       // Add date filters if provided
//       if (filters.startDate) params.append('startDate', filters.startDate);
//       if (filters.endDate) params.append('endDate', filters.endDate);
      
//       const response = await api.get(`/payments?${params.toString()}`);
      
//       if (response.data.success) {
//         let filteredData = response.data.data;
        
//         // Apply additional filters
//         if (filters.category !== 'all') {
//           filteredData = filteredData.filter(payment => payment.category === filters.category);
//         }
        
//         if (filters.paymentMethod !== 'all') {
//           filteredData = filteredData.filter(payment => payment.paymentMethod === filters.paymentMethod);
//         }
        
//         if (filters.search) {
//           const searchTerm = filters.search.toLowerCase();
//           filteredData = filteredData.filter(payment =>
//             payment.memberName?.toLowerCase().includes(searchTerm) ||
//             payment.formId?.toLowerCase().includes(searchTerm) ||
//             payment.groupNo?.toLowerCase().includes(searchTerm) ||
//             payment.institution?.toLowerCase().includes(searchTerm)
//           );
//         }
        
//         setPayments(filteredData);
//       } else {
//         setError('Failed to fetch payments');
//       }
//     } catch (err) {
//       console.error('Error fetching payments:', err);
//       setError('Failed to load payment data. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

const fetchPayments = async () => {
  setLoading(true);
  setError('');
  
  try {
    // Only send date filters to the backend (as per your backend expectation)
    const params = new URLSearchParams();
    
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    
    const response = await api.get(`/payment?${params.toString()}`);
    
    if (response.data.success) {
      let filteredData = response.data.data;
      
      // Apply other filters (category, paymentMethod, search) on the frontend
      // since your backend only handles date filtering
      
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

  // Get unique values for filter options
  const categories = [...new Set(payments.map(p => p.category))];
  const paymentMethods = [...new Set(payments.map(p => p.paymentMethod))];

  if (loading) {
    return (
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <Spinner animation="border" variant="light" />
      </Container>
    );
  }

  return (
    <Container fluid className="px-2 px-md-3">
      {/* Header Section */}
      <Row className="mb-3 mb-md-4">
        <Col>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
            <div className="text-center text-md-start">
              <h2 className="text-white mb-1 fs-4 fs-md-3">Payment History</h2>
              <p className="text-light mb-0 d-none d-md-block">View and manage all payment transactions</p>
            </div>
            {/* <Button 
              variant="primary" 
              onClick={() => setShowPayment(true)}
              className="d-flex align-items-center gap-2"
              size="sm"
            >
              <i className="bi bi-credit-card"></i>
              Make a Payment
            </Button> */}
            {/* {showPayment && <Payment />} */}
            <Button 
  variant="primary" 
  onClick={() => setShowPayment(true)}
  className="d-flex align-items-center gap-2"
  size="sm"
>
  <i className="bi bi-credit-card"></i>
  Make a Payment
</Button>

{/* <Modal
  show={showPayment}
  onHide={() => setShowPayment(false)}
  centered
  backdrop="static"
  keyboard={false}
>
  <Modal.Header closeButton>
    <Modal.Title>Make a Payment</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    <Payment />
  </Modal.Body>
</Modal> */}
<Modal
  show={showPayment}
  onHide={() => setShowPayment(false)}
  centered
  backdrop="static"
  keyboard={false}
  size="lg" // 👈 makes modal wider and proportional
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
      <Row className="mb-3 mb-md-4 g-2 g-md-3">
        <Col xs={6} md={3}>
          <Card className="bg-dark text-white h-100" style={{border: 'none'}}>
            <Card.Body className="p-2 p-md-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="mb-0 fs-6 fs-md-4">{payments.length}</h4>
                  <small className="text-light">Total Payments</small>
                </div>
                <i className="bi bi-credit-card text-primary fs-5 fs-md-2"></i>
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
                    {payments.filter(p => p.category === 'project').length}
                  </h4>
                  <small className="text-light">Project Payments</small>
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
                    {payments.filter(p => p.category === 'internship').length}
                  </h4>
                  <small className="text-light">Internship Payments</small>
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
                    {formatAmount(payments.reduce((sum, payment) => sum + payment.paidAmount, 0))}
                  </h4>
                  <small className="text-light">Total Collected</small>
                </div>
                <i className="bi bi-cash text-success fs-5 fs-md-2"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filters Section */}
      <Card className="bg-dark text-white mb-3 border-secondary">
        <Card.Body>
          <Row className="g-2 g-md-3">
            {/* Search */}
            <Col xs={12} md={4}>
              <Form.Group>
                <Form.Label className="labels small">Search</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search by name, form ID, or institution..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="bg-dark text-white"
                  style={{border: '1px solid rgba(255,255,255,0.2)'}}
                  size="sm"
                />
              </Form.Group>
            </Col>

            {/* Category Filter */}
            <Col xs={6} md={2}>
              <Form.Group>
                <Form.Label className="labels small">Category</Form.Label>
                <Form.Select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="bg-dark text-white"
                  style={{border: '1px solid rgba(255,255,255,0.2)'}}
                  size="sm"
                >
                  <option value="all">All Categories</option>
                  <option value="project">Project</option>
                  <option value="internship">Internship</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Payment Method Filter */}
            <Col xs={6} md={2}>
              <Form.Group>
                <Form.Label className="labels small">Payment Method</Form.Label>
                <Form.Select
                  value={filters.paymentMethod}
                  onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
                  className="bg-dark text-white"
                  style={{border: '1px solid rgba(255,255,255,0.2)'}}
                  size="sm"
                >
                  <option value="all">All Methods</option>
                  <option value="cash">Cash</option>
                  <option value="gpay">GPay</option>
                  <option value="bank">Bank</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Date Range Filters */}
            <Col xs={6} md={2}>
              <Form.Group>
                <Form.Label className="labels small">From Date</Form.Label>
                <Form.Control
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => handleFilterChange('startDate', e.target.value)}
                  className="bg-dark text-white"
                  style={{border: '1px solid rgba(255,255,255,0.2)'}}
                  size="sm"
                />
              </Form.Group>
            </Col>

            <Col xs={6} md={2}>
              <Form.Group>
                <Form.Label className="labels small">To Date</Form.Label>
                <Form.Control
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => handleFilterChange('endDate', e.target.value)}
                  className="bg-dark text-white"
                  style={{border: '1px solid rgba(255,255,255,0.2)'}}
                  size="sm"
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Filter Actions */}
          <Row className="mt-3">
            <Col>
              <div className="d-flex gap-2 justify-content-end">
                <Button
                  variant="outline-light"
                  onClick={handleResetFilters}
                  size="sm"
                >
                  <i className="bi bi-arrow-clockwise me-1"></i>
                  Reset
                </Button>
                <Button
                  variant="primary"
                  onClick={handleApplyFilters}
                  size="sm"
                >
                  <i className="bi bi-funnel me-1"></i>
                  Apply Filters
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      )}

      {/* Payments Table */}
      <Card className="bg-dark text-white border-secondary">
        <Card.Body className="p-0">
          {payments.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-credit-card display-1 text-light opacity-50"></i>
              <h5 className="text-light mt-3">No payments found</h5>
              <p className="text-light opacity-75">
                {loading ? 'Loading payments...' : 'No payments match your current filters'}
              </p>
              {!loading && (
                <Button variant="primary" onClick={handleResetFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div 
              className="table-responsive"
              style={{
                maxHeight: '600px',
                overflowY: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              <style>
                {`
                  .payment-table-container::-webkit-scrollbar {
                    display: none;
                  }
                `}
              </style>
              <Table 
                hover 
                variant="dark" 
                className="mb-0 payment-table-container"
                style={{
                  border: 'none',
                  minWidth: '800px'
                }}
              >
                <thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                  <tr>
                    <th 
                      style={{
                        borderColor: 'rgba(255,255,255,0.1)',
                        background: '#1a1a1a',
                        padding: '12px 8px',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}
                    >
                      Date & Time
                    </th>
                    <th 
                      style={{
                        borderColor: 'rgba(255,255,255,0.1)',
                        background: '#1a1a1a',
                        padding: '12px 8px',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}
                    >
                      Name
                    </th>
                    <th 
                      style={{
                        borderColor: 'rgba(255,255,255,0.1)',
                        background: '#1a1a1a',
                        padding: '12px 8px',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}
                    >
                      Category
                    </th>
                    <th 
                      style={{
                        borderColor: 'rgba(255,255,255,0.1)',
                        background: '#1a1a1a',
                        padding: '12px 8px',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}
                    >
                      Form ID
                    </th>
                    <th 
                      style={{
                        borderColor: 'rgba(255,255,255,0.1)',
                        background: '#1a1a1a',
                        padding: '12px 8px',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}
                    >
                      Paid Amount
                    </th>
                    <th 
                      style={{
                        borderColor: 'rgba(255,255,255,0.1)',
                        background: '#1a1a1a',
                        padding: '12px 8px',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}
                    >
                      Payment Method
                    </th>
                    <th 
                      style={{
                        borderColor: 'rgba(255,255,255,0.1)',
                        background: '#1a1a1a',
                        padding: '12px 8px',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}
                    >
                      Institution
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, index) => (
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
                          padding: '12px 8px',
                          fontSize: '0.875rem'
                        }}
                      >
                        <div>
                          <div className="fw-bold">{formatDate(payment.paymentDate)}</div>
                          <small className="text-light opacity-75">
                            {formatTime(payment.paymentDate)}
                          </small>
                        </div>
                      </td>
                      <td 
                        style={{
                          borderColor: 'rgba(255,255,255,0.1)',
                          padding: '12px 8px',
                          fontSize: '0.875rem'
                        }}
                      >
                        <div className="fw-bold">{payment.memberName || 'N/A'}</div>
                        {payment.memberEmail && (
                          <small className="text-light opacity-75 d-block">
                            {payment.memberEmail}
                          </small>
                        )}
                      </td>
                      <td 
                        style={{
                          borderColor: 'rgba(255,255,255,0.1)',
                          padding: '12px 8px',
                          fontSize: '0.875rem'
                        }}
                      >
                        <Badge 
                          bg={payment.category === 'project' ? 'warning' : 'primary'}
                          className="text-capitalize"
                        >
                          {payment.category}
                        </Badge>
                      </td>
                      <td 
                        style={{
                          borderColor: 'rgba(255,255,255,0.1)',
                          padding: '12px 8px',
                          fontSize: '0.875rem'
                        }}
                      >
                        <code className="text-info">{payment.formId || payment.groupNo || 'N/A'}</code>
                      </td>
                      <td 
                        style={{
                          borderColor: 'rgba(255,255,255,0.1)',
                          padding: '12px 8px',
                          fontSize: '0.875rem'
                        }}
                      >
                        <span className="fw-bold text-success">
                          {formatAmount(payment.paidAmount)}
                        </span>
                      </td>
                      <td 
                        style={{
                          borderColor: 'rgba(255,255,255,0.1)',
                          padding: '12px 8px',
                          fontSize: '0.875rem'
                        }}
                      >
                        <Badge 
                          bg={
                            payment.paymentMethod === 'cash' ? 'success' :
                            payment.paymentMethod === 'gpay' ? 'info' : 'secondary'
                          }
                          className="text-capitalize"
                        >
                          {payment.paymentMethod}
                        </Badge>
                      </td>
                      <td 
                        style={{
                          borderColor: 'rgba(255,255,255,0.1)',
                          padding: '12px 8px',
                          fontSize: '0.875rem'
                        }}
                      >
                        <span className="text-capitalize fw-bold">
                          {payment.institution}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Summary Footer */}
      {payments.length > 0 && (
        <Row className="mt-3">
          <Col>
            <Card className="bg-dark text-white border-success">
              <Card.Body className="py-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small className="text-light opacity-75">Showing {payments.length} payments</small>
                  </div>
                  <div className="text-end">
                    <small className="text-light opacity-75">Total Amount: </small>
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