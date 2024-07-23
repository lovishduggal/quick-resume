import api from './client';

export const createResume = (resumeData) => api.post('', resumeData);
