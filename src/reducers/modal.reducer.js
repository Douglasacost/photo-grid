import { modalConstants } from '../constants';

export function modal(state = {}, action) {
  switch (action.type) {
    case modalConstants.OPEN:
      return {
        data: action.data
      };
    case modalConstants.CLOSE:
      return {
          data: null
      };
    default:
      return state
  }
}