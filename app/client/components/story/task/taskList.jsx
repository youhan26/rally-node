/**
 * Created by YouHan on 2016/8/29.
 */

/* @flow */
"use strict";

require('./../../../style/task.css');


import React from "react";
import {Card, Form, message, Input, DatePicker, Tabs, InputNumber, Table, notification, Button} from "antd";
import CommonSelect from "./../../common/commonSelect";
import {TaskStatus} from "./../../common/constSelect";
import Api from "./../../api";
import {basic} from "mimikiyru-utils";

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
            const data = result.data;
            if (data && data.length > 0) {
                data.forEach((item) => {
                    item.key = item.id;
                    item.status = '' + item.status;
                });
            }
            this.oriData = [];
            basic.baseExtend(this.oriData, [data], true);
            this.setState({
                data: data,
                loading: false
            });
        });
    },
    getEmptyData(){
        return {
            title: '',
            ownerId: undefined,
            est: 0,
            todo: 0,
            status: '1'
        };
    },
    save(index, field){
        if (field) {
            if (this.oriData[index][field] == this.state.data[index][field]) {
                return;
            }
            this.oriData[index][field] = this.state.data[index][field];
        }
        notification['info']({
            message: 'Saving',
            duration: 1,
        });
        Api.Task.save(this.state.data[index])
            .then((res) => {
                if (res.success) {
                    notification['success']({
                        message: 'Saved Successfully',
                        duration: 1,
                    });
                } else {
                    message.error('Error happen when save!');
                }
            });
    },
    remove(index){
        const me = this;
        Api.Task.del(this.state.data[index].id).then(function (res) {
            if (res && res.success) {
                notification['success']({
                    message: 'Remove Successfully',
                    duration: 1,
                });
                me.loadData();
            }
        });
    },
    change(index, field, e){
        const newValue = (e.target ? e.target.value : e);
        const oldValue = this.state.data[index][field];
        if (oldValue != newValue) {
            this.state.data[index][field] = newValue;
            this.setState(this.state);
        }
    },
    clickBtn(index, record){
        if (record.id) {
            this.remove(index);
        } else {
            this.save(index);
        }
    },
    render(){
        const columns = [{
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (value, record, index) => {
                return <Input className="full-width" value={value}
                              onBlur={this.save.bind(this, index, 'title')}
                              onChange={this.change.bind(this, index, 'title')}/>
            }
        }, {
            title: 'Owner',
            dataIndex: 'ownerId',
            key: 'ownerId',
            render: (value, record, index) => {
                return <CommonSelect value={value} url="/member/all" className="full-width"
                                     onBlur={this.save.bind(this, index, 'ownerId')}
                                     onChange={this.change.bind(this, index, 'ownerId')}/>
            }
        }, {
            title: 'Task Est',
            dataIndex: 'est',
            key: 'est',
            width: 140,
            render: (value, record, index) => {
                return <InputNumber value={value} className="full-width"
                                    onBlur={this.save.bind(this, index, 'est')}
                                    onChange={this.change.bind(this, index, 'est')}/>
            }
        }, {
            title: 'TODO Est',
            dataIndex: 'todo',
            key: 'todo',
            width: 140,
            render: (value, record, index) => {
                return <InputNumber value={value} className="full-width"
                                    onBlur={this.save.bind(this, index, 'todo')}
                                    onChange={this.change.bind(this, index, 'todo')}/>
            }
        }, {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 140,
            render: (value, record, index) => {
                return <TaskStatus value={value} className="full-width"
                                   onBlur={this.save.bind(this, index, 'status')}
                                   onChange={this.change.bind(this, index, 'status')}/>
            }
        }, {
            title: 'Operation',
            dataIndex: '',
            key: 'operation',
            width: 100,
            render: (value, record, index)=> {
                return <Button type="primary"
                               onClick={this.clickBtn.bind(this,index, record)}>{record.id ? 'Remove' : 'Save'}</Button>
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
});


export default TaskList;