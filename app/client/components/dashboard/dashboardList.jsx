/**
 * Created by YouHan on 2016/11/3.
 */
import React, {Component, PropTypes} from "react";
import {Card, Form, message, Input, DatePicker, Table, InputNumber} from "antd";
import {StoryStatus, ReleaseSelect, TaskStatus, DefectStatus, DefectPriority} from "./../common/constSelect";
import CommonSelect from "./../common/commonSelect";


const DLStoryList = (props) => {
  const columns = [{
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (value, record) => {
      return <a className="full-width" href={`/index#/story/${record.id}`}>{value}</a>;
    }
  }, {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: value => <StoryStatus value={value} className="full-width" disabled={true} />
  }, {
    title: 'Plan Est',
    dataIndex: 'planEst',
    key: 'planEst',
    width: 70,
    render: value => <span>{value || 0}</span>
  }, {
    title: 'TODO',
    dataIndex: 'todo',
    key: 'todo',
    width: 70,
    render: value => <span>{value || 0}</span>
  }, {
    title: 'Task Est',
    dataIndex: 'taskEst',
    key: 'taskEst',
    width: 70,
    render: value => <span>{value || 0}</span>
  }, {
    title: 'Owner',
    dataIndex: 'ownerId',
    key: 'ownerId',
    width: 100,
    render: value => <CommonSelect
      value={value}
      url="/member/all"
      className="full-width"
      disabled={true} />
  }, {
    title: 'Release',
    dataIndex: 'releaseId',
    key: 'releaseId',
    width: 100,
    render: value => <ReleaseSelect className="full-width" value={value} disabled={true} />
  }, {
    title: 'Project',
    dataIndex: 'projectId',
    key: 'projectId',
    width: 100,
    render: value => <CommonSelect
      url="/project/all"
      value={value}
      className="full-width"
      disabled={true} />
  }];
  return (
    <div style={{width: '100%', padding: '12px'}}>
      <Card title="Story">
        <Table
          pagination={{
            total: props.data.length,
            defaultPageSize: 10,
            pageSize: 10
          }}
          size="small"
          columns={columns}
          dataSource={props.data}
          loading={props.loading}
          className="task-list-table"
        />
      </Card>
    </div>
  );
};

DLStoryList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    status: PropTypes.string,
    planEst: PropTypes.number,
    todo: PropTypes.number,
    taskEst: PropTypes.number,
    ownerId: PropTypes.string,
    releaseId: PropTypes.string,
    projectId: PropTypes.string,
  })),
  loading: PropTypes.bool
};
DLStoryList.defaultProps = {
  data: [],
  loading: false
};

const DLTaskList = (props) => {
  const columns = [{
    title: 'Task',
    dataIndex: 'title',
    key: 'title',
    render: (value, record) => {
      return <a className="full-width" href={`/index#/task/${record.id}`}>{value}</a>
    }
  }, {
    title: 'Story',
    dataIndex: 'story',
    key: 'story',
    width: 100,
    render: value => <a className="full-width" href={`/index#/story/${value.id}`}>{value.title}</a>
  }, {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: value => <TaskStatus value={`${value}`} className="full-width" disabled={true} />
  }, {
    title: 'Task Est',
    dataIndex: 'est',
    key: 'est',
    width: 70,
    render: value => <div>{value || 0}</div>
  }, {
    title: 'TODO',
    dataIndex: 'todo',
    key: 'todo',
    width: 70,
    render: value => <div>{value || 0}</div>
  }, {
    title: 'Owner',
    dataIndex: 'ownerId',
    key: 'ownerId',
    width: 100,
    render: value => <CommonSelect
      value={value}
      url="/member/all"
      className="full-width"
      disabled={true} />
  }];
  return (
    <div style={{width: '100%', padding: '12px'}}>
      <Card title="Task">
        <Table
          pagination={{
            total: props.data.length,
            defaultPageSize: 10,
            pageSize: 10
          }}
          size="small"
          columns={columns}
          dataSource={props.data}
          loading={props.loading}
          className="task-list-table"
        />
      </Card>
    </div>
  );
};

DLTaskList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    status: PropTypes.number,
    est: PropTypes.number,
    todo: PropTypes.number,
    storyId: PropTypes.string,
    ownerId: PropTypes.string
  })),
  loading: PropTypes.bool
};
DLTaskList.defaultProps = {
  data: [],
  loading: false
};


const DLDefectList = (props) => {
  const columns = [{
    title: 'Defect',
    dataIndex: 'title',
    key: 'title',
    render: (value, record) => {
      return <a className="full-width" href={`/index#/defect/${record.id}`}>{value}</a>
    }
  }, {
    title: 'Story',
    dataIndex: 'story',
    key: 'story',
    width: 100,
    render: value => <a className="full-width" href={`/index#/story/${value.id}`}>{value.title}</a>
  }, {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: value => <DefectStatus value={`${value}`} className="full-width" disabled={true} />
  }, {
    title: 'Priority',
    dataIndex: 'priority',
    key: 'priority',
    width: 70,
    render: value => <DefectPriority value={`${value}`} className="full-width" disabled={true} />
  }, {
    title: 'Owner',
    dataIndex: 'ownerId',
    key: 'ownerId',
    width: 100,
    render: value => <CommonSelect
      value={value}
      url="/member/all"
      className="full-width"
      disabled={true} />
  }];
  return (
    <div style={{width: '100%', padding: '12px'}}>
      <Card title="Defect">
        <Table
          pagination={{
            total: props.data.length,
            defaultPageSize: 10,
            pageSize: 10
          }}
          size="small"
          columns={columns}
          dataSource={props.data}
          loading={props.loading}
          className="task-list-table"
        />
      </Card>
    </div>
  );
};

DLDefectList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    status: PropTypes.number,
    priority: PropTypes.number,
    storyId: PropTypes.string,
    ownerId: PropTypes.string
  })),
  loading: PropTypes.bool
};
DLDefectList.defaultProps = {
  data: [],
  loading: false
};

export default class DashboardList extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      storyData: [],
      taskData: [],
      defectData: []
    };
    
    this.filter = this.filter.bind(this);
    this.getDefectData = this.getDefectData.bind(this);
    this.getStoryData = this.getStoryData.bind(this);
    this.getTaskData = this.getTaskData.bind(this);
  }
  
  filter(data) {
    const me = this;
    const result = [];
    if (!me.props.ownerId) {
      return data;
    }
    if (data) {
      data.forEach(item => {
        if (`${item.ownerId}` === `${me.props.ownerId}`) {
          result.push(item);
        }
      });
    }
    return result;
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.state.storyData = this.getStoryData(nextProps.data);
      this.state.taskData = this.getTaskData(nextProps.data);
      this.state.defectData = this.getDefectData(nextProps.data);
      this.setState(this.state);
    }
  }
  
  getStoryData(data) {
    const result = [];
    if (!this.props.ownerId) {
      return data;
    }
    data.forEach((item) => {
      if (`${item.ownerId}` === `${this.props.ownerId}`) {
        result.push(item);
      }
    });
    return result;
  }
  
  getTaskData(data) {
    const result = [];
    data.forEach((item) => {
      if (item && item.taskList) {
        item.taskList.forEach((task) => {
          if (!this.props.ownerId || (`${task.ownerId}` === `${this.props.ownerId}`)) {
            task.story = {
              id: item.id,
              title: item.title
            };
            result.push(task);
          }
        });
      }
    });
    return result;
  }
  
  getDefectData(data) {
    const result = [];
    data.forEach((item) => {
      if (item && item.defectList) {
        item.defectList.forEach((defect) => {
          if (!this.props.ownerId || (`${defect.ownerId}` === `${this.props.ownerId}`)) {
            defect.story = {
              id: item.id,
              title: item.title
            };
            result.push(defect);
          }
        });
      }
    });
    return result;
  }
  
  render() {
    return (
      <div style={{width: '100%'}}>
        <DLStoryList
          data={this.state.storyData}
          loading={this.props.loading}
        />
        <DLTaskList
          data={this.state.taskData}
          loading={this.props.loading}
        />
        <DLDefectList
          data={this.state.defectData}
          loading={this.props.loading}
        />
      </div>
    );
  }
}

DashboardList.propTypes = {
  ownerId: PropTypes.string,
  loading: PropTypes.bool
};
DashboardList.defaultProps = {
  loading: false
};
