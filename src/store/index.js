import { createBrowserHistory } from 'history';

import { applyMiddleware, compose, createStore, combineReducers } from 'redux';

import { connectRouter, routerMiddleware } from 'connected-react-router';

import { reducer as formReducer } from 'redux-form';

import thunk from 'redux-thunk';

import SendMessageReducer from './reducers/SendMessageReducer';
import AddEditDeviceReducer from './reducers/AddEditDeviceReducer';
import ProfileEditReducer from './reducers/ProfileEditReducer';
import AddEditOwnerReducer from './reducers/AddEditOwnerReducer';
import DevicesReducer from './reducers/DevicesReducer';
import CoinsReducer from './reducers/CoinsReducer';
import AddCoinReducer from './reducers/AddCoinReducer';
import OwnersReducer from './reducers/OwnersReducer';
import EnvelopesReducer from './reducers/EnvelopesReducer';
import OrdersReducer from './reducers/OrdersReducer';
import AddEditEnvelopeReducer from './reducers/AddEditEnvelopeReducer';
import AddEditOrderReducer from './reducers/AddEditOrderReducer';
import AuthReducer from './reducers/AuthReducer';
import ExportStatisticsReducer from './reducers/ExportStatisticsReducer';
import OwnerRegistrationReducer from './reducers/OwnerRegistrationReducer';
import StatisticsReducer from './reducers/StatisticsReducer';
import PasswordResetReducer from './reducers/PasswordResetReducer';
import ConfirmPopupReducer from './reducers/ConfirmReducer';
import MonitoringReducer from './reducers/MonitoringReducer';

const history = createBrowserHistory();

const store = createStore(
  connectRouter(history)(
    combineReducers({
      SendMessageReducer,
      AddEditDeviceReducer,
      ProfileEditReducer,
      AddEditOwnerReducer,
      DevicesReducer,
      CoinsReducer,
      AddCoinReducer,
      OwnersReducer,
      EnvelopesReducer,
      OrdersReducer,
      AddEditEnvelopeReducer,
      AddEditOrderReducer,
      AuthReducer,
      StatisticsReducer,
      ExportStatisticsReducer,
      OwnerRegistrationReducer,
      PasswordResetReducer,
      ConfirmPopupReducer,
      MonitoringReducer,
      form: formReducer,
    }),
  ),
  compose(applyMiddleware(routerMiddleware(history), thunk)),
);

export { store, history };
