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

const TabPane = Tabs.TabPane;

const Management = React.createClass({
    render() {
        return (
            <div className="manage">
                <Tabs defaultActiveKey="1" tabPosition={'left'} style={{
                    backgroundColor : 'white',
                    height : '100%'
                }}>
                    <TabPane tab='Project' key="1" className='tab-panel'>
                        <Project/>
                    </TabPane>
                    <TabPane tab="Team" key="2" className='tab-panel'>
                        <Team/>
                    </TabPane>
                    <TabPane tab="Member" key="3" className='tab-panel'>
                        <Member/>
                    </TabPane>
                    <TabPane tab="Role" key="4" className='tab-panel'>
                        <Role/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
***REMOVED***

export default Management;