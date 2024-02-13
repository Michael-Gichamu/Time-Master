import mongoose from "mongoose";

const ProjectOverviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  hoursTaken: {
    type: String,
    required: true
  },
  completionStatus: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ProjectOverview = mongoose.model('ProjectOverview', ProjectOverviewSchema);

module.exports = ProjectOverview;