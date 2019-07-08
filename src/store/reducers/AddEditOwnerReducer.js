import { SHOW_ADD_EDIT_OWNER_POPUP, HIDE_ADD_EDIT_OWNER_POPUP } from '../constants/addEditOwnerPopup';

const initialState = {
  isOpen: false,
};

const AddEditOwnerReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case SHOW_ADD_EDIT_OWNER_POPUP:
      newState = action.payload;
      break;
    case HIDE_ADD_EDIT_OWNER_POPUP:
      newState = action.payload;
      break;
    default:
      return state;
  }

  return newState;
};

export default AddEditOwnerReducer;
