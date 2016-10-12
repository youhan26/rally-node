/* @flow */
'use strict';

import React from "react";
import {Card, Form, Row, Col, Input} from "antd";

const FormItem = Form.Item;


const FontSizeConverter = React.createClass({
    render (){
        return <div style={{width : '100%',
            padding : '20px'
        }}>
            <Card style={{ width: '100%' }}>
                <Form horizontal>
                    <Row>
                        <Col span="8">
                            <FormItem
                                label="页面宽度3"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <Input id="control-input" placeholder="Please enter..."/>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem
                                label="input control"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <Input id="control-input" placeholder="Please enter..."/>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem
                                label="input control"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <Input id="control-input" placeholder="Please enter..."/>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>


            </Card>
        </div>
    },

});


export default  FontSizeConverter;