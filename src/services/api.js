import request from '../utils/request';

const baseUrl = 'http://112.74.99.173:80/ShareZone/';

export function query() {
  return request('/api/users');
}

export function login() {
  return request(baseUrl + '_login');
}
