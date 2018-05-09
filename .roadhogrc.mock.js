import { delay } from 'roadhog-api-doc';
// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'false';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  /* eslint-disable */
  //'POST /user/login': 'http://112.74.99.173:80/ShareZone',
  'POST /user/login': 'http://127.0.0.1:8090/ShareZone',

 // 'POST /user/register': 'http://112.74.99.173:80/ShareZone',
  'POST /user/register': 'http://127.0.0.1:8090/ShareZone',

  // 'POST /content/userAll': 'http://112.74.99.173:80/ShareZone',
  'POST /content/all': 'http://127.0.0.1:8090/ShareZone',

  // 'POST /content/select': 'http://112.74.99.173:80/ShareZone',
  'POST /content/select': 'http://127.0.0.1:8090/ShareZone',

  // 'POST /user/select': 'http://112.74.99.173:80/ShareZone',
  'POST /user/userId': 'http://127.0.0.1:8090/ShareZone',

  // 'POST /user/change': 'http://112.74.99.173:80/ShareZone',
  'POST /user/change': 'http://127.0.0.1:8090/ShareZone',

  // 'POST /content/commit': 'http://112.74.99.173:80/ShareZone',
  'POST /content/commit': 'http://127.0.0.1:8090/ShareZone',
};

export default noProxy ? {} : delay(proxy, 1000);
