/**
 * Created by YouHan on 2016/8/29.
 */
import React, {PropTypes, Component} from "react";
import moment from "moment";
import {Card, Row, Col, Form, message, Input, DatePicker, InputNumber, Button} from "antd";
import CommonSelect from "../../common/commonSelect";
import RichText from "../../common/richText";
import {StoryStatus, ReleaseSelect} from "../../common/constSelect";
import Api from "../../api";


const FormItem = Form.Item;

export default class StoryDetails extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: '',
      planEst: 0,
      taskEst: 0,
      todo: 0,
      desc: '',
      notes: '',
      testDate: new Date()
    };
    
    this.ownerChange = this.ownerChange.bind(this);
    this.save = this.save.bind(this);
    
    this.titleChange = this.dataChange.bind(this, 'title');
    this.projectChange = this.dataChange.bind(this, 'projectId');
    this.statusChange = this.dataChange.bind(this, 'status');
    this.testDateChange = this.dataChange.bind(this, 'testDate');
    this.pmChange = this.dataChange.bind(this, 'pm');
    this.feChange = this.dataChange.bind(this, 'fe');
    this.rdChange = this.dataChange.bind(this, 'rd');
    this.qaChange = this.dataChange.bind(this, 'qa');
    this.notesChange = this.dataChange.bind(this, 'notes');
    this.descChange = this.dataChange.bind(this, 'desc');
    this.releaseChange = this.dataChange.bind(this, 'releaseId');
    this.planEstChange = this.dataChange.bind(this, 'planEst');
  }
  
  componentWillMount() {
    if (this.props.storyId) {
      this.loadData();
    }
  }
  
  loadData() {
    const me = this;
    Api.Story.get(this.props.storyId)
      .then((res) => {
        if (res && res.success) {
          me.setState(res.data);
        }
      });
  }
  
  dataChange(field, e) {
    this.state[field] = (e && e.target ? e.target.value : e);
    this.setState(this.state);
  }
  
  ownerChange(value) {
    this.state.ownerId = value;
    this.setState(this.state);
    this.props.ownerChange(value);
  }
  
  save() {
    const me = this;
    Api.Story.save(this.state)
      .then((res) => {
        if (res && res.success) {
          message.success('Save successfully');
          if (!me.props.storyId) {
            // nor working
            location.href = `/index#/story/${res.data.insertId}`;
          }
        } else {
          message.error(res.reason);
        }
      });
  }
  
  render() {
    const format = "YYYY-MM-DD";
    return (
      <div>
        <Card style={{marginTop: '6px'}}>
          <Form horizontal={true}>
            <Row>
              <Col span="20">
                <FormItem>
                  <Input
                    value={this.state.title} placeholder="Input Story Name"
                    onChange={this.titleChange}
                  />
                </FormItem>
              </Col>
              <Col span="4" style={{textAlign: 'center'}}>
                <Button
                  type="primary"
                  onClick={this.save}
                >
                  {this.props.storyId ? 'Update' : 'Add'}
                </Button>
              </Col>
            </Row>
          </Form>
          <Form>
            <Row>
              <Col span="6">
                <FormItem
                  label="Story Owner"
                  labelCol={{span: 10}}
                  wrapperCol={{span: 14}}
                >
                  <CommonSelect
                    url="/member/all" value={this.state.ownerId}
                    onChange={this.ownerChange}
                  />
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem
                  label="Project"
                  labelCol={{span: 10}}
                  wrapperCol={{span: 14}}
                >
                  <CommonSelect
                    url="/project/all" value={this.state.projectId}
                    onChange={this.projectChange}
                  />
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem
                  label="Status"
                  labelCol={{span: 10}}
                  wrapperCol={{span: 14}}
                >
                  <StoryStatus
                    value={this.state.status}
                    onChange={this.statusChange}
                  />
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem
                  label="Test Date"
                  labelCol={{span: 10}}
                  wrapperCol={{span: 14}}
                >
                  <DatePicker
                    value={moment(this.state.testDate || new Date(), format)}
                    onChange={this.testDateChange}
                  />
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card style={{marginTop: '6px'}}>
          <Form>
            <Row>
              <Col span="6">
                <FormItem
                  label="PM"
                  labelCol={{span: 10}}
                  wrapperCol={{span: 14}}
                >
                  <CommonSelect
                    value={this.state.pm} url="/member/all"
                    onChange={this.pmChange}
                  />
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem
                  label="QA"
                  labelCol={{span: 10}}
                  wrapperCol={{span: 14}}
                >
                  <CommonSelect
                    value={this.state.qa} url="/member/all"
                    onChange={this.qaChange}
                  />
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem
                  label="FE"
                  labelCol={{span: 10}}
                  wrapperCol={{span: 14}}
                >
                  <CommonSelect
                    value={this.state.fe} url="/member/all"
                    onChange={this.feChange}
                  />
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem
                  label="RD"
                  labelCol={{span: 10}}
                  wrapperCol={{span: 14}}
                >
                  <CommonSelect
                    value={this.state.rd} url="/member/all"
                    onChange={this.rdChange}
                  />
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card style={{marginTop: '6px'}}>
          <Form>
            <Row>
              <Col span="6">
                <FormItem
                  label="Plan EST"
                  labelCol={{span: 10}}
                  wrapperCol={{span: 14}}
                >
                  <InputNumber
                    value={this.state.planEst}
                    onChange={this.planEstChange}
                  />
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem
                  label="Task EST"
                  labelCol={{span: 10}}
                  wrapperCol={{span: 14}}
                >
                  <InputNumber value={this.state.taskEst} disabled={true} />
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem
                  label="TODO"
                  labelCol={{span: 10}}
                  wrapperCol={{span: 14}}
                >
                  <InputNumber value={this.state.todo} disabled={true} />
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem
                  label="Release"
                  labelCol={{span: 10}}
                  wrapperCol={{span: 14}}
                >
                  <ReleaseSelect
                    value={this.state.releaseId} projectId={this.state.projectId}
                    onChange={this.releaseChange}
                  />
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card style={{marginTop: '6px'}}>
          <Row style={{marginTop: '12px'}}>
            <Col span="24">
              <FormItem
                label={'Description'}
                labelCol={{span: 2}}
                wrapperCol={{span: 19}}
              >
                <RichText
                  style={{
                    width: '100%',
                    height: '300px'
                  }}
                  placeholder="Input Description of Story...."
                  onChange={this.descChange}
                  value={this.state.desc}
                />
              </FormItem>
            </Col>
          </Row>
          <Row style={{marginTop: '12px'}}>
            <Col span="24">
              <FormItem
                label={'Notes'}
                labelCol={{span: 2}}
                wrapperCol={{span: 19}}
              >
                <Input
                  type="textarea" rows="4" value={this.state.notes}
                  onChange={this.notesChange}
                />
              </FormItem>
            </Col>
          </Row>
        </Card>
        <Card style={{marginTop: '6px'}}>
          Need to add file upload and download
        </Card>
      </div>
    );
  }
}

StoryDetails.propTypes = {
  storyId: PropTypes.string,
  ownerChange: PropTypes.func
};

