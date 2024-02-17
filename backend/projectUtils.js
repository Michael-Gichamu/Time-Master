const updateProjectOnTimeElapse = async (project, reqType) => {
  if (project.regularStart) {
    // Convert regularStart string to a Date object
    const regularStartDate = new Date(project.regularStart);

    // Calculate hours between regularStart and current time
    const currentTime = new Date();
    const elapsedTimeInMilliseconds = currentTime.getTime() - regularStartDate.getTime();
    const elapsedTimeInHours = elapsedTimeInMilliseconds / (1000 * 60 * 60);

    // Save the original hoursTaken
    let currentHoursTaken = project.hoursTaken;

    // Parse hoursTaken to a float, add elapsed time, and convert back to a string
    const updatedHoursTaken = (parseFloat(project.hoursTaken) + elapsedTimeInHours).toString();

    // Update project data
    currentHoursTaken = project.hoursTaken = updatedHoursTaken;
    
    // check if the project is paused
    if (reqType === 'pause') {
      project.regularStart = null;
      project.regularEnd = null;
    };

    // Save the updated project
    await project.save();

    // Include the elapsed time in seconds and current hoursTaken in the response
    const elapsedTimeInSeconds = Math.round(elapsedTimeInMilliseconds / 1000);
    const currentHoursTakenInSeconds = Math.round(currentHoursTaken * 3600);
    let currentTimeTaken = '';

    if (currentHoursTakenInSeconds < 60) {
      currentTimeTaken = (currentHoursTaken * 3600).toFixed(2) + ' sec';
    } else if (currentHoursTakenInSeconds > 60) {
      currentTimeTaken = (currentHoursTaken * 60).toFixed(2) + ' min';
    } else if (currentHoursTakenInSeconds > 3600) {
      currentTimeTaken = (currentHoursTaken / 60).toFixed(2) + ' hrs';
    }

    return {
      project,
      elapsedTimeInSeconds: `${elapsedTimeInSeconds} sec`,
      currentHoursTaken: currentTimeTaken
    };
  }

  return { message: "Project is already paused" };
};

export default updateProjectOnTimeElapse;