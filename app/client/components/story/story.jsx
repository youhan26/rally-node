/**
 * Created by YouHan on 2016/8/29.
 */

/* @flow */
"use strict";

require('./../../style/story.css');

import {Motion, spring} from "react-motion";
import React from "react";
import {Tabs} from "antd";
import StoryDetails from "./storyDetail";
import TaskList from "./task/taskList";
import TestCases from "./testCase";
import Defects from "./defect/defectList";

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
    getInitialState (){
        return {
            id: this.props.params.id,
            owner: null
        }
    },
    ownerChange(value){
        this.state.owner = value;
        this.setState(this.state);
    },
    render() {
        return (
            <div className="story-content">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Details" key="1">
                        <StoryDetails storyId={this.state.id} ownerChange={this.ownerChange}/>
                    </TabPane>
                    <TabPane tab="Tasks" key="2" disabled={this.state.id ? false : true}>
                        <TaskList storyId={this.state.id}
                               owner={this.state.owner}
                        />
                    </TabPane>
                    <TabPane tab="Defects" key="3" disabled={this.state.id ? false : true}>
                        <Defects storyId={this.state.id}/>
                    </TabPane>
                    <TabPane tab="Test Cases" key="4" disabled={this.state.id ? false : true}>
                        <TestCases storyId={this.state.id}/>
                    </TabPane>
                </Tabs>
                <Test/>
            </div>
        )
    }
});


export default Story;