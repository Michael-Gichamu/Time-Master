import ProjectOverview from "./sections/ProjectOverview"
import TimeTrackingOverview from "./sections/TimeTrackingOverview"
import Welcome from "./sections/Welcome"

const TimeTrackingProjectOverview = () => {
  return (
    <>
      <Welcome />
      <ProjectOverview />
      <TimeTrackingOverview />
    </>
  )
}

export default TimeTrackingProjectOverview