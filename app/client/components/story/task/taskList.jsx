/**
 * Created by YouHan on 2016/8/29.
 */

/* @flow */
"use strict";

require('./../../../style/task.css');


import React from "react";
import {Input, InputNumber, Table, Button} from "antd";
import CommonSelect from "./../../common/commonSelect";
import {TaskStatus} from "./../../common/constSelect";
import Api from "./../../api";
import BlankRow from "./../../mixins/grid-add-blur-change";

const TaskList = React.createClass({
    mixins: [BlankRow],
    getInitialState(){
        this.api = Api.Task;
        return {
            data: [],
            loading: false
        }
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
                               onClick={this.click.bind(this,index, record)}>{record.id ? 'Remove' : 'Add'}</Button>
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