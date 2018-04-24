/* eslint-disable */
import { routerRedux } from 'dva/router';
import {queryContents} from "../services/api";
import {queryUserContents} from "../services/api";
import {queryUser} from "../services/api";
import {changeUser} from "../services/api";
import {shareContent} from "../services/api";


export default {
  namespace: 'main',
  state: {
    code: '',
    message: '',
  },
  effects: {
    * fetchAll({ payload, callback }, { call }) {
      const response = yield call(queryContents, payload);
      if (callback) callback(response);
    },
    * fetchUserAll({ payload, callback }, { call }) {
      const response = yield call(queryUserContents, payload);
      if (callback) callback(response);
    },
    * fetchUser({ payload, callback }, { call }) {
      const response = yield call(queryUser, payload);
      if (callback) callback(response);
    },
    * change({ payload, callback }, { call }) {
      const response = yield call(changeUser, payload);
      if (callback) callback(response);
    },
    * share({ payload, callback }, { call }) {
      const response = yield call(shareContent, payload);
      if (callback) callback(response);
    },
    * toLogin(_, { put }) {
      yield put(routerRedux.push('/'));
    },
  },
};
