const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
    },
    rate: {
        type: Number,
        required: true
    },
    frequency: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true,
       enum: ["Standard", "Premium", "Basic"],
    },

},
{
    timestamps: true, // adds createdAt & updatedAt
    collection: "clients", // MongoDB collection name
  }
);

const client = mongoose.model("clients",clientSchema);
module.exports = client;

