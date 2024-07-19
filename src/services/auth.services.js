// src/services/auth.service.js
import axios from '../api/axios';

const login = (username, password) => {
    return axios
        .post('/api/token/', {
            username,
            password
        })
        .then(response => {
            if (response.data.access) {
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

const authService = {
    login,
    logout
};

export default authService;