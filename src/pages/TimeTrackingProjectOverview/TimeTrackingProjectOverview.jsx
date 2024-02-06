import MaximizeProductivity from "./sections/MaximizeProductivity"
import ProjectOverview from "./sections/ProjectOverview"
import TimeTrackingOverview from "./sections/TimeTrackingOverview"
import Welcome from "./sections/Welcome"

const TimeTrackingProjectOverview = () => {
  return (
    <>
      <Welcome />
      <ProjectOverview />
      <TimeTrackingOverview />
      <MaximizeProductivity />
    </>
  )
}

export default TimeTrackingProjectOverview