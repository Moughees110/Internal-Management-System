const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./Config/db");
const checkInRoutes = require("./routes/checkInRoutes");
const checkOutRoutes = require("./routes/checkOutRoutes");

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());


app.use("/api/checkIn", checkInRoutes);
app.use("/api/checkouts", checkOutRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));