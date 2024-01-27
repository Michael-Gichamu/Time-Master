import Dashboard from "../../../components/Dashboard"

const ProjectOverview = () => {
  return (
    <div className="text-center my-14">
      <h1 className="font-bold">Project Overview</h1>
      <div className="section-container">
        <div className="section-line">
          <div>
            <Dashboard />
          </div>
          <div className="flex justify-between gap-2 pl-2 p-8">
            <div className="bg-[#19181B] basis-2/3"><p>Projects</p></div>
            <div className="bg-[#19181B] basis-1/3"><p>Completed</p></div>
          </div>
          {/* <p className="ml-2">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p> */}
        </div>
      </div>
    </div>
  )
}

export default ProjectOverview