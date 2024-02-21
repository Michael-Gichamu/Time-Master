// Description: Utility functions for updating project data when time elapses.
const updateProjectOnTimeElapse = async (project, reqType) => {
  if (project.regularStart) {
    // Convert regularStart string to a Date object
    const regularStartDate = new Date(project.regularStart);

    // Calculate hours between regularStart and current time
    const currentTime = new Date();
    let elapsedTimeInMilliseconds = currentTime.getTime() - regularStartDate.getTime();
    const regularLatestDate = new Date(project.regularLatest);

    // Check if project is paused
    if (reqType === 'pause') {
      project.regularStart = null;
      project.regularEnd = null;
      if (project.regularLatest) {
        elapsedTimeInMilliseconds = currentTime.getTime() - regularLatestDate;
        project.regularLatest = null;
      }
    } else if (reqType === 'latest') {
      // check if project had a request from latest
      if (!project.regularLatest) {
        project.regularLatest = currentTime;
      } else {
        elapsedTimeInMilliseconds = currentTime.getTime() - regularLatestDate;
        project.regularLatest = currentTime;
      }
    }

    const elapsedTimeInSeconds = Math.floor(elapsedTimeInMilliseconds / 1000);
    // Parse hoursTaken to a float, add elapsed time, and convert back to a string
    const updatedHoursTaken = (parseFloat(project.hoursTaken) + (elapsedTimeInSeconds / 3600)).toString();

    // Save the original hoursTaken
    let currentHoursTaken = project.hoursTaken;
    // Update project data
    currentHoursTaken = project.hoursTaken = updatedHoursTaken;

    // Save the updated project
    await project.save();

    // Include the elapsed time in seconds and current hoursTaken in the response
    return {
      project,
      elapsedTimeInSeconds: `${elapsedTimeInSeconds} sec`,
      currentHoursTaken: getCurrentTimeTaken(currentHoursTaken)
    };
  } else {
    return {
      message: "Project is already paused",
      currentHoursTaken: getCurrentTimeTaken(project.hoursTaken).currentTimeTaken,
      project
    };
  }
};

// get the current time taken
const getCurrentTimeTaken = (currentHoursTaken) => {
  const currentHoursTakenInSeconds = Math.round(currentHoursTaken * 3600);
  let currentTimeTaken = '';

  if (currentHoursTakenInSeconds < 60) {
    currentTimeTaken = (currentHoursTakenInSeconds).toFixed(2) + ' sec';
  } else if (currentHoursTakenInSeconds < 3600) {
    currentTimeTaken = (currentHoursTakenInSeconds / 60).toFixed(2) + ' min';
  } else {
    currentTimeTaken = (currentHoursTakenInSeconds / 3600).toFixed(2) + ' hrs';
  }

  return {currentTimeTaken: currentTimeTaken, currentHoursTaken: currentHoursTaken};
};

export default updateProjectOnTimeElapse;
export { getCurrentTimeTaken };
