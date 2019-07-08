import { message } from 'antd';
import Request from '../../core/request';

import {
  FETCH_COINS_START,
  FETCH_COINS_FINISH,
  FETCH_COINS_FAILED,
  UPDATE_COIN_START,
  UPDATE_COIN_FINISH,
  UPDATE_COIN_FAILED,
} from '../constants/coins';

const fetchCoinsStart = from => ({ type: FETCH_COINS_START, from });
const fetchCoinsFinish = payload => ({ type: FETCH_COINS_FINISH, payload });
const fetchCoinsFailed = () => ({ type: FETCH_COINS_FAILED });

export const updateCoinStart = () => ({ type: UPDATE_COIN_START });
export const updateCoinFinish = device => ({
  type: UPDATE_COIN_FINISH,
  payload: device,
});
export const updateCoinFailed = () => ({ type: UPDATE_COIN_FAILED });

export function fetchCoins(from, params = {}) {
  return dispatch => {
    dispatch(fetchCoinsStart(from));

    const pagination = {
      ...params,
      ...{ offset: from },
    };
    Request.doGetInterlanContent('doGetCoins', pagination)
      .then(response => {
        dispatch(fetchCoinsFinish(response.coins));
      })
      .catch(e => {
        console.log(e);
        message.error('Ошибка связи с сервером. Попробуйте позже');
        dispatch(fetchCoinsFailed());
      });
  };
}

export function deleteCoin(id) {
  return dispatch => {
    Request.doGetInterlanContent('doDeleteCoin', id)
      .then(() => {
        dispatch(fetchCoins(0));
      })
      .catch(() => {
        message.error('Ошибка связи с сервером. Попробуйте позже');
        dispatch(fetchCoinsFailed());
      });
  };
}
