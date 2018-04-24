import React, { Component } from 'react';
import { Toast, List, InputItem, WhiteSpace, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import cryptoJs from 'crypto';
import styles from './IndexPage.css';


@connect(state => ({
  login: state.login,
}))

class IndexPage extends Component {
  state = {
    loginName: '',
    password: '',
  };
  componentDidMount() {
  }
  handleLogin = () => {
    this.state.loginName = this.props.form.getFieldProps('loginName').value;
    const password1 = this.props.form.getFieldProps('password').value;
    this.state.password = cryptoJs.createHash('md5').update(password1).digest('hex');

    const { dispatch } = this.props;
    dispatch({
      type: 'login/fetch',
      payload: {
        loginName: this.state.loginName,
        password: this.state.password,
      },
      callback: (resp) => {
        if (resp.code === 0) {
          Toast.info('登录' + resp.message, 1);
          this.toMain(resp.content.id);
        } else if (resp.code === 501) {
          Toast.info(resp.message, 2);
        }
      },
    });
  };
  toRegister = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/reg',
    });
  };
  toMain = (loginId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/toMain',
      payload: loginId,
    });
  };
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div>
        <div className={styles.placeholder}>欢迎进入分享空间</div>
        <List>
          <WhiteSpace size="lg" />
          <InputItem
            {...getFieldProps('loginName')}
            placeholder="请输入登录名称"
          >
            登录名称：
          </InputItem>
          <WhiteSpace size="lg" />
          <InputItem
            {...getFieldProps('password')}
            placeholder="请输入登录密码"
            type="password"
          >
            登录密码：
          </InputItem>
          <WhiteSpace size="lg" />
          <Button
            type="primary"
            inline
            style={{ width: '40%', marginLeft: '6%', marginRight: '4%' }}
            onClick={() => this.handleLogin()}
          >
            登 录
          </Button>
          <Button
            type="primary"
            inline
            style={{ width: '40%', marginLeft: '4%', marginRight: '6%' }}
            onClick={() => this.toRegister()}
          >
            注 册
          </Button>
        </List>
      </div>
    );
  }
}
const IndexPages = createForm()(IndexPage);
export default connect()(IndexPages);
