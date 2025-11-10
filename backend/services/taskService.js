const Task = require("../models/taskModel");

// Get all tasks
const getAllTasks = async () => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    return { success: true, data: tasks };
  } catch (error) {
    console.error("Service Error - getAllTasks:", error);
    return { success: false, error: "Failed to fetch tasks" };
  }
};

const getTaskById = async (id) => {
  try {
    const task = await Task.findById(id);
    if (!task) return { success: false, error: "Task not found" };
    return { success: true, data: task };
  } catch (error) {
    console.error("Service Error - getTaskById:", error);
    return { success: false, error: "Error retrieving task" };
  }
};

const createTask = async (taskData) => {
  try {
    const newTask = new Task(taskData);
    await newTask.save();
    return { success: true, data: newTask };
  } catch (error) {
    console.error("Service Error - createTask:", error);
    return { success: false, error: "Failed to create task" };
  }
};

const updateTask = async (id, updatedData) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    if (!updatedTask) return { success: false, error: "Task not found" };
    return { success: true, data: updatedTask };
  } catch (error) {
    console.error("Service Error - updateTask:", error);
    return { success: false, error: "Failed to update task" };
  }
};
const deleteTask = async (id) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) return { success: false, error: "Task not found" };
    return { success: true, message: "Task deleted successfully" };
  } catch (error) {
    console.error("Service Error - deleteTask:", error);
    return { success: false, error: "Failed to delete task" };
  }
};

module.exports={
    getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
}
