/**
 * Created by YouHan on 2016/11/3.
 */


import React, {Component, PropTypes} from "react";
import {Card, Form, message, Input, DatePicker, Table, InputNumber} from "antd";
import {StoryStatus, ReleaseSelect, TaskStatus, DefectStatus, DefectPriority} from "./../common/constSelect";
import CommonSelect from "./../common/commonSelect";
import Api from "./../api";


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
                    return <a className='full-width' href={'/index#/task/' + value}>Story {index + 1}</a>
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
                    return <a className='full-width' href={'/index#/defect/' + value}>Story {index}</a>
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
            defectData: [],
            loadStory: false,
            loadTask: false,
            loadDefect: false,
        };

        this.loadData = this.loadData.bind(this);
        this.filter = this.filter.bind(this);
    }

    componentWillMount() {
        this.loadData(this.props);
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
        if ((this.props.projectId != nextProps.projectId) || (this.props.ownerId != nextProps.ownerId)) {
            this.loadData(nextProps);
        }
    }

    _getCondition(props) {
        const result = {};
        if (props.projectId) {
            result.projectId = props.projectId;
        }
        if (props.ownerId) {
            result.ownerId = props.ownerId;
        }
        return result;
    }

    loadData(props) {
        const me = this;
        const condition = me._getCondition(props);
        me.state.loadStory = me.state.loadTask = me.state.loadDefect = true;
        me.setState(me.state);
        Api.Story.getList(condition)
            .then((res) => {
                if (res && res.success) {
                    me.state.storyData = res.data;
                    me.state.loadStory = false;
                    me.setState(me.state);
                }
            });
        Api.Task.get()
            .then(res => {
                if (res && res.success) {
                    me.state.taskData = me.filter(res.data);
                    me.state.taskData.forEach(item=> {
                        item.status = '' + item.status;
                    });
                    me.state.loadTask = false;
                    me.setState(me.state);
                }
            });
        Api.Defect.get()
            .then(res => {
                if (res && res.success) {
                    me.state.defectData = me.filter(res.data);
                    me.state.defectData.forEach(item=> {
                        item.status = '' + item.status;
                        item.priority = '' + item.priority;
                    });
                    me.state.loadDefect = false;
                    me.setState(me.state);
                }
            });
    }

    render() {
        return <div style={{width : '100%'}}>
            <DLStoryList
                data={this.state.storyData}
                loading={this.state.loadStory}
            />
            <DLTaskList
                data={this.state.taskData}
                loading={this.state.loadTask}
            />
            <DLDefectList
                data={this.state.defectData}
                loading={this.state.loadDefect}
            />
        </div>
    }
}

DashboardList.propTypes = {
    projectId: PropTypes.any,
    ownerId: PropTypes.any
};
DashboardList.defaultProps = {};