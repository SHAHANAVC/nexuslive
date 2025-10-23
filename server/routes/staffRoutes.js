import express from "express";
import { registerStaff, loginStaff, getAllStaff, updateStaffRole, updateStaff, deleteStaff } from "../controllers/staffController.js";

const router = express.Router();

// Register new staff
router.post("/register", registerStaff);

// Staff login
router.post("/login", loginStaff);

router.get('/all',getAllStaff)
router.put("/:staffId/role", updateStaffRole);
router.put('/:id',updateStaff)
router.delete('/:id',deleteStaff)
export default router;
