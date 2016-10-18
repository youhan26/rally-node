/* @flow***REMOVED***
'use strict';

import React from "react";
import {Select} from "antd";

const Option = Select.Option;

exports.ProjectStatus = React.createClass({
    getInitialState(){
        return {
            list: []
        }
    },
    componentWillMount() {
        this.setState({
            list: [{
                name: '正常',
                id: '1'
            }, {
                name: '终止',
                id: '2'
            }]
        })
    },
    render() {
        return (
            <Select {...this.props}>
                {this.state.list.map((item, key) => {
                    return <Option value={item.id} key={key}>{item.name}</Option>
                })}
            </Select>
        )
    }
***REMOVED***
exports.ReleaseIntervalUnit = React.createClass({
    getInitialState(){
        return {
            list: []
        }
    },
    componentWillMount() {
        this.setState({
            list: [{
                name: 'Day',
                id: '1'
            }, {
                name: 'Week',
                id: '2'
            }, {
                name: 'Month',
                id: '3'
            }]
        })
    },
    render() {
        return (
            <Select {...this.props}>
                {this.state.list.map((item, key) => {
                    return <Option value={item.id} key={key}>{item.name}</Option>
                })}
            </Select>
        )
    }
***REMOVED***