const router = require("express").Router();
const {
  getAllTeams,
  getTeamById,
  createTeamData,
} = require("../controller/team.controller.js");

router.get("/", getAllTeams);
router.get("/:id", getTeamById);
router.post("/", createTeamData);

module.exports = router;
