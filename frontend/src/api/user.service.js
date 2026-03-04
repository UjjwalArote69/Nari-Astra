import api from './axios.config';

const userService = {
  register: async (userData) => {
    const response = await api.post('/users/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/users/login', credentials);
    return response.data;
  },

  getProfile: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  }
};

export default userService;