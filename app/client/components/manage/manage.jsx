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

const TabPane = Tabs.TabPane;

class Member extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                this is member
            </div>
        )
    }
}

class Role extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                this is role
            </div>
        )
    }
}


class Management extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="manage">
                <Tabs defaultActiveKey="1" tabPosition={'left'} style={{
                    backgroundColor : 'white',
                    height : '100%'
                }}>
                    <TabPane tab='Project' key="1">
                        <Project></Project>
                    </TabPane>
                    <TabPane tab="Team" key="2">
                        <Team></Team>
                    </TabPane>
                    <TabPane tab="Member" key="3">
                        <Member></Member>
                    </TabPane>
                    <TabPane tab="Role" key="4">
                        <Role></Role>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default Management;