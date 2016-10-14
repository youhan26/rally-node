***REMOVED***
 * Created by YouHan on 2016/8/29.
***REMOVED***

"use strict";

require('./../style/dashboard.css');

import React from "react";
import {Link} from "react-router";
import {api} from "mimikiyru-utils";

var Section = React.createClass({
    getDefaultProps: function () {
        return {
            data: {
                name: '',
                bugs: [],
                tasks: []
            }
        }
    },
    onDrag: function () {
        console.log(arguments);
    },
    render: function () {
        function renderBugs(item, key) {
            var className = 'dash-bug-item';
            className += ' dash-bug-' + item.status;
            return <div key={key} className={className}>
                <Link to={`/bugs/${item.id}`} target="_blank">{item.name}</Link>
            </div>
        }

        function renderTasks(item, key) {
            var className = 'dash-task-item';
            className += ' dash-task-' + item.status;
            return <div key={key} className={className}>
                <span><Link to={`/tasks/${item.id}`} target="_blank">{item.name}</Link>
                </span>
                <p>
                    TODO : {item.todo}
                </p>
            </div>
        }

        var btnClass = 'section card';
        return (
            <div className={btnClass} draggable={true}>
                <div style={{
                    marginLeft: '5px',
                    marginBottom: '10px'
                }} className="word-wrap">
                    <span className="point-cursor">
                        <Link to={`/stories/${this.props.data.id}`}
                              target="_blank">{this.props.data.name}</Link> </span>
                    <span style={{
                        float: 'right',
                        cursor: 'move'
                    }}>
                        <i className="fa fa-list"
                           aria-hidden="true"/></span>
                </div>
                <div className="dash-bug">
                    {this.props.data.bugs.map(renderBugs)}
                </div>
                <div className="dash-task" style={{
                    marginTop: '10px'
                }}>
                    {this.props.data.tasks.map(renderTasks)}
                </div>
            </div>
        )
    }
***REMOVED***


var DashSection = React.createClass({
    getDefaultProps: function () {
        return {
            data: {
                regionName: '',
                stories: []
            }
        }
    },
    render: function () {
        function renderLi(item, key) {
            return <Section data={item} key={key}/>;
        }

        return (
            <div className="dash-section">
                <div className="dash-section-title" style={{
                    textAlign: 'center',
                    fontSize: '1rem',
                }}>
                    {this.props.data.regionName}
                </div>
                {this.props.data.stories.map(renderLi)}
            </div>
        )
    }
***REMOVED***

var Dashboard = React.createClass({
    getInitialState: function () {
        return {
            list: []
        };
    },
    componentWillMount: function () {
        this.loadData();
    },
    loadData: function () {
        var that = this;
        api.get({
            url: 'dashboard/dataList',
        }).then(function (res) {
            if (res && res.success) {
                that.setState({
                    list: res.data
                ***REMOVED***
            } else {
                alert('error when load event data');
            }
        }, function (error) {
            console.error(error);
        ***REMOVED***
    },
    render: function () {
        function renderLi(item, key) {
            return (
                <DashSection data={item} key={key}/>
            )
        }

        return (
            <div className="dash-content">
                {this.state.list.map(renderLi)}
            </div>
        )
    }
***REMOVED***

export default Dashboard;