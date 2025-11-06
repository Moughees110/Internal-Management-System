const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Database connection

const Role = sequelize.define("Role", {
    roleName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: true,
    tableName: "Roles" // Ensure table name consistency
});

module.exports = Role;
