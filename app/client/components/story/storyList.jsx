'use strict';

require('./../../style/storyList.css');

import React from "react";
import {Card, Row, Col, Form, Button, message, Input, DatePicker, Table} from "antd";
import {StoryStatus} from "./../common/constSelect";
import CommonSelect from "./../common/commonSelect";


const FormItem = Form.Item;

const StorySearch = React.createClass({
    render(){
        return <Card style={{
                    margin: '12px'
                }}>
            <Form horizontal className="ant-advanced-search-form">
                <Row>
                    <Col span={8}>
                        <FormItem
                            label="Story title"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <Input className='full-width'/>
                        </FormItem>
                        <FormItem
                            label="Release"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                        >
                            {/*{<CommonSelect className='full-width' url="/member/all"/>}*/}
                            <span>{'release'}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="Story Status"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <StoryStatus className='full-width'/>
                        </FormItem>
                        <FormItem
                            label="Project"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <CommonSelect className='full-width' url="/project/all"/>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="Story Owner"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <CommonSelect className='full-width' url="/member/all"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} offset={12} style={{ textAlign: 'right' }}>
                        <Button type="primary" style={{
                            marginRight : '12px'
                        }}>Search</Button>
                        <Button>Clear</Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    }
});

const StoryResult = React.createClass({
    getInitialState(){
        return {}
    },
    getDefaultProps (){
        return {}
    },
    componentWillMount (){

    },
    render(){
        const columns = [{
            title: 'Story No.',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            render: (value, record, index) => {
                if (value) {
                    return <a className='full-width' href={'/index#/story/' + value}>Defect {index}</a>
                }
            }
        }, {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (value, record, index) => {
                return <Input value={value} className='full-width'
                              onBlur={this.blur.bind(this, index, 'title')}
                              onChange={this.change.bind(this, index, 'title')}/>
            }
        }, {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (value, record, index) => {
                return <DefectStatus value={value} className='full-width'
                                     onBlur={this.blur.bind(this, index, 'status')}
                                     onChange={this.change.bind(this, index, 'status')}/>
            }
        }, {
            title: 'Plan Est',
            dataIndex: 'planEst',
            key: 'planEst',
            width: 70,
            render: (value, record, index) => {
                return <InputNumber value={value} className='full-width'
                                    onBlur={this.blur.bind(this, index, 'planEst')}
                                    onChange={this.change.bind(this, index, 'planEst')}/>
            }
        }, {
            title: 'TODO',
            dataIndex: 'todo',
            key: 'todo',
            width: 70,
            render: (value, record, index) => {
                return <InputNumber value={value} className='full-width'
                                    onBlur={this.blur.bind(this, index, 'todo')}
                                    onChange={this.change.bind(this, index, 'todo')}/>
            }
        }, {
            title: 'Task Est',
            dataIndex: 'taskEst',
            key: 'taskEst',
            width: 70,
            render: (value, record, index) => {
                return <InputNumber value={value} className='full-width'
                                    onBlur={this.blur.bind(this, index, 'taskEst')}
                                    onChange={this.change.bind(this, index, 'taskEst')}/>
            }
        }, {
            title: 'Owner',
            dataIndex: 'ownerId',
            key: 'ownerId',
            width: 100,
            render: (value, record, index) => {
                return <CommonSelect value={value} url="/member/all" className='full-width'
                                     onBlur={this.blur.bind(this, index, 'ownerId')}
                                     onChange={this.change.bind(this, index, 'ownerId')}/>
            }
        }, {
            title: 'Release',
            dataIndex: 'releaseId',
            key: 'releaseId',
            width: 100,
            render: (value, record, index) => {
                return <span className='full-width'>{'release TODO' + value}</span>
            }
        }, {
            title: 'Project',
            dataIndex: 'projectId',
            key: 'projectId',
            width: 100,
            render: (value, record, index) => {
                return <span className='full-width'>{'project TODO' + value}</span>
            }
        }, {
            title: 'Operation',
            dataIndex: '',
            key: 'operation',
            width: 80,
            render: (value, record, index)=> {
                return <Button type="primary" className='full-width'
                               onClick={this.click.bind(this,index, record)}>{record.id ? 'Remove' : 'Add'}</Button>
            }
        }];
        return <div style={{
                margin : '12px',
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


const StoryList = React.createClass({
    render() {
        const style = {
            width: '100%',
            height: '100%',
            backgroundColor: '#eee'
        };
        return (
            <div style={style}>
                <StorySearch/>
                <StoryResult/>
            </div>
        )
    }
});

export default StoryList;