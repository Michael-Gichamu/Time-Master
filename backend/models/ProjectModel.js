import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
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
  },
  regularStart: {
    type: Date,
  },
  regularEnd: {
    type: Date,
  },
});

export const Project = mongoose.model('Project', ProjectSchema);