/**
 * Created by YouHan on 2016/11/3.
 */


import React, {Component, PropTypes} from "react";
import {Card, Form, message, Input, DatePicker, Table, InputNumber} from "antd";
import {StoryStatus, ReleaseSelect, TaskStatus, DefectStatus, DefectPriority} from "./../common/constSelect";
import CommonSelect from "./../common/commonSelect";


class DLStoryList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const columns = [{
            title: 'Story No.',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            render: (value, record, index) => {
                if (value) {
                    return <a className='full-width' href={'/index#/story/' + value}>Story {index + 1}</a>
                }
            }
        }, {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (value, record, index) => {
                return <Input value={value} className='full-width' disabled={true}/>
            }
        }, {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (value, record, index) => {
                return <StoryStatus value={value} className='full-width' disabled={true}/>
            }
        }, {
            title: 'Plan Est',
            dataIndex: 'planEst',
            key: 'planEst',
            width: 70,
            render: (value, record, index) => {
                return <InputNumber value={value} className='full-width' disabled={true}/>
            }
        }, {
            title: 'TODO',
            dataIndex: 'todo',
            key: 'todo',
            width: 70,
            render: (value, record, index) => {
                return <InputNumber value={value} className='full-width' disabled={true}/>
            }
        }, {
            title: 'Task Est',
            dataIndex: 'taskEst',
            key: 'taskEst',
            width: 70,
            render: (value, record, index) => {
                return <InputNumber value={value} className='full-width' disabled={true}/>
            }
        }, {
            title: 'Owner',
            dataIndex: 'ownerId',
            key: 'ownerId',
            width: 100,
            render: (value, record, index) => {
                return <CommonSelect value={value} url="/member/all" className='full-width'
                                     disabled={true}/>
            }
        }, {
            title: 'Release',
            dataIndex: 'releaseId',
            key: 'releaseId',
            width: 100,
            render: (value) => {
                return <ReleaseSelect className="full-width" value={value} disabled={true}/>
            }
        }, {
            title: 'Project',
            dataIndex: 'projectId',
            key: 'projectId',
            width: 100,
            render: (value, record, index) => {
                return <CommonSelect url="/project/all" value={value} className="full-width"
                                     disabled={true}/>
            }
        }];
        return <div style={{width : '100%', padding : '12px'}}>
            <Card title="Story">
                <Table
                    pagination={false}
                    size="small"
                    columns={columns}
                    dataSource={this.props.data}
                    loading={this.props.loading}
                    className="task-list-table"
                />
            </Card>
        </div>
    }
}
DLStoryList.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool
};
DLStoryList.defaultProps = {
    data: [],
    loading: false
};

class DLTaskList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const columns = [{
            title: 'Task No.',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            render: (value, record, index) => {
                if (value) {
                    return <a className='full-width' href={'/index#/task/' + value}>Task {index + 1}</a>
                }
            }
        }, {
            title: 'Task',
            dataIndex: 'title',
            key: 'title',
            render: (value, record, index) => {
                return <Input value={value} className='full-width' disabled={true}/>
            }
        }, {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (value, record, index) => {
                return <TaskStatus value={value} className='full-width' disabled={true}/>
            }
        }, {
            title: 'Task Est',
            dataIndex: 'est',
            key: 'est',
            width: 70,
            render: (value, record, index) => {
                return <InputNumber value={value} className='full-width' disabled={true}/>
            }
        }, {
            title: 'TODO',
            dataIndex: 'todo',
            key: 'todo',
            width: 70,
            render: (value, record, index) => {
                return <InputNumber value={value} className='full-width' disabled={true}/>
            }
        }, {
            title: 'Story',
            dataIndex: 'storyId',
            key: 'storyId',
            width: 70,
            render: (value, record, index) => {
                return <CommonSelect url="/story/all" value={value} className='full-width' disabled={true}/>
            }
        }, {
            title: 'Owner',
            dataIndex: 'ownerId',
            key: 'ownerId',
            width: 100,
            render: (value, record, index) => {
                return <CommonSelect value={value} url="/member/all" className='full-width'
                                     disabled={true}/>
            }
        }];
        return <div style={{width : '100%', padding : '12px'}}>
            <Card title="Task">
                <Table
                    pagination={false}
                    size="small"
                    columns={columns}
                    dataSource={this.props.data}
                    loading={this.props.loading}
                    className="task-list-table"
                />
            </Card>
        </div>
    }
}

DLTaskList.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool
};
DLTaskList.defaultProps = {
    data: [],
    loading: false
};


class DLDefectList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const columns = [{
            title: 'Defect No.',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            render: (value, record, index) => {
                if (value) {
                    return <a className='full-width' href={'/index#/defect/' + value}>Defect {index + 1}</a>
                }
            }
        }, {
            title: 'Task',
            dataIndex: 'title',
            key: 'title',
            render: (value, record, index) => {
                return <Input value={value} className='full-width' disabled={true}/>
            }
        }, {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (value, record, index) => {
                return <DefectStatus value={value} className='full-width' disabled={true}/>
            }
        }, {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            width: 70,
            render: (value, record, index) => {
                return <DefectPriority value={value} className='full-width' disabled={true}/>
            }
        }, {
            title: 'Story',
            dataIndex: 'storyId',
            key: 'storyId',
            width: 70,
            render: (value, record, index) => {
                return <CommonSelect url="/story/all" value={value} className='full-width' disabled={true}/>
            }
        }, {
            title: 'Owner',
            dataIndex: 'ownerId',
            key: 'ownerId',
            width: 100,
            render: (value, record, index) => {
                return <CommonSelect value={value} url="/member/all" className='full-width'
                                     disabled={true}/>
            }
        }];
        return <div style={{width : '100%', padding : '12px'}}>
            <Card title="Defect">
                <Table
                    pagination={false}
                    size="small"
                    columns={columns}
                    dataSource={this.props.data}
                    loading={this.props.loading}
                    className="task-list-table"
                />
            </Card>
        </div>
    }
}

DLDefectList.propTypes = {
    data: PropTypes.array,
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
        this._getDefectData = this._getDefectData.bind(this);
        this._getStoryData = this._getStoryData.bind(this);
        this._getTaskData = this._getTaskData.bind(this);
    }

    filter(data) {
        const me = this;
        const result = [];
        if (!me.props.ownerId) {
            return data;
        }
        if (data) {
            data.forEach(item=> {
                if (item.ownerId == me.props.ownerId) {
                    result.push(item);
                }
            });
        }
        return result;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data) {
            this.state.storyData = this._getStoryData(nextProps.data);
            this.state.taskData = this._getTaskData(nextProps.data);
            this.state.defectData = this._getDefectData(nextProps.data);
            this.setState(this.state);
        }
    }

    _getStoryData(data) {
        const result = [];
        if (!this.props.ownerId) {
            return data;
        }
        data.forEach((item) => {
            if (item.ownerId == this.props.ownerId) {
                result.push(item);
            }
        });
        return result;
    }

    _getTaskData(data) {
        const result = [];
        data.forEach((item) => {
            if (item && item.taskList) {
                item.taskList.forEach((task) => {
                    if (!this.props.ownerId || (task.ownerId == this.props.ownerId)) {
                        result.push(task);
                    }
                });
            }
        });
        return result;
    }

    _getDefectData(data) {
        const result = [];
        data.forEach((item) => {
            if (item && item.defectList) {
                item.defectList.forEach((defect) => {
                    if (!this.props.ownerId || (defect.ownerId == this.props.ownerId)) {
                        result.push(defect);
                    }
                });
            }
        });
        return result;
    }

    render() {
        return <div style={{width : '100%'}}>
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
    }
}

DashboardList.propTypes = {
    ownerId: PropTypes.any,
    loading: PropTypes.bool
};
DashboardList.defaultProps = {
    loading: false
};