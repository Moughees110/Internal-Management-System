const taskService = require("../services/taskService");

// Get all tasks
exports.getAllTasks = async (req, res) => {
  const result = await taskService.getAllTasks();
  if (result.success) {
    return res.status(200).json({ tasks: result.data });
  }
  res.status(500).json({ error: result.error });
};

// Get task by ID
exports.getTaskById = async (req, res) => {
  const { id } = req.params;
  const result = await taskService.getTaskById(id);

  if (!result.success) {
    return res.status(404).json({ error: result.error });
  }
  res.status(200).json({ task: result.data });
};

// Create a new task
exports.createTask = async (req, res) => {
  const taskData = req.body;
  const result = await taskService.createTask(taskData);

  if (result.success) {
    return res.status(201).json({ message: "Task created successfully", task: result.data });
  }
  res.status(500).json({ error: result.error });
};

// Update an existing task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await taskService.updateTask(id, updatedData);
  if (!result.success) {
    return res.status(404).json({ error: result.error });
  }
  res.status(200).json({ message: "Task updated successfully", task: result.data });
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const result = await taskService.deleteTask(id);

  if (!result.success) {
    return res.status(404).json({ error: result.error });
  }
  res.status(200).json({ message: result.message });
};
