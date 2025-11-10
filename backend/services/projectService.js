const projectModel = require("../models/projectModel");

const getAllProjects = async () => {
  return await projectModel.find().sort({ createdAt: -1 });
};

const getProjectById = async (id) => {
  return await projectModel.findById(id);
};

const createProject = async (data) => {
  const newProject = new projectModel(data);
  return await newProject.save();
};

const updateProject = async (id, data) => {
  return await projectModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const deleteProject = async (id) => {
  return await projectModel.findByIdAndDelete(id);
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};