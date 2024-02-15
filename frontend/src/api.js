import axios from 'axios';
const BaseUrl = 'http://localhost:5555';

export const getProjects = async () => {
  const response = await axios.get(`${BaseUrl}/projects`);
  return response.data;
};

export const startProject = async (projectId) => {
  const response = await axios.put(`${BaseUrl}/projects/${projectId}/start`);
  return response.data;
};

export const endProject = async (projectId) => {
  const response = await axios.put(`${BaseUrl}/projects/${projectId}/end`);
  return response.data;
}

export const createProject = async (projectData) => {
  const response = await axios.post(`${BaseUrl}/projects`, projectData);
  return response.data;
};

export const updateProject = async (projectId, projectData) => {
  const response = await axios.put(`${BaseUrl}/projects/${projectId}`, projectData);
  return response.data;
};

export const deleteProject = async (projectId) => {
  const response = await axios.delete(`${BaseUrl}/projects/${projectId}`);
  return response.data;
};