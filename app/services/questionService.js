import api from './axiosConfig';

export const getQuestions = async () => {
  const response = await api.get(`/questions`);
  return response.data;
};
