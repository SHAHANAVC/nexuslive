import express from "express";
import { 
  registerStaff, 
  getAllStaff, 
  updateStaffRole, 
  getStaffById, 
  updateStaff, 
  deleteStaff, 
  changeStaffPassword 
} from "../controllers/staffController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerStaff);
router.get("/all", getAllStaff);
router.get("/:id", getStaffById);
router.put("/:id", updateStaff);
router.put("/:staffId/role", updateStaffRole);
router.delete("/:id", deleteStaff);
router.put("/:id/change-password", changeStaffPassword);

export default router;