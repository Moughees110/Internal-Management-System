const Leave = require("../models/leaveModels");

const ALLOWED_LEAVE_TYPES = ["Sick Leave", "Casual Leave", "Annual Leave"];

const applyLeave = async ({ leaveType, startDate, endDate, reason }) => {
     if (!leaveType || !startDate || !endDate || !reason) {
    throw new Error("All fields are required.");
  };
   if (!ALLOWED_LEAVE_TYPES.includes(leaveType)) {
    throw new Error("Invalid leave type selected.");
  }
   if (new Date(startDate) > new Date(endDate)) {
    throw new Error("Start date cannot be after end date.");
  };
  const leave = await Leave.create({ leaveType, startDate, endDate , reason});
  return { message: "leave applied successfully !",leave};
};

const getAllLeaves = async () => {
    const leaves = await Leave.find().sort({createdAt: 1});
    return leaves;
};

const deleteLeave = async (id ) => {
    const deleted = await Leave.findByIdAndDelete(id);
    if (!deleted){
         throw new Error("Leave not found.");
    };
     return { message: "Leave deleted successfully." };
};

module.exports={
    applyLeave,
    getAllLeaves,
    deleteLeave
}