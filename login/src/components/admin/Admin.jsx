// // Admin.jsx
// import React, { useState } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Button,
//   Badge,
//   ProgressBar,
//   Navbar,
//   Nav,
//   Form,
//   InputGroup,
//   Dropdown,
// } from "react-bootstrap";
// import Admindash from "./Admindash";
// import Adminstudent from "./Adminstudent";
// import StaffRegistration from "../StaffRegistration";
// import AdminStaff from "./AdminStaff";
// import Payment from "./Payment"; // Adjust path if needed
// import PaymentView from "./ViewPayment";
// import Profile from "./Profile";

// function Admin() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activePage, setActivePage] = useState("dashboard");
// // let data=localStorage.getItem('staff')
// // console.log(data.name);
// let data = localStorage.getItem('staff');
// if (data) {
//   data = JSON.parse(data); // Convert string back to object
//   // console.log(data.name);  // Now this works
// }

//   const renderPage = () => {
//     switch (activePage) {
//       case "dashboard":
//         return <Admindash />;
//       case "settings":
//         return <Profile staffData={data} />;
//       // Add more cases as you create components
//       case "adminstudent": return <Adminstudent/>
//       case "staffs": return <AdminStaff/>
//       case "payment": // Add this new case for Payment
//       return <PaymentView/>;
//       case "tasks": 
//       // case "calendar":
//       // case "reports":
//         // Return a placeholder or actual component
//         return (
//           <Container fluid>
//             <Row className="mb-4">
//               <Col>
//                 <h2 className="text-white text-capitalize">
//                   {activePage} Page
//                 </h2>
//                 <p className="text-light">This page is under construction</p>
//               </Col>
//             </Row>
//           </Container>
//         );
//       default:
//         return <Dashboard />;
//     }
//   };

//   // Function to handle navigation clicks
//   const handleNavigation = (pageName) => {
//     const pageKey = pageName.toLowerCase();
//     setActivePage(pageKey);
//     // Close sidebar on mobile after selection
//     if (window.innerWidth < 992) {
//       setSidebarOpen(false);
//     }
//   };

//   // Menu items configuration
//   const menuItems = [
//     { key: "dashboard", label: "Dashboard", icon: "speedometer2" },
//     { key: "adminstudent", label: "Student", icon: "people" },
//     { key: "staffs", label: "Staffs", icon: "people" },
//     { key: "payment", label: "Payment", icon: "credit-card" }, 
//     { key: "tasks", label: "Tasks", icon: "check-square" },
//     // { key: "calendar", label: "Calendar", icon: "calendar" },
//     // { key: "reports", label: "Reports", icon: "graph-up" },
//     { key: "settings", label: "Profile", icon: "person" },
//   ];

//   return (
//     <div
//       className="d-flex text-white"
//       style={{
//         minHeight: "100vh",
//         fontFamily: "'Inter', sans-serif",
//         background:
//           "linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #2d2d2d 100%)",
//       }}
//     >
//       {/* Sidebar */}
//       <div
//         className={`d-lg-block ${sidebarOpen ? "d-block" : "d-none"}`}
//         style={{
//           width: "300px",
//           position: sidebarOpen ? "fixed" : "static",
//           height: sidebarOpen ? "100vh" : "auto",
//           background: "rgba(255, 255, 255, 0.1)",
//           backdropFilter: "blur(20px)",
//           WebkitBackdropFilter: "blur(20px)",
//           borderRight: "1px solid rgba(255, 255, 255, 0.2)",
//           zIndex: 1000,
//         }}
//       >
//         <div className="p-3 admin-dash d-flex justify-content-between align-items-center">
//           <h3 className="mb-0 fw-bolder text-white">Admin Panel</h3>
//           <button
//             className="text-white buttons d-lg-none p-2"
//             style={{ background: "none", border: "none" }}
//             onClick={() => setSidebarOpen(false)}
//           >
//             <i className="bi bi-x-lg"></i>
//           </button>
//         </div>

//         <Nav className="flex-column p-3">
//           {menuItems.map((item) => (
//             <div key={item.key} className="sidebar-link mb-2">
//               <Nav.Link
//                 href="#"
//                 className={`text-white d-flex align-items-center gap-2 py-2 px-3 rounded ${
//                   activePage === item.key ? "active-nav-link" : ""
//                 }`}
//                 onClick={(e) => {
//                   e.preventDefault();
//                   handleNavigation(item.key);
//                 }}
//               >
//                 <i className={`bi bi-${item.icon}`}></i>
//                 {item.label}
//               </Nav.Link>
//             </div>
//           ))}
//           <div className="mt-4 pt-3 border-top border-secondary">
//             <div className="sidebar-link">
//               <Nav.Link
//                 href="#"
//                 className="text-white d-flex align-items-center gap-2 py-2 px-3 rounded"
//                 onClick={(e) => e.preventDefault()}
//               >
//                 <i className="bi bi-box-arrow-right me-2"></i>
//                 Logout
//               </Nav.Link>
//             </div>
//           </div>
//         </Nav>
//       </div>

//       {/* Main Content */}
//       <div
//         className="flex-grow-1 d-flex flex-column"
//         style={{ marginLeft: sidebarOpen ? "300px" : "0" }}
//       >
//         {/* Navbar */}
//         <Navbar
//           style={{
//             background: "rgba(255, 255, 255, 0.1)",
//             backdropFilter: "blur(20px)",
//             borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
//             position: "relative",
//             zIndex: 1030,
//             overflow: "visible",
//           }}
//         >
//           <Container fluid>
//             <div className="d-flex align-items-center">
//               <button
//                 className="text-white buttons2 d-lg-none me-3"
//                 style={{ background: "none", border: "none" }}
//                 onClick={() => setSidebarOpen(!sidebarOpen)}
//               >
//                 <i className="bi bi-list" style={{ fontSize: "1.5rem" }}></i>
//               </button>
//               <Navbar.Brand href="#" className="d-lg-none text-white">
//                 <h5 className="mb-0 text-capitalize">{activePage}</h5>
//               </Navbar.Brand>
//             </div>

//             {/* Search Bar - Hidden on mobile */}
//             <Form className="d-none d-lg-flex me-auto">
//               <InputGroup style={{ width: "300px" }}>
//                 <Form.Control
//                   type="search"
//                   placeholder="Search..."
//                   aria-label="Search"
//                   className="search-input"
//                   style={{
//                     background: "rgba(255, 255, 255, 0.1)",
//                     border: "1px solid rgba(255, 255, 255, 0.2)",
//                     color: "white",
//                   }}
//                 />
//                 <Button
//                   variant="outline-secondary"
//                   style={{
//                     background: "rgba(255, 255, 255, 0.1)",
//                     border: "1px solid rgba(255, 255, 255, 0.2)",
//                     color: "white",
//                   }}
//                 >
//                   <i className="bi bi-search"></i>
//                 </Button>
//               </InputGroup>
//             </Form>

//             {/* Three Dots Menu - Visible on small screens */}
//             <Dropdown className="d-lg-none">
//               <Dropdown.Toggle
//                 variant="outline-light"
//                 id="mobile-menu"
//                 className="d-flex align-items-center"
//               >
//                 <i className="bi bi-three-dots-vertical"></i>
//               </Dropdown.Toggle>
//               <Dropdown.Menu align="end" className="custom-dropdown">
//                 <Dropdown.Item
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     handleNavigation("settings");
//                   }}
//                   className="text-dark"
//                 >
//                   <i className="bi bi-person me-2"></i>
//                   Profile
//                 </Dropdown.Item>
//                 <Dropdown.Divider />
//                 <Dropdown.Item href="#logout" className="text-dark">
//                   <i className="bi bi-box-arrow-right me-2"></i>
//                   Logout
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>

//             {/* Desktop Navigation Items */}
//             <div className="d-none d-lg-flex align-items-center">
//               {/* Regular Desktop Dropdown */}
//               <Dropdown align="end">
//                 <Dropdown.Toggle
//                   variant="outline-light"
//                   id="dropdown-user"
//                   className="d-flex align-items-center ms-2"
//                 >
//                   {/* <img
//                     src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
//                     alt="User"
//                     className="rounded-circle me-2"
//                     style={{
//                       width: "32px",
//                       height: "32px",
//                       objectFit: "cover",
//                     }}
//                   /> */}
//                   <div 
//                   className="rounded-circle d-flex align-items-center justify-content-center me-3"
//                   style={{
//                     width: '40px',
//                     height: '40px',
//                     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                     fontSize: '1.5rem',
//                     fontWeight: '600',
//                     color: 'white'
//                   }}
//                 >
//                   {data.name?.charAt(0) || 'A'}
//                 </div>
//                   <span>{data.name?data.name:''}</span>
//                 </Dropdown.Toggle>

//                 <Dropdown.Menu className="custom-dropdown">
//                   <Dropdown.Item
//                     href="#"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       handleNavigation("settings");
//                     }}
//                     className="text-dark"
//                   >
//                     <i className="bi bi-person me-2"></i>
//                     Profile
//                   </Dropdown.Item>
//                   <Dropdown.Divider />
//                   <Dropdown.Item href="#logout" className="text-dark">
//                     <i className="bi bi-box-arrow-right me-2"></i>
//                     Logout
//                   </Dropdown.Item>
//                 </Dropdown.Menu>
//               </Dropdown>
//             </div>
//           </Container>
//         </Navbar>

//         {/* Page Content with Scroll - This area changes dynamically */}
//         <div
//           className="flex-grow-1 p-3"
//           style={{
//             overflowY: "auto",
//             maxHeight: "calc(100vh - 76px)",
//           }}
//         >
//           {renderPage()}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Admin;
// src/components/admin/Admin.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Navbar,
  Nav,
  Form,
  InputGroup,
  Dropdown,
} from "react-bootstrap";
import Admindash from "./Admindash";
import Adminstudent from "./Adminstudent";
import AdminStaff from "./AdminStaff";
import PaymentView from "./ViewPayment";
import Profile from "./Profile";
import { useAuth } from "../../context/AuthContext";

function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const { auth, logout } = useAuth();

  // Safe data handling
  const userData = auth.user;
  const userName = userData?.name || 'Admin';
  const userInitial = userName.charAt(0).toUpperCase();

  // Show loading while auth is checking
  if (auth.loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ 
        height: '100vh', 
        background: "linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #2d2d2d 100%)" 
      }}>
        <div className="text-white text-center">
          <div className="spinner-border text-primary mb-3"></div>
          <p>Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  // If no user, show message
  if (!auth.user) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ 
        height: '100vh', 
        background: "linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #2d2d2d 100%)" 
      }}>
        <div className="text-white text-center">
          <h3>Please login to access Admin Panel</h3>
          <Button 
            variant="primary" 
            onClick={() => window.location.href = '/'}
            className="mt-3"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Admindash />;
      case "settings":
        return <Profile staffData={userData} />;
      case "adminstudent": 
        return <Adminstudent/>;
      case "staffs": 
        return <AdminStaff/>;
      case "payment":
        return <PaymentView/>;
      case "tasks": 
        return (
          <Container fluid>
            <Row className="mb-4">
              <Col>
                <h2 className="text-white text-capitalize">{activePage} Page</h2>
                <p className="text-light">This page is under construction</p>
              </Col>
            </Row>
          </Container>
        );
      default:
        return <Admindash />;
    }
  };

  const handleNavigation = (pageName) => {
    const pageKey = pageName.toLowerCase();
    setActivePage(pageKey);
    if (window.innerWidth < 992) {
      setSidebarOpen(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: "speedometer2" },
    { key: "adminstudent", label: "Student", icon: "people" },
    { key: "staffs", label: "Staffs", icon: "people" },
    { key: "payment", label: "Payment", icon: "credit-card" }, 
    { key: "tasks", label: "Tasks", icon: "check-square" },
    { key: "settings", label: "Profile", icon: "person" },
  ];

  return (
    <div className="d-flex text-white" style={{
      minHeight: "100vh",
      fontFamily: "'Inter', sans-serif",
      background: "linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #2d2d2d 100%)",
    }}>
      {/* Sidebar */}
      <div className={`d-lg-block ${sidebarOpen ? "d-block" : "d-none"}`} style={{
        width: "300px",
        position: sidebarOpen ? "fixed" : "static",
        height: sidebarOpen ? "100vh" : "auto",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(20px)",
        borderRight: "1px solid rgba(255, 255, 255, 0.2)",
        zIndex: 1000,
      }}>
        <div className="p-3 admin-dash d-flex justify-content-between align-items-center">
          <h3 className="mb-0 fw-bolder text-white">Admin Panel</h3>
          <button className="text-white buttons d-lg-none p-2" style={{ background: "none", border: "none" }} onClick={() => setSidebarOpen(false)}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <Nav className="flex-column p-3">
          {menuItems.map((item) => (
            <div key={item.key} className="sidebar-link mb-2">
              <Nav.Link href="#" className={`text-white d-flex align-items-center gap-2 py-2 px-3 rounded ${activePage === item.key ? "active-nav-link" : ""}`} onClick={(e) => { e.preventDefault(); handleNavigation(item.key); }} >
                <i className={`bi bi-${item.icon}`}></i>
                {item.label}
              </Nav.Link>
            </div>
          ))}
          <div className="mt-4 pt-3 border-top border-secondary">
            <div className="sidebar-link">
              <Nav.Link href="#" className="text-white d-flex align-items-center gap-2 py-2 px-3 rounded" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-2"></i>
                Logout
              </Nav.Link>
            </div>
          </div>
        </Nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column" style={{ marginLeft: sidebarOpen ? "300px" : "0" }}>
        <Navbar style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          position: "relative",
          zIndex: 1030,
        }}>
          <Container fluid>
            <div className="d-flex align-items-center">
              <button className="text-white buttons2 d-lg-none me-3" style={{ background: "none", border: "none" }} onClick={() => setSidebarOpen(!sidebarOpen)}>
                <i className="bi bi-list" style={{ fontSize: "1.5rem" }}></i>
              </button>
              <Navbar.Brand href="#" className="d-lg-none text-white">
                <h5 className="mb-0 text-capitalize">{activePage}</h5>
              </Navbar.Brand>
            </div>

            <Form className="d-none d-lg-flex me-auto">
              <InputGroup style={{ width: "300px" }}>
                <Form.Control type="search" placeholder="Search..." className="search-input" style={{ background: "rgba(255, 255, 255, 0.1)", border: "1px solid rgba(255, 255, 255, 0.2)", color: "white" }} />
                <Button variant="outline-secondary" style={{ background: "rgba(255, 255, 255, 0.1)", border: "1px solid rgba(255, 255, 255, 0.2)", color: "white" }}>
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
            </Form>

            <div className="d-none d-lg-flex align-items-center">
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-light" id="dropdown-user" className="d-flex align-items-center ms-2">
                  <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', fontSize: '1.5rem', fontWeight: '600', color: 'white' }}>
                    {userInitial}
                  </div>
                  <span>{userName}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="custom-dropdown">
                  <Dropdown.Item href="#" onClick={(e) => { e.preventDefault(); handleNavigation("settings"); }} className="text-dark">
                    <i className="bi bi-person me-2"></i>Profile
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="text-dark">
                    <i className="bi bi-box-arrow-right me-2"></i>Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Container>
        </Navbar>

        <div className="flex-grow-1 p-3" style={{ overflowY: "auto", maxHeight: "calc(100vh - 76px)" }}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default Admin;