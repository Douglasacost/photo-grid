import { modalConstants, alertConstants } from '../constants';
import { photoService } from '../services/photo.service';

export const modalActions = {
    open,
    close,
};

function open(photoData) {
    const success = (data) => ({ type: modalConstants.OPEN, data })
    const failure = (error) => ({ type: alertConstants.ERROR, error })

    return async dispatch => {
        try {
            const data = await photoService.getUserByAlbumId(photoData.albumId);
            dispatch(success({ ...data, photoData }))
        } catch (error) {
            dispatch(failure(error.toString()))
        }
    };
}

function close() {
    return { type: modalConstants.CLOSE };
}