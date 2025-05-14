const scheduleService = require("../services/schedule.service");

exports.generate = async (req, res) => {
  try {
    const result = await scheduleService.generateSchedule();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAvailableSlots = async (req, res) => {
  try {
    const result = await scheduleService.getAvailableSlots();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.reserveSlot = async (req, res) => {
  try {
    const talk = await scheduleService.reserveSlot(req.body);
    res.status(201).json(talk);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};