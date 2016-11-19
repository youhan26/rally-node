/**
 * Created by YouHan on 2016/8/29.
 */
import React from "react";
import {Input, Table, Button} from "antd";
import CommonSelect from "../../common/commonSelect";
import {DefectStatus, DefectPriority} from "../../common/constSelect";
import Api from "../../api";
import BlankRow from "./../../common/blankRow";

require('./../../../style/task.css');

export default class DefectList extends BlankRow {
  constructor(props) {
    super(props);
    
    this.api = Api.Defect;
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
    
    Api.Defect.getList(me.storyId).then((result) => {
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
    Api.Defect.save(data)
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
    Api.Defect.del(data.id).then((res) => {
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
      reopen: false,
      reopenReason: '',
      status: '1',
      priority: '1',
      storyId: this.props.storyId
    };
  }
  
  // update data type from number to string
  changeData(item) {
    item.key = item.id;
    item.status = `${item.status}`;
    item.priority = `${item.priority}`;
  }
  
  render() {
    const columns = [{
      title: 'Defect No.',
      dataIndex: 'id',
      key: 'no',
      render: (value, record, index) => {
        return value && <a style={{textAlign: 'center'}} href={`/index#/defects/${record.id}`}>Defect {index}</a>
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
      width: 100,
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
      title: 'Submitted',
      dataIndex: 'submitId',
      key: 'submitId',
      width: 100,
      render: (value, record, index) => {
        return (
          <CommonSelect
            value={value} url="/member/all" className="full-width"
            onBlur={this.rowBlur.bind(this, 'submitId', index)}
            onChange={this.rowChange.bind(this, 'submitId', index)}
          />
        );
      }
    }, {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (value, record, index) => {
        return (
          <DefectStatus
            value={value} className="full-width"
            onBlur={this.rowBlur.bind(this, 'status', index)}
            onChange={this.rowChange.bind(this, 'status', index)}
          />
        );
      }
    }, {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      width: 120,
      render: (value, record, index) => {
        return (
          <DefectPriority
            value={value} className="full-width"
            onBlur={this.rowBlur.bind(this, 'priority', index)}
            onChange={this.rowChange.bind(this, 'priority', index)}
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
            onClick={this.rowClick.bind(this, index, record)}>{record.id ? 'Remove' : 'Add'}
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
