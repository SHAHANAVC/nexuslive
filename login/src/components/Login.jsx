// import React, { useState } from 'react'
// import axios from 'axios'
// import { Container, Row, Col, Card, Form, InputGroup } from 'react-bootstrap'
// import { useNavigate } from 'react-router-dom'
// import api from '../api'

// function Login() {
//   const [showPassword, setShowPassword] = useState(false)
//   const [user, setUser] = useState('')
//   const [password, setPassword] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const navigate = useNavigate()

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword)
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError('')
//     setLoading(true)

//     try {
//       const response = await api.post('/staff/login', {
//         email: user,
//         password: password,
//       })

//       const data = response.data
//       console.log('Login Response:', data)

//       // ✅ Check backend response
//       if (data.message === 'Login successful' && data.token && data.staff) {
//         // Save token in localStorage
//         localStorage.setItem('token', data.token)
//         localStorage.setItem('staff', JSON.stringify(data.staff))

//         // Redirect by role
//         const role = data.staff.role
//         if (role === 'superAdmin') {
//           navigate('/superadmin')
//         } else if (role === 'admin') {
//           navigate('/admin')
//         } else if (role === 'staff') {
//           navigate('/staffdash')
//         } else {
//           throw new Error('Unknown role')
//         }
//       } else {
//         throw new Error(data.message || 'Invalid credentials')
//       }
//     } catch (err) {
//       console.error('Login error:', err)
//       setError(err.response?.data?.message || err.message || 'Login failed')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="login-page">
//       <Container fluid className="h-100">
//         <Row className="h-100 justify-content-center align-items-center">
//           <Col xs={12} sm={8} md={6} lg={4}>
//             <div className="text-center mb-4">
//               <h1 className="logo-text">LOGIN</h1>
//               <p className="text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
//                 Please sign in to your account
//               </p>
//             </div>

//             <Card className="custom-card w-100">
//               <Card.Body className="p-5">
//                 <Form onSubmit={handleSubmit}>
//                   {error && <div className="alert alert-danger text-center">{error}</div>}

//                   <Form.Group className="mb-4">
//                     <Form.Label className="labels">Email</Form.Label>
//                     <InputGroup>
//                       <InputGroup.Text className="input-icons">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
//                           <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4" />
//                         </svg>
//                       </InputGroup.Text>
//                       <Form.Control
//                         type="email"
//                         placeholder="Enter your email"
//                         value={user}
//                         onChange={(e) => setUser(e.target.value)}
//                         required
//                         className="inp1"
//                       />
//                     </InputGroup>
//                   </Form.Group>

//                   <Form.Group className="mb-4">
//                     <Form.Label className="labels">Password</Form.Label>
//                     <InputGroup>
//                       <Form.Control
//                         type={showPassword ? 'text' : 'password'}
//                         placeholder="Enter your password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                         className="inp2"
//                       />
//                       <InputGroup.Text
//                         className="input-icons"
//                         style={{ cursor: 'pointer' }}
//                         onClick={togglePasswordVisibility}
//                       >
//                         {showPassword ? (
//                           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" viewBox="0 0 16 16" >
//                             <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5..." />
//                           </svg>
//                         ) : (
//                           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
//                             <path d="M16 8s-3-5.5-8-5.5S0 8 0 8..." />
//                           </svg>
//                         )} 
//                       </InputGroup.Text>
//                     </InputGroup>
//                   </Form.Group>

//                   <div className="text-center mt-3">
//                     <button
//                       type="submit"
//                       className="w-50 buttons py-2"
//                       disabled={loading}
//                     >
//                       {loading ? 'Signing In...' : 'Sign In'}
//                     </button>
//                   </div>

//                   <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
//                     <a href="#forgot" className="text-decoration-none forgot-link">
//                       Forgot password?
//                     </a>
//                   </div>
//                 </Form>

//                 <div className="text-center mt-4">
//                   <p>
//                     Don't have an account?
//                     <a href="#signup" className="text-decoration-none signup-link ms-1">
//                       Sign up here
//                     </a>
//                   </p>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   )
// }

// export default Login

// import React, { useState } from 'react'
// import { Container, Row, Col, Card, Form, InputGroup } from 'react-bootstrap'
// import { useNavigate } from 'react-router-dom'
// import api from '../api'
// import 'bootstrap-icons/font/bootstrap-icons.css' // ✅ Import Bootstrap Icons

// function Login() {
//   const [showPassword, setShowPassword] = useState(false)
//   const [user, setUser] = useState('')
//   const [password, setPassword] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const navigate = useNavigate()

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword)
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError('')
//     setLoading(true)

//     try {
//       const response = await api.post('/staff/login', {
//         email: user,
//         password: password,
//       })

//       const data = response.data
//       console.log('Login Response:', data)

//       if (data.message === 'Login successful' && data.token && data.staff) {
//         localStorage.setItem('token', data.token)
//         localStorage.setItem('staff', JSON.stringify(data.staff))

//         const role = data.staff.role
//         if (role === 'superAdmin') {
//           navigate('/superadmin')
//         } else if (role === 'admin') {
//           navigate('/admin')
//         } else if (role === 'staff') {
//           navigate('/staff')
//         } else {
//           throw new Error('Unknown role')
//         }
//       } else {
//         throw new Error(data.message || 'Invalid credentials')
//       }
//     } catch (err) {
//       console.error('Login error:', err)
//       setError(err.response?.data?.message || err.message || 'Login failed')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="login-page">
//       <Container fluid className="h-100">
//         <Row className="h-100 justify-content-center align-items-center">
//           <Col xs={12} sm={8} md={6} lg={4}>
//             <div className="text-center mb-4">
//               <h1 className="logo-text">LOGIN</h1>
//               <p className="text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
//                 Please sign in to your account
//               </p>
//             </div>

//             <Card className="custom-card w-100">
//               <Card.Body className="p-5">
//                 <Form onSubmit={handleSubmit}>
//                   {error && <div className="alert alert-danger text-center">{error}</div>}

//                   <Form.Group className="mb-4">
//                     <Form.Label className="labels">Email</Form.Label>
//                     <InputGroup>
//                       <InputGroup.Text className="input-icons">
//                         <i className="bi bi-person-fill"></i>
//                       </InputGroup.Text>
//                       <Form.Control
//                         type="email"
//                         placeholder="Enter your email"
//                         value={user}
//                         onChange={(e) => setUser(e.target.value)}
//                         required
//                         className="inp1"
//                       />
//                     </InputGroup>
//                   </Form.Group>

//                   <Form.Group className="mb-4">
//                     <Form.Label className="labels">Password</Form.Label>
//                     <InputGroup>
//                       <Form.Control
//                         type={showPassword ? 'text' : 'password'}
//                         placeholder="Enter your password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                         className="inp2"
//                       />
//                       <InputGroup.Text
//                         className="input-icons"
//                         style={{ cursor: 'pointer' }}
//                         onClick={togglePasswordVisibility}
//                       >
//                         <i className={`bi ${showPassword ? 'bi-eye-slash-fill text-danger' : 'bi-eye-fill text-white'}`}></i>
//                       </InputGroup.Text>
//                     </InputGroup>
//                   </Form.Group>

//                   <div className="text-center mt-3">
//                     <button
//                       type="submit"
//                       className="w-50 buttons py-2"
//                       disabled={loading}
//                     >
//                       {loading ? 'Signing In...' : 'Sign In'}
//                     </button>
//                   </div>

//                   <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
//                     <a href="#forgot" className="text-decoration-none forgot-link">
//                       Forgot password?
//                     </a>
//                   </div>
//                 </Form>

//                 <div className="text-center mt-4">
//                   <p>
//                     Don't have an account?
//                     <a href="#signup" className="text-decoration-none signup-link ms-1">
//                       Sign up here
//                     </a>
//                   </p>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   )
// }

// export default Login

// import React, { useState } from 'react'
// import { Container, Row, Col, Card, Form, InputGroup } from 'react-bootstrap'
// import { useNavigate } from 'react-router-dom'
// import api from '../api'
// import { useAuth } from "../context/AuthContext";
// import 'bootstrap-icons/font/bootstrap-icons.css' // ✅ Import Bootstrap Icons

// function Login() {
//   const [showPassword, setShowPassword] = useState(false)
//   const [user, setUser] = useState('')
//   const [password, setPassword] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//     const { login } = useAuth();
//   const navigate = useNavigate()

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword)
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError('')
//     setLoading(true)

  
//   //  try {
//   //     const staff = await login(user, password);
//   //     console.log(staff,'----');
//   //     console.log(staff.role);
      
//   //     if (staff.role == "superAdmin") navigate("/superadmin");
//   //     else if (staff.role == "admin") navigate("/admin");
//   //     else if (staff.role === "staff") navigate("/staffdash");
//   //   } catch (err) {
//   //     setError("Invalid credentials or network error");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // }
// try {
//       const staff = await login(user, password);
//       console.log('Login successful, staff:', staff);
      
//       // ✅ Add small delay to ensure state is updated
//       setTimeout(() => {
//         if (staff.role === "superAdmin") {
//           navigate("/superadmin");
//         } else if (staff.role === "admin") {
//           navigate("/admin");
//         } else if (staff.role === "staff") {
//           navigate("/staffdash");
//         } else {
//           setError("Unknown user role");
//         }
//       }, 100);
      
//     } catch (err) {
//       console.error('Login error:', err);
//       setError(err.response?.data?.message || "Invalid credentials or network error");
//     } finally {
//       setLoading(false);
//     }
//   }
//   return (
//     <div className="login-page">
//       <Container fluid className="h-100">
//         <Row className="h-100 justify-content-center align-items-center">
//           <Col xs={12} sm={8} md={6} lg={4}>
//             <div className="text-center mb-4">
//               <h1 className="logo-text">LOGIN</h1>
//               <p className="text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
//                 Please sign in to your account
//               </p>
//             </div>

//             <Card className="custom-card w-100">
//               <Card.Body className="p-5">
//                 <Form onSubmit={handleSubmit}>
//                   {error && <div className="alert alert-danger text-center">{error}</div>}

//                   <Form.Group className="mb-4">
//                     <Form.Label className="labels">Email</Form.Label>
//                     <InputGroup>
//                       <InputGroup.Text className="input-icons">
//                         <i className="bi bi-person-fill"></i>
//                       </InputGroup.Text>
//                       <Form.Control
//                         type="email"
//                         placeholder="Enter your email"
//                         value={user}
//                         onChange={(e) => setUser(e.target.value)}
//                         required
//                         className="inp1"
//                       />
//                     </InputGroup>
//                   </Form.Group>

//                   <Form.Group className="mb-4">
//                     <Form.Label className="labels">Password</Form.Label>
//                     <InputGroup>
//                       <Form.Control
//                         type={showPassword ? 'text' : 'password'}
//                         placeholder="Enter your password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                         className="inp2"
//                       />
//                       <InputGroup.Text
//                         className="input-icons"
//                         style={{ cursor: 'pointer' }}
//                         onClick={togglePasswordVisibility}
//                       >
//                         <i className={`bi ${showPassword ? 'bi-eye-slash-fill text-danger' : 'bi-eye-fill text-white'}`}></i>
//                       </InputGroup.Text>
//                     </InputGroup>
//                   </Form.Group>

//                   <div className="text-center mt-3">
//                     <button
//                       type="submit"
//                       className="w-50 buttons py-2"
//                       disabled={loading}
//                     >
//                       {loading ? 'Signing In...' : 'Sign In'}
//                     </button>
//                   </div>

//                   <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
//                     <a href="#forgot" className="text-decoration-none forgot-link">
//                       Forgot password?
//                     </a>
//                   </div>
//                 </Form>

//                 <div className="text-center mt-4">
//                   <p>
//                     Don't have an account?
//                     <a href="#signup" className="text-decoration-none signup-link ms-1">
//                       Sign up here
//                     </a>
//                   </p>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   )
// }

// export default Login

import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Form, InputGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../context/AuthContext";
import 'bootstrap-icons/font/bootstrap-icons.css'

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { auth, login } = useAuth();
  const navigate = useNavigate()

  // ✅ BEST: Navigate when auth state updates
  useEffect(() => {
    if (auth.user && auth.token) {
      console.log('Auto-navigating based on role:', auth.user.role);
      if (auth.user.role === "superAdmin") {
        navigate("/superadmin");
      } else if (auth.user.role === "admin") {
        navigate("/admin");
      } else if (auth.user.role === "staff") {
        navigate("/staff");
      }
      else if (auth.user.role === "teamlead"){
        navigate("/teamlead")
      }
    }
  }, [auth.user, auth.token, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(user, password);
      // ✅ Navigation will happen automatically via useEffect
      // No need to navigate manually here
      console.log('Login request completed');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || "Invalid credentials or network error");
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <Container fluid className="h-100">
        <Row className="h-100 justify-content-center align-items-center">
          <Col xs={12} sm={8} md={6} lg={4}>
            <div className="text-center mb-4">
              <h1 className="logo-text">LOGIN</h1>
              <p className="text-white">
                Please sign in to your account
              </p>
            </div>

            <Card className="custom-card w-100">
              <Card.Body className="p-5">
                <Form onSubmit={handleSubmit}>
                  {error && <div className="alert alert-danger text-center">{error}</div>}

                  <Form.Group className="mb-4">
                    <Form.Label className="labels">Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="input-icons">
                        <i className="bi bi-person-fill"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        required
                        className="inp1"
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="labels">Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="inp2"
                      />
                      <InputGroup.Text
                        className="input-icons"
                        style={{ cursor: 'pointer' }}
                        onClick={togglePasswordVisibility}
                      >
                        <i className={`bi ${showPassword ? 'bi-eye-slash-fill text-danger' : 'bi-eye-fill text-white'}`}></i>
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>

                  <div className="text-center mt-3">
                    <button
                      type="submit"
                      className="w-50 buttons py-2"
                      disabled={loading}
                    >
                      {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login