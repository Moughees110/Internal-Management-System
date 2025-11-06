const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");

const LoginToken = sequelize.define("LoginToken", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id"
    }
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  isExpired: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
  tableName: "LoginTokens",
});

LoginToken.belongsTo(User, { foreignKey: "userId" });
User.hasMany(LoginToken, { foreignKey: "userId" });

module.exports = LoginToken;
