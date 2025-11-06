const checkOut = require("../models/checkOut");

// Get all check-outs
exports.getAllCheckOuts = async () => {
  try {
    const checkOuts = await checkOut.findAll();
    return { success: true, data: checkOuts };
  } catch (error) {
    console.error("Service Error - getAllCheckOuts:", error);
    return { success: false, error: "Failed to fetch check-out history" };
  }
};

// Add new check-out
exports.createCheckOut = async ({ endDate, endTime }) => {
  try {
    if (!endDate || !endTime) {
      return { success: false, error: "Date and time are required" };
    }

    await checkOut.create({ endDate, endTime });
    return { success: true, message: "Check-out saved successfully!" };
  } catch (error) {
    console.error("Service Error - createCheckOut:", error);
    return { success: false, error: "Failed to save check-out" };
  }
};

// Delete check-out by ID
exports.deleteCheckOutById = async (id) => {
  try {
    const deleted = await checkOut.destroy({ where: { id } });

    if (deleted === 0) {
      return { success: false, error: "Check-out not found" };
    }

    return { success: true, message: "Check-out deleted successfully!" };
  } catch (error) {
    console.error("Service Error - deleteCheckOutById:", error);
    return { success: false, error: "Failed to delete check-out" };
  }
};
