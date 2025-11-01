


// // import React, { useState } from "react";
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
// // import api from "../../api";
// // import { useNavigate } from "react-router-dom";

// // function Payment() {
// //   // State management
// //   const [id, setId] = useState("");
// //   const [type, setType] = useState(""); // 'project' or 'internship'
// //   const [institution, setInstitution] = useState("");
// //   const [groupMembers, setGroupMembers] = useState([]);
// //   const [selectedMember, setSelectedMember] = useState("");
// //   const [totalAmount, setTotalAmount] = useState(0);
// //   const [balance, setBalance] = useState(0);
// //   const [payingAmount, setPayingAmount] = useState("");
// //   const [paymentMethod, setPaymentMethod] = useState("cash");
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [success, setSuccess] = useState("");
// //   const [internName, setInternName] = useState("");
// //   const [category, setCategory] = useState("");
// //   const [formData, setFormData] = useState(null); // To store the complete form data
// //   const [showPaymentForm, setShowPaymentForm] = useState(false); // New state to control form visibility
// //   const [searchAttempted, setSearchAttempted] = useState(false);


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
// //     setCategory("");
// //     setFormData(null);
// //     setShowPaymentForm(false); // Hide form on reset
// //   };

// //   const navigate = useNavigate();

// //   // Handle ID input change
// //   const handleIdChange = (e) => {
// //     setId(e.target.value.toUpperCase());
// //     if (error) setError("");
// //   };

// //   // Handle Enter key press in ID field
// //   const handleKeyPress = (e) => {
// //     if (e.key === "Enter") {
// //       e.preventDefault();
// //       handleSearch();
// //     }
// //   };

// //   // Handle search button click
// //   const handleSearch = async () => {
// //     setSearchAttempted(true);
// //     console.log('ccccccccccccccclicked');
    
// //     if (!id.trim()) {
// //       alert("Please enter an ID to search"); // Show alert for error
// //       return;
// //     }

// //     setLoading(true);
// //     setError("");
// //     setSuccess("");

// //     try {
// //       console.log("Searching for ID:", id);
// //       const response = await api.get(`/registrations/names?id=${id}`);
// //       console.log("API Response:", response);
      
// //       const data = response.data.data;

// //       if (!data || data.length === 0) {
// //         alert("No data found for this ID"); // Show alert for error
// //         setLoading(false);
// //         return;
// //       }

// //       const formData = data[0];
// //       console.log("Form Data:", formData);
      
// //       // Store complete form data
// //       setFormData(formData);

// //       // Determine type based on category or other fields
// //       const detectedType = formData.category === "internship" ? "internship" : 
// //                           formData.category === "project" ? "project" : 
// //                           formData.type || "project"; // fallback to type field or default to project
// //       console.log(detectedType,'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
      
// //       setType(detectedType);
// //       setInstitution(formData.college || formData.institution || "");
// //       setCategory(formData.category || "");
      
// //       // Set group members for projects
// //       if (detectedType === "project" && formData.groupMembers && formData.groupMembers.length > 0) {
// //         setGroupMembers(formData.groupMembers);
// //         // Set first member as default selected
// //         const firstMember = formData.groupMembers[0];
// //         setSelectedMember(firstMember._id || firstMember.regNumber || firstMember.name);
// //       } else {
// //         setGroupMembers([]);
// //       }

// //       // Set intern name for internships
// //       if (detectedType === "internship") {
// //         setInternName(formData.studentName || formData.memberName || "");
// //       }

// //       // Set amounts
// //       setTotalAmount(formData.fees || formData.totalAmount || 0);
// //       setBalance(formData.balance || formData.fees || 0);

// //       console.log("Set state - Type:", detectedType, "Institution:", formData.college, "Balance:", formData.balance);

// //       // Show payment form after successful search
// //       setShowPaymentForm(true);

// //     } catch (err) {
// //       console.error("Search error:", err);
// //       alert(err.response?.data?.message || "Failed to fetch data. Please check the ID and try again."); // Show alert for error
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Handle payment amount change
// //   const handleAmountChange = (e) => {
// //     const amount = e.target.value;
// //     setPayingAmount(amount);

// //     if (amount > balance) {
// //       setError("Paying amount cannot exceed balance");
// //     } else {
// //       setError("");
// //     }
// //   };

// //   // Handle form submission
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     if (!payingAmount || payingAmount <= 0) {
// //       alert("Please enter a valid payment amount"); // Show alert for error
// //       return;
// //     }

// //     if (parseFloat(payingAmount) > balance) {
// //       alert("Paying amount cannot exceed balance"); // Show alert for error
// //       return;
// //     }

// //     setLoading(true);
// //     setError("");
// //     setSuccess("");

// //     try {
// //       const paymentData = {
// //         id: id,
// //         type: type,
// //         paidAmount: parseFloat(payingAmount),
// //         paymentMethod: paymentMethod,
// //         category: category,
// //         institution: institution,
// //         memberName: type === "project" ? selectedMember : internName,
// //         formId: id,
// //         ...(type === "project" && { 
// //           groupMember: selectedMember 
// //         }),
// //         ...(type === "internship" && { 
// //           internName: internName 
// //         })
// //       };

// //       console.log("Submitting payment:", paymentData);
// //       const response = await api.post("/payment", paymentData);
// //       console.log(response);
      
      
// //       if (response.status === 201) {
// //         // Show success alert and hide payment form
// //         alert(`Payment of ₹${payingAmount} processed successfully!`);
// //         resetForm(); // Reset the form
// //         setId(""); // Clear the ID field
// //         setShowPaymentForm(false); // Hide payment window
        
// //       } else {
// //         alert(response.data.message || "Failed to update payment"); // Show alert for error
// //       }
// //     } catch (err) {
// //       console.error("Payment error:", err);
// //       alert(err.response?.data?.message || "Failed to process payment"); // Show alert for error
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Handle cancel
// //   const handleCancel = () => {
// //     resetForm();
// //     setId("");
// //     setError("");
// //     setSuccess("");
// //     setSearchAttempted(false);
// //   };

// //   // Debug: Log when type changes
// //   React.useEffect(() => {
// //     console.log("Current type:", type);
// //     console.log("Current formData:", formData);
// //   }, [type, formData]);

// //   return (
// //     <Container fluid className="px-3 px-md-4 px-lg-5">
// //       <Row>
// //         <Col className="mx-auto">
// //           <Card className="custom-card">
// //             <Card.Body className="p-3 p-md-4">
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
// //                             minWidth: "10px",
// //                           }}
// //                         >
// //                           {loading ? (
// //                             <Spinner animation="border" size="sm" variant="light" />
// //                           ) : (
// //                             <i className="bi bi-search me-1"></i>
// //                           )}
// //                         </Button>
// //                       </InputGroup>
// //                       <Form.Text className="text-secondary">
// //                         Enter any valid project or internship ID and click Search
// //                       </Form.Text>
// //                     </Form.Group>
// //                   </Col>
// //                 </Row>

// //                 {/* Debug info - remove in production */}
// //                 {/* {process.env.NODE_ENV === 'development' && formData && (
// //                   <Row className="mb-3">
// //                     <Col>
// //                       <Alert variant="info" className="py-2">
// //                         <small>Debug: Type: {type} | Category: {category} | Balance: {balance}</small>
// //                       </Alert>
// //                     </Col>
// //                   </Row>
// //                 )} */}

// //                 {/* Conditional Fields based on Type - Only show when showPaymentForm is true */}
// //                 {showPaymentForm && type && (
// //                   <>
// //                     {/* Institution and Type Info */}
// //                     <Row className="mb-3">
// //                       <Col md={8} lg={6}>
// //                         <div className="d-flex flex-wrap gap-4">
// //                           <div className="mb-2 mb-md-0">
// //                             <small className="text-light">College/Institution</small>
// //                             <div className="text-white fw-bold">{institution}</div>
// //                           </div>
// //                           <div className="mb-2 mb-md-0">
// //                             <small className="text-light">Type</small>
// //                             <div className="text-white fw-bold text-capitalize">{type}</div>
// //                           </div>
// //                           {type === "internship" && internName && (
// //                             <div className="mb-2 mb-md-0">
// //                               <small className="text-light">Student Name</small>
// //                               <div className="text-white fw-bold">{internName}</div>
// //                             </div>
// //                           )}
// //                         </div>
// //                       </Col>
// //                     </Row>

// //                     {/* Group Member Dropdown for Projects */}
// //                     {type === "project" && groupMembers.length > 0 && (
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
// //                               }}
// //                             >
// //                               <option value="" style={{ background: "#000000", color: "white" }}>
// //                                 Choose a member...
// //                               </option>
// //                               {groupMembers.map((member, index) => (
// //                                 <option 
// //                                   key={index} 
// //                                   value={member._id || member.regNumber || member.name}
// //                                   style={{ background: "#000000", color: "white" }}
// //                                 >
// //                                   {member.name || member.regNumber || `Member ${index + 1}`}
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
// //                             disabled={loading || !payingAmount || payingAmount <= 0 || payingAmount > balance || balance === 0}
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

// //                 {/* Show message when no data is found but search was attempted */}
// //                 {searchAttempted && !showPaymentForm && !loading && id && (
// //                   <Row>
// //                     <Col>
// //                       <Alert variant="warning" className="text-dark mt-3">
// //                         No data found for ID: <strong>{id}</strong>. Please check the ID and try again.
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


// // ⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪Whatsapp message added payment 

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
//   const [showPaymentForm, setShowPaymentForm] = useState(false); // New state to control form visibility
//   const [searchAttempted, setSearchAttempted] = useState(false);

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
//     setShowPaymentForm(false); // Hide form on reset
//   };

//   const navigate = useNavigate();

//   // Function to send WhatsApp message
//   const sendPaymentWhatsApp = async (phoneNumber, message) => {
//     try {
//       const whatsappResponse = await api.post("/whatsapp/send", {
//         phone: phoneNumber,
//         message: message,
//       });
//       console.log("WhatsApp message sent successfully:", whatsappResponse.data);
//       return true;
//     } catch (whatsappError) {
//       console.error("Failed to send WhatsApp message:", whatsappError);
//       return false;
//     }
//   };

//   // Function to construct WhatsApp message
//   const constructWhatsAppMessage = (paymentAmount, institution, category, name, projectName = "") => {
//     let baseMessage = `You have successfully processed a payment of ₹${paymentAmount} to ${institution} for your ${category}`;
    
//     if (category === "project" && projectName) {
//       baseMessage += ` in the name of ${projectName} - ${name}.`;
//     } else {
//       baseMessage += ` in the name of ${name}.`;
//     }
    
//     return baseMessage;
//   };

//   // Get phone number based on type and selected member
//   const getPhoneNumber = () => {
//     if (type === "internship") {
//       return formData?.paymentInfo?.phone || "";
//     } else if (type === "project" && selectedMember) {
//       const member = groupMembers.find(member => 
//         member._id === selectedMember || 
//         member.regNumber === selectedMember ||
//         member.name === selectedMember
//       );
//       return member?.phone || "";
//     }
//     return "";
//   };

//   // Get recipient name for WhatsApp
//   const getRecipientName = () => {
//     if (type === "internship") {
//       return internName;
//     } else if (type === "project" && selectedMember) {
//       const member = groupMembers.find(member => 
//         member._id === selectedMember || 
//         member.regNumber === selectedMember ||
//         member.name === selectedMember
//       );
//       return member?.name || selectedMember;
//     }
//     return "";
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
//     setSearchAttempted(true);
    
//     if (!id.trim()) {
//       alert("Please enter an ID to search");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       console.log("Searching for ID:", id);
//       const response = await api.get(`/registrations/names?id=${id}`);
//       console.log("API Response:", response);
      
//       const data = response.data.data;

//       if (!data || data.length === 0) {
//         alert("No data found for this ID");
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
//                           formData.type || "project";
      
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
//         setInternName(formData.studentName || formData.memberName || formData.paymentInfo?.name || "");
//       }

//       // Set amounts
//       setTotalAmount(formData.fees || formData.totalAmount || 0);
//       setBalance(formData.balance || formData.fees || 0);

//       console.log("Set state - Type:", detectedType, "Institution:", formData.college, "Balance:", formData.balance);

//       // Show payment form after successful search
//       setShowPaymentForm(true);

//     } catch (err) {
//       console.error("Search error:", err);
//       alert(err.response?.data?.message || "Failed to fetch data. Please check the ID and try again.");
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
//       alert("Please enter a valid payment amount");
//       return;
//     }

//     if (parseFloat(payingAmount) > balance) {
//       alert("Paying amount cannot exceed balance");
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
      
//       if (response.status === 201) {
//         // Send WhatsApp notification after successful payment
//         const phoneNumber = getPhoneNumber();
//         const recipientName = getRecipientName();
//         const projectName = type === "project" ? formData?.projectName : "";
        
//         if (phoneNumber) {
//           const whatsappMessage = constructWhatsAppMessage(
//             payingAmount, 
//             institution, 
//             category, 
//             recipientName, 
//             projectName
//           );
          
//           const whatsappSent = await sendPaymentWhatsApp(phoneNumber, whatsappMessage);
          
//           if (whatsappSent) {
//             console.log("WhatsApp notification sent successfully");
//           } else {
//             console.warn("Payment successful but WhatsApp message failed to send");
//           }
//         } else {
//           console.warn("No phone number found to send WhatsApp message");
//         }

//         // Show success alert and hide payment form
//         alert(`Payment of ₹${payingAmount} processed successfully!${phoneNumber ? " WhatsApp notification sent." : ""}`);
//         resetForm(); // Reset the form
//         setId(""); // Clear the ID field
//         setShowPaymentForm(false); // Hide payment window
        
//       } else {
//         alert(response.data.message || "Failed to update payment");
//       }
//     } catch (err) {
//       console.error("Payment error:", err);
//       alert(err.response?.data?.message || "Failed to process payment");
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
//     setSearchAttempted(false);
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

//                 {/* Conditional Fields based on Type - Only show when showPaymentForm is true */}
//                 {showPaymentForm && type && (
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
//                           {type === "project" && formData?.projectName && (
//                             <div className="mb-2 mb-md-0">
//                               <small className="text-light">Project Name</small>
//                               <div className="text-white fw-bold">{formData.projectName}</div>
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
//                                   {member.phone ? ` - ${member.phone}` : ''}
//                                 </option>
//                               ))}
//                             </Form.Select>
//                             <Form.Text className="text-secondary">
//                               WhatsApp message will be sent to the selected member's phone number
//                             </Form.Text>
//                           </Form.Group>
//                         </Col>
//                       </Row>
//                     )}

//                     {/* Phone Number Display for Internship */}
//                     {type === "internship" && formData?.paymentInfo?.phone && (
//                       <Row className="mb-3">
//                         <Col md={8} lg={6}>
//                           <div className="mb-2">
//                             <small className="text-light">Phone Number</small>
//                             <div className="text-white fw-bold">{formData.paymentInfo.phone}</div>
//                             <Form.Text className="text-secondary">
//                               WhatsApp message will be sent to this number
//                             </Form.Text>
//                           </div>
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
//                 {searchAttempted && !showPaymentForm && !loading && id && (
//                   <Row>
//                     <Col>
//                       <Alert variant="warning" className="text-dark mt-3">
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
//   const [formData, setFormData] = useState(null);
//   const [showPaymentForm, setShowPaymentForm] = useState(false);
//   const [searchAttempted, setSearchAttempted] = useState(false);

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
//     setShowPaymentForm(false);
//   };

//   const navigate = useNavigate();

//   // Function to send WhatsApp message
//   const sendPaymentWhatsApp = async (phoneNumber, message) => {
//     console.log('oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo');
    
//     console.log(phoneNumber,'pppppppppppppp',message);
    
//     try {
//       // Clean phone number - remove any non-digit characters and ensure it starts with 91
//       let cleanPhone = phoneNumber.replace(/\D/g, '');
      
//       // If phone number doesn't start with country code, add 91 for India
//       if (!cleanPhone.startsWith('91') && cleanPhone.length === 10) {
//         cleanPhone = '91' + cleanPhone;
//       }
      
//       console.log("Sending WhatsApp to:", cleanPhone);
//       console.log("Message:", message);
      
//       const whatsappResponse = await api.post("/whatsapp/send", {
//         phone: cleanPhone,
//         message: message,
//       });
//       console.log("WhatsApp message sent successfully:", whatsappResponse.data);
//       return true;
//     } catch (whatsappError) {
//       console.error("Failed to send WhatsApp message:", whatsappError);
//       return false;
//     }
//   };

//   // Function to construct WhatsApp message
//   const constructWhatsAppMessage = (paymentDetails) => {
//     const { paymentAmount, institution, category, name, projectName, balanceRemaining, paymentId, college } = paymentDetails;
    
//     let message = `🎉 *Payment Receipt* 🎉\n\n`;
//     message += `Dear ${name},\n\n`;
//     message += `Your payment has been successfully processed!\n\n`;
//     message += `*Payment Details:*\n`;
//     message += `📧 *ID:* ${paymentId}\n`;
//     message += `💰 *Amount Paid:* ₹${paymentAmount}\n`;
//     message += `🏫 *College:* ${college}\n`;
//     message += `🏢 *Institution:* ${institution === 'trycode' ? 'TryCode' : 'Nexus'}\n`;
//     message += `📋 *Program:* ${category === 'project' ? 'Project' : 'Internship'}\n`;
    
//     if (category === "project" && projectName) {
//       message += `🔧 *Project Name:* ${projectName}\n`;
//     }
    
//     message += `💳 *Payment Method:* ${paymentMethod === 'cash' ? 'Cash' : 'GPay'}\n`;
//     message += `📊 *Balance Remaining:* ₹${balanceRemaining}\n\n`;
//     message += `Thank you for your payment! 🎊\n\n`;
//     message += `Best regards,\nTeam Innovate Tech`;
    
//     return message;
//   };

//   // Get phone number based on type and selected member - UPDATED WITH EXACT MODEL FIELDS
//   const getPhoneNumber = () => {
//     if (type === "internship") {
//       // For internship: Use the phone field from studentSchema
//       console.log('ggggggggggggggg',formData.phone,formData?.phone);
      
//       return formData?.phone || "";
//     } else if (type === "project" && selectedMember) {
//       // For project: Find the selected member and get their phone from groupMemberSchema
//       const member = groupMembers.find(member => 
//         member._id === selectedMember || 
//         member.regNumber === selectedMember ||
//         member.name === selectedMember
//       );
//       return member?.phone || "";
//     }
//     return "";
//   };

//   // Get recipient name for WhatsApp - UPDATED WITH EXACT MODEL FIELDS
//   const getRecipientName = () => {
//     if (type === "internship") {
//       // For internship: Use the name field from studentSchema
//       return formData?.name || "Student";
//     } else if (type === "project" && selectedMember) {
//       // For project: Get member name from groupMemberSchema
//       const member = groupMembers.find(member => 
//         member._id === selectedMember || 
//         member.regNumber === selectedMember ||
//         member.name === selectedMember
//       );
//       return member?.name || selectedMember || "Member";
//     }
//     return "Student";
//   };

//   // Get project name if available - UPDATED WITH EXACT MODEL FIELDS
//   const getProjectName = () => {
//     return formData?.projectName || "";
//   };

//   // Get college name - UPDATED WITH EXACT MODEL FIELDS
//   const getCollege = () => {
//     return formData?.college || "";
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

//   // Handle search button click - UPDATED WITH EXACT MODEL FIELDS
//   const handleSearch = async () => {
//     setSearchAttempted(true);
    
//     if (!id.trim()) {
//       alert("Please enter an ID to search");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       console.log("Searching for ID:", id);
//       const response = await api.get(`/registrations/names?id=${id}`);
//       console.log("API Response:", response);
      
//       const data = response.data.data;

//       if (!data || data.length === 0) {
//         alert("No data found for this ID");
//         setLoading(false);
//         return;
//       }

//       const formData = data[0];
//       console.log("Form Data:", formData);
      
//       // Store complete form data
//       setFormData(formData);

//       // Use category directly from the model
//       const detectedType = formData.category; // 'internship' or 'project'
      
//       setType(detectedType);
//       setInstitution(formData.institution || ""); // 'trycode' or 'nexus'
//       setCategory(formData.category || "");
      
//       // Set group members for projects - using exact model field
//       if (detectedType === "project" && formData.groupMembers && formData.groupMembers.length > 0) {
//         const members = formData.groupMembers.map(member => ({
//           ...member,
//           phone: member.phone || "" // Using phone field from groupMemberSchema
//         }));
//         setGroupMembers(members);
//         // Set first member as default selected
//         const firstMember = members[0];
//         setSelectedMember(firstMember._id || firstMember.regNumber || firstMember.name);
//       } else {
//         setGroupMembers([]);
//       }

//       // Set intern name for internships - using exact model field
//       if (detectedType === "internship") {
//         setInternName(formData.name || ""); // Using name field from studentSchema
//       }

//       // Set amounts - using exact model fields
//       setTotalAmount(formData.fees || 0);
//       setBalance(formData.paymentInfo?.balance || formData.fees || 0);

//       console.log("Set state - Type:", detectedType, "College:", formData.college, "Balance:", formData.paymentInfo?.balance);

//       // Show payment form after successful search
//       setShowPaymentForm(true);

//     } catch (err) {
//       console.error("Search error:", err);
//       alert(err.response?.data?.message || "Failed to fetch data. Please check the ID and try again.");
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

//   // Handle form submission - UPDATED WITH EXACT MODEL FIELDS
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!payingAmount || payingAmount <= 0) {
//       alert("Please enter a valid payment amount");
//       return;
//     }

//     if (parseFloat(payingAmount) > balance) {
//       alert("Paying amount cannot exceed balance");
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
      
//       if (response.status === 201) {
//         // Calculate new balance
//         const newBalance = balance - parseFloat(payingAmount);
        
//         // Send WhatsApp notification after successful payment
//         const phoneNumber = getPhoneNumber();
//         const recipientName = getRecipientName();
//         const projectName = getProjectName();
//         const college = getCollege();
        
//         if (phoneNumber && phoneNumber.length >= 10) {
//           const paymentDetails = {
//             paymentAmount: payingAmount,
//             institution: institution,
//             category: category,
//             name: recipientName,
//             projectName: projectName,
//             balanceRemaining: newBalance,
//             paymentId: id,
//             college: college
//           };
          
//           const whatsappMessage = constructWhatsAppMessage(paymentDetails);
//           const whatsappSent = await sendPaymentWhatsApp(phoneNumber, whatsappMessage);
          
//           if (whatsappSent) {
//             console.log("WhatsApp notification sent successfully");
//             // Show success message with WhatsApp info
//             alert(`Payment of ₹${payingAmount} processed successfully!\n\nWhatsApp receipt sent to ${recipientName}.`);
//           } else {
//             console.warn("Payment successful but WhatsApp message failed to send");
//             alert(`Payment of ₹${payingAmount} processed successfully!\n\nNote: Could not send WhatsApp notification.`);
//           }
//         } else {
//           console.warn("No valid phone number found to send WhatsApp message");
//           alert(`Payment of ₹${payingAmount} processed successfully!\n\nNote: No phone number available for WhatsApp notification.`);
//         }

//         // Reset form
//         resetForm();
//         setId("");
//         setShowPaymentForm(false);
        
//       } else {
//         alert(response.data.message || "Failed to update payment");
//       }
//     } catch (err) {
//       console.error("Payment error:", err);
//       alert(err.response?.data?.message || "Failed to process payment");
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
//     setSearchAttempted(false);
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

//                 {/* Conditional Fields based on Type - Only show when showPaymentForm is true */}
//                 {showPaymentForm && type && (
//                   <>
//                     {/* Institution and Type Info */}
//                     <Row className="mb-3">
//                       <Col md={8} lg={6}>
//                         <div className="d-flex flex-wrap gap-4">
//                           <div className="mb-2 mb-md-0">
//                             <small className="text-light">College</small>
//                             <div className="text-white fw-bold">{formData?.college || "N/A"}</div>
//                           </div>
//                           <div className="mb-2 mb-md-0">
//                             <small className="text-light">Institution</small>
//                             <div className="text-white fw-bold text-capitalize">
//                               {institution === 'trycode' ? 'TryCode' : 'Nexus'}
//                             </div>
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
//                           {type === "project" && formData?.projectName && (
//                             <div className="mb-2 mb-md-0">
//                               <small className="text-light">Project Name</small>
//                               <div className="text-white fw-bold">{formData.projectName}</div>
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
//                                   {member.phone ? ` - 📱 ${member.phone}` : ' - No phone'}
//                                 </option>
//                               ))}
//                             </Form.Select>
//                             <Form.Text className="text-secondary">
//                               WhatsApp receipt will be sent to the selected member's phone number
//                             </Form.Text>
//                           </Form.Group>
//                         </Col>
//                       </Row>
//                     )}

//                     {/* Phone Number Display for Internship */}
//                     {type === "internship" && (
//                       <Row className="mb-3">
//                         <Col md={8} lg={6}>
//                           <div className="mb-2">
//                             <small className="text-light">Phone Number</small>
//                             <div className="text-white fw-bold">
//                               {formData?.phone || "No phone number available"}
//                             </div>
//                             <Form.Text className="text-secondary">
//                               WhatsApp receipt will be sent to this number
//                             </Form.Text>
//                           </div>
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

//                     {/* WhatsApp Notification Info */}
//                     <Row className="mb-3">
//                       <Col md={8} lg={6}>
//                         <Alert variant="info" className="py-2">
//                           <small>
//                             <i className="bi bi-whatsapp me-2"></i>
//                             A WhatsApp payment receipt will be automatically sent after successful payment.
//                           </small>
//                         </Alert>
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
//                 {searchAttempted && !showPaymentForm && !loading && id && (
//                   <Row>
//                     <Col>
//                       <Alert variant="warning" className="text-dark mt-3">
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
  const [formData, setFormData] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
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
    setShowPaymentForm(false);
  };

  const navigate = useNavigate();

  // Function to create WhatsApp deep link
  const createWhatsAppLink = (phoneNumber, message) => {
    // Clean phone number - remove any non-digit characters
    let cleanPhone = phoneNumber.replace(/\D/g, '');
    
    // If phone number doesn't start with country code and is 10 digits, add 91 for India
    if (!cleanPhone.startsWith('91') && cleanPhone.length === 10) {
      cleanPhone = '91' + cleanPhone;
    }
    
    // URL encode the message
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp deep link
    const whatsappLink = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
    
    console.log("WhatsApp Link Created:", whatsappLink);
    return whatsappLink;
  };

  // Function to open WhatsApp with message
  const openWhatsAppWithMessage = (phoneNumber, message) => {
    const whatsappLink = createWhatsAppLink(phoneNumber, message);
    
    // Open WhatsApp in new tab
    window.open(whatsappLink, '_blank', 'noopener,noreferrer');
    
    return true;
  };

  // Function to construct WhatsApp message
  const constructWhatsAppMessage = (paymentDetails) => {
    const { paymentAmount, institution, category, name, projectName, balanceRemaining, paymentId, college } = paymentDetails;
    
    let message = `🎉 *Payment Receipt* 🎉\n\n`;
    message += `Dear ${name},\n\n`;
    message += `Your payment has been successfully processed!\n\n`;
    message += `*Payment Details:*\n`;
    message += `📧 *ID:* ${paymentId}\n`;
    message += `💰 *Amount Paid:* ₹${paymentAmount}\n`;
    message += `🏫 *College:* ${college}\n`;
    message += `🏢 *Institution:* ${institution === 'trycode' ? 'TryCode' : 'Nexus'}\n`;
    message += `📋 *Program:* ${category === 'project' ? 'Project' : 'Internship'}\n`;
    
    if (category === "project" && projectName) {
      message += `🔧 *Project Name:* ${projectName}\n`;
    }
    
    message += `💳 *Payment Method:* ${paymentMethod === 'cash' ? 'Cash' : 'GPay'}\n`;
    message += `📊 *Balance Remaining:* ₹${balanceRemaining}\n\n`;
    message += `Thank you for your payment! 🎊\n\n`;
    message += `Best regards,\nTeam Innovate Tech`;
    
    return message;
  };

  // Get phone number based on type and selected member
  const getPhoneNumber = () => {
    if (type === "internship") {
      console.log('ggggggggggggggg', formData?.phone);
      return formData?.phone || "";
    } else if (type === "project" && selectedMember) {
      const member = groupMembers.find(member => 
        member._id === selectedMember || 
        member.regNumber === selectedMember ||
        member.name === selectedMember
      );
      return member?.phone || "";
    }
    return "";
  };

  // Get recipient name for WhatsApp
  const getRecipientName = () => {
    if (type === "internship") {
      return formData?.name || "Student";
    } else if (type === "project" && selectedMember) {
      const member = groupMembers.find(member => 
        member._id === selectedMember || 
        member.regNumber === selectedMember ||
        member.name === selectedMember
      );
      return member?.name || selectedMember || "Member";
    }
    return "Student";
  };

  // Get project name if available
  const getProjectName = () => {
    return formData?.projectName || "";
  };

  // Get college name
  const getCollege = () => {
    return formData?.college || "";
  };

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
    
    if (!id.trim()) {
      alert("Please enter an ID to search");
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
        alert("No data found for this ID");
        setLoading(false);
        return;
      }

      const formData = data[0];
      console.log("Form Data:", formData);
      
      // Store complete form data
      setFormData(formData);

      // Use category directly from the model
      const detectedType = formData.category;
      
      setType(detectedType);
      setInstitution(formData.institution || "");
      setCategory(formData.category || "");
      
      // Set group members for projects
      if (detectedType === "project" && formData.groupMembers && formData.groupMembers.length > 0) {
        const members = formData.groupMembers.map(member => ({
          ...member,
          phone: member.phone || ""
        }));
        setGroupMembers(members);
        // Set first member as default selected
        const firstMember = members[0];
        setSelectedMember(firstMember._id || firstMember.regNumber || firstMember.name);
      } else {
        setGroupMembers([]);
      }

      // Set intern name for internships
      if (detectedType === "internship") {
        setInternName(formData.name || "");
      }

      // Set amounts
      setTotalAmount(formData.fees || 0);
      setBalance(formData.paymentInfo?.balance || formData.fees || 0);

      console.log("Set state - Type:", detectedType, "College:", formData.college, "Balance:", formData.paymentInfo?.balance);

      // Show payment form after successful search
      setShowPaymentForm(true);

    } catch (err) {
      console.error("Search error:", err);
      alert(err.response?.data?.message || "Failed to fetch data. Please check the ID and try again.");
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

  // Handle form submission with WhatsApp integration
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!payingAmount || payingAmount <= 0) {
      alert("Please enter a valid payment amount");
      return;
    }

    if (parseFloat(payingAmount) > balance) {
      alert("Paying amount cannot exceed balance");
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
      
      if (response.status === 201) {
        // Calculate new balance
        const newBalance = balance - parseFloat(payingAmount);
        
        // Send WhatsApp notification after successful payment
        const phoneNumber = getPhoneNumber();
        const recipientName = getRecipientName();
        const projectName = getProjectName();
        const college = getCollege();
        
        if (phoneNumber && phoneNumber.length >= 10) {
          const paymentDetails = {
            paymentAmount: payingAmount,
            institution: institution,
            category: category,
            name: recipientName,
            projectName: projectName,
            balanceRemaining: newBalance,
            paymentId: id,
            college: college
          };
          
          const whatsappMessage = constructWhatsAppMessage(paymentDetails);
          
          // Open WhatsApp with the message
          const whatsappOpened = openWhatsAppWithMessage(phoneNumber, whatsappMessage);
          
          if (whatsappOpened) {
            console.log("WhatsApp opened successfully with message");
            // Show success message with WhatsApp info
            alert(`Payment of ₹${payingAmount} processed successfully!\n\nWhatsApp has been opened with the payment receipt. Please click send to deliver the message to ${recipientName}.`);
          } else {
            console.warn("Payment successful but WhatsApp failed to open");
            alert(`Payment of ₹${payingAmount} processed successfully!\n\nNote: Could not open WhatsApp automatically.`);
          }
        } else {
          console.warn("No valid phone number found for WhatsApp");
          alert(`Payment of ₹${payingAmount} processed successfully!\n\nNote: No phone number available for WhatsApp notification.`);
        }

        // Reset form
        resetForm();
        setId("");
        setShowPaymentForm(false);
        
      } else {
        alert(response.data.message || "Failed to update payment");
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert(err.response?.data?.message || "Failed to process payment");
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

                {/* Conditional Fields based on Type - Only show when showPaymentForm is true */}
                {showPaymentForm && type && (
                  <>
                    {/* Institution and Type Info */}
                    <Row className="mb-3">
                      <Col md={8} lg={6}>
                        <div className="d-flex flex-wrap gap-4">
                          <div className="mb-2 mb-md-0">
                            <small className="text-light">College</small>
                            <div className="text-white fw-bold">{formData?.college || "N/A"}</div>
                          </div>
                          <div className="mb-2 mb-md-0">
                            <small className="text-light">Institution</small>
                            <div className="text-white fw-bold text-capitalize">
                              {institution === 'trycode' ? 'TryCode' : 'Nexus'}
                            </div>
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
                          {type === "project" && formData?.projectName && (
                            <div className="mb-2 mb-md-0">
                              <small className="text-light">Project Name</small>
                              <div className="text-white fw-bold">{formData.projectName}</div>
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
                                  {member.phone ? ` - 📱 ${member.phone}` : ' - No phone'}
                                </option>
                              ))}
                            </Form.Select>
                            <Form.Text className="text-secondary">
                              WhatsApp receipt will be sent to the selected member's phone number
                            </Form.Text>
                          </Form.Group>
                        </Col>
                      </Row>
                    )}

                    {/* Phone Number Display for Internship */}
                    {type === "internship" && (
                      <Row className="mb-3">
                        <Col md={8} lg={6}>
                          <div className="mb-2">
                            <small className="text-light">Phone Number</small>
                            <div className="text-white fw-bold">
                              {formData?.phone || "No phone number available"}
                            </div>
                            <Form.Text className="text-secondary">
                              WhatsApp receipt will be sent to this number
                            </Form.Text>
                          </div>
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

                    {/* WhatsApp Notification Info */}
                    <Row className="mb-3">
                      <Col md={8} lg={6}>
                        <Alert variant="info" className="py-2">
                          <small>
                            <i className="bi bi-whatsapp me-2"></i>
                            After successful payment, WhatsApp will open with the payment receipt. You need to click send to deliver the message.
                          </small>
                        </Alert>
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