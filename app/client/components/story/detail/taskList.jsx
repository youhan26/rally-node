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
    
    this.blur = this.blur.bind(this);
    this.change = this.change.bind(this);
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
            onBlur={this.blur(index, 'title')}
            onChange={this.change(index, 'title')}
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
            onBlur={this.blur(index, 'ownerId')}
            onChange={this.change(index, 'ownerId')}
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
            onBlur={this.blur(index, 'est')}
            onChange={this.change(index, 'est')}
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
            onBlur={this.blur(index, 'todo')}
            onChange={this.change(index, 'todo')}
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
            onBlur={this.blur(index, 'status')}
            onChange={this.change(index, 'status')}
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
