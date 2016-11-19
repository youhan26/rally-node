/**
 * Created by YouHan on 2016/11/1.
 */
import React, {Component, PropTypes} from "react";
import {Card, Row, Col, Form, Button, Input} from "antd";
import {StoryStatus, ReleaseSelect} from "../../common/constSelect";
import CommonSelect from "../../common/commonSelect";


const FormItem = Form.Item;

export default class StorySearch extends Component {
  constructor(props) {
    super(props);
    
    this.titleChange = this.titleChange.bind(this);
    this.projectChange = this.projectChange.bind(this);
    this.statusChange = this.statusChange.bind(this);
    this.releaseChange = this.releaseChange.bind(this);
    this.ownerChange = this.ownerChange.bind(this);
  }
  
  titleChange(e) {
    this.props.searchChange('title', e);
  }
  
  projectChange(e) {
    this.props.searchChange('projectId', e);
  }
  
  statusChange(e) {
    this.props.searchChange('status', e);
  }
  
  releaseChange(e) {
    this.props.searchChange('releaseId', e);
  }
  
  ownerChange(e) {
    this.props.searchChange('ownerId', e);
  }
  
  render() {
    const {search, clear} = this.props;
    return (
      <Card
        style={{
          margin: '12px'
        }}
      >
        <Form horizontal={true} className="ant-advanced-search-form">
          <Row>
            <Col span={8}>
              <FormItem
                label="Story title"
                labelCol={{span: 10}}
                wrapperCol={{span: 14}}
              >
                <Input
                  className="full-width" value={this.props.condition.title}
                  onChange={this.titleChange}
                />
              </FormItem>
              <FormItem
                label="Project"
                labelCol={{span: 10}}
                wrapperCol={{span: 14}}
              >
                <CommonSelect
                  className="full-width" url="/project/all"
                  value={this.props.condition.projectId}
                  onChange={this.projectChange}
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                label="Story Status"
                labelCol={{span: 10}}
                wrapperCol={{span: 14}}
              >
                <StoryStatus
                  className="full-width" value={this.props.condition.status}
                  onChange={this.statusChange}
                />
              </FormItem>
              <FormItem
                label="Release"
                labelCol={{span: 10}}
                wrapperCol={{span: 14}}
              >
                <ReleaseSelect
                  projectId={this.props.condition.projectId}
                  value={this.props.condition.releaseId}
                  onChange={this.releaseChange}
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                label="Story Owner"
                labelCol={{span: 10}}
                wrapperCol={{span: 14}}
              >
                <CommonSelect
                  className="full-width" url="/member/all"
                  value={this.props.condition.ownerId}
                  onChange={this.ownerChange}
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12} offset={12} style={{textAlign: 'right'}}>
              <Button
                type="primary"
                onClick={search}
                style={{
                  marginRight: '12px'
                }}
              >
                Search
              </Button>
              <Button onClick={clear}>Clear</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  }
}

StorySearch.propTypes = {
  clear: PropTypes.func,
  search: PropTypes.func,
  condition: PropTypes.shape({
    ownerId: PropTypes.number,
    title: PropTypes.string,
    projectId: PropTypes.string,
    status: PropTypes.number,
    releaseId: PropTypes.string
  }),
  searchChange: PropTypes.func
};
