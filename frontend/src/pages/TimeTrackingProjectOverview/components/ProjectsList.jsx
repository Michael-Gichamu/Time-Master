import { React, useState} from 'react'
import { Projects } from "../../../constants";
import { faPlay, faPause, faStop, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProjectsList = ({
  projects,
  onStartClick,
  onPauseClick,
  onStopClick,
  onUpdateClick,
  onDeleteClick,
  onLatestProject,
}) => {
  const [isToggled, setIsToggled] = useState(true);
  const handleToggle = () => {
    setIsToggled(!isToggled);
  }
  
  return (
    <div>
      {projects.map((project, index) => (
        <div key={index} className="custom-black rounded-md my-3 py-5 px-3">
          <div className="flex justify-between">
            <p>{project.title}</p>
            <p>{`${project.hoursTaken}hrs`}</p>
          </div>
          <div className='flex justify-between items-center'>
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
            <div className="flex justify-between mt-3 w-1/6 *:w-1/4 text-[#9DCBEF]">
              <button onClick={() => onStartClick(project._id)}>
                <button onClick={handleToggle}>
                  <FontAwesomeIcon icon={isToggled ? faPlay : faPause} />
                </button>
              </button>
              <button onClick={() => onStopClick(project._id)}><FontAwesomeIcon icon={faStop} /></button>
              <button onClick={() => onUpdateClick(project._id, { title: 'Updated Title' })}><FontAwesomeIcon icon={faPenToSquare} /></button>
              <button onClick={() => onDeleteClick(project._id)}><FontAwesomeIcon icon={faTrash} /></button>
              <button onClick={() => onLatestProject(project._id)}>Fetch Latest</button>
          </div>
        </div>
        </div>
      ))}
    </div>
  )
}

export default ProjectsList