const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");

router.post("/add", roleController.addRole);
router.get("/all", roleController.getAllRoles);
router.get("/:id", roleController.getRoleById);
router.put("/:id", roleController.updateRole);
router.delete("/delete/:id", roleController.deleteRole);

module.exports = router;
