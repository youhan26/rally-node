/**
 * Created by YouHan on 2016/8/29.
 */
 
import React from "react";
import {Input, Table, Button} from "antd";
import CommonSelect from "../../common/commonSelect";
import {DefectStatus, DefectPriority} from "../../common/constSelect";
import Api from "../../api";
import BlankRow from "../../mixins/grid-add-blur-change";

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
    
    this.blur = this.blur.bind(this);
    this.change = this.change.bind(this);
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
        return value && <a style={{textAlign: 'center'}} href={`/index#/defects/${value}`}>Defect {index}</a>
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
      width: 100,
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
      title: 'Submitted',
      dataIndex: 'submitId',
      key: 'submitId',
      width: 100,
      render: (value, record, index) => {
        return (
          <CommonSelect
            value={value} url="/member/all" className="full-width"
            onBlur={this.blur(index, 'submitId')}
            onChange={this.change(index, 'submitId')}
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
            onBlur={this.blur(index, 'status')}
            onChange={this.change(index, 'status')}
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
            onBlur={this.blur(index, 'priority')}
            onChange={this.change(index, 'priority')}
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
            onClick={this.click(index, record)}>{record.id ? 'Remove' : 'Add'}
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
