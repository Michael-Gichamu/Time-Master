import axios from 'axios';
const BaseUrl = 'http://localhost:5555';

export const getProjects = async () => {
  const response = await axios.get(`${BASE_URL}/projects`);
  return response.data;
};

export const startProject = async (projectId) => {
  const response = await axios.put(`${BASE_URL}/projects/${projectId}/start`);
  return response.data;
};

export const createProject = async (projectData) => {
  const response = await axios.post(`${BASE_URL}/projects`, projectData);
  return response.data;
};

export const updateProject = async (projectId, projectData) => {
  const response = await axios.put(`${BASE_URL}/projects/${projectId}`, projectData);
  return response.data;
};

export const deleteProject = async (projectId) => {
  const response = await axios.delete(`${BASE_URL}/projects/${projectId}`);
  return response.data;
};