import axios from 'axios';

const API_URL = 'http://localhost:5000';

export default {
  login(credentials) {
    return axios.post(`${API_URL}/login`, credentials);
  },
};