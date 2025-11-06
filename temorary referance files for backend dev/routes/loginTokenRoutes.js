const express = require("express");
const router = express.Router();
const loginTokenController = require("../controllers/loginTokenController");

router.post("/generate", loginTokenController.createToken);        
router.delete("/delete/:userId", loginTokenController.deleteTokens);
router.get("/verify-token", loginTokenController.verifyToken);
router.post("/logout", loginTokenController.logout);

router.get("/token/:userId", loginTokenController.getToken);



module.exports = router;
