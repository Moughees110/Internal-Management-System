const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.get("/getAllTasks", taskController.getAllTasks);
router.get("/getTasksById/:id", taskController.getTaskById);
router.post("/createTask", taskController.createTask);
router.put("/updateTaskById/:id", taskController.updateTask);
router.delete("/deleteTaskById/:id", taskController.deleteTask);


module.exports = router;
