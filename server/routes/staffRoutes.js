import express from "express";
import { registerStaff, loginStaff, getAllStaff, updateStaffRole } from "../controllers/staffController.js";

const router = express.Router();

// Register new staff
router.post("/register", registerStaff);

// Staff login
router.post("/login", loginStaff);

router.get('/all',getAllStaff)
router.put("/:staffId/role", updateStaffRole);
export default router;
