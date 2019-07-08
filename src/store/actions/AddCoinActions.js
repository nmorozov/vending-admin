import { message } from 'antd';
import { SHOW_ADD_COIN_POPUP, HIDE_ADD_COIN_POPUP } from '../constants/addCoinPopup';
import Request from '../../core/request';
import { fetchCoins, updateCoinStart, updateCoinFinish, updateCoinFailed } from './CoinActions';

const generateShowPopupObject = coinData => ({
  type: SHOW_ADD_COIN_POPUP,
  payload: { ...coinData, isOpen: true },
});

const generateHidePopupObject = () => ({
  type: HIDE_ADD_COIN_POPUP,
  payload: { isOpen: false },
});

export function showAddCoinPopup(coinId) {
  if (typeof coinId === 'number') {
    return dispatch => {
      Request.doGetInterlanContent('doGetCoin', coinId).then(response => {
        dispatch(generateShowPopupObject(response));
      });
    };
  }
  return dispatch => {
    dispatch(generateShowPopupObject({}));
  };
}

export function hideAddCoinPopup() {
  return dispatch => {
    dispatch(generateHidePopupObject());
  };
}

export function createCoin(coinData, dispatch) {
  const formattedCoinData = {
    name: coinData.name,
    country: coinData.country,
    city: coinData.city,
    category: coinData.category,
    categoryCode: coinData.categoryCode,
    frontPicture: coinData.frontPicture,
    backPicture: coinData.backPicture,
  };

  Request.doGetInterlanContent('doCreateCoin', formattedCoinData)
    .then(() => {
      dispatch(generateHidePopupObject());
      dispatch(fetchCoins(0));
      message.success('Монета успешно создана');
    })
    .catch(() => {
      message.error('Не удалось создать монету');
    });
}

export function updateCoin(coinData, dispatch) {
  const formattedCoinData = {
    id: coinData.id,
    name: coinData.name,
    country: coinData.country,
    city: coinData.city,
    category: coinData.category,
    categoryCode: coinData.categoryCode,
    frontPicture: coinData.frontPicture,
    backPicture: coinData.backPicture,
  };

  dispatch(updateCoinStart());

  return dispatch => {
    Request.doGetInterlanContent('doUpdateCoin', formattedCoinData)
      .then(coin => {
        dispatch(generateHidePopupObject());
        message.success('Монета успешно обновлена');
        return dispatch(updateCoinFinish(coin));
      })
      .catch(() => {
        message.error('Не удалось обновить монету');
        dispatch(updateCoinFailed());
      });
  };
}
