/* eslint-disable */
import { routerRedux } from 'dva/router';
import {queryContents} from "../services/api";
export default {
  namespace: 'main',
  state: {
    code: '',
    message: '',
  },
  effects: {
    * fetchAll({ payload, callback }, { call, put }) {
      const response = yield call(queryContents, payload);
      if (callback) callback(response);
    },
  },
};
