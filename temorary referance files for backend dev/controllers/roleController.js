const roleService = require("../services/roleService");

exports.addRole = async (req, res) => {
  const { roleName } = req.body;
  const result = await roleService.createRole(roleName);

  if (result.success) {
    res.status(201).json({ message: result.message, role: result.role });
  } else {
    const status = result.error.includes("exists") || result.error.includes("required") ? 400 : 500;
    res.status(status).json({ error: result.error });
  }
};

exports.getAllRoles = async (req, res) => {
  const result = await roleService.getAllRoles();

  if (result.success) {
    res.status(200).json({ message: "Roles retrieved successfully!", roles: result.roles });
  } else {
    res.status(500).json({ error: result.error });
  }
};

exports.getRoleById = async (req, res) => {
  const { id } = req.params;
  const result = await roleService.getRoleById(id);

  if (result.success) {
    res.status(200).json({ message: "Role retrieved successfully!", role: result.role });
  } else {
    const status = result.error.includes("not found") ? 404 : 400;
    res.status(status).json({ error: result.error });
  }
};

exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const { roleName } = req.body;
  const result = await roleService.updateRole(id, roleName);

  if (result.success) {
    res.status(200).json({ message: result.message, role: result.role });
  } else {
    const status = result.error.includes("exists") || result.error.includes("required") ? 400 :
                   result.error.includes("not found") ? 404 : 500;
    res.status(status).json({ error: result.error });
  }
};

exports.deleteRole = async (req, res) => {
  const { id } = req.params;
  const result = await roleService.deleteRoleById(id);

  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    const status = result.error.includes("not found") ? 404 : 400;
    res.status(status).json({ error: result.error });
  }
};
