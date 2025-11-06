const express = require("express");
const { applyLeave, getAllLeaves,deleteLeave } = require("../controllers/leaveController");

const router = express.Router();

// POST: Apply for a leave
router.post("/apply", applyLeave);

// GET: Get all applied leaves
router.get("/getLeaves", getAllLeaves);
router.delete("/delete/:id", deleteLeave); 
module.exports = router;
