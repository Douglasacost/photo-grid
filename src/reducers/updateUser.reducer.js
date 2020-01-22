import { userConstants } from '../constants';

export function updateUser(state = {}, action) {
  switch (action.type) {
    case userConstants.UPDATE_REQUEST:
      return { registering: true };
    case userConstants.UPDATE_SUCCESS:
      return {};
    case userConstants.UPDATE_FAILURE:
      return {};
    default:
      return state
  }
}