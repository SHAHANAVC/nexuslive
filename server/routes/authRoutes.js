// routes/authRoutes.js
import express from "express";
import { 
  loginStaff, 
  refreshToken, 
  logoutStaff, 
//   getStaffProfile,
//   debugCookies 
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginStaff);
router.post("/refresh-token", refreshToken);
router.post("/logout", logoutStaff);
// router.get("/profile", protect, getStaffProfile);
// router.get("/debug-cookies", debugCookies);

export default router;