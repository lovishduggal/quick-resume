import api from './client';

export const createResume = (resumeData) => api.post('', resumeData);

export const getUserResumes = (userEmail) =>
  api.get(`?filters[userEmail][$eq]=${userEmail}`);
