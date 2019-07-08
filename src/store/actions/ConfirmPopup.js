import { SHOW_CONFIRM_POPUP, HIDE_CONFIRM_POPUP } from '../constants/confirmPopup';

const generateShowPopupObject = deleteMethod => ({
  type: SHOW_CONFIRM_POPUP,
  payload: { deleteMethod, isOpen: true },
});

const generateHidePopupObject = () => ({
  type: HIDE_CONFIRM_POPUP,
  payload: { isOpen: false },
});

export function showConfirmPopup(entity) {
  return dispatch => {
    dispatch(generateShowPopupObject({ entity }));
  };
}

export function hideConfirmPopup() {
  return dispatch => {
    dispatch(generateHidePopupObject());
  };
}
