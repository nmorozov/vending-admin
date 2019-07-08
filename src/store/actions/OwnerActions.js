import { message } from 'antd';
import Request from '../../core/request';

import {
  FETCH_OWNERS_START,
  FETCH_OWNERS_FINISH,
  FETCH_OWNERS_FAILED,
  UPDATE_OWNER_START,
  UPDATE_OWNER_FINISH,
  UPDATE_OWNER_FAILED,
} from '../constants/owners';

import Config from '../../core/config';

const fetchOwnersStart = from => ({ type: FETCH_OWNERS_START, from });
const fetchOwnersFinish = payload => ({ type: FETCH_OWNERS_FINISH, payload });
const fetchOwnersFailed = () => ({ type: FETCH_OWNERS_FAILED });

export const updateOwnerStart = () => ({ type: UPDATE_OWNER_START });
export const updateOwnerFinish = owner => ({
  type: UPDATE_OWNER_FINISH,
  payload: owner,
});
export const updateOwnerFailed = () => ({ type: UPDATE_OWNER_FAILED });

export function fetchOwners(from, params = {}) {
  return dispatch => {
    dispatch(fetchOwnersStart(from));

    const pagination = {
      ...params,
      ...{ offset: from },
    };
    Request.doGetInterlanContent('doGetOwners', pagination)
      .then(response => {
        dispatch(fetchOwnersFinish(response.owners));
      })
      .catch(() => {
        message.error('Ошибка связи с сервером. Попробуйте позже');
        dispatch(fetchOwnersFailed());
      });
  };
}

export function deleteOwner(id) {
  return dispatch => {
    Request.doGetInterlanContent('doDeleteOwner', id)
      .then(() => {
        const sorting = JSON.parse(localStorage.getItem('ownersSort'));

        if (Config.get('search_string')) {
          sorting.searchString = Config.get('search_string');
        }
        dispatch(fetchOwners(0, sorting));
      })
      .catch(() => {
        message.error('Ошибка связи с сервером. Попробуйте позже');
        dispatch(fetchOwnersFailed());
      });
  };
}
