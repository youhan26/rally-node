/**
 * Created by YouHan on 2016/11/3.
 */


import React, {Component, PropTypes} from "react";
import {Card, Form, message, Input, DatePicker, Table, InputNumber} from "antd";
import {StoryStatus, ReleaseSelect, TaskStatus, DefectStatus, DefectPriority} from "./../common/constSelect";
import CommonSelect from "./../common/commonSelect";
import {api} from "mimikiyru-utils";


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
                    return <a className='full-width' href={'/index#/defect/' + value}>Defect {index}</a>
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
            loading: false
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
        /**
         * compare owner id manual
         */
        // if (props.ownerId) {
        //     result.ownerId = props.ownerId;
        // }
        if (props.releaseId) {
            result.releaseId = props.releaseId;
        }
        return result;
    }

    loadData(props) {
        const me = this;
        const condition = me._getCondition(props);
        me.state.loading = true;
        me.setState(me.state);

        api
            .get({
                url: '/dashboard/getList',
                params: condition
            })
            .then((res) => {
                me.state.storyData = me._getStoryData(res.data);
                me.state.taskData = me._getTaskData(res.data);
                me.state.defectData = me._getDefectData(res.data);
                me.state.loading = false;
                me.setState(me.state);
            });
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
                loading={this.state.loading}
            />
            <DLTaskList
                data={this.state.taskData}
                loading={this.state.loading}
            />
            <DLDefectList
                data={this.state.defectData}
                loading={this.state.loading}
            />
        </div>
    }
}

DashboardList.propTypes = {
    projectId: PropTypes.any,
    ownerId: PropTypes.any
};
DashboardList.defaultProps = {};