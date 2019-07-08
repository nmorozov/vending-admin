import { message } from 'antd';
import {
  SHOW_PROFILE_EDIT_POPUP,
  HIDE_PROFILE_EDIT_POPUP,
  UPDATE_USER_START,
  UPDATE_USER_FINISH,
  UPDATE_USER_FAILED,
} from '../constants/profileEditPopup';
import { doGetUser } from './AuthActions';

import Request from '../../core/request';

export const updateUserStart = () => ({ type: UPDATE_USER_START });
export const updateUserFinish = device => ({
  type: UPDATE_USER_FINISH,
  payload: device,
});
export const updateUserFailed = () => ({ type: UPDATE_USER_FAILED });

const generateShowPopupObject = deviceData => ({
  type: SHOW_PROFILE_EDIT_POPUP,
  payload: { ...deviceData, isOpen: true },
});

const generateHidePopupObject = () => ({
  type: HIDE_PROFILE_EDIT_POPUP,
  payload: { isOpen: false },
});

export function showProfileEditPopup(profileData) {
  return dispatch => {
    dispatch(generateShowPopupObject(profileData));
  };
}

export function hideProfileEditPopup() {
  return dispatch => {
    dispatch(generateHidePopupObject());
  };
}

export function updateUser(userData, dispatch) {
  const formattedUserData = {
    id: userData.id,
    ownerEmail: userData.ownerEmail,
    ownerFullName: userData.ownerFullName,
    ownerPhone: userData.ownerPhone,
  };

  dispatch(updateUserStart());

  return dispatch => {
    Request.doGetInterlanContent('doUpdateUser', formattedUserData)
      .then(device => {
        dispatch(generateHidePopupObject());
        message.success('Пользователь успешно обновлен');
        dispatch(doGetUser());
        return dispatch(updateUserFinish(device));
      })
      .catch(() => {
        message.error('Не удалось обновить пользователя');
        dispatch(updateUserFailed());
      });
  };
}
