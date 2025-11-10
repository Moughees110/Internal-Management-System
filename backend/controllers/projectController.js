 const projectService = require("../services/projectService");

 exports.getAllProjects = async (req, res) => {
  try {
    const projects = await projectService.getAllProjects();
    res.status(200).json({ projectList: projects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await projectService.getProjectById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project retrieved successfully!", project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await projectService.deleteProject(id);

    if (!deleted) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { name, client, description } = req.body;

    // Handle attachment if uploaded
    let attachment;
    if (req.file) {
      attachment = `/uploads/${req.file.filename}`;
    }

    const data = { name, client, description };
    if (attachment) data.attachment = attachment;

    const newProject = await projectService.createProject(data);
    res.status(201).json({
      message: "Project created successfully",
      project: newProject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route params
    const { name, client, description } = req.body;

    // Handle attachment if uploaded
    let attachment;
    if (req.file) {
      attachment = `/uploads/${req.file.filename}`;
    }

    const data = { name, client, description };
    if (attachment) data.attachment = attachment;

    const updatedProject = await projectService.updateProject(id, data);
    if (!updatedProject)
      return res.status(404).json({ message: "Project not found" });

    res.status(200).json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};