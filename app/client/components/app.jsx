/**
 * Created by YouHan on 2016/8/22.
 */
import React from "react";
import * as Render from "react-dom";
import Raven from "raven-js";
import moment from "moment-timezone/moment-timezone";
import "moment/locale/zh-cn";
import {Router, hashHistory, Route, IndexRoute} from "react-router";
import Share from "./share/share";
import Management from "./manage/manage";
import {HorizonHeader} from "./header";
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


require('./../style/basic.css');

// 推荐在入口文件全局设置 locale 与时区
moment.locale('zh-cn');
// 从 https://github.com/moment/moment-timezone/blob/develop/data/packed/latest.json 复制
moment.tz.add('Asia/Shanghai|CST CDT|-80 -90|01010101010101010|-1c1I0 LX0 16p0' +
  ' 1jz0 1Myp0 Rb0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0|23e6');
moment.tz.setDefault('Asia/Shanghai');
Raven.config('https://b11a5932031d459dbd521ecbc9895977@sentry.io/112807').install();

function logException(ex, context) {
  Raven.captureException(ex, {
    extra: context
  });
}

const App = React.createClass({
  render() {
    try {
      return (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex'
          }}
        >
          <HorizonHeader />
          {this.props.children}
        </div>
      );
    } catch (ex) {
      logException(ex);
    }
  }
});

Render.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="dashboard" component={Dashboard} />
      <Route path="stories" component={StoryList} />
      <Route path="story/:id" component={Story} />
      <Route path="story" component={Story} />
      <Route path="bugs" component={Bug}>
        {/* <IndexRoute component={InboxStats}/>*/}
        {/* <Route path="messages/:id" component={Message}/>*/}
      </Route>
      <Route path="report" component={Report} />
      <Route path="share" component={Share} />
      <Route path="manage" component={Management}>
        <IndexRoute component={Project} />
        <Route path="project" component={Project} />
        <Route path="team" component={Team} />
        <Route path="member" component={Member} />
        <Route path="role" component={Role} />
      </Route>
      <Route path="font-size-converter" component={FontSizeConverter} />
      <Route path="qrcode" component={Code} />
    </Route>
  </Router>, document.getElementById('root'));