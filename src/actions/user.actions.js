import { userConstants, alertConstants } from '../constants';
import { userService } from '../services/user.service';
import { alertActions } from '.';
import { history } from '../helpers';

export const userActions = {
    login,
    logout,
    register,
    update,
    getAll,
    delete: _delete
};

function login(email, password) {
    const request = (user) => ({ type: userConstants.LOGIN_REQUEST, user });
    const success = (user) => ({ type: userConstants.LOGIN_SUCCESS, user });
    const failure = (error) => ({ type: alertConstants.ERROR, error })

    return async dispatch => {
        dispatch(request({ email, password }));
        dispatch(getAll());
        try {
            const user = await userService.login(email, password);
            dispatch(success(user));
            localStorage.setItem('user', JSON.stringify(user));
            history.push('/albums');
        } catch (error) {
            dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
        }
    };
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(email, password) {
    const request = () => ({ type: userConstants.REGISTER_REQUEST  })
    const success = () => ({ type: userConstants.REGISTER_SUCCESS })
    const failure = (error) => ({ type: alertConstants.ERROR, error });

    return async dispatch => {
        dispatch(request(email, password));
        try {
            await userService.register(email, password);
            dispatch(success());
            history.push('/login');
            dispatch(alertActions.success('Registration successful'));
        } catch (error) {
            dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
        }
    };
}

function update(user) {
    const request = (user) => ({ type: userConstants.UPDATE_REQUEST, user })
    const success = (user) => ({ type: userConstants.UPDATE_SUCCESS, user })
    const successUpdate = (user) => ({ type: userConstants.LOGIN_SUCCESS, user });
    const failure = (error) => ({ type: alertConstants.ERROR, error })

    return async dispatch => {
        dispatch(request(user));
        try {
            await userService.update(user);
            dispatch(success());
            dispatch(successUpdate(user));
            dispatch(alertActions.success('Update successful'));
        } catch (error) {
            dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
        }
    };
}

function getAll() {
    const request = () => ({ type: userConstants.GETALL_REQUEST })
    const success = (users) => ({ type: userConstants.GETALL_SUCCESS, users })
    const failure = (error) => ({ type: alertConstants.ERROR, error })

    return async dispatch => {
        dispatch(request());
        try {
            const users = await userService.getAll();
            dispatch(success(users))
        } catch (error) {
            dispatch(failure(error.toString()))
        }
    };
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}