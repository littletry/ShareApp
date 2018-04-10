import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import MainPage from './routes/MainPage';
import Register from './routes/Register';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/main" exact component={MainPage} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
