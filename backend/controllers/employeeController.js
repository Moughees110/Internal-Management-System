const  empolyeeService = require("../services/empolyeeService");

exports.addUpdateEmployee = async ( req, res ) => {
    try {
       const {  firstName,
      middleName,
      lastName,
      fullName,
      email,
      position,
      department,
      salary,}=req.body
         const result = await empolyeeService.addOrUpdateEmployee({ firstName,
      middleName,
      lastName,
      fullName,
      email,
      position,
      department,
      salary,});
          res.status(200).json(result);


    } catch (error) {
        console.error("Error adding/updating employee:", error);
    res.status(400).json({ error: error.message });
    }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await empolyeeService.getAllEmployees();
    res.status(200).json({ message: "Employees retrieved successfully!", employeeList: employees });
  } catch (error) {
    console.error("Error retrieving employees:", error);
    res.status(500).json({ error: error.message });
  }
};


exports.getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await empolyeeService.getEmployeeById(id);
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getEmployeesByPosition = async (req, res) => {
  try {
    const { position } = req.query;
    const employees = await empolyeeService.getEmployeesByPosition(position);
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await empolyeeService.deleteEmployee(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};