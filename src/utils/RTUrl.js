export default class RTURL {

  static toQueryParams(obj) {
    return Object.keys(obj).map((key) => `${key}=${obj[key]}`).join('&');
  }

  static getQueryParams(url) {
    const splitted = url.split("?")[1].split("&");
    let params = {};

    if (splitted.length === 1) {
      return "";
    }
    splitted.forEach((p) => {
      const kv = p.split("=");

      params[kv[0]] = kv[1];
    })
    return params;
  }

  static asQueryParams(obj) {
    let query = '?';

    for (key in obj) {
      if (obj[key]) {
        query += `${key}=${obj[key]}&`
      }
    }
    return query.substr(0, query.length - 1);
  }

  static removeQueryParams(url) {
    if (url) {
      return url.split('?')[0];
    }
  }
}
