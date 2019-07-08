import { SHOW_ADD_EDIT_ORDER_POPUP, HIDE_ADD_EDIT_ORDER_POPUP } from '../constants/addEditOrderPopup';

const initialState = {
  isOpen: false,
};

const ProfileEditReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case SHOW_ADD_EDIT_ORDER_POPUP:
      newState = action.payload;
      break;
    case HIDE_ADD_EDIT_ORDER_POPUP:
      newState = action.payload;
      break;
    default:
      return state;
  }

  return newState;
};

export default ProfileEditReducer;
