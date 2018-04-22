// import { routerRedux } from 'dva/router';
import { registers } from '../services/api';

export default {
  namespace: 'register',
  state: {
    code: '',
    message: '',
  },
  effects: {
    * fetch({ payload }, { call, put }) {
      const response = yield call(registers, payload);
      yield put({
        type: 'save',
        payload: response,
      });
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
      } else {
        return {
          ...state,
        };
      }
    },
  },
};
