'use strict';

require('./../../style/storyList.css');

import React from "react";
import {Card, Row, Col, Form, Button, message, Input, DatePicker} from "antd";

const FormItem = Form.Item;

const StorySearch = React.createClass({
    render(){
        return <Card style={{
                    margin: '12px'
                }}>
            <Form horizontal className="ant-advanced-search-form">
                <Row>
                    <Col span={8}>
                        <FormItem
                            label="Story title"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <Input placeholder="Please input the search name" size="default"/>
                        </FormItem>
                        <FormItem
                            label="Story Status"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <DatePicker size="default"/>
                        </FormItem>

                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="Create Time From"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <DatePicker size="default"/>
                        </FormItem>

                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="Create Time To"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <DatePicker size="default"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <FormItem
                            label="qa"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <Input placeholder="Please input the search name" size="default"/>
                        </FormItem>
                        <FormItem
                            label="rd"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <DatePicker size="default"/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                            label="pm"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <DatePicker size="default"/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem
                            label="fe"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <DatePicker size="default"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} offset={12} style={{ textAlign: 'right' }}>
                        <Button type="primary" style={{
                            marginRight : '12px'
                        }}>Search</Button>
                        <Button>Clear</Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    }
});

var StoryList = React.createClass({
    render: function () {
        var style = {
            width: '100%',
            height: '100%',
            backgroundColor: '#eee'
        };
        return (
            <div style={style}>
                <StorySearch/>
                this is story list page</div>
        )
    }
});

export default StoryList;