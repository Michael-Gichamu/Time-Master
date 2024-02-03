import ProjectOverview from "./sections/ProjectOverview"
import TimeTracking from "./sections/TimeTracking"
import Welcome from "./sections/Welcome"

const TimeTrackingProjectOverview = () => {
  return (
    <>
      <Welcome />
      <ProjectOverview />
      <TimeTracking />
    </>
  )
}

export default TimeTrackingProjectOverview