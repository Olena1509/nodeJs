import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // <-- тут порт сервера бекенду!
});

export default api;

