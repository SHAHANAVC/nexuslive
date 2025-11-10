import express from "express";
import {
  createTask,
  getAllTasks,
  getTasksByStaff,
  updateTask,
  deleteTask,
  updateTaskProgress,
} from "../controllers/taskController.js";

const router = express.Router();

// Super Admin creates & manages tasks
router.post("/", createTask);
router.get("/", getAllTasks);
router.get("/staff/:staffId", getTasksByStaff);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.put("/:id/update", updateTaskProgress);
export default router;
