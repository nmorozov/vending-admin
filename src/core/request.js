import base64 from 'base-64';
import _ from 'lodash';

// Core
// Core
import Config, {
  PARAM_ACCESS_TOKEN,
  PARAM_LOGIN_OR_REFRESH_TOKEN,
  PARAM_ACCESS_TOKEN_EXPIRATION_TIME,
  PARAM_REFRESH_TOKEN,
} from './config';

import Network, { METHOD_POST, METHOD_PUT, METHOD_DELETE, METHOD_GET } from './network';
import { getRandomArbitrary } from './utils';

// Routes
const ROUTE_AUTH = '/auth';
const ROUTE_USER_LOGIN = '/auth/login';
const ROUTE_USER = '/user';
const ROUTE_REFRESH_AUTH_TOKEN = '/auth/refresh';
const ROUTE_DEVICE = '/device';
const ROUTE_DEVICE_COUNT = '/device/count';
const ROUTE_DEVICE_SET_STATUS = '/device/set_status';
const ROUTE_COIN = '/coin';
const ROUTE_OWNER = '/owner';
const ROUTE_ENVELOPE = '/envelope';
const ROUTE_ORDER = '/order';
const ROUTE_STATISTICS = '/statistics';
const ROUTE_MONITORING = '/monitoring';
export const ROUTE_MESSAGE = '/message';
export const ROUTE_GEO = '/geo';

// export const SERVER_URL = 'http://vending.rugt.pro:8888';
export const SERVER_URL = 'http://127.0.0.01:8888';

/**
 * Requests to
 */
class Request {
  static doAuthorization(userCredentials) {
    return this.doRequest(METHOD_POST, ROUTE_USER_LOGIN, true, userCredentials);
  }

  static async doGetInterlanContent(functionForGetContent, filter) {
    const expire = await Config.get(PARAM_ACCESS_TOKEN_EXPIRATION_TIME);
    const moscowTimeNow = Date.now() + 1000 * 60 * 60 * 1;
    if (moscowTimeNow > Date.parse(expire)) {
      try {
        const response = await this.doRefreshToken();
        Config.setAuthorizationData(response);
        return this[functionForGetContent](filter);
      } catch (e) {
        localStorage.clear();
        window.location.reload();
        return {};
      }
    }

    return this[functionForGetContent](filter);
  }

  static async doRefreshToken() {
    const token = await Config.get(PARAM_REFRESH_TOKEN);
    return this.doRequest(METHOD_POST, ROUTE_REFRESH_AUTH_TOKEN, true, {
      refresh_token: token,
    });
  }

  static doGetUser(id) {
    return this.doRequest(METHOD_GET, `${ROUTE_USER}/${id}`, false);
  }

  static doUpdateUser(params) {
    return this.doRequest(METHOD_POST, `${ROUTE_USER}/${params.id}`, false, { ...params });
  }

  static doGetDevices(filters) {
    return this.doRequest(METHOD_GET, `${ROUTE_DEVICE}`, false, filters);
  }

  static doGetDevicesCount() {
    return this.doRequest(METHOD_GET, ROUTE_DEVICE_COUNT, false);
  }

  static doGetDevice(id) {
    return this.doRequest(METHOD_GET, `${ROUTE_DEVICE}/${id}`, false);
  }

  static doSetDeviceStatus(params) {
    return this.doRequest(METHOD_POST, ROUTE_DEVICE_SET_STATUS, false, { ...params });
  }

  static doUpdateDevice(params) {
    return this.doRequest(METHOD_POST, `${ROUTE_DEVICE}/${params.id}`, false, { ...params });
  }

  static doDeleteDevice(id) {
    return this.doRequest(METHOD_DELETE, `${ROUTE_DEVICE}/${id}`, false);
  }

  static doGetCoins(filters) {
    return this.doRequest(METHOD_GET, `${ROUTE_COIN}`, false, filters);
  }

  static doGetCoinsCount(filters) {
    return this.doRequest(METHOD_GET, `${ROUTE_COIN}/count`, false, filters);
  }

  static doGetCoin(id) {
    return this.doRequest(METHOD_GET, `${ROUTE_COIN}/${id}`, false);
  }

  static doUpdateCoin(params) {
    return this.doRequest(METHOD_POST, `${ROUTE_COIN}/${params.id}`, false, { ...params }, true);
  }

  static doDeleteCoin(id) {
    return this.doRequest(METHOD_DELETE, `${ROUTE_COIN}/${id}`, false);
  }

  static doGetOwners(filters) {
    return this.doRequest(METHOD_GET, `${ROUTE_OWNER}`, false, filters);
  }

  static doGetOwner(id) {
    return this.doRequest(METHOD_GET, `${ROUTE_OWNER}/${id}`, false);
  }

  static doCreateOwner(ownerData) {
    return this.doRequest(METHOD_PUT, ROUTE_OWNER, false, ownerData);
  }

  static doUpdateOwner(params) {
    return this.doRequest(METHOD_POST, `${ROUTE_OWNER}/${params.id}`, false, { ...params });
  }

  static doDeleteOwner(id) {
    return this.doRequest(METHOD_DELETE, `${ROUTE_OWNER}/${id}`, false);
  }

  static doCreateDevice(deviceData) {
    return this.doRequest(METHOD_PUT, ROUTE_DEVICE, false, deviceData);
  }

  static doCreateCoin(coinData) {
    return this.doRequest(METHOD_PUT, ROUTE_COIN, false, coinData, true);
  }

  static doConvertCoinPicture(picture) {
    return this.doRequest(METHOD_PUT, `${ROUTE_COIN}/pictureBase64`, false, picture, true);
  }

  static doGetEnvelopes(filters) {
    return this.doRequest(METHOD_GET, `${ROUTE_ENVELOPE}`, false, filters);
  }

  static doGetEnvelope(id) {
    return this.doRequest(METHOD_GET, `${ROUTE_ENVELOPE}/${id}`, false);
  }

  static doCreateEnvelope(envelopeData) {
    return this.doRequest(METHOD_PUT, ROUTE_ENVELOPE, false, envelopeData, true);
  }

  static doUpdateEnvelope(params) {
    return this.doRequest(METHOD_POST, `${ROUTE_ENVELOPE}/${params.id}`, false, { ...params }, true);
  }

  static doDeleteEnvelope(id) {
    return this.doRequest(METHOD_DELETE, `${ROUTE_ENVELOPE}/${id}`, false);
  }

  static doGetOrders(filters) {
    return this.doRequest(METHOD_GET, `${ROUTE_ORDER}`, false, filters);
  }

  static doGetOrder(id) {
    return this.doRequest(METHOD_GET, `${ROUTE_ORDER}/${id}`, false);
  }

  static doCreateOrder(orderData) {
    return this.doRequest(METHOD_PUT, ROUTE_ORDER, false, orderData);
  }

  static doUpdateOrder(params) {
    return this.doRequest(METHOD_POST, `${ROUTE_ORDER}/${params.id}`, false, { ...params });
  }

  static doDeleteOrder(id) {
    return this.doRequest(METHOD_DELETE, `${ROUTE_ORDER}/${id}`, false);
  }

  static doGetStatCoins(filters) {
    return this.doRequest(METHOD_GET, `${ROUTE_STATISTICS}/coins`, false, filters);
  }

  static doGetStatEnvelopes(filters) {
    return this.doRequest(METHOD_GET, `${ROUTE_STATISTICS}/envelopes`, false, filters);
  }

  static doSendRegistrationData(message, username) {
    return this.doRequest(METHOD_POST, `${ROUTE_MESSAGE}/registration`, false, { message, username });
  }

  static doRecoverPassword(loginOrPhone) {
    return this.doRequest(METHOD_POST, `${ROUTE_AUTH}/password-reset`, false, { loginOrPhone });
  }

  static doGetCountries() {
    return this.doRequest(METHOD_GET, `${ROUTE_GEO}/country`, false);
  }

  static doGetCities(country) {
    return this.doRequest(METHOD_GET, `${ROUTE_GEO}/city`, false, { country });
  }

  static doGetCoinCountries() {
    return this.doRequest(METHOD_GET, `${ROUTE_COIN}/coinCountries`, false);
  }

  static doGetCoinCities() {
    return this.doRequest(METHOD_GET, `${ROUTE_COIN}/coinCities`, false);
  }

  static doExportStat(entity, params) {
    return this.doRequest(METHOD_GET, `${ROUTE_STATISTICS}/export`, false, { ...entity, ...params });
  }

  static doSetCoins(deviceId, coins) {
    return this.doRequest(METHOD_POST, `${ROUTE_DEVICE}/setCoins/${deviceId}`, false, { coins });
  }

  static doSetEnvelopes(deviceId, envelopes) {
    return this.doRequest(METHOD_POST, `${ROUTE_DEVICE}/setEnvelopes/${deviceId}`, false, { envelopes });
  }

  static doChangePassword(params) {
    return this.doRequest(METHOD_POST, `${ROUTE_OWNER}/changePassword/${params.id}`, false, params);
  }

  static doGetMonitoring(id) {
    return this.doRequest(METHOD_GET, `${ROUTE_MONITORING}/${id}`, false);
  }

  static doSendCommandToDevice(params) {
    return this.doRequest(
      METHOD_POST,
      `${ROUTE_MONITORING}/${params.deviceId}/${params.commandName}/${params.commandValue}`,
      false,
    );
  }

  static doSetDeviceEmails(data) {
    return this.doRequest(METHOD_PUT, `${ROUTE_MONITORING}/${data.deviceId}/emails`, false, { emails: data.emails });
  }

  static async doRequest(method, route, headersForLoginOrRefresh = false, data = {}, multipart) {
    const request = new Network();
    let result = null;
    let headers = null;

    switch (method) {
      case METHOD_POST:
        headers = await this.getHeaders(headersForLoginOrRefresh, multipart);
        result = request.post(SERVER_URL + route, data, headers, multipart);
        break;
      case METHOD_PUT:
        headers = await this.getHeaders(headersForLoginOrRefresh, multipart);
        result = request.put(SERVER_URL + route, data, headers, multipart);
        break;
      case METHOD_DELETE:
        headers = await this.getHeaders();
        result = request.delete(SERVER_URL + route, data, headers, multipart);
        break;
      default:
        headers = await this.getHeaders(headersForLoginOrRefresh, multipart);
        result = request.get(SERVER_URL + route, data, headers, multipart);
        break;
    }

    return this.processNetworkPromise(result);
  }

  static async processNetworkPromise(result) {
    const response = await result;
    const contentType = response.headers.get('content-type') || '';
    switch (true) {
      case contentType.includes('application/json'):
        const responseJson = await response.json();
        if (response.ok) {
          let output = responseJson;

          if (typeof responseJson.data !== 'undefined') {
            output = this.hydrateResponse(responseJson.data, responseJson.included);
          }

          return output;
        }
        throw new Error(responseJson.error.message);

      case contentType.includes('text/csv'):
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'file.csv';
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();
        a.remove();
        break;

      default:
        if (response.status === 401) {
          Config.del(PARAM_ACCESS_TOKEN);
          Config.del(PARAM_REFRESH_TOKEN);
          Config.del(PARAM_LOGIN_OR_REFRESH_TOKEN);
          window.location.href = '/login';
          window.location.reload();
        } else if (response.status >= 400) {
          const responseText = await response.text();
          throw new Error(responseText);
        }
    }

    return {};
  }

  static async getHeaders(forLoginOrRefresh, multipart) {
    const authHeader = await (forLoginOrRefresh
      ? this.getAuthHeaderValueForLogin()
      : this.getAuthHeaderForInternalContent());

    const headers = {
      AUTHORIZATION: authHeader,
    };
    if (!multipart) {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    return new Headers(headers);
  }

  static async getAuthHeaderValueForLogin() {
    let loginOrRefreshToken = await Config.get(PARAM_LOGIN_OR_REFRESH_TOKEN);

    loginOrRefreshToken = _.isNil(loginOrRefreshToken)
      ? base64.encode(`555666777888:${getRandomArbitrary(1000000000000, 1508227183124)}`)
      : loginOrRefreshToken;

    Config.set(PARAM_LOGIN_OR_REFRESH_TOKEN, loginOrRefreshToken);

    return `Basic ${loginOrRefreshToken}`;
  }

  static async getAuthHeaderForInternalContent() {
    const token = await Config.get(PARAM_ACCESS_TOKEN);
    return `Bearer ${token}`;
  }

  static hydrateResponse(data, included) {
    let newData = data;

    if (typeof included !== 'undefined' && included.length > 0 && typeof data === 'object') {
      if (typeof data.id !== 'undefined' && typeof data.type === 'string' && Object.keys(data).length === 2) {
        newData = this.hydrateResponse(this.searchIncludedResource(data, included), included);
      } else {
        Object.keys(data).forEach(key => {
          if (typeof data[key] === 'object') {
            newData[key] = this.hydrateResponse(data[key], included);
          }
        });
      }
    }

    return newData;
  }

  static searchIncludedResource(resourceId, included) {
    let resource = resourceId;

    for (let i = 0; i < included.length; i += 1) {
      if (included[i].type === resourceId.type && included[i].id === resourceId.id) {
        resource = included[i].attributes;
        break;
      }
    }

    return resource;
  }
}

export default Request;
