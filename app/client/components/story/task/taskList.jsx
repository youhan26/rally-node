***REMOVED***
 * Created by YouHan on 2016/8/29.
***REMOVED***

/* @flow***REMOVED***
"use strict";

import React from "react";
import {Card, Form, message, Input, DatePicker, Tabs, InputNumber, Table, Button} from "antd";
import CommonSelect from "./../../common/commonSelect";
import {TaskStatus} from "./../../common/constSelect";

const FormItem = Form.Item;

const TaskList = React.createClass({
    getInitialState(){
        return {
            list: [{}]
        }
    },
    componentWillMount(){
        this.loadData();
    },
    loadData(){
        //TODO
    },
    save(key){
        //TODO
    },
    render(){
        const columns = [{
            title: 'Title',
            dataIndex: 'title',
            key: 'title'
        }, {
            title: 'Owner',
            dataIndex: 'owner',
            key: 'owner',
            render: (value) => {
                return <CommonSelect value={value} disabled={true}/>
            }
        }, {
            title: 'Task Est',
            dataIndex: 'taskEst',
            key: 'taskEst'
        }, {
            title: 'TODO Est',
            dataIndex: 'todoEst',
            key: 'todoEst'
        }, {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (value) => {
                return <TaskStatus value={value} disabled={true}/>
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
                dataSource={data}
                loading={this.state.loading}
                className="task-list-table"
            />
        </div>;
    }
***REMOVED***


export default TaskList;