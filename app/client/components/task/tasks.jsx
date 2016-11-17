/**
 * Created by YouHan on 2016/8/29.
 */
import React, {PropTypes, Component} from "react";
import {Card, Row, Col, Form, Input, InputNumber, Button} from "antd";
import CommonSelect from "../common/commonSelect";
import {TaskStatus} from "../common/constSelect";

const FormItem = Form.Item;

class TaskItem extends Component {
  constructor(props) {
    super(props);
    
    this.titleChange = this.titleChange.bind(this);
  }
  
  titleChange(e) {
    this.props.change(this.props.index, 'title', e);
  }
  
  ownerChange(e) {
    this.props.change(this.props.index, 'owner', e);
  }
  
  taskEstChange(e) {
    this.props.change(this.props.index, 'taskEst', e);
  }
  
  todoEstChange(e) {
    this.props.change(this.props.index, 'todoEst', e);
  }
  
  statusChange(e) {
    this.props.change(this.props.index, 'status', e);
  }
  
  save() {
    this.props.save(this.props.index);
  }
  
  render() {
    return (
      <Card style={{marginTop: '6px'}}>
        <Form horizontal={true}>
          <Row>
            <Col span="24">
              <FormItem>
                <Input
                  value={this.props.title}
                  onChange={this.titleChange}
                  placeholder="Task Name"
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem
                label="Task Owner"
                labelCol={{span: 9}}
                wrapperCol={{span: 15}}
              >
                <CommonSelect url="/member/all" value={this.props.owner} onChange={this.ownerChange} />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem
                label="Status"
                labelCol={{span: 9}}
                wrapperCol={{span: 15}}
              >
                <TaskStatus value={this.props.status} onChange={this.statusChange} />
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem
                label="Task Est"
                labelCol={{span: 9}}
                wrapperCol={{span: 15}}
              >
                <InputNumber value={this.props.taskEst} onChange={this.taskEstChange} />
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem
                label="TODO Est"
                labelCol={{span: 9}}
                wrapperCol={{span: 15}}
              >
                <InputNumber value={this.props.todoEst} onChange={this.todoEstChange} />
              </FormItem>
            </Col>
            <Col span="8" offset={9}>
              <Button type="primary" onClick={this.save}>{this.props.id ? 'Update' : 'Save'}</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  }
}

TaskItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  owner: PropTypes.string,
  taskEst: PropTypes.number,
  todoEst: PropTypes.number,
  desc: PropTypes.string,
  status: PropTypes.string,
  index: PropTypes.number,
  change: PropTypes.func,
  save: PropTypes.func
};

TaskItem.defaultProps = {
  title: '',
  taskEst: 0,
  todoEst: 0,
  desc: ''
};

export default class Tasks extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      list: [{
        title: '',
        taskEst: 0,
        todoEst: 0,
        desc: '',
        owner: this.props.owner
      }]
    };
  
    this.save = this.save.bind(this);
  }
  
  componentWillMount() {
    this.loadData();
  }
  
  loadData() {
    // TODO
  }
  
  change(key, field, e) {
    this.state.list[key][field] = (e && e.target ? e.target.value : e);
    this.setState(this.state);
  }
  
  save() {
    // TODO
  }
  
  render() {
    return (
      <div
        style={{margin: '12px'}}
      >
        {this.state.list.map((item, key) => {
          return (
            <TaskItem
              key={key}
              index={key}
              id={item.id}
              title={item.title}
              taskEst={item.taskEst}
              todoEst={item.todoEst}
              desc={item.desc}
              status={item.status}
              owner={item.owner}
              change={this.change}
              save={this.save}
            />
          );
        })}
      </div>
    );
  }
}

Tasks.propTypes = {
  owner: PropTypes.number
};
