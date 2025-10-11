import express from "express";
import {
  createRegistration,
  // getProjects,
  // getInternships,
  // getRegistrationById,
} from "../controllers/registrationController.js";

const router = express.Router();

// Create new registration
router.post("/", createRegistration);

// View all projects
// router.get("/projects", getProjects);

// View all internships
// router.get("/internships", getInternships);

// Get single registration
// router.get("/:id", getRegistrationById);

export default router;
