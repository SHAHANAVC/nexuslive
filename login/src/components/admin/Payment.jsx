// // import React, { useState, useEffect, useRef } from "react";
// // import {
// //   Container,
// //   Row,
// //   Col,
// //   Card,
// //   Form,
// //   Button,
// //   Alert,
// //   Spinner,
// //   InputGroup,
// // } from "react-bootstrap";

// // function Payment() {
// //   // State management
// //   const [id, setId] = useState("");
// //   const [type, setType] = useState(""); // 'project' or 'internship'
// //   const [institution, setInstitution] = useState(""); // Store institution name
// //   const [groupMembers, setGroupMembers] = useState([]);
// //   const [selectedMember, setSelectedMember] = useState("");
// //   const [totalAmount, setTotalAmount] = useState(0);
// //   const [balance, setBalance] = useState(0);
// //   const [payingAmount, setPayingAmount] = useState("");
// //   const [paymentMethod, setPaymentMethod] = useState("cash");
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [success, setSuccess] = useState("");

// //   // Refs for debouncing
// //   const timeoutRef = useRef(null);

// //   // Simulate API call to fetch data based on ID with debouncing
// //   useEffect(() => {
// //     // Clear previous timeout
// //     if (timeoutRef.current) {
// //       clearTimeout(timeoutRef.current);
// //     }

// //     // Reset form if ID is cleared
// //     if (id.length === 0) {
// //       resetForm();
// //       return;
// //     }

// //     // Set new timeout for API call (500ms after user stops typing)
// //     if (id.length >= 3) {
// //       timeoutRef.current = setTimeout(() => {
// //         fetchDataById(id);
// //       }, 500);
// //     }

// //     // Cleanup timeout on unmount
// //     return () => {
// //       if (timeoutRef.current) {
// //         clearTimeout(timeoutRef.current);
// //       }
// //     };
// //   }, [id]);

// //   // Mock function to simulate data fetching - now accepts any ID format
// //   const fetchDataById = async (searchId) => {
// //     setLoading(true);
// //     setError("");
    
// //     // Simulate API delay
// //     await new Promise(resolve => setTimeout(resolve, 800));
    
// //     try {
// //       // In real application, this would be an API call to check ID in database
// //       // For demo, we'll randomly assign type based on ID characteristics
      
// //       // Mock database check - any ID can be project or internship
// //       const isProject = Math.random() > 0.5; // Randomly assign type for demo
      
// //       if (isProject) {
// //         setType("project");
// //         // Mock institution detection based on ID pattern
// //         const inst = detectInstitution(searchId);
// //         setInstitution(inst);
        
// //         // Mock project data - dynamic group members based on institution
// //         const members = generateMockMembers(inst);
// //         setGroupMembers(members);
// //         setTotalAmount(7500 + Math.floor(Math.random() * 5000)); // Random amount 7500-12500
// //         setBalance(7500 + Math.floor(Math.random() * 5000));
// //       } else {
// //         setType("internship");
// //         // Mock institution detection based on ID pattern
// //         const inst = detectInstitution(searchId);
// //         setInstitution(inst);
// //         setGroupMembers([]);
// //         setTotalAmount(4500 + Math.floor(Math.random() * 3000)); // Random amount 4500-7500
// //         setBalance(4500 + Math.floor(Math.random() * 3000));
// //       }
      
// //     } catch (err) {
// //       setError("Failed to fetch data. Please try again.");
// //       resetForm();
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Detect institution from ID pattern (mock function)
// //   const detectInstitution = (id) => {
// //     // In real app, this would query your database
// //     // For demo, we'll use simple pattern matching
// //     if (id.includes('UNI') || id.includes('COL')) {
// //       return "University";
// //     } else if (id.includes('SCH') || id.includes('EDU')) {
// //       return "School";
// //     } else if (id.includes('TEC') || id.includes('INS')) {
// //       return "Technical Institute";
// //     } else if (id.includes('RES') || id.includes('LAB')) {
// //       return "Research Center";
// //     } else {
// //       return "Educational Institution";
// //     }
// //   };

// //   // Generate mock group members based on institution
// //   const generateMockMembers = (institution) => {
// //     const baseNames = [
// //       "Alex Johnson", "Sarah Miller", "Mike Chen", "Priya Sharma", 
// //       "David Kim", "Maria Garcia", "James Wilson", "Lisa Anderson",
// //       "Robert Brown", "Emily Davis", "Daniel Martinez", "Sophia Taylor"
// //     ];
    
// //     // Shuffle and return 4-6 random members
// //     const shuffled = [...baseNames].sort(() => 0.5 - Math.random());
// //     return shuffled.slice(0, 4 + Math.floor(Math.random() * 3));
// //   };

// //   // Reset form fields
// //   const resetForm = () => {
// //     setType("");
// //     setInstitution("");
// //     setGroupMembers([]);
// //     setSelectedMember("");
// //     setTotalAmount(0);
// //     setBalance(0);
// //     setPayingAmount("");
// //     setPaymentMethod("cash");
// //   };

// //   // Handle ID input change
// //   const handleIdChange = (e) => {
// //     const value = e.target.value.toUpperCase();
// //     setId(value);
// //   };

// //   // Handle payment amount change
// //   const handleAmountChange = (e) => {
// //     const amount = e.target.value;
// //     setPayingAmount(amount);
    
// //     // Validate paying amount doesn't exceed balance
// //     if (amount > balance) {
// //       setError("Paying amount cannot exceed balance");
// //     } else {
// //       setError("");
// //     }
// //   };

// //   // Handle form submission
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError("");
// //     setSuccess("");

// //     // Validation
// //     if (!id) {
// //       setError("Please enter an ID");
// //       setLoading(false);
// //       return;
// //     }

// //     if (type === "project" && !selectedMember) {
// //       setError("Please select a group member");
// //       setLoading(false);
// //       return;
// //     }

// //     if (!payingAmount || payingAmount <= 0) {
// //       setError("Please enter a valid payment amount");
// //       setLoading(false);
// //       return;
// //     }

// //     if (payingAmount > balance) {
// //       setError("Paying amount cannot exceed balance");
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       // Simulate API call for payment processing
// //       await new Promise(resolve => setTimeout(resolve, 1500));
      
// //       // Mock payment processing
// //       const newBalance = balance - parseFloat(payingAmount);
// //       setBalance(newBalance);
      
// //       // Mock receipt sending
// //       await sendReceipt();
      
// //       setSuccess(`Payment of ₹${payingAmount} processed successfully! Receipt sent to ${selectedMember || "the student"}.`);
// //       setPayingAmount("");
      
// //     } catch (err) {
// //       setError("Payment processing failed. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Mock function to send receipt
// //   const sendReceipt = async () => {
// //     // In real application, this would integrate with SMS/email service
// //     const recipient = type === "project" ? selectedMember : "Student";
// //     console.log(`Receipt sent to ${recipient} for payment of ₹${payingAmount} via ${paymentMethod} for ${id} (${institution})`);
// //     // Simulate API call
// //     await new Promise(resolve => setTimeout(resolve, 500));
// //     return true;
// //   };

// //   // Handle cancel
// //   const handleCancel = () => {
// //     resetForm();
// //     setId("");
// //     setError("");
// //     setSuccess("");
// //   };

// //   return (
// //     <Container fluid>
// //       <Row className="mb-4">
// //         <Col>
// //           <h2 className="text-white">Payment Management</h2>
// //           <p className="text-light">Process payments for projects and internships from any institution</p>
// //         </Col>
// //       </Row>

// //       <Row>
// //         <Col lg={8} className="mx-auto">
// //           <Card className="custom-card">
// //             <Card.Body>
// //               {/* Success/Error Alerts */}
// //               {error && <Alert variant="danger">{error}</Alert>}
// //               {success && <Alert variant="success">{success}</Alert>}

// //               <Form onSubmit={handleSubmit}>
// //                 {/* ID Input Row */}
// //                 <Row className="mb-4">
// //                   <Col md={6}>
// //                     <Form.Group>
// //                       <Form.Label className="labels">ID Number</Form.Label>
// //                       <InputGroup>
// //                         <Form.Control
// //                           type="text"
// //                           placeholder="Enter any project or internship ID..."
// //                           value={id}
// //                           onChange={handleIdChange}
// //                           className="custom-input"
// //                           disabled={loading}
// //                           style={{
// //                             background: "rgba(255, 255, 255, 0.1)",
// //                             border: "1px solid rgba(255, 255, 255, 0.2)",
// //                             color: "white",
// //                           }}
// //                         />
// //                         {loading && (
// //                           <InputGroup.Text
// //                             style={{
// //                               background: "rgba(255, 255, 255, 0.1)",
// //                               border: "1px solid rgba(255, 255, 255, 0.2)",
// //                               color: "white",
// //                             }}
// //                           >
// //                             <Spinner animation="border" size="sm" variant="light" />
// //                           </InputGroup.Text>
// //                         )}
// //                       </InputGroup>
// //                       <Form.Text className="text-muted">
// //                         Enter any valid project or internship ID from any institution
// //                       </Form.Text>
// //                     </Form.Group>
// //                   </Col>
// //                 </Row>

// //                 {/* Loading Indicator */}
// //                 {loading && !type && (
// //                   <Row className="mb-4">
// //                     <Col>
// //                       <div className="text-center">
// //                         <Spinner animation="border" variant="light" />
// //                         <p className="text-light mt-2">Fetching data...</p>
// //                       </div>
// //                     </Col>
// //                   </Row>
// //                 )}

// //                 {/* Conditional Fields based on Type */}
// //                 {type && (
// //                   <>
// //                     {/* Institution and Type Info */}
// //                     <Row className="mb-3">
// //                       <Col md={6}>
// //                         <div className="d-flex gap-4">
// //                           <div>
// //                             <small className="text-muted">Institution</small>
// //                             <div className="text-white fw-bold">{institution}</div>
// //                           </div>
// //                           <div>
// //                             <small className="text-muted">Type</small>
// //                             <div className="text-white fw-bold text-capitalize">{type}</div>
// //                           </div>
// //                         </div>
// //                       </Col>
// //                     </Row>

// //                     {/* Group Member Dropdown for Projects */}
// //                     {type === "project" && (
// //                       <Row className="mb-4">
// //                         <Col md={6}>
// //                           <Form.Group>
// //                             <Form.Label className="labels">Select Group Member</Form.Label>
// //                             <Form.Select
// //                               value={selectedMember}
// //                               onChange={(e) => setSelectedMember(e.target.value)}
// //                               className="custom-input"
// //                               disabled={loading}
// //                               style={{
// //                                 background: "#000000",
// //                                 border: "1px solid rgba(255, 255, 255, 0.3)",
// //                                 color: "white",
// //                                 appearance: "none",
// //                                 backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e")`,
// //                                 backgroundRepeat: "no-repeat",
// //                                 backgroundPosition: "right 0.75rem center",
// //                                 backgroundSize: "16px 12px"
// //                               }}
// //                             >
// //                               <option value="" style={{ background: "#000000", color: "white" }}>
// //                                 Choose a member...
// //                               </option>
// //                               {groupMembers.map((member, index) => (
// //                                 <option 
// //                                   key={index} 
// //                                   value={member}
// //                                   style={{ background: "#000000", color: "white" }}
// //                                 >
// //                                   {member}
// //                                 </option>
// //                               ))}
// //                             </Form.Select>
// //                           </Form.Group>
// //                         </Col>
// //                       </Row>
// //                     )}

// //                     {/* Total Amount Display */}
// //                     <Row className="mb-3">
// //                       <Col md={6}>
// //                         <Form.Group>
// //                           <Form.Label className="labels">Total Amount</Form.Label>
// //                           <Form.Control
// //                             type="text"
// //                             value={`₹${totalAmount.toLocaleString()}`}
// //                             className="custom-input"
// //                             readOnly
// //                             style={{
// //                               background: "rgba(255, 255, 255, 0.1)",
// //                               border: "1px solid rgba(255, 255, 255, 0.2)",
// //                               color: "white",
// //                             }}
// //                           />
// //                         </Form.Group>
// //                       </Col>
// //                     </Row>

// //                     {/* Balance Display */}
// //                     <Row className="mb-3">
// //                       <Col md={6}>
// //                         <Form.Group>
// //                           <Form.Label className="labels">Current Balance</Form.Label>
// //                           <Form.Control
// //                             type="text"
// //                             value={`₹${balance.toLocaleString()}`}
// //                             className="custom-input"
// //                             readOnly
// //                             style={{
// //                               background: "rgba(255, 255, 255, 0.1)",
// //                               border: "1px solid rgba(255, 255, 255, 0.2)",
// //                               color: "white",
// //                             }}
// //                           />
// //                         </Form.Group>
// //                       </Col>
// //                     </Row>

// //                     {/* Payment Amount Input */}
// //                     <Row className="mb-4">
// //                       <Col md={6}>
// //                         <Form.Group>
// //                           <Form.Label className="labels">Amount to Pay</Form.Label>
// //                           <InputGroup>
// //                             <InputGroup.Text 
// //                               style={{
// //                                 background: "rgba(255, 255, 255, 0.1)",
// //                                 border: "1px solid rgba(255, 255, 255, 0.2)",
// //                                 color: "white",
// //                                 borderRight: "none"
// //                               }}
// //                             >
// //                               ₹
// //                             </InputGroup.Text>
// //                             <Form.Control
// //                               type="number"
// //                               placeholder="Enter amount"
// //                               value={payingAmount}
// //                               onChange={handleAmountChange}
// //                               className="custom-input"
// //                               disabled={loading || balance === 0}
// //                               min="1"
// //                               max={balance}
// //                               style={{
// //                                 background: "rgba(255, 255, 255, 0.1)",
// //                                 border: "1px solid rgba(255, 255, 255, 0.2)",
// //                                 color: "white",
// //                                 borderLeft: "none"
// //                               }}
// //                             />
// //                           </InputGroup>
// //                           {balance === 0 && (
// //                             <Form.Text className="text-success">
// //                               Payment completed! No balance remaining.
// //                             </Form.Text>
// //                           )}
// //                         </Form.Group>
// //                       </Col>
// //                     </Row>

// //                     {/* Payment Method Radio */}
// //                     <Row className="mb-4">
// //                       <Col>
// //                         <Form.Label className="labels">Payment Method</Form.Label>
// //                         <div>
// //                           <Form.Check
// //                             inline
// //                             type="radio"
// //                             label="Cash"
// //                             name="paymentMethod"
// //                             value="cash"
// //                             checked={paymentMethod === "cash"}
// //                             onChange={(e) => setPaymentMethod(e.target.value)}
// //                             className="text-light"
// //                             disabled={loading}
// //                           />
// //                           <Form.Check
// //                             inline
// //                             type="radio"
// //                             label="GPay"
// //                             name="paymentMethod"
// //                             value="gpay"
// //                             checked={paymentMethod === "gpay"}
// //                             onChange={(e) => setPaymentMethod(e.target.value)}
// //                             className="text-light"
// //                             disabled={loading}
// //                           />
// //                         </div>
// //                       </Col>
// //                     </Row>

// //                     {/* Action Buttons */}
// //                     <Row className="mb-3">
// //                       <Col>
// //                         <Button
// //                           variant="primary"
// //                           type="submit"
// //                           className="buttons me-3"
// //                           disabled={loading || !payingAmount || payingAmount <= 0 || payingAmount > balance}
// //                           style={{ minWidth: "140px" }}
// //                         >
// //                           {loading ? (
// //                             <>
// //                               <Spinner
// //                                 animation="border"
// //                                 size="sm"
// //                                 className="me-2"
// //                               />
// //                               Processing...
// //                             </>
// //                           ) : (
// //                             "Update Payment"
// //                           )}
// //                         </Button>
// //                         <Button
// //                           variant="outline-light"
// //                           onClick={handleCancel}
// //                           disabled={loading}
// //                           className="buttons2"
// //                           style={{ minWidth: "100px" }}
// //                         >
// //                           Cancel
// //                         </Button>
// //                       </Col>
// //                     </Row>
// //                   </>
// //                 )}

// //                 {/* Instructions when no ID entered */}
// //                 {!type && !loading && (
// //                   <Row>
// //                     <Col>
// //                       <Alert variant="info" className="text-dark">
// //                         <h6>How to use:</h6>
// //                         <ul className="mb-0">
// //                           <li>Enter any valid project or internship ID from any institution</li>
// //                           <li>The system will automatically detect if it's a project or internship</li>
// //                           <li>For projects, select the group member making the payment</li>
// //                           <li>Enter the payment amount and choose payment method</li>
// //                           <li>Click "Update Payment" to process and send receipt</li>
// //                         </ul>
// //                       </Alert>
// //                     </Col>
// //                   </Row>
// //                 )}
// //               </Form>
// //             </Card.Body>
// //           </Card>
// //         </Col>
// //       </Row>
// //     </Container>
// //   );
// // }

// // export default Payment;

// // import React, { useState, useRef } from "react";
// // import {
// //   Container,
// //   Row,
// //   Col,
// //   Card,
// //   Form,
// //   Button,
// //   Alert,
// //   Spinner,
// //   InputGroup,
// // } from "react-bootstrap";

// // function Payment() {
// //   // State management
// //   const [id, setId] = useState("");
// //   const [type, setType] = useState(""); // 'project' or 'internship'
// //   const [institution, setInstitution] = useState(""); // Store institution name
// //   const [groupMembers, setGroupMembers] = useState([]);
// //   const [selectedMember, setSelectedMember] = useState("");
// //   const [totalAmount, setTotalAmount] = useState(0);
// //   const [balance, setBalance] = useState(0);
// //   const [payingAmount, setPayingAmount] = useState("");
// //   const [paymentMethod, setPaymentMethod] = useState("cash");
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [success, setSuccess] = useState("");
// //   const [internName, setInternName] = useState(""); // For internship student name

// //   // Refs for search
// //   const searchTimeoutRef = useRef(null);

// //   // Reset form function
// //   const resetForm = () => {
// //     setType("");
// //     setInstitution("");
// //     setGroupMembers([]);
// //     setSelectedMember("");
// //     setTotalAmount(0);
// //     setBalance(0);
// //     setPayingAmount("");
// //     setPaymentMethod("cash");
// //     setInternName("");
// //   };

// //   // Handle ID input change
// //   const handleIdChange = (e) => {
// //     const value = e.target.value.toUpperCase();
// //     setId(value);
// //     // Clear any previous errors when user types
// //     if (error) setError("");
// //   };

// //   // Handle search button click
// //   const handleSearch = async () => {
// //     if (!id.trim()) {
// //       setError("Please enter an ID to search");
// //       return;
// //     }

// //     if (id.length < 3) {
// //       setError("Please enter at least 3 characters");
// //       return;
// //     }

// //     setLoading(true);
// //     setError("");
// //     resetForm();

// //     try {
// //       await fetchDataById(id);
// //     } catch (err) {
// //       setError("Failed to fetch data. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Mock function to simulate data fetching
// //   const fetchDataById = async (searchId) => {
// //     // Simulate API delay
// //     await new Promise(resolve => setTimeout(resolve, 800));
    
// //     try {
// //       // Mock database check - any ID can be project or internship
// //       const isProject = Math.random() > 0.5; // Randomly assign type for demo
      
// //       if (isProject) {
// //         setType("project");
// //         // Mock institution detection based on ID pattern
// //         const inst = detectInstitution(searchId);
// //         setInstitution(inst);
        
// //         // Mock project data - dynamic group members based on institution
// //         const members = generateMockMembers(inst);
// //         setGroupMembers(members);
// //         setTotalAmount(7500 + Math.floor(Math.random() * 5000)); // Random amount 7500-12500
// //         setBalance(7500 + Math.floor(Math.random() * 5000));
// //       } else {
// //         setType("internship");
// //         // Mock institution detection based on ID pattern
// //         const inst = detectInstitution(searchId);
// //         setInstitution(inst);
// //         setGroupMembers([]);
// //         setTotalAmount(4500 + Math.floor(Math.random() * 3000)); // Random amount 4500-7500
// //         setBalance(4500 + Math.floor(Math.random() * 3000));
        
// //         // Generate a mock intern name
// //         const names = [
// //           "Alex Johnson", "Sarah Miller", "Mike Chen", "Priya Sharma", 
// //           "David Kim", "Maria Garcia", "James Wilson", "Lisa Anderson",
// //           "Robert Brown", "Emily Davis", "Daniel Martinez", "Sophia Taylor"
// //         ];
// //         const randomName = names[Math.floor(Math.random() * names.length)];
// //         setInternName(randomName);
// //       }
      
// //     } catch (err) {
// //       throw new Error("Failed to fetch data");
// //     }
// //   };

// //   // Detect institution from ID pattern (mock function)
// //   const detectInstitution = (id) => {
// //     // In real app, this would query your database
// //     // For demo, we'll use simple pattern matching
// //     if (id.includes('UNI') || id.includes('COL')) {
// //       return "University";
// //     } else if (id.includes('SCH') || id.includes('EDU')) {
// //       return "School";
// //     } else if (id.includes('TEC') || id.includes('INS')) {
// //       return "Technical Institute";
// //     } else if (id.includes('RES') || id.includes('LAB')) {
// //       return "Research Center";
// //     } else {
// //       return "Educational Institution";
// //     }
// //   };

// //   // Generate mock group members based on institution
// //   const generateMockMembers = (institution) => {
// //     const baseNames = [
// //       "Alex Johnson", "Sarah Miller", "Mike Chen", "Priya Sharma", 
// //       "David Kim", "Maria Garcia", "James Wilson", "Lisa Anderson",
// //       "Robert Brown", "Emily Davis", "Daniel Martinez", "Sophia Taylor"
// //     ];
    
// //     // Shuffle and return 4-6 random members
// //     const shuffled = [...baseNames].sort(() => 0.5 - Math.random());
// //     return shuffled.slice(0, 4 + Math.floor(Math.random() * 3));
// //   };

// //   // Handle payment amount change
// //   const handleAmountChange = (e) => {
// //     const amount = e.target.value;
// //     setPayingAmount(amount);
    
// //     // Validate paying amount doesn't exceed balance
// //     if (amount > balance) {
// //       setError("Paying amount cannot exceed balance");
// //     } else {
// //       setError("");
// //     }
// //   };

// //   // Handle form submission
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError("");
// //     setSuccess("");

// //     // Validation
// //     if (!id) {
// //       setError("Please enter an ID");
// //       setLoading(false);
// //       return;
// //     }

// //     if (type === "project" && !selectedMember) {
// //       setError("Please select a group member");
// //       setLoading(false);
// //       return;
// //     }

// //     if (!payingAmount || payingAmount <= 0) {
// //       setError("Please enter a valid payment amount");
// //       setLoading(false);
// //       return;
// //     }

// //     if (payingAmount > balance) {
// //       setError("Paying amount cannot exceed balance");
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       // Simulate API call for payment processing
// //       await new Promise(resolve => setTimeout(resolve, 1500));
      
// //       // Mock payment processing
// //       const newBalance = balance - parseFloat(payingAmount);
// //       setBalance(newBalance);
      
// //       // Mock receipt sending
// //       await sendReceipt();
      
// //       setSuccess(`Payment of ₹${payingAmount} processed successfully! Receipt sent to ${selectedMember || "the student"}.`);
// //       setPayingAmount("");
      
// //     } catch (err) {
// //       setError("Payment processing failed. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Mock function to send receipt
// //   const sendReceipt = async () => {
// //     // In real application, this would integrate with SMS/email service
// //     const recipient = type === "project" ? selectedMember : "Student";
// //     console.log(`Receipt sent to ${recipient} for payment of ₹${payingAmount} via ${paymentMethod} for ${id} (${institution})`);
// //     // Simulate API call
// //     await new Promise(resolve => setTimeout(resolve, 500));
// //     return true;
// //   };

// //   // Handle cancel
// //   const handleCancel = () => {
// //     resetForm();
// //     setId("");
// //     setError("");
// //     setSuccess("");
// //   };

// //   // Handle Enter key press in ID field
// //   const handleKeyPress = (e) => {
// //     if (e.key === 'Enter') {
// //       e.preventDefault();
// //       handleSearch();
// //     }
// //   };

// //   return (
// //     <Container fluid className="px-3 px-md-4 px-lg-5">
      

// //       <Row>
// //         <Col  className="mx-auto">
// //           <Card className="custom-card">
// //             <Card.Body className="p-3 p-md-4">
// //               {/* Success/Error Alerts */}
// //               {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
// //               {success && <Alert variant="success" className="mb-3">{success}</Alert>}

// //               <Form onSubmit={handleSubmit}>
// //                 {/* ID Input Row */}
// //                 <Row className="mb-4">
// //                   <Col md={8} lg={6}>
// //                     <Form.Group>
// //                       <Form.Label className="labels">ID Number</Form.Label>
// //                       <InputGroup>
// //                         <Form.Control
// //                           type="text"
// //                           placeholder="Enter project or internship ID..."
// //                           value={id}
// //                           onChange={handleIdChange}
// //                           onKeyPress={handleKeyPress}
// //                           className="custom-input"
// //                           disabled={loading}
// //                           style={{
// //                             background: "rgba(255, 255, 255, 0.1)",
// //                             border: "1px solid rgba(255, 255, 255, 0.2)",
// //                             color: "white",
// //                           }}
// //                         />
// //                         <Button
// //                           variant="outline-light"
// //                           onClick={handleSearch}
// //                           disabled={loading || !id.trim()}
// //                           style={{
// //                             background: "rgba(255, 255, 255, 0.1)",
// //                             border: "1px solid rgba(255, 255, 255, 0.2)",
// //                             color: "white",
// //                             minWidth: "10px"
// //                           }}
// //                         >
// //                           {loading ? (
// //                             <Spinner animation="border" size="sm" variant="light" />
// //                           ) : (
// //                             <>
// //                               <i className="bi bi-search me-1"></i>
// //                             </>
// //                           )}
// //                         </Button>
// //                       </InputGroup>
// //                       <Form.Text className="text-secondary">
// //                         Enter any valid project or internship ID and click Search
// //                       </Form.Text>
// //                     </Form.Group>
// //                   </Col>
// //                 </Row>

// //                 {/* Conditional Fields based on Type */}
// //                 {type && (
// //                   <>
// //                     {/* Institution and Type Info */}
// //                     <Row className="mb-3">
// //                       <Col md={8} lg={6}>
// //                         <div className="d-flex flex-wrap gap-4">
// //                           <div className="mb-2 mb-md-0">
// //                             <small className="text-light">Institution</small>
// //                             <div className="text-white fw-bold">{institution}</div>
// //                           </div>
// //                           <div className="mb-2 mb-md-0">
// //                             <small className="text-light">Type</small>
// //                             <div className="text-white fw-bold text-capitalize">{type}</div>
// //                           </div>
// //                           {type === "internship" && internName && (
// //                             <div className="mb-2 mb-md-0">
// //                               <small className="text-muted">Intern Name</small>
// //                               <div className="text-white fw-bold">{internName}</div>
// //                             </div>
// //                           )}
// //                         </div>
// //                       </Col>
// //                     </Row>

// //                     {/* Group Member Dropdown for Projects */}
// //                     {type === "project" && (
// //                       <Row className="mb-4">
// //                         <Col md={8} lg={6}>
// //                           <Form.Group>
// //                             <Form.Label className="labels">Select Group Member</Form.Label>
// //                             <Form.Select
// //                               value={selectedMember}
// //                               onChange={(e) => setSelectedMember(e.target.value)}
// //                               className="custom-input"
// //                               disabled={loading}
// //                               style={{
// //                                 background: "#000000",
// //                                 border: "1px solid rgba(255, 255, 255, 0.3)",
// //                                 color: "white",
// //                                 appearance: "none",
// //                                 backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e")`,
// //                                 backgroundRepeat: "no-repeat",
// //                                 backgroundPosition: "right 0.75rem center",
// //                                 backgroundSize: "16px 12px"
// //                               }}
// //                             >
// //                               <option value="" style={{ background: "#000000", color: "white" }}>
// //                                 Choose a member...
// //                               </option>
// //                               {groupMembers.map((member, index) => (
// //                                 <option 
// //                                   key={index} 
// //                                   value={member}
// //                                   style={{ background: "#000000", color: "white" }}
// //                                 >
// //                                   {member}
// //                                 </option>
// //                               ))}
// //                             </Form.Select>
// //                           </Form.Group>
// //                         </Col>
// //                       </Row>
// //                     )}

// //                     {/* Total Amount Display */}
// //                     <Row className="mb-3">
// //                       <Col md={8} lg={6}>
// //                         <Form.Group>
// //                           <Form.Label className="labels">Total Amount</Form.Label>
// //                           <Form.Control
// //                             type="text"
// //                             value={`₹${totalAmount.toLocaleString()}`}
// //                             className="custom-input"
// //                             readOnly
// //                             style={{
// //                               background: "rgba(255, 255, 255, 0.1)",
// //                               border: "1px solid rgba(255, 255, 255, 0.2)",
// //                               color: "white",
// //                             }}
// //                           />
// //                         </Form.Group>
// //                       </Col>
// //                     </Row>

// //                     {/* Balance Display */}
// //                     <Row className="mb-3">
// //                       <Col md={8} lg={6}>
// //                         <Form.Group>
// //                           <Form.Label className="labels">Current Balance</Form.Label>
// //                           <Form.Control
// //                             type="text"
// //                             value={`₹${balance.toLocaleString()}`}
// //                             className="custom-input"
// //                             readOnly
// //                             style={{
// //                               background: "rgba(255, 255, 255, 0.1)",
// //                               border: "1px solid rgba(255, 255, 255, 0.2)",
// //                               color: "white",
// //                             }}
// //                           />
// //                         </Form.Group>
// //                       </Col>
// //                     </Row>

// //                     {/* Payment Amount Input */}
// //                     <Row className="mb-4">
// //                       <Col md={8} lg={6}>
// //                         <Form.Group>
// //                           <Form.Label className="labels">Amount to Pay</Form.Label>
// //                           <InputGroup>
// //                             <InputGroup.Text 
// //                               style={{
// //                                 background: "rgba(255, 255, 255, 0.1)",
// //                                 border: "1px solid rgba(255, 255, 255, 0.2)",
// //                                 color: "white",
// //                                 borderRight: "none"
// //                               }}
// //                             >
// //                               ₹
// //                             </InputGroup.Text>
// //                             <Form.Control
// //                               type="number"
// //                               placeholder="Enter amount"
// //                               value={payingAmount}
// //                               onChange={handleAmountChange}
// //                               className="custom-input"
// //                               disabled={loading || balance === 0}
// //                               min="1"
// //                               max={balance}
// //                               style={{
// //                                 background: "rgba(255, 255, 255, 0.1)",
// //                                 border: "1px solid rgba(255, 255, 255, 0.2)",
// //                                 color: "white",
// //                                 borderLeft: "none"
// //                               }}
// //                             />
// //                           </InputGroup>
// //                           {balance === 0 && (
// //                             <Form.Text className="text-success">
// //                               Payment completed! No balance remaining.
// //                             </Form.Text>
// //                           )}
// //                         </Form.Group>
// //                       </Col>
// //                     </Row>

// //                     {/* Payment Method Radio */}
// //                     <Row className="mb-4">
// //                       <Col md={8} lg={6}>
// //                         <Form.Label className="labels">Payment Method</Form.Label>
// //                         <div className="d-flex flex-wrap gap-3">
// //                           <Form.Check
// //                             type="radio"
// //                             label="Cash"
// //                             name="paymentMethod"
// //                             value="cash"
// //                             checked={paymentMethod === "cash"}
// //                             onChange={(e) => setPaymentMethod(e.target.value)}
// //                             className="text-light"
// //                             disabled={loading}
// //                           />
// //                           <Form.Check
// //                             type="radio"
// //                             label="GPay"
// //                             name="paymentMethod"
// //                             value="gpay"
// //                             checked={paymentMethod === "gpay"}
// //                             onChange={(e) => setPaymentMethod(e.target.value)}
// //                             className="text-light"
// //                             disabled={loading}
// //                           />
// //                         </div>
// //                       </Col>
// //                     </Row>

// //                     {/* Action Buttons */}
// //                     <Row className="mb-3">
// //                       <Col>
// //                         <div className="d-flex flex-wrap gap-2">
// //                           <Button
// //                             variant="primary"
// //                             type="submit"
// //                             className="buttons me-2"
// //                             disabled={loading || !payingAmount || payingAmount <= 0 || payingAmount > balance}
// //                             style={{ minWidth: "140px" }}
// //                           >
// //                             {loading ? (
// //                               <>
// //                                 <Spinner
// //                                   animation="border"
// //                                   size="sm"
// //                                   className="me-2"
// //                                 />
// //                                 Processing...
// //                               </>
// //                             ) : (
// //                               "Update Payment"
// //                             )}
// //                           </Button>
// //                           <Button
// //                             variant="outline-light"
// //                             onClick={handleCancel}
// //                             disabled={loading}
// //                             className="buttons2"
// //                             style={{ minWidth: "100px" }}
// //                           >
// //                             Cancel
// //                           </Button>
// //                         </div>
// //                       </Col>
// //                     </Row>
// //                   </>
// //                 )}

// //                 {/* Instructions when no ID entered or no data loaded */}
// //                 {!type && !loading && (
// //                   <Row>
// //                     <Col>
// //                       <Alert variant="info" className="text-light mt-3">
// //                         <h6>How to use:</h6>
// //                         <ul className="mb-0">
// //                           <li>Enter any valid project or internship ID from any institution</li>
// //                           <li>Click the Search button to find the record</li>
// //                           <li>The system will detect if it's a project or internship</li>
// //                           <li>For internships, the intern's name will be displayed</li>
// //                           <li>For projects, select the group member making the payment</li>
// //                           <li>Enter the payment amount and choose payment method</li>
// //                           <li>Click "Update Payment" to process and send receipt</li>
// //                         </ul>
// //                       </Alert>
// //                     </Col>
// //                   </Row>
// //                 )}
// //               </Form>
// //             </Card.Body>
// //           </Card>
// //         </Col>
// //       </Row>
// //     </Container>
// //   );
// // }

// // export default Payment;


// import React, { useState } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Form,
//   Button,
//   Alert,
//   Spinner,
//   InputGroup,
// } from "react-bootstrap";
// import axios from "axios";
// import api from "../../api";

// function Payment() {
//   // State management
//   const [id, setId] = useState("");
//   const [type, setType] = useState(""); // 'project' or 'internship'
//   const [institution, setInstitution] = useState("");
//   const [groupMembers, setGroupMembers] = useState([]);
//   const [selectedMember, setSelectedMember] = useState("");
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [balance, setBalance] = useState(0);
//   const [payingAmount, setPayingAmount] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("cash");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [internName, setInternName] = useState("");

//   // Reset form function
//   const resetForm = () => {
//     setType("");
//     setInstitution("");
//     setGroupMembers([]);
//     setSelectedMember("");
//     setTotalAmount(0);
//     setBalance(0);
//     setPayingAmount("");
//     setPaymentMethod("cash");
//     setInternName("");
//   };

//   // Handle ID input change
//   const handleIdChange = (e) => {
//     setId(e.target.value.toUpperCase());
//     if (error) setError("");
//   };

//   // Handle Enter key press in ID field
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       handleSearch();
//     }
//   };

//   // Handle search button click
//   const handleSearch = async () => {
//     if (!id.trim()) {
//       setError("Please enter an ID to search");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     resetForm();

//     try {
//       // const response = await axios.get(
//       //   `http://localhost:5000/api/registrations/names?groupNo=${id}`
//       // );
//       const response = await api.get(`/registrations/names?id=${id}`)
//       console.log(response);
      
//       // const data = response.data.data;
      
// const data = response.data.data[0];

//       if (!data || Object.keys(data).length === 0) {
//         setError("No data found for this ID");
//         setLoading(false);
//         return;
//       }

//       // Assuming backend sends:
//       // { type: 'project' or 'internship', institution: '', groupMembers: [], internName: '', totalAmount: number, balance: number }

//       setType(data.type);
//       setInstitution(data.college || "");
//       setGroupMembers(data.groupMembers || []);
//       setSelectedMember(data.groupMembers?.[0] || "");
//       setInternName(data.internName || "");
//       setTotalAmount(data.fees || 0);
//       setBalance(data.balance || 0);
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || "Failed to fetch data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle payment amount change
//   const handleAmountChange = (e) => {
//     const amount = e.target.value;
//     setPayingAmount(amount);

//     if (amount > balance) {
//       setError("Paying amount cannot exceed balance");
//     } else {
//       setError("");
//     }
//   };

//   // Handle cancel
//   const handleCancel = () => {
//     resetForm();
//     setId("");
//     setError("");
//     setSuccess("");
//   };

//   return (
//     <Container fluid className="px-3 px-md-4 px-lg-5">
//       <Row>
//         <Col className="mx-auto">
//           <Card className="custom-card">
//             <Card.Body className="p-3 p-md-4">
//               {/* Success/Error Alerts */}
//               {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
//               {success && <Alert variant="success" className="mb-3">{success}</Alert>}

//               <Form>
//                 {/* ID Input Row */}
//                 <Row className="mb-4">
//                   <Col md={8} lg={6}>
//                     <Form.Group>
//                       <Form.Label className="labels">ID Number</Form.Label>
//                       <InputGroup>
//                         <Form.Control
//                           type="text"
//                           placeholder="Enter project or internship ID..."
//                           value={id}
//                           onChange={handleIdChange}
//                           onKeyPress={handleKeyPress}
//                           className="custom-input"
//                           disabled={loading}
//                           style={{
//                             background: "rgba(255, 255, 255, 0.1)",
//                             border: "1px solid rgba(255, 255, 255, 0.2)",
//                             color: "white",
//                           }}
//                         />
//                         <Button
//                           variant="outline-light"
//                           onClick={handleSearch}
//                           disabled={loading || !id.trim()}
//                           style={{
//                             background: "rgba(255, 255, 255, 0.1)",
//                             border: "1px solid rgba(255, 255, 255, 0.2)",
//                             color: "white",
//                             minWidth: "10px",
//                           }}
//                         >
//                           {loading ? (
//                             <Spinner animation="border" size="sm" variant="light" />
//                           ) : (
//                             <i className="bi bi-search me-1"></i>
//                           )}
//                         </Button>
//                       </InputGroup>
//                       <Form.Text className="text-secondary">
//                         Enter any valid project or internship ID and click Search
//                       </Form.Text>
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 {/* Conditional Fields based on Type */}
//                 {type && (
//                   <>
//                     {/* Institution and Type Info */}
//                     <Row className="mb-3">
//                       <Col md={8} lg={6}>
//                         <div className="d-flex flex-wrap gap-4">
//                           <div className="mb-2 mb-md-0">
//                             <small className="text-light">College</small>
//                             <div className="text-white fw-bold">{institution}</div>
//                           </div>
//                           <div className="mb-2 mb-md-0">
//                             <small className="text-light">Type</small>
//                             <div className="text-white fw-bold text-capitalize">{type}</div>
//                           </div>
//                           {type === "internship" && internName && (
//                             <div className="mb-2 mb-md-0">
//                               <small className="text-muted">Intern Name</small>
//                               <div className="text-white fw-bold">{internName}</div>
//                             </div>
//                           )}
//                         </div>
//                       </Col>
//                     </Row>

//                     {/* Group Member Dropdown for Projects */}
//                     {type === "project" && (
//                       <Row className="mb-4">
//                         <Col md={8} lg={6}>
//                           <Form.Group>
//                             <Form.Label className="labels">Select Group Member</Form.Label>
//                             <Form.Select
//                               value={selectedMember}
//                               onChange={(e) => setSelectedMember(e.target.value)}
//                               className="custom-input"
//                               disabled={loading}
//                               style={{
//                                 background: "#000000",
//                                 border: "1px solid rgba(255, 255, 255, 0.3)",
//                                 color: "white",
//                                 appearance: "none",
//                                 backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e")`,
//                                 backgroundRepeat: "no-repeat",
//                                 backgroundPosition: "right 0.75rem center",
//                                 backgroundSize: "16px 12px"
//                               }}
//                             >
//                               <option value="" style={{ background: "#000000", color: "white" }}>
//                                 Choose a member...
//                               </option>
//                               {groupMembers.map((member, index) => (
//   <option 
//     key={index} 
//     value={member._id || member.regNumber || member.name} // value should be something unique
//     style={{ background: "#000000", color: "white" }}
//   >
//     {member.name || member.regNumber || `Member ${index + 1}`}
//   </option>
// ))}
//                             </Form.Select>
//                           </Form.Group>
//                         </Col>
//                       </Row>
//                     )}

//                     {/* Total Amount Display */}
//                     <Row className="mb-3">
//                       <Col md={8} lg={6}>
//                         <Form.Group>
//                           <Form.Label className="labels">Total Amount</Form.Label>
//                           <Form.Control
//                             type="text"
//                             value={`₹${totalAmount.toLocaleString()}`}
//                             className="custom-input"
//                             readOnly
//                             style={{
//                               background: "rgba(255, 255, 255, 0.1)",
//                               border: "1px solid rgba(255, 255, 255, 0.2)",
//                               color: "white",
//                             }}
//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>

//                     {/* Balance Display */}
//                     <Row className="mb-3">
//                       <Col md={8} lg={6}>
//                         <Form.Group>
//                           <Form.Label className="labels">Current Balance</Form.Label>
//                           <Form.Control
//                             type="text"
//                             value={`₹${balance.toLocaleString()}`}
//                             className="custom-input"
//                             readOnly
//                             style={{
//                               background: "rgba(255, 255, 255, 0.1)",
//                               border: "1px solid rgba(255, 255, 255, 0.2)",
//                               color: "white",
//                             }}
//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>
//                             {/* Payment Amount Input */}
// <Row className="mb-4">
//   <Col md={8} lg={6}>
//     <Form.Group>
//       <Form.Label className="labels">Amount to Pay</Form.Label>
//       <InputGroup>
//         <InputGroup.Text 
//           style={{
//             background: "rgba(255, 255, 255, 0.1)",
//             border: "1px solid rgba(255, 255, 255, 0.2)",
//             color: "white",
//             borderRight: "none"
//           }}
//         >
//           ₹
//         </InputGroup.Text>
//         <Form.Control
//           type="number"
//           placeholder="Enter amount"
//           value={payingAmount}
//           onChange={handleAmountChange}
//           className="custom-input"
//           disabled={loading || balance === 0}
//           min="1"
//           max={balance}
//           style={{
//             background: "rgba(255, 255, 255, 0.1)",
//             border: "1px solid rgba(255, 255, 255, 0.2)",
//             color: "white",
//             borderLeft: "none"
//           }}
//         />
//       </InputGroup>
//       {balance === 0 && (
//         <Form.Text className="text-success">
//           Payment completed! No balance remaining.
//         </Form.Text>
//       )}
//     </Form.Group>
//   </Col>
// </Row>

// {/* Payment Method Radio */}
// <Row className="mb-4">
//   <Col md={8} lg={6}>
//     <Form.Label className="labels">Payment Method</Form.Label>
//     <div className="d-flex flex-wrap gap-3">
//       <Form.Check
//         type="radio"
//         label="Cash"
//         name="paymentMethod"
//         value="cash"
//         checked={paymentMethod === "cash"}
//         onChange={(e) => setPaymentMethod(e.target.value)}
//         className="text-light"
//         disabled={loading}
//       />
//       <Form.Check
//         type="radio"
//         label="GPay"
//         name="paymentMethod"
//         value="gpay"
//         checked={paymentMethod === "gpay"}
//         onChange={(e) => setPaymentMethod(e.target.value)}
//         className="text-light"
//         disabled={loading}
//       />
//     </div>
//   </Col>
// </Row>

// {/* Action Buttons */}
// <Row className="mb-3">
//   <Col>
//     <div className="d-flex flex-wrap gap-2">
//       <Button
//         variant="primary"
//         type="submit"
//         className="buttons me-2"
//         disabled={loading || !payingAmount || payingAmount <= 0 || payingAmount > balance}
//         style={{ minWidth: "140px" }}
//       >
//         {loading ? (
//           <>
//             <Spinner
//               animation="border"
//               size="sm"
//               className="me-2"
//             />
//             Processing...
//           </>
//         ) : (
//           "Update Payment"
//         )}
//       </Button>
//       <Button
//         variant="outline-light"
//         onClick={handleCancel}
//         disabled={loading}
//         className="buttons2"
//         style={{ minWidth: "100px" }}
//       >
//         Cancel
//       </Button>
//     </div>
//   </Col>
// </Row>
                    

                    
//                   </>
//                 )}
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default Payment;


// import React, { useState } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Form,
//   Button,
//   Alert,
//   Spinner,
//   InputGroup,
// } from "react-bootstrap";
// import axios from "axios";
// import api from "../../api";

// function Payment() {
//   // State management
//   const [id, setId] = useState("");
//   const [type, setType] = useState(""); // 'project' or 'internship'
//   const [institution, setInstitution] = useState("");
//   const [groupMembers, setGroupMembers] = useState([]);
//   const [selectedMember, setSelectedMember] = useState("");
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [balance, setBalance] = useState(0);
//   const [payingAmount, setPayingAmount] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("cash");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [internName, setInternName] = useState("");
//   const [category, setCategory] = useState("");

//   // Reset form function
//   const resetForm = () => {
//     setType("");
//     setInstitution("");
//     setGroupMembers([]);
//     setSelectedMember("");
//     setTotalAmount(0);
//     setBalance(0);
//     setPayingAmount("");
//     setPaymentMethod("cash");
//     setInternName("");
//   };

//   // Handle ID input change
//   const handleIdChange = (e) => {
//     setId(e.target.value.toUpperCase());
//     if (error) setError("");
//   };

//   // Handle Enter key press in ID field
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       handleSearch();
//     }
//   };

//   // Handle search button click
//   const handleSearch = async () => {
//     if (!id.trim()) {
//       setError("Please enter an ID to search");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     resetForm();

//     try {
//       const response = await api.get(`/registrations/names?id=${id}`)
//       console.log(response);
      
//       const data = response.data.data[0];

//       if (!data || Object.keys(data).length === 0) {
//         setError("No data found for this ID");
//         setLoading(false);
//         return;
//       }

//       setType(data.type);
//       setInstitution(data.college || "");
//       setGroupMembers(data.groupMembers || []);
//       setSelectedMember(data.groupMembers?.[0] || "");
//       setInternName(data.studentName || "");
//       setTotalAmount(data.fees || 0);
//       setBalance(data.balance || 0);
//       setCategory(data.category || "")
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || "Failed to fetch data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle payment amount change
//   const handleAmountChange = (e) => {
//     const amount = e.target.value;
//     setPayingAmount(amount);

//     if (amount > balance) {
//       setError("Paying amount cannot exceed balance");
//     } else {
//       setError("");
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!payingAmount || payingAmount <= 0) {
//       setError("Please enter a valid payment amount");
//       return;
//     }

//     if (parseFloat(payingAmount) > balance) {
//       setError("Paying amount cannot exceed balance");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       const paymentData = {
//         id: id,
//         type: type,
//         paidAmount: parseFloat(payingAmount),
//         paymentMethod: paymentMethod,
//         category:category,
//         institution: institution,
//         ...(type === "project" && { 
//           groupMember: selectedMember 
//         }),
//         ...(type === "internship" && { 
//           internName: internName 
//         })
//       };

//       const response = await api.post("/payment", paymentData);
      
//       if (response.data.success) {
//         setSuccess("Payment updated successfully!");
//         // Update the balance locally
//         setBalance(prevBalance => prevBalance - parseFloat(payingAmount));
//         setPayingAmount("");
        
//         // If balance becomes zero after payment, show completion message
//         if (balance - parseFloat(payingAmount) === 0) {
//           setSuccess("Payment completed! No balance remaining.");
//         }
//       } else {
//         setError(response.data.message || "Failed to update payment");
//       }
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || "Failed to process payment");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle cancel
//   const handleCancel = () => {
//     resetForm();
//     setId("");
//     setError("");
//     setSuccess("");
//   };

//   return (
//     <Container fluid className="px-3 px-md-4 px-lg-5">
//       <Row>
//         <Col className="mx-auto">
//           <Card className="custom-card">
//             <Card.Body className="p-3 p-md-4">
//               {/* Success/Error Alerts */}
//               {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
//               {success && <Alert variant="success" className="mb-3">{success}</Alert>}

//               <Form onSubmit={handleSubmit}>
//                 {/* ID Input Row */}
//                 <Row className="mb-4">
//                   <Col md={8} lg={6}>
//                     <Form.Group>
//                       <Form.Label className="labels">ID Number</Form.Label>
//                       <InputGroup>
//                         <Form.Control
//                           type="text"
//                           placeholder="Enter project or internship ID..."
//                           value={id}
//                           onChange={handleIdChange}
//                           onKeyPress={handleKeyPress}
//                           className="custom-input"
//                           disabled={loading}
//                           style={{
//                             background: "rgba(255, 255, 255, 0.1)",
//                             border: "1px solid rgba(255, 255, 255, 0.2)",
//                             color: "white",
//                           }}
//                         />
//                         <Button
//                           variant="outline-light"
//                           onClick={handleSearch}
//                           disabled={loading || !id.trim()}
//                           style={{
//                             background: "rgba(255, 255, 255, 0.1)",
//                             border: "1px solid rgba(255, 255, 255, 0.2)",
//                             color: "white",
//                             minWidth: "10px",
//                           }}
//                         >
//                           {loading ? (
//                             <Spinner animation="border" size="sm" variant="light" />
//                           ) : (
//                             <i className="bi bi-search me-1"></i>
//                           )}
//                         </Button>
//                       </InputGroup>
//                       <Form.Text className="text-secondary">
//                         Enter any valid project or internship ID and click Search
//                       </Form.Text>
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 {/* Conditional Fields based on Type */}
//                 {type && (
//                   <>
//                     {/* Institution and Type Info */}
//                     <Row className="mb-3">
//                       <Col md={8} lg={6}>
//                         <div className="d-flex flex-wrap gap-4">
//                           <div className="mb-2 mb-md-0">
//                             <small className="text-light">College</small>
//                             <div className="text-white fw-bold">{institution}</div>
//                           </div>
//                           <div className="mb-2 mb-md-0">
//                             <small className="text-light">Type</small>
//                             <div className="text-white fw-bold text-capitalize">{type}</div>
//                           </div>
//                           {type === "internship" && internName && (
//                             <div className="mb-2 mb-md-0">
//                               <small className="text-light">Intern Name</small>
//                               <div className="text-white fw-bold">{internName}</div>
//                             </div>
//                           )}
//                         </div>
//                       </Col>
//                     </Row>

//                     {/* Group Member Dropdown for Projects */}
//                     {type === "project" && (
//                       <Row className="mb-4">
//                         <Col md={8} lg={6}>
//                           <Form.Group>
//                             <Form.Label className="labels">Select Group Member</Form.Label>
//                             <Form.Select
//                               value={selectedMember}
//                               onChange={(e) => setSelectedMember(e.target.value)}
//                               className="custom-input"
//                               disabled={loading}
//                               style={{
//                                 background: "#000000",
//                                 border: "1px solid rgba(255, 255, 255, 0.3)",
//                                 color: "white",
//                                 appearance: "none",
//                                 backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e")`,
//                                 backgroundRepeat: "no-repeat",
//                                 backgroundPosition: "right 0.75rem center",
//                                 backgroundSize: "16px 12px"
//                               }}
//                             >
//                               <option value="" style={{ background: "#000000", color: "white" }}>
//                                 Choose a member...
//                               </option>
//                               {groupMembers.map((member, index) => (
//                                 <option 
//                                   key={index} 
//                                   value={member._id || member.regNumber || member.name}
//                                   style={{ background: "#000000", color: "white" }}
//                                 >
//                                   {member.name || member.regNumber || `Member ${index + 1}`}
//                                 </option>
//                               ))}
//                             </Form.Select>
//                           </Form.Group>
//                         </Col>
//                       </Row>
//                     )}

//                     {/* Total Amount Display */}
//                     <Row className="mb-3">
//                       <Col md={8} lg={6}>
//                         <Form.Group>
//                           <Form.Label className="labels">Total Amount</Form.Label>
//                           <Form.Control
//                             type="text"
//                             value={`₹${totalAmount.toLocaleString()}`}
//                             className="custom-input"
//                             readOnly
//                             style={{
//                               background: "rgba(255, 255, 255, 0.1)",
//                               border: "1px solid rgba(255, 255, 255, 0.2)",
//                               color: "white",
//                             }}
//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>

//                     {/* Balance Display */}
//                     <Row className="mb-3">
//                       <Col md={8} lg={6}>
//                         <Form.Group>
//                           <Form.Label className="labels">Current Balance</Form.Label>
//                           <Form.Control
//                             type="text"
//                             value={`₹${balance.toLocaleString()}`}
//                             className="custom-input"
//                             readOnly
//                             style={{
//                               background: "rgba(255, 255, 255, 0.1)",
//                               border: "1px solid rgba(255, 255, 255, 0.2)",
//                               color: "white",
//                             }}
//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>

//                     {/* Payment Amount Input */}
//                     <Row className="mb-4">
//                       <Col md={8} lg={6}>
//                         <Form.Group>
//                           <Form.Label className="labels">Amount to Pay</Form.Label>
//                           <InputGroup>
//                             <InputGroup.Text 
//                               style={{
//                                 background: "rgba(255, 255, 255, 0.1)",
//                                 border: "1px solid rgba(255, 255, 255, 0.2)",
//                                 color: "white",
//                                 borderRight: "none"
//                               }}
//                             >
//                               ₹
//                             </InputGroup.Text>
//                             <Form.Control
//                               type="number"
//                               placeholder="Enter amount"
//                               value={payingAmount}
//                               onChange={handleAmountChange}
//                               className="custom-input"
//                               disabled={loading || balance === 0}
//                               min="1"
//                               max={balance}
//                               style={{
//                                 background: "rgba(255, 255, 255, 0.1)",
//                                 border: "1px solid rgba(255, 255, 255, 0.2)",
//                                 color: "white",
//                                 borderLeft: "none"
//                               }}
//                             />
//                           </InputGroup>
//                           {balance === 0 && (
//                             <Form.Text className="text-success">
//                               Payment completed! No balance remaining.
//                             </Form.Text>
//                           )}
//                         </Form.Group>
//                       </Col>
//                     </Row>

//                     {/* Payment Method Radio */}
//                     <Row className="mb-4">
//                       <Col md={8} lg={6}>
//                         <Form.Label className="labels">Payment Method</Form.Label>
//                         <div className="d-flex flex-wrap gap-3">
//                           <Form.Check
//                             type="radio"
//                             label="Cash"
//                             name="paymentMethod"
//                             value="cash"
//                             checked={paymentMethod === "cash"}
//                             onChange={(e) => setPaymentMethod(e.target.value)}
//                             className="text-light"
//                             disabled={loading}
//                           />
//                           <Form.Check
//                             type="radio"
//                             label="GPay"
//                             name="paymentMethod"
//                             value="gpay"
//                             checked={paymentMethod === "gpay"}
//                             onChange={(e) => setPaymentMethod(e.target.value)}
//                             className="text-light"
//                             disabled={loading}
//                           />
//                         </div>
//                       </Col>
//                     </Row>

//                     {/* Action Buttons */}
//                     <Row className="mb-3">
//                       <Col>
//                         <div className="d-flex flex-wrap gap-2">
//                           <Button
//                             variant="primary"
//                             type="submit"
//                             className="buttons me-2"
//                             disabled={loading || !payingAmount || payingAmount <= 0 || payingAmount > balance || balance === 0}
//                             style={{ minWidth: "140px" }}
//                           >
//                             {loading ? (
//                               <>
//                                 <Spinner
//                                   animation="border"
//                                   size="sm"
//                                   className="me-2"
//                                 />
//                                 Processing...
//                               </>
//                             ) : (
//                               "Update Payment"
//                             )}
//                           </Button>
//                           <Button
//                             variant="outline-light"
//                             onClick={handleCancel}
//                             disabled={loading}
//                             className="buttons2"
//                             style={{ minWidth: "100px" }}
//                           >
//                             Cancel
//                           </Button>
//                         </div>
//                       </Col>
//                     </Row>
//                   </>
//                 )}
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default Payment;



// import React, { useState } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Form,
//   Button,
//   Alert,
//   Spinner,
//   InputGroup,
// } from "react-bootstrap";
// import api from "../../api";
// import { useNavigate } from "react-router-dom";
// // import api from "../../api";

// function Payment() {
//   // State management
//   const [id, setId] = useState("");
//   const [type, setType] = useState(""); // 'project' or 'internship'
//   const [institution, setInstitution] = useState("");
//   const [groupMembers, setGroupMembers] = useState([]);
//   const [selectedMember, setSelectedMember] = useState("");
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [balance, setBalance] = useState(0);
//   const [payingAmount, setPayingAmount] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("cash");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [internName, setInternName] = useState("");
//   const [category, setCategory] = useState("");
//   const [formData, setFormData] = useState(null); // To store the complete form data

//   // Reset form function
//   const resetForm = () => {
//     setType("");
//     setInstitution("");
//     setGroupMembers([]);
//     setSelectedMember("");
//     setTotalAmount(0);
//     setBalance(0);
//     setPayingAmount("");
//     setPaymentMethod("cash");
//     setInternName("");
//     setCategory("");
//     setFormData(null);
//   };
//   const navigate = useNavigate()

//   // Handle ID input change
//   const handleIdChange = (e) => {
//     setId(e.target.value.toUpperCase());
//     if (error) setError("");
//   };

//   // Handle Enter key press in ID field
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       handleSearch();
//     }
//   };

//   // Handle search button click
//   const handleSearch = async () => {
//     console.log('ccccccccccccccclicked');
    
//     if (!id.trim()) {
//       setError("Please enter an ID to search");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     resetForm();

//     try {
//       console.log("Searching for ID:", id);
//       const response = await api.get(`/registrations/names?id=${id}`);
//       console.log("API Response:", response);
      
//       const data = response.data.data;

//       if (!data || data.length === 0) {
//         setError("No data found for this ID");
//         setLoading(false);
//         return;
//       }

//       const formData = data[0];
//       console.log("Form Data:", formData);
      
//       // Store complete form data
//       setFormData(formData);

//       // Determine type based on category or other fields
//       const detectedType = formData.category === "internship" ? "internship" : 
//                           formData.category === "project" ? "project" : 
//                           formData.type || "project"; // fallback to type field or default to project
//       console.log(detectedType,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
      
//       setType(detectedType);
//       setInstitution(formData.college || formData.institution || "");
//       setCategory(formData.category || "");
      
//       // Set group members for projects
//       if (detectedType === "project" && formData.groupMembers && formData.groupMembers.length > 0) {
//         setGroupMembers(formData.groupMembers);
//         // Set first member as default selected
//         const firstMember = formData.groupMembers[0];
//         setSelectedMember(firstMember._id || firstMember.regNumber || firstMember.name);
//       } else {
//         setGroupMembers([]);
//       }

//       // Set intern name for internships
//       if (detectedType === "internship") {
//         setInternName(formData.studentName || formData.memberName || "");
//       }

//       // Set amounts
//       setTotalAmount(formData.fees || formData.totalAmount || 0);
//       setBalance(formData.balance || formData.fees || 0);

//       console.log("Set state - Type:", detectedType, "Institution:", formData.college, "Balance:", formData.balance);

//     } catch (err) {
//       console.error("Search error:", err);
//       setError(err.response?.data?.message || "Failed to fetch data. Please check the ID and try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle payment amount change
//   const handleAmountChange = (e) => {
//     const amount = e.target.value;
//     setPayingAmount(amount);

//     if (amount > balance) {
//       setError("Paying amount cannot exceed balance");
//     } else {
//       setError("");
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!payingAmount || payingAmount <= 0) {
//       setError("Please enter a valid payment amount");
//       return;
//     }

//     if (parseFloat(payingAmount) > balance) {
//       setError("Paying amount cannot exceed balance");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       const paymentData = {
//         id: id,
//         type: type,
//         paidAmount: parseFloat(payingAmount),
//         paymentMethod: paymentMethod,
//         category: category,
//         institution: institution,
//         memberName: type === "project" ? selectedMember : internName,
//         formId: id,
//         ...(type === "project" && { 
//           groupMember: selectedMember 
//         }),
//         ...(type === "internship" && { 
//           internName: internName 
//         })
//       };

//       console.log("Submitting payment:", paymentData);
//       const response = await api.post("/payment", paymentData);
      
//       if (response.data.success) {
//         setSuccess(`Payment of ₹${payingAmount} processed successfully!`);
//         // Update the balance locally
//         setBalance(prevBalance => prevBalance - parseFloat(payingAmount));
//         setPayingAmount("");
        
//         // If balance becomes zero after payment, show completion message
//         if (balance - parseFloat(payingAmount) === 0) {
//           setSuccess("Payment completed! No balance remaining.");
//         }
//         alert('Payment Successful')
        
//       } else {
//         setError(response.data.message || "Failed to update payment");
//       }
//     } catch (err) {
//       console.error("Payment error:", err);
//       setError(err.response?.data?.message || "Failed to process payment");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle cancel
//   const handleCancel = () => {
//     resetForm();
//     setId("");
//     setError("");
//     setSuccess("");
//   };

//   // Debug: Log when type changes
//   React.useEffect(() => {
//     console.log("Current type:", type);
//     console.log("Current formData:", formData);
//   }, [type, formData]);

//   return (
//     <Container fluid className="px-3 px-md-4 px-lg-5">
//       <Row>
//         <Col className="mx-auto">
//           <Card className="custom-card">
//             <Card.Body className="p-3 p-md-4">
//               {/* Success/Error Alerts */}
//               {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
//               {success && <Alert variant="success" className="mb-3">{success}</Alert>}

//               <Form onSubmit={handleSubmit}>
//                 {/* ID Input Row */}
//                 <Row className="mb-4">
//                   <Col md={8} lg={6}>
//                     <Form.Group>
//                       <Form.Label className="labels">ID Number</Form.Label>
//                       <InputGroup>
//                         <Form.Control
//                           type="text"
//                           placeholder="Enter project or internship ID..."
//                           value={id}
//                           onChange={handleIdChange}
//                           onKeyPress={handleKeyPress}
//                           className="custom-input"
//                           disabled={loading}
//                           style={{
//                             background: "rgba(255, 255, 255, 0.1)",
//                             border: "1px solid rgba(255, 255, 255, 0.2)",
//                             color: "white",
//                           }}
//                         />
//                         <Button
//                           variant="outline-light"
//                           onClick={handleSearch}
//                           disabled={loading || !id.trim()}
//                           style={{
//                             background: "rgba(255, 255, 255, 0.1)",
//                             border: "1px solid rgba(255, 255, 255, 0.2)",
//                             color: "white",
//                             minWidth: "10px",
//                           }}
//                         >
//                           {loading ? (
//                             <Spinner animation="border" size="sm" variant="light" />
//                           ) : (
//                             <i className="bi bi-search me-1"></i>
//                           )}
//                         </Button>
//                       </InputGroup>
//                       <Form.Text className="text-secondary">
//                         Enter any valid project or internship ID and click Search
//                       </Form.Text>
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 {/* Debug info - remove in production */}
//                 {process.env.NODE_ENV === 'development' && formData && (
//                   <Row className="mb-3">
//                     <Col>
//                       <Alert variant="info" className="py-2">
//                         <small>Debug: Type: {type} | Category: {category} | Balance: {balance}</small>
//                       </Alert>
//                     </Col>
//                   </Row>
//                 )}

//                 {/* Conditional Fields based on Type */}
//                 {type && (
//                   <>
//                     {/* Institution and Type Info */}
//                     <Row className="mb-3">
//                       <Col md={8} lg={6}>
//                         <div className="d-flex flex-wrap gap-4">
//                           <div className="mb-2 mb-md-0">
//                             <small className="text-light">College/Institution</small>
//                             <div className="text-white fw-bold">{institution}</div>
//                           </div>
//                           <div className="mb-2 mb-md-0">
//                             <small className="text-light">Type</small>
//                             <div className="text-white fw-bold text-capitalize">{type}</div>
//                           </div>
//                           {type === "internship" && internName && (
//                             <div className="mb-2 mb-md-0">
//                               <small className="text-light">Student Name</small>
//                               <div className="text-white fw-bold">{internName}</div>
//                             </div>
//                           )}
//                         </div>
//                       </Col>
//                     </Row>

//                     {/* Group Member Dropdown for Projects */}
//                     {type === "project" && groupMembers.length > 0 && (
//                       <Row className="mb-4">
//                         <Col md={8} lg={6}>
//                           <Form.Group>
//                             <Form.Label className="labels">Select Group Member</Form.Label>
//                             <Form.Select
//                               value={selectedMember}
//                               onChange={(e) => setSelectedMember(e.target.value)}
//                               className="custom-input"
//                               disabled={loading}
//                               style={{
//                                 background: "#000000",
//                                 border: "1px solid rgba(255, 255, 255, 0.3)",
//                                 color: "white",
//                                 appearance: "none",
//                                 // backgroundImage: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e"),
//                                 // backgroundRepeat: "no-repeat",
//                                 // backgroundPosition: "right 0.75rem center",
//                                 // backgroundSize: "16px 12px"
//                               }}
//                             >
//                               <option value="" style={{ background: "#000000", color: "white" }}>
//                                 Choose a member...
//                               </option>
//                               {groupMembers.map((member, index) => (
//                                 <option 
//                                   key={index} 
//                                   value={member._id || member.regNumber || member.name}
//                                   style={{ background: "#000000", color: "white" }}
//                                 >
//                                   {member.name || member.regNumber || `Member ${index + 1}`}
//                                 </option>
//                               ))}
//                             </Form.Select>
//                           </Form.Group>
//                         </Col>
//                       </Row>
//                     )}

//                     {/* Total Amount Display */}
//                     <Row className="mb-3">
//                       <Col md={8} lg={6}>
//                         <Form.Group>
//                           <Form.Label className="labels">Total Amount</Form.Label>
//                           <Form.Control
//                             type="text"
//                             value={`₹${totalAmount.toLocaleString()}`}
//                             className="custom-input"
//                             readOnly
//                             style={{
//                               background: "rgba(255, 255, 255, 0.1)",
//                               border: "1px solid rgba(255, 255, 255, 0.2)",
//                               color: "white",
//                             }}
//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>

//                     {/* Balance Display */}
//                     <Row className="mb-3">
//                       <Col md={8} lg={6}>
//                         <Form.Group>
//                           <Form.Label className="labels">Current Balance</Form.Label>
//                           <Form.Control
//                             type="text"
//                             value={`₹${balance.toLocaleString()}`}
//                             className="custom-input"
//                             readOnly
//                             style={{
//                               background: "rgba(255, 255, 255, 0.1)",
//                               border: "1px solid rgba(255, 255, 255, 0.2)",
//                               color: "white",
//                             }}
//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>

//                     {/* Payment Amount Input */}
//                     <Row className="mb-4">
//                       <Col md={8} lg={6}>
//                         <Form.Group>
//                           <Form.Label className="labels">Amount to Pay</Form.Label>
//                           <InputGroup>
//                             <InputGroup.Text 
//                               style={{
//                                 background: "rgba(255, 255, 255, 0.1)",
//                                 border: "1px solid rgba(255, 255, 255, 0.2)",
//                                 color: "white",
//                                 borderRight: "none"
//                               }}
//                             >
//                               ₹
//                             </InputGroup.Text>
//                             <Form.Control
//                               type="number"
//                               placeholder="Enter amount"
//                               value={payingAmount}
//                               onChange={handleAmountChange}
//                               className="custom-input"
//                               disabled={loading || balance === 0}
//                               min="1"
//                               max={balance}
//                               style={{
//                                 background: "rgba(255, 255, 255, 0.1)",
//                                 border: "1px solid rgba(255, 255, 255, 0.2)",
//                                 color: "white",
//                                 borderLeft: "none"
//                               }}
//                             />
//                           </InputGroup>
//                           {balance === 0 && (
//                             <Form.Text className="text-success">
//                               Payment completed! No balance remaining.
//                             </Form.Text>
//                           )}
//                         </Form.Group>
//                       </Col>
//                     </Row>

//                     {/* Payment Method Radio */}
//                     <Row className="mb-4">
//                       <Col md={8} lg={6}>
//                         <Form.Label className="labels">Payment Method</Form.Label>
//                         <div className="d-flex flex-wrap gap-3">
//                           <Form.Check
//                             type="radio"
//                             label="Cash"
//                             name="paymentMethod"
//                             value="cash"
//                             checked={paymentMethod === "cash"}
//                             onChange={(e) => setPaymentMethod(e.target.value)}
//                             className="text-light"
//                             disabled={loading}
//                           />
//                           <Form.Check
//                             type="radio"
//                             label="GPay"
//                             name="paymentMethod"
//                             value="gpay"
//                             checked={paymentMethod === "gpay"}
//                             onChange={(e) => setPaymentMethod(e.target.value)}
//                             className="text-light"
//                             disabled={loading}
//                           />
//                         </div>
//                       </Col>
//                     </Row>

//                     {/* Action Buttons */}
//                     <Row className="mb-3">
//                       <Col>
//                         <div className="d-flex flex-wrap gap-2">
//                           <Button
//                             variant="primary"
//                             type="submit"
//                             className="buttons me-2"
//                             disabled={loading || !payingAmount || payingAmount <= 0 || payingAmount > balance || balance === 0}
//                             style={{ minWidth: "140px" }}
//                           >
//                             {loading ? (
//                               <>
//                                 <Spinner
//                                   animation="border"
//                                   size="sm"
//                                   className="me-2"
//                                 />
//                                 Processing...
//                               </>
//                             ) : (
//                               "Update Payment"
//                             )}
//                           </Button>
//                           <Button
//                             variant="outline-light"
//                             onClick={handleCancel}
//                             disabled={loading}
//                             className="buttons2"
//                             style={{ minWidth: "100px" }}
//                           >
//                             Cancel
//                           </Button>
//                         </div>
//                       </Col>
//                     </Row>
//                   </>
//                 )}

//                 {/* Show message when no data is found but search was attempted */}
//                 {!type && !loading && id && (
//                   <Row>
//                     <Col>
//                       <Alert variant="warning" className="text-light mt-3">
//                         No data found for ID: <strong>{id}</strong>. Please check the ID and try again.
//                       </Alert>
//                     </Col>
//                   </Row>
//                 )}
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default Payment;


import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import api from "../../api";
import { useNavigate } from "react-router-dom";

function Payment() {
  // State management
  const [id, setId] = useState("");
  const [type, setType] = useState(""); // 'project' or 'internship'
  const [institution, setInstitution] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [payingAmount, setPayingAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [internName, setInternName] = useState("");
  const [category, setCategory] = useState("");
  const [formData, setFormData] = useState(null); // To store the complete form data
  const [showPaymentForm, setShowPaymentForm] = useState(false); // New state to control form visibility
  const [searchAttempted, setSearchAttempted] = useState(false);


  // Reset form function
  const resetForm = () => {
    setType("");
    setInstitution("");
    setGroupMembers([]);
    setSelectedMember("");
    setTotalAmount(0);
    setBalance(0);
    setPayingAmount("");
    setPaymentMethod("cash");
    setInternName("");
    setCategory("");
    setFormData(null);
    setShowPaymentForm(false); // Hide form on reset
  };

  const navigate = useNavigate();

  // Handle ID input change
  const handleIdChange = (e) => {
    setId(e.target.value.toUpperCase());
    if (error) setError("");
  };

  // Handle Enter key press in ID field
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  // Handle search button click
  const handleSearch = async () => {
    setSearchAttempted(true);
    console.log('ccccccccccccccclicked');
    
    if (!id.trim()) {
      alert("Please enter an ID to search"); // Show alert for error
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      console.log("Searching for ID:", id);
      const response = await api.get(`/registrations/names?id=${id}`);
      console.log("API Response:", response);
      
      const data = response.data.data;

      if (!data || data.length === 0) {
        alert("No data found for this ID"); // Show alert for error
        setLoading(false);
        return;
      }

      const formData = data[0];
      console.log("Form Data:", formData);
      
      // Store complete form data
      setFormData(formData);

      // Determine type based on category or other fields
      const detectedType = formData.category === "internship" ? "internship" : 
                          formData.category === "project" ? "project" : 
                          formData.type || "project"; // fallback to type field or default to project
      console.log(detectedType,'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
      
      setType(detectedType);
      setInstitution(formData.college || formData.institution || "");
      setCategory(formData.category || "");
      
      // Set group members for projects
      if (detectedType === "project" && formData.groupMembers && formData.groupMembers.length > 0) {
        setGroupMembers(formData.groupMembers);
        // Set first member as default selected
        const firstMember = formData.groupMembers[0];
        setSelectedMember(firstMember._id || firstMember.regNumber || firstMember.name);
      } else {
        setGroupMembers([]);
      }

      // Set intern name for internships
      if (detectedType === "internship") {
        setInternName(formData.studentName || formData.memberName || "");
      }

      // Set amounts
      setTotalAmount(formData.fees || formData.totalAmount || 0);
      setBalance(formData.balance || formData.fees || 0);

      console.log("Set state - Type:", detectedType, "Institution:", formData.college, "Balance:", formData.balance);

      // Show payment form after successful search
      setShowPaymentForm(true);

    } catch (err) {
      console.error("Search error:", err);
      alert(err.response?.data?.message || "Failed to fetch data. Please check the ID and try again."); // Show alert for error
    } finally {
      setLoading(false);
    }
  };

  // Handle payment amount change
  const handleAmountChange = (e) => {
    const amount = e.target.value;
    setPayingAmount(amount);

    if (amount > balance) {
      setError("Paying amount cannot exceed balance");
    } else {
      setError("");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!payingAmount || payingAmount <= 0) {
      alert("Please enter a valid payment amount"); // Show alert for error
      return;
    }

    if (parseFloat(payingAmount) > balance) {
      alert("Paying amount cannot exceed balance"); // Show alert for error
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const paymentData = {
        id: id,
        type: type,
        paidAmount: parseFloat(payingAmount),
        paymentMethod: paymentMethod,
        category: category,
        institution: institution,
        memberName: type === "project" ? selectedMember : internName,
        formId: id,
        ...(type === "project" && { 
          groupMember: selectedMember 
        }),
        ...(type === "internship" && { 
          internName: internName 
        })
      };

      console.log("Submitting payment:", paymentData);
      const response = await api.post("/payment", paymentData);
      console.log(response);
      
      
      if (response.status === 201) {
        // Show success alert and hide payment form
        alert(`Payment of ₹${payingAmount} processed successfully!`);
        resetForm(); // Reset the form
        setId(""); // Clear the ID field
        setShowPaymentForm(false); // Hide payment window
        
      } else {
        alert(response.data.message || "Failed to update payment"); // Show alert for error
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert(err.response?.data?.message || "Failed to process payment"); // Show alert for error
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    resetForm();
    setId("");
    setError("");
    setSuccess("");
    setSearchAttempted(false);
  };

  // Debug: Log when type changes
  React.useEffect(() => {
    console.log("Current type:", type);
    console.log("Current formData:", formData);
  }, [type, formData]);

  return (
    <Container fluid className="px-3 px-md-4 px-lg-5">
      <Row>
        <Col className="mx-auto">
          <Card className="custom-card">
            <Card.Body className="p-3 p-md-4">
              <Form onSubmit={handleSubmit}>
                {/* ID Input Row */}
                <Row className="mb-4">
                  <Col md={8} lg={6}>
                    <Form.Group>
                      <Form.Label className="labels">ID Number</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="text"
                          placeholder="Enter project or internship ID..."
                          value={id}
                          onChange={handleIdChange}
                          onKeyPress={handleKeyPress}
                          className="custom-input"
                          disabled={loading}
                          style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            color: "white",
                          }}
                        />
                        <Button
                          variant="outline-light"
                          onClick={handleSearch}
                          disabled={loading || !id.trim()}
                          style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            color: "white",
                            minWidth: "10px",
                          }}
                        >
                          {loading ? (
                            <Spinner animation="border" size="sm" variant="light" />
                          ) : (
                            <i className="bi bi-search me-1"></i>
                          )}
                        </Button>
                      </InputGroup>
                      <Form.Text className="text-secondary">
                        Enter any valid project or internship ID and click Search
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Debug info - remove in production */}
                {/* {process.env.NODE_ENV === 'development' && formData && (
                  <Row className="mb-3">
                    <Col>
                      <Alert variant="info" className="py-2">
                        <small>Debug: Type: {type} | Category: {category} | Balance: {balance}</small>
                      </Alert>
                    </Col>
                  </Row>
                )} */}

                {/* Conditional Fields based on Type - Only show when showPaymentForm is true */}
                {showPaymentForm && type && (
                  <>
                    {/* Institution and Type Info */}
                    <Row className="mb-3">
                      <Col md={8} lg={6}>
                        <div className="d-flex flex-wrap gap-4">
                          <div className="mb-2 mb-md-0">
                            <small className="text-light">College/Institution</small>
                            <div className="text-white fw-bold">{institution}</div>
                          </div>
                          <div className="mb-2 mb-md-0">
                            <small className="text-light">Type</small>
                            <div className="text-white fw-bold text-capitalize">{type}</div>
                          </div>
                          {type === "internship" && internName && (
                            <div className="mb-2 mb-md-0">
                              <small className="text-light">Student Name</small>
                              <div className="text-white fw-bold">{internName}</div>
                            </div>
                          )}
                        </div>
                      </Col>
                    </Row>

                    {/* Group Member Dropdown for Projects */}
                    {type === "project" && groupMembers.length > 0 && (
                      <Row className="mb-4">
                        <Col md={8} lg={6}>
                          <Form.Group>
                            <Form.Label className="labels">Select Group Member</Form.Label>
                            <Form.Select
                              value={selectedMember}
                              onChange={(e) => setSelectedMember(e.target.value)}
                              className="custom-input"
                              disabled={loading}
                              style={{
                                background: "#000000",
                                border: "1px solid rgba(255, 255, 255, 0.3)",
                                color: "white",
                                appearance: "none",
                              }}
                            >
                              <option value="" style={{ background: "#000000", color: "white" }}>
                                Choose a member...
                              </option>
                              {groupMembers.map((member, index) => (
                                <option 
                                  key={index} 
                                  value={member._id || member.regNumber || member.name}
                                  style={{ background: "#000000", color: "white" }}
                                >
                                  {member.name || member.regNumber || `Member ${index + 1}`}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                    )}

                    {/* Total Amount Display */}
                    <Row className="mb-3">
                      <Col md={8} lg={6}>
                        <Form.Group>
                          <Form.Label className="labels">Total Amount</Form.Label>
                          <Form.Control
                            type="text"
                            value={`₹${totalAmount.toLocaleString()}`}
                            className="custom-input"
                            readOnly
                            style={{
                              background: "rgba(255, 255, 255, 0.1)",
                              border: "1px solid rgba(255, 255, 255, 0.2)",
                              color: "white",
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Balance Display */}
                    <Row className="mb-3">
                      <Col md={8} lg={6}>
                        <Form.Group>
                          <Form.Label className="labels">Current Balance</Form.Label>
                          <Form.Control
                            type="text"
                            value={`₹${balance.toLocaleString()}`}
                            className="custom-input"
                            readOnly
                            style={{
                              background: "rgba(255, 255, 255, 0.1)",
                              border: "1px solid rgba(255, 255, 255, 0.2)",
                              color: "white",
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Payment Amount Input */}
                    <Row className="mb-4">
                      <Col md={8} lg={6}>
                        <Form.Group>
                          <Form.Label className="labels">Amount to Pay</Form.Label>
                          <InputGroup>
                            <InputGroup.Text 
                              style={{
                                background: "rgba(255, 255, 255, 0.1)",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                color: "white",
                                borderRight: "none"
                              }}
                            >
                              ₹
                            </InputGroup.Text>
                            <Form.Control
                              type="number"
                              placeholder="Enter amount"
                              value={payingAmount}
                              onChange={handleAmountChange}
                              className="custom-input"
                              disabled={loading || balance === 0}
                              min="1"
                              max={balance}
                              style={{
                                background: "rgba(255, 255, 255, 0.1)",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                color: "white",
                                borderLeft: "none"
                              }}
                            />
                          </InputGroup>
                          {balance === 0 && (
                            <Form.Text className="text-success">
                              Payment completed! No balance remaining.
                            </Form.Text>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Payment Method Radio */}
                    <Row className="mb-4">
                      <Col md={8} lg={6}>
                        <Form.Label className="labels">Payment Method</Form.Label>
                        <div className="d-flex flex-wrap gap-3">
                          <Form.Check
                            type="radio"
                            label="Cash"
                            name="paymentMethod"
                            value="cash"
                            checked={paymentMethod === "cash"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="text-light"
                            disabled={loading}
                          />
                          <Form.Check
                            type="radio"
                            label="GPay"
                            name="paymentMethod"
                            value="gpay"
                            checked={paymentMethod === "gpay"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="text-light"
                            disabled={loading}
                          />
                        </div>
                      </Col>
                    </Row>

                    {/* Action Buttons */}
                    <Row className="mb-3">
                      <Col>
                        <div className="d-flex flex-wrap gap-2">
                          <Button
                            variant="primary"
                            type="submit"
                            className="buttons me-2"
                            disabled={loading || !payingAmount || payingAmount <= 0 || payingAmount > balance || balance === 0}
                            style={{ minWidth: "140px" }}
                          >
                            {loading ? (
                              <>
                                <Spinner
                                  animation="border"
                                  size="sm"
                                  className="me-2"
                                />
                                Processing...
                              </>
                            ) : (
                              "Update Payment"
                            )}
                          </Button>
                          <Button
                            variant="outline-light"
                            onClick={handleCancel}
                            disabled={loading}
                            className="buttons2"
                            style={{ minWidth: "100px" }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </>
                )}

                {/* Show message when no data is found but search was attempted */}
                {searchAttempted && !showPaymentForm && !loading && id && (
                  <Row>
                    <Col>
                      <Alert variant="warning" className="text-dark mt-3">
                        No data found for ID: <strong>{id}</strong>. Please check the ID and try again.
                      </Alert>
                    </Col>
                  </Row>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Payment;