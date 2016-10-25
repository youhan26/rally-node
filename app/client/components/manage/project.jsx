/* @flow */
"use strict";

import React, {PropTypes} from "react";
import Api from "../api";
import {Form, Input, Button, Card, Col, Row, message} from "antd";
import type {res} from "./../common/types";
import {ProjectStatus, ReleaseSelect} from "./../common/constSelect";
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
        const {nameChange, teamChange, statusChange, releaseChange, save} = {...this.props};
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
                                <ReleaseSelect value={this.props.current_release_id} projectId={this.props.id}
                                               onChange={releaseChange}
                                               disabled={false}/>
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
                                <Button type="primary">Add Release</Button>
                                : null
                            }
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
                });
                this.setState({
                    list: [{
                        name: '',
                        status: '1',
                        release_interval: 2,
                        release_unit: '1',
                        team_id: null
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
    render() {
        return (
            <div className="project-manage">
                {this.state.list.map((item, key)=> {
                    return (
                        <Item key={key}
                              id={item.id || null}
                              name={item.name}
                              status={item.status}
                              team_id={item.team_id}
                              nameChange={this.change.bind(this,key, 'name')}
                              statusChange={this.change.bind(this,key, 'status')}
                              teamChange={this.change.bind(this, key, 'team_id')}
                              releaseChange={this.change.bind(this, key, 'current_release_id')}
                              save={this.save.bind(this, key)}
                        />
                    );
                })}
            </div>
        );
    }
});


export default Project;