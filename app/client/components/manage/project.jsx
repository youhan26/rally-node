"use strict";
/* @flow***REMOVED***

import React from "react";
import Api from "../api";
import {Form, Input, Checkbox, Radio, Tooltip, Icon, Tabs, Card, Col, Row, DatePicker} from "antd";
import type {res} from "./../common/types";
const FormItem = Form.Item;

const Project = React.createClass({
    getInitialState(){
        return {
            project: '',
            list: []
        }
    },
    addProject() {
        var project = this.state.project;
        if (project) {
            Api.Project.add({
                name: project,
                teamId: 1,
            }).then(res=> {
                debugger;
            }, error=> {
                debugger;
            ***REMOVED***
        }
    },
    componentWillMount() {
        this.loadData();
    },
    loadData() {
        Api.Project.get().then((res: res) => {
            if (res && res.success) {
                this.setState({
                    list: res.data
                ***REMOVED***
            }
        })
    },
    render() {
        return (
            <div className="project-manage">
                {this.state.list.map((item, key)=> {
                    return (
                        <Item data={item} key={key}/>
                    );
                })}
            </div>
        );
    }
***REMOVED***

const Item = React.createClass({
    render() {
        return (
            <Card
                title={this.props.data.name}
                bordered={false}
                style={{ marginBottom : '20px' }}>
                <Form horizontal>
                    <Row gutter={16}>
                        <Col sm={8}>
                            <FormItem
                                label="Search name"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <Input placeholder="Please input the search name" size="default"/>
                            </FormItem>
                            <FormItem
                                label="Long search name"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <DatePicker size="default"/>
                            </FormItem>
                            <FormItem
                                label="Search name"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <Input placeholder="Please input the search name" size="default"/>
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem
                                label="Search name"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <Input placeholder="Please input the search name" size="default"/>
                            </FormItem>
                            <FormItem
                                label="Long search name"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <DatePicker size="default"/>
                            </FormItem>
                            <FormItem
                                label="Search name"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <Input placeholder="Please input the search name" size="default"/>
                            </FormItem>
                        </Col>
                        <Col sm={8}>
                            <FormItem
                                label="Search name"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <Input placeholder="Please input the search name" size="default"/>
                            </FormItem>
                            <FormItem
                                label="Long search name"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <DatePicker size="default"/>
                            </FormItem>
                            <FormItem
                                label="Search name"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <Input placeholder="Please input the search name" size="default"/>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Card>
        )
    }
***REMOVED***

export default Project;