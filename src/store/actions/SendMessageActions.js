import { message } from 'antd';
import { SHOW_SEND_MESSAGE_POPUP, HIDE_SEND_MESSAGE_POPUP } from '../constants/sendMessagePopup';

import Request from '../../core/request';

export const generateShowPopupObject = (username, ownerName) => ({
  type: SHOW_SEND_MESSAGE_POPUP,
  payload: { username, ownerName, isOpen: true },
});

export const generateHidePopupObject = () => ({
  type: HIDE_SEND_MESSAGE_POPUP,
  payload: { isOpen: false },
});

export function showSendMessagePopup(username, ownerName) {
  return dispatch => {
    dispatch(generateShowPopupObject(username, ownerName));
  };
}

export function hideSendMessagePopup() {
  return dispatch => {
    dispatch(generateHidePopupObject());
  };
}

export function sendMessage(messageData, dispatch) {
  Request.doSendMessage(messageData)
    .then(() => {
      message.success('Сообщение успешно отправлено');
      dispatch(generateHidePopupObject());
    })
    .catch(() => {
      message.error('Ошибка отправки сообщения');
      dispatch(generateHidePopupObject());
    });
}
