const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
     
    },
    client: {
      type: String,
      required: true,

    },
    description: {
      type: String,
      default: "",
    },
    attachment: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
    collection: "projects", // Equivalent to tableName
  }
);

module.exports = mongoose.model("Project", projectSchema);
