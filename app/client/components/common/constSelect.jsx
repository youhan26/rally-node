/* @flow */
'use strict';

import React from "react";
import CommonSelect from "./commonSelect";

exports.ProjectStatus = React.createClass({
    render (){
        const data = [{
            name: '正常',
            id: '1'
        }, {
            name: '终止',
            id: '2'
        },];
        return <CommonSelect data={data} {...this.props}/>
    }
});

exports.ReleaseIntervalUnit = React.createClass({
    render (){
        const data = [{
            name: 'Day',
            id: '1'
        }, {
            name: 'Week',
            id: '2'
        }, {
            name: 'Month',
            id: '3'
        },];
        return <CommonSelect data={data} {...this.props}/>
    }
});

exports.StoryStatus = React.createClass({
    render (){
        const data = [{
            name: 'Defined',
            id: '1'
        }, {
            name: 'In-Progress',
            id: '2',
        }, {
            name: 'Completed',
            id: '3',
        }, {
            name: 'Tested',
            id: '4',
        }, {
            name: 'Accepted',
            id: '5',
        },];
        return <CommonSelect data={data} {...this.props}/>
    }
});


exports.TaskStatus = React.createClass({
    render (){
        const data = [{
            name: 'Defined',
            id: '1'
        }, {
            name: 'In-Progress',
            id: '2',
        }, {
            name: 'Completed',
            id: '3',
        }];
        return <CommonSelect data={data} {...this.props}/>
    }
});

exports.DefectStatus = React.createClass({
    render (){
        const data = [{
            name: 'Submitted',
            id: '1'
        }, {
            name: 'Open',
            id: '2',
        }, {
            name: 'Fixed',
            id: '3',
        }, {
            name: 'Closed',
            id: '4',
        }];
        return <CommonSelect data={data} {...this.props}/>
    }
});

exports.DefectPriority = React.createClass({
    render (){
        const data = [{
            name: 'None',
            id: '1'
        }, {
            name: 'Resolve Immediately',
            id: '2',
        }, {
            name: 'High Attention',
            id: '3',
        }, {
            name: 'Normal',
            id: '4',
        }, {
            name: 'Low',
            id: '5',
        }];
        return <CommonSelect data={data} {...this.props}/>
    }
});


