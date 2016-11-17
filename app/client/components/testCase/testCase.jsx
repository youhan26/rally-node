/**
 * Created by YouHan on 2016/8/29.
 */
import React, {PropTypes} from "react";
import {Card, Row, Col, Form, Input, InputNumber} from "antd";
import CommonSelect from "../common/commonSelect";
import RichText from "../common/richText";

const FormItem = Form.Item;

const TestCases = React.createClass({
  propTypes: {
    title: PropTypes.string,
    owner: PropTypes.shape({}),
    project: PropTypes.shape({}),
    status: PropTypes.number,
    planEst: PropTypes.number,
    taskEst: PropTypes.number,
    todoEst: PropTypes.number,
    release: PropTypes.number,
    desc: PropTypes.string,
    notes: PropTypes.string
  },
  getInitialState(){
    return {
      title: '',
      owner: null,
      project: null,
      status: null,
      planEst: 0,
      taskEst: 0,
      todoEst: 0,
      release: null,
      desc: '',
      notes: ''
    };
  },
  titleChange(e){
    this.state.title = e.target.value;
    this.setState(this.state);
  },
  ownerChange(value){
    this.state.owner = value;
    this.setState(this.state);
  },
  projectChange(value){
    this.state.project = value;
    this.setState(this.state);
  },
  planEstChange(value){
    this.state.planEst = value;
    this.setState(this.state);
  },
  releaseChange(value){
    this.state.release = value;
    this.setState(this.state);
  },
  descChange(value){
    this.state.desc = value;
    this.setState(this.state);
  },
  notesChange(e){
    this.state.notes = e.target.value;
    this.setState(this.state);
  },
  render(){
    return (<div>
      <Card style={{marginTop: '6px'}}>
        <Form horizontal={true}>
          <Row>
            <Col span="24">
              <FormItem>
                <Input
                  value={this.state.title}
                  onChange={this.titleChange}
                  placeholder="Input Story Name" />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem
                label="Story Owner"
                labelCol={{span: 10}}
                wrapperCol={{span: 14}}
              >
                <CommonSelect url="/member/all" value={this.state.owner} onChange={this.ownerChange} />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem
                label="Project"
                labelCol={{span: 10}}
                wrapperCol={{span: 14}}
              >
                <CommonSelect
                  url="/project/all"
                  value={this.state.project}
                  onChange={this.projectChange}
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem
                label="Status"
                labelCol={{span: 10}}
                wrapperCol={{span: 14}}
              >
                <span>{this.state.status}</span>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card style={{marginTop: '6px'}}>
        <Row>
          <Col span="4">
            <FormItem
              label="Plan EST"
              labelCol={{span: 10}}
              wrapperCol={{span: 14}}
            >
              <InputNumber value={this.state.planEst} onChange={this.estChange} />
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem
              label="Task EST"
              labelCol={{span: 10}}
              wrapperCol={{span: 14}}
            >
              <InputNumber value={this.state.taskEst} disabled={true} />
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem
              label="TODO"
              labelCol={{span: 10}}
              wrapperCol={{span: 14}}
            >
              <InputNumber value={this.state.todoEst} disabled={true} />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              label="Release"
              labelCol={{span: 10}}
              wrapperCol={{span: 14}}
            >
              <span style={{color: 'red'}}>Need TODO</span>
              {/* <InputNumber value={this.state.est}/> */}
            </FormItem>
          </Col>
        </Row>
      </Card>
      <Card style={{marginTop: '6px'}}>
        <Row style={{marginTop: '12px'}}>
          <Col span="24">
            <FormItem
              label={'Notes'}
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
              style={{width: '500px'}}
            >
              <Input type="textarea" rows="4" value={this.state.notes} onChange={this.notesChange} />
            </FormItem>
          </Col>
        </Row>
      </Card>
      <Card style={{marginTop: '6px'}}>
        Need to add file upload and download
      </Card>
    </div>);
  }
});

export default TestCases;
