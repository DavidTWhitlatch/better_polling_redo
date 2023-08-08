import api from './axiosConfig';

export const submitAnswers = async (answers) => {
  const response = await api.post('/answers', { answers });
  return response;
};

export const getAnswers = async () => {
  const response = await api.get('/answers');
  return response.data;
};
