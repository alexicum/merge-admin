import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR } from 'react-admin';
import auth from 'Auth';

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    return new Promise((resolve, reject) => {
      if (auth.isAuthenticated()) {
        return resolve();
      }
      return reject();
      // return auth.login()
      //   .then(res => resolve(res))
      //   .catch(err => reject(err));
    });
  }
  if (type === AUTH_LOGOUT) {
    auth.logoutLocal();
    return Promise.resolve();
  }
  if (type === AUTH_ERROR) {
    // Прилетает в ответ на FETCH_ERROR
    const { status } = params;
    // Если API вернуло ошибку авторизации, то возвращаем rejected,
    // что вызовет AUTH_LOGOUT и затем редирект на /login
    if (status === 401 || status === 403) {
      return Promise.reject();
    }
    return Promise.resolve();
  }
  // return Promise.reject(new Error({ redirectTo: '/login' }));
  return Promise.resolve();
};
