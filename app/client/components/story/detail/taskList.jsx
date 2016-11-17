/**
 * Created by YouHan on 2016/8/29.
 */
import React from "react";
import {Input, InputNumber, Table, Button} from "antd";
import CommonSelect from "../../common/commonSelect";
import {TaskStatus} from "../../common/constSelect";
import Api from "../../api";
import BlankRow from "../../mixins/grid-add-blur-change";

require('./../../../style/task.css');

export default class TaskList extends BlankRow {
  constructor(props) {
    super(props);
    
    this.api = Api.Task;
    this.storyId = this.props.storyId;
    this.state = {
      data: [],
      loading: false
    };
    
    this.statusChange = this.change.bind(this, 'status');
    this.statusBlur = this.blur.bind(this, 'status');
    this.todoChange = this.change.bind(this, 'todo');
    this.todoBlur = this.blur.bind(this, 'todo');
    this.estChange = this.change.bind(this, 'est');
    this.estBlur = this.blur.bind(this, 'est');
    this.ownerChange = this.change.bind(this, 'ownerId');
    this.ownerBlur = this.blur.bind(this, 'ownerId');
    this.titleChange = this.change.bind(this, 'title');
    this.titleBlur = this.blur.bind(this, 'title');
  
    this.click = this.click.bind(this);
  }
  
  getEmptyData() {
    return {
      title: '',
      ownerId: undefined,
      est: 0,
      todo: 0,
      status: '1',
      storyId: this.props.storyId
    };
  }
  
  // update data type from number to string
  changeData(item) {
    item.key = item.id;
    item.status = `${item.status}`;
  }
  
  render() {
    const columns = [{
      title: 'TASK No.',
      dataIndex: 'id',
      key: 'no',
      render: (value, record, index) => {
        return value && <a style={{textAlign: 'center'}} href={`/index#/tasks/${value}`}>TASK {index}</a>;
      }
    }, {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (value, record, index) => {
        return (
          <Input
            className="full-width" value={value}
            onBlur={this.titleBlur(index)}
            onChange={this.titleChange(index)}
          />
        );
      }
    }, {
      title: 'Owner',
      dataIndex: 'ownerId',
      key: 'ownerId',
      render: (value, record, index) => {
        return (
          <CommonSelect
            value={value} url="/member/all" className="full-width"
            onBlur={this.ownerBlur(index)}
            onChange={this.ownerChange(index)}
          />
        );
      }
    }, {
      title: 'Task Est',
      dataIndex: 'est',
      key: 'est',
      width: 140,
      render: (value, record, index) => {
        return (
          <InputNumber
            value={value} className="full-width"
            onBlur={this.estBlur(index)}
            onChange={this.estChange(index)}
          />
        );
      }
    }, {
      title: 'TODO Est',
      dataIndex: 'todo',
      key: 'todo',
      width: 140,
      render: (value, record, index) => {
        return (
          <InputNumber
            value={value} className="full-width"
            onBlur={this.todoBlur(index)}
            onChange={this.todoChange(index)}
          />
        );
      }
    }, {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (value, record, index) => {
        return (
          <TaskStatus
            value={value} className="full-width"
            onBlur={this.statusBlur(index)}
            onChange={this.statusChange(index)}
          />
        );
      }
    }, {
      title: 'Operation',
      dataIndex: '',
      key: 'operation',
      width: 100,
      render: (value, record, index) => {
        return (
          <Button
            type="primary" style={{textAlign: 'center'}}
            onClick={this.click(index, record)}
          >
            {record.id ? 'Remove' : 'Add'}
          </Button>
        );
      }
    }];
    return (
      <div
        style={{
          margin: '12px 0',
          backgroundColor: 'white'
        }}
      >
        <Table
          pagination={false}
          size="small"
          columns={columns}
          dataSource={this.state.data}
          loading={this.state.loading}
          className="task-list-table"
        />
      </div>
    );
  }
}
