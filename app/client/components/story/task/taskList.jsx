***REMOVED***
 * Created by YouHan on 2016/8/29.
***REMOVED***

/* @flow***REMOVED***
"use strict";

require('./../../../style/task.css');


import React from "react";
import {Card, Form, message, Input, DatePicker, Tabs, InputNumber, Table, Button, notification} from "antd";
import CommonSelect from "./../../common/commonSelect";
import {TaskStatus} from "./../../common/constSelect";
import Api from './../../api';

const FormItem = Form.Item;

const TaskList = React.createClass({
    getInitialState(){
        return {
            data: [],
            loading: false
        }
    },
    componentWillMount(){
        this.loadData();
    },
    loadData(){
        this.state.loading = true;
        this.setState(this.state);
        Api.Task.get().then((result) => {
            var data = result.data;
            if (data && data.length > 0) {
                data.forEach((item) => {
                    item.key = item.id;
                    item.status = '' + item.status;
                ***REMOVED***
            }
            this.setState({
                data: data,
                loading: false
            })
        ***REMOVED***
    },
    save(index){
        notification['info']({
            message: '正在保存',
            duration: 1,
        ***REMOVED***
        Api.Task.save(this.state.data[index])
            .then((res) => {
                if (res.success) {
                    notification['success']({
                        message: '保存成功',
                        duration: 1,
                    ***REMOVED***
                } else {
                    message.error('Error happen when save!');
                }
            ***REMOVED***
    },
    change(index, field, e){
        this.state.data[index][field] = (e.target ? e.target.value : e);
        // this.save(this.state.data[index]);
        this.setState(this.state);
    },
    render(){
        const columns = [{
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (value, record, index) => {
                return <Input className="full-width" value={value}
                              onBlur={this.save.bind(this, index)}
                              onChange={this.change.bind(this, index, 'title')}/>
            }
        }, {
            title: 'Owner',
            dataIndex: 'ownerId',
            key: 'ownerId',
            render: (value, record, index) => {
                return <CommonSelect value={value} url="/member/all" className="full-width"
                                     onBlur={this.save.bind(this, index)}
                                     onChange={this.change.bind(this, index, 'ownerId')}/>
            }
        }, {
            title: 'Task Est',
            dataIndex: 'est',
            key: 'est',
            width: 140,
            render: (value, record, index) => {
                return <InputNumber value={value} className="full-width"
                                    onBlur={this.save.bind(this, index)}
                                    onChange={this.change.bind(this, index, 'est')}/>
            }
        }, {
            title: 'TODO Est',
            dataIndex: 'todo',
            key: 'todo',
            width: 140,
            render: (value, record, index) => {
                return <InputNumber value={value} className="full-width"
                                    onBlur={this.save.bind(this, index)}
                                    onChange={this.change.bind(this, index, 'todo')}/>
            }
        }, {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 140,
            render: (value, record, index) => {
                return <TaskStatus value={value} className="full-width"
                                   onBlur={this.save.bind(this, index)}
                                   onChange={this.change.bind(this, index, 'status')}/>
            }
        }];
        return <div style={{
                margin : '12px 0',
                backgroundColor: 'white'
            }}>
            <Table
                pagination={false}
                size="small"
                columns={columns}
                dataSource={this.state.data}
                loading={this.state.loading}
                className="task-list-table"
            />
        </div>;
    }
***REMOVED***


export default TaskList;