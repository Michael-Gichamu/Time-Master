import { React, useState, useEffect} from 'react'
// import { Projects } from "../../../constants";
import { faPlay, faPause, faStop, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProjectModal from './ProjectModal';

const ProjectsList = ({
  projects,
  onStartClick,
  onPauseClick,
  onStopClick,
  onUpdateClick,
  onDeleteClick,
  onLatestProject,
  archivedMode
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [playingState, setPlayingState] = useState({});


  const handlePlayPauseClick = (projectId) => {
    const isCurrentlyPlaying = playingState[projectId] || false;

    if (isCurrentlyPlaying) {
      onPauseClick(projectId);
    } else {
      onStartClick(projectId);
    }
  
    // Update the playing state for the clicked project
    setPlayingState((prevState) => ({
      ...prevState,
      [projectId]: !isCurrentlyPlaying,
    }));
  };

  // Function to call onLatestProject every 30 seconds
  const startLatestProjectInterval = () => {
    return setInterval(() => {
      // Call onLatestProject here
      projects.forEach((project) => {
        onLatestProject(project._id);
      });
    }, 1000); // 30 seconds interval
  };

  const handleUpdateClick = (project) => {
    // Set the selected project for updating
    setSelectedProject(project);
    // Open the update modal
    setUpdateModalOpen(true);
  };
  
  const handleUpdateTitle = (newTitle) => {
    // Call the onUpdateClick function with the selected project ID and the new title
    onUpdateClick(selectedProject._id, { title: newTitle });
    // Close the modal
    setUpdateModalOpen(false);
  };

  useEffect(() => {
    // Start the interval only when isPlaying is false
    let intervalId;
    if (!isPlaying) {
      intervalId = startLatestProjectInterval();
    }

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [isPlaying, projects, onLatestProject]);

  return (
    <div>
      <ProjectModal
        isOpen={isUpdateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onUpdate={handleUpdateTitle}
        mode="update"
      />
      {projects.map((project, index) => (
        <div key={index} className="custom-black rounded-md my-3 py-5 px-3">
          <div className="flex justify-between">
            <p>{project.title}</p>
            <p>{`${project.hoursTakenStdFormat}`}</p>
          </div>
          <div className='flex justify-between items-center'>
            <div className="group relative custom-blue mt-3 w-1/3 h-2 rounded-md flex items-center cursor-pointer">
              <div className="custom-green h-1.5 mx-0.5 rounded-md"
                style={{ width: `${project.completionStatus}` }}></div>
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
              {archivedMode ? (
                <button onClick={() => onDeleteClick(project._id)}><FontAwesomeIcon icon={faTrash} className='bg-yellow-950 flex-1'/></button>
              ): (
                <>
                  <button onClick={() => handlePlayPauseClick(project._id)}>
                    <FontAwesomeIcon icon={playingState[project._id] ? faPause : faPlay} />
                  </button>
                  <button onClick={() => onStopClick(project._id)}><FontAwesomeIcon icon={faStop} /></button><button onClick={() => handleUpdateClick(project)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button onClick={() => onDeleteClick(project._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </>
              )}
          </div>
        </div>
        </div>
      ))}
    </div>
  )
}

export default ProjectsList