const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
 
    },
    summary: {
      type: String,
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
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },
    assignedTo: {
      type: String,
      required: true,
   
    },
    project: {
      type: String,
      required: true,
     
    },
    estimate: {
      type: String, // Example: "3h", "2d"
      default: "",
    },
    timeTracking: {
      type: String, // Example: "1h 30m"
      default: "",
    },
    reporter: {
      type: String,
      enum: ["Sir Moughees Hasan Raza", "Sir Nouman", "Ahsan Khan"],
      required: true,
    },
    status: {
      type: String,
      enum: ["In Progress", "Done"],
      default: "In Progress",
    },
  },
  {
    timestamps: true, // Adds createdAt & updatedAt
    collection: "tasks",
  }
);

module.exports = mongoose.model("Task", taskSchema);
