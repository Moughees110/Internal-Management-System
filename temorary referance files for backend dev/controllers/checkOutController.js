const checkOutService = require("../services/checkOutService");

// Get all check-outs
exports.getCheckOuts = async (req, res) => {
  const result = await checkOutService.getAllCheckOuts();

  if (result.success) {
    res.json({ checkOut: result.data });
  } else {
    res.status(500).json({ error: result.error });
  }
};

// Add new check-out
exports.addCheckOut = async (req, res) => {
  const { endDate, endTime } = req.body;
  const result = await checkOutService.createCheckOut({ endDate, endTime });

  if (result.success) {
    res.status(201).json({ message: result.message });
  } else {
    const status = result.error === "Date and time are required" ? 400 : 500;
    res.status(status).json({ error: result.error });
  }
};

// Delete check-out
exports.deleteCheckOut = async (req, res) => {
  const { id } = req.params;
  const result = await checkOutService.deleteCheckOutById(id);

  if (result.success) {
    res.json({ message: result.message });
  } else {
    const status = result.error === "Check-out not found" ? 404 : 500;
    res.status(status).json({ error: result.error });
  }
};
