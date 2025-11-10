const roleModel = require("../models/roleModel");

const createRole = async (roleName) => {
try {

    if (!roleName) {
      return { success: false, error: "Role name is required" };
    };
    const existingRole = await roleModel.findOne({roleName});
     if (existingRole) {
      return { success: false, error: "Role already exists" };
    };
     const newRole = await roleModel.create({ roleName });
      return { success: true, message: "Role added successfully!", role: newRole };

} catch (error) {
     console.error("Service Error - createRole:", error);
    if (error.code === 11000) {
      // MongoDB duplicate key error
      return { success: false, error: "Role name must be unique" };
    }
    return  {success: false, error: "An unexpected error occurred" };
}

};

const getAllRoles = async ( ) => {
   try {
    const roles = await roleModel.find().sort({ createdAt: 1 }); // ascending order
    return { success: true, roles };
   } catch (error) {
       console.error("Service Error - getAllRoles:", error);
    return { success: false, error: "An unexpected error occurred" };
   }
};

const getRoleById = async (id) => {
try {
    if (!id) {
      return { success: false, error: "Role ID is required" };
    };
     const role = await roleModel.findById(id);
     if (!role) {
      return { success: false, error: "Role not found" };
    };
       return { success: true, role };
} catch (error) {
     console.error("Service Error - getRoleById:", error);
    return { success: false, error: "An unexpected error occurred" };
}
};

const roleUpdate = async (id,roleName) => {
try {
    if (!id || !roleName) {
      return { success: false, error: "Role ID and name are required" };
    }
     const existingRole = await roleModel.findOne({ roleName });
      if (existingRole && existingRole._id.toString() !== id) {
      return { success: false, error: "Role name already exists" };
    }
    const updatedRole = await roleModel.findByIdAndUpdate(
      id,
      { roleName },
      { new: true, runValidators: true }
    );
      if (!updatedRole) {
      return { success: false, error: "Role not found" };
    }
    
    return { success: true, message: "Role updated successfully!", role: updatedRole };
} catch (error) {
    console.error("Service Error - updateRole:", error);
    return { success: false, error: "An unexpected error occurred" };
}
};


const deleteRoleById = async (id) => {
try {
      if (!id) {
      return { success: false, error: "Role ID is required" };
    }
    const deletedRole = await roleModel.findByIdAndDelete(id);
    if (!deletedRole) {
      return { success: false, error: "Role not found" };
    }
      return { success: true, message: "Role deleted successfully!" };

} catch (error) {
      console.error("Service Error - deleteRoleById:", error);
    return { success: false, error: "An unexpected error occurred" };
}
};


module.exports={
    createRole,
    getAllRoles,
    getRoleById,
    roleUpdate,
    deleteRoleById,
}