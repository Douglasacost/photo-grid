import { config } from '../config';
import axios from 'axios';

export const photoService = {
    upload,
    getAll,
    getById,
    update,
    delete: _delete
};

async function getAll() {
    try {
        const { data } = await axios({
            method: 'get',
            url: `${config.apiUrl}/photos`
        });
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
}

function getById(id) {

}

async function upload(user) {
    try {
        const { data } = await axios({
            method: 'post',
            url: `${config.apiUrl}/photos`,
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

function update(user) {

}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    
}