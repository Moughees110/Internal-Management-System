const checkInService = require("../services/checkInService");

exports.getCheckIn = async (req, res) => {
  try {
    const checkIns = await checkInService.getAllCheckIns();
    res.status(200).json({ checkIns });
  } catch (error) {
    console.error("Error fetching check-ins:", error);
    res.status(500).json({ error: "Failed to fetch check-in history" });
  }
};

exports.addCheckIn = async (req, res) => {
  try {
    const { date, time, status } = req.body;

    await checkInService.createCheckIn({ date, time, status });

    res.status(201).json({ message: "Check-in saved successfully!" });
  } catch (error) {
    console.error("Error saving check-in:", error);
    res.status(400).json({ error: error.message });
  }
};
