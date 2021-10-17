import { OAuthAuthorizeBody } from "../constants";

async function authorize() {
  return fetch('https://www.reddit.com/api/v1/authorize', {
    method: 'GET',
    body: JSON.stringify(OAuthAuthorizeBody),
  })
}

export { authorize };