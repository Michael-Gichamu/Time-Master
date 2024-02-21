import MaximizeProductivity from "./sections/MaximizeProductivity"
import ProjectOverview from "./sections/ProjectOverview"
import TimeTrackingOverview from "./sections/TimeTrackingOverview"
import Welcome from "./sections/Welcome"
import { SnackbarProvider } from "notistack";

const TimeTrackingProjectOverview = () => {
  return (
    <>
      <Welcome />
      <SnackbarProvider maxSnack={3}>
        <ProjectOverview />
      </SnackbarProvider>
      <TimeTrackingOverview />
      {/* <MaximizeProductivity /> to be implemented*/} 
    </>
  )
}

export default TimeTrackingProjectOverview