const express = require("express");
const authController = require("../controllers/auth.controller");
const authenticate = require("../middleware/auth");

const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.post("/logout", authController.logout);
router.get("/me", authenticate(), authController.getMe);

module.exports = router;