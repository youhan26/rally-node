/**
 * Created by YouHan on 2016/8/29.
 */

/* @flow */
import React, {PropTypes} from "react";
import {Card, Row, Col, Form, Input, InputNumber, Button} from "antd";
import CommonSelect from "../common/commonSelect";
import {TaskStatus} from "../common/constSelect";

const FormItem = Form.Item;

const TaskItem = React.createClass({
  propTypes: {
    id: PropTypes.any,
    title: PropTypes.string,
    owner: PropTypes.any,
    taskEst: PropTypes.number,
    todoEst: PropTypes.number,
    desc: PropTypes.string,
    status: PropTypes.string
  },
  getDefaultProps(){
    return {
      title: '',
      taskEst: 0,
      todoEst: 0,
      desc: ''
    };
  },
  render (){
    const {titleChange, ownerChange, taskEstChange, todoEstChange, descChange, statusChange, save} = {...this.props};
    return (
      <Card style={{marginTop: '6px'}}>
        <Form horizontal={true}>
          <Row>
            <Col span="24">
              <FormItem>
                <Input
                  value={this.props.title}
                  onChange={titleChange}
                  placeholder="Task Name"
                />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem
                label="Task Owner"
                labelCol={{span: 9}}
                wrapperCol={{ span: 15 }}
              >
                <CommonSelect url="/member/all" value={this.props.owner} onChange={ownerChange} />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem
                label="Status"
                labelCol={{span: 9}}
                wrapperCol={{ span: 15 }}
              >
                <TaskStatus value={this.props.status} onChange={statusChange} />
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem
                label="Task Est"
                labelCol={{span: 9}}
                wrapperCol={{ span: 15 }}
              >
                <InputNumber value={this.props.taskEst} onChange={taskEstChange} />
              </FormItem>
            </Col>
            <Col span="4">
              <FormItem
                label="TODO Est"
                labelCol={{span: 9}}
                wrapperCol={{ span: 15 }}
              >
                <InputNumber value={this.props.todoEst} onChange={todoEstChange} />
              </FormItem>
            </Col>
            <Col span="8" offset={9}>
              <Button type="primary" onClick={save}>{this.props.id ? 'Update' : 'Save'}</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    )
  }
});


const Tasks = React.createClass({
  getInitialState(){
    return {
      list: [{
        title: '',
        taskEst: 0,
        todoEst: 0,
        desc: '',
        owner: this.props.owner
      }]
    };
  },
  componentWillMount(){
    this.loadData();
  },
  loadData(){
    // TODO
  },
  change(key, field, e){
    this.state.list[key][field] = (e && e.target ? e.target.value : e);
    this.setState(this.state);
  },
  save(key){
    // TODO
  },
  render(){
    return (
      <div
        style={{margin: '12px'}}
      >
        {this.state.list.map((item, key) => {
          return (
            <TaskItem
              key={key}
              id={item.id}
              title={item.title}
              taskEst={item.taskEst}
              todoEst={item.todoEst}
              desc={item.desc}
              status={item.status}
              owner={item.owner}
              titleChange={this.change.bind(this,key, 'title')}
              taskEstChange={this.change.bind(this,key, 'taskEst')}
              todoEstChange={this.change.bind(this,key, 'todoEst')}
              descChange={this.change.bind(this,key, 'desc')}
              statusChange={this.change.bind(this,key, 'status')}
              ownerChange={this.change.bind(this,key, 'owner')}
              save={this.save.bind(this,key)}
            />
          );
        })}
      </div>
    );
  }
});


export default Tasks;
