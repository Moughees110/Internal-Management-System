const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const upload = require("../middlewares/upload");

// Get all projects
router.get("/getProjects", projectController.getAllProjects);

// Get project by ID
router.get("/getProjectById/:id", projectController.getProjectById);

// Create a new project (with optional file upload)
router.post("/createProject", upload.single("attachment"), projectController.createProject);

// Update an existing project (with optional file upload)
router.put("/updateProject/:id", upload.single("attachment"), projectController.updateProject);

// Delete a project
router.delete("/deleteProject/:id", projectController.deleteProject);

module.exports = router;