// ProjectOverview.jsx

import React, { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import { getProjects, createProject, updateProject, deleteProject, startProject, pauseProject, finishProject, latestProject, getarchivedProjects } from '../../../api';
import DoughnutChart from "../components/DoughnutChart";
import ProjectsList from "../components/ProjectsList";
import { faBoxArchive, faRotateRight, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProjectModal from "../components/ProjectModal";
import { useSnackbar } from "notistack";

const ProjectOverview = () => {
  const [cumulativeCompletionStatus, setCumulativeCompletionStatus] = useState(0);
  const [activeProjects, setActiveProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  // const [newProjectTitle, setNewProjectTitle] = useState('');
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [archivedMode, setArchivedMode] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let projectsData;
        if (archivedMode) {
          const archivedProjectsData = await getarchivedProjects();
          setProjects(archivedProjectsData);
          if (archivedProjectsData && archivedProjectsData.length > 0) {
            enqueueSnackbar("Archived projects fetched successfully.", { variant: "success" });
          } else {
            enqueueSnackbar("No archived projects found.", { variant: "warning" });
            setTimeout(() => {
              setArchivedMode(false);
            }, 100);
          }
          
        } else {
          projectsData = await getProjects();
          setProjects(projectsData);
        }
        if (projectsData && projectsData.length > 0) {
          const totalCompletion = projectsData.reduce((acc, project) => acc + project.completionStatus, 0);
          setCumulativeCompletionStatus(totalCompletion / 2);
          enqueueSnackbar("Active projects fetched successfully.", { variant: "success" });
        } else {
          setCumulativeCompletionStatus(0);
          if (!archivedMode) {
            enqueueSnackbar("No active projects found.", { variant: "warning" });
          }
        } 
      } catch (error) {
        enqueueSnackbar(`Error fetching projects. ${error} Please try again.`, { variant: "error" });
      }
    };

    fetchData();
  }, [archivedMode]);

  const onCreateProject = async (newTitle) => {
    try {
      if (newTitle) {
        await createProject({ title: newTitle, hoursTaken: '0', completionStatus: 0 });
        const projectsData = await getProjects();
        setProjects(projectsData);
        enqueueSnackbar("Project created successfully.", { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar(`Error creating project. ${error} Please try again.`, { variant: "error" });
    }
  };

  const handleCreateProject = (newTitle) => {
    // Call the onCreateProject function with the new title 
    onCreateProject(newTitle);
    // Close the modal
    setCreateModalOpen(false);
  };

  const handleUpdateProject = async (projectId, projectData) => {
    try {
      await updateProject(projectId, projectData);
      const projectsData = await getProjects();
      setProjects(projectsData);
      enqueueSnackbar("Project updated successfully.", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Error updating project. Please try again.", { variant: "error" });
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await deleteProject(projectId);
      const projectsData = await getProjects();
      setProjects(projectsData);
      const archivedProjectsData = await getarchivedProjects();
      if (archivedMode && archivedProjectsData.length === 0) {
        setArchivedMode(false);
      }
      enqueueSnackbar("Project deleted successfully.", { variant: "success" });
    } catch (error) {
      setError("Error deleting project. Please try again.");
    }
  };

  const handleStartClick = async (projectId) => {
    try {
      if (activeProjects.includes(projectId)) {
        enqueueSnackbar("Project already started.", { variant: "info" });
      } else {
        const updatedActiveProjects = [...activeProjects, projectId];
        setActiveProjects(updatedActiveProjects);
        await startProject(projectId);
        const projectsData = await getProjects();
        setProjects(projectsData);
        enqueueSnackbar("Project started successfully.", { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar("Error starting project. Please try again.", { variant: "error" });
    }
  };

  const handlePauseClick = async (projectId) => {
    try {
      await pauseProject(projectId);
      const projectsData = await getProjects();
      setProjects(projectsData);
      // Remove the paused project from activeProjects
      setActiveProjects(activeProjects.filter(id => id !== projectId));
      enqueueSnackbar("Project paused successfully.", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Error pausing project. Please try again.", { variant: "error" });
    }
  };

  const handleLatestProject = async (projectId) => {
    try {
      await latestProject(projectId);
      const projectsData = await getProjects();
      setProjects(projectsData);
      enqueueSnackbar("Project updated successfully.", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Error updating project. Please try again.", { variant: "error" });
    }
  };

  const handleStopClick = async (projectId) => {
    try {
      await finishProject(projectId);
      const projectsData = await getProjects();
      setProjects(projectsData);
      
      // Remove the stopped project from activeProjects
      setActiveProjects(activeProjects.filter(id => id !== projectId));
      enqueueSnackbar("Project stopped successfully.", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Error stopping project. Please try again.", { variant: "error" });
    }
  };

  const handleToggleClick = () => {
    if (archivedMode) {
      // If currently in archived mode, switch to active mode
      setArchivedMode(false);
    } else {
      // If currently in active mode, switch to archived mode
      setArchivedMode(true);
    }
  };

  // const handleArchiveClick = async () => {
  //   try {
  //     // Call getArchivedProjects to fetch archived projects
  //     const archivedProjectsData = await getarchivedProjects();
  //     setProjects(archivedProjectsData);
  //     setArchivedMode(true); // Set archived mode to true
  //   } catch (error) {
  //     setError("Error fetching archived projects. Please try again.");
  //   }
  // };

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
                <p className="font-bold">Active Projects: {activeProjects.length}</p>
                <div className="*:p-2 mt-1 *:hover:cursor-pointer">
                  <FontAwesomeIcon icon={faCirclePlus} className="text-[#9DCBEF] mr-1" onClick={() => { setCreateModalOpen(true); }} />
                   <FontAwesomeIcon icon={archivedMode ? faRotateRight : faBoxArchive} className="text-[#9DCBEF]" onClick={handleToggleClick}/>
                </div>
              </div>
              <div className="h-5/6 overflow-auto scrollbar-thin scrollbar-thumb-[#1F1F1F] scrollbar-track-[#101010] p-2">
                <ProjectModal
                  isOpen={isCreateModalOpen}
                  onClose={() => setCreateModalOpen(false)}
                  onUpdate={handleCreateProject}
                  mode="create"
                />
                <ProjectsList
                  projects={projects}
                  onUpdateClick={handleUpdateProject}
                  onDeleteClick={handleDeleteProject}
                  onStartClick={handleStartClick}
                  onPauseClick={handlePauseClick}
                  onLatestProject={handleLatestProject}
                  onStopClick={handleStopClick}
                  archivedMode={archivedMode}
                />
              </div>
            </div>
            <div className="custom-gray px-2 py-4 my-2 md:my-0">
              <p className="pb-4 font-bold text-center">Completed</p>
              <div className="h-5/6 mx-auto">
                <DoughnutChart cumulativeCompletionStatus={cumulativeCompletionStatus.toFixed(1)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
