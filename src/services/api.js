import request from '../utils/request';

// const baseUrl = 'http://112.74.99.173:80/ShareZone';


export function logins(params) {
  return request(`/user/login?loginName=${params.loginName}&password=${params.password}`, {
    method: 'POST',
  });
}

export function registers(params) {
  return request('/user/register', {
    method: 'POST',
    body: params,
  });
}

export function queryContents(page) {
  return request(`/content/all?page=${page}`, {
    method: 'POST',
  });
}

export function queryUserContents(params) {
  return request(`/content/select?page=${params.page}&userId=${params.userI}`, {
    method: 'POST',
  });
}

export function queryUser(userId) {
  return request(`/user/userId?userId=${userId}`, {
    method: 'POST',
  });
}

export function changeUser(params) {
  return request('/user/change', {
    method: 'POST',
    body: params,
  });
}

export function shareContent(params) {
  return request('/content/commit', {
    method: 'POST',
    body: params,
  });
}
