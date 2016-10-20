***REMOVED***
 * Created by YouHan on 2016/8/29.
***REMOVED***

/* @flow***REMOVED***
"use strict";

require('./../../style/story.css');

import {Motion, spring} from "react-motion";
import * as uuid from "uuid";
import React from "react";
import {Card, Row, Col, Form, message, Input, DatePicker, Tabs, InputNumber} from "antd";
import CommonSelect from "./../common/commonSelect";
import RichText from "./../common/richText";

const FormItem = Form.Item;
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
***REMOVED***

const StoryContent = React.createClass({
    getInitialState(){
        return {
            title: '',
            desc: '',
            notes: '',
            est: 0,
            todo: 0,
            taskEst: 0,

        }
    },
    titleChange(){

    },
    descChange(){

    },
    render(){
        return <Card style={{
            margin : '12px'
        }}>
            <Form>
                <Row>
                    <Col span="8">
                        <FormItem
                            label="Story Name"
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 19 }}
                        >
                            <Input value={this.state.title} onChange={this.titleChange}/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                            label="Story Description"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <Input value={this.state.desc} onChange={this.descChange}/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                            label="Story Name"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <Input value={this.state.title} onChange={this.titleChange}/>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Card>
    }
***REMOVED***

const StoryDetails = React.createClass({
    getInitialState(){
        const editorId = uuid.v1();
        return {
            title: '',
            desc: '',
            notes: '',
            est: 0,
            todo: 0,
            taskEst: 0,
            editorId: editorId,
            status: ''
        }
    },
    titleChange(){

    },
    descChange(value){
        this.state.desc = value;
        this.setState(this.state);
    },
    onTextChange: function (value) {
        this.setState({desc: value***REMOVED***
    },
    render(){
        return <div>
            <Card style={{marginTop:'6px'}}>
                <Form horizontal>
                    <Row>
                        <Col span="24">
                            <FormItem>
                                <Input value={this.state.title} onChange={this.titleChange}
                                       placeholder="Input Story Name"/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                            <FormItem
                                label="Story Owner"
                                labelCol={{span : 10}}
                                wrapperCol={{ span: 14 }}
                            >
                                <CommonSelect url="/member/all"/>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem
                                label="Project"
                                labelCol={{span : 10}}
                                wrapperCol={{ span: 14 }}
                            >
                                <CommonSelect url="/project/all"/>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem
                                label="Status"
                                labelCol={{span : 10}}
                                wrapperCol={{ span: 14 }}
                            >
                                <span>{this.state.status}</span>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Card>
            <Card style={{marginTop : '6px'}}>
                <Row>
                    <Col span="4">
                        <FormItem
                            label="Plan EST"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <InputNumber value={this.state.est}/>
                        </FormItem>
                    </Col>
                    <Col span="4">
                        <FormItem
                            label="Task EST"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <InputNumber value={this.state.est} disabled={true}/>
                        </FormItem>
                    </Col>
                    <Col span="4">
                        <FormItem
                            label="TODO"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <InputNumber value={this.state.est} disabled={true}/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                            label="Release"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <InputNumber value={this.state.est}/>
                        </FormItem>
                    </Col>
                </Row>
            </Card>
            <Card style={{marginTop: '6px'
            }}>
                <RichText style={{
                    width : '100%',
                    height : '300px'
                }} placeholder='Input Description of Story....' onChange={this.descChange} value={this.state.desc}/>
                <Input type="textarea" rows="4"/>
            </Card>
        </div>
    }
***REMOVED***


const Story = React.createClass({
    render() {
        return (
            <div className="story-content">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Details" key="1">
                        <StoryDetails/>
                    </TabPane>
                    <TabPane tab="Tasks" key="2"></TabPane>
                    <TabPane tab="Defects" key="3"></TabPane>
                    <TabPane tab="Test Cases" key="4"></TabPane>
                </Tabs>
                <Test/>
            </div>
        )
    }
***REMOVED***

const Quill = require('quill');
const quill = new Quill(document.getElementById('editor'), {
    modules: {
        toolbar: [
            [{header: [1, 2, false]}],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block']
        ]
    },
    placeholder: 'Compose an epic...',
    theme: 'snow' // or 'bubble'
***REMOVED***


export default Story;