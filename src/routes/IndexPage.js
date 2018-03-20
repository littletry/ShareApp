import React, { Component } from 'react';
import { Toast, List, InputItem, WhiteSpace, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import styles from './IndexPage.css';


@connect(state => ({
  logins: state.logins,
}))

class IndexPage extends Component {
  componentDidMount() {
    Toast.loading('加载中', 2);
  }
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div>
        <div className={styles.placeholder}>欢迎进入分享空间</div>
        <List>
          <WhiteSpace size="lg" />
          <InputItem
            {...getFieldProps('username')}
            placeholder="请输入用户名"
            lableNumber="7"
          />
          <WhiteSpace size="lg" />
          <InputItem
            {...getFieldProps('password')}
            placeholder="请输入密码"
            lableNumber="7"
          />
          <WhiteSpace size="lg" />
          <Button type="primary" inline style={{ width: '40%', marginLeft: '6%', marginRight: '4%' }} >登 录</Button>
          <Button type="primary" inline style={{ width: '40%', marginLeft: '4%', marginRight: '6%' }} >注 册</Button>
        </List>
      </div>
    );
  }
}
const IndexPages = createForm()(IndexPage);
export default connect()(IndexPages);
