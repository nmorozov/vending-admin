import { message } from 'antd';
import Request from '../../core/request';

import {
  FETCH_ORDERS_START,
  FETCH_ORDERS_FINISH,
  FETCH_ORDERS_FAILED,
  UPDATE_ORDER_START,
  UPDATE_ORDER_FINISH,
  UPDATE_ORDER_FAILED,
  DELETE_ORDER_SUCCESS,
} from '../constants/orders';

import { generateHidePopupObject } from './AddEditOrderActions';

const fetchOrdersStart = from => ({ type: FETCH_ORDERS_START, from });
const fetchOrdersFinish = payload => ({ type: FETCH_ORDERS_FINISH, payload });
const fetchOrdersFailed = () => ({ type: FETCH_ORDERS_FAILED });

export const updateOrderStart = () => ({ type: UPDATE_ORDER_START });
export const updateOrderFinish = order => ({
  type: UPDATE_ORDER_FINISH,
  payload: order,
});
export const updateOrderFailed = () => ({ type: UPDATE_ORDER_FAILED });

export const deleteOrderSuccess = orderId => ({ type: DELETE_ORDER_SUCCESS, payload: { orderId } });

export function fetchOrders(from, params = {}) {
  return dispatch => {
    dispatch(fetchOrdersStart(from));

    const pagination = {
      ...params,
      ...{ offset: from },
    };
    Request.doGetInterlanContent('doGetOrders', pagination)
      .then(response => {
        dispatch(fetchOrdersFinish(response.orders));
      })
      .catch(() => {
        message.error('Ошибка связи с сервером. Попробуйте позже');
        dispatch(fetchOrdersFailed());
      });
  };
}

export function deleteOrder(id) {
  return dispatch => {
    Request.doGetInterlanContent('doDeleteOrder', id)
      .then(() => {
        dispatch(generateHidePopupObject());
        dispatch(deleteOrderSuccess(id));
        message.success('Заказ успешно удалён');
      })
      .catch(() => {
        message.error('Ошибка связи с сервером. Попробуйте позже');
        dispatch(fetchOrdersFailed());
      });
  };
}
