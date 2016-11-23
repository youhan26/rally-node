/**
 * Created by YouHan on 2016/8/22.
 */
import React, {PropTypes} from "react";
import Render from "react-dom";
import {Router, hashHistory, Route, IndexRoute} from "react-router";
import {Menu, Dropdown, Icon} from "antd";
import Raven from "raven-js";
import moment from "moment-timezone/moment-timezone";
import "moment/locale/zh-cn";
import Share from "./share/share";
import Management from "./manage/manage";
import HorizonHeader from "./header";
import Dashboard from "./dashboard/dashboard";
import Story from "./story/detail/storyNav";
import Bug from "./bug/bug";
import Report from "./report/report";
import StoryList from "./story/search/storyList";
import FontSizeConverter from "./tools/font-size-converter";
import Code from "./tools/qrcode";
import Project from "./manage/project";
import Team from "./manage/team";
import Member from "./manage/member";
import Role from "./manage/role";
import Login from "./login/login";
import Topic from "./topic/topic";
import Auth from "./auth";
import TopicDetailNew from "./topic/topicDetailNew";
import TopicDetailEdit from "./topic/topicDetailEdit";
import TopicConfig from "./topic/topicConfig";


require('./../style/basic.css');

// 推荐在入口文件全局设置 locale 与时区
moment.locale('zh-cn');
// 从 https://github.com/moment/moment-timezone/blob/develop/data/packed/latest.json 复制
moment.tz.add('Asia/Shanghai|CST CDT|-80 -90|01010101010101010|-1c1I0 ' +
  'LX0 16p0 1jz0 1Myp0 Rb0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0|23e6');
moment.tz.setDefault('Asia/Shanghai');

Raven.config('https://b11a5932031d459dbd521ecbc9895977@sentry.io/112807').install();

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    
    this.onClick = this.onClick.bind(this);
  }
  
  onClick({key}) {
    if (key === 1) {
      Auth.logout();
      this.props.logout();
    }
  }
  
  render() {
    const menu = (
      <Menu onClick={this.onClick}>
        <Menu.Item key="1">Logout</Menu.Item>
      </Menu>
    );
    
    
    return (
      <div className="">
        { this.props.user ? <span>{this.props.user.name}</span> : null}
        <Dropdown overlay={menu}>
          Operation<Icon type="down" />
        </Dropdown>
      </div>
    );
  }
}

UserInfo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number
  }),
  logout: PropTypes.func
};

UserInfo.defaultProps = {
  user: {}
};


class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user: {}
    };
    
    this.updateUser = this.updateUser.bind(this);
    this.logout = this.logout.bind(this);
  }
  
  updateUser(data) {
    this.state.user = data;
    this.setState(this.state);
  }
  
  logout() {
    this.state.user = {};
    this.setState(this.state);
  }
  
  render() {
    const me = this;
    const childrenWithProps = React.Children.map(this.props.children,
      child => React.cloneElement(child, {
        updateUser: me.updateUser
      })
    );
    
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <HorizonHeader />
        <div className="header-user">
          <Icon type="user" />{this.state.user.name}
        </div>
        {childrenWithProps}
      </div>
    );
  }
}

const requireCredentials = (nextState, replace, next) => {
  if (!Auth.isLogin()) {
    const ran = Math.ceil(Math.random() * 8);
    replace(`/login?ran=${ran}`);
  }
  next();
};

Render.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} onEnter={requireCredentials} />
      <Route path="dashboard" component={Dashboard} onEnter={requireCredentials} />
      <Route path="stories" component={StoryList} onEnter={requireCredentials} />
      <Route path="story/:id" component={Story} onEnter={requireCredentials} />
      <Route path="story" component={Story} onEnter={requireCredentials} />
      <Route path="bugs" component={Bug} onEnter={requireCredentials} />
      <Route path="report" component={Report} onEnter={requireCredentials} />
      <Route path="share" component={Share} onEnter={requireCredentials} />
      <Route path="manage" component={Management} onEnter={requireCredentials}>
        <IndexRoute component={Project} onEnter={requireCredentials} />
        <Route path="project" component={Project} onEnter={requireCredentials} />
        <Route path="team" component={Team} onEnter={requireCredentials} />
        <Route path="member" component={Member} onEnter={requireCredentials} />
        <Route path="role" component={Role} onEnter={requireCredentials} />
      </Route>
      <Route path="font-size-converter" component={FontSizeConverter} />
      <Route path="qrcode" component={Code} />
      <Route path="login" component={Login} />
      <Route path="topic" component={Topic} onEnter={requireCredentials}>
        <IndexRoute component={TopicConfig} onEnter={requireCredentials} />
        <Route path="new" component={TopicDetailNew} onEnter={requireCredentials} />
        <Route path="config" component={TopicConfig} onEnter={requireCredentials} />
      </Route>
      <Route path="topic/:id" component={Topic} onEnter={requireCredentials}>
        <Route path="share/:sid" component={TopicDetailEdit} onEnter={requireCredentials} />
      </Route>
    </Route>
  </Router>,
  document.getElementById('root'));
