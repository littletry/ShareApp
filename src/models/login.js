import { routerRedux } from 'dva/router';
import { logins } from '../services/api';

export default {
  namespace: 'login',
  state: {
    code: '',
    message: '',
  },
  effects: {
    * fetch({ payload }, { call, put }) {
      const response = yield call(logins, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    * reg(_, { put }) {
      yield put(routerRedux.push('/register'));
    },
    * toMain({ payload }, { put }) {
      const userName = payload.toString();
      sessionStorage.setItem('userName', userName);
      yield put(routerRedux.push('/main'));
    },
  },
  reducers: {
    save(state, action) {
      if (action.payload.code === 0) {
        return {
          ...state,
          code: action.payload.code,
          message: action.payload.message,
        };
      } else if (action.payload.code === 502) {
        return {
          ...state,
          code: action.payload.code,
          message: action.payload.message,
        };
      } else {
        return {
          ...state,
        };
      }
    },
  },
};
