/* @flow */
"use strict";

import React, {PropTypes} from "react";
import Api from "../api";
import {Form, Input, Button, Card, Col, Row, message, Modal, DatePicker} from "antd";
import type {res} from "./../common/types";
import {ProjectStatus} from "./../common/constSelect";
import CommonSelect from "./../common/commonSelect";
import moment from "moment";
import api from "./../api";

const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;


const Item = React.createClass({
    propTypes: {
        id: PropTypes.any,
        name: PropTypes.string,
        status: PropTypes.string,
        teamId: PropTypes.any,
        currentReleaseId: PropTypes.any
    },
    getDefaultProps(){
        return {
            name: '',
            status: '1',
            teamId: null
        }
    },
    render() {
        const {nameChange, teamChange, statusChange, clickRelease, save} = {...this.props};
        return (
            <Card
                bordered={false}
                style={{ marginBottom : '15px' }}>
                <Form horizontal>
                    <Row gutter={16}>
                        <Col span={8}>
                            <FormItem
                                label="Project name"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <Input value={this.props.name} onChange={nameChange}/>
                            </FormItem>
                            {this.props.id ? <FormItem
                                label="Current Release"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                {'Release ' + this.props.release.number}
                            </FormItem> : null}
                        </Col>
                        <Col span={8}>
                            <FormItem
                                label="Project Status"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <ProjectStatus value={this.props.status} onChange={statusChange}/>
                            </FormItem>
                            {this.props.id ?
                                <Button type="primary" onClick={clickRelease}>Next Release</Button>
                                : null
                            }
                        </Col>
                        <Col span={8}>
                            <FormItem
                                label="Owner Team"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <CommonSelect url="/team/all" onChange={teamChange} value={this.props.teamId}/>
                            </FormItem>
                            <FormItem
                                label=" "
                                labelCol={{span : 10}}
                                wrapperCol={{span : 14}}
                            >
                                <Button type="primary" onClick={save}>
                                    {this.props.id ? 'Update' : 'Add'}
                                </Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Card>
        )
    }
});


const ReleaseModal = React.createClass({
    getInitialState(){
        return {
            visible: true,
            dates: []
        }
    },
    modalCancel(){
        this.state.visible = false;
        this.cleanModal();
        this.setState(this.state);
    },
    modalOk(){
        const me = this;
        api.Release.save({
            startDate: this.state.dates[0].toDate(),
            endDate: this.state.dates[1].toDate(),
            projectId: this.props.project.id,
            number: this.props.release.number + 1
        }).then((res) => {
            if (res && res.success) {
                me.state.visible = false;
                me.cleanModal();
                me.setState(me.state);
                message.success('Save Successfully');
            } else {
                message.error(res.reason);
            }
        });
    },
    cleanModal(){
        this.state.dates = [];
    },
    onChange(dates){
        this.state.dates = dates;
        this.setState(this.state);
    },
    render(){
        const format = "YYYY-MM-DD";
        return <Modal title={this.props.project.name} visible={this.state.visible}
                      onOk={this.modalOk}
                      maskClosable={false}
                      onCancel={this.modalCancel}
        >
            {this.props.release ?
                <Row>
                    <Col span="12">
                        <FormItem
                            label="Current Start Date"
                            labelCol={{span : '10'}}
                            wrapperCol={{span : '14'}}
                        >
                            <DatePicker value={moment(this.props.release.startDate,format)} disabled={true}/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem
                            label="End Date"
                            labelCol={{span : '10'}}
                            wrapperCol={{span : '14'}}
                        >
                            <DatePicker value={moment(this.props.release.endDate,format)} disabled={true}/>
                        </FormItem>
                    </Col>
                </Row> : null}
            <Row>
                <Col span="24">
                    <FormItem
                        label="Next Release Date"
                        labelCol={{span : '5'}}
                        wrapperCol={{span : '14'}}
                    >
                        <RangePicker onChange={this.onChange} value={this.state.dates}/>
                    </FormItem>
                </Col>
            </Row>
        </Modal>
    }
});


const Project = React.createClass({
    getInitialState(){
        return {
            list: [{
                name: '',
                status: '1',
                teamId: undefined
            }],
            project: null,
            release: null
        }
    },
    componentWillMount() {
        this.loadData();
    },
    loadData() {
        Api.Project.get().then((res: res) => {
            if (res && res.success) {
                res.data.forEach(function (item) {
                    item.status = '' + item.status;
                });
                this.setState({
                    list: [{
                        name: '',
                        status: '1',
                        teamId: null
                    }].concat(res.data)
                });
            } else {
                message.error(res.reason);
            }
        })
    },
    save (key: number){
        var me = this;
        Api.Project.save(this.state.list[key]).then((res) => {
            if (res && res.success) {
                message.success('Save Success!');
                me.loadData();
            } else {
                message.error(res.reason);
            }
        });
    },
    change(key, field, e){
        this.state.list[key][field] = (e.target ? e.target.value : e);
        this.setState(this.state);
    },
    clickRelease(item){
        this.state.project = item;
        this.state.release = item.release;
        this.setState(this.state);
    },
    render() {
        return (
            <div className="project-manage">
                {this.state.list.map((item, key)=> {
                    return (
                        <Item key={key}
                              id={item.id || null}
                              name={item.name}
                              status={item.status}
                              teamId={item.teamId}
                              release={item.release}
                              nameChange={this.change.bind(this,key, 'name')}
                              statusChange={this.change.bind(this,key, 'status')}
                              teamChange={this.change.bind(this, key, 'teamId')}
                              clickRelease={this.clickRelease.bind(this, item)}
                              save={this.save.bind(this, key)}
                        />
                    );
                })}
                {this.state.project ? <ReleaseModal
                    project={this.state.project}
                    release={this.state.release}
                />
                    : null}
            </div>
        );
    }
});


export default Project;