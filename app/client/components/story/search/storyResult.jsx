/**
 * Created by YouHan on 2016/11/1.
 */
import React, {PropTypes} from "react";
import {Button, Input, Table, InputNumber} from "antd";
import BlankRow from "./../../common/blankRow";
import {StoryStatus, ReleaseSelect} from "./../../common/constSelect";
import CommonSelect from "./../../common/commonSelect";


export default class StoryResult extends BlankRow {
  constructor(props) {
    super(props);
    
    this.singleSave = this.singleSave.bind(this);
    this.singleRemove = this.singleRemove.bind(this);
    this.updateChange = this.updateChange.bind(this);
    
    this.rowClick = this.rowClick.bind(this);
    this.rowChange = this.rowChange.bind(this);
    this.rowBlur = this.rowBlur.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    this.data = nextProps.data || [];
    this.oriData = JSON.parse(JSON.stringify(nextProps.data || []));
  }
  
  singleSave(data) {
    this.props.save(data);
  }
  
  singleRemove(data) {
    if (data) {
      this.props.singleRemove(data.id);
    }
  }
  
  updateChange(list) {
    this.props.dataUpdate(list);
  }
  
  
  render() {
    const columns = [{
      title: 'Story No.',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (value, record, index) => {
        return value && <a className="full-width" href={`/index#/story/${record.id}`}>Story {index}</a>;
      }
    }, {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (value, record, index) => {
        return (
          <Input
            value={value} className="full-width"
            onBlur={this.rowBlur.bind(this, 'title', index)}
            onChange={this.rowChange.bind(this, 'title', index)}
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
          <StoryStatus
            value={value} className="full-width"
            onBlur={this.rowBlur.bind(this, 'status', index)}
            onChange={this.rowChange.bind(this, 'status', index)}
          />
        );
      }
    }, {
      title: 'Plan Est',
      dataIndex: 'planEst',
      key: 'planEst',
      width: 70,
      render: (value, record, index) => {
        return (
          <InputNumber
            value={value} className="full-width"
            onBlur={this.rowBlur.bind(this, 'planEst', index)}
            onChange={this.rowChange.bind(this, 'planEst', index)}
          />
        );
      }
    }, {
      title: 'TODO',
      dataIndex: 'todo',
      key: 'todo',
      width: 70,
      render: (value) => {
        return (
          <InputNumber
            value={value} className="full-width"
            disabled={true}
          />
        );
      }
    }, {
      title: 'Task Est',
      dataIndex: 'taskEst',
      key: 'taskEst',
      width: 70,
      render: (value) => {
        return <InputNumber value={value} className="full-width" disabled={true} />;
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
      title: 'Project',
      dataIndex: 'projectId',
      key: 'projectId',
      width: 100,
      render: (value, record, index) => {
        return (
          <CommonSelect
            url="/project/all" value={value} className="full-width"
            onBlur={this.rowBlur.bind(this, 'projectId', index)}
            onChange={this.rowChange.bind(this, 'projectId', index)}
          />
        );
      }
    }, {
      title: 'Release',
      dataIndex: 'releaseId',
      key: 'releaseId',
      width: 100,
      render: (value, record, index) => {
        return (
          <ReleaseSelect
            className="full-width" value={value} projectId={record.projectId}
            onBlur={this.rowBlur.bind(this, 'releaseId', index)}
            onChange={this.rowChange.bind(this, 'releaseId', index)}
          />
        );
      }
    }, {
      title: 'Operation',
      dataIndex: '',
      key: 'operation',
      width: 80,
      render: (value, record, index) => {
        return (
          <Button
            type="primary" className="full-width"
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
          margin: '12px',
          backgroundColor: 'white'
        }}
      >
        <Table
          pagination={{
            total: this.props.data.length,
            defaultPageSize: 15,
            pageSize: 15
          }}
          size="small"
          columns={columns}
          dataSource={this.props.data}
          loading={this.props.loading}
          className="task-list-table"
        />
      </div>
    );
  }
}

StoryResult.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
  save: PropTypes.func,
  dataUpdate: PropTypes.func,
  remove: PropTypes.func,
  oriData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string
  }))
};

StoryResult.defaultProps = {
  data: [],
  loading: false
};
