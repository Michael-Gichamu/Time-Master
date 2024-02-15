import express from 'express';
import { Project } from '../models/ProjectModel.js';
const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    return res.status(200).json({
      count: projects.length,
      data: projects,
    });
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
        completionStatus: req.body.completionStatus
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

    if (project.regularStart) {
      console.log('Regular Start:', project.regularStart);

      // Convert regularStart string to a Date object
      const regularStartDate = new Date(project.regularStart);

      // Calculate hours between regularStart and current time
      const currentTime = new Date();
      console.log('Current Time:', currentTime);

      const elapsedTimeInMilliseconds = currentTime.getTime() - regularStartDate.getTime();
      const elapsedTimeInHours = elapsedTimeInMilliseconds / (1000 * 60 * 60);
      console.log('Elapsed time in hours:', elapsedTimeInHours);

      // Save the original hoursTaken
      const currentHoursTaken = project.hoursTaken;

      // Parse hoursTaken to a float, add elapsed time, and convert back to a string
      const updatedHoursTaken = (parseFloat(project.hoursTaken) + elapsedTimeInHours).toString();
      console.log('Original hoursTaken:', project.hoursTaken);
      console.log('Updated hoursTaken:', updatedHoursTaken);

      // Update project data
      project.hoursTaken = updatedHoursTaken;
      project.regularStart = null;
      project.regularEnd = null;

      // Save the updated project
      await project.save();

      // Include the elapsed time in seconds and current hoursTaken in the response
      const elapsedTimeInSeconds = Math.round(elapsedTimeInMilliseconds / 1000);
      // console.log(`${currentHoursTaken * 3600} seconds from hoursTaken: ${currentHoursTaken} hours`);
      const currentHoursTakenInSeconds = Math.round(currentHoursTaken * 3600);
      const currentTimeTaken = '';
      if (currentHoursTakenInSeconds < 60) {
        currentTimeTaken = currentHoursTakenInSeconds + ' sec';
      } else if (currentHoursTakenInSeconds > 60) {
        currentTimeTaken = Math.round(currentHoursTakenInSeconds / 60) + ' min';
      } else if (currentHoursTakenInSeconds > 3600) {
        currentTimeTaken = Math.round(currentHoursTakenInSeconds / 3600) + ' hrs';
      }
      return res.status(200).json({
        project,
        elapsedTimeInSeconds: `hoursTaken since recent start: ${elapsedTimeInSeconds} seconds`,
        currentHoursTaken: currentTimeTaken
      });
    }

    return res.status(200).json({ message: "Project is already paused" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});


// Finish a project and archive it
router.put('/:id/finish', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        finishedAt: new Date(),
        isFinished: true,
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

// Get all archived projects
router.get('/archived', async (req, res) => {
  try {
    const archivedProjects = await Project.find({ isFinished: true });
    return res.status(200).json({
      count: archivedProjects.length,
      data: archivedProjects,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

export default router;
