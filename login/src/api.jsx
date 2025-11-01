// // src/api.js
// import axios from 'axios';

// const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://192.168.1.84:5000/api';
// console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);
// // ✅ FIXED: Axios configuration with credentials
// const api = axios.create({
//   baseURL: API_BASE,
//   withCredentials: true, // ✅ CRUCIAL: This sends cookies
//   timeout: 10000,
// });

// // Request interceptor to add auth token if available
// api.interceptors.request.use(
//   (config) => {
//     // Token will be added by AuthContext after login
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
    
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         console.log('🔄 Interceptor: Attempting token refresh...');
//         const refreshRes = await api.post("/auth/refresh-token", {}, { 
//           withCredentials: true 
//         });
//         const { accessToken } = refreshRes.data;
        
//         api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//         originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        
//         return api(originalRequest);
//       } catch (err) {
//         console.log('❌ Interceptor: Token refresh failed');
//         // Let AuthContext handle the redirect
//         return Promise.reject(err);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;


// src/api.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://192.168.1.88:5000/api';

// ✅ SIMPLE API CONFIG - NO INTERCEPTORS
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

export default api;