import express from 'express';
import { Project } from '../models/ProjectModel.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    return res.status(200).json({
      count: projects.length,
      data: projects
    });
  } catch (error) {
    return res.status(500).send({ message: error.message});
  }
});

// Get a specific project
router.get('/:id', async (req, res) => {
  // implement logic to get a specific project
});

// Create a new project
router.post('/', async (req, res) => {
  // implement logic to create a new project
});

// Update a project
router.put('/:id', async (req, res) => {
  // implement logic to update a project
});

// Delete a project
router.delete('/:id', async (req, res) => {
  // implement logic to delete a project
});

export default router;