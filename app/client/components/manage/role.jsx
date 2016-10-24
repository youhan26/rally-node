/**
 * Created by YouHan on 2016/9/19.
 */

/* @flow */
"use strict";

import React, {PropTypes} from "react";
import {Form, Input, Card, Col, Row, Button, message} from "antd";
import Api from "./../api";
import type {res} from "./../common/types";

const FormItem = Form.Item;

const Item = React.createClass({
    getDefaultProps(){
        return {
            id: undefined,
            name: '',
            introduction: ''
        }
    },
    propsType: {
        name: PropTypes.string,
        id: PropTypes.any,
        introduction: PropTypes.string
    },
    render() {
        const {nameChange, descChange, save} = this.props;

        return (
            <Card style={{
                    marginBottom : '15px'
                }}>
                <Form horizontal>
                    <Row gutter={0}>
                        <Col span={8}>
                            <FormItem
                                label="Role Name"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <Input size="default" value={this.props.name}
                                       onChange={nameChange}
                                />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={0}>
                        <Col span={16}>
                            <FormItem
                                label="Role Introduction"
                                labelCol={{span : 5}}
                                wrapperCol={{span : 19}}
                            >
                                <Input type="textarea" rows={4} value={this.props.introduction}
                                       onChange={descChange}/>
                            </FormItem>
                        </Col>
                        <Col span="8" offset={8}>
                            <FormItem
                                labelCol={{span : 10}}
                                wrapperCol={{span : 14}}
                            >
                                <Button type="primary" onClick={save}>{
                                    this.props.id ? 'Update' : 'Save'
                                }</Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Card>
        )
    }
});

const Role = React.createClass({
    emptyObj: {
        name: '',
        id: undefined,
        introduction: ''
    },
    getInitialState(){
        return {
            list: [this.emptyObj]
        }
    },
    componentWillMount() {
        this.loadData();
    },
    loadData (){
        var me = this;
        Api.Role.get().then((res: {success :boolean, data:[]}) => {
            if (res && res.data) {
                me.setState({
                    list: [me.emptyObj].concat(res.data)
                })
            }
        });
    },
    save(key: number){
        var me = this;
        Api.Role.save(this.state.list[key]).then((res: res) => {
            if (res && res.success) {
                message.success('Save Success!');
                me.loadData();
            }
        });
    },
    nameChange (key: number, e: {target:{value : string}}){
        this.state.list[key].name = e.target.value;
        this.setState(this.state);
    },
    descChange(key: number, e: {target:{value : string}}){
        this.state.list[key].introduction = e.target.value;
        this.setState(this.state);
    },
    render() {
        return (
            <div style={{
                padding : '12px 30px',
                width : '100%',
                height : window.innerHeight,
                overflow : 'auto'
            }}>
                {this.state.list.map((item, key) => {
                    return (
                        <Item key={key} id={item.id}
                              name={item.name}
                              introduction={item.introduction}
                              save={this.save.bind(this, key)}
                              nameChange={this.nameChange.bind(this, key)}
                              descChange={this.descChange.bind(this, key)}
                        />
                    )
                })}
            </div>
        )
    }
});

export default Role;