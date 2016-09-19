/**
 * Created by YouHan on 2016/9/19.
 */
/* @flow */
'use strict';

import React from "react";
import {api, basic} from "mimikiyru-utils";


/**
 * TODO : page sort
 */
/**
 * type : server(for the server side select)
 *      : client(for the client side select)
 * url : necessary if use server side
 * params : same with url,
 * prefix : prefix select for show
 * suffix : suffix select for show
 * onError :(errorCode, errorReason){} function will call when error happen
 * style : component style
 */
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
            });
        } else {
            api[this.props.method]({
                url: this.props.url,
                params: this.props.params
            }).then((res) => {
                if (res.success) {
                    if (res.data && res.data.rows) {
                        this.setState({
                            list: res.data.rows
                        });
                    }
                } else {
                    this.props.onError && this.props.onError(601, 'server side return success false.');
                }
            }, (error) => {
                this.props.onError && this.props.onError(600, error)
            });
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
});


var MultiSelect = React.createClass({
    render: function () {
        return (
            <select></select>
        )
    }
});


export {SingleSelect};
export {MultiSelect};