/**
 * Created by YouHan on 2016/8/29.
 */

/* @flow */
"use strict";

require('./../../style/story.css');

import {Motion, spring} from "react-motion";
import React from "react";
import {Card, Form, message, Input, DatePicker, Tabs, InputNumber} from "antd";
import StoryDetails from "./storyDetail";
import Tasks from "./tasks";
import TestCases from "./testCase";
import Defects from "./defect";

const TabPane = Tabs.TabPane;


const Test = React.createClass({
    render() {
        return (
            <Motion defaultStyle={{x: 0}} style={{x: spring(10)}}>
                {/* TODO warn for the Motion flow check error*/}
                {value => <div>{value.x}</div>}
            </Motion>
        )
    }
});

const Story = React.createClass({
    render() {
        return (
            <div className="story-content">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Details" key="1">
                        <StoryDetails id={this.props.params.id}/>
                    </TabPane>
                    <TabPane tab="Tasks" key="2">
                        <Tasks id={this.props.params.id}/>
                    </TabPane>
                    <TabPane tab="Defects" key="3">
                        <Defects id={this.props.params.id}/>
                    </TabPane>
                    <TabPane tab="Test Cases" key="4">
                        <TestCases id={this.props.params.id}/>
                    </TabPane>
                </Tabs>
                <Test/>
            </div>
        )
    }
});


export default Story;