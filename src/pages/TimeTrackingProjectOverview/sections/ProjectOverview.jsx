import React, { useState, useEffect } from "react";
import Dashboard from "../../../components/Dashboard";
import { Projects } from "../../../constants";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { faWheatAwnCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const ProjectOverview = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const [cumulativeCompletionStatus, setCumulativeCompletionStatus] = useState(0);

  useEffect(() => {
    // Calculate cumulativeCompletionStatus when the component mounts or Projects change
    const totalCompletion = Projects.reduce((acc, project) => acc + project.completionStatus, 0);
    setCumulativeCompletionStatus(totalCompletion / 2);
  }, [Projects]);

  const doughnutData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [cumulativeCompletionStatus, 100 - cumulativeCompletionStatus],
        backgroundColor: ["#97C43B", "#1E6575"],
        borderColor: "#1E6575",
      },
    ],
  };

  const doughnutOptions = {
    cutout: "80%", // Adjust the size of the doughnut hole,
    radius: '80%',
    layout: {
      padding: {
        top: 20,
        left: 10,
        right: 10,
      },
    },
  }

  return (
    <div className="text-center my-14">
      <h1 className="font-bold">Project Overview</h1>
      <div className="section-container">
        <div className="section-line">
          <div>
            <Dashboard />
          </div>
          <div className="flex justify-between gap-2 ml-2 pl-2 py-4 px-7">
            <div className="bg-[#19181B] basis-2/3">
              <p>Projects</p>
              <p>{Projects.length}</p>
            </div>
            <div className="bg-[#19181B] px-2 py-4">
              <p className="pb-4 font-bold">Completed</p>
              <div>
                <Doughnut data={doughnutData}  options={doughnutOptions}/>
                <p className="relative bottom-44 mx-auto font-extrabold text-5xl text-[#97C43B] ">{cumulativeCompletionStatus.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;