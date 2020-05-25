import { config } from '../config';
import axios from 'axios';

export const userService = {
    login,
    logout,
    update,
    register,
    getAll,
};

async function login(email, password) {
    try {
        const { data } = await axios({
            method: 'post',
            url: `${config.authApiUrl}/login.php`,
            data: {
               email, password 
            }
        });

        return data
    } catch (error) {
        return Promise.reject(error);
    }
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

async function getAll() {
    try {
        const { data } = await axios({
            method: 'post',
            url: `${config.authApiUrl}/login.php`,
            data: {
                
            }
        });
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
}

async function register(email, password) {
    try {
        const { data } = await axios({
            method: 'post',
            url: `${config.authApiUrl}/register.php`,
            data: {
               email, password 
            }
        });

        return data
    } catch (error) {
        return Promise.reject(error);
    }
}

async function update(user) {
    try {
        const { data } = await axios({
            method: 'patch',
            url: `${config.apiUrl}/users/${user.id}`,
            data: user
        });
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
}