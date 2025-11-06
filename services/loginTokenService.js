const jwt = require("jsonwebtoken");
const LoginToken = require("../models/loginToken");
const User = require("../models/user");
const Role = require("../models/role");
const { Op } = require("sequelize");

const JWT_SECRET = process.env.JWT_SECRET;

exports.generateTokenForUser = async (userId) => {
  const user = await User.findByPk(userId, {
    include: [{ model: Role, attributes: ["id", "roleName"] }],
  });

  if (!user) {
    throw new Error("User not found");
  }

  const payload = {
    id: user.id,
    email: user.email,
    role: user.Role ? user.Role.roleName : null,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); 

  const savedToken = await LoginToken.create({
    userId,
    token,
    expiresAt,
  });

  return {
    token: savedToken.token,
    expiresAt: savedToken.expiresAt,
    user: {
      id: user.id,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      email: user.email,
      userName: user.userName,
      gender: user.gender,
      address: user.address,
      role: user.Role ? user.Role.roleName : null,
    },
  };
};


exports.deleteTokensForUser = async (userId) => {
  try {
    const count = await LoginToken.destroy({
      where: { userId },
    });

    return {
      success: true,
      deletedCount: count,
      message: `${count} token(s) deleted for user ${userId}`,
    };
  } catch (error) {
    throw new Error("Failed to delete login tokens: " + error.message);
  }
};

exports.verifyToken = async (token) => {
  const savedToken = await LoginToken.findOne({ where: { token } });

  if (!savedToken) {
    throw new Error("Token not found or has been deleted.");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return {
      valid: true,
      decoded,
    };
  } catch (err) {
    throw new Error("Invalid or expired token.");
  }
};



exports.logoutUser = async (token) => {
  const deleted = await LoginToken.destroy({
    where: { token },
  });

  if (deleted === 0) {
    throw new Error("Token not found or already logged out.");
  }

  return {
    success: true,
    message: "User logged out successfully.",
  };
};



exports.getTokenForUser = async (userId) => {
  const existingToken = await LoginToken.findOne({
    where: {
      userId,
      expiresAt: {
        [Op.gt]: new Date(), 
      },
    },
    include: [
      {
        model: User,
        include: [{ model: Role, attributes: ["roleName"] }],
      },
    ],
  });

  if (!existingToken) {
    throw new Error("No valid token found for this user");
  }

  return {
    token: existingToken.token,
    expiresAt: existingToken.expiresAt,
    user: {
      id: existingToken.User.id,
      firstName: existingToken.User.firstName,
      middleName: existingToken.User.middleName,
      lastName: existingToken.User.lastName,
      email: existingToken.User.email,
      userName: existingToken.User.userName,
      gender: existingToken.User.gender,
      address: existingToken.User.address,
      role: existingToken.User.Role?.roleName || null,
    },
  };
};
