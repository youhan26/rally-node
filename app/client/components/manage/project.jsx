/* @flow***REMOVED***
"use strict";

import React, {PropTypes} from "react";
import Api from "../api";
import {Form, Input, Button, Card, Col, Row, message} from "antd";
import type {res, event} from "./../common/types";
import {ProjectStatus, ReleaseIntervalUnit} from "./../common/constSelect";
import CommonSelect from "./../common/commonSelect";

const FormItem = Form.Item;


const Item = React.createClass({
    propTypes: {
        id: PropTypes.any,
        name: PropTypes.string,
        status: PropTypes.string,
        release_interval: PropTypes.number,
        release_unit: PropTypes.string,
        team_id: PropTypes.any
    },
    getDefaultProps(){
        return {
            name: '',
            status: '1',
            release_interval: 2,
            release_unit: '1',
            team_id: null
        }
    },
    render() {
        const {nameChange, teamChange, statusChange, intervalChange, unitChange, save} = {...this.props};
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
                            <FormItem
                                label="Interval Unit"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <ReleaseIntervalUnit value={this.props.release_unit} onChange={unitChange}/>
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                label="Project Status"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <ProjectStatus value={this.props.status} onChange={statusChange}/>
                            </FormItem>
                            <FormItem
                                label="Release Interval"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <Input value={this.props.release_interval} onChange={intervalChange}/>
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                label="Owner Team"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <CommonSelect url="/team/all" onChange={teamChange} value={this.props.team_id}/>
                            </FormItem>
                            <FormItem
                                label=" "
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
***REMOVED***


const Project = React.createClass({
    getInitialState(){
        return {
            list: [{
                name: '',
                status: '1',
                release_interval: 2,
                release_unit: '1',
                team_id: undefined
            }]
        }
    },
    componentWillMount() {
        this.loadData();
    },
    loadData() {
        Api.Project.get().then((res: res) => {
            if (res && res.success) {
                res.data.forEach(function (item) {
                    item.release_unit = '' + item.release_unit;
                    item.status = '' + item.status;
                ***REMOVED***
                this.setState({
                    list: [{
                        name: '',
                        status: '1',
                        release_interval: 2,
                        release_unit: '1',
                        team_id: null
                    }].concat(res.data)
                ***REMOVED***
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
        ***REMOVED***
    },
    nameChange (key: number, e: event){
        this.state.list[key].name = e.target.value;
        this.setState(this.state);
    },
    statusChange(key: number, value: string){
        this.state.list[key].status = value;
        this.setState(this.state);
    },
    intervalChange(key: number, value: number){
        this.state.list[key].release_interval = value;
        this.setState(this.state);
    },
    unitChange(key: number, value: string){
        this.state.list[key].release_unit = value;
        this.setState(this.state);
    },
    teamChange(key: number, value: number){
        this.state.list[key].team_id = value;
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
                              release_interval={item.release_interval}
                              release_unit={item.release_unit}
                              team_id={item.team_id}
                              nameChange={this.nameChange.bind(this,key)}
                              statusChange={this.statusChange.bind(this,key)}
                              intervalChange={this.intervalChange.bind(this, key)}
                              unitChange={this.unitChange.bind(this, key)}
                              teamChange={this.teamChange.bind(this, key)}
                              save={this.save.bind(this, key)}
                        />
                    );
                })}
            </div>
        );
    }
***REMOVED***


export default Project;