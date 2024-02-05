import React from 'react'
import { Projects } from "../../../constants";

const ProjectsList = () => {
  return (
    <div>
      {Projects.map((project, index) => (
        <div key={index} className="custom-black rounded-md my-3 py-5 px-3">
          <div className="flex justify-between">
            <p>{project.title}</p>
            <p>{`${project.hoursTaken}hrs`}</p>
          </div>
          <div className="group relative custom-blue mt-3 w-1/3 h-2 rounded-md flex items-center cursor-pointer">
            <div className="custom-green h-1.5 mx-0.5 rounded-md"
              style={{ width: `${project.completionStatus}%` }}></div>
            <div
              className="custom-darkgray absolute left-full top-1/2 z-20 ml-3 -translate-y-1/2 whitespace-nowrap rounded-[5px] py-1 px-3.5 text-sm text-white opacity-0 group-hover:opacity-100"
              >
              <span
                className="custom-darkgray absolute left-[-3px] top-1/2 -z-10 h-2 w-2 -translate-y-1/2 rotate-45"
                ></span>
                Completed: {project.completionStatus}%
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProjectsList