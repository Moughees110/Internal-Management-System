const express = require("express");
const leaveController =  require("../controllers/leaveController");

const router = express.Router();

// POST: Apply for a leave
router.post("/applyLeave", leaveController.applyLeave);

// GET: Get all applied leaves
router.get("/getLeaves", leaveController.getAllLeaves);
router.delete("/deleteLeaveById/:id", leaveController.deleteLeave); 
module.exports = router;
