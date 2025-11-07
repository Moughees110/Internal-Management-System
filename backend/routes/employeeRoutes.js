const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

// Add or update employee
router.post("/addEmployee", employeeController.addUpdateEmployee);

// Get all employees
router.get("/getEmployees", employeeController.getAllEmployees);

// Get employee by ID
router.get("/getEmployeeById/:id", employeeController.getEmployeeById);

// Get employee by Name
router.get("/getEmployeeByPosition", employeeController.getEmployeesByPosition);

// Delete employee by ID
router.delete("/deleteEmployeeById/:id", employeeController.deleteEmployee);

module.exports = router;
