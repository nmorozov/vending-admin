import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { Route, Switch, Redirect } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { store, history } from './store';

import registerServiceWorker from './registerServiceWorker';

import {
  HOME,
  LOGIN,
  OWNERS,
  DEVICES,
  STATISTICS,
  COINS,
  ENVELOPES,
  ORDERS,
  PASSWORD_RESET,
} from './store/constants/routeConstants';

import App from './containers/App';
import Owners from './containers/Owners';
import Devices from './containers/Devices';
import Statistics from './containers/Statistics';
import Coins from './containers/Coins';
import Envelopes from './containers/Envelopes';
import Orders from './containers/Orders';
import Login from './containers/Login';
import PasswordReset from './containers/PasswordReset';

import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path={HOME} render={() => <Redirect to={DEVICES} />} />
          <Route path={OWNERS} component={Owners} />
          <Route path={DEVICES} component={Devices} />
          <Route path={STATISTICS} component={Statistics} />
          <Route path={COINS} component={Coins} />
          <Route path={ENVELOPES} component={Envelopes} />
          <Route path={ORDERS} component={Orders} />
          <Route path={LOGIN} component={Login} />
          <Route path={PASSWORD_RESET} component={PasswordReset} />
        </Switch>
      </App>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
