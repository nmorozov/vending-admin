import { fromJS } from 'immutable';

import {
  FETCH_ORDERS_START,
  FETCH_ORDERS_FINISH,
  FETCH_ORDERS_FAILED,
  LOAD_ORDERS_LIMIT,
  UPDATE_ORDER_START,
  UPDATE_ORDER_FINISH,
  UPDATE_ORDER_FAILED,
  DELETE_ORDER_SUCCESS,
} from '../constants/orders';

const initialState = fromJS({
  orders: [],
  offset: 0,
  isLoading: false,
  isLoadingFinished: false,
});

export default function ordersReducer(state = initialState, action) {
  let newState = {};

  switch (action.type) {
    case FETCH_ORDERS_START:
      if (action.from === 0) {
        newState = state
          .set('orders', [])
          .set('loadFrom', 0)
          .set('isLoading', true)
          .set('isLoadingFinished', false);
      } else {
        newState = state.set('isLoading', true);
      }
      break;
    case FETCH_ORDERS_FINISH:
      if (action.payload.length > 0) {
        newState = state
          .set('isLoading', false)
          .update('orders', value => value.concat(action.payload))
          .update('loadFrom', value => value + action.payload.length)
          .set('isLoadingFinished', action.payload.length !== LOAD_ORDERS_LIMIT);
      } else {
        newState = state.set('isLoading', false).set('isLoadingFinished', true);
      }
      break;
    case FETCH_ORDERS_FAILED:
      newState = state.set('orders', []).set('isLoading', false);
      break;
    case UPDATE_ORDER_START:
      newState = state.set('isLoading', true);
      break;
    case UPDATE_ORDER_FAILED:
      newState = state.set('isLoading', false);
      break;
    case UPDATE_ORDER_FINISH:
      newState = state.set('isLoading', false).update('orders', value => {
        const newOrders = value;
        const orderIndex = value.findIndex(i => i.id === action.payload.id);
        newOrders[orderIndex] = action.payload;
        return newOrders;
      });
      break;
    case DELETE_ORDER_SUCCESS:
      newState = state.update('orders', value => {
        const newOrders = value.filter(order => order.id !== action.payload.orderId);
        return newOrders;
      });
      break;
    default:
      return state;
  }

  return newState || state;
}
