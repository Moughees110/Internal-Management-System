const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");

router.post("/createRole", roleController.createRole);
router.get("/getAllRole", roleController.getAllRoles);
router.get("/roleById/:id", roleController.getRoleById);
router.put("/updateRoleById/:id", roleController.updateRole);
router.delete("/deleteRoleById/:id", roleController.deleteRole);
    
module.exports = router;
