const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    roleName:{
        type: String,
        required: true,
        unique: true
    },
}, {
    timestamps: true,
    tableName: "roles" // Ensure table name consistency
});

module.exports = mongoose.model("role", roleSchema);

