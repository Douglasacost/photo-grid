import { config } from '../config';
import axios from 'axios';

export const userService = {
    login,
    logout,
    register,
    getAll,
};

async function login(username) {
    try {
        const users = await getAll();
        const user = users.find(user => user.email === username || user.username === username)
        if (!user) return Promise.reject('User not found');
        return user
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
            method: 'get',
            url: `${config.apiUrl}/users`
        });
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
}

async function register(user) {
    try {
        const { data } = await axios({
            method: 'post',
            url: `${config.apiUrl}/users`,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            data: user
        });
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
}