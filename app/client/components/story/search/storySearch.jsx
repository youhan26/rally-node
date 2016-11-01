/**
 * Created by YouHan on 2016/11/1.
 */

import React from "react";
import {Card, Row, Col, Form, Button, message, Input, DatePicker, Table, InputNumber} from "antd";
import {StoryStatus, ReleaseSelect} from "../../common/constSelect";
import CommonSelect from "../../common/commonSelect";


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
                            label="Release"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <ReleaseSelect projectId={this.props.condition.projectId}
                                           value={this.props.condition.releaseId}
                                           onChange={releaseChange}/>
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
                            label="Project"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                        >
                            <CommonSelect className='full-width' url="/project/all"
                                          value={this.props.condition.projectId}
                                          onChange={projectChange}/>
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

export default StorySearch;