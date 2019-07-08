import { message } from 'antd';
import sha512 from 'js-sha512';
import { SHOW_ADD_EDIT_OWNER_POPUP, HIDE_ADD_EDIT_OWNER_POPUP } from '../constants/addEditOwnerPopup';
import { SHOW_OWNER_REGISTRATION_POPUP, HIDE_OWNER_REGISTRATION_POPUP } from '../constants/ownerRegistrationPopup';
import Request from '../../core/request';
import { fetchOwners, updateOwnerStart, updateOwnerFinish, updateOwnerFailed } from './OwnerActions';

const generateShowPopupObject = (type, ownerData) => ({
  type,
  payload: { ...ownerData, isOpen: true },
});

const generateHidePopupObject = type => ({
  type,
  payload: { isOpen: false },
});

export function showAddEditOwnerPopup(ownerId) {
  if (typeof ownerId === 'number') {
    return dispatch => {
      Request.doGetInterlanContent('doGetOwner', ownerId).then(response => {
        dispatch(generateShowPopupObject(SHOW_ADD_EDIT_OWNER_POPUP, response));
      });
    };
  }
  return dispatch => {
    dispatch(generateShowPopupObject(SHOW_ADD_EDIT_OWNER_POPUP, {}));
  };
}

export function showOwnerRegistrationPopup() {
  return dispatch => {
    dispatch(generateShowPopupObject(SHOW_OWNER_REGISTRATION_POPUP, {}));
  };
}

export function hideOwnerRegistrationPopup() {
  return dispatch => {
    dispatch(generateHidePopupObject(HIDE_OWNER_REGISTRATION_POPUP));
  };
}

export function hideAddEditOwnerPopup() {
  return dispatch => {
    dispatch(generateHidePopupObject(HIDE_ADD_EDIT_OWNER_POPUP));
  };
}

function generatePassword() {
  const length = 8;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let retVal = '';
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

export function createOwner(ownerData) {
  const password = generatePassword();
  const formattedOwnerData = {
    caretakerEmail: ownerData.caretakerEmail,
    caretakerFullName: ownerData.caretakerFullName,
    caretakerPhone: ownerData.caretakerPhone,
    city: ownerData.city,
    country: ownerData.country,
    fullCompanyName: ownerData.fullCompanyName,
    ownerEmail: ownerData.ownerEmail,
    ownerFullName: ownerData.ownerFullName,
    ownerPhone: ownerData.ownerPhone,
    shortCompanyName: ownerData.shortCompanyName,
    status: !!ownerData.status,
    password: sha512(password).toUpperCase(),
    username: ownerData.ownerEmail,
  };

  return dispatch => {
    Request.doGetInterlanContent('doCreateOwner', formattedOwnerData)
      .then(() => {
        dispatch(generateHidePopupObject(HIDE_ADD_EDIT_OWNER_POPUP));
        dispatch(fetchOwners(0));
        message.success('Владелец успешно создан');
        const registrationMessage = `Ваш логин: ${ownerData.ownerEmail} Ваш пароль: ${password}`;
        Request.doSendRegistrationData(registrationMessage, ownerData.ownerEmail);
      })
      .catch(() => {
        message.error('Не удалось создать владельца');
      });
  };
}

export function registerOwner(ownerData) {
  const formattedOwnerData = {
    username: ownerData.username,
    caretakerEmail: ownerData.caretakerEmail,
    caretakerFullName: ownerData.caretakerFullName,
    caretakerPhone: ownerData.caretakerPhone,
    city: ownerData.city,
    country: ownerData.country,
    fullCompanyName: ownerData.fullCompanyName,
    ownerEmail: ownerData.ownerEmail,
    ownerFullName: ownerData.ownerFullName,
    ownerPhone: ownerData.ownerPhone,
    shortCompanyName: ownerData.shortCompanyName,
    status: false,
    password: sha512(ownerData.password).toUpperCase(),
  };

  return dispatch => {
    Request.doCreateOwner(formattedOwnerData)
      .then(() => {
        dispatch(generateHidePopupObject(HIDE_OWNER_REGISTRATION_POPUP));
        message.success('Вы успешно зарегистрировались');
        const registrationMessage = `Ваш логин: ${ownerData.username} Ваш пароль: ${ownerData.password}`;
        Request.doSendRegistrationData(registrationMessage, ownerData.username);
      })
      .catch(() => {
        message.error('Ошибка регистрации.');
      });
  };
}

export function updateOwner(ownerData, dispatch) {
  const formattedOwnerData = {
    caretakerEmail: ownerData.caretakerEmail,
    caretakerFullName: ownerData.caretakerFullName,
    caretakerPhone: ownerData.caretakerPhone,
    city: ownerData.city,
    country: ownerData.country,
    fullCompanyName: ownerData.fullCompanyName,
    id: ownerData.id,
    ownerEmail: ownerData.ownerEmail,
    ownerFullName: ownerData.ownerFullName,
    ownerPhone: ownerData.ownerPhone,
    shortCompanyName: ownerData.shortCompanyName,
    status: ownerData.status,
  };

  dispatch(updateOwnerStart());

  return dispatch => {
    Request.doGetInterlanContent('doUpdateOwner', formattedOwnerData)
      .then(owner => {
        dispatch(generateHidePopupObject(HIDE_ADD_EDIT_OWNER_POPUP));
        message.success('Владелец успешно обновлен');
        return dispatch(updateOwnerFinish(owner));
      })
      .catch(() => {
        message.error('Не удалось обновить владельца');
        dispatch(updateOwnerFailed());
      });
  };
}

export function doChangePassword(passwordData, dispatch) {
  dispatch(updateOwnerStart());
  return dispatch => {
    Request.doGetInterlanContent('doChangePassword', passwordData)
      .then(owner => {
        dispatch(generateHidePopupObject(HIDE_ADD_EDIT_OWNER_POPUP));
        message.success('Пароль был обновлён');
        return dispatch(updateOwnerFinish(owner));
      })
      .catch(e => {
        message.error(e.message);
        dispatch(updateOwnerFailed());
      });
  };
}
