const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const checkOut = sequelize.define(
  "checkOut",
  {
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
    tableName: "Check-Out", // Ensure this matches the actual table name
  }
);

module.exports = checkOut;
