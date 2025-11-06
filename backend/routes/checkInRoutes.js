const express=require("express");
const router=express.Router();
const checkInController=require("../controllers/checkInController");

router.get("/getCheckIn", checkInController.getAllCheckIn); // Get all check-ins
router.post("/addCheckIn", checkInController.createCheckIn); // Add a new check-in


module.exports = router;