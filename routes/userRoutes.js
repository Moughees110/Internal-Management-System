const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

router.post("/addUser", userController.addUpdateUser);

router.get("/getUsers", userController.getAllUsers);

router.get("/getUserById/:id", userController.getUserById);

router.get("/getUserByName/:userName", userController.getUserByName);

router.delete("/deleteUser/:id", userController.deleteUser);

router.post("/login", userController.login);


module.exports = router;
