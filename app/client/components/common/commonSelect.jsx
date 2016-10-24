/* @flow */
'use strict';

import React from "react";
import {api} from "mimikiyru-utils";
import {Select} from "antd";
import type {res} from "./types";

const Option = Select.Option;

const CommonSelect = React.createClass({
    propTypes: {
        data: React.PropTypes.array
    },
    getInitialState(){
        return {
            list: []
        }
    },
    getDefaultProps (){
        return {
            data: []
        }
    },
    componentWillMount() {
        if (this.props.url) {
            api.get({
                url: this.props.url
            }).then((res: res) => {
                if (res && res.data) {
                    this.setState({
                        list: res.data
                    })
                }
            })
        }
        if (this.props.data && this.props.data.length > 0) {
            this.setState({
                list: this.props.data
            });
        }
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
});

export default CommonSelect;