const Role = require("../models/role");

exports.createRole = async (roleName) => {
  try {
    if (!roleName) {
      return { success: false, error: "Role name is required" };
    }

    const existingRole = await Role.findOne({ where: { roleName } });
    if (existingRole) {
      return { success: false, error: "Role already exists" };
    }

    const newRole = await Role.create({ roleName });
    return { success: true, message: "Role added successfully!", role: newRole };
  } catch (error) {
    console.error("Service Error - createRole:", error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return { success: false, error: "Role name must be unique" };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
};
exports.getAllRoles = async () => {
  try {
    const roles = await Role.findAll();
    return { success: true, roles };
  } catch (error) {
    console.error("Service Error - getAllRoles:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
};

exports.getRoleById = async (id) => {
  try {
    if (!id) {
      return { success: false, error: "Role ID is required" };
    }

    const role = await Role.findByPk(id);
    if (!role) {
      return { success: false, error: "Role not found" };
    }

    return { success: true, role };
  } catch (error) {
    console.error("Service Error - getRoleById:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
};

exports.updateRole = async (id, roleName) => {
  try {
    if (!id || !roleName) {
      return { success: false, error: "Role ID and name are required" };
    }

    const role = await Role.findByPk(id);
    if (!role) {
      return { success: false, error: "Role not found" };
    }

    const existingRole = await Role.findOne({ where: { roleName } });
    if (existingRole && existingRole.id !== parseInt(id)) {
      return { success: false, error: "Role name already exists" };
    }

    await role.update({ roleName });
    return { success: true, message: "Role updated successfully!", role };
  } catch (error) {
    console.error("Service Error - updateRole:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
};

exports.deleteRoleById = async (id) => {
  try {
    if (!id) {
      return { success: false, error: "Role ID is required" };
    }

    const role = await Role.findByPk(id);
    if (!role) {
      return { success: false, error: "Role not found" };
    }

    await role.destroy();
    return { success: true, message: "Role deleted successfully!" };
  } catch (error) {
    console.error("Service Error - deleteRoleById:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
};
