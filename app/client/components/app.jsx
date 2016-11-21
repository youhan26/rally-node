/**
 * Created by YouHan on 2016/8/22.
 */
import React from "react";
import Render from "react-dom";
import {Router, hashHistory, Route, IndexRoute} from "react-router";
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

require('./../style/basic.css');

// 推荐在入口文件全局设置 locale 与时区
moment.locale('zh-cn');
// 从 https://github.com/moment/moment-timezone/blob/develop/data/packed/latest.json 复制
moment.tz.add('Asia/Shanghai|CST CDT|-80 -90|01010101010101010|-1c1I0 ' +
  'LX0 16p0 1jz0 1Myp0 Rb0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0|23e6');
moment.tz.setDefault('Asia/Shanghai');

Raven.config('https://b11a5932031d459dbd521ecbc9895977@sentry.io/112807').install();

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user: ''
    };
  }
  
  render() {
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex'
        }}
      >
        <HorizonHeader user={this.state.user} />
        {this.props.children}
      </div>
    );
  }
}


const requireCredentials = (nextState, replace, next) => {
  const token = localStorage.user;
  if (!token) {
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
    </Route>
  </Router>,
  document.getElementById('root'));
