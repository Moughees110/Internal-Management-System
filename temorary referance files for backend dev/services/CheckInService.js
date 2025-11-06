const CheckIn = require("../models/checkIn");

const getAllCheckIns = async () => {
  return await CheckIn.findAll();
};

const createCheckIn = async ({ date, time, status }) => {
  if (!date || !time || !status) {
    throw new Error("Date, time, and status are required");
  }

  const validStatuses = ["pending", "approved", "rejected"];
  if (!validStatuses.includes(status)) {
    throw new Error("Invalid status value");
  }

  return await CheckIn.create({ date, time, status });
};

module.exports = {
  getAllCheckIns,
  createCheckIn,
};
