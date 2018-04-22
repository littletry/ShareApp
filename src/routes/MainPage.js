import React, { Component } from 'react';
import { TabBar, Icon, Result, WhiteSpace, Card } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import styles from './MainPage.css';

@connect(state => ({
  main: state.main,
}))

class MainPage extends Component {
  state = {
    selectedTab: 'allTab',
    userId: '',
    dataAll: [],
    dataUserAll: [],
  };
  componentDidMount() {
    this.state.userId = sessionStorage.getItem('userId');
    this.fetchAll();
    this.fetchUserAll(this.state.userId);
  }
  fetchAll = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'main/fetchAll',
      payload: '1',
      callback: (resp) => {
        console.log(resp);
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
        console.log(resp);
        this.setState({
          dataUserAll: resp.content,
        });
      },
    });
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
              <Card.Header
                title={'标题：' + listAll[i].title}
                style={{ backgroundColor: '#e1f0fb' }}
              />
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
              <Card.Header
                title={'标题：' + listAll[i].title}
                style={{ backgroundColor: '#e1f0fb' }}
              />
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
  renderContent = (pageText) => {
    if (pageText === 'all') {
      return (
        <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
          <div className={styles.placeholder}>主&nbsp;&nbsp;页</div>
          <hr />
          <div>
            { this.renderAll() }
          </div>
        </div>
      );
    } else if (pageText === 'mine') {
      return (
        <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
          <div className={styles.placeholder}>主&nbsp;&nbsp;页</div>
          <hr />
          <div>
            { this.renderUserAll() }
          </div>
        </div>
      );
    } else if (pageText === 'share') {
      return (
        <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
          <div className={styles.placeholder}>主&nbsp;&nbsp;页</div>
          <hr />
          <div>
            Clicked “{pageText}” tab， show “{pageText}” information
          </div>
        </div>
      );
    } else if (pageText === 'my') {
      return (
        <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
          <div className={styles.placeholder}>主&nbsp;&nbsp;页</div>
          <hr />
          <div>
            Clicked “{pageText}” tab， show “{pageText}” information
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
              });
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
              });
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
              });
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
              });
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
