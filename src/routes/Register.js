import React, { Component } from 'react';
import { Toast, List, InputItem, TextareaItem, WhiteSpace, DatePicker, Picker, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import cryptoJs from 'crypto';
import styles from './Register.css';

@connect(state => ({
  register: state.register,
}))

class Register extends Component {
  state = {
    loginName: '',
    password: '',
    password1: '',
    userName: '',
    email: '',
    sex: '',
    birthday: '',
    description: '',
  };
  handleRegister = () => {
    let checkState = true;
    this.props.form.validateFields((errors, value) => {
      if (value.loginName === '' || value.loginName === null) {
        Toast.fail('请输入登录名称', 2);
        checkState = false;
        return;
      }
      if (value.password === '' || value.password === null) {
        Toast.fail('请输入登录密码', 2);
        checkState = false;
        return;
      }
      if (value.password1 === '' || value.password1 === null) {
        Toast.fail('请确认登录密码', 2);
        checkState = false;
        return;
      }
      if (value.userName === '' || value.userName === null) {
        Toast.fail('请输入用户姓名', 2);
        checkState = false;
        return;
      }
      if (value.password !== value.password1) {
        Toast.fail('两次密码输入不一致', 2);
        checkState = false;
      }
    });

    if (checkState) {
      this.state.loginName = this.props.form.getFieldProps('loginName').value;
      this.state.password = this.props.form.getFieldProps('password').value;
      this.state.password1 = this.props.form.getFieldProps('password1').value;
      this.state.userName = this.props.form.getFieldProps('userName').value;
      this.state.email = this.props.form.getFieldProps('email').value;
      this.state.sex = this.props.form.getFieldProps('sex').value;
      this.state.birthday = this.props.form.getFieldProps('birthday').value;
      this.state.description = this.props.form.getFieldProps('description').value;

      const user = {
        loginName: this.state.loginName,
        password: this.state.password === '' ? '' : cryptoJs.createHash('md5').update(this.state.password).digest('hex'),
        userName: this.state.userName,
        email: this.state.email === undefined ? '' : this.state.email,
        sex: this.state.sex === undefined ? '2' : this.state.sex[0],
        birthday: this.state.birthday === undefined ? '' : this.state.birthday.getTime().toString(),
        description: this.state.description === undefined ? '' : this.state.description,
      };
      const { dispatch } = this.props;
      dispatch({
        type: 'register/fetch',
        payload: user,
        callback: (resp) => {
          if (resp.code === 0) {
            Toast.info(resp.message, 3);
            this.toLogin();
          } else if (resp.code === 501) {
            Toast.info(resp.message, 3);
          }
        },
      });
    }
  };
  toLogin = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'register/toLogin',
    });
  };
  render() {
    const { getFieldProps } = this.props.form;
    const sex = [
      {
        label: '男',
        value: '0',
      },
      {
        label: '女',
        value: '1',
      },
      {
        label: '保密',
        value: '2',
      },
    ];
    return (
      <div>
        <div className={styles.placeholder}>欢迎注册分享空间</div>
        <List>
          <WhiteSpace size="lg" />
          <InputItem
            {...getFieldProps('loginName')}
            placeholder="请输入登录名称"
            style={{ textAlign: 'right' }}
            key="loginName"
          >
            登录名称：
          </InputItem>
          <WhiteSpace size="xs" />
          <InputItem
            {...getFieldProps('password')}
            placeholder="请输入登录密码"
            style={{ textAlign: 'right' }}
            key="password"
            type="password"
          >
            登录密码：
          </InputItem>
          <WhiteSpace size="xs" />
          <InputItem
            {...getFieldProps('password1')}
            placeholder="请确认登录密码"
            style={{ textAlign: 'right' }}
            key="password1"
            type="password"
          >
            确认密码：
          </InputItem>
          <WhiteSpace size="xs" />
          <InputItem
            {...getFieldProps('userName')}
            placeholder="请输入用户姓名"
            style={{ textAlign: 'right' }}
            key="userName"
          >
            用户姓名：
          </InputItem>
          <WhiteSpace size="xs" />
          <InputItem
            {...getFieldProps('email')}
            placeholder="请输入用户邮箱"
            style={{ textAlign: 'right' }}
            key="email"
          >
            用户邮箱：
          </InputItem>
          <WhiteSpace size="xs" />
          <Picker
            key="sex"
            extra="请选择用户性别"
            data={sex}
            cols={1}
            {...getFieldProps('sex')}
          >
            <List.Item arrow="horizontal" >用户性别：</List.Item>
          </Picker>
          <WhiteSpace size="xs" />
          <DatePicker
            mode="date"
            key="birthday"
            format="YYYY-MM-DD"
            extra="请选择用户生日"
            {...getFieldProps('birthday')}
          >
            <List.Item arrow="horizontal" >用户生日：</List.Item>
          </DatePicker>
          <WhiteSpace size="xs" />
          <TextareaItem
            {...getFieldProps('description')}
            placeholder="请输入个性描述信息"
            rows={3}
            count={200}
            key="description"
          >
            个性描述：
          </TextareaItem>
          <WhiteSpace size="xs" />
          <Button
            key="register"
            type="primary"
            inline
            style={{ width: '60%', marginLeft: '20%' }}
            onClick={() => this.handleRegister()}
          >
            确认注册
          </Button>
        </List>
      </div>
    );
  }
}
const Registers = createForm()(Register);
export default connect()(Registers);
