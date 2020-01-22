import { combineReducers } from 'redux';

import { authentication } from './auth.reducer';
import { registration } from './register.reducer';
import { photos } from './photo.reducer';
import { users } from './user.reducer';
import { alert } from './alert.reducer';
import { modal } from './modal.reducer';
import { updateUser } from './updateUser.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  photos,
  modal,
  updateUser
});

export default rootReducer;