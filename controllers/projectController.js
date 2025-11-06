
const Project = require('../models/project');

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json({ projectList: projects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project retrieved successfully!', project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addUpdateProject = async (req, res) => {
  try {
    const { id, name, client, description } = req.body;

    // If a file was uploaded, its info will be in req.file
    let attachment;
    if (req.file) {
      attachment = `/uploads/${req.file.filename}`; // make file accessible via static server
    }

    const data = { name, client, description };
    if (attachment) data.attachment = attachment; // only include attachment if uploaded

    if (id) {
      // Update existing project
      const project = await Project.findByPk(id);
      if (!project) return res.status(404).json({ message: 'Project not found' });

      await project.update(data);
      return res.json({ message: 'Project updated successfully', project });
    } else {
      // Create new project
      const newProject = await Project.create(data);
      return res.status(201).json({ message: 'Project created successfully', project: newProject });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    await project.destroy();
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


