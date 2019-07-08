import { message } from 'antd';
import { formatDate } from 'react-day-picker/moment';
import { SHOW_ADD_EDIT_ORDER_POPUP, HIDE_ADD_EDIT_ORDER_POPUP } from '../constants/addEditOrderPopup';
import Request from '../../core/request';
import { fetchOrders, updateOrderStart, updateOrderFinish, updateOrderFailed } from './OrderActions';

const generateShowPopupObject = orderData => ({
  type: SHOW_ADD_EDIT_ORDER_POPUP,
  payload: { ...orderData, isOpen: true },
});

export const generateHidePopupObject = () => ({
  type: HIDE_ADD_EDIT_ORDER_POPUP,
  payload: { isOpen: false },
});

export function showAddEditOrderPopup(orderId) {
  if (typeof orderId === 'number') {
    return dispatch => {
      Request.doGetInterlanContent('doGetOrder', orderId).then(response => {
        dispatch(generateShowPopupObject(response));
      });
    };
  }
  return dispatch => {
    dispatch(generateShowPopupObject({}));
  };
}

export function hideAddEditOrderPopup() {
  return dispatch => {
    dispatch(generateHidePopupObject());
  };
}

export function createOrder(orderData, dispatch) {
  const formattedOrderData = {
    company: orderData.company,
    note: orderData.note,
    order1cNumber: orderData.order1cNumber,
    coinsCount: orderData.coinsCount,
    envelopesCount: orderData.envelopesCount,
    date: formatDate(orderData.date, 'YYYY-MM-DD hh:mm:ss'),
    country: orderData.country,
    city: orderData.city,
    total: orderData.total,
  };

  Request.doGetInterlanContent('doCreateOrder', formattedOrderData)
    .then(() => {
      dispatch(generateHidePopupObject());
      dispatch(fetchOrders(0, JSON.parse(localStorage.getItem('ordersSort'))));
      message.success('Заказ успешно создан');
    })
    .catch(() => {
      message.error('Не удалось создать заказ');
    });
}

export function updateOrder(orderData, dispatch) {
  const formattedOrderData = {
    id: orderData.id,
    company: orderData.company,
    note: orderData.note,
    order1cNumber: orderData.order1cNumber,
    coinsCount: orderData.coinsCount,
    envelopesCount: orderData.envelopesCount,
    date: formatDate(orderData.date, 'YYYY-MM-DD hh:mm:ss'),
    country: orderData.country,
    city: orderData.city,
    total: orderData.total,
  };

  dispatch(updateOrderStart());
  Request.doGetInterlanContent('doUpdateOrder', formattedOrderData)
    .then(order => {
      dispatch(generateHidePopupObject());
      message.success('Заказ успешно обновлен');
      return dispatch(updateOrderFinish(order));
    })
    .catch(() => {
      message.error('Не удалось обновить заказ');
      dispatch(updateOrderFailed());
    });
}
