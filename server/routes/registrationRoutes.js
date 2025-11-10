import express from "express";

import { createStudent, deleteStudent, getstudentNamesById, getStudents, updateProjectStatus, updateStudent } from "../controllers/studentController.js";


const router = express.Router();

// Create new registration
router.post("/", createStudent);
router.put('/:id',updateStudent)
router.delete('/:id',deleteStudent)
// View all projects
// router.get("/projects", getProjects);

// View all internships
// router.get("/internships", getInternships);

// Get single registration
// router.get("/:id", getRegistrationById);
router.get("/", getStudents);
router.get('/names',getstudentNamesById)
router.put("/:id/projectstatus", updateProjectStatus);

export default router;
