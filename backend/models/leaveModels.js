const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
    leaveType: {
      type: String,
      enum: ["Sick Leave", "Casual Leave", "Annual Leave"],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
},
{
    timestamps: true, // adds createdAt and updatedAt
    collection: "leaves", // same as tableName in Sequelize
  }
);

module.exports = mongoose.model("leave", leaveSchema);