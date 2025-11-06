const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Role = require("../models/role");
const { Op } = require("sequelize");
const LoginToken = require("../models/loginToken");


exports.addOrUpdateUser = async (data) => {
  const {
    id,
    firstName,
    middleName,
    lastName,
    email,
    userName,
    gender,
    roleId,
    newPassword,
    confirmPassword,
    address,
  } = data;

  if (!firstName || !lastName || !email || !userName || !gender || !roleId) {
    throw new Error("All required fields must be filled");
  }

  if (newPassword && newPassword !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const role = await Role.findByPk(roleId);
  if (!role) throw new Error("Role not found");

  let user;

  if (id) {
    user = await User.findByPk(id);
    if (!user) throw new Error("User not found");

    const updatedData = {
      firstName,
      middleName,
      lastName,
      email,
      userName,
      gender,
      roleId,
      address,
    };

    if (newPassword) updatedData.password = newPassword;

    await user.update(updatedData);
  } else {
    if (!newPassword) throw new Error("Password is required for new user");

    user = await User.create({
      firstName,
      middleName,
      lastName,
      email,
      userName,
      gender,
      roleId,
      address,
      password: newPassword,
    });
  }

  const userWithRole = await User.findByPk(user.id, {
    include: { model: Role, attributes: ["roleName"] },
  });

  const userObj = userWithRole.toJSON();
  userObj.role = userWithRole.Role?.roleName || null;
  delete userObj.password;
  delete userObj.roleId;
  delete userObj.Role;

  return {
    message: id ? "User updated successfully!" : "User added successfully!",
    user: userObj,
  };
};

exports.getAllUsers = async () => {
  const users = await User.findAll({
    include: { model: Role, attributes: ["roleName"] },
  });

  return users.map((u) => {
    const userObj = u.toJSON();
    userObj.role = u.Role?.roleName || null;
    delete userObj.password;
    delete userObj.roleId;
    delete userObj.Role;
    return userObj;
  });
};

exports.getUserById = async (id) => {
  const user = await User.findByPk(id, {
    include: { model: Role, attributes: ["roleName"] },
  });

  if (!user) throw new Error("User not found");

  const userObj = user.toJSON();
  userObj.role = user.Role?.roleName || null;
  delete userObj.password;
  delete userObj.roleId;
  delete userObj.Role;
  return userObj;
};

exports.getUserByName = async (userName) => {
  const users = await User.findAll({ where: { userName } });
  if (!users.length) throw new Error("No users found with this username");

  return users.map((u) => {
    const userObj = u.toJSON();
    delete userObj.password;
    return userObj;
  });
};

exports.deleteUser = async function (id, currentUserId) {
  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found");

  // Only prevent self-deletion (let admin delete others)
  if (id === currentUserId) {
    throw new Error("You cannot delete your own account");
  }

  // Allow deletion even if target user is logged in (for admin override)
  await LoginToken.destroy({ where: { userId: id } }); // Force logout user
  await User.destroy({ where: { id } });
  
  return `${user.firstName} deleted successfully!`;
};


exports.login = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }

  return user; 
};
