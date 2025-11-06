const employeeService = require('../services/employeeService');

exports.addUpdateEmployee = async (req, res) => {
  try {
    const result = await employeeService.addOrUpdateEmployee(req.body);
    res.status(result.employee ? 200 : 201).json(result);
  } catch (error) {
    console.error("Error adding/updating employee:", error);
    res.status(400).json({ error: error.message });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.status(200).json({ message: "Employees retrieved successfully!", employeeList: employees });
  } catch (error) {
    console.error("Error retrieving employees:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await employeeService.getEmployeeById(id);
    res.status(200).json({ message: "Employee retrieved successfully!", employee });
  } catch (error) {
    console.error("Error retrieving employee by ID:", error);
    res.status(400).json({ error: error.message });
  }
};

exports.getEmployeeByName = async (req, res) => {
  try {
    const { employeeName } = req.params;
    const employees = await employeeService.getEmployeesByPosition(employeeName);
    res.status(200).json({ message: "Employees retrieved successfully!", employees });
  } catch (error) {
    console.error("Error retrieving employee by name:", error);
    res.status(400).json({ error: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await employeeService.deleteEmployee(id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(400).json({ error: error.message });
  }
};
