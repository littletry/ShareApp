import { routerRedux } from 'dva/router';
import { logins } from '../services/api';

export default {
  namespace: 'login',
  state: {
    code: '',
    message: '',
    user: {},
  },
  effects: {
    * fetch({ payload, callback }, { call }) {
      const response = yield call(logins, payload);
      if (callback) callback(response);
    },
    * reg(_, { put }) {
      yield put(routerRedux.push('/register'));
    },
    * toMain({ payload }, { put }) {
      const userId = payload.toString();
      sessionStorage.setItem('userId', userId);
      yield put(routerRedux.push('/main'));
    },
  },
};
