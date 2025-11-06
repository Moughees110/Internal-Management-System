const leaveService = require('../services/leaveService');

exports.applyLeave = async (req, res) => {
  try {
    const result = await leaveService.applyLeave(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error applying for leave:", error);
    res.status(400).json({ message: error.message });
  }
};

exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await leaveService.getAllLeaves();
    res.status(200).json({ leaves });
  } catch (error) {
    console.error("Error fetching leaves:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await leaveService.deleteLeave(id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting leave:", error);
    res.status(400).json({ message: error.message });
  }
};
