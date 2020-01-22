import { config } from '../config';
import axios from 'axios';

export const photoService = {
    upload,
    getAll,
    getUserByAlbumId,
    update,
    delete: _delete
};

async function getAll(byUserId) {
    try {
        if (byUserId) {
            const albums = await getAlbums(byUserId);
            const promises = albums.map(async res => {
                const { data } = await axios({
                    method: 'get',
                    url: `${config.apiUrl}/photos?albumId=${res.id}`
                })
                return data;
            })
            const finalResult = await Promise.all(promises)
            return finalResult.flat(1);
        } else {
            const { data } = await axios({
                method: 'get',
                url: `${config.apiUrl}/photos`
            });
            return data;
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

async function getAlbums(byUserId) {
    try {
        const { data } = await axios({
            method: 'get',
            url: `${config.apiUrl}/albums?userId=${byUserId}`
        });
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
}

async function getUserByAlbumId(albumId) {

    try {
        const { data: [album] } = await axios({
            method: 'get',
            url: `${config.apiUrl}/albums?id=${albumId}`
        });
        const { data: [ user ] } = await axios({
            method: 'get',
            url: `${config.apiUrl}/users?id=${album.userId}`
        });
        console.log(user, album)
        return { user, album };
    } catch (error) {
        return Promise.reject(error);
    }
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