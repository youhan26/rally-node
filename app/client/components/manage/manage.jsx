/**
 * Created by YouHan on 2016/9/19.
 */
/* @flow */
import React from "react";
import {Link} from 'react-router';
import {Tabs} from "antd";
import Project from "./project";
import Team from "./team";
import Member from "./member";
import Role from "./role";

require('./../../style/manage.css');

const TabPane = Tabs.TabPane;

const Management = () => {
  return (
    <div className="manage">
      <Tabs
        defaultActiveKey="1"
        tabPosition={'top'}
        style={{ backgroundColor: 'white', height: '100%' }}
      >
        <TabPane
          tab={<Link to="/manage/project">Project</Link>}
          key="1"
          className="tab-panel"
        >
          <Project />
        </TabPane>
        <TabPane
          tab={<Link to="/manage/team">Team</Link>}
          key="2"
          className="tab-panel"
        >
          <Team />
        </TabPane>
        <TabPane
          tab={<Link to="/manage/member">Member</Link>}
          key="3"
          className="tab-panel"
        >
          <Member />
        </TabPane>
        <TabPane
          tab={<Link to="/manage/role">Role</Link>}
          key="4"
          className="tab-panel"
        >
          <Role />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Management;
