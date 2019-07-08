import { message } from 'antd';
import { SHOW_ADD_EDIT_ENVELOPE_POPUP, HIDE_ADD_EDIT_ENVELOPE_POPUP } from '../constants/addEditEnvelopePopup';
import Request from '../../core/request';
import { fetchEnvelopes, updateEnvelopeStart, updateEnvelopeFinish, updateEnvelopeFailed } from './EnvelopeActions';

const generateShowPopupObject = envelopeData => ({
  type: SHOW_ADD_EDIT_ENVELOPE_POPUP,
  payload: { ...envelopeData, isOpen: true },
});

const generateHidePopupObject = () => ({
  type: HIDE_ADD_EDIT_ENVELOPE_POPUP,
  payload: { isOpen: false },
});

export function showAddEditEnvelopePopup(envelopeId) {
  if (typeof envelopeId === 'number') {
    return dispatch => {
      Request.doGetInterlanContent('doGetEnvelope', envelopeId).then(response => {
        dispatch(generateShowPopupObject(response));
      });
    };
  }
  return dispatch => {
    dispatch(generateShowPopupObject({}));
  };
}

export function hideAddEditEnvelopePopup() {
  return dispatch => {
    dispatch(generateHidePopupObject());
  };
}

export function createEnvelope(envelopeData, dispatch) {
  const formattedEnvelopeData = {
    name: envelopeData.name,
    note: envelopeData.note || '',
    picture: envelopeData.picture,
  };

  Request.doGetInterlanContent('doCreateEnvelope', formattedEnvelopeData)
    .then(() => {
      dispatch(generateHidePopupObject());
      dispatch(fetchEnvelopes(0));
      message.success('Конверт успешно создан');
    })
    .catch(e => {
      console.error(e);
      message.error('Не удалось создать конверт');
    });
}

export function updateEnvelope(envelopeData, dispatch) {
  const formattedEnvelopeData = {
    id: envelopeData.id,
    name: envelopeData.name,
    note: envelopeData.note || '',
    picture: envelopeData.picture,
  };

  dispatch(updateEnvelopeStart());

  return dispatch => {
    Request.doGetInterlanContent('doUpdateEnvelope', formattedEnvelopeData)
      .then(envelope => {
        dispatch(generateHidePopupObject());
        message.success('Конверт успешно обновлен');
        return dispatch(updateEnvelopeFinish(envelope));
      })
      .catch(() => {
        message.error('Не удалось обновить конверт');
        dispatch(updateEnvelopeFailed());
      });
  };
}
