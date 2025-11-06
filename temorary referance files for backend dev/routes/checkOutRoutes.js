const express = require("express");
const router = express.Router();
const checkOutController = require("../controllers/checkOutController");

router.get("/getCheckOut", checkOutController.getCheckOuts); 
router.post("/addCheckOut", checkOutController.addCheckOut); 
router.delete("/deleteCheckOut/:id", checkOutController.deleteCheckOut);

module.exports = router;
