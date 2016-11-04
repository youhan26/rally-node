/**
 * Created by YouHan on 2016/11/3.
 */


import React, {Component, PropTypes} from "react";
import {Card, Form, Row, Col, Button} from "antd";
import CommonSelect from "./../common/commonSelect";
import {ReleaseSelect} from "./../common/constSelect";
const FormItem = Form.Item;

export default class DashboardSearch extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {projectIdChange, ownerIdChange, releaseChange}  = this.props;
        return <div className="ds">
            <Card>
                <Form>
                    <Row>
                        <Col span="6">
                            <FormItem
                                label="Owner"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <CommonSelect value={this.props.condition.ownerId} url="/member/all"
                                              onChange={ownerIdChange}/>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem
                                label="Project"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <CommonSelect value={this.props.condition.projectId} url="/project/all"
                                              onChange={projectIdChange}/>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem
                                label="Release"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <ReleaseSelect value={this.props.condition.releaseId}
                                               projectId={this.props.condition.projectId}
                                               onChange={releaseChange}/>
                            </FormItem>
                        </Col>
                        <Col span="6" style={{textAlign : 'right', paddingRight : '20px'}}>
                            <Button type="primary" onClick={this.props.click}>Clear</Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    }
}

DashboardSearch.propTypes = {
    condition: PropTypes.object,
    projectIdChange: PropTypes.func,
    ownerIdChange: PropTypes.func,
    releaseChange: PropTypes.func,
    click: PropTypes.func
};
DashboardSearch.defaultProps = {
    condition: {
        projectId: null,
        ownerId: null
    }
};