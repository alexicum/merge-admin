import { fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import auth from 'Auth';

const httpClient = (url, options = {}) => {
  const localOptions = options;
  if (!localOptions.headers) {
    localOptions.headers = new Headers({ Accept: 'application/json' });
  }
  const token = auth.getAccessToken();
  localOptions.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, localOptions);
};

const dataProvider = jsonServerProvider('http://localhost:3000', httpClient);

export default dataProvider;
