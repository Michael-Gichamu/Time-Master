import React, { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import { Projects } from "../../../constants";
// import { faWheatAwnCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import DoughnutChart from "../components/DoughnutChart";

const ProjectOverview = () => {
  const [cumulativeCompletionStatus, setCumulativeCompletionStatus] = useState(0);

  useEffect(() => {
    // Calculate cumulativeCompletionStatus when the component mounts or Projects change
    const totalCompletion = Projects.reduce((acc, project) => acc + project.completionStatus, 0);
    setCumulativeCompletionStatus(totalCompletion / 2);
  }, [Projects]);

  
  console.log(cumulativeCompletionStatus + 'from Project Overview')
  return (
    <div className="my-14">
      <h1 className="font-bold text-center">Project Overview</h1>
      <div className="section-container">
        <div className="section-line">
          <div>
            <Dashboard />
          </div>
          <div className="md:flex justify-between gap-2 ml-2 pl-2 py-4 px-7  h-96">
            <div className="bg-[#19181B] basis-3/4 px-6 pt-4">
              <p className="font-bold">Projects</p>
              {/* <p>{Projects.length}</p> */}
              <div className="h-5/6 overflow-auto scrollbar-thin scrollbar-thumb-[#1F1F1F] scrollbar-track-[#101010] p-2">
                <div className="bg-[#101010] rounded-md my-3 py-5 px-3">
                  <div className="flex justify-between">
                    <p>TimeMaster Design</p>
                    <p>7hrs 31min</p>
                  </div>
                  <div className="group relative bg-[#1E6575] mt-3 w-1/3 h-2 rounded-md flex items-center">
                    <div className="bg-[#97C43B] h-1.5 w-3/4 mx-0.5 rounded-md"></div>
                    <div
                     className="bg-[#1F1F1F] absolute left-full top-1/2 z-20 ml-3 -translate-y-1/2 whitespace-nowrap rounded-[5px] py-1 px-3.5 text-sm text-white opacity-0 group-hover:opacity-100"
                     >
                     <span
                        className="bg-[#1F1F1F] absolute left-[-3px] top-1/2 -z-10 h-2 w-2 -translate-y-1/2 rotate-45"
                        ></span>
                        Completed: 75%
                    </div>
                  </div>
                </div>
                <div className="bg-[#101010] rounded-md my-3 py-5 px-3">
                  <div className="flex justify-between">
                    <p>TimeMaster Design</p>
                    <p>7hrs 31min</p>
                  </div>
                  <div className="group relative bg-[#1E6575] mt-3 w-1/3 h-2 rounded-md flex items-center">
                    <div className="bg-[#97C43B] h-1.5 w-3/4 mx-0.5 rounded-md"></div>
                    <div
                     className="bg-[#1F1F1F] absolute left-full top-1/2 z-20 ml-3 -translate-y-1/2 whitespace-nowrap rounded-[5px] py-1 px-3.5 text-sm text-white opacity-0 group-hover:opacity-100"
                     >
                     <span
                        className="bg-[#1F1F1F] absolute left-[-3px] top-1/2 -z-10 h-2 w-2 -translate-y-1/2 rotate-45"
                        ></span>
                        Completed: 75%
                    </div>
                  </div>
                </div>
                <div className="bg-[#101010] rounded-md my-3 py-5 px-3">
                  <div className="flex justify-between">
                    <p>TimeMaster Design</p>
                    <p>7hrs 31min</p>
                  </div>
                  <div className="group relative bg-[#1E6575] mt-3 w-1/3 h-2 rounded-md flex items-center">
                    <div className="bg-[#97C43B] h-1.5 w-3/4 mx-0.5 rounded-md"></div>
                    <div
                     className="bg-[#1F1F1F] absolute left-full top-1/2 z-20 ml-3 -translate-y-1/2 whitespace-nowrap rounded-[5px] py-1 px-3.5 text-sm text-white opacity-0 group-hover:opacity-100"
                     >
                     <span
                        className="bg-[#1F1F1F] absolute left-[-3px] top-1/2 -z-10 h-2 w-2 -translate-y-1/2 rotate-45"
                        ></span>
                        Completed: 75%
                    </div>
                  </div>
                </div>
                <div className="bg-[#101010] rounded-md my-3 py-5 px-3">
                  <div className="flex justify-between">
                    <p>TimeMaster Design</p>
                    <p>7hrs 31min</p>
                  </div>
                  <div className="group relative bg-[#1E6575] mt-3 w-1/3 h-2 rounded-md flex items-center">
                    <div className="bg-[#97C43B] h-1.5 w-3/4 mx-0.5 rounded-md"></div>
                    <div
                     className="bg-[#1F1F1F] absolute left-full top-1/2 z-20 ml-3 -translate-y-1/2 whitespace-nowrap rounded-[5px] py-1 px-3.5 text-sm text-white opacity-0 group-hover:opacity-100"
                     >
                     <span
                        className="bg-[#1F1F1F] absolute left-[-3px] top-1/2 -z-10 h-2 w-2 -translate-y-1/2 rotate-45"
                        ></span>
                        Completed: 75%
                    </div>
                  </div>
                </div>
                <div className="bg-[#101010] rounded-md my-3 py-5 px-3">
                  <div className="flex justify-between">
                    <p>TimeMaster Design</p>
                    <p>7hrs 31min</p>
                  </div>
                  <div className="group relative bg-[#1E6575] mt-3 w-1/3 h-2 rounded-md flex items-center">
                    <div className="bg-[#97C43B] h-1.5 w-3/4 mx-0.5 rounded-md"></div>
                    <div
                     className="bg-[#1F1F1F] absolute left-full top-1/2 z-20 ml-3 -translate-y-1/2 whitespace-nowrap rounded-[5px] py-1 px-3.5 text-sm text-white opacity-0 group-hover:opacity-100"
                     >
                     <span
                        className="bg-[#1F1F1F] absolute left-[-3px] top-1/2 -z-10 h-2 w-2 -translate-y-1/2 rotate-45"
                        ></span>
                        Completed: 75%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#19181B] px-2 py-4">
              <p className="pb-4 font-bold text-center">Completed</p>
              <div className="h-5/6">
                <DoughnutChart cumulativeCompletionStatus= {cumulativeCompletionStatus.toFixed(1)}/>
                {/* <p className="relative bottom-36 text-center mx-auto font-extrabold text-5xl text-[#97c43b] ">{cumulativeCompletionStatus.toFixed(1)}%</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;