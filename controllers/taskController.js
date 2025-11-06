const taskService = require('../services/taskService');

exports.getTasks = async (req, res) => {
  const result = await taskService.getAllTasks();
  result.success
    ? res.json(result.data)
    : res.status(500).json({ message: result.error });
};

exports.getTaskById = async (req, res) => {
  const result = await taskService.getTaskById(req.params.id);
  result.success
    ? res.json(result.data)
    : res.status(404).json({ message: result.error });
};

exports.addTask = async (req, res) => {
  const result = await taskService.createTask(req.body);
  result.success
    ? res.status(201).json(result.data)
    : res.status(400).json({ message: result.error });
};

exports.updateTask = async (req, res) => {
  const result = await taskService.updateTask(req.params.id, req.body);
  result.success
    ? res.json(result.data)
    : res.status(result.error === "Task not found" ? 404 : 400).json({ message: result.error });
};

exports.deleteTask = async (req, res) => {
  const result = await taskService.deleteTask(req.params.id);
  result.success
    ? res.json({ message: result.message })
    : res.status(404).json({ message: result.error });
};
