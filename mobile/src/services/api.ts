import axios from 'axios';

const api = axios.create({
    baseURL: 'http://COLOCAR O IP:3333'
});

export default api;