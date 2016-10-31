'use strict';

require('./../../style/storyList.css');

import React, {PropTypes} from "react";
import api from "../api";
import {Card, Row, Col, Form, Button, message, Input, DatePicker, Table, InputNumber} from "antd";
import {StoryStatus, ReleaseSelect} from "./../common/constSelect";
import CommonSelect from "./../common/commonSelect";
import BlankRow from "../mixins/grid-add-blur-change";


const FormItem = Form.Item;

const StorySearch = React.createClass({
    render(){
        const {titleChange, projectChange, statusChange, releaseChange, ownerChange, search, clear} = this.props;
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
                            <Input className='full-width' value={this.props.condition.title}
                                   onChange={titleChange}/>
                        </FormItem>
                        <FormItem
                            label="Project"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <CommonSelect className='full-width' url="/project/all" value={this.props.condition.projectId}
                                          onChange={projectChange}/>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="Story Status"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <StoryStatus className='full-width' value={this.props.condition.status}
                                         onChange={statusChange}/>
                        </FormItem>
                        <FormItem
                            label="Release"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <ReleaseSelect projectId={this.props.projectId} value={this.props.condition.releaseId}
                                           onChange={releaseChange}/>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="Story Owner"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <CommonSelect className='full-width' url="/member/all" value={this.props.condition.ownerId}
                                          onChange={ownerChange}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} offset={12} style={{ textAlign: 'right' }}>
                        <Button type="primary"
                                onClick={search}
                                style={{
                            marginRight : '12px'
                        }}>Search</Button>
                        <Button onClick={clear}>Clear</Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    }
});

const StoryResult = React.createClass({
    mixins: [BlankRow],
    propTypes: {
        data: PropTypes.array,
        loading: PropTypes.bool
    },
    getDefaultProps (){
        return {
            data: [],
            loading: false
        }
    },
    componentWillMount(){
        this.api = api.Story;
        this.data = this.props.data;
    },
    selfLoad (){
        this.props.search();
    },
    render(){
        const columns = [{
            title: 'Story No.',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            render: (value, record, index) => {
                if (value) {
                    return <a className='full-width' href={'/index#/story/' + value}>Story {index}</a>
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
                return <StoryStatus value={value} className='full-width'
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
                                    disabled={true}/>
            }
        }, {
            title: 'Task Est',
            dataIndex: 'taskEst',
            key: 'taskEst',
            width: 70,
            render: (value, record, index) => {
                return <InputNumber value={value} className='full-width' disabled={true}/>
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
                return <ReleaseSelect className="full-width" value={value}
                                      onChange={this.change.bind(this,index, 'releaseId')}
                                      onBlur={this.blur.bind(this, index, 'releaseId')}/>
            }
        }, {
            title: 'Project',
            dataIndex: 'projectId',
            key: 'projectId',
            width: 100,
            render: (value, record, index) => {
                return <CommonSelect url="/project/all" value={value} className="full-width"
                                     onChange={this.change.bind(this,index, 'projectId')}
                                     onBlur={this.blur.bind(this, index, 'projectId')}/>
            }
        }, {
            title: 'Operation',
            dataIndex: '',
            key: 'operation',
            width: 80,
            render: (value, record, index)=> {
                return <Button type="primary" className='full-width'
                               onClick={this.click.bind(this,index, record)}>
                    {record.id ? 'Remove' : 'Add'}</Button>
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
                dataSource={this.props.data}
                loading={this.props.loading}
                className="task-list-table"
            />
        </div>;
    }
});


const StoryList = React.createClass({
    getInitialState(){
        return {
            data: [],
            loading: false,
            condition: this.getEmptyObj()
        };
    },
    //search
    clear(){
        this.state.condition = this.getEmptyObj();
        this.setState(this.state);
    },
    getEmptyObj(){
        return {
            title: '',
            projectId: null,
            status: null,
            ownerId: null,
            releaseId: null
        };
    },
    searchChange(field, e){
        this.state.condition[field] = (e.target ? e.target.value : e);
        if (field === 'projectId') {
            this.state.condition.releaseId = null;
        }
        this.setState(this.state);
    },
    getSearchCondition(){
        const condition = {};
        const state = this.state.condition;
        Object.keys(state).forEach((item) => {
            if (state[item]) {
                condition[item] = state[item];
            }
        });
        return condition;
    },
    //result
    getResultObj(){
        return {
            title: '',
            todo: 0,
            taskEst: 0,
            planEst: 0
        }
    },

    //search
    search(){
        const me = this;
        me.state.loading = true;
        me.setState(this.state);
        api.Story.getList(me.getSearchCondition())
            .then((res) => {
                me.state.loading = false;
                if (res && res.success) {
                    me.state.data = [me.getResultObj()].concat(res.data);
                    me.data = [me.getResultObj()].concat(res.data);
                } else {
                    message.error(res.reason);
                }
                me.setState(this.state);
            });
    },
    render() {
        const style = {
            width: '100%',
            height: '100%',
            backgroundColor: '#eee'
        };
        return (
            <div style={style}>
                <StorySearch search={this.search}
                             condition={this.state.condition}
                             titleChange={this.searchChange.bind(this, 'title')}
                             statusChange={this.searchChange.bind(this, 'status')}
                             projectChange={this.searchChange.bind(this, 'projectId')}
                             ownerChange={this.searchChange.bind(this, 'ownerId')}
                             releaseChange={this.searchChange.bind(this, 'releaseId')}
                             clear={this.clear}
                />
                <StoryResult data={this.state.data}
                             loading={this.state.loading}
                             search={this.search}/>
            </div>
        )
    }
});

export default StoryList;