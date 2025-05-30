const talkService = require("../services/talk.service");
const icalService = require("../services/ical.service");

exports.proposeTalk = async (req, res) => {
  const talk = await talkService.proposeTalk(req.user.id, req.body);
  res.status(201).json(talk);
};

exports.acceptTalk = async (req, res) => {
  const talk = await talkService.updateStatus(req.params.id, "ACCEPTED");
  res.json(talk);
};

exports.rejectTalk = async (req, res) => {
  const talk = await talkService.updateStatus(req.params.id, "REJECTED");
  res.json(talk);
};

exports.scheduleTalk = async (req, res) => {
  const talk = await talkService.scheduleTalk(req.params.id, req.body);
  res.json(talk);
};

exports.updateTalk = async (req, res) => {
  const result = await talkService.updateTalk(req.params.id, req.user.id, req.body);
  res.json(result);
};

exports.deleteTalk = async (req, res) => {
  const result = await talkService.deleteTalk(req.params.id, req.user.id);
  res.json(result);
};

exports.getMyTalks = async (req, res) => {
  const talks = await talkService.getTalksBySpeaker(req.user.id);
  res.json(talks);
};

exports.getAllTalks = async (req, res) => {
  const talks = await talkService.getAllTalks();
  res.json(talks);
};

exports.getPublicSchedule = async (req, res) => {
  const talks = await talkService.getPublicSchedule();
  res.json(talks);
};

exports.filterTalks = async (req, res) => {
  const talks = await talkService.filterTalks(req.query);
  res.json(talks);
};

exports.toggleFavorite = async (req, res) => {
  const result = await talkService.toggleFavorite(req.user.id, req.params.id);
  res.json(result);
};

exports.getFavoriteTalks = async (req, res) => {
  const talks = await talkService.getFavoriteTalks(req.user.id);
  res.json(talks);
};

exports.getICal = async (req, res) => {
  try {
    const file = await icalService.generateICal(req.params.id);
    res.setHeader("Content-Type", "text/calendar");
    res.setHeader("Content-Disposition", "attachment; filename=talk.ics");
    res.send(file);
  } catch (err) {
    console.error("Erreur génération iCal :", err);
    res.status(500).json({ error: "Erreur génération iCal" });
  }
};

exports.getPendingTalks = async (req, res) => {
  const talks = await talkService.getPendingTalks();
  res.json(talks);
};
