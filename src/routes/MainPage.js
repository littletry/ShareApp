import React, { Component } from 'react';
import { TabBar, Icon } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import styles from './MainPage.css';

@connect(state => ({
  main: state.main,
}))

class MainPage extends Component {
  state = {
    selectedTab: 'allTab',
  };
  renderContent = (pageText) => {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div className={styles.placeholder}>主&nbsp;&nbsp;页</div>
        <hr />
        <div style={{ paddingTop: 60 }}>
          Clicked “{pageText}” tab， show “{pageText}” information
        </div>
      </div>
    );
  };
  render() {
    return (
      <div style={{ position: 'fixed', height: '100%', top: 0 }}>
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
            {this.renderContent('所有分享')}
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
            {this.renderContent('我的分享')}
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
            {this.renderContent('分享')}
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
            {this.renderContent('我的')}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}
const MainPages = createForm()(MainPage);
export default connect()(MainPages);
