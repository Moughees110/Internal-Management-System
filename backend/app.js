const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./Config/db");
const checkInRoutes = require("./routes/checkInRoutes");
const checkOutRoutes = require("./routes/checkOutRoutes");
const clientsRoutes= require("./routes/clientsRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const leaveRoute = require("./routes/leaveRoute");
const roleRoutes=require("./routes/roleRoutes");
const projectRoute = require("./routes/projectRoute");

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());


app.use("/api/checkIn", checkInRoutes);
app.use("/api/checkouts", checkOutRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/leaves",leaveRoute);
app.use("/api/roles",roleRoutes);
app.use("/api/projects", projectRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));