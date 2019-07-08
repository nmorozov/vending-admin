export const PARAM_ACCESS_TOKEN = 'access_token';
export const PARAM_REFRESH_TOKEN = 'refresh_token';
export const PARAM_LOGIN_OR_REFRESH_TOKEN = 'login_or_refresh_token';
export const PARAM_ACCESS_TOKEN_EXPIRATION_TIME = 'access_token_expiration_time';
export const PARAM_USER_ID = 'user_id';
export const PARAM_USER_ROLE = 'user_role';

/**
 * Application configuration
 */
class Config {
  static getLanguage() {
    return 'ru';
  }

  static get(name) {
    return localStorage.getItem(name);
  }

  static set(name, value) {
    localStorage.setItem(name, value);

    return true;
  }

  static del(name) {
    localStorage.removeItem(name);

    return true;
  }

  static async isLogged() {
    const token = await Config.get(PARAM_ACCESS_TOKEN);

    return !!token;
  }

  static isAdmin() {
    const userRole = Config.get(PARAM_USER_ROLE);
    return userRole === 'admin';
  }

  static setAuthorizationData(backendResponse) {
    Config.set(PARAM_ACCESS_TOKEN, backendResponse.accessToken);
    Config.set(PARAM_REFRESH_TOKEN, backendResponse.refreshToken);
    Config.set(PARAM_ACCESS_TOKEN_EXPIRATION_TIME, backendResponse.accessTokenExpiresAt);
    Config.set(PARAM_USER_ID, backendResponse.user_id);
    Config.set(PARAM_USER_ROLE, backendResponse.role);
  }

  static clearAuthorizationData() {
    Config.set(PARAM_ACCESS_TOKEN, '');
    Config.set(PARAM_REFRESH_TOKEN, '');
    Config.set(PARAM_ACCESS_TOKEN_EXPIRATION_TIME, '');
    Config.set(PARAM_USER_ROLE, '');
  }
}

export default Config;
