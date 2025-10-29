// import Staff from "../models/staff.js";
// import bcrypt from "bcrypt";
// import tokenService from "../utils/tokenService.js";

// export const loginStaff = async (req, res) => {
//   try {
//     const { email, password } = req.body;
    
//     // Input validation
//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password required" });
//     }

//     // Find staff
//     const staff = await Staff.findOne({ email });
//     if (!staff) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     // Verify password
//     const isMatch = await bcrypt.compare(password, staff.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     // Generate tokens using token service
//     const accessToken = tokenService.generateAccessToken(staff._id, staff.role);
//     const refreshToken = tokenService.generateRefreshToken(staff._id, staff.role);

//     // Save refresh token to database
//     staff.refreshToken = refreshToken;
//     await staff.save();

//     // ✅ FIXED: Cookie settings for cross-origin development
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: false, // false for HTTP development
//       sameSite: "lax", // allows cross-origin from localhost:5173 to 192.168.1.84:5000
//       maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
//     });

//     // Return access token and staff info
//     res.json({
//       message: "Login successful",
//       accessToken,
//       staff: {
//         id: staff._id,
//         name: staff.name,
//         email: staff.email,
//         role: staff.role,
//         employeeId: staff.employeeId
//       }
//     });

//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: "Server error during login" });
//   }
// };

// export const refreshToken = async (req, res) => {
//   try {
//     const refreshToken = req.cookies.refreshToken;
    
//     console.log('🔍 Refresh token endpoint hit - Cookies:', req.cookies);
    
//     if (!refreshToken) {
//       console.log('❌ No refresh token in cookies');
//       return res.status(401).json({ message: "Refresh token required" });
//     }

//     // Verify refresh token using service
//     const decoded = tokenService.verifyRefreshToken(refreshToken);
//     console.log('✅ Refresh token decoded:', decoded);
    
//     // Find staff with this refresh token
//     const staff = await Staff.findOne({ 
//       _id: decoded.id, 
//       refreshToken: refreshToken 
//     });
    
//     if (!staff) {
//       console.log('❌ Staff not found with this refresh token');
//       return res.status(401).json({ message: "Invalid refresh token" });
//     }

//     console.log('✅ Staff found:', staff.email);

//     // Generate new access token
//     const accessToken = tokenService.generateAccessToken(staff._id, staff.role);

//     res.json({ 
//       accessToken,
//       staff: {
//         id: staff._id,
//         name: staff.name,
//         email: staff.email,
//         role: staff.role,
//         employeeId: staff.employeeId
//       }
//     });

//   } catch (error) {
//     console.error('❌ Refresh token error:', error.message);
    
//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({ message: "Refresh token expired" });
//     }
//     if (error.name === 'JsonWebTokenError') {
//       return res.status(401).json({ message: "Invalid refresh token" });
//     }
    
//     res.status(500).json({ message: "Server error during token refresh" });
//   }
// };

// export const logoutStaff = async (req, res) => {
//   try {
//     const refreshToken = req.cookies.refreshToken;
    
//     if (refreshToken) {
//       try {
//         const decoded = tokenService.verifyRefreshToken(refreshToken);
//         await Staff.findByIdAndUpdate(decoded.id, { refreshToken: null });
//       } catch (error) {
//         // Token might be expired, still clear it
//         console.log('Token verification failed during logout:', error.message);
//       }
//     }

//     // ✅ FIXED: Clear cookie with same settings as login
//     res.clearCookie("refreshToken", {
//       httpOnly: true,
//       secure: false,
//       sameSite: "lax"
//     });

//     res.json({ message: "Logged out successfully" });

//   } catch (error) {
//     console.error('Logout error:', error);
//     res.status(500).json({ message: "Server error during logout" });
//   }
// };

// export const getStaffProfile = async (req, res) => {
//   try {
//     const staff = await Staff.findById(req.user.id).select('-password -refreshToken');
//     if (!staff) {
//       return res.status(404).json({ message: "Staff not found" });
//     }
//     res.json({ 
//       staff: { 
//         id: staff._id, 
//         name: staff.name, 
//         email: staff.email, 
//         role: staff.role,
//         employeeId: staff.employeeId
//       } 
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ ADDED: Debug endpoint to check cookies
// export const debugCookies = async (req, res) => {
//   console.log('🍪 Debug Cookies:', req.cookies);
//   console.log('📨 Headers:', req.headers);
//   res.json({
//     cookies: req.cookies,
//     headers: req.headers,
//     message: 'Check server console for details'
//   });
// };

// controllers/authController.js
import Staff from "../models/staff.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginStaff = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const staff = await Staff.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i')} });
    if (!staff) {
      return res.status(400).json({ message: "Invalid email " });
    }

    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid   password" });
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { id: staff._id, role: staff.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: staff._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // Save refresh token to database
    staff.refreshToken = refreshToken;
    await staff.save();

    // ✅ SET COOKIE (will work now with simple CORS)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      message: "Login successful",
      accessToken,
      staff: {
        id: staff._id,
        name: staff.name,
        email: staff.email,
        role: staff.role,
        employeeId: staff.employeeId
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Server error during login" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    
    console.log('🔄 Refresh token endpoint hit');
    
    if (!refreshToken) {
      console.log('❌ No refresh token in cookies');
      return res.status(401).json({ message: "No refresh token" });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    
    // Find staff with this refresh token
    const staff = await Staff.findOne({ 
      _id: decoded.id, 
      refreshToken: refreshToken 
    });
    
    if (!staff) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Generate new access token
    const accessToken = jwt.sign(
      { id: staff._id, role: staff.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    console.log('✅ Refresh successful for:', staff.email);

    res.json({ 
      accessToken,
      staff: {
        id: staff._id,
        name: staff.name,
        email: staff.email,
        role: staff.role,
        employeeId: staff.employeeId
      }
    });

  } catch (error) {
    console.error('❌ Refresh token error:', error.message);
    res.status(401).json({ message: "Refresh token invalid" });
  }
};

export const logoutStaff = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    
    if (refreshToken) {
      try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        await Staff.findByIdAndUpdate(decoded.id, { refreshToken: null });
      } catch (error) {
        console.log('Token verification failed during logout');
      }
    }

    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: "Server error during logout" });
  }
};