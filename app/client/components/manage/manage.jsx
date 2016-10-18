***REMOVED***
 * Created by YouHan on 2016/9/19.
***REMOVED***
/* @flow***REMOVED***
"use strict";

require('./../../style/manage.css');

import React from "react";
import {Tabs} from "antd";
import Project from "./project";
import Team from "./team";
import Member from "./member";
import Role from "./role";

const router = require('react-router');
const Link = router.Link;

const TabPane = Tabs.TabPane;

const Management = React.createClass({
    render() {
        return (
            <div className="manage">
                <Tabs defaultActiveKey="1" tabPosition={'left'} style={{
                    backgroundColor : 'white',
                    height : '100%'
                }}>
                    <TabPane tab={
                        <Link to="/manage/project">Project</Link>
                    } key="1" className='tab-panel'>
                        <Project/>
                    </TabPane>
                    <TabPane tab={
                        <Link to="/manage/team">Team</Link>
                    } key="2" className='tab-panel'>
                        <Team/>
                    </TabPane>
                    <TabPane tab={
                        <Link to="/manage/member">Member</Link>
                    } key="3" className='tab-panel'>
                        <Member/>
                    </TabPane>
                    <TabPane tab={
                        <Link to="/manage/role">Role</Link>
                    } key="4" className='tab-panel'>
                        <Role/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
***REMOVED***

export default Management;