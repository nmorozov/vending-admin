import { SHOW_PROFILE_EDIT_POPUP, HIDE_PROFILE_EDIT_POPUP } from '../constants/profileEditPopup';

const initialState = {
  isOpen: false,
  ownerId: 0,
};

const ProfileEditReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case SHOW_PROFILE_EDIT_POPUP:
      newState = action.payload;
      break;
    case HIDE_PROFILE_EDIT_POPUP:
      newState = action.payload;
      break;
    default:
      return state;
  }

  return newState;
};

export default ProfileEditReducer;
