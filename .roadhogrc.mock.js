import { delay } from 'roadhog-api-doc';
// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'false';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  /* eslint-disable */
  'POST /user/login': 'http://112.74.99.173:80/ShareZone',
};

export default noProxy ? {} : delay(proxy, 1000);
