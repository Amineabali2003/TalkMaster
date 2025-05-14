const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/schedule.controller");

router.post("/generate", scheduleController.generate);
router.get("/available", scheduleController.getAvailableSlots);
router.post("/reserve", scheduleController.reserveSlot);

module.exports = router;