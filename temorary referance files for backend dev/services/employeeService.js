const Employee = require('../models/employee');

const getAllEmployees = async () => {
  return await Employee.findAll();
};

const getEmployeeById = async (id) => {
  if (!id) throw new Error("Employee ID is required");

  const employee = await Employee.findOne({ where: { id } });
  if (!employee) throw new Error("Employee not found");
  return employee;
};

const getEmployeesByPosition = async (position) => {
  if (!position) throw new Error("Position is required");

  const employees = await Employee.findAll({ where: { position } });
  if (employees.length === 0) throw new Error("No employees found with this position");

  return employees;
};

const addOrUpdateEmployee = async ({ id, firstName, middleName, lastName, email, position, department, salary }) => {
  if (!firstName || !lastName || !email || !position || !department || !salary) {
    throw new Error("All required fields must be filled");
  }

  const fullName = `${firstName} ${middleName ? middleName + " " : ""}${lastName}`;

  let employee = id ? await Employee.findOne({ where: { id } }) : null;

  if (employee) {
    await employee.update({ firstName, middleName, lastName, fullname: fullName, email, position, department, salary });
    return { message: "Employee updated successfully!", employee };
  } else {
    const newEmployee = await Employee.create({ firstName, middleName, lastName, fullname: fullName, email, position, department, salary });
    return { message: "Employee added successfully!", employee: newEmployee };
  }
};

const deleteEmployee = async (id) => {
  if (!id) throw new Error("Employee ID is required");

  const employee = await Employee.findOne({ where: { id } });
  if (!employee) throw new Error("Employee not found");

  await Employee.destroy({ where: { id } });
  return { message: "Employee deleted successfully!" };
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  getEmployeesByPosition,
  addOrUpdateEmployee,
  deleteEmployee,
};
