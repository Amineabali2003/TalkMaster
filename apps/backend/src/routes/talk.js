const express = require("express");
const router = express.Router();
const talkController = require("../controllers/talk.controller");
const authenticate = require("../middleware/auth");

router.post("/propose", authenticate("SPEAKER"), talkController.proposeTalk);
router.patch("/:id/accept", authenticate("ORGANIZER"), talkController.acceptTalk);
router.patch("/:id/reject", authenticate("ORGANIZER"), talkController.rejectTalk);
router.patch("/:id/schedule", authenticate("ORGANIZER"), talkController.scheduleTalk);
router.patch("/:id", authenticate("SPEAKER"), talkController.updateTalk);
router.delete("/:id", authenticate("SPEAKER"), talkController.deleteTalk);
router.post("/:id/favorite", authenticate(), talkController.toggleFavorite);
router.get("/mine", authenticate(), talkController.getMyTalks);
router.get("/favorites", authenticate(), talkController.getFavoriteTalks);
router.get("/pending", authenticate("ORGANIZER"), talkController.getPendingTalks);
router.get("/filter", talkController.filterTalks);
router.get("/public", talkController.getPublicSchedule);
router.get("/:id/ical", talkController.getICal);
router.get("/", authenticate("ORGANIZER"), talkController.getAllTalks);

module.exports = router;