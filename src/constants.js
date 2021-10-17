const appId = 'CVv5Xz-CbREPVye86OgwAw';
const redirectUri = 'https://www.temporary-url.com/BABA2';


const OAuthAuthorizeBody = {
  client_id: appId,
  response_type: 'code',
  state: 'unknown', // More research needed
  redirect_uri: redirectUri,
  duration: 'permanent',
  scope: 'identity'
}

export { appId, redirectUri, OAuthAuthorizeBody };