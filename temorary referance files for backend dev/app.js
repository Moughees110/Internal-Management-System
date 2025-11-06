const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const path = require("path");

const sequelize = require("./config/db");

const User = require("../models/user");
const Employee = require("../models/employee");
const Task = require("../models/task");
const Project = require("../models/project");

const userRoutes = require("./routes/userRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const roleRoutes = require("./routes/roleRoutes");
const taskRoutes = require("./routes/taskRoutes");
const clientRoutes = require("./routes/clientRoutes");
const checkInRoutes = require("./routes/checkInRoutes");
const checkOutRoutes = require("./routes/checkOutRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const projectRoutes = require("./routes/projectRoutes");
const loginTokenRoutes = require("./routes/loginTokenRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", userRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/checkIn", checkInRoutes);
app.use("/api/checkouts", checkOutRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tokens", loginTokenRoutes);

// Sync database
sequelize
  .sync({ alter: false })
  .then(() => {
    console.log(" Database synced successfully.");
  })
  .catch((error) => {
    console.error(" Error syncing database:", error);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
