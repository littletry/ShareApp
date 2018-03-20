import { login } from '../services/api';

export default {
  namespace: 'logins',
  effects: {
    * fetch({ payload }, { call, put }) {
      const response = yield call(login, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },
  reducers: {
    save(state, action) {
      if (action.payload.code === 0) {
        const data = action.payload.content;
        return {
          ...state,
          data,
        };
      } else {
        return {
          ...state,
        };
      }
    },
  },
};
