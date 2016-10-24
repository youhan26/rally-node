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
        const me = this;
        me.state.loading = true;
        me.setState(me.state);

        Api.Task.get().then((result) => {
            const data = result.data;

            //update ori data for compare
            me.oriData = JSON.parse(JSON.stringify([me.getEmptyData()].concat(data)));

            if (data && data.length > 0) {
                data.forEach((item) => {
                    item.key = item.id;
                    item.status = '' + item.status;
                });
            }

            me.setState({
                data: [me.getEmptyData()].concat(data),
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
            status: '1',
            storyId: this.props.storyId
        };
    },
    save(data, needReload){
        const me = this;
        notification['info']({
            message: 'Saving',
            duration: 1,
        });
        Api.Task.save(data)
            .then((res) => {
                if (res.success) {
                    notification['success']({
                        message: 'Saved Successfully',
                        duration: 1,
                    });
                    if (needReload) {
                        me.loadData();
                    }
                } else {
                    message.error('Error happen when save!');
                }
            });
    },
    blur(index, field){
        //if new value
        if (!this.state.data[index].id) {
            return;
        }
        //if data no change
        if (this.oriData[index][field] == this.state.data[index][field]) {
            return;
        }
        this.oriData[index][field] = this.state.data[index][field];
        this.save(this.state.data[index]);
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
            this.save(this.state.data[index], true);
        }
    },
    render(){
        const columns = [{
            title: 'TASK No.',
            dataIndex: 'id',
            key: 'no',
            render: (value, record, index) => {
                if (value) {
                    return <a style={{textAlign : 'center'}} href={'/index#/tasks/' + value}>TASK {index}</a>
                }
            }
        }, {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (value, record, index) => {
                return <Input className="full-width" value={value}
                              onBlur={this.blur.bind(this, index, 'title')}
                              onChange={this.change.bind(this, index, 'title')}/>
            }
        }, {
            title: 'Owner',
            dataIndex: 'ownerId',
            key: 'ownerId',
            render: (value, record, index) => {
                return <CommonSelect value={value} url="/member/all" className="full-width"
                                     onBlur={this.blur.bind(this, index, 'ownerId')}
                                     onChange={this.change.bind(this, index, 'ownerId')}/>
            }
        }, {
            title: 'Task Est',
            dataIndex: 'est',
            key: 'est',
            width: 140,
            render: (value, record, index) => {
                return <InputNumber value={value} className="full-width"
                                    onBlur={this.blur.bind(this, index, 'est')}
                                    onChange={this.change.bind(this, index, 'est')}/>
            }
        }, {
            title: 'TODO Est',
            dataIndex: 'todo',
            key: 'todo',
            width: 140,
            render: (value, record, index) => {
                return <InputNumber value={value} className="full-width"
                                    onBlur={this.blur.bind(this, index, 'todo')}
                                    onChange={this.change.bind(this, index, 'todo')}/>
            }
        }, {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 140,
            render: (value, record, index) => {
                return <TaskStatus value={value} className="full-width"
                                   onBlur={this.blur.bind(this, index, 'status')}
                                   onChange={this.change.bind(this, index, 'status')}/>
            }
        }, {
            title: 'Operation',
            dataIndex: '',
            key: 'operation',
            width: 100,
            render: (value, record, index)=> {
                return <Button type="primary" style={{textAlign : 'center'}}
                               onClick={this.clickBtn.bind(this,index, record)}>{record.id ? 'Remove' : 'Add'}</Button>
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