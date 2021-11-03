import base64 from 'react-native-base64';
import {baseUrl} from './api/constants';

const authConfig = {
  additionalParameters: {duration: 'permanent'},
  redirectUrl: 'com.redditech://oauth2redirect/reddit',
  clientId: 'CVv5Xz-CbREPVye86OgwAw',
  clientSecret: '',
  scopes: [
    'identity',
    'edit',
    'mysubreddits',
    'subscribe',
    'vote',
    'privatemessages',
    'read',
    'account',
  ],
  serviceConfiguration: {
    authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
    tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
  },
  customHeaders: {
    token: {
      Authorization: 'Basic <base64encoded clientID:>',
    },
  },
};

const refreshConfig = {
  issuer: 'https://www.reddit.com/api/v1/access_token',
  clientId: authConfig.clientId,
  redirectUrl: authConfig.redirectUrl,
  scopes: authConfig.scopes,
  additionalHeaders: {
    Authorization: `Basic ${base64.encode(authConfig.clientId + ':')}`,
  },
};

export default authConfig;
export {refreshConfig};
