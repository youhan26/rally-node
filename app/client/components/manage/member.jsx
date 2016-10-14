/**
 * Created by YouHan on 2016/9/19.
 */
/* @flow */
"use strict";

import React, {PropTypes} from "react";
import {Form, Input, Card, Col, Row, Button, message} from "antd";
import Api from "./../api";
import CommonSelect from "./../common/commonSelect";
import type {memberData} from "./../common/types";

const FormItem = Form.Item;

const Item = React.createClass({
    propTypes: {
        name: PropTypes.string,
        role_id: PropTypes.any,
        introduction: PropTypes.string,
        id: PropTypes.any
    },
    getDefaultProps(){
        return {
            name: '',
            role_id: undefined,
            introduction: '',
            id: undefined
        }
    },
    render() {
        const {nameChange, descChange, save, roleSelect} = this.props;

        return (
            <Card style={{
                    marginBottom : '15px'
                }}>
                <Form horizontal>
                    <Row gutter={0}>
                        <Col span={8}>
                            <FormItem
                                label="Member Name"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <Input size="default" value={this.props.name}
                                       onChange={nameChange}
                                />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <FormItem
                                label='Role'
                                labelCol={{span :10}}
                                wrapperCol={{span :14}}
                            >
                                <CommonSelect value={this.props.role_id}
                                              onChange={roleSelect}
                                              url="/role/all"/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={0}>
                        <Col span={16}>
                            <FormItem
                                label="Member Description"
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

const Member = React.createClass({
    emptyObj: {
        name: '',
        introduction: '',
        id: undefined,
        role_id: undefined
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
        Api.Member.get().then((res: {success: boolean, data: memberData}) => {
            if (res && res.data) {
                me.setState({
                    list: [this.emptyObj].concat(res.data)
                })
            }
        });
    },
    save(key: number){
        var me = this;
        Api.Member.save(this.state.list[key]).then((res) => {
                if (res && res.success) {
                    message.success('Save Success!');
                    me.loadData();
                }
            });
    },
    nameChange (key: number, e: {target : {value : string}}){
        this.state.list[key].name = e.target.value;
        this.setState(this.state);
    },
    descChange(key: number, e: {target:{value : string}}){
        this.state.list[key].introduction = e.target.value;
        this.setState(this.state)
    },
    roleSelect(key: number, value: number){
        this.state.list[key].role_id = value;
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
                        <Item id={item.id} key={key}
                              introduction={item.introduction}
                              role_id={item.role_id}
                              name={item.name}
                              save={this.save.bind(this, key)}
                              nameChange={this.nameChange.bind(this, key)}
                              descChange={this.descChange.bind(this, key)}
                              roleSelect={this.roleSelect.bind(this, key)}
                        />
                    )
                })}
            </div>
        )
    }
});

export default Member;