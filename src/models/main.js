/* eslint-disable */
export default {
  namespace: 'main',
  state: {
  },
  subscription: {
    /**
     * 监听浏览器地址，当跳转到 /user 时进入该方法
     * @param dispatch 触发器，用于触发 effects 中的 query 方法
     * @param history 浏览器历史记录，主要用到它的 location 属性以获取地址栏地址
     */
    setup({ dispatch, history }) {
      history.listen((location) => {
        console.log('重定向接收参数：%o', location.state);
        // 调用 effects 属性中的 query 方法，并将 location.state 作为参数传递
        dispatch({
          type: 'query',
          payload: location.state,
        });
      });
    },
  },
  effects: {
    * query({ payload }, { call, put }) {
      console.log(payload);
    },
  },
};
