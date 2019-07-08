import { message } from 'antd';
import Request from '../../core/request';

import {
  FETCH_COINS_STAT_START,
  FETCH_COINS_STAT_FINISH,
  FETCH_COINS_STAT_FAILED,
  FETCH_ENVELOPES_STAT_START,
  FETCH_ENVELOPES_STAT_FINISH,
  FETCH_ENVELOPES_STAT_FAILED,
} from '../constants/statistics';

const fetchCoinsStart = () => ({ type: FETCH_COINS_STAT_START });
const fetchCoinsFinish = payload => ({ type: FETCH_COINS_STAT_FINISH, payload });
const fetchCoinsFailed = () => ({ type: FETCH_COINS_STAT_FAILED });
const fetchEnvelopesStart = () => ({ type: FETCH_ENVELOPES_STAT_START });
const fetchEnvelopesFinish = payload => ({ type: FETCH_ENVELOPES_STAT_FINISH, payload });
const fetchEnvelopesFailed = () => ({ type: FETCH_ENVELOPES_STAT_FAILED });

export function fetchStatCoins(from, params = {}) {
  return dispatch => {
    dispatch(fetchCoinsStart());

    const pagination = {
      ...params,
      ...{ offset: from },
    };
    Request.doGetInterlanContent('doGetStatCoins', pagination)
      .then(response => {
        console.log(response);
        dispatch(fetchCoinsFinish(response));
      })
      .catch((e) => {
        message.error('Ошибка связи с сервером. Попробуйте позже');
        console.error(e);
        dispatch(fetchCoinsFailed());
      });
  };
}

export function fetchStatEnvelopes(from, params = {}) {
  return dispatch => {
    dispatch(fetchEnvelopesStart());

    const pagination = {
      ...params,
      ...{ offset: from },
    };
    Request.doGetInterlanContent('doGetStatEnvelopes', pagination)
      .then(response => {
        dispatch(fetchEnvelopesFinish(response));
      })
      .catch((e) => {
        message.error('Ошибка связи с сервером. Попробуйте позже');
        console.error(e);
        dispatch(fetchEnvelopesFailed());
      });
  };
}
