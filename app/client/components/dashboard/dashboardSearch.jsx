/**
 * Created by YouHan on 2016/11/3.
 */


import React, {Component, PropTypes} from "react";
import {Card, Form, Row, Col, Button} from "antd";
import CommonSelect from "./../common/commonSelect";
const FormItem = Form.Item;

export default class DashboardSearch extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {projectIdChange, ownerIdChange}  = this.props;
        return <div className="ds">
            <Card>
                <Form>
                    <Row>
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
                                label="Owner"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <CommonSelect value={this.props.condition.ownerId} url="/member/all"
                                              onChange={ownerIdChange}/>
                            </FormItem>
                        </Col>
                        <Col span="6" offset="6" style={{textAlign : 'right', paddingRight : '20px'}}>
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
    click: PropTypes.func
};
DashboardSearch.defaultProps = {
    condition: {
        projectId: null,
        ownerId: null
    }
};