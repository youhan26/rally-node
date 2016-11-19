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
    
    this.projectIdChange = this.projectIdChange.bind(this);
    this.ownerIdChange = this.ownerIdChange.bind(this);
    this.releaseChange = this.releaseChange.bind(this);
  }
  
  projectIdChange(e) {
    this.props.conditionChange('projectId', e);
  }
  
  ownerIdChange(e) {
    this.props.conditionChange('ownerId', e);
  }
  
  releaseChange(e) {
    this.props.conditionChange('releaseId', e);
  }
  
  render() {
    return (
      <div className="ds">
        <Card>
          <Form>
            <Row>
              <Col span="6">
                <FormItem
                  label="Owner"
                  labelCol={{span: 10}}
                  wrapperCol={{span: 14}}
                >
                  <CommonSelect
                    value={this.props.condition.ownerId}
                    url="/member/all"
                    onChange={this.ownerIdChange}
                    allowClear={true} />
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem
                  label="Project"
                  labelCol={{span: 10}}
                  wrapperCol={{span: 14}}
                >
                  <CommonSelect
                    value={this.props.condition.projectId}
                    url="/project/all"
                    onChange={this.projectIdChange}
                    allowClear={true} />
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem
                  label="Release"
                  labelCol={{span: 10}}
                  wrapperCol={{span: 14}}
                >
                  <ReleaseSelect
                    value={this.props.condition.releaseId}
                    projectId={this.props.condition.projectId}
                    onChange={this.releaseChange}
                    allowClear={true} />
                </FormItem>
              </Col>
              <Col span="6" style={{textAlign: 'right', paddingRight: '20px'}}>
                <Button
                  type="primary" onClick={this.props.search}
                  style={{marginRight: '12px'}}
                >Search</Button>
                <Button type="primary" onClick={this.props.click}>Clear</Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    );
  }
}

DashboardSearch.propTypes = {
  conditionChange: PropTypes.func,
  condition: PropTypes.shape({
    releaseId: PropTypes.string,
    projectId: PropTypes.string,
    ownerId: PropTypes.string
  }),
  click: PropTypes.func,
  search: PropTypes.func
};

DashboardSearch.defaultProps = {
  condition: {
    projectId: null,
    ownerId: null
  }
};
