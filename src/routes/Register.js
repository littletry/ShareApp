import React, { Component } from 'react';
import { List, InputItem, TextareaItem, WhiteSpace, DatePicker, Picker, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import styles from './Register.css';

@connect(state => ({
  register: state.register,
}))

class Register extends Component {
  state = {
  };
  render() {
    const { getFieldProps } = this.props.form;
    const seasons = [
      {
        label: '男',
        value: '0',
      },
      {
        label: '女',
        value: '1',
      },
    ];
    return (
      <div>
        <div className={styles.placeholder}>欢迎注册分享空间</div>
        <List>
          <WhiteSpace size="lg" />
          <InputItem
            {...getFieldProps('loginName')}
            extra="请输入登录名称"
            key="loginName"
          >
            登录名称：
          </InputItem>
          <WhiteSpace size="xs" />
          <InputItem
            {...getFieldProps('password')}
            extra="请输入登录密码"
            key="password"
          >
            登录密码：
          </InputItem>
          <WhiteSpace size="xs" />
          <InputItem
            {...getFieldProps('password1')}
            extra="请确认登录密码"
            key="password1"
          >
            确认密码：
          </InputItem>
          <WhiteSpace size="xs" />
          <InputItem
            {...getFieldProps('userName')}
            extra="请输入用户姓名"
          >
            用户姓名：
          </InputItem>
          <WhiteSpace size="xs" />
          <InputItem
            {...getFieldProps('email')}
            extra="请输入用户邮箱"
          >
            用户邮箱：
          </InputItem>
          <WhiteSpace size="xs" />
          <Picker
            key="sex"
            extra="请选择用户性别"
            data={seasons}
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
          >
            个性描述：
          </TextareaItem>
          <WhiteSpace size="xs" />
          <Button
            type="primary"
            inline
            style={{ width: '60%', marginLeft: '20%' }}
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
