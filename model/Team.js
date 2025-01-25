const mongoose = require("mongoose");

const socialLinksSchema = new mongoose.Schema({
  github: { type: String, required: true },
  linkedin: { type: String, required: true },
  twitter: { type: String, required: true },
  email: { type: String, required: true },
  portfolio: { type: String, required: true },
});

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String, required: true },
  imgUrl: { type: String, required: true },
  skills: { type: [String], required: true },
  socialLinks: { type: socialLinksSchema, required: true },
  performanceRating: { type: Number, required: true },
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
