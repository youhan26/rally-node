/**
 * Created by YouHan on 2016/8/29.
 */

/* @flow */
"use strict";

import React from "react";
import {Card, Form, message, Input, DatePicker, Tabs, InputNumber, Table, Button} from "antd";
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
                });
            }
            this.setState({
                data: data,
                loading: false
            })
        });
    },
    save(key){
        //TODO
    },
    change(record, value){
        console.log('222');
    },
    render(){
        const columns = [{
            title: 'Title',
            dataIndex: 'title',
            key: 'title'
        }, {
            title: 'Owner',
            dataIndex: 'ownerId',
            key: 'ownerId',
            render: (value, record) => {
                return <CommonSelect value={value} url="/member/all" onChange={this.change.bind(this, record)}/>
            }
        }, {
            title: 'Task Est',
            dataIndex: 'est',
            key: 'est'
        }, {
            title: 'TODO Est',
            dataIndex: 'todo',
            key: 'todo'
        }, {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width : 140,
            render: (value) => {
                return <TaskStatus value={value}/>
            }
        }, {
            title: 'Operation',
            dataIndex: '',
            key: 'operation',
            render: (value, record) => {
                return <Button type='primary'>{record.id ? 'Update' : 'Save'}</Button>
            }
        }];
        const data = [
            {
                key: 1,
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
                title: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
            },
            {
                key: 2,
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
                description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'
            },
            {
                key: 3,
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.'
            },
        ];
        return <div style={{
            margin : '12px 0',
            backgroundColor: 'white'
        }}>
            <Table
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