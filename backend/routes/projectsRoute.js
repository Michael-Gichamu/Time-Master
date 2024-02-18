import express from 'express';
import { Project } from '../models/ProjectModel.js';
import updateProjectOnTimeElapse from '../projectUtils.js';
import { getCurrentTimeTaken } from '../projectUtils.js';
const router = express.Router();

// Get all archived projects & route order precedence
router.get('/archived', async (req, res) => {
  try {
    const archivedProjects = await Project.find({ isFinished: true });
    const formattedProjects = archivedProjects.map(project => ({
      hoursTakenStdFormat: getCurrentTimeTaken(project.hoursTaken).currentTimeTaken,
      ...project.toObject()
    }));
    return res.status(200).json(formattedProjects);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    const formattedProjects = projects.map(project => ({
      hoursTakenStdFormat: getCurrentTimeTaken(project.hoursTaken).currentTimeTaken,
      ...project.toObject()
    }));
    return res.status(200).json(formattedProjects);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Get a specific project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Create a new project
router.post('/', async (req, res) => {
  try {
    const newProject = new Project({
      title: req.body.title,
      hoursTaken: '0',
      completionStatus: 0,
    });

    const savedProject = await newProject.save();
    return res.status(201).json(savedProject);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Update a project
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        hoursTaken: req.body.hoursTaken,
        completionStatus: req.body.completionStatus,
        isFinished: req.body.isFinished
      },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Delete a project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    return res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Start a project timer
router.put('/:id/start', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (!project.regularStart) {
      // Set regularStart only if it is not already set
      project.regularStart = new Date();
    } else {
      return res.status(200).json({ message: "Project is already started" });
    }

    await project.save();

    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Pause a project timer
router.put('/:id/pause', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const response = await updateProjectOnTimeElapse(project, 'pause');
    return res.status(200).json({
      ...response
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Get the latest project status
router.get('/:id/latest', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const response = await updateProjectOnTimeElapse(project, 'latest');

    return res.status(200).json({
      ...response
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Finish a project and archive it
router.put('/:id/finish', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.isFinished) {
      return res.status(200).json({ message: 'Project already finished' });
    }
    
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        finishedAt: new Date(),
        isFinished: true,
      },
      { new: true }
    );

    return res.status(200).json({updatedProject, message: 'Project finished and archived'});
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

export default router;
