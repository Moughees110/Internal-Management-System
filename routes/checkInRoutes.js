const express = require("express");
const router = express.Router();
const checkInController = require("../controllers/checkInController");

router.get("/getCheckIn", checkInController.getCheckIn); // Get all check-ins
router.post("/addCheckIn", checkInController.addCheckIn); // Add a new check-in

module.exports = router;
