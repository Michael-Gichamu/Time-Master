// ProjectOverview.jsx

import React, { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import { getProjects, createProject, updateProject, deleteProject, startProject, pauseProject, finishProject, latestProject } from '../../../api';
import DoughnutChart from "../components/DoughnutChart";
import ProjectsList from "../components/ProjectsList";
import { faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProjectOverview = () => {
  const [
    cumulativeCompletionStatus, setCumulativeCompletionStatus] = useState(0);
  const [activeProjects, setActiveProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsData = await getProjects();
        setProjects(projectsData);
        const totalCompletion = projectsData.reduce((acc, project) => acc + project.completionStatus, 0);
        setCumulativeCompletionStatus(totalCompletion / 2);
      } catch (error) {
        setError("Error fetching projects. Please try again.");
      }
    };

    fetchData();
  }, []);

  const handleCreateProject = async () => {
    try {
      if (newProjectTitle) {
        await createProject({ title: newProjectTitle, hoursTaken: '0', completionStatus: 0 });
        const projectsData = await getProjects();
        setProjects(projectsData);
        setNewProjectTitle('');
      }
    } catch (error) {
      setError("Error creating project. Please try again.");
    }
  };

  const handleUpdateProject = async (projectId, projectData) => {
    try {
      await updateProject(projectId, projectData);
      const projectsData = await getProjects();
      setProjects(projectsData);
    } catch (error) {
      setError("Error updating project. Please try again.");
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await deleteProject(projectId);
      const projectsData = await getProjects();
      setProjects(projectsData);
    } catch (error) {
      setError("Error deleting project. Please try again.");
    }
  };

  const handleStartClick = async (projectId) => {
    try {
      const updatedActiveProjects = [...activeProjects, projectId];
      setActiveProjects(updatedActiveProjects);
      await startProject(projectId);
      const projectsData = await getProjects();
      setProjects(projectsData);
    } catch (error) {
      setError("Error starting project. Please try again.");
    }
  };

  const handlePauseClick = async (projectId) => {
    try {
      await pauseProject(projectId);
      const projectsData = await getProjects();
      setProjects(projectsData);
    } catch (error) {
      setError("Error pausing project. Please try again.");
    }
  };

  const handleLatestProject = async (projectId) => {
    try {
      await latestProject(projectId);
      const projectsData = await getProjects();
      setProjects(projectsData);
    } catch (error) {
      setError("Error fetching latest project data. Please try again.");
    }
  };

  const handleStopClick = async (projectId) => {
    try {
      if (activeProjects.includes(projectId)) {
        await finishProject(projectId);
        const projectsData = await getProjects();
        setProjects(projectsData);
        
        // Remove the stopped project from activeProjects
        setActiveProjects(activeProjects.filter(id => id !== projectId));
      }
    } catch (error) {
      setError("Error stopping project. Please try again.");
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
                <p className="font-bold">Active Projects: {activeProjects.length}</p>
                <FontAwesomeIcon icon={faBoxArchive} className="text-[#9DCBEF]" />
              </div>
              <div className="h-5/6 overflow-auto scrollbar-thin scrollbar-thumb-[#1F1F1F] scrollbar-track-[#101010] p-2">
                <ProjectsList
                  projects={projects}
                  onCreateProject={handleCreateProject}
                  onUpdateClick={handleUpdateProject}
                  onDeleteClick={handleDeleteProject}
                  onStartClick={handleStartClick}
                  onPauseClick={handlePauseClick}
                  onLatestProject={handleLatestProject}
                  onStopClick={handleStopClick}
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
