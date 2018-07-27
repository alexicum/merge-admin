import auth0 from 'auth0-js';
import AUTH_CONFIG from './auth0-variables';

class Auth {
  options = {
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: AUTH_CONFIG.apiUrl,
    responseType: 'token id_token',
    scope: 'openid profile read:messages',
  };

  auth0 = new auth0.WebAuth(this.options);

  userProfile;

  login = () => {
    this.auth0.authorize();
    // const self = this;
    // // return new Promise((resolve, reject) => {
    // // if (!self.isAuthenticated()) {
    // this.auth0.popup.authorize(this.options, (err, authResult) => {
    //   if (authResult && authResult.accessToken && authResult.idToken) {
    //     self.setSession(authResult);
    //     resolve();
    //   } else if (err) {
    // });
    // return reject();
    // }
    // return resolve();
    // self.auth0.checkSession({}, (err, authResult) => {
    //   if (authResult && authResult.accessToken && authResult.idToken) {
    //     self.setSession(authResult);
    //     resolve();
    //   } else if (err) {
    //     self.auth0.authorize({ prompt: 'login' });
    //     // authorize Не промис и получается, отправляя reject(err);
    //     // authProvider отменяет свой промис
    //     // и что там дальше внутри происходит???
    //     reject(err);
    //     // console.log(err);
    //     // alert(`Error: ${err.error}. Check the console for further details.`);
    //   }
    // });
    // return reject();
    // });
  }

  handleAuthentication = () => {
    const self = this;
    return new Promise((resolve, reject) =>
      self.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          self.setSession(authResult);
          resolve();
        } else if (err) {
          reject(err);
        }
      }));
  }

  setSession = (authResult) => {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  getAccessToken = () => {
    const accessToken = localStorage.getItem('access_token');
    return accessToken;
  }

  getProfile = (cb) => {
    const accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  logoutLocal = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    this.userProfile = null;
  }

  logoutFormIdp = () => {
    this.logoutLocal();
    this.auth0.logout({
      federated: true,
      returnTo: AUTH_CONFIG.logoutUrl,
      client_id: AUTH_CONFIG.clientId,
    });
  }

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}

// возвращаем singleton (module instance)
// https://medium.com/@dmnsgn/singleton-pattern-in-es6-d2d021d150ae
const auth = new Auth();

export default auth;
