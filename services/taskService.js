const Task = require('../models/task');

exports.getAllTasks = async () => {
  try {
    const tasks = await Task.findAll();
    return { success: true, data: tasks };
  } catch (error) {
    console.error("Service Error - getAllTasks:", error);
    return { success: false, error: "Failed to fetch tasks" };
  }
};

exports.getTaskById = async (id) => {
  try {
    const task = await Task.findByPk(id);
    if (!task) return { success: false, error: "Task not found" };
    return { success: true, data: task };
  } catch (error) {
    console.error("Service Error - getTaskById:", error);
    return { success: false, error: "Error retrieving task" };
  }
};

exports.createTask = async (taskData) => {
  try {
    const newTask = await Task.create(taskData);
    return { success: true, data: newTask };
  } catch (error) {
    console.error("Service Error - createTask:", error);
    return { success: false, error: "Failed to create task" };
  }
};

exports.updateTask = async (id, updatedData) => {
  try {
    const task = await Task.findByPk(id);
    if (!task) return { success: false, error: "Task not found" };

    await task.update(updatedData);
    return { success: true, data: task };
  } catch (error) {
    console.error("Service Error - updateTask:", error);
    return { success: false, error: "Failed to update task" };
  }
};

exports.deleteTask = async (id) => {
  try {
    const task = await Task.findByPk(id);
    if (!task) return { success: false, error: "Task not found" };

    await task.destroy();
    return { success: true, message: "Task deleted successfully" };
  } catch (error) {
    console.error("Service Error - deleteTask:", error);
    return { success: false, error: "Failed to delete task" };
  }
};
