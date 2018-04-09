import request from '../utils/request';

// const baseUrl = 'http://112.74.99.173:80/ShareZone';


export function logins(params) {
  return request(`/user/_login?loginName=${params.loginName}&password=${params.password}`, {
    method: 'POST',
  });
}
