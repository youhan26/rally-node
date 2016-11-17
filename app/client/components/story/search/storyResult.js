/**
 * Created by YouHan on 2016/11/1.
 */
import React, {PropTypes} from "react";
import {Card, Form, Button, message, Input, DatePicker, Table, InputNumber} from "antd";
import {StoryStatus, ReleaseSelect} from "../../common/constSelect";
import CommonSelect from "../../common/commonSelect";


const StoryResult = React.createClass({
  propTypes: {
    data: PropTypes.array,
    loading: PropTypes.bool,
    singleSave: PropTypes.func,
    dataUpdate: PropTypes.func,
    remove: PropTypes.func,
    save: PropTypes.func
  },
  getDefaultProps (){
    return {
      data: [],
      loading: false
    }
  },
  componentWillReceiveProps(nextProps){
    // this.oriData = nextProps.data || [];
    return true;
  },
  blur(index, field){
    if (!this.props.oriData[index].id) {
      return;
    }
    if (this.props.oriData[index][field] == this.props.data[index][field]) {
      return;
    }
    this.props.oriData[index][field] = this.props.data[index][field];
    this.props.save(this.props.data[index]);
  },
  change(index, field, e){
    const newValue = (e && e.target ? e.target.value : e);
    const oldValue = this.props.data[index][field];
    if (oldValue != newValue) {
      this.props.data[index][field] = newValue;
      this.props.dataUpdate(this.props.data);
    }
  },
  click(index, record){
    if (record.id) {
      this.props.remove(record.id);
    } else {
      this.props.save(this.props.data[index]);
    }
  },
  render(){
    const columns = [{
      title: 'Story No.',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (value, record, index) => {
        if (value) {
          return <a className='full-width' href={'/index#/story/' + value}>Story {index}</a>
        }
      }
    }, {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (value, record, index) => {
        return <Input value={value} className='full-width'
                      onBlur={this.blur.bind(this, index, 'title')}
                      onChange={this.change.bind(this, index, 'title')} />
      }
    }, {
      title: 'Status',
      dataIndex: 'status',
      
      key: 'status',
      width: 100,
      render: (value, record, index) => {
        return <StoryStatus value={value} className='full-width'
                            onBlur={this.blur.bind(this, index, 'status')}
                            onChange={this.change.bind(this, index, 'status')} />
      }
    }, {
      title: 'Plan Est',
      dataIndex: 'planEst',
      key: 'planEst',
      width: 70,
      render: (value, record, index) => {
        return <InputNumber value={value} className='full-width'
                            onBlur={this.blur.bind(this, index, 'planEst')}
                            onChange={this.change.bind(this, index, 'planEst')} />
      }
    }, {
      title: 'TODO',
      dataIndex: 'todo',
      key: 'todo',
      width: 70,
      render: (value, record, index) => {
        return <InputNumber value={value} className='full-width'
                            disabled={true} />
      }
    }, {
      title: 'Task Est',
      dataIndex: 'taskEst',
      key: 'taskEst',
      width: 70,
      render: (value, record, index) => {
        return <InputNumber value={value} className='full-width' disabled={true} />
      }
    }, {
      title: 'Owner',
      dataIndex: 'ownerId',
      key: 'ownerId',
      width: 100,
      render: (value, record, index) => {
        return <CommonSelect value={value} url="/member/all" className='full-width'
                             onBlur={this.blur.bind(this, index, 'ownerId')}
                             onChange={this.change.bind(this, index, 'ownerId')} />
      }
    }, {
      title: 'Release',
      dataIndex: 'releaseId',
      key: 'releaseId',
      width: 100,
      render: (value, record, index) => {
        return <ReleaseSelect className="full-width" value={value}
                              onChange={this.change.bind(this, index, 'releaseId')}
                              onBlur={this.blur.bind(this, index, 'releaseId')} />
      }
    }, {
      title: 'Project',
      dataIndex: 'projectId',
      key: 'projectId',
      width: 100,
      render: (value, record, index) => {
        return <CommonSelect url="/project/all" value={value} className="full-width"
                             onChange={this.change.bind(this, index, 'projectId')}
                             onBlur={this.blur.bind(this, index, 'projectId')} />
      }
    }, {
      title: 'Operation',
      dataIndex: '',
      key: 'operation',
      width: 80,
      render: (value, record, index) => {
        return <Button type="primary" className='full-width'
                       onClick={this.click.bind(this, index, record)}>
          {record.id ? 'Remove' : 'Add'}</Button>
      }
    }];
    return <div style={{
      margin: '12px',
      backgroundColor: 'white'
    }}>
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
    </div>;
  }
});

export default  StoryResult;