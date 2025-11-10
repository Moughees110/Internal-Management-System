const roleService = require("../services/roleService");

exports.createRole = async (req,res) => {
try {
    const {roleName}=req.body;
   
    
    const result = await roleService.createRole(roleName);
      if (result.success) {
      return res.status(201).json({
        message: result.message,
        role: result.role,
      });
    };
    const status =
      result.error.includes("exists") || result.error.includes("required")
        ? 400
        : 500;
    return res.status(status).json({ error: result.error });
} catch (error) {
       console.error("Controller Error - addRole:", error);
    res.status(500).json({ error: "Internal server error" });
}
};

exports.getAllRoles = async (req,res) => {
    try {
         const result = await roleService.getAllRoles();
         if (result.success) {
      return res.status(200).json({
        message: "Roles retrieved successfully!",
        roles: result.roles,
      });
    }
    return res.status(500).json({ error: result.error });
    } catch (error) {
        console.error("Controller Error - getAllRoles:", error);
    res.status(500).json({ error: "Internal server error" });
    }
};

exports.getRoleById = async (req, res) => {
    try {
        const { id } = req.params;
    const result = await roleService.getRoleById(id);
     if (result.success) {
      return res.status(200).json({
        message: "Role retrieved successfully!",
        role: result.role,
      });
    };
    const status = result.error.includes("not found") ? 404 : 400;
     return res.status(status).json({ error: result.error });
    } catch (error) {
        console.error("Controller Error - getRoleById:", error);
    res.status(500).json({ error: "Internal server error" });
    }
};

exports.updateRole = async (req, res)  => {
    try {
            const { id } = req.params;
    const { roleName } = req.body;
    const result = await roleService.roleUpdate(id, roleName);
      if (result.success) {
      return res.status(200).json({
        message: result.message,
        role: result.role,
      });
    };
    const status = result.error.includes("exists") || result.error.includes("required")
      ? 400
      : result.error.includes("not found")
      ? 404
      : 500;
    return res.status(status).json({ error: result.error });
    } catch (error) {
         console.error("Controller Error - updateRole:", error);
    res.status(500).json({ error: "Internal server error" });
    }
};

exports.deleteRole = async (req, res) => {
    try {
        const { id } = req.params;
    const result = await roleService.deleteRoleById(id);

    if (result.success) {
      return res.status(200).json({ message: result.message });
    };
    
    const status = result.error.includes("not found") ? 404 : 400;
    return res.status(status).json({ error: result.error });
    } catch (error) {
        console.error("Controller Error - deleteRole:", error);
    res.status(500).json({ error: "Internal server error" });
    }
};
