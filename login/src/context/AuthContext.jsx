// // src/context/AuthContext.js
// import React, { createContext, useState, useContext, useEffect } from "react";
// import api from "../api";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({ 
//     user: null, 
//     token: null,
//     loading: true
//   });

//   const login = async (email, password) => {
//     try {
//       console.log('🔐 Attempting login...');
//       const res = await api.post("/auth/login", { email, password });
//       const { staff, accessToken } = res.data;

//       // Set authorization header for future requests
//       api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      
//       setAuth({ 
//         user: staff, 
//         token: accessToken, 
//         loading: false 
//       });
      
//       console.log('✅ Login successful for:', staff.email);
//       return staff;

//     } catch (error) {
//       console.error('❌ Login error:', error.response?.data || error.message);
//       setAuth(prev => ({ ...prev, loading: false }));
//       throw error;
//     }
//   };

//   const logout = async () => {
//     try {
//       await api.post("/auth/logout", {}, { withCredentials: true });
//     } catch (error) {
//       console.log('Logout error:', error);
//     } finally {
//       setAuth({ user: null, token: null, loading: false });
//       delete api.defaults.headers.common["Authorization"];
//       window.location.href = '/';
//     }
//   };

//   // Auto-login on page refresh
//   useEffect(() => {
//     const autoLogin = async () => {
//       try {
//         console.log('🔄 AuthContext: Attempting auto-login...');
        
//         const refreshRes = await api.post("/auth/refresh-token", {}, { 
//           withCredentials: true 
//         });
        
//         const { accessToken, staff } = refreshRes.data;
//         console.log('✅ AuthContext: Auto-login successful for:', staff.email);
        
//         api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
//         setAuth({ 
//           user: staff, 
//           token: accessToken, 
//           loading: false 
//         });
        
//       } catch (error) {
//         console.log('❌ AuthContext: Auto-login failed -', {
//           status: error.response?.status,
//           message: error.response?.data?.message,
//           error: error.message
//         });
        
//         // This is normal for first-time visitors or expired sessions
//         setAuth({ 
//           user: null, 
//           token: null, 
//           loading: false 
//         });
        
//         delete api.defaults.headers.common["Authorization"];
//       }
//     };

//     autoLogin();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ auth, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ 
    user: null, 
    token: null,
    loading: true
  });

  const login = async (email, password) => {
    try {
      console.log('🔐 Attempting login...');
      const res = await api.post("/auth/login", { email, password });
      const { staff, accessToken } = res.data;

      // Set authorization header
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      
      // Store in localStorage as backup
      localStorage.setItem('userData', JSON.stringify(staff));
      localStorage.setItem('accessToken', accessToken);
      
      setAuth({ 
        user: staff, 
        token: accessToken, 
        loading: false 
      });
      
      console.log('✅ Login successful for:', staff.email);
      return staff;

    } catch (error) {
      console.error('❌ Login error:', error.response?.data || error.message);
      setAuth(prev => ({ ...prev, loading: false }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.log('Logout error:', error);
    } finally {
      setAuth({ user: null, token: null, loading: false });
      localStorage.removeItem('userData');
      localStorage.removeItem('accessToken');
      delete api.defaults.headers.common["Authorization"];
      window.location.href = '/';
    }
  };

  // ✅ SIMPLE AUTO-LOGIN - ONE ATTEMPT ONLY
  useEffect(() => {
    const autoLogin = async () => {
      try {
        console.log('🔄 Checking auto-login...');
        
        const response = await api.post("/auth/refresh-token");
        const { accessToken, staff } = response.data;
        
        console.log('✅ Auto-login successful');
        
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        setAuth({ 
          user: staff, 
          token: accessToken, 
          loading: false 
        });
        
      } catch (error) {
        console.log('❌ Auto-login failed - using localStorage fallback');
        
        // Try localStorage fallback
        const storedUser = localStorage.getItem('userData');
        const storedToken = localStorage.getItem('accessToken');
        
        if (storedUser && storedToken) {
          console.log('🔄 Using stored credentials');
          setAuth({ 
            user: JSON.parse(storedUser), 
            token: storedToken, 
            loading: false 
          });
          api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
        } else {
          setAuth({ 
            user: null, 
            token: null, 
            loading: false 
          });
        }
      }
    };

    autoLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);