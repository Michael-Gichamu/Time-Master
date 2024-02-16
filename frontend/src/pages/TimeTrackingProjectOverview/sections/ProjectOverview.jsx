import React, { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import { getProjects, createProject, updateProject, deleteProject, startProject, pauseProject, finishProject} from '../../../api';
// import { faWheatAwnCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import DoughnutChart from "../components/DoughnutChart";
import ProjectsList from "../components/ProjectsList";
import { faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProjectOverview = () => {
  const [cumulativeCompletionStatus, setCumulativeCompletionStatus] = useState(0);
  const [activeProject, setActiveProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [newProjectTitle, setNewProjectTitle] = useState('');

  
  useEffect(() => {
    const fetchData = async () => {
      const projectsData = await getProjects();
      setProjects(projectsData);
      const totalCompletion = projectsData.reduce((acc, project) => acc + project.completionStatus, 0);
      setCumulativeCompletionStatus(totalCompletion / 2);
    };

    fetchData();
  }, []);

  const handleCreateProject = async () => {
    if (newProjectTitle) {
      await createProject({ title: newProjectTitle, hoursTaken: '0', completionStatus: 0 });
      // Refresh projects data after creating
      const projectsData = await getProjects();
      setProjects(projectsData);
      setNewProjectTitle('');
    }
  };

  const handleUpdateProject = async (projectId, projectData) => {
    await updateProject(projectId, projectData);
    // Refresh projects data after updating
    const projectsData = await getProjects();
    setProjects(projectsData);
  };

  const handleDeleteProject = async (projectId) => {
    await deleteProject(projectId);
    // Refresh projects data after deleting
    const projectsData = await getProjects();
    setProjects(projectsData);
  };

  const handleStartClick = async (projectId) => {
    setActiveProject(projectId);
    await startProject(projectId);
    // Refresh projects data after starting
    const projectsData = await getProjects();
    setProjects(projectsData);
  };

  const handlePauseClick = async (projectId) => {
    await pauseProject(projectId);
    // Refresh projects data after pausing
    const projectsData = await getProjects();
    setProjects(projectsData);
  };

  const handleStopClick = async () => {
    if (activeProject) {
      await finishProject(activeProject._id);
      // Refresh projects data after stopping
      const projectsData = await getProjects();
      setProjects(projectsData);
      setActiveProject(null);
    }
  };

  return (
    <div className="my-14">
      <h1 className="font-bold text-center">Project Overview</h1>
      <div className="section-container">
        <div className="section-line">
          <div>
            <Dashboard />
          </div>
          <div className="md:flex justify-between gap-2 ml-2 pl-2 py-4 px-7 md:h-96">
            <div className="custom-gray basis-3/4 px-6 pt-4">
              <div className="flex justify-between items-center pr-2">
                <p className="font-bold">Active Projects: 4</p>
                <FontAwesomeIcon icon={ faBoxArchive } className="text-[#9DCBEF]"/>
              </div>
              <div className="h-5/6 overflow-auto scrollbar-thin scrollbar-thumb-[#1F1F1F] scrollbar-track-[#101010] p-2">
                <ProjectsList
                    projects={projects}
                    onCreateProject={handleCreateProject}
                    onUpdateClick={handleUpdateProject}
                    onDeleteClick={handleDeleteProject}
                    onStartClick={handleStartClick}
                    onPauseClick={handlePauseClick}
                    onStopClick={handleStopClick}
                  />  
              </div>
            </div>
            <div className="custom-gray px-2 py-4 my-2 md:my-0">
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