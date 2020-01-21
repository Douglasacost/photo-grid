import { photoConstants } from '../constants';

export function photos(state = { view: 'All' }, action) {
  switch (action.type) {
    case photoConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case photoConstants.SET_VIEW:
      return {
        ...state,
        view: action.view,
      };
    case photoConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.photos,
      };
    case photoConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case photoConstants.DELETE_REQUEST:

      return {
        ...state,
        items: state.items.map(photo =>
          photo.id === action.id
            ? { ...photo, deleting: true }
            : photo
        )
      };
    case photoConstants.DELETE_SUCCESS:

      return {
        items: state.items.filter(photo => photo.id !== action.id)
      };
    case photoConstants.DELETE_FAILURE:

      return {
        ...state,
        items: state.items.map(photo => {
          if (photo.id === action.id) {
            const { deleting, ...photoCopy } = photo;
            return { ...photoCopy, deleteError: action.error };
          }

          return photo;
        })
      };
    default:
      return state
  }
}