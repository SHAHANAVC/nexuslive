import tokenService from "../utils/tokenService.js";
import Staff from "../models/staff.js";

export const protect = async (req, res, next) => {
  try {
    const token = tokenService.extractTokenFromHeader(req.headers.authorization);
    
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // Verify token using service
    const decoded = tokenService.verifyAccessToken(token);
    
    // Get staff data
    const staff = await Staff.findById(decoded.id).select('-password -refreshToken');
    
    if (!staff) {
      return res.status(401).json({ message: "Not authorized, staff not found" });
    }

    req.user = staff;
    next();

  } catch (error) {
    console.error('Auth middleware error:', error.message);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expired" });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token" });
    }
    
    res.status(401).json({ message: "Not authorized" });
  }
};