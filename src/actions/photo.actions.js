import { photoConstants } from '../constants';
import { photoService } from '../services/photo.service';

export const photoActions = {
    getAll,
    setView,
    delete: _delete
};

function getAll(filter) {
    const request = () => ({ type: photoConstants.GETALL_REQUEST })
    const success = (photos) => ({ type: photoConstants.GETALL_SUCCESS, photos })
    const failure = (error) => ({ type: photoConstants.GETALL_FAILURE, error })

    return async dispatch => {
        dispatch(request());
        try {
            const photos = await photoService.getAll(filter);
            dispatch(success(photos))
        } catch (error) {
            dispatch(failure(error.toString()))
        }
    };
}

function setView(view) {
    return { type: photoConstants.SET_VIEW, view };
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        photoService.delete(id)
            .then(
                photo => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: photoConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: photoConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: photoConstants.DELETE_FAILURE, id, error } }
}