const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const CheckIn = sequelize.define(
  "CheckIn",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["pending", "approved", "rejected"]],
          msg: "Status must be pending, approved, or rejected",
        },
      },
    },
  },
  {
    timestamps: true,
    tableName: "Check-In",
  }
);

module.exports = CheckIn;
