const express = require("express");
const router = express.Router();
const checkOutController = require("../controllers/checkOutController");

router.get("/getCheckOut", checkOutController.getAllCheckOut); 
router.post("/addCheckOut", checkOutController.createCheckOut); 
router.delete("/deleteCheckOut/:id", checkOutController.deleteCheckOutById);

module.exports = router;