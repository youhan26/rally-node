/* @flow */
'use strict';

import React from "react";
import {api} from "mimikiyru-utils";
import {Select} from "antd";
import type {res} from "./types";

const Option = Select.Option;

const CommonSelect = React.createClass({
    getInitialState(){
        return {
            list: []
        }
    },
    componentWillMount() {
        api.get({
            url: this.props.url
        }).then((res: res) => {
            if (res && res.data) {
                this.setState({
                    list: res.data
                })
            }
        });
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