const Team = require("../model/Team.js");
const ImageUploader = require("../utils/ImageUploader.js");

const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ message: "Error fetching teams" });
  }
};

const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Team member not found" });
    }
    res.status(200).json(team);
  } catch (error) {
    console.error("Error fetching team member:", error);
    res.status(500).json({ message: "Error fetching team member" });
  }
};

const createTeamData = async (req, res) => {
  console.log(req);
  
  try {
    let imgUrl = null;

    if (req.file) {
      imgUrl = await ImageUploader(req.file);
    }

    const newTeamMember = {
      name: req.body.name,
      role: req.body.role,
      bio: req.body.bio,
      skills: req.body.skills.split(",").map((skill) => skill.trim()),
      performanceRating: req.body.performanceRating,
      socialLinks: req.body.socialLinks,
      imgUrl: imgUrl,
    };

    const team = await Team.create(newTeamMember);
    res.status(201).json(team);
  } catch (error) {
    console.error("Error creating team member:", error);
    res.status(500).json({ message: "Failed to create team member" });
  }
};

module.exports = {
  getAllTeams,
  getTeamById,
  createTeamData,
};
