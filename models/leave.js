const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Leave = db.define("Leave", {
  leaveType: {
    type: DataTypes.ENUM("Sick Leave", "Casual Leave", "Annual Leave"),
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: "Leaves",
});

module.exports = Leave;

