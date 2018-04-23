import React, { Component } from 'react';
import { TabBar, Icon, Result, WhiteSpace, Card, Badge, List, InputItem, TextareaItem, DatePicker, Picker, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import cryptoJs from 'crypto';
import styles from './MainPage.css';

@connect(state => ({
  main: state.main,
}))

class MainPage extends Component {
  state = {
    selectedTab: 'shareTab',
    userId: '',
    dataAll: [],
    dataUserAll: [],
    user: {},
  };
  componentDidMount() {
    this.state.userId = sessionStorage.getItem('userId');
    this.fetchAll();
    this.fetchUserAll(this.state.userId);
    this.fetchUser(this.state.userId);
  }
  refresh = () => {
    this.fetchAll();
    this.fetchUserAll(this.state.userId);
    this.fetchUser(this.state.userId);
    this.setState({});
  };

  fetchAll = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'main/fetchAll',
      payload: '1',
      callback: (resp) => {
        this.setState({
          dataAll: resp.content,
        });
      },
    });
  };
  fetchUserAll = (userId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'main/fetchUserAll',
      payload: {
        page: '1',
        userI: userId,
      },
      callback: (resp) => {
        this.setState({
          dataUserAll: resp.content,
        });
      },
    });
  };
  fetchUser = (userId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'main/fetchUser',
      payload: userId,
      callback: (resp) => {
        this.setState({
          user: resp.content,
        });
      },
    });
  };
  fetchShare = () => {
    let checkState = true;
    this.props.form.validateFields((errors, value) => {
      if (value.title === undefined || value.title === '') {
        Toast.fail('请输入分享主题', 2);
        checkState = false;
        return;
      }
      if (value.detail === undefined || value.detail === '') {
        Toast.fail('请输入分享内容', 2);
        checkState = false;
      }
    });
    if (checkState) {
      const newTitle = this.props.form.getFieldProps('title').value;
      const newDetail = this.props.form.getFieldProps('detail').value;
      const content = {
        title: newTitle === undefined ? '' : newTitle,
        detail: newDetail === undefined ? '' : newDetail,
        userId: this.state.userId,
      };
      const { dispatch } = this.props;
      dispatch({
        type: 'main/share',
        payload: content,
        callback: (resp) => {
          if (resp.code === 0) {
            Toast.info(resp.message, 1);
          } else if (resp.code === 501) {
            Toast.info(resp.message, 2);
          }
        },
      });
    }
    this.refresh();
  };

  changeUser = () => {
    let checkState = true;
    this.props.form.validateFields((errors, value) => {
      if (value.loginName === undefined || value.loginName === '') {
        Toast.fail('请输入登录名称', 2);
        checkState = false;
        return;
      }
      if (value.password === undefined || value.password === '') {
        Toast.fail('请输入登录密码', 2);
        checkState = false;
        return;
      }
      if (value.password1 === undefined || value.password1 === '') {
        Toast.fail('请确认登录密码', 2);
        checkState = false;
        return;
      }
      if (value.userName === undefined || value.userName === '') {
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
      const newLoginName = this.props.form.getFieldProps('loginName').value;
      const newPassword = this.props.form.getFieldProps('password').value;
      const newUserName = this.props.form.getFieldProps('userName').value;
      const newEmail = this.props.form.getFieldProps('email').value;
      const newSex = this.props.form.getFieldProps('sex').value;
      const newBirthday = this.props.form.getFieldProps('birthday').value;
      const newDescription = this.props.form.getFieldProps('description').value;
      const birthd = this.state.user.birthday;

      const user = {
        loginName: newLoginName === undefined ? this.state.user.loginName : newLoginName,
        password: newPassword === undefined ? '' : cryptoJs.createHash('md5').update(newPassword).digest('hex'),
        userName: newUserName === undefined ? this.state.user.userName : newUserName,
        email: newEmail === undefined ? this.state.user.email : newEmail,
        sex: newSex === undefined ? this.state.user.sex : newSex[0].toString(),
        birthday: newBirthday === undefined ? birthd : newBirthday.getTime().toString(),
        description: newDescription === undefined ? this.state.user.description : newDescription,
      };

      const { dispatch } = this.props;
      dispatch({
        type: 'main/change',
        payload: user,
        callback: (resp) => {
          if (resp.code === 0) {
            Toast.info(resp.message, 1);
          } else if (resp.code === 501) {
            Toast.info(resp.message, 2);
          }
        },
      });
    }
  };
  renderAll = () => {
    const listAll = this.state.dataAll;
    const items = [];
    if (listAll.length !== 0) {
      for (let i = 0; i < listAll.length; i += 1) {
        items.push(
          <div key={listAll[i].id}>
            <WhiteSpace size="md" />
            <Card>
              <Badge
                text={listAll[i].checkPublish === 0 ? '审核中' : listAll[i].checkPublish === 1 ? '通过' : '未通过'}
                corner
                style={listAll[i].checkPublish === 0 ? { backgroundColor: '#0c21db' } : listAll[i].checkPublish === 1 ? { backgroundColor: '#13db18' } : { backgroundColor: '#ff0000' }}
              >
                <Card.Header
                  title={'标题：' + listAll[i].title}
                  style={{ backgroundColor: '#e1f0fb' }}
                />
              </Badge>
              <Card.Body>
                <div>
                  {listAll[i].detail}
                </div>
              </Card.Body>
              <Card.Footer
                content={<span>{'创建时间：' + listAll[i].createTime}</span>}
              />
            </Card>
          </div>
        );
      }
    } else {
      items.push(
        <div key="123456789">
          <Result
            title="暂无分享内容"
          />
        </div>
      );
    }
    return items;
  };
  renderUserAll = () => {
    const listAll = this.state.dataUserAll;
    const items = [];
    if (listAll.length !== 0) {
      for (let i = 0; i < listAll.length; i += 1) {
        items.push(
          <div key={listAll[i].id}>
            <WhiteSpace size="md" />
            <Card>
              <Badge
                text={listAll[i].checkPublish === 0 ? '审核中' : listAll[i].checkPublish === 1 ? '通过' : '未通过'}
                corner
                style={listAll[i].checkPublish === 0 ? { backgroundColor: '#0c21db' } : listAll[i].checkPublish === 1 ? { backgroundColor: '#13db18' } : { backgroundColor: '#ff0000' }}
              >
                <Card.Header
                  title={'标题：' + listAll[i].title}
                  style={{ backgroundColor: '#e1f0fb' }}
                />
              </Badge>
              <Card.Body>
                <div>
                  {listAll[i].detail}
                </div>
              </Card.Body>
              <Card.Footer
                content={<span>{'创建时间：' + listAll[i].createTime}</span>}
              />
            </Card>
          </div>
        );
      }
    } else {
      items.push(
        <div key="123456789">
          <Result
            title="暂无分享内容"
          />
        </div>
      );
    }
    return items;
  };
  renderShare = () => {
    const { getFieldProps } = this.props.form;
    return (
      <List renderHeader="将要分享的内容">
        <InputItem
          {...getFieldProps('title', {
            initialValue: '',
          })}
          placeholder="请输入分享标题"
          key="title"
        />
        <WhiteSpace size="xs" />
        <TextareaItem
          {...getFieldProps('detail', {
            initialValue: '',
          })}
          placeholder="分享的详细内容"
          rows={9}
          key="detail"
        />
        <Button
          key="shareButton"
          type="primary"
          inline
          onClick={() => this.fetchShare()}
          style={{ width: '100%' }}
        >
          确认无误并分享
        </Button>
      </List>
    );
  };
  renderUser = () => {
    const { getFieldProps } = this.props.form;
    const user1 = this.state.user;
    const birth1 = parseInt(user1.birthday, 10);
    const birth = new Date(birth1);
    let sex1 = '';
    if (user1.sex !== undefined) {
      sex1 = user1.sex.toString();
    }
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
      <List>
        <WhiteSpace size="lg" />
        <InputItem
          {...getFieldProps('loginName', {
            initialValue: user1.loginName,
          })}
          disabled="true"
          placeholder="请输入登录名称"
          style={{ textAlign: 'right' }}
          key="loginName"
        >
          <a style={{ color: '#000' }}>登录名称：</a>
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
          {...getFieldProps('userName', {
            initialValue: user1.userName,
          })}
          placeholder="请输入用户姓名"
          style={{ textAlign: 'right' }}
          key="userName"
        >
          用户姓名：
        </InputItem>
        <WhiteSpace size="xs" />
        <InputItem
          {...getFieldProps('email', {
            initialValue: user1.email,
          })}
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
          {...getFieldProps('sex', {
            initialValue: sex1,
          })}
        >
          <List.Item arrow="horizontal" >用户性别：</List.Item>
        </Picker>
        <WhiteSpace size="xs" />
        <DatePicker
          mode="date"
          key="birthday"
          format="YYYY-MM-DD"
          extra="请选择用户生日"
          {...getFieldProps('birthday', {
            initialValue: birth,
          })}
        >
          <List.Item arrow="horizontal" >用户生日：</List.Item>
        </DatePicker>
        <WhiteSpace size="xs" />
        <TextareaItem
          {...getFieldProps('description', {
            initialValue: user1.description,
          })}
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
          onClick={() => this.changeUser()}
          style={{ width: '100%' }}
        >
          确认修改
        </Button>
      </List>
    );
  };

  renderContent = (pageText) => {
    if (pageText === 'all') {
      return (
        <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
          <div className={styles.placeholder}>所有分享</div>
          <hr />
          <div>
            {this.renderAll() }
          </div>
        </div>
      );
    } else if (pageText === 'mine') {
      return (
        <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
          <div className={styles.placeholder}>我的分享</div>
          <hr />
          <div>
            {this.renderUserAll() }
          </div>
        </div>
      );
    } else if (pageText === 'share') {
      return (
        <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
          <div className={styles.placeholder}>将要分享</div>
          <hr />
          <div>
            {this.renderShare()}
          </div>
        </div>
      );
    } else if (pageText === 'my') {
      return (
        <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
          <div className={styles.placeholder}>我的信息</div>
          <hr />
          <div>
            {this.renderUser() }
          </div>
        </div>
      );
    }
  };
  render() {
    return (
      <div style={{ position: 'fixed', width: '100%', height: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
        >
          <TabBar.Item
            title="所有分享"
            key="all"
            icon={<Icon className={styles.all} />}
            selectedIcon={<Icon className={styles.all_select} />}
            selected={this.state.selectedTab === 'allTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'allTab',
              }); this.refresh();
            }}
            data-seed="logId"
          >
            {this.renderContent('all')}
          </TabBar.Item>
          <TabBar.Item
            title="我的分享"
            key="mine"
            icon={<Icon className={styles.mine} />}
            selectedIcon={<Icon className={styles.mine_select} />}
            selected={this.state.selectedTab === 'mineTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'mineTab',
              }); this.refresh();
            }}
            data-seed="logId"
          >
            {this.renderContent('mine')}
          </TabBar.Item>
          <TabBar.Item
            title="分享"
            key="share"
            icon={<Icon className={styles.share} />}
            selectedIcon={<Icon className={styles.share_select} />}
            selected={this.state.selectedTab === 'shareTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'shareTab',
              }); this.refresh();
            }}
            data-seed="logId"
          >
            {this.renderContent('share')}
          </TabBar.Item>
          <TabBar.Item
            title="我的"
            key="my"
            icon={<Icon className={styles.my} />}
            selectedIcon={<Icon className={styles.my_select} />}
            selected={this.state.selectedTab === 'myTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'myTab',
              }); this.refresh();
            }}
            data-seed="logId"
          >
            {this.renderContent('my')}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}
const MainPages = createForm()(MainPage);
export default connect()(MainPages);
