const employee=require("../models/employeeModel");

const getAllEmployees = async () => {
  return await employee.find().sort({ createdAt: -1 });
};

const getEmployeeById = async (id) => {
  if (!id) throw new Error("Employee ID is required");

  const Employee = await employee.findById(id);
  if (!Employee) throw new Error("Employee not found");

  return Employee;
};

const getEmployeesByPosition = async (position) => {
  if (!position) throw new Error("Position is required");

  const Employees = await employee.find({ position });
  if (Employees.length === 0) throw new Error("No employees found with this position");

  return Employees;
};

const addOrUpdateEmployee = async ({
     id,
  firstName,
  middleName,
  lastName,
  email,
  position,
  department,
  salary,
}) => {
     if (!firstName || !lastName || !email || !position || !department || !salary) {
    throw new Error("All required fields must be filled");
  };

  
  const fullName = `${firstName} ${middleName ? middleName + " " : " "}${lastName}`;
  if (id){
    const updatedEmployee = await employee.findByIdAndUpdate(id,{
        firstName,
        middleName,
        lastName,
        fullName,
        email,
        position,
        department,
        salary,
    },
      { new: true, runValidators: true }
);
if (!updatedEmployee) throw new Error("Employee not found");

return { message: "Employee updated successfully!", employee: updatedEmployee };
  }else{
    const newEmployee = await employee.create({
         firstName,
      middleName,
      lastName,
      fullName,
      email,
      position,
      department,
      salary,
    });
    return { message: "Employee added successfully!", employee: newEmployee };
  }
};

const deleteEmployee = async (id) => {
  if (!id) throw new Error("Employee ID is required");

  const deletedEmployee = await employee.findByIdAndDelete(id);
  if (!deletedEmployee) throw new Error("Employee not found");

  return { message: "Employee deleted successfully!" };
};

module.exports ={
getAllEmployees,
getEmployeeById,
getEmployeesByPosition,
addOrUpdateEmployee,
deleteEmployee
};
