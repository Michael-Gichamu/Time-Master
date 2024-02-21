import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  hoursTaken: {
    type: String,
  },
  completionStatus: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  regularStart: {
    type: Date,
  },
  regularLatest: {
    type: Date,
  },
  regularEnd: {
    type: Date,
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
  finishedAt: {
    type: Date,
  },
});

export const Project = mongoose.model('Project', ProjectSchema);