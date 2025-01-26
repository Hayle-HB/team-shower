const Team = require("../model/Team.js");
const ImageUploader = require("../utils/ImageUploader.js");

const filterDeveloperData = async (special_id) => {
  const developerData = await Team.find({});

  const leadersData = developerData.filter((developer) => {
    return developer.role.toLowerCase() === "leader";
  });

  developerData.sort((a, b) => {
    return b.performanceRating - a.performanceRating;
  });

  const bestPerformers = developerData.slice(0, 3);

  const otherTeams = developerData.filter((developer) => {
    return developer.role.toLowerCase() !== "leader";
  });
  var developer_job = null;
  if (special_id !== false) {
    developer_job = developerData.filter((developer) => {
      return developer.socialLinks.email === special_id;
    });
  }
  if (developer_job) {
    bestPerformers.push(developer_job[0]);
  }

  const finalData = {
    leaders: leadersData,
    bestPerformers: bestPerformers,
    otherTeams: otherTeams,
  };

  return finalData;
};

const getAllTeams = async (req, res) => {
  try {
    const teams = await filterDeveloperData(false);
    res.status(200).json(teams);
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ message: "Error fetching teams" });
  }
};

const getTeamById = async (req, res) => {
  try {
    const team = await filterDeveloperData(req.params.id);
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
