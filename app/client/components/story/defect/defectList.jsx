/**
 * Created by YouHan on 2016/8/29.
 */

/* @flow */
"use strict";

require('./../../../style/task.css');


import React from "react";
import {Input, InputNumber, Table, Button} from "antd";
import CommonSelect from "./../../common/commonSelect";
import {DefectStatus} from "./../../common/constSelect";
import Api from "./../../api";
import BlankRow from "./../../mixins/grid-add-blur-change";

const DefectList = React.createClass({
    mixins: [BlankRow],
    getInitialState(){
        this.api = Api.Defect;
        return {
            data: [],
            loading: false
        }
    },
    getEmptyData(){
        return {
            title: '',
            reopen : false,
            reopenReason : '',
            status: '1',
            storyId: this.props.storyId
        };
    },
    render(){
        const columns = [{
            title: 'Defect No.',
            dataIndex: 'id',
            key: 'no',
            render: (value, record, index) => {
                if (value) {
                    return <a style={{textAlign : 'center'}} href={'/index#/defects/' + value}>Defect {index}</a>
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
            title: 'Submitted Owner',
            dataIndex: 'submitId',
            key: 'submitId',
            render: (value, record, index) => {
                return <CommonSelect value={value} url="/member/all" className="full-width"
                                     onBlur={this.blur.bind(this, index, 'submitId')}
                                     onChange={this.change.bind(this, index, 'submitId')}/>
            }
        }, {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 140,
            render: (value, record, index) => {
                return <DefectStatus value={value} className="full-width"
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


export default DefectList;