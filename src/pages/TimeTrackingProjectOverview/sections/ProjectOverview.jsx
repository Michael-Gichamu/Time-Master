import React, { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import { Projects } from "../../../constants";
// import { faWheatAwnCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import DoughnutChart from "../components/DoughnutChart";
import ProjectsList from "../components/ProjectsList";

const ProjectOverview = () => {
  const [cumulativeCompletionStatus, setCumulativeCompletionStatus] = useState(0);

  useEffect(() => {
    // Calculate cumulativeCompletionStatus when the component mounts or Projects change
    const totalCompletion = Projects.reduce((acc, project) => acc + project.completionStatus, 0);
    setCumulativeCompletionStatus(totalCompletion / 2);
  }, [Projects]);

  return (
    <div className="my-14">
      <h1 className="font-bold text-center">Project Overview</h1>
      <div className="section-container">
        <div className="section-line">
          <div>
            <Dashboard />
          </div>
          <div className="md:flex justify-between gap-2 ml-2 pl-2 py-4 px-7 md:h-96">
            <div className="bg-[#19181B] basis-3/4 px-6 pt-4">
              <p className="font-bold">Projects</p>
              {/* <p>{Projects.length}</p> */}
              <div className="h-5/6 overflow-auto scrollbar-thin scrollbar-thumb-[#1F1F1F] scrollbar-track-[#101010] p-2">
                <ProjectsList />
              </div>
            </div>
            <div className="bg-[#19181B] px-2 py-4 my-2 md:my-0">
              <p className="pb-4 font-bold text-center">Completed</p>
              <div className="h-5/6 mx-auto">
                <DoughnutChart cumulativeCompletionStatus= {cumulativeCompletionStatus.toFixed(1)}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;