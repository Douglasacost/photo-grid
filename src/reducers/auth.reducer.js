import { userConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : { user: {
  name: "",
  username: "",
  email: "",
  address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
          lat: "",
          lng: ""
      }
  },
  phone: "",
  website: "",
  company: {
      name: "",
      catchPhrase: "",
      bs: ""
  }    

}};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}