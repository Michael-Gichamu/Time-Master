import axios from 'axios';
const BaseUrl = 'http://localhost:5555';

// Create a new project
export const createProject = async (projectData) => {
  const response = await axios.post(`${BaseUrl}/projects`, projectData);
  return response.data;
};

// Retrieves all the projects from the server
export const getProjects = async () => {
  const response = await axios.get(`${BaseUrl}/projects`);
  return response.data;
};

// Update a project
export const updateProject = async (projectId, projectData) => {
  const response = await axios.put(`${BaseUrl}/projects/${projectId}`, projectData);
  return response.data;
};

// Delete a project
export const deleteProject = async (projectId) => {
  const response = await axios.delete(`${BaseUrl}/projects/${projectId}`);
  return response.data;
};

// Set the start time for a project
export const startProject = async (projectId) => {
  const response = await axios.put(`${BaseUrl}/projects/${projectId}/start`);
  return response.data;
};

// Set the end time for a project and calculate the hours taken from the start time
export const pauseProject = async (projectId) => {
  const response = await axios.put(`${BaseUrl}/projects/${projectId}/pause`);
  return response.data;
}

// retrieve updates on time elapsed and hours taken for a project
export const latestProject = async (projectId) => {
  const response = await axios.get(`${BaseUrl}/projects/${projectId}/latest`);
  return response.data;
}

// Sets that a project is finished and is archived
export const finishProject = async (projectId) => {
  const response = await axios.put(`${BaseUrl}/projects/${projectId}/finish`);
  return response.data;
}

// Retrieves all the archived projects from the server
export const getarchivedProjects = async () => {
  const response = await axios.get(`${BaseUrl}/projects/archived`);
  return response.data;
}