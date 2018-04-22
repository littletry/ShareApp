import { routerRedux } from 'dva/router';
import { registers } from '../services/api';

export default {
  namespace: 'register',
  state: {
    code: '',
    message: '',
  },
  effects: {
    * fetch({ payload, callback }, { call }) {
      const response = yield call(registers, payload);
      if (callback) callback(response);
    },
    * toLogin({ payload }, { put }) {
      yield put(routerRedux.push('/', payload));
    },
  },
};
