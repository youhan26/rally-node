/**
 * Created by YouHan on 2016/8/29.
 */
import React from "react";
import {Input, InputNumber, Table, Button} from "antd";
import CommonSelect from "../../common/commonSelect";
import {TaskStatus} from "../../common/constSelect";
import Api from "../../api";
import BlankRow from "./../../common/blankRow";

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
    
    this.rowChange = this.rowChange.bind(this);
    this.rowBlur = this.rowBlur.bind(this);
    this.rowClick = this.rowClick.bind(this);
    
    this.singleSave = this.singleSave.bind(this);
    this.singleRemove = this.singleRemove.bind(this);
    this.updateChange = this.updateChange.bind(this);
    this.loadData = this.loadData.bind(this);
  }
  
  componentWillMount() {
    this.loadData();
  }
  
  loadData() {
    const me = this;
    me.state.loading = true;
    me.setState(me.state);
    
    Api.Task.getList(me.storyId).then((result) => {
      const data = result.data;
      
      if (data && data.length > 0) {
        data.forEach(me.changeData);
      }
  
      // update ori data for compare
      me.data = [me.getEmptyData()].concat(data);
      me.oriData = JSON.parse(JSON.stringify([me.getEmptyData()].concat(data)));
      
      me.setState({
        data: me.data,
        loading: false
      });
    });
  }
  
  singleSave(data) {
    const me = this;
    BlankRow.notice().saving();
    Api.Task.save(data)
      .then((res) => {
        if (res.success) {
          BlankRow.notice().succ();
          me.loadData();
        } else {
          BlankRow.notice().fail();
        }
      });
  }
  
  singleRemove(data) {
    const me = this;
    Api.Task.del(data.id).then((res) => {
      if (res && res.success) {
        BlankRow.notice().succ();
        me.loadData();
      }
    });
  }
  
  updateChange(list) {
    this.state.data = list;
    this.setState(this.state);
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
        return value && <a style={{textAlign: 'center'}} href={`/index#/tasks/${record.id}`}>TASK {index}</a>;
      }
    }, {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (value, record, index) => {
        return (
          <Input
            className="full-width" value={value}
            onBlur={this.rowBlur.bind(this, 'title', index)}
            onChange={this.rowChange.bind(this, 'title', index)}
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
            onBlur={this.rowBlur.bind(this, 'ownerId', index)}
            onChange={this.rowChange.bind(this, 'ownerId', index)}
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
            onBlur={this.rowBlur.bind(this, 'est', index)}
            onChange={this.rowChange.bind(this, 'est', index)}
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
            onBlur={this.rowBlur.bind(this, 'todo', index)}
            onChange={this.rowChange.bind(this, 'todo', index)}
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
            onBlur={this.rowBlur.bind(this, 'status', index)}
            onChange={this.rowChange.bind(this, 'status', index)}
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
            onClick={this.rowClick.bind(this, index, record)}
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
