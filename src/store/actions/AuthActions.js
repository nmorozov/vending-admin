import { push } from 'connected-react-router';
import { message } from 'antd';
import Config, { PARAM_USER_ID } from '../../core/config';
import Request from '../../core/request';

import { DO_LOGOUT, SHOW_LOADING, HIDE_LOADING, LOGIN_START, LOGIN_FINISH, LOGIN_FAILED } from '../constants/auth';

const loginStart = () => ({
  type: LOGIN_START,
});

const loginFinish = payload => ({
  type: LOGIN_FINISH,
  payload,
});

const logOut = () => ({
  type: DO_LOGOUT,
});

const loginFailed = () => ({
  type: LOGIN_FAILED,
});

export function doLogin(username, password, dispatch) {
  dispatch(loginStart());
  Request.doAuthorization({ username, password })
    .then(response => {
      Config.setAuthorizationData(response);
      dispatch(doGetUser());
      dispatch(push('/'));
    })
    .catch(e => {
      message.error(e.message);
      dispatch(loginFailed());
    });
}

export function doGetUser() {
  return dispatch => {
    Request.doGetInterlanContent('doGetUser', Config.get(PARAM_USER_ID)).then(response =>
      dispatch(loginFinish(response)),
    );
  };
}

export const showLoading = () => ({ type: SHOW_LOADING });

export const hideLoading = () => ({ type: HIDE_LOADING });

export function doLogOut() {
  Config.clearAuthorizationData();
  return dispatch => {
    dispatch(logOut());
  };
}

export function doRecoverPassword(loginOrPhone) {
  Request.doRecoverPassword(loginOrPhone)
    .then(response => message.success(response.message))
    .catch(error => message.error(error.message));
}
