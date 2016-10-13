/**
 * Created by YouHan on 2016/9/19.
 */
/* @flow */
"use strict";

import React from "react";
import {Form, Input, Card, Col, Row, Button, message} from "antd";
import Api from "./../api";

const FormItem = Form.Item;

const Item = React.createClass({
    getDefaultProps(){
        return {
            data: {}
        }
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
                                label="Member Name"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <Input size="default" value={this.props.data.name}
                                       onChange={nameChange}
                                />
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
                                <Input type="textarea" rows={4} value={this.props.data.introduction}
                                       onChange={descChange}/>
                            </FormItem>
                        </Col>
                        <Col span="8" offset={8}>
                            <FormItem
                                labelCol={{span : 10}}
                                wrapperCol={{span : 14}}
                            >
                                <Button type="primary" onClick={save}>{
                                    this.props.data.id ? 'Update' : 'Save'
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
    getInitialState(){
        return {
            list: [],
            obj: {}
        }
    },
    componentWillMount() {
        this.loadData();
    },
    loadData (){
        Api.Member.get().then((res) => {
            if (res && res.data) {
                this.setState({
                    list: res.data,
                    obj: {}
                })
            }
        });
    },
    save(key){
        var me = this;
        if (key) {
            Api.Member.update(this.state.list[key - 1]).then((res) => {
                if (res && res.success) {
                    message.success('Save Success!');
                    me.loadData();
                }
            });
        } else {
            Api.Member.add({
                name: this.state.obj.name,
                introduction: this.state.obj.introduction
            }).then((res) => {
                if (res && res.success) {
                    message.success('Save Success!');
                    me.loadData();
                }
            });
        }
    },
    nameChange (key, e){
        var value = e.target.value;
        if (key) {
            this.state.list[key - 1].name = value;
        } else {
            this.state.obj.name = value;
        }
        this.setState(this.state);
    },
    descChange(key, e){
        var value = e.target.value;
        if (key) {
            this.state.list[key - 1].introduction = value;
        } else {
            this.state.obj.introduction = value;
        }
        this.setState(this.state)
    },
    render() {
        return (
            <div style={{
                padding : '12px 30px',
                width : '100%',
                height : window.innerHeight,
                overflow : 'auto'
            }}>
                <Item save={this.save.bind(this, null)}
                      nameChange={this.nameChange.bind(this, null)}
                      descChange={this.descChange.bind(this, null)}
                      data={this.state.obj}
                />
                {this.state.list.map((item, key) => {
                    return (
                        <Item data={item} key={key}
                              save={this.save.bind(this, key+1)}
                              nameChange={this.nameChange.bind(this, key+1)}
                              descChange={this.descChange.bind(this, key+1)}
                        />
                    )
                })}
            </div>
        )
    }
});

export default Member;