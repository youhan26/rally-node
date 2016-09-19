***REMOVED***
 * Created by YouHan on 2016/9/19.
***REMOVED***
/* @flow***REMOVED***
'use strict';

import React from "react";
import {api, basic} from "mimikiyru-utils";


***REMOVED***
 * TODO : page sort
***REMOVED***
***REMOVED***
 * type : server(for the server side select)
 *      : client(for the client side select)
 * url : necessary if use server side
 * params : same with url,
 * prefix : prefix select for show
 * suffix : suffix select for show
 * onError :(errorCode, errorReason){} function will call when error happen
 * style : component style
***REMOVED***
var SingleSelect = React.createClass({
    getDefaultProps: () => {
        return {
            url: '',
            type: 'server',
            params: {},
            method: 'get',
            list: [],
            prefix: '',
            suffix: ''
        };
    },
    getInitialState: () => {
        return {
            list: []
        }
    },
    componentWillMount: () => {
        if (this.props.type === 'client') {
            this.setState({
                list: this.props.list
            ***REMOVED***
        } else {
            api[this.props.method]({
                url: this.props.url,
                params: this.props.params
            }).then((res) => {
                if (res.success) {
                    if (res.data && res.data.rows) {
                        this.setState({
                            list: res.data.rows
                        ***REMOVED***
                    }
                } else {
                    this.props.onError && this.props.onError(601, 'server side return success false.');
                }
            }, (error) => {
                this.props.onError && this.props.onError(600, error)
            ***REMOVED***
        }
    },
    render: function () {
        function renderLi(item, key) {
            return (
                <option key={key}
                        value={item.key || item.value}>{this.props.prefix}{item.value}{this.props.suffix}</option>
            )
        }

        return (
            <select>
                {this.state.list.map(renderLi)}
            </select>
        );
    }
***REMOVED***


var MultiSelect = React.createClass({
    render: function () {
        return (
            <select></select>
        )
    }
***REMOVED***


export {SingleSelect};
export {MultiSelect};