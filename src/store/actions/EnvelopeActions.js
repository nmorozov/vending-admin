import { message } from 'antd';
import Request from '../../core/request';

import {
  FETCH_ENVELOPES_START,
  FETCH_ENVELOPES_FINISH,
  FETCH_ENVELOPES_FAILED,
  UPDATE_ENVELOPE_START,
  UPDATE_ENVELOPE_FINISH,
  UPDATE_ENVELOPE_FAILED,
} from '../constants/envelopes';

const fetchEnvelopesStart = from => ({ type: FETCH_ENVELOPES_START, from });
const fetchEnvelopesFinish = payload => ({ type: FETCH_ENVELOPES_FINISH, payload });
const fetchEnvelopesFailed = () => ({ type: FETCH_ENVELOPES_FAILED });

export const updateEnvelopeStart = () => ({ type: UPDATE_ENVELOPE_START });
export const updateEnvelopeFinish = envelope => ({
  type: UPDATE_ENVELOPE_FINISH,
  payload: envelope,
});
export const updateEnvelopeFailed = () => ({ type: UPDATE_ENVELOPE_FAILED });

export function fetchEnvelopes(from, params = {}) {
  console.log(params);
  return dispatch => {
    dispatch(fetchEnvelopesStart(from));
    const pagination = {
      ...params,
      ...{ offset: from },
    };
    Request.doGetInterlanContent('doGetEnvelopes', pagination)
      .then(response => {
        dispatch(fetchEnvelopesFinish(response.envelopes));
      })
      .catch(() => {
        message.error('Ошибка связи с сервером. Попробуйте позже');
        dispatch(fetchEnvelopesFailed());
      });
  };
}

export function deleteEnvelope(id) {
  return dispatch => {
    Request.doGetInterlanContent('doDeleteEnvelope', id)
      .then(() => {
        const sorting = JSON.parse(localStorage.getItem('envelopesSort'));
        dispatch(fetchEnvelopes(0, sorting));
      })
      .catch(() => {
        message.error('Ошибка связи с сервером. Попробуйте позже');
        dispatch(fetchEnvelopesFailed());
      });
  };
}
