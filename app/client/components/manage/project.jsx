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
                                { this.props.release ? 'Release ' + this.props.release.number : '无'}
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
                        </Col>
                        <Col span={8}>
                            <FormItem
                                label="Owner Team"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <CommonSelect url="/team/all" onChange={teamChange} value={this.props.teamId}/>
                            </FormItem>
                            <FormItem>
                                {this.props.id ?
                                    <Button type="primary" onClick={clickRelease}
                                            style={{marginRight: '12px'}}>{'Update Release'}</Button>
                                    : null}
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
        var dates = [];
        if (this.props.release) {
            dates.push(moment(this.props.release.startDate).add(1, 'day'));
        }
        return {
            dates: dates
        }
    },
    modalCancel(){
        this.cleanModal();
        this.setState(this.state);
        this.props.closeModal();
    },
    modalOk(){
        const me = this;
        api.Release.save({
            startDate: this.state.dates[0].toDate(),
            endDate: this.state.dates[1].toDate(),
            projectId: this.props.project.id,
            currentReleaseId: this.props.project.currentReleaseId
        }).then((res) => {
            if (res && res.success) {
                this.props.closeModal();
                me.cleanModal();
                me.setState(me.state);
                me.props.refresh();
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
        return <Modal title={'Project : '+ this.props.project.name} visible={this.props.visible}
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
            release: null,
            visible: false
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
        this.state.visible = true;
        this.setState(this.state);
    },
    closeModal(){
        this.state.visible = false;
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
                    refresh={this.loadData}
                    closeModal={this.closeModal}
                    visible={this.state.visible}
                />
                    : null}
            </div>
        );
    }
});


export default Project;